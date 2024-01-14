package com.lm.linux.gui.toolkit.explorer;

import com.lm.linux.gui.toolkit.internalframe.LinuxExplorerFrame;
import lombok.Data;

import javax.swing.*;
import java.awt.*;

public class LinuxGuiExplorer extends JPanel {
    private JSplitPane jsp;
    private LinuxExplorerFrame explorer;
    private FolderTreePanel fTree;
    private FileTablePanel fTable;

    public LinuxGuiExplorer(LinuxExplorerFrame explorer) {
        super(new BorderLayout());
        this.explorer = explorer;

        fTree = new FolderTreePanel(explorer);
        fTable = new FileTablePanel(explorer);
        jsp = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, fTree, fTable);
        add(jsp);

        SwingUtilities.invokeLater(() -> {
            jsp.setDividerLocation(0.4);
        });
    }

    public void setDividerLocation(double d) {
        jsp.setDividerLocation(d);
    }

    public JTree getFTree() {
        return fTree.getFolderTree();
    }

    public JTable getFTable() {
        return fTable.getFileTable();
    }
}
