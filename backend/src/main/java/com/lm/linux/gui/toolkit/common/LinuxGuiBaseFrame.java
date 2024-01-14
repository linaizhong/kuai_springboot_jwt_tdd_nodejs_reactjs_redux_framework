package com.lm.linux.gui.toolkit.common;

import lombok.Data;

import javax.swing.*;

@Data
public class LinuxGuiBaseFrame extends JInternalFrame  {
    protected int key = 0;
    protected static int openFrameCount = 0;
    protected static final int xOffset = 30, yOffset = 30;

    public LinuxGuiBaseFrame(String title) {
        super(title, true, true, true, true);
        key = openFrameCount;

        setTitle(title + " --- " + key);
        setDefaultCloseOperation(WindowConstants.HIDE_ON_CLOSE);
        setSize(500, 300);
        setVisible(true);
        setLocation(xOffset*openFrameCount, yOffset*openFrameCount);
        openFrameCount++;
    }

    public int getKey() {
        return key;
    }
}
