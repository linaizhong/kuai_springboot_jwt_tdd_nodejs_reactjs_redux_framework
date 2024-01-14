package com.lm.linux.gui.toolkit.workflow.framework;

import com.lm.linux.gui.toolkit.GuiLinuxFrame;
import com.lm.linux.gui.toolkit.common.LinuxGuiBaseFrame;

import javax.swing.event.InternalFrameEvent;
import javax.swing.event.InternalFrameListener;

public class WorkflowFrameworkFrame extends LinuxGuiBaseFrame implements InternalFrameListener {
    public WorkflowFrameworkFrame() {
        super("Workflow Framework");
        addInternalFrameListener(this);
    }


    public void internalFrameClosing(InternalFrameEvent e) {
    }

    public void internalFrameClosed(InternalFrameEvent e) {
        GuiLinuxFrame.removeWorkflowFramework(getKey());
    }

    public void internalFrameOpened(InternalFrameEvent e) {
    }

    public void internalFrameIconified(InternalFrameEvent e) {
    }

    public void internalFrameDeiconified(InternalFrameEvent e) {
    }

    public void internalFrameActivated(InternalFrameEvent e) {
    }

    public void internalFrameDeactivated(InternalFrameEvent e) {
    }
}
