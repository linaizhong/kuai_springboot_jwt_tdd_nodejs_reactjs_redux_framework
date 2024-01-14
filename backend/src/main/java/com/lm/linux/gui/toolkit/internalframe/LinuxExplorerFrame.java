package com.lm.linux.gui.toolkit.internalframe;

import com.lm.linux.gui.toolkit.GuiLinuxFrame;
import com.lm.linux.gui.toolkit.common.LinuxGuiBaseFrame;
import com.lm.linux.gui.toolkit.explorer.FolderNode;
import com.lm.linux.gui.toolkit.explorer.LinuxGUITerminal;
import com.lm.linux.gui.toolkit.explorer.LinuxGuiExplorer;
import com.lm.linux.gui.toolkit.explorer.SshFile;
import lombok.Data;
import org.fife.ui.rsyntaxtextarea.RSyntaxTextArea;

import javax.swing.*;
import javax.swing.event.InternalFrameAdapter;
import javax.swing.event.InternalFrameEvent;
import javax.swing.table.DefaultTableModel;
import javax.swing.tree.DefaultTreeModel;
import java.awt.*;
import java.awt.event.ComponentAdapter;
import java.awt.event.ComponentEvent;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Data
public class LinuxExplorerFrame extends LinuxGuiBaseFrame {
    private JSplitPane jsp;
    private LinuxGuiExplorer explorer;
    private LinuxGUITerminal terminal;

    private String currentFolder;
    private FolderNode currentNode;

    private Map<String, FolderNode> folderMap = new HashMap<>();

    private JTabbedPane rightPane = new JTabbedPane();

    public LinuxExplorerFrame() {
        super("Linux Explorer");

        explorer = new LinuxGuiExplorer(this);
        terminal = new LinuxGUITerminal(this);

        rightPane.add(terminal);
        rightPane.setTabComponentAt(rightPane.indexOfComponent(terminal), getTitlePane(rightPane, terminal, "Terminal", null));
        rightPane.setSelectedComponent(terminal);

        jsp = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, explorer, rightPane);
        getContentPane().add(jsp);

        addComponentListener(new ComponentAdapter() {
            @Override
            public void componentResized(ComponentEvent e) {
                super.componentResized(e);

                SwingUtilities.invokeLater(() -> {
                    jsp.setDividerLocation(0.5);
                    explorer.setDividerLocation(0.4);
                });
            }
        });

        addInternalFrameListener(new InternalFrameAdapter() {
            @Override
            public void internalFrameClosed(InternalFrameEvent e) {
                GuiLinuxFrame.removeLinuxExplorer(getKey());
            }
        });

        SwingUtilities.invokeLater(() -> {
            jsp.setDividerLocation(0.5);
        });

