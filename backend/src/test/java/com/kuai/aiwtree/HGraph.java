//import java.applet.Applet;
import java.awt.*;
import java.awt.event.*;

public class HGraph extends Panel implements MouseListener, MouseMotionListener, Runnable
{
    public HGraph()
    {
        fontSize = 12;
        notClick = true;
        isDragged = false;
        relaxer = null;
        appImage = null;
        appGra = null;
        currentX = 0;
        currentY = 0;
        //thetarget = null;
        isSelectingColor = false;

        //thetarget = getParameter("thetarget");
        arrayColors = new Color[8];
        arrayColors[0] = new Color(70, 70, 70);
        arrayColors[1] = new Color(70, 70, 255);
        arrayColors[2] = new Color(70, 255, 70);
        arrayColors[3] = new Color(70, 255, 255);
        arrayColors[4] = new Color(255, 70, 70);
        arrayColors[5] = new Color(255, 70, 255);
        arrayColors[6] = new Color(255, 255, 70);
        arrayColors[7] = new Color(150, 150, 150);
        
        setLayout(new BorderLayout());

        //Dimension d = getToolkit().getScreenSize();
		//d.setSize(d.width - 2, d.height - 2);
		//setSize(d);

        //Panel p = new Panel();
        //p.setLayout(new BorderLayout());
        //p.setBounds(insets().left + 0, insets().top + 0, d.width-10, d.height-10);
        //p.setBackground(Color.lightGray);
        //add(p);

        appImage = p.createImage(100, 100);
        appGra = p.getGraphics();
        
        String data = "Mao-Lin/Research/http://www-staff.it.uts.edu.au/~maolin/research.html" +
                        "`Research/Publications/http://localhost/default.asp" +
                        "`Publications/Journal_Articles/http://localhost/default.asp" +
                        "`Publications/Conference_Papers/http://localhost/default.asp" +
                        "`Journal_Articles/JGAA_paper/http://localhost/default.asp" +
                        "`Journal_Articles/Information_Outlook/http://localhost/default.asp" +
                        "`Journal_Articles/Computer_Networks/http://localhost/default.asp" +
                        "`Journal_Articles/JVLC_paper/http://localhost/default.asp" +
                        "`Conference_Papers/CISST'2001/http://localhost/default.asp" +
                        "`Conference_Papers/IC'2001/http://localhost/default.asp" +
                        "`Conference_Papers/SCI'2000/http://localhost/default.asp`";
        
        grpanel = new HGraph_Panel(this, size(), data);
        grpanel.layout();
        p.add(grpanel);
        
        addMouseListener(this);
        addMouseMotionListener(this);
    
		//{{REGISTER_LISTENERS
		SymWindow aSymWindow = new SymWindow();
		this.addWindowListener(aSymWindow);
		//}}
	}

    public boolean action(Event event, Object obj)
    {
        return true;
    }

    private void delay(int i)
    {
        try
        {
            Thread.sleep(i);
        }
        catch(Exception _ex) { }
    }

    private void drawChColorIcon(Graphics g, int i, int j, int k)
    {
        g.setColor(Color.gray);
        g.fillRect(i, j, k, k);
        g.setColor(grpanel.nodeColor);
        g.fillRect(i + 3, j + 3, k - 6, k - 6);
    }

    private void drawChOutlineIcon(Graphics g, int i, int j, int k)
    {
        g.setColor(Color.gray);
        g.fillRect(i, j, k, k);
        g.setColor(grpanel.nodeColor);
        g.fillRect(i + 4, j + 4, k - 7, k - 7);
        if(grpanel.isNodeOutline)
        {
            g.setColor(Color.black);
            g.drawRect(i + 3, j + 3, k - 6, k - 6);
        }
    }

    private void drawColorBox(Graphics g, int i, int j)
    {
        int k = i;
        int i1 = j;
        int j1 = 0;
        int k1 = 0;
        for(; j1 < 8; j1++)
        {
            int l = i + k1 * 20;
            g.setColor(arrayColors[j1]);
            g.fillRect(l, i1, 20, 20);
            if(++k1 > 3)
            {
                k1 = 0;
                i1 += 20;
            }
        }
    }

    private void drawDecNumNodesIcon(Graphics g, int i, int j, int k)
    {
        g.setColor(Color.gray);
        g.fillRect(i, j, k, k);
        g.setColor(Color.blue);
        g.fillRect(i + 1, j + 1, k / 2 - 1, k / 2 - 1);
    }

    private void drawFontDecreaseIcon(Graphics g, int i, int j, int k)
    {
        g.setColor(Color.gray);
        g.fillRect(i, j, k, k);
        g.setColor(Color.blue);
        appGra.setFont(new Font("Serif", 1, 12));
        appGra.drawString("A", i + 6, (j + k) - 1);
    }

