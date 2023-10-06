import java.applet.Applet;
import java.applet.AppletContext;
import java.awt.*;
import java.awt.event.*;
import java.net.URL;
import java.util.Stack;

public class Graph extends Applet
    implements MouseListener, MouseMotionListener, Runnable, ActionListener
{

    public Graph()
    {
        relaxer = null;
        appImage = null;
        appGra = null;
        focusNode = null;
        preFocusNode = null;
        pfocusNode = null;
        currentX = 0;
        currentY = 0;
        prePositionX = 0;
        prePositionY = 0;
        focusNodeList = new Stack();
        histPosList = new Stack();
        isResizingHistory = false;
        isSelectedFromHistory = false;
        isMenuOn = false;
    }

    public void init()
    {
        String s = getParameter("data");
        int i = Integer.parseInt(getParameter("numcolors"));
        String s1 = getParameter("nodecolors");
        String s2 = getParameter("labelcolors");
        String s3 = getParameter("edgecolors");
        appImage = createImage(getSize().width, getSize().height);
        appGra = appImage.getGraphics();
        grpanel = new Graph_Panel(this, s, i, s1, s2, s3);
        focusNode = grpanel.theTree.root;
        preFocusNode = grpanel.theTree.root;
        pmenu = new PopupMenu("Select an Action");
        add(pmenu);
        enableEvents(16L);
        addMouseListener(this);
        addMouseMotionListener(this);
    }

    public synchronized void update(Graphics g)
    {
        appGra.setColor(Color.white);
        appGra.fillRect(0, 0, getSize().width, getSize().height);
        if(grpanel.animationState < 0)
        {
            grpanel.displayHierarchy(appGra, focusNode, preFocusNode);
        } else
        {
            grpanel.displayHierarchyAnimation(appGra, focusNode, preFocusNode, pfocusNode);
            if(grpanel.animationState >= grpanel.FADEIN_ENDANIMATION)
            {
                grpanel.animationState = -1;
                grpanel.setNodeStatus(grpanel.theTree.root, focusNode, 0);
            } else
            {
                grpanel.animationState++;
            }
        }
        drawIcons(appGra, 0, 0, 20, 1);
        if(isMenuOn)
        {
            int i = getActivedIcon(currentX, currentY);
            if(i >= 0)
                drawHelp(appGra, i, 22, currentY);
        }
        g.drawImage(appImage, 0, 0, this);
    }

    public boolean action(Event event, Object obj)
    {
        return true;
    }

    public void run()
    {
        do
        {
            repaint();
            try
            {
                Thread.sleep(100L);
            }
            catch(InterruptedException interruptedexception)
            {
                return;
            }
        } while(true);
    }

    public synchronized void mouseClicked(MouseEvent mouseevent)
    {
        int i = mouseevent.getClickCount();
        if(i == 2)
        {
            try
            {
                URL url = new URL(grpanel.pickedNode.urlStr);
                AppletContext appletcontext = getAppletContext();
                appletcontext.showDocument(url);
            }
            catch(Exception exception) { }
        } else
        {
            currentX = mouseevent.getX();
            currentY = mouseevent.getY();
            int j = mouseevent.getButton();
            pfocusNode = focusNode;
            if(j == 1 && grpanel.pickedNode != null && focusNode != grpanel.pickedNode)
            {
                if(!grpanel.isHistoryActive)
                {
                    if(!grpanel.pickedNode.isFinalItem)
                    {
                        if(preFocusNode != focusNode)
                        {
                            focusNodeList.push(preFocusNode);
                            preFocusNode = focusNode;
                            Point point = new Point(focusNode.histPos.x, focusNode.histPos.y);
                            histPosList.push(point);
                        }
                        isSelectedFromHistory = false;
                        focusNode = grpanel.pickedNode;
                        focusNode.bHistWidth = focusNode.bWidth;
                        focusNode.bHistHeight = focusNode.bHeight;
                        grpanel.setNewLayout(focusNode, preFocusNode, pfocusNode, true, isSelectedFromHistory);
                        grpanel.animationState = 0;
                        grpanel.setStatus4LeftClick(preFocusNode, focusNode, 0, 0);
                    }
                } else
                if(preFocusNode == grpanel.pickedNode)
                {
                    grpanel.isHistoryActive = false;
                    focusNode = preFocusNode;
                    if(!focusNodeList.empty())
                        preFocusNode = (Node)focusNodeList.pop();
                    if(!histPosList.empty())
                        focusNode.histPos = (Point)histPosList.pop();
                    isSelectedFromHistory = false;
                    grpanel.setNewLayout(focusNode, preFocusNode, pfocusNode, false, isSelectedFromHistory);
                    grpanel.animationState = 0;
                    grpanel.setStatus4RightClick(preFocusNode, focusNode, 0);
                } else
                {
                    focusNode = grpanel.pickedNode;
                    if(!histPosList.empty())
                    {
                        Point point1 = (Point)histPosList.pop();
                        point1 = new Point(focusNode.histPos.x, focusNode.histPos.y);
                        histPosList.push(point1);
                    }
                    focusNode.bHistWidth = focusNode.bWidth;
                    focusNode.bHistHeight = focusNode.bHeight;
                    isSelectedFromHistory = true;
                    grpanel.setNewLayout(focusNode, preFocusNode, pfocusNode, true, isSelectedFromHistory);
                    grpanel.animationState = 0;
                }
            } else
            if(j == 3)
            {
                if(!grpanel.isHistoryActive && grpanel.pickedNode == null && focusNode.father != -1)
                {
                    focusNode = preFocusNode;
                    if(!focusNodeList.empty())
                        preFocusNode = (Node)focusNodeList.pop();
                    if(!histPosList.empty())
                        focusNode.histPos = (Point)histPosList.pop();
                    isSelectedFromHistory = false;
                    grpanel.setNewLayout(focusNode, preFocusNode, pfocusNode, false, isSelectedFromHistory);
                    grpanel.animationState = 0;
                    grpanel.setStatus4RightClick(preFocusNode, focusNode, 0);
                }
            } else
            {
                isSelectedFromHistory = false;
                int k = (grpanel.APPWIDTH - grpanel.HISTWIDTH) / 2;
                int l = (grpanel.APPHEIGHT - grpanel.HISTHEIGHT) / 2;
                if(currentX > k && currentX < k + grpanel.HISTWIDTH && currentY >= l && currentY <= l + grpanel.HISTHEIGHT && focusNode.father >= 0)
                    grpanel.isHistoryActive = true;
                else
                    grpanel.isHistoryActive = false;
            }
        }
        repaint();
    }

    public synchronized void mouseDragged(MouseEvent mouseevent)
    {
        if(isResizingHistory)
        {
            int i = mouseevent.getX();
            int j = mouseevent.getY();
            int k = i - currentX;
            if(k < j - currentY || k > currentY - j)
                k = j - currentY;
            grpanel.HISTWIDTH = grpanel.HISTWIDTH + k;
            grpanel.HISTHEIGHT = grpanel.HISTHEIGHT + k;
            if(grpanel.HISTWIDTH < 100)
            {
                grpanel.HISTWIDTH = 100;
                grpanel.HISTHEIGHT = 100;
            } else
            if(grpanel.HISTWIDTH > grpanel.APPWIDTH)
            {
                grpanel.HISTWIDTH = grpanel.APPWIDTH;
                grpanel.HISTHEIGHT = grpanel.APPHEIGHT;
            }
            currentX = mouseevent.getX();
            currentY = mouseevent.getY();
        }
    }

    public synchronized void mousePressed(MouseEvent mouseevent)
    {
        prePositionX = mouseevent.getX();
        prePositionY = mouseevent.getY();
    }

    public synchronized void mouseReleased(MouseEvent mouseevent)
    {
        int i = getActivedIcon(mouseevent.getX(), mouseevent.getY());
        if(i == 0)
        {
            if(isMenuOn)
                isMenuOn = false;
            else
                isMenuOn = true;
        } else
        if(i == 1)
        {
            grpanel.fontSize = grpanel.fontSize + 2;
            if(grpanel.fontSize > 24)
                grpanel.fontSize = 24;
        } else
        if(i == 2)
        {
            grpanel.fontSize = grpanel.fontSize - 2;
            if(grpanel.fontSize < 4)
                grpanel.fontSize = 4;
        } else
        if(i == 3)
            grpanel.edgeWidth = grpanel.edgeWidth + 1;
        else
        if(i == 4)
        {
            grpanel.edgeWidth = grpanel.edgeWidth - 1;
            if(grpanel.fontSize < 1)
                grpanel.fontSize = 1;
        } else
        if(i == 5)
        {
            grpanel.nodeWidthDiff = grpanel.nodeWidthDiff + 1;
            if(grpanel.nodeWidthDiff > 10)
                grpanel.nodeWidthDiff = 10;
        } else
        if(i == 6)
        {
            grpanel.nodeWidthDiff = grpanel.nodeWidthDiff - 1;
            if(grpanel.nodeWidthDiff < 0)
                grpanel.nodeWidthDiff = 0;
        } else
        if(i == 7)
            if(grpanel.isDrawnBoundary)
                grpanel.isDrawnBoundary = false;
            else
                grpanel.isDrawnBoundary = true;
        if(isResizingHistory)
        {
            grpanel.PREHISTSCALE = grpanel.HISTSCALE;
            grpanel.HISTSCALE = (double)grpanel.APPWIDTH / (1.0D * (double)grpanel.HISTWIDTH);
            grpanel.resizeHistLayout(preFocusNode, 0, grpanel.HISTMAXLEVELS);
            double d = (double)grpanel.defaultHistMaxFontWidth + 0.5D * (double)(9 - grpanel.defaultHistMaxFontWidth) * (grpanel.DEFAULTHISTSCALE - grpanel.HISTSCALE);
            grpanel.histMaxFontWidth = (int)d;
            setCursor(new Cursor(0));
            isResizingHistory = false;
        }
    }

    public void mouseMoved(MouseEvent mouseevent)
    {
        currentX = mouseevent.getX();
        currentY = mouseevent.getY();
        if(focusNode.father >= 0 && !isResizingHistory)
        {
            int i = (grpanel.APPWIDTH + grpanel.HISTWIDTH) / 2;
            int k = (grpanel.APPHEIGHT + grpanel.HISTHEIGHT) / 2;
            if(currentX > i - 10 && currentX < i + 10 && currentY > k - 10 && currentY < k + 10)
            {
                setCursor(new Cursor(5));
                isResizingHistory = true;
            }
        } else
        if(isResizingHistory)
        {
            int j = (grpanel.APPWIDTH + grpanel.HISTWIDTH) / 2;
            int l = (grpanel.APPHEIGHT + grpanel.HISTHEIGHT) / 2;
            if(currentX < j - 10 || currentX > j + 10 || currentY < l - 10 || currentY > l + 10)
            {
                setCursor(new Cursor(0));
                isResizingHistory = false;
            }
        }
    }

    public void mouseEntered(MouseEvent mouseevent)
    {
    }

    public void mouseExited(MouseEvent mouseevent)
    {
    }

    public void start()
    {
        relaxer = new Thread(this);
        relaxer.start();
    }

    public void stop()
    {
    }

    private void delay(int i)
    {
        try
        {
            Thread.sleep(i);
        }
        catch(Exception exception) { }
    }

    public void setSize(int i, int j)
    {
        super.setSize(i, j);
        validate();
        grpanel.APPWIDTH = i;
        grpanel.APPHEIGHT = j;
        grpanel.HISTWIDTH = (int)((double)i / grpanel.HISTSCALE);
        grpanel.HISTHEIGHT = (int)((double)j / grpanel.HISTSCALE);
        grpanel.treeLayout();
        focusNode = grpanel.theTree.root;
        preFocusNode = grpanel.theTree.root;
        pfocusNode = null;
        appImage = createImage(i, j);
        appGra = appImage.getGraphics();
    }

    public void processMouseEvent(MouseEvent mouseevent)
    {
        if(mouseevent.isPopupTrigger() && grpanel.pickedNode != null && grpanel.pickedNode.menu.numItems > 0)
        {
            pmenu.removeAll();
            int i = grpanel.pickedNode.menu.numItems;
            for(int j = 0; j < i; j++)
            {
                MenuItem menuitem = new MenuItem(grpanel.pickedNode.menu.name[j]);
                menuitem.addActionListener(this);
                pmenu.add(menuitem);
            }

            pmenu.show(mouseevent.getComponent(), mouseevent.getX(), mouseevent.getY());
        }
        super.processMouseEvent(mouseevent);
    }

    public void actionPerformed(ActionEvent actionevent)
    {
    }

    private void drawIcons(Graphics g, int i, int j, int k, int l)
    {
        int i1 = j;
        drawMenuIcon(g, i, i1, k);
        if(isMenuOn)
        {
            i1 = i1 + k + l;
            drawFontIncreaseIcon(g, i, i1, k);
            i1 = i1 + k + l;
            drawFontDecreaseIcon(g, i, i1, k);
            i1 = i1 + k + l;
            drawEdgeWidthIncreaseIcon(g, i, i1, k);
            i1 = i1 + k + l;
            drawEdgeWidthDecreaseIcon(g, i, i1, k);
            i1 = i1 + k + l;
            drawNodeDiffIncreaseIcon(g, i, i1, k);
            i1 = i1 + k + l;
            drawNodeDiffDecreaseIcon(g, i, i1, k);
            i1 = i1 + k + l;
            drawBoundaryRectIcon(g, i, i1, k);
        }
    }

    private void drawMenuIcon(Graphics g, int i, int j, int k)
    {
        g.setColor(Color.gray);
        g.fillRect(i, j, k, k);
        g.setColor(Color.blue);
        appGra.setFont(new Font("Serif", 1, 8));
        appGra.drawString("Menu", i + 1, (j + k) - 5);
    }

    private void drawFontIncreaseIcon(Graphics g, int i, int j, int k)
    {
        g.setColor(Color.gray);
        g.fillRect(i, j, k, k);
        g.setColor(Color.blue);
        appGra.setFont(new Font("Serif", 1, 20));
        appGra.drawString("A", i + 1, (j + k) - 1);
    }

    private void drawFontDecreaseIcon(Graphics g, int i, int j, int k)
    {
        g.setColor(Color.gray);
        g.fillRect(i, j, k, k);
        g.setColor(Color.blue);
        appGra.setFont(new Font("Serif", 1, 12));
        appGra.drawString("A", i + 6, (j + k) - 1);
    }

    private void drawEdgeWidthIncreaseIcon(Graphics g, int i, int j, int k)
    {
        g.setColor(Color.gray);
        g.fillRect(i, j, k, k);
        g.setColor(Color.blue);
        g.fillRect(i + 3, j + 3, k - 6, 6);
    }

    private void drawEdgeWidthDecreaseIcon(Graphics g, int i, int j, int k)
    {
        g.setColor(Color.gray);
        g.fillRect(i, j, k, k);
        g.setColor(Color.blue);
        g.fillRect(i + 3, j + 3, k - 6, 2);
    }

    private void drawNodeDiffIncreaseIcon(Graphics g, int i, int j, int k)
    {
        g.setColor(Color.gray);
        g.fillRect(i, j, k, k);
        g.setColor(Color.blue);
        g.drawRect(i + 2, j + 3, k - 4, k - 6);
        g.fillRect(i + 6, j + 7, k - 12, k - 14);
    }

    private void drawNodeDiffDecreaseIcon(Graphics g, int i, int j, int k)
    {
        g.setColor(Color.gray);
        g.fillRect(i, j, k, k);
        g.setColor(Color.blue);
        g.drawRect(i + 2, j + 3, k - 4, k - 6);
        g.fillRect(i + 4, j + 5, k - 8, k - 10);
    }

    private void drawBoundaryRectIcon(Graphics g, int i, int j, int k)
    {
        g.setColor(Color.gray);
        g.fillRect(i, j, k, k);
        g.setColor(Color.blue);
        g.drawRect(i + 3, j + 3, k - 6, k - 6);
    }

    private int getActivedIcon(int i, int j)
    {
        byte byte0 = -1;
        byte byte1 = 20;
        if(i >= 0 && i <= byte1)
        {
            if(j >= 0 && j <= 20)
                byte0 = 0;
            if(isMenuOn)
                if(j >= 21 && j <= 41)
                    byte0 = 1;
                else
                if(j >= 42 && j <= 62)
                    byte0 = 2;
                else
                if(j >= 63 && j <= 83)
                    byte0 = 3;
                else
                if(j >= 84 && j <= 104)
                    byte0 = 4;
                else
                if(j >= 105 && j <= 125)
                    byte0 = 5;
                else
                if(j >= 126 && j <= 146)
                    byte0 = 6;
                else
                if(j >= 147 && j <= 167)
                    byte0 = 7;
        }
        return byte0;
    }

    private void drawHelp(Graphics g, int i, int j, int k)
    {
        g.setColor(Color.magenta);
        appGra.setFont(new Font("Serif", 2, 12));
        if(i == 0)
            appGra.drawString("Click To Open/Close Menu", j, k);
        else
        if(i == 1)
            appGra.drawString("Increase the Size of Nodes", j, k);
        else
        if(i == 2)
            appGra.drawString("Decrease the Size of Nodes", j, k);
        else
        if(i == 3)
            appGra.drawString("Increase the Width of Edges", j, k);
        else
        if(i == 4)
            appGra.drawString("Decrease the Width of Edges", j, k);
        else
        if(i == 5)
            appGra.drawString("Increase the Difference of Width Between Nodes", j, k);
        else
        if(i == 6)
            appGra.drawString("Decrease the Difference of Width Between Nodes", j, k);
        else
        if(i == 7)
            appGra.drawString("Switching if drawing Node's boundary", j, k);
    }

    private Graph_Panel grpanel;
    private Thread relaxer;
    private Image appImage;
    private Graphics appGra;
    public Node focusNode;
    public Node preFocusNode;
    public Node pfocusNode;
    int currentX;
    int currentY;
    private int prePositionX;
    private int prePositionY;
    private Stack focusNodeList;
    private Stack histPosList;
    PopupMenu pmenu;
    boolean isResizingHistory;
    boolean isSelectedFromHistory;
    private boolean isMenuOn;
    private final int startIconsX = 0;
    private final int startIconsY = 0;
    private final int iconSize = 20;
    private final int iconDist = 1;
}