        setVisible(true);
    }

    public void addTab(JPanel textAreaPanel, String fileName) {
        rightPane.add(textAreaPanel);
        rightPane.setTabComponentAt(rightPane.indexOfComponent(textAreaPanel), getTitlePane(rightPane, textAreaPanel, fileName, currentNode));
        rightPane.setSelectedComponent(textAreaPanel);
    }

    private static JPanel getTitlePane(final JTabbedPane tabbedPane, final JPanel panel, String title, FolderNode node) {
        JPanel titlePanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 0, 0));
        titlePanel.setOpaque(false);
        JLabel titleLabel = new JLabel(title);
        titleLabel.setBorder(BorderFactory.createEmptyBorder(0, 0, 0, 5));
        titlePanel.add(titleLabel);

        if(node != null) {
            JLabel jlClose = new JLabel();
            jlClose.setText("x");
            jlClose.addMouseListener(new MouseAdapter() {
                @Override
                public void mouseReleased(MouseEvent e) {
                    super.mouseReleased(e);
                    node.setLoaded(false);
                    tabbedPane.remove(panel);
                }
            });
            titlePanel.add(jlClose);
        }

        return titlePanel;
    }

    public void setPwdOnExplorer(String pwd) {
        SwingUtilities.invokeLater(() -> {
            FolderNode root = (FolderNode) explorer.getFTree().getModel().getRoot();
            SshFile sshFile = (SshFile) root.getNodeObject();
            sshFile.setName(pwd);
            sshFile.setPath(pwd);
            root.setUserObject(pwd);
            folderMap.put(sshFile.getPath(), root);
            ((DefaultTreeModel)explorer.getFTree().getModel()).reload();
        });
    }

    public void setLsOnExplorer(java.util.List<String> responses) {
        SwingUtilities.invokeLater(() -> {
            DefaultTableModel dtm = (DefaultTableModel)explorer.getFTable().getModel();
            dtm.setRowCount(0);

            java.util.List<SshFile> fileList = parseFiles(responses);
            if(!fileList.isEmpty()) {
                for(SshFile file : fileList) {
                    if(!file.getName().equals(".") && !file.getName().equals("..")) {
                        Icon icon = null;
                        if(file.getType().equals("Folder")) {
                            icon = new ImageIcon("resources/images/TreeClosed.gif");
                        } else {
                            icon = new ImageIcon("resources/images/file.gif");
                        }

//                        dtm.addRow(new Object[] {icon, file.getName(), String.valueOf(file.getSize()), file.getChanged(), file.getPermissions(), file.getOwner()});
                        dtm.addRow(new Object[] {icon, file, String.valueOf(file.getSize()), file.getChanged(), file.getPermissions(), file.getOwner()});
                    }

                    if(currentNode instanceof FolderNode && !((FolderNode) currentNode).isLoaded()) {
                        if(currentNode != null && file.getType().equals("Folder") && !file.getName().equals(".") && !file.getName().equals("..")) {
                            FolderNode node = new FolderNode(file.getName());
                            node.setLabel(file.getName());
                            node.setUserObject(file.getName());
                            node.setNodeObject(file);
                            ((DefaultTreeModel)explorer.getFTree().getModel()).insertNodeInto(node, currentNode, currentNode.getChildCount());
                            folderMap.put(file.getPath(), node);
                        }
                    }
                }

                if(currentNode != null) {
                    currentNode.setLoaded(true);
                }
            }

            ((DefaultTreeModel)explorer.getFTree().getModel()).reload();
            expandAllNodes(explorer.getFTree(), 0, explorer.getFTree().getRowCount());
        });
    }

    private java.util.List<SshFile> parseFiles(java.util.List<String> responses) {
        java.util.List<SshFile> fileList = new ArrayList<>();

        for(int i=1; i<responses.size(); i++) {
            String fileStr = responses.get(i);

            if(fileStr != null) {
                fileStr = fileStr.trim();

                String[] fileStrs = fileStr.split("\\s+");
                if(fileStrs.length >= 5) {
                    SshFile file = new SshFile();
                    file.setPath(currentFolder + "/" + fileStrs[8]);
                    file.setName(fileStrs[8]);
                    file.setSize(Integer.valueOf(fileStrs[4]));
                    file.setChanged(fileStrs[5] + " " + fileStrs[6] + " " + fileStrs[7]);
                    file.setType(fileStrs[0].charAt(0) == '-' ? "File" : "Folder");
                    file.setPermissions(fileStrs[0].substring(1));
                    file.setOwner(fileStrs[2]);
                    file.setGroup(fileStrs[3]);
                    fileList.add(file);
                }
            }
        }

        if(!fileList.isEmpty()) {
            fileList = sort(fileList);
        }

        return fileList;
    }

    private java.util.List<SshFile> sort(java.util.List<SshFile> files) {
        java.util.List<SshFile> sortedFileList = new ArrayList<>();

        java.util.List<SshFile> folderList = new ArrayList<>();
        java.util.List<SshFile> fileList = new ArrayList<>();

        for(SshFile file : files) {
            if(file.getType().equals("Folder")) {
                folderList.add(file);
            } else {
                fileList.add(file);
            }
        }

        if(!folderList.isEmpty()) {
            Collections.sort(folderList, (o1, o2) -> (o1.getName().compareTo(o2.getName())));
        }

        if(!fileList.isEmpty()) {
            Collections.sort(fileList, (o1, o2) -> (o1.getName().compareTo(o2.getName())));
        }

        sortedFileList.addAll(folderList);
        sortedFileList.addAll(fileList);

        return sortedFileList;
    }

    private void expandAllNodes(JTree tree, int startingIndex, int rowCount) {
        for(int i=startingIndex; i<rowCount; ++i) {
            tree.expandRow(i);
        }

        if(tree.getRowCount() != rowCount) {
            expandAllNodes(tree, rowCount, tree.getRowCount());
        }
    }

    public void copyFileFrom(String cmd) {
        System.out.println("Command: " + cmd);

        try {
            ProcessBuilder builder = new ProcessBuilder("cmd.exe", "/c", cmd);
            builder.redirectErrorStream(true);
            Process p = builder.start();

            BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream()));
            String retLine;
            while(true) {
                retLine = r.readLine();
                if(retLine == null) {
                    break;
                }
                System.out.println(retLine);
            }

            Thread.sleep(100);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
