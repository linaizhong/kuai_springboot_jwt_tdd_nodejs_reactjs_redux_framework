package com.lm.linux.gui.toolkit.common;

import com.lm.linux.gui.toolkit.GuiLinuxFrame;
import com.lm.linux.gui.toolkit.GuiLinuxToolkit;

import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.Box;
import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JLabel;
import javax.swing.JPanel;

@SuppressWarnings("serial")
public class AboutDialog extends JDialog {
	public AboutDialog() {
		super(GuiLinuxFrame.getFrame(), "About Dialog", true);

		setFont(GuiLinuxFrame.DEFAULT_FONT);

		Box b = Box.createVerticalBox();
		b.add(Box.createGlue());
		JLabel jl1 = new JLabel("    Author:	Alan Aizhong Lin");
		jl1.setFont(GuiLinuxFrame.DEFAULT_FONT);
		b.add(jl1);
		JLabel jl2 = new JLabel("    Contact:	linaizhong@gmail.com");
		jl2.setFont(GuiLinuxFrame.DEFAULT_FONT);
		b.add(jl2);
		JLabel jl3 = new JLabel("    Version:	1.0");
		jl3.setFont(GuiLinuxFrame.DEFAULT_FONT);
		b.add(jl3);
		b.add(Box.createGlue());
		getContentPane().add(b, "Center");

		JPanel p2 = new JPanel();
		JButton ok = new JButton("Ok");
		p2.add(ok);
		getContentPane().add(p2, "South");

		ok.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent evt) {
				setVisible(false);
				dispose();
			}
		});

		setPreferredSize(new Dimension(400, 160));
		setDefaultCloseOperation(DISPOSE_ON_CLOSE);
		pack();
		setLocationRelativeTo(GuiLinuxFrame.getFrame());

		setVisible(true);
	}
}