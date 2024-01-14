package com.lm.linux.gui.toolkit.explorer;

import java.util.HashMap;
import java.util.Map;

public class SynchronizedObjectWraper {
	private static Map<Object, Integer> lockerMap = new HashMap<>();
	private static Map<Object, Object> isUsedMap = new HashMap<>();
	
	public static void start(SynchronizedObject sobj) {
		if(isUsedMap.get(sobj) == null) {
			lockerMap.put(sobj, 0);
			isUsedMap.put(sobj, new Object());
		}

//		System.out.println("Building synchronized object......" + sobj.toString());

		synchronized(isUsedMap.get(sobj)) {
			while(lockerMap.get(sobj) == 1) {
				try {
					isUsedMap.get(sobj).wait();
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		}
		
//		System.out.println("Synchronized object built");
		lockerMap.put(sobj, 1);
	}

	public static void release(SynchronizedObject sobj) {
//		System.out.println("Releasing synchronized object......" + sobj.toString());

		if(isUsedMap.get(sobj) == null)
			return;

		synchronized(isUsedMap.get(sobj)) {
			lockerMap.put(sobj, 0);
			isUsedMap.get(sobj).notify();
		}
	}
}
