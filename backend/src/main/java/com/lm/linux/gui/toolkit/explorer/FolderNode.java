package com.lm.linux.gui.toolkit.explorer;

import lombok.Data;

import javax.swing.tree.DefaultMutableTreeNode;

@Data
public class FolderNode extends DefaultMutableTreeNode {
    private String label;
    private String type;
    private Object nodeObject;
    private boolean loaded = false;

    public FolderNode(String label) {
        super(label);
    };
}
