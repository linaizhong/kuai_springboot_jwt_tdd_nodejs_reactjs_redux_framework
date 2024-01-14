package com.lm.linux.gui.toolkit.workflow.framework;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lm.linux.gui.toolkit.explorer.CustomTextPane;
import org.yaml.snakeyaml.Yaml;

import javax.swing.*;
import java.io.*;
import java.net.InetAddress;
import java.net.Socket;
import java.util.*;

public class AgentConnection {
    private Map<String, String> exports = new HashMap<>();
    private Map<String, String> configs = new HashMap<>();

    private WffwInstance wffwInstance;

    private DataInputStream streamReader;
    private DataOutputStream streamWriter;

    private String yamlFilePath = "";

    private String serverHostName = "localhost";

    private Socket agentSocket;

    public static void main(String[] args) {
        new AgentConnection("localhost", null, "");
    }

    public AgentConnection() {}

    public AgentConnection(String serverHostName, CustomTextPane logTextPane, String yamlFilePath) {
        this.yamlFilePath = yamlFilePath;
        this.serverHostName = serverHostName;

//        loadExports();
//        loadConfigs();
//        loadWffwInstance();

        try {
            InetAddress inetAddress = InetAddress.getByName(serverHostName);
            Socket agentSocket = new Socket(inetAddress, 65051);

            streamReader = new DataInputStream(agentSocket.getInputStream());
            streamWriter = new DataOutputStream(agentSocket.getOutputStream());

//            doExports(logTextPane);
//            doWffwInstance(logTextPane);

            agentSocket.close();
            streamReader.close();
            streamWriter.close();

            System.out.println("Connection closed");
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    public AgentConnection(String serverHostName, String cmd, JTextPane logTextPane) {
        try {
            InetAddress inetAddress = InetAddress.getByName(serverHostName);
            Socket agentSocket = new Socket(inetAddress, 65051);

            streamReader = new DataInputStream(agentSocket.getInputStream());
            streamWriter = new DataOutputStream(agentSocket.getOutputStream());

            System.out.println(streamReader.readUTF());
            logTextPane.setText(logTextPane.getText() + "$>" + cmd + "\n");
            streamWriter.writeUTF("[COMMAND]>>" + cmd);

            String retString = streamReader.readUTF();
            while(!retString.equals("COMPLETED")) {
                logTextPane.setText(logTextPane.getText() + retString + "\n");
                retString = streamReader.readUTF();
            }

            agentSocket.close();
            streamReader.close();
            streamWriter.close();

            System.out.println("Connection closed");
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    public void connect() {
        if(agentSocket == null) {
            this.serverHostName = serverHostName;

            try {
                InetAddress inetAddress = InetAddress.getByName(serverHostName);
                agentSocket = new Socket(inetAddress, 65051);

                streamReader = new DataInputStream(agentSocket.getInputStream());
                streamWriter = new DataOutputStream(agentSocket.getOutputStream());

                System.out.println("Connection created");
            } catch(Exception e) {
                e.printStackTrace();
            }
        }
    }

    public void exec(CustomTextPane logTextPane, String command) {
        CommandSender sender = new CommandSender(command, logTextPane, streamReader, streamWriter);
        sender.start();
    }

    public void close() {
        try {
            if(agentSocket != null) {
                agentSocket.close();
            }
            if(streamReader != null) {
                streamReader.close();
            }
            if(streamWriter != null) {
                streamWriter.close();
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    private void loadExports() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            exports = mapper.readValue(this.getClass()
                    .getClassLoader()
                    .getResourceAsStream("stf/exports.json"), Map.class);
        } catch(Exception e) {
            e.printStackTrace();
        }
        System.out.println(exports);
    }

    private void loadConfigs() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            configs = mapper.readValue(this.getClass()
                    .getClassLoader()
                    .getResourceAsStream("stf/configs.json"), Map.class);
        } catch(Exception e) {
            e.printStackTrace();
        }
        System.out.println(configs);
    }

    private void loadWffwInstance() {
        try {
            Yaml yaml = new Yaml();
            InputStream inputStream = null;
            if(yamlFilePath == null || yamlFilePath.length() < 1) {
                inputStream = this.getClass().getClassLoader().getResourceAsStream("stf/instances/instance-001/config_forecast_cashflow.yaml");
            } else {
                inputStream = new FileInputStream(new File(yamlFilePath));
            }

            Map<String, Object> yamlObj = yaml.load(inputStream);
            if(yamlObj != null) {
                wffwInstance = new WffwInstance();
                if(yamlFilePath == null || yamlFilePath.length() < 1) {
                    wffwInstance.setYamlFileName("config_forecast_cashflow.yaml");
                } else {
                    wffwInstance.setYamlFileName(yamlFilePath);
                }
                List<LinkedHashMap> subGroups = (List) yamlObj.get("subGroups");
                if(subGroups != null && !subGroups.isEmpty()) {
                    List<SubGroup> newSubGtoups = new ArrayList<>();
                    for(LinkedHashMap map : subGroups) {
                        if(map != null) {
                            SubGroup subGroup = new SubGroup();

                            subGroup.setName((String)map.get("name"));
                            subGroup.setDescription(map.get("description") != null ? (String)map.get("description") : null);
                            subGroup.setConcurrency(map.get("concurrency") != null ? (Integer)map.get("concurrency") : -1);

                            List<LinkedHashMap> commands = (List)map.get("commands");
                            if(commands != null && !commands.isEmpty()) {
                                List<Command> newCommands = new ArrayList<>();
                                for(LinkedHashMap map1 : commands) {
                                    Command command = new Command();
                                    command.setName((String)map1.get("name"));
                                    command.setCmd((String)map1.get("cmd"));
                                    command.setRunFlags(map1.get("run_flags") != null ? (String)map1.get("run_flags") : null);
                                    command.setIgnoreSuccessfulFile(map1.get("ignore_success_file") != null ? (boolean)map1.get("ignore_success_file") : false);

                                    newCommands.add(command);
                                }

                                subGroup.setCommands(newCommands);
                            }

                            newSubGtoups.add(subGroup);
                        }
                    }

                    wffwInstance.setSubGroups(newSubGtoups);
                }
            }
        } catch(Exception e) {
            e.printStackTrace();
        }

        System.out.println(wffwInstance);
    }

    private void doExports(JTextPane logTextPane) throws IOException {
        if(exports != null && !exports.isEmpty()) {
            for(String key : exports.keySet()) {
                System.out.println(streamReader.readUTF());
                String cmd = "[EXPORT]>>export " + key + "=" + exports.get(key);

                streamWriter.writeUTF(cmd);

                String retString = streamReader.readUTF();
                while(!retString.equals("COMPLETED")) {
                    if(logTextPane == null || retString.trim().startsWith("Command")) {
                        System.out.println(retString);
                    } else {
                        logTextPane.setText(logTextPane.getText() + retString + "\n");
                    }
                    retString = streamReader.readUTF();
                }
            }
        }
    }

    private void doWffwInstance(CustomTextPane logTextPane) {
        if(wffwInstance != null) {
            if(wffwInstance.getSubGroups() != null && !wffwInstance.getSubGroups().isEmpty()) {
                List<CommandSender> thList = new ArrayList<>();
                List<SubGroup> subGroups = wffwInstance.getSubGroups();
                if(subGroups != null && !subGroups.isEmpty()) {
                    for(int i=0; i<subGroups.size(); i++) {
                        SubGroup subGroup = subGroups.get(i);
                        if(subGroup != null) {
                            List<Command> commands = subGroup.getCommands();
                            if(commands != null && !commands.isEmpty()) {
                                for(int j=0; j<commands.size(); j++) {
                                    Command command = commands.get(j);
                                    if(command != null) {
                                        thList.add(new CommandSender(command.getCmd(), serverHostName, configs, logTextPane, streamReader, streamWriter));
                                    }
                                }
                            }
                        }
                    }
                }

                if(!thList.isEmpty()) {
                    for(int i=1; i<thList.size(); i++) {
                        thList.get(i).setPreprocecessor(thList.get(i - 1));
                    }

                    for(int i=0; i<thList.size(); i++) {
                        thList.get(i).start();
                    }
                }
            }
        }
    }
}
