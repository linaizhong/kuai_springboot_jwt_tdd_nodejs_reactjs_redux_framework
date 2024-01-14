package com.lm.linux.gui.toolkit.common;

import static javax.swing.UIManager.getIcon;

import java.awt.Color;

import javax.swing.ImageIcon;

public class AaIcons {
    public static ImageIcon ICON_NEW = (ImageIcon)getIcon("FileView.fileIcon");

    public static ImageIcon ICON_ABOUT;
    public static ImageIcon ICON_BOOK;
    public static ImageIcon ICON_EXIT;
    public static ImageIcon ICON_OPEN;
    public static ImageIcon ICON_SAVE;
    public static ImageIcon ICON_CLOSE;
    public static ImageIcon ICON_CLOSE_ALL;
	public static ImageIcon ICON_LEAF;
    public static ImageIcon ICON_FIND;
    public static ImageIcon ICON_FIND_ALL;
    public static ImageIcon ICON_FIND_FETCH_TRIPS;
    public static ImageIcon ICON_SAVE_AS;
    public static ImageIcon ICON_LOG_TABLE;
    public static ImageIcon ICON_CSV_TABLE;
    public static ImageIcon ICON_TEST;
    public static ImageIcon ICON_CLEAR;
    public static ImageIcon ICON_TO_TAB;
    public static ImageIcon ICON_EDITING;
    public static ImageIcon ICON_EXEC;
    public static ImageIcon ICON_START;
    public static ImageIcon ICON_STOP;
    public static ImageIcon ICON_PAUSE;
    public static ImageIcon ICON_RESUME;
    public static ImageIcon ICON_CONTINUE;
    public static ImageIcon ICON_TAIL;
    public static ImageIcon ICON_CREATE_CONTEXT;
    public static ImageIcon ICON_CREATE_ACCOUNT;
    public static ImageIcon ICON_CREATE_CASE;
    public static ImageIcon ICON_ADD;
    public static ImageIcon ICON_UPDATE;
    public static ImageIcon ICON_GST;
    public static ImageIcon ICON_TAX;
    public static ImageIcon ICON_FILTER;
    public static ImageIcon ICON_REFRESH;
    public static ImageIcon ICON_CAMERA;
    public static ImageIcon ICON_DOC;
    public static ImageIcon ICON_PDF;
    public static ImageIcon ICON_JSON;
    public static ImageIcon ICON_XML;
    public static ImageIcon ICON_XLSX;
    public static ImageIcon ICON_RDF;
    public static ImageIcon ICON_MP4;
    public static ImageIcon ICON_MP3;
    public static ImageIcon ICON_FLV;
    public static ImageIcon ICON_AVI;
    public static ImageIcon ICON_AU;
    public static ImageIcon ICON_TXT;
    public static ImageIcon ICON_SCREENSHOT;
    public static ImageIcon ICON_NEW_VIEW;
    public static ImageIcon ICON_LICENSE;
    public static ImageIcon ICON_EXPORT;
    public static ImageIcon ICON_GITBASH;
    public static ImageIcon ICON_TERMINAL;
    public static ImageIcon ICON_NEW_PROJECT;
    public static ImageIcon ICON_SREENSHOT;
    public static ImageIcon ICON_DELETE;
    public static ImageIcon ICON_PENCIL;
    public static ImageIcon ICON_BEFORE;
    public static ImageIcon ICON_AFTER;
    public static ImageIcon ICON_STOP_QUIZ;
    public static ImageIcon ICON_INSERT;
    public static ImageIcon ICON_SAVE_CSV;
    public static ImageIcon ICON_LINUX_EXPLORER;
    public static ImageIcon ICON_WORKFLOW_FRAMEWORK;

    public static Color BAR_COLOR = new Color(192, 192, 255);

