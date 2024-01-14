package com.lm.linux.gui.toolkit.explorer;

import com.lm.linux.gui.toolkit.GuiLinuxFrame;
import com.lm.linux.gui.toolkit.internalframe.LinuxExplorerFrame;
import lombok.Data;

import javax.swing.*;
import javax.swing.tree.DefaultTreeCellRenderer;
import javax.swing.tree.DefaultTreeModel;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

@Data
public class FolderTreePanel extends JPanel {
    private JTree folderTree;
    private DefaultTreeModel treeModel;
    private LinuxExplorerFrame explorer;

    public FolderTreePanel(LinuxExplorerFrame explorer) {
        super(new BorderLayout());
        this.explorer = explorer;

        JToolBar jtbTree = new JToolBar();
        jtbTree.setBackground(new Color(192, 192, 255));
        jtbTree.setPreferredSize(new Dimension(-1, 24));
        add(jtbTree, BorderLayout.NORTH);

        folderTree = new JTree();
        folderTree.setFont(GuiLinuxFrame.DEFAULT_FONT);
        folderTree.setRowHeight(24);
        folderTree.setCellRenderer(new MyDefaultRenderer());

        treeModel = (DefaultTreeModel) folderTree.getModel();
        FolderNode root = new FolderNode("/");
        SshFile sshFile = new SshFile();
        sshFile.setName("/");
        root.setNodeObject(sshFile);
        root.setUserObject("/");
        treeModel.setRoot(root);
        add(new JScrollPane(folderTree), BorderLayout.CENTER);

        folderTree.addMouseListener(new MouseAdapter() {
            @Override
            public void mousePressed(MouseEvent e) {
                super.mousePressed(e);
                if(e.getClickCount() == 2) {
                    Object nodeObj = folderTree.getLastSelectedPathComponent();
                    if(nodeObj instanceof FolderNode) {
                        FolderNode currentNode = (FolderNode) nodeObj;
                        explorer.setCurrentNode(currentNode);

                        SshFile file = (SshFile) currentNode.getNodeObject();
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
                    }
                }
            }
        });
    }

    protected static class MyDefaultRenderer extends DefaultTreeCellRenderer {
        public Component getTreeCellRendererComponent(JTree tree, Object value, boolean selected, boolean expanded, boolean leaf, int row, boolean hasFocus) {
            JLabel c = (JLabel)super.getTreeCellRendererComponent(tree, value, selected, expanded, leaf, row, hasFocus);

            if(value instanceof FolderNode) {
                SshFile file = (SshFile) ((FolderNode)value).getNodeObject();
                if(file != null) {
                    c.setIcon(new ImageIcon("resources/images/TreeClosed.gif"));
                    c.setText(file.getName());
                }
            }

            return c;
        }
    }
}
