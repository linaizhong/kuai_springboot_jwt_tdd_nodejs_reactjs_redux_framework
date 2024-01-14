package com.lm.linux.gui.toolkit;

import com.lm.linux.gui.toolkit.common.AaIcons;

import javax.swing.*;

public class GuiLinuxToolkit {
    public static void main(String[] args) {
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (Exception e) {
            e.printStackTrace();
        }

        javax.swing.SwingUtilities.invokeLater(() -> {
            AaIcons.readAllIcons();
            GuiLinuxFrame.createAndShowGUI();
        });
    }
}
