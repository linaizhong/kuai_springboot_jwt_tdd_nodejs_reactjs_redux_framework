package com.lm.linux.gui.toolkit.workflow.framework;

import com.lm.linux.gui.toolkit.explorer.CustomTextPane;

public class LogMessageDisplayBuilder {
    private static Integer logMessageDisplayLocker = 0;
    private final static Object IS_USED = new Object();

    public static LogMessageDisplay build(CustomTextPane logTextPane) throws InterruptedException {
        synchronized (IS_USED) {
            while(logMessageDisplayLocker == 1) {
                IS_USED.wait();
            }

            logMessageDisplayLocker = 1;
            return new LogMessageDisplay(logTextPane);
        }
    }

    public static void release() {
        synchronized (IS_USED) {
            logMessageDisplayLocker = 0;
            IS_USED.notify();
        }
    }
}
