package com.lm.linux.gui.toolkit.workflow.framework;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class SubGroup {
    private String name;
    private String description;
    private int concurrency;
    private List<Command> commands = new ArrayList<>();
}