    private void drawFontIncreaseIcon(Graphics g, int i, int j, int k)
    {
        g.setColor(Color.gray);
        g.fillRect(i, j, k, k);
        g.setColor(Color.blue);
        appGra.setFont(new Font("Serif", 1, 22));
        appGra.drawString("A", i + 1, (j + k) - 1);
    }

    private void drawHelp(Graphics g, int i, int j, int k)
    {
        g.setColor(Color.gray);
        appGra.setFont(new Font("Serif", 2, 12));
        if(i == 0)
            appGra.drawString("Increase Font Size", j, k);
        else
        if(i == 1)
            appGra.drawString("Decrease Font Size", j, k);
        else
        if(i == 2)
            appGra.drawString("Increase Edge Length", j, k);
        else
        if(i == 3)
            appGra.drawString("Decrease Edge Length", j, k);
        else
        if(i == 4)
            appGra.drawString("Change Node's Color ", j, k);
        else
        if(i == 5)
            appGra.drawString("Toggle Node Outline", j, k);
        else
        if(i == 6)
            appGra.drawString("Display More Nodes", j, k);
        else
        if(i == 7)
            appGra.drawString("Display Less Nodes", j, k);
    }

    private void drawIcons(Graphics g, int i, int j, int k, int l)
    {
        int i1 = j;
        drawFontIncreaseIcon(g, i, i1, k);
        i1 = i1 + k + l;
        drawFontDecreaseIcon(g, i, i1, k);
        i1 = i1 + k + l;
        drawLengthIncreaseIcon(g, i, i1, k);
        i1 = i1 + k + l;
        drawLengthDecreaseIcon(g, i, i1, k);
        i1 = i1 + k + l;
        drawChColorIcon(g, i, i1, k);
        i1 = i1 + k + l;
        drawChOutlineIcon(g, i, i1, k);
        i1 = i1 + k + l;
        drawIncNumNodesIcon(g, i, i1, k);
        i1 = i1 + k + l;
        drawDecNumNodesIcon(g, i, i1, k);
    }

    private void drawIncNumNodesIcon(Graphics g, int i, int j, int k)
    {
        g.setColor(Color.gray);
        g.fillRect(i, j, k, k);
        g.setColor(Color.blue);
        g.fillRect(i + 1, j + 1, k / 2 - 1, k / 2 - 1);
        g.fillRect(i + k / 2 + 1, j + k / 2 + 1, k / 2 - 1, k / 2 - 1);
    }

    private void drawLengthDecreaseIcon(Graphics g, int i, int j, int k)
    {
        g.setColor(Color.gray);
        g.fillRect(i, j, k, k);
        g.setColor(Color.blue);
        appGra.drawLine(i + 5, j + 5, (i + k) - 5, (j + k) - 5);
    }

    private void drawLengthIncreaseIcon(Graphics g, int i, int j, int k)
    {
        g.setColor(Color.gray);
        g.fillRect(i, j, k, k);
        g.setColor(Color.blue);
        appGra.drawLine(i + 1, j + 1, (i + k) - 1, (j + k) - 1);
    }

    private int getActivedIcon(int i, int j)
    {
        byte byte0 = -1;
        byte byte1 = 20;
        if(i >= 0 && i <= byte1)
            if(j >= 0 && j <= 20)
                byte0 = 0;
            else
            if(j >= 22 && j <= 42)
                byte0 = 1;
            else
            if(j >= 44 && j <= 64)
                byte0 = 2;
            else
            if(j >= 66 && j <= 86)
                byte0 = 3;
            else
            if(j >= 88 && j <= 108)
                byte0 = 4;
            else
            if(j >= 110 && j <= 130)
                byte0 = 5;
            else
            if(j >= 132 && j <= 152)
                byte0 = 6;
            else
            if(j >= 154 && j <= 174)
                byte0 = 7;
        return byte0;
    }

    private int getNodeColor(int i, int j, int k, int l)
    {
        int i1 = -1;
        int j1 = i;
        int l1 = j;
        int i2 = 0;
        int j2 = 0;
        for(; i2 < 8; i2++)
        {
            int k1 = i + j2 * 20;
            if(k > k1 && k < k1 + 20 && l > l1 && l < l1 + 20)
                i1 = i2;
            if(++j2 > 3)
            {
                j2 = 0;
                l1 += 20;
            }
        }

        return i1;
    }

    public static void main(String[] args)
    {
        (new HGraph()).setVisible(true);
    }

    public synchronized void mouseClicked(MouseEvent mouseevent)
    {
        int i = mouseevent.getClickCount();
        if(i == 2)
        {
            int j = getActivedIcon(currentX, currentY);
            if(j < 0)
            {
                grpanel.changePreMapping();
                currentX = mouseevent.getX();
                currentY = mouseevent.getY();
                startX = currentX;
                startY = currentY;
                grpanel.mouseClickedProcess(startX, startY);
            }
        }
        else
        {
            grpanel.nodeClickedProcess();
        }
    }

