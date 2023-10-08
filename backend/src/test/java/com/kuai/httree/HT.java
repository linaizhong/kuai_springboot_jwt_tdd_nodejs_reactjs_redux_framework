import java.awt.*;
import java.awt.event.*;
import java.awt.Color;

public class HT extends Frame
{
    public HT()
    {
        setLayout(new BorderLayout());

        HGraph hg = new HGraph();
        hg.setBackground(Color.lightGray);
        hg.setBounds(0, 0, size().width - 10, size().height - 100);
        add(hg);

        SymWindow aSymWindow = new SymWindow();
		this.addWindowListener(aSymWindow);
    }

    public static void main(String[] args)
    {
        (new HT()).setVisible(true);
    }

    class SymWindow extends java.awt.event.WindowAdapter
	{
		public void windowClosing(java.awt.event.WindowEvent event)
		{
			Object object = event.getSource();
			if (object == HT.this)
				HT_WindowClosing(event);
		}
	}

	void HT_WindowClosing(java.awt.event.WindowEvent event)
	{
		//{{CONNECTION
		hide();
		dispose();
		System.exit(0);
		//}}
	}
}