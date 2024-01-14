package com.lm.linux.gui.toolkit.explorer;

import com.lm.linux.gui.toolkit.GuiLinuxFrame;
import com.lm.linux.gui.toolkit.internalframe.LinuxExplorerFrame;
import lombok.Data;
import org.fife.ui.rsyntaxtextarea.RSyntaxTextArea;
import org.fife.ui.rsyntaxtextarea.SyntaxConstants;
import org.fife.ui.rtextarea.RTextScrollPane;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Data
public class FileTablePanel extends JPanel {
    private static String PSCP_FROM = "pscp -pw Aizhong#0 alan@192.168.1.108:SOURCEPATH \"" + System.getProperty("user.home") + "/tmp/FILENAME\"";
    private static String PSCP_TO = "pscp -pw Aizhong#0 \"" + System.getProperty("user.home") + "/tmp/FILENAME\"" + " alan@192.168.1.108:DESTPATH";

    private JTable fileTable;

    private String[] columns = new String[] {"", "Name", "Size", "Changed", "Permissions", "Owner"};

    public FileTablePanel(LinuxExplorerFrame explorer) {
        super(new BorderLayout());
        JToolBar jtb = new JToolBar();
        jtb.setBackground(new Color(192, 192, 255));
        jtb.setPreferredSize(new Dimension(-1, 24));
        add(jtb, BorderLayout.NORTH);

        DefaultTableModel model = new DefaultTableModel(null, columns) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }

            @Override
            public Class<?> getColumnClass(int columnIndex) {
                switch (columnIndex) {
                    case 0: return Icon.class;
                    case 1: return SshFile.class;
                    default: return String.class;
                }
            }
        };

        fileTable = new JTable(model);
        fileTable.setBackground(Color.WHITE);
        fileTable.setFont(GuiLinuxFrame.DEFAULT_FONT);
        fileTable.getTableHeader().setOpaque(false);
        fileTable.getTableHeader().setBackground(new Color(220, 220, 220));
        fileTable.setShowGrid(false);
        fileTable.setRowHeight(24);
        fileTable.getColumnModel().getColumn(0).setMinWidth(20);
        fileTable.getColumnModel().getColumn(0).setMaxWidth(20);
        JScrollPane jsp = new JScrollPane(fileTable);
        jsp.setBackground(Color.WHITE);
        add(jsp, BorderLayout.CENTER);

        fileTable.addMouseListener(new MouseAdapter() {
            public void mousePressed(MouseEvent mouseEvent) {
                JTable table =(JTable) mouseEvent.getSource();
                Point point = mouseEvent.getPoint();
                int row = table.rowAtPoint(point);
                if (mouseEvent.getClickCount() == 2 && table.getSelectedRow() != -1) {
                    Object obj = model.getValueAt(table.getSelectedRow(), 1);
                    if(obj != null && obj instanceof SshFile) {
                        SshFile file = (SshFile)obj;
                        if(file.getType().equals("Folder")) {
                            explorer.setCurrentNode(explorer.getFolderMap().get(file.getPath()));
                            explorer.setCurrentFolder(file.getPath());
                            if(explorer.getTerminal() != null) {
                                explorer.getTerminal().doingCommand("cd " + file.getPath(), false);

                                try {
                                    Thread.sleep(1000);
                                } catch (InterruptedException ex) {
                                    ex.printStackTrace();
                                }

                                explorer.getTerminal().doingCommand("ls -la", false);
                            }
                        } else {
                            System.out.println("You selected: " + file.getPath());

                            String fileName = file.getName();
                            String filePath = file.getPath();

                            String cmd = PSCP_FROM.replaceAll("SOURCEPATH", filePath);
                            cmd = cmd.replaceAll("FILENAME", fileName);

                            explorer.copyFileFrom(cmd);

                            String localFilePath = System.getProperty("user.home") + "/tmp/" + fileName;
                            File localFile = new File(localFilePath);
                            if(localFile.exists()) {
                                if(file.getPath().endsWith(".java")) {
                                    RSyntaxTextArea javaArea = new RSyntaxTextArea();
                                    javaArea.setSyntaxEditingStyle(SyntaxConstants.SYNTAX_STYLE_JAVA);
                                    javaArea.setCodeFoldingEnabled(false);
                                    javaArea.setFont(GuiLinuxFrame.DEFAULT_FONT);

                                    RTextScrollPane rtsp = new RTextScrollPane(javaArea);
                                    JPanel codePanel = new JPanel(new BorderLayout());
                                    codePanel.add(rtsp);

                                    Path path = Paths.get(String.valueOf(localFile.getAbsoluteFile()));
                                    try {
                                        byte[] bytes = Files.readAllBytes(path);
                                        javaArea.setText(new String(bytes));

                                        explorer.addTab(codePanel, fileName);
                                    } catch(Exception e) {
                                        e.printStackTrace();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    }
}
