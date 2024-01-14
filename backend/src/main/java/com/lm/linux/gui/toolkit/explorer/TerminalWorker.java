package com.lm.linux.gui.toolkit.explorer;

import com.lm.linux.gui.toolkit.internalframe.LinuxExplorerFrame;
import lombok.Data;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

@Data
public class TerminalWorker implements Runnable, SynchronizedObject {
    private LinuxExplorerFrame explorer;
    private CustomTextPane textPane;
    private String command;
    private BufferedReader streamReader;
    private ByteArrayOutputStream outputStream;
    private PrintStream printStream;
    private String prompt = "$";
    private boolean terminal = true;
    private boolean connectCommand = true;

    public TerminalWorker(LinuxExplorerFrame explorer, PrintStream printStream, ByteArrayOutputStream outputStream, BufferedReader streamReader, CustomTextPane textPane) {
        this.explorer = explorer;
        this.printStream = printStream;
        this.outputStream = outputStream;
        this.streamReader = streamReader;
        this.textPane = textPane;
    }

    @Override
    public void startCommand(String command, boolean terminal) {
        SynchronizedObjectWraper.start(this);

        this.command = command;
        this.terminal = terminal;

        (new Thread(this)).start();
    }

    @Override
    public String getObjectType() {
        return getClass().getTypeName();
    }

    public void run() {
        if(!terminal) {
            printStream.println(command);
            printStream.flush();

            try {
                String line = streamReader.readLine();
                int count = 0;

                java.util.List<String> responseList = new ArrayList<>();
                while(line != null && count++ < 10) {
                    TimeUnit.MILLISECONDS.sleep(2);
                    if(line.trim().endsWith(prompt)) {
                        break;
                    } else if(line.trim().indexOf("]" + prompt) < 0) {
                        count = 0;
                        line = line.trim().replaceAll("\\[..;..[m]|\\[.{0,2}[m]|\\(Page \\d+\\)|\u001B\\[[k]|\u001B|\u000F", "");

                        System.out.println("Line: " + line);

                        responseList.add(line);
                    }
                    line = streamReader.readLine();
                }

                if(command.equals("pwd") && !responseList.isEmpty()) {
                    explorer.setPwdOnExplorer(responseList.get(responseList.size() - 1));
                } else if(command.equals("ls -la")) {
                    explorer.setLsOnExplorer(responseList);
                }
            } catch(Exception e) {
                e.printStackTrace();
            }

            SynchronizedObjectWraper.release(this);
        } else {
            printStream.println(command);
            printStream.flush();
            textPane.appendLine("");

            try {
                String line = streamReader.readLine();
                int count = 0;
                while(line != null && count++ < 10) {
                    TimeUnit.MILLISECONDS.sleep(2);
                    if(line.trim().endsWith("$")) {
                        textPane.appendText(line);
                        break;
                    } else if(line.trim().indexOf("]$") < 0) {
                        count = 0;
                        line = line.trim().replaceAll("\\[..;..[m]|\\[.{0,2}[m]|\\(Page \\d+\\)|\u001B\\[[k]|\u001B|\u000F", "");

                        System.out.println("Line: " + line);

                        if(!line.endsWith(command)) {
                            if(!connectCommand) {
                                textPane.appendLine(line.trim());
                            } else {
                                if(!line.startsWith("/home/")) {
                                    textPane.appendLine(line.trim());
                                }
                            }
                        }
                    }
                    line = streamReader.readLine();
                }

                if(count >= 10) {
                    textPane.appendLine("$ ");
                }
            } catch (IOException | InterruptedException e) {
                e.printStackTrace();
            }

            connectCommand = false;
            SynchronizedObjectWraper.release(this);
        }
    }
}
