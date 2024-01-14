package com.lm.linux.gui.toolkit.workflow.framework;

import com.lm.linux.gui.toolkit.explorer.CustomTextPane;
import lombok.Data;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.util.Map;

@Data
public class CommandSender extends Thread {
    private String command;
    private String serverHostName;
    private Map<String, String> configs;
    private CustomTextPane logTextPane;
    private DataInputStream streamReader;
    private DataOutputStream streamWriter;

    private LogMessageDisplay logMessageDisplay;
    private Integer logMessageDisplayLock;

    private Thread preprocecessor;

    public CommandSender(String command, String serverHostName, Map<String, String> configs, CustomTextPane logTextPane, DataInputStream dis, DataOutputStream dos) {
        this.command = command;
        this.serverHostName = serverHostName;
        this.configs = configs;
        this.logTextPane = logTextPane;
        this.streamReader = dis;
        this.streamWriter = dos;
    }

    public CommandSender(String command, CustomTextPane logTextPane, DataInputStream dis, DataOutputStream dos) {
        this.command = command;
        this.logTextPane = logTextPane;
        this.streamReader = dis;
        this.streamWriter = dos;
    }

    @Override
    public void run() {
        if(preprocecessor != null) {
            try {
                preprocecessor.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        System.out.println(command);

        if(command.startsWith("pscp")) {
            try {
                logMessageDisplay = LogMessageDisplayBuilder.build(logTextPane);
                logMessageDisplay.play(logTextPane, command, serverHostName, configs);
            } catch(Exception e) {
                e.printStackTrace();
            }
        } else {
            if(configs != null) {
                for(String key : configs.keySet()) {
                    while(command.indexOf("${" + key + "}") >= 0) {
                        command = command.replace("${" + key + "}", configs.get(key));
                    }
                    while(command.indexOf("{" + key + "}") >= 0) {
                        command = command.replace("{" + key + "}", configs.get(key));
                    }
                    while(command.indexOf("$" + key) >= 0) {
                        command = command.replace("$" + key, configs.get(key));
                    }
                }
            }

            try {
                logMessageDisplay = LogMessageDisplayBuilder.build(logTextPane);
                logMessageDisplay.play(logTextPane, streamReader, streamWriter, command);
            } catch(Exception e) {
                e.printStackTrace();
            }
        }

        try {
            Thread.sleep(200);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
