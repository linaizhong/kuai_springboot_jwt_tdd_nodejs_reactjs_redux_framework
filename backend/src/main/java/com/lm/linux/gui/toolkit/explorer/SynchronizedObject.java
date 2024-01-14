package com.lm.linux.gui.toolkit.explorer;

interface SynchronizedObject {
	void startCommand(String command, boolean terminal);
	String getObjectType();
}
