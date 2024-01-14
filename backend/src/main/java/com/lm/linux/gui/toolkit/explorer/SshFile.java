package com.lm.linux.gui.toolkit.explorer;

import lombok.Data;

@Data
public class SshFile {
    private String path;
    private String type;
    private String name;
    private long size;
    private String changed;
    private String permissions;
    private String owner;
    private String group;

    @Override
    public String toString() {
        return name;
    }
}