    public static void readAllIcons() {
        ICON_ABOUT = getImageIcon("about.png");
        ICON_BOOK = getImageIcon("book.gif");
        ICON_EXIT = getImageIcon("exit.gif");
        ICON_OPEN = getImageIcon("open.gif");
        ICON_CLOSE = getImageIcon("close.gif");
        ICON_CLOSE_ALL = getImageIcon("closeAll.gif");
        ICON_LEAF = getImageIcon("test.png");
        ICON_FIND = getImageIcon("find.gif");
        ICON_FIND_ALL = getImageIcon("findAll.gif");
        ICON_FIND_FETCH_TRIPS = getImageIcon("find_pattern.gif");
        ICON_SAVE = getImageIcon("save.png");
        ICON_SAVE_AS = getImageIcon("saveas.png");
        ICON_LOG_TABLE = getImageIcon("table.gif");
        ICON_CSV_TABLE = getImageIcon("csvtable.gif");
        ICON_TEST = getImageIcon("test.gif");
        ICON_CLEAR = getImageIcon("clear.gif");
        ICON_TO_TAB = getImageIcon("to_tab.gif");
        ICON_EDITING = getImageIcon("edit16.png");
        ICON_EXEC = getImageIcon("exec.gif");
        ICON_START = getImageIcon("start.gif");
        ICON_STOP = getImageIcon("stop.gif");
        ICON_PAUSE = getImageIcon("pause.gif");
        ICON_RESUME = getImageIcon("resume.gif");
        ICON_CONTINUE = getImageIcon("continue.gif");
        ICON_TAIL = getImageIcon("tail.gif");
        ICON_CREATE_CONTEXT = getImageIcon("add.png");
        ICON_CREATE_ACCOUNT = getImageIcon("add.png");
        ICON_CREATE_CASE = getImageIcon("add.png");
        ICON_ADD = getImageIcon("add.png");
        ICON_UPDATE = getImageIcon("change.gif");
        ICON_GST = getImageIcon("gst.png");
        ICON_TAX = getImageIcon("tax.png");
        ICON_FILTER = getImageIcon("filter.png");
        ICON_REFRESH = getImageIcon("refresh.gif");
        ICON_CAMERA = getImageIcon("camera.png");
        ICON_DOC = getImageIcon("doc.png");
        ICON_PDF = getImageIcon("pdf.png");
        ICON_JSON = getImageIcon("json.png");
        ICON_XML = getImageIcon("xml.png");
        ICON_XLSX = getImageIcon("xlsx.png");
        ICON_RDF = getImageIcon("rdf.png");
        ICON_MP4 = getImageIcon("mp4.png");
        ICON_MP3 = getImageIcon("mp3.png");
        ICON_FLV = getImageIcon("flv.png");
        ICON_AVI = getImageIcon("avi.png");
        ICON_TXT = getImageIcon("txt.png");
        ICON_AU = getImageIcon("au.png");
        ICON_SCREENSHOT = getImageIcon("screenshot.png");
        ICON_NEW_VIEW = getImageIcon("new-view.gif");
        ICON_LICENSE = getImageIcon("license.png");
        ICON_EXPORT = getImageIcon("export.png");
        ICON_GITBASH = getImageIcon("gitbash.png");
        ICON_TERMINAL = getImageIcon("terminal.png");
        ICON_NEW_PROJECT = getImageIcon("new-proj.png");
        ICON_SREENSHOT = getImageIcon("screenshot.png");
        ICON_DELETE = getImageIcon("delete-image.png");
        ICON_PENCIL = getImageIcon("pencil.png");
        ICON_BEFORE = getImageIcon("publish.gif");
        ICON_AFTER = getImageIcon("load.gif");
        ICON_STOP_QUIZ = getImageIcon("play_stop.png");
        ICON_INSERT = getImageIcon("insert.png");
        ICON_SAVE_CSV = getImageIcon("save-csv.png");
        ICON_LINUX_EXPLORER = getImageIcon("linux-explorer.png");
        ICON_WORKFLOW_FRAMEWORK = getImageIcon("workflow-framework.png");
    }

    public static synchronized ImageIcon getImageIcon(String iconName) {
		try {
			ImageIcon icon = new ImageIcon(System.getProperty("user.dir") + "/resources/images/" + iconName);
			return icon;
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}
}
