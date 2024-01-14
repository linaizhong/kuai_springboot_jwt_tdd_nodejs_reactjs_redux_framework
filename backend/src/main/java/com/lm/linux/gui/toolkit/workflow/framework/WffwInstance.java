package com.lm.linux.gui.toolkit.workflow.framework;

import lombok.Data;
import org.yaml.snakeyaml.LoaderOptions;

import java.util.ArrayList;
import java.util.List;

@Data
public class WffwInstance extends LoaderOptions {
    private String yamlFileName;
    private List<SubGroup> subGroups = new ArrayList<>();
}
