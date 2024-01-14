package com.lm.linux.gui.toolkit.workflow.framework;

import lombok.Data;

@Data
public class Command {
    private String name;
    private String cmd;
    private String runFlags;
    private boolean ignoreSuccessfulFile;
}
