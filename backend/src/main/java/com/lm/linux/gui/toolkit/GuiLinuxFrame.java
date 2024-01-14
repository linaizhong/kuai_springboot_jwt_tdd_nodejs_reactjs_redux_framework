package com.lm.linux.gui.toolkit;

import com.formdev.flatlaf.FlatLightLaf;
import com.lm.linux.gui.toolkit.common.AaIcons;
import com.lm.linux.gui.toolkit.common.AboutDialog;
import com.lm.linux.gui.toolkit.internalframe.LinuxExplorerFrame;
import com.lm.linux.gui.toolkit.workflow.framework.WorkflowFrameworkFrame;

import javax.swing.*;
import java.awt.*;
import java.awt.event.KeyEvent;
import java.util.HashMap;
import java.util.Map;

public class GuiLinuxFrame extends JFrame {
    public static Font DEFAULT_FONT = new Font("Courier New", Font.PLAIN, 14);

    private static GuiLinuxFrame frame;

    private static Map<Integer, LinuxExplorerFrame> leFrames = new HashMap<>();
    private static Map<Integer, WorkflowFrameworkFrame> wfFrames = new HashMap<>();

    private static final int desktopWidth = 500;
    private static final int desktopHeight = 300;

    private JDesktopPane desktop;

    public GuiLinuxFrame(String title) {
        super(title);

        JPanel contentPanel = new JPanel(new BorderLayout());
        contentPanel.setPreferredSize(Toolkit.getDefaultToolkit().getScreenSize());

        JToolBar jtb = createToolBar();
        contentPanel.add(jtb, BorderLayout.NORTH);

        desktop = new JDesktopPane();
        desktop.putClientProperty("JDesktopPane.dragMode", "outline");
        desktop.setPreferredSize(new Dimension(desktopWidth, desktopHeight));
        contentPanel.add(desktop, BorderLayout.CENTER);

        setContentPane(contentPanel);

        setExtendedState(getExtendedState() | JFrame.MAXIMIZED_BOTH);

//        FlatLightLaf.setup();
        JFrame.setDefaultLookAndFeelDecorated(true);
//        getRootPane().putClientProperty("JRootPane.titleBarBackground", new Color(40,40,255));
//        getRootPane().putClientProperty("JRootPane.titleBarForeground", Color.WHITE);
    }

    public static void createAndShowGUI() {
        JFrame.setDefaultLookAndFeelDecorated(true);

        frame = new GuiLinuxFrame("Linux Toolkit");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        frame.pack();
        frame.setVisible(true);

        JMenuBar jmb = frame.createMenuBar();
        frame.setJMenuBar(jmb);
    }

    public static JFrame getFrame() {
        return frame;
    }

    private JMenuBar createMenuBar() {
        JMenuBar menuBar;
        JMenu menu;

        menuBar = new JMenuBar();
        menuBar.setBackground(AaIcons.BAR_COLOR);

        menu = new JMenu("File    ");
        menu.setMnemonic(KeyEvent.VK_F);

        JMenuItem jmiFileExit = new JMenuItem("Exit");
        jmiFileExit.setIcon(AaIcons.ICON_EXIT);
        jmiFileExit.addActionListener(e -> {
            System.exit(0);
        });
        menu.add(jmiFileExit);
        menuBar.add(menu);

        menu = new JMenu("Tools    ");
        menu.setMnemonic(KeyEvent.VK_S);
        JMenuItem jmiLinuxExplorer = new JMenuItem("Linux Explorer");
        jmiLinuxExplorer.setIcon(AaIcons.ICON_LINUX_EXPLORER);
        jmiLinuxExplorer.addActionListener(e -> {
            addLinuxExplorer();
        });
        menu.add(jmiLinuxExplorer);
        menu.addSeparator();
        JMenuItem jmiWorkflowFramework = new JMenuItem("Workflow Framework");
        jmiWorkflowFramework.setIcon(AaIcons.ICON_WORKFLOW_FRAMEWORK);
        jmiWorkflowFramework.addActionListener(e -> {
            addWorkflowFramework();
        });
        menu.add(jmiWorkflowFramework);
        menuBar.add(menu);

        menu = new JMenu("Window    ");
        menu.setMnemonic(KeyEvent.VK_S);
        JMenuItem jmiPreferences = new JMenuItem("Preferences");
        jmiPreferences.setIcon(AaIcons.ICON_FIND_ALL);
        jmiPreferences.addActionListener(e -> {
        });
        menu.add(jmiPreferences);
        menuBar.add(menu);

        menu = new JMenu("Help");
        menu.setMnemonic(KeyEvent.VK_H);
        JMenuItem jmiHelpAbout = new JMenuItem("About");
        jmiHelpAbout.setIcon(AaIcons.ICON_ABOUT);
        jmiHelpAbout.addActionListener(e -> {
            new AboutDialog();
        });
        menu.add(jmiHelpAbout);
        menuBar.add(menu);

        return menuBar;
    }

    private JToolBar createToolBar() {
        JToolBar jtb = new JToolBar();
        jtb.setPreferredSize(new Dimension(-1, 24));
        jtb.setBackground(new Color(192, 192, 255));

        JButton jbLinuxExplorer = new JButton();
        jbLinuxExplorer.setIcon(AaIcons.ICON_LINUX_EXPLORER);
        jbLinuxExplorer.setToolTipText("Open linux explorer");
        jbLinuxExplorer.addActionListener(e -> {
            addLinuxExplorer();
        });
        jtb.add(jbLinuxExplorer);
        jtb.addSeparator();
        JButton jbWorkflowFramework = new JButton();
        jbWorkflowFramework.setIcon(AaIcons.ICON_WORKFLOW_FRAMEWORK);
        jbWorkflowFramework.setToolTipText("Open workflow framework");
        jbWorkflowFramework.addActionListener(e -> {
            addWorkflowFramework();
        });
        jtb.add(jbWorkflowFramework);

        return jtb;
    }

    private void addLinuxExplorer() {
        LinuxExplorerFrame lfFrame = new LinuxExplorerFrame();
        desktop.add(lfFrame);
        leFrames.put(lfFrame.getKey(), lfFrame);
        lfFrame.toFront();
    }

    private void addWorkflowFramework() {
        WorkflowFrameworkFrame wfFrame = new WorkflowFrameworkFrame();
        desktop.add(wfFrame);
        wfFrames.put(wfFrame.getKey(), wfFrame);
        wfFrame.toFront();
    }

    public static void removeLinuxExplorer(Integer key) {
        leFrames.remove(key);
    }

    public static void removeWorkflowFramework(Integer key) {
        wfFrames.remove(key);
    }
}