    public synchronized void mouseDragged(MouseEvent mouseevent)
    {
        currentX = mouseevent.getX();
        currentY = mouseevent.getY();
        grpanel.mouseDraggedProcess(startX, startY, currentX, currentY);
        repaint();
    }

    public void mouseEntered(MouseEvent mouseevent)
    {
    }

    public void mouseExited(MouseEvent mouseevent)
    {
    }

    public void mouseMoved(MouseEvent mouseevent)
    {
        currentX = mouseevent.getX();
        currentY = mouseevent.getY();
    }

    public synchronized void mousePressed(MouseEvent mouseevent)
    {
        isDragged = true;
        if(notClick)
            notClick = false;
        startX = mouseevent.getX();
        startY = mouseevent.getY();
    }

    public synchronized void mouseReleased(MouseEvent mouseevent)
    {
        int i = getActivedIcon(currentX, currentY);
        grpanel.changePreMapping();
        isDragged = false;
        if(i < 0)
        {
            if(isSelectingColor)
            {
                int j = getNodeColor(20, 82, currentX, currentY);
                if(j >= 0)
                    grpanel.nodeColor = arrayColors[j];
                isSelectingColor = false;
            }
        }
        else
        if(i == 0)
        {
            if(fontSize < 40)
                fontSize = fontSize + 2;
        }
        else
        if(i == 1)
        {
            if(fontSize > 6)
                fontSize = fontSize - 2;
        }
        else
        if(i == 2)
        {
            if(grpanel.edge_length < 0.80000000000000004D)
            {
                grpanel.edge_length = grpanel.edge_length + 0.02D;
                grpanel.mouseClickedProcess(0.0D, 0.0D);
                grpanel.layout();
            }
        }
        else
        if(i == 3)
        {
            if(grpanel.edge_length > 0.02D)
            {
                grpanel.edge_length = grpanel.edge_length - 0.02D;
                grpanel.mouseClickedProcess(0.0D, 0.0D);
                grpanel.layout();
            }
        }
        else
        if(i == 4)
            isSelectingColor = true;
        else
        if(i == 5)
        {
            if(grpanel.isNodeOutline)
                grpanel.isNodeOutline = false;
            else
                grpanel.isNodeOutline = true;
        }
        else
        if(i == 6)
        {
            grpanel.limit_disp = grpanel.limit_disp + 0.040000000000000001D;
            if(grpanel.limit_disp > 0.97999999999999998D)
                grpanel.limit_disp = 0.97999999999999998D;
        }
        else
        if(i == 7)
        {
            grpanel.limit_disp = grpanel.limit_disp - 0.040000000000000001D;
            if(grpanel.limit_disp < 0.10000000000000001D)
                grpanel.limit_disp = 0.10000000000000001D;
        }
        repaint();
    }

    public void run()
    {
        do
        {
            repaint();
            try
            {
                Thread.sleep(150L);
            }
            catch(InterruptedException _ex)
            {
                return;
            }
        }
        while(true);
    }

    public void start()
    {
        relaxer = new Thread(this);
        relaxer.start();
    }

    public void stop()
    {
        relaxer.stop();
    }

    public synchronized void update(Graphics g)
    {
        appGra.setFont(new Font("Serif", 0, fontSize));
        java.awt.FontMetrics fontmetrics = appGra.getFontMetrics();
        appGra.setColor(getBackground());
        appGra.fillRect(0, 0, size().width, size().height);
        appGra.setColor(Color.gray);
        appGra.drawString("Aizhong Lin", 10, size().height - 10);
        if(isDragged)
            grpanel.display_whendrag(appGra, fontmetrics);
        else
            grpanel.treedisplay(appGra, fontmetrics);
        int i = getActivedIcon(currentX, currentY);
        if(i >= 0)
            drawHelp(appGra, i, 22, currentY);
        drawIcons(appGra, 0, 0, 20, 2);
        if(isSelectingColor)
            drawColorBox(appGra, 20, 82);
        g.drawImage(appImage, 0, 0, this);
    }

    private final String version = "Aizhong Lin";
    private HGraph_Panel grpanel;
    private int fontSize;
    private int startX;
    private int startY;
    private boolean notClick;
    private boolean isDragged;
    private Thread relaxer;
    private final int startIconsX = 0;
    private final int startIconsY = 0;
    private final int iconSize = 20;
    private final int iconDist = 2;
    Image appImage;
    Graphics appGra;
    int currentX;
    int currentY;
    //String thetarget;
    private Color arrayColors[];
    private final int arrColorsLength = 8;
    private final int cboxSize = 20;
    private boolean isSelectingColor;

	class SymWindow extends java.awt.event.WindowAdapter
	{
		public void windowClosing(java.awt.event.WindowEvent event)
		{
			Object object = event.getSource();
			if (object == HGraph.this)
				HGraph_WindowClosing(event);
		}
	}

	void HGraph_WindowClosing(java.awt.event.WindowEvent event)
	{
		//{{CONNECTION
		hide();
		dispose();
		System.exit(0);
		//}}
	}
}
