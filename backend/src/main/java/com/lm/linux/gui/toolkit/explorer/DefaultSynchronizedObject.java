package com.lm.linux.gui.toolkit.explorer;

public class DefaultSynchronizedObject implements SynchronizedObject {
	@Override
	public void startCommand(String command, boolean terminal) {
	}

	@Override
	public String getObjectType() {
		return getClass().getTypeName();
	}

}
