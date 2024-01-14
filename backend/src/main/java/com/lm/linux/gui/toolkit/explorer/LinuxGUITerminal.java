package com.lm.linux.gui.toolkit.explorer;

import com.jcraft.jsch.*;
import com.lm.linux.gui.toolkit.internalframe.LinuxExplorerFrame;

import javax.swing.*;
import javax.swing.text.BadLocationException;
import javax.swing.text.Utilities;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.KeyEvent;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

public class LinuxGUITerminal extends JPanel {

	private CustomTextPane terminalTextPane = new CustomTextPane(false);
	
	private String hostname = "192.168.1.108";
	private String username = "alan";
	private String password = "Aizhong#0";
	
	private Session session;
	private Channel channel;
	
	private ByteArrayOutputStream outputStream;
	private PrintStream printStream;
	private BufferedReader streamReader;
	
	private JComboBox<String> SERVER_LIST;

	private LinuxExplorerFrame explorer;

	private TerminalWorker terminalWorker;

	public LinuxGUITerminal(LinuxExplorerFrame explorer) {
		this.explorer = explorer;

		setLayout(new BorderLayout());
		JToolBar toolBar = new JToolBar();
		toolBar.setBackground(new Color(192, 192, 255));
		toolBar.setPreferredSize(new Dimension(-1, 24));
		add(toolBar, BorderLayout.NORTH);

		List<String> serverList = new ArrayList<>();
		serverList.add("192.168.1.108");
		SERVER_LIST = new JComboBox(serverList.toArray());
		SERVER_LIST.setPreferredSize(new Dimension(100, 20));
		SERVER_LIST.setMaximumSize(SERVER_LIST.getPreferredSize());
		toolBar.add(SERVER_LIST);
		toolBar.addSeparator();
		JButton jbConnect = new JButton();
		jbConnect.setIcon(new ImageIcon("resources/images/road.png"));
		jbConnect.setToolTipText("Connect");
		jbConnect.setBackground(new Color(192, 192, 255));
		jbConnect.addActionListener(ev -> {
			if(session != null) {
				try {
					close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

			try {
				connect();
			} catch (JSchException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		});
		toolBar.add(jbConnect);
		toolBar.addSeparator();
		JButton jbStop = new JButton();
		jbStop.setIcon(new ImageIcon("resources/images/stop-editing.gif"));
		jbStop.setToolTipText("Stop");
		jbStop.setBackground(new Color(192, 192, 255));
		jbStop.addActionListener(ev -> {
		});
		toolBar.add(jbStop);
		toolBar.addSeparator();
		JButton jbClear = new JButton();
		jbClear.setIcon(new ImageIcon("resources/images/delete.gif"));
		jbClear.setToolTipText("Clear text");
		jbClear.setBackground(new Color(192, 192, 255));
		jbClear.addActionListener(ev -> {
			terminalTextPane.setText("$ ");
		});
		toolBar.add(jbClear);

		terminalTextPane.setBackground(new Color(40, 40, 80));
		terminalTextPane.setForeground(new Color(0, 255, 0));
		terminalTextPane.setCaretColor(new Color(0, 255, 0));

		add(new JScrollPane(terminalTextPane), BorderLayout.CENTER);

		terminalTextPane.setEnabled(true);
		terminalTextPane.getCaret().setBlinkRate(500);
		terminalTextPane.getCaret().setVisible(true);
		terminalTextPane.getCaret().setSelectionVisible(true);

		AbstractAction abstractAction = new AbstractAction() {
			@Override
			public void actionPerformed(ActionEvent e) {
				final String command;
				try {
					command = getCommand();
					if(command != null) {
						if(command.startsWith("vim") || command.startsWith("vi")) {
							JOptionPane.showMessageDialog(null, "You do not need to use this editor. You can create file easily use the left pane function.");
						} else {
							doingCommand(command, true);
						}
					}
				} catch (BadLocationException ex) {
					ex.printStackTrace();
				}
			}
		};

		terminalTextPane.addFocusListener(new FocusListener() {
			@Override
			public void focusGained(FocusEvent e) {
				int condition = JComponent.WHEN_FOCUSED;
				InputMap iMap = terminalTextPane.getInputMap(condition);
				ActionMap aMap = terminalTextPane.getActionMap();

				String enter = "enter";
				iMap.put(KeyStroke.getKeyStroke(KeyEvent.VK_ENTER, 0), enter);

				aMap.put(enter, abstractAction);
			}

			@Override
			public void focusLost(FocusEvent e) {
				terminalTextPane.getCaret().setVisible(true);
			}
		});
	}

	public void doingCommand(String command, boolean terminal) {
		if(terminal) {
			System.out.println("Terminal command: " + command);
		} else {
			System.out.println("Explorer command: " + command);
		}

		try {
			if(terminalWorker == null) {
				terminalWorker = new TerminalWorker(explorer, printStream, outputStream, streamReader, terminalTextPane);
			}

			if(command != null) {
				terminalWorker.startCommand(command, terminal);
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

	public String getCommand() throws BadLocationException {
		String command = null;

		int end = terminalTextPane.getDocument().getLength();
		int start = Utilities.getRowStart(terminalTextPane, end);
		while(start == end) {
			end--;
			start = Utilities.getRowStart(terminalTextPane, end);
		}
		String text = terminalTextPane.getText(start, end - start);
		int index = text.lastIndexOf("$");
		if(index > 0) {
			command = text.substring(index + 1).trim();
		}

		return command;
	}

	private void connect() throws JSchException, IOException {
		Properties config = new Properties();
		config.put("StrictHostKeyChecking", "no");

		JSch jsch = new JSch();
		session = jsch.getSession(username, hostname, 22);
		session.setPassword(password);
		session.setConfig(config);
		session.connect(30000);
		System.out.println("Connected");

		outputStream = new ByteArrayOutputStream();
		channel = (ChannelShell) session.openChannel("shell");
		channel.setOutputStream(outputStream);

		printStream = new PrintStream(channel.getOutputStream());

		channel.connect();

		streamReader = new BufferedReader(new InputStreamReader(channel.getInputStream(), "UTF-8"));

		doingCommand("pwd", true);

		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		doingCommand("pwd", false);
	}

	private void close() throws IOException {
		if(streamReader != null) {
			streamReader.close();
		}

		if(printStream != null) {
			printStream.close();
		}

		if(outputStream != null) {
			outputStream.close();
		}

		if(channel != null) {
			channel.disconnect();
		}

		if(session != null) {
			session.disconnect();
		}

		System.out.println("Session terminated");
	}
}