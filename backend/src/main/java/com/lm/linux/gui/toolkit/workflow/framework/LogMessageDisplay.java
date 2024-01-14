package com.lm.linux.gui.toolkit.workflow.framework;

import com.lm.linux.gui.toolkit.explorer.CustomTextPane;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.util.Map;

public class LogMessageDisplay implements Runnable {
    private CustomTextPane logTextPane;
    private DataInputStream streamReader;
    private DataOutputStream streamWriter;
    private String cmd;
    private String serverHostName;
    private Map<String, String> configs;

    public LogMessageDisplay(CustomTextPane logTextPane) {
        this.logTextPane = logTextPane;
    }

    public void play(CustomTextPane logTextPane, String cmd, String serverHostName, Map<String, String> configs) {
        this.logTextPane = logTextPane;
        this.cmd = cmd;
        this.serverHostName = serverHostName;
        this.configs = configs;

        Thread th = new Thread(this);
        th.start();
    }

    public void play(CustomTextPane logTextPane, DataInputStream dis, DataOutputStream dos, String cmd) {
        this.logTextPane = logTextPane;
        this.streamReader = dis;
        this.streamWriter = dos;
        this.cmd = cmd;

        Thread th = new Thread(this);
        th.start();
    }

    @Override
    public void run() {
        if(streamReader == null) {
            try {
                cmd = cmd.replace("${SERVER_HOSTNAME}", serverHostName);
                cmd = cmd.replace("${USERNAME}", configs.get("USERNAME"));
                String cmd1 = new String(cmd);
                cmd = cmd.replace("${PASSWORD}", configs.get("PASSWORD"));
                cmd1 = cmd1.replace("${PASSWORD}", "******");

                logTextPane.appendLine("Command>" + cmd1);

                ProcessBuilder builder = new ProcessBuilder("cmd.exe", "/c", cmd);
                builder.redirectErrorStream(true);
                Process p = builder.start();

                BufferedReader r = new BufferedReader(new InputStreamReader(p.getInputStream()));
                String retLine;
                while(true) {
                    try {
                        retLine = r.readLine();
                        if(retLine == null) {
                            break;
                        }
                        logTextPane.appendLine(retLine);
                    } catch(Exception e) {
                        e.printStackTrace();
                    }

                    Thread.sleep(100);
                }

                p.waitFor();
                p.destroy();

                logTextPane.appendLine("");
                logTextPane.appendText("$>");

                LogMessageDisplayBuilder.release();
            } catch(Exception e) {
                e.printStackTrace();

                LogMessageDisplayBuilder.release();
            }
        } else {
            try {
                System.out.println(streamReader.readUTF() + cmd);
                if(logTextPane == null) {
                    System.out.println("$>" + cmd);
                } else if(configs != null) {
                    logTextPane.appendLine("$>" + cmd);
                }

                if(cmd.startsWith("cd ")) {
                    streamWriter.writeUTF("[CD]>>" + cmd);
                } else {
                    streamWriter.writeUTF("[COMMAND]>>" + cmd);
                }

                String retString = streamReader.readUTF();
                while(!retString.equals("COMPLETED")) {
                    if(logTextPane == null || retString.trim().startsWith("Command")) {
                        System.out.println(retString);
                    } else {
                        logTextPane.appendLine(retString);
                    }
                    retString = streamReader.readUTF();

                    Thread.sleep(100);
                }

                logTextPane.appendLine("");
                logTextPane.appendText("$>");

                LogMessageDisplayBuilder.release();
            } catch(Exception e) {
                e.printStackTrace();

                LogMessageDisplayBuilder.release();
            }
        }
    }
}
