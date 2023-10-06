import java.awt.*;
import java.io.PrintStream;
import java.util.LinkedList;
import javax.swing.JPanel;

public class Graph_Panel extends JPanel
{

    public Graph_Panel(Graph graph, String s, int i, String s1, String s2, String s3)
    {
        isNodeLabel = true;
        APPWIDTH = 0;
        APPHEIGHT = 0;
        HISTWIDTH = 0;
        HISTHEIGHT = 0;
        DEFAULTHISTSCALE = 2D;
        PREHISTSCALE = 2D;
        HISTSCALE = 2D;
        HISTMAXLEVELS = 4;
        transparentFactor = 50;
        colorArraySize = 0;
        nodeBoundColor = Color.red;
        histBackgroundColor = new Color(200, 200, 200, 30);
        histOnFocusBackgroundColor = new Color(180, 180, 180, 30);
        histSelectedBackgroundColor = new Color(160, 160, 255, 30);
        histSelectedNodeColor = new Color(0, 255, 0, 100);
        histActiveSelectedNodeColor = new Color(0, 255, 0);
        defaultHistMaxFontWidth = 4;
        histMaxFontWidth = 4;
        fontSize = 16;
        theFonts = null;
        fontArrSize = 8;
        isDrawnBoundary = true;
        boundaryColor = new Color(255, 225, 220);
        isHistoryActive = false;
        edgeWidth = 3;
        nodeWidthDiff = 4;
        animationState = -1;
        FADEIN_ENDANIMATION = 12;
        FADEOUT_ENDANIMATION = 12;
        infoDisplayBGColor = new Color(240, 240, 240);
        infoDisplayTxtColor = new Color(50, 50, 50);
        infoDisplayWidth = 180;
        infoDisplayHeight = 100;
        pickedNode = null;
        gr = graph;
        APPWIDTH = gr.getSize().width;
        APPHEIGHT = gr.getSize().height;
        HISTWIDTH = (int)((double)APPWIDTH / HISTSCALE);
        HISTHEIGHT = (int)((double)APPHEIGHT / HISTSCALE);
        theFonts = new Font[10];
        for(int j = 0; j < fontArrSize; j++)
            theFonts[j] = new Font("Serif", 0, 8 + 2 * j);

        parsingInfo(s);
        calculatingWeight();
        treeLayout();
        setNodeBranches();
        setNodeColors(i, s1);
        setLabelColors(i, s2);
        setEdgeColors(i, s3);
        setInactiveNodeColors(i);
        setInactiveEdgeColors(i);
        setInactiveLabelColors(i);
        setHistNodeColors(i);
        setHistEdgeColors(i);
        colorArraySize = i;
        setAnimationColors(i);
    }

    private void parsingInfo(String s)
    {
        LinkedList linkedlist = new LinkedList();
        byte byte0 = 96;
        char c = '~';
        byte byte1 = 124;
        int i = 0;
        boolean flag = false;
        s = s.replace('\n', '\0');
        try
        {
            int k = s.indexOf(byte0, i);
            if(k > 0)
            {
                String s1 = s.substring(i, k);
                s1 = s1.trim();
                String s3 = "";
                String s6 = "";
                String s9 = "";
                String s11 = "";
                String s13 = "";
                String s15 = "";
                String s17 = "";
                char c1 = '1';
                char c3 = '0';
                char c5 = '0';
                byte byte2 = -1;
                int k1 = -1;
                int i2 = -1;
                int k2 = -1;
                int i3 = -1;
                int k3 = -1;
                int i4 = -1;
                if(!s1.equals(""))
                {
                    int i1 = nextToken(s1, c, 0);
                    if(i1 > 0)
                        k1 = nextToken(s1, c, i1 + 1);
                    if(k1 > 0)
                        i2 = nextToken(s1, c, k1 + 1);
                    if(i2 > 0)
                        k2 = nextToken(s1, c, i2 + 1);
                    if(k2 > 0)
                        i3 = nextToken(s1, c, k2 + 1);
                    if(i3 > 0)
                        k3 = nextToken(s1, c, i3 + 1);
                    if(k3 > 0)
                        i4 = nextToken(s1, c, k3 + 1);
                    String s7 = s1.substring(0, i1);
                    int k4 = s7.indexOf(byte1);
                    String s4;
                    if(k4 > 0)
                    {
                        s4 = s7.substring(0, k4);
                        s7 = s7.substring(k4 + 1);
                    } else
                    {
                        s4 = s7;
                    }
                    if(k1 > 0)
                    {
                        s11 = s1.substring(i1 + 1, k1);
                        int l4 = s11.indexOf(byte1);
                        if(l4 > 0)
                        {
                            s9 = s11.substring(0, l4);
                            s11 = s11.substring(l4 + 1);
                        } else
                        {
                            s9 = s11;
                        }
                    }
                    if(i2 > 0 && k1 + 1 < i2)
                    {
                        s13 = s1.substring(k1 + 1, i2);
                        c1 = s1.charAt(i2 + 1);
                    }
                    if(k2 > 0 && i3 > 0)
                    {
                        if(k2 + 1 < i3)
                            s15 = s1.substring(k2 + 1, i3);
                        c3 = s1.charAt(i3 + 1);
                    }
                    if(k3 > 0 && i4 > 0)
                    {
                        if(k3 + 1 < i4)
                            s17 = s1.substring(k3 + 1, i4);
                        c5 = s1.charAt(i4 + 1);
                    }
                    Node node = new Node(s4, s7, null, 0, -1, 0, "", '0', "", '0');
                    theTree = new HierarchyTree(node);
                    InfoObject infoobject2 = new InfoObject(s4, s7, s9, s11, s13, c1, s15, c3, s17, c5);
                    linkedlist.addLast(infoobject2);
                }
                i = k + 1;
                k = s.indexOf(byte0, i);
                if(k >= 0)
                {
                    String s2 = s.substring(i, k);
                    s2.trim();
                    do
                    {
                        if(k < 0)
                            break;
                        if(!s2.equals(""))
                        {
                            int j1 = -1;
                            int l1 = -1;
                            int j2 = -1;
                            int l2 = -1;
                            int j3 = -1;
                            int l3 = -1;
                            int j4 = -1;
                            char c2 = '1';
                            char c4 = '0';
                            char c6 = '0';
                            String s5 = "";
                            String s8 = "";
                            String s10 = "";
                            String s12 = "";
                            String s14 = "";
                            String s16 = "";
                            String s18 = "";
                            j1 = nextToken(s2, c, 0);
                            if(j1 > 0)
                                l1 = nextToken(s2, c, j1 + 1);
                            if(l1 > 0)
                                j2 = nextToken(s2, c, l1 + 1);
                            if(j2 > 0)
                                l2 = nextToken(s2, c, j2 + 1);
                            if(l2 > 0)
                                j3 = nextToken(s2, c, l2 + 1);
                            if(j3 > 0)
                                l3 = nextToken(s2, c, j3 + 1);
                            if(l3 > 0)
                                j4 = nextToken(s2, c, l3 + 1);
                            s8 = s2.substring(0, j1);
                            int i5 = s8.indexOf(byte1);
                            if(i5 > 0)
                            {
                                s5 = s8.substring(0, i5);
                                s8 = s8.substring(i5 + 1);
                            } else
                            {
                                s5 = s8;
                            }
                            if(l1 > 0)
                            {
                                s12 = s2.substring(j1 + 1, l1);
                                int j5 = s12.indexOf(byte1);
                                if(j5 > 0)
                                {
                                    s10 = s12.substring(0, j5);
                                    s12 = s12.substring(j5 + 1);
                                } else
                                {
                                    s10 = s12;
                                }
                            }
                            if(j2 > 0 && l1 + 1 < j2)
                            {
                                s14 = s2.substring(l1 + 1, j2);
                                c2 = s2.charAt(j2 + 1);
                            }
                            if(l2 > 0 && j3 > 0)
                            {
                                if(l2 + 1 < j3)
                                    s16 = s2.substring(l2 + 1, j3);
                                c4 = s2.charAt(j3 + 1);
                            }
                            if(l3 > 0 && j4 > 0)
                            {
                                if(l3 + 1 < j4)
                                    s18 = s2.substring(l3 + 1, j4);
                                c6 = s2.charAt(j4 + 1);
                            }
                            InfoObject infoobject1 = new InfoObject(s5, s8, s10, s12, s14, c2, s16, c4, s18, c6);
                            linkedlist.addLast(infoobject1);
                        }
                        int j = k + 1;
                        k = s.indexOf(byte0, j);
                        if(k >= 0)
                        {
                            s2 = s.substring(j, k);
                            s2.trim();
                        }
                    } while(true);
                }
            }
        }
        catch(Exception exception)
        {
            System.err.println("Graph_Panel.parsingInfo error: " + exception);
        }
        int l = 0;
        do
        {
            if(linkedlist.size() <= 0 || l >= 50)
                break;
            InfoObject infoobject = (InfoObject)linkedlist.removeFirst();
            if(!theTree.addNode(infoobject))
            {
                linkedlist.addLast(infoobject);
                l++;
            }
        } while(true);
    }

    private void calculatingWeight()
    {
        double d = calNodeWeight(theTree.root);
    }

    private double calNodeWeight(Node node)
    {
        int i = node.numChildren;
        node.weight = 1.0D;
        for(int j = 0; j < i; j++)
        {
            Node node1 = theTree.nodes[node.children[j]];
            node.weight = node.weight + 0.45000000000000001D * calNodeWeight(node1);
        }

        double d = 0.0D;
        String s = "";
        boolean flag = false;
        for(int l = 0; l < i; l++)
        {
            int k = l;
            double d1 = theTree.nodes[node.children[l]].weight;
            for(int i1 = l + 1; i1 < i; i1++)
            {
                if(d1 < theTree.nodes[node.children[i1]].weight + 0.01D && d1 > theTree.nodes[node.children[i1]].weight - 0.01D)
                {
                    if(s.compareTo(theTree.nodes[node.children[i1]].label) > 0)
                    {
                        k = i1;
                        d1 = theTree.nodes[node.children[i1]].weight;
                        s = theTree.nodes[node.children[i1]].label;
                    }
                    continue;
                }
                if(d1 > theTree.nodes[node.children[i1]].weight)
                {
                    k = i1;
                    d1 = theTree.nodes[node.children[i1]].weight;
                    s = theTree.nodes[node.children[i1]].label;
                }
            }

            int j1 = node.children[l];
            node.children[l] = node.children[k];
            node.children[k] = j1;
        }

        return node.weight;
    }

    public void treeLayout()
    {
        theTree.root.pos.x = 0.0D;
        theTree.root.pos.y = 0.0D;
        theTree.root.aniPos.x = 0.0D;
        theTree.root.aniPos.y = 0.0D;
        theTree.root.bWidth = APPWIDTH;
        theTree.root.bHeight = APPHEIGHT;
        setLayout(theTree.root);
    }

    public void setLayout(Node node)
    {
        if(node.bWidth > 0.0D && node.bHeight > 0.0D)
            if(node.numChildren > 1)
            {
                for(int i = 0; i < node.numChildren; i++)
                {
                    Node node2 = theTree.nodes[node.children[i]];
                    node2.aniPos.x = node2.pos.x;
                    node2.aniPos.y = node2.pos.y;
                }

                double d = 1.0D;
                MyRectangle myrectangle = getDisplayingRect(node, d);
                int j = setLayout4Children(node, myrectangle);
                for(int k = 0; k < node.numChildren; k++)
                    setLayout(theTree.nodes[node.children[k]]);

            } else
            if(node.numChildren == 1)
            {
                Node node1 = theTree.nodes[node.children[0]];
                node1.aniPos.x = node1.pos.x;
                node1.aniPos.y = node1.pos.y;
                double d1 = 0.0D;
                if(node.histSide == 2)
                {
                    double d2 = 0.030000000000000027D * node.bHeight;
                    node1.bWidth = node.bWidth;
                    node1.bHeight = node.bHeight - 2D * d2;
                    node1.pos.x = node.pos.x;
                    node1.pos.y = node.pos.y - d2;
                    node1.histSide = node.histSide;
                } else
                if(node.histSide == 4)
                {
                    double d3 = 0.030000000000000027D * node.bHeight;
                    node1.bWidth = node.bWidth;
                    node1.bHeight = node.bHeight - 2D * d3;
                    node1.pos.x = node.pos.x;
                    node1.pos.y = node.pos.y + d3;
                    node1.histSide = 4;
                } else
                {
                    double d4 = 0.030000000000000027D * node.bWidth;
                    node1.bWidth = node.bWidth - 2D * d4;
                    node1.bHeight = node.bHeight;
                    node1.pos.x = node.pos.x;
                    node1.pos.y = node.pos.y + d4;
                    node1.histSide = 4;
                }
                setLayout(node1);
            }
    }

    private void setHistLayout(Node node)
    {
        node.preHistPos.x = node.histPos.x;
        node.preHistPos.y = node.histPos.y;
        node.histPos.x = (node.pos.x + (double)(APPWIDTH / 2)) / HISTSCALE - 0.5D * (double)HISTWIDTH;
        node.histPos.y = (node.pos.y + (double)(APPHEIGHT / 2)) / HISTSCALE - 0.5D * (double)HISTHEIGHT;
        for(int i = 0; i < node.numChildren; i++)
            setHistLayout(theTree.nodes[node.children[i]]);

    }

    private void recallHistLayout(Node node)
    {
        node.pos.x = node.histPos.x;
        node.pos.y = node.histPos.y;
        node.histPos.x = node.preHistPos.x;
        node.histPos.y = node.preHistPos.y;
        for(int i = 0; i < node.numChildren; i++)
            recallHistLayout(theTree.nodes[node.children[i]]);

    }

    public void resizeHistLayout(Node node, int i, int j)
    {
        node.histPos.x = (node.histPos.x * PREHISTSCALE) / HISTSCALE;
        node.histPos.y = (node.histPos.y * PREHISTSCALE) / HISTSCALE;
        if(i < j)
        {
            for(int k = 0; k < node.numChildren; k++)
                resizeHistLayout(theTree.nodes[node.children[k]], i + 1, j);

        }
    }

    private void setPreHistLayout(Node node)
    {
        node.preAniPos.x = node.pos.x;
        node.preAniPos.y = node.pos.y;
        for(int i = 0; i < node.numChildren; i++)
            setPreHistLayout(theTree.nodes[node.children[i]]);

    }

    private void resetPreFocusLayout(Node node)
    {
        node.pos.x = node.histPos.x;
        node.pos.y = node.histPos.y;
        node.bWidth = node.bHistWidth;
        node.bHeight = node.bHistHeight;
        for(int i = 0; i < node.numChildren; i++)
            resetPreFocusLayout(theTree.nodes[node.children[i]]);

    }

    private MyRectangle getDisplayingRect(Node node, double d)
    {
        MyRectangle myrectangle = new MyRectangle();
        myrectangle.center.x = node.pos.x;
        myrectangle.center.y = node.pos.y;
        myrectangle.width = node.bWidth;
        myrectangle.height = node.bHeight;
        myrectangle.weight = (node.weight - 1.0D) / 0.45000000000000001D;
        myrectangle.weight = myrectangle.weight / d;
        myrectangle.non_divside = node.histSide;
        return myrectangle;
    }

    private int setLayout4Children(Node node, MyRectangle myrectangle)
    {
        int i = 0;
        for(i = add2Rectangle(myrectangle, i, node); i < node.numChildren; i = add2Rectangle(myrectangle, i, node));
        return i;
    }

    private int add2Rectangle(MyRectangle myrectangle, int i, Node node)
    {
        int j = i;
        j = add2Side(myrectangle, j, node, 1);
        if(j < node.numChildren)
            j = add2Side(myrectangle, j, node, 2);
        if(j < node.numChildren)
            j = add2Side(myrectangle, j, node, 3);
        if(j < node.numChildren)
            j = add2Side(myrectangle, j, node, 4);
        return j;
    }

    private int add2Side(MyRectangle myrectangle, int i, Node node, int j)
    {
        int k = i + 1;
        if(k == node.numChildren)
        {
            Node node1 = theTree.nodes[node.children[k - 1]];
            node1.bWidth = myrectangle.width;
            node1.bHeight = myrectangle.height;
            node1.pos.x = myrectangle.center.x;
            node1.pos.y = myrectangle.center.y;
            node1.histSide = myrectangle.non_divside;
        } else
        {
            for(; k < node.numChildren && canAddChild(node, i, k, myrectangle, j); k++);
            double d = 0.0D;
            for(int l = i; l < k; l++)
                d += theTree.nodes[node.children[l]].weight;

            if(myrectangle.non_divside == 2 && j == 1 || myrectangle.non_divside == 1 && j == 2 || myrectangle.non_divside == 3 && j == 4 || myrectangle.non_divside == 4 && j == 3)
            {
                double d1 = myrectangle.center.x + myrectangle.width / 2D;
                for(int i1 = i; i1 < k; i1++)
                {
                    Node node2 = theTree.nodes[node.children[i1]];
                    node2.bWidth = (node2.weight / d) * myrectangle.width;
                    node2.bHeight = (d / myrectangle.weight) * myrectangle.height;
                    node2.pos.x = d1 - node2.bWidth / 2D;
                    node2.pos.y = myrectangle.center.y - (myrectangle.height - node2.bHeight) / 2D;
                    node2.histSide = 2;
                    d1 -= node2.bWidth;
                }

                double d5 = myrectangle.height - theTree.nodes[node.children[i]].bHeight;
                myrectangle.center.y = myrectangle.center.y + (myrectangle.height - d5) / 2D;
                myrectangle.weight = (myrectangle.weight * d5) / myrectangle.height;
                myrectangle.height = d5;
            } else
            if(myrectangle.non_divside == 4 && j == 1 || myrectangle.non_divside == 1 && j == 4 || myrectangle.non_divside == 3 && j == 2 || myrectangle.non_divside == 2 && j == 3)
            {
                double d2 = myrectangle.center.x - myrectangle.width / 2D;
                for(int j1 = i; j1 < k; j1++)
                {
                    Node node3 = theTree.nodes[node.children[j1]];
                    node3.bWidth = (node3.weight / d) * myrectangle.width;
                    node3.bHeight = (d / myrectangle.weight) * myrectangle.height;
                    node3.pos.x = d2 + node3.bWidth / 2D;
                    node3.pos.y = myrectangle.center.y + (myrectangle.height - node3.bHeight) / 2D;
                    node3.histSide = 4;
                    d2 += node3.bWidth;
                }

                double d6 = myrectangle.height - theTree.nodes[node.children[i]].bHeight;
                myrectangle.center.y = myrectangle.center.y - (myrectangle.height - d6) / 2D;
                myrectangle.weight = (myrectangle.weight * d6) / myrectangle.height;
                myrectangle.height = d6;
            } else
            if(myrectangle.non_divside == 1 && j == 1 || myrectangle.non_divside == 2 && j == 4 || myrectangle.non_divside == 4 && j == 2 || myrectangle.non_divside == 3 && j == 3)
            {
                double d3 = myrectangle.center.y + myrectangle.height / 2D;
                for(int k1 = i; k1 < k; k1++)
                {
                    Node node4 = theTree.nodes[node.children[k1]];
                    node4.bHeight = (node4.weight / d) * myrectangle.height;
                    node4.bWidth = (d / myrectangle.weight) * myrectangle.width;
                    node4.pos.y = d3 - node4.bHeight / 2D;
                    node4.pos.x = myrectangle.center.x + (myrectangle.width - node4.bWidth) / 2D;
                    node4.histSide = 1;
                    d3 -= node4.bHeight;
                }

                double d7 = myrectangle.width - theTree.nodes[node.children[i]].bWidth;
                myrectangle.center.x = myrectangle.center.x - (myrectangle.width - d7) / 2D;
                myrectangle.weight = (myrectangle.weight * d7) / myrectangle.width;
                myrectangle.width = d7;
            } else
            if(myrectangle.non_divside == 3 && j == 1 || myrectangle.non_divside == 2 && j == 2 || myrectangle.non_divside == 4 && j == 4 || myrectangle.non_divside == 1 && j == 3)
            {
                double d4 = myrectangle.center.y - myrectangle.height / 2D;
                for(int l1 = i; l1 < k; l1++)
                {
                    Node node5 = theTree.nodes[node.children[l1]];
                    node5.bHeight = (node5.weight / d) * myrectangle.height;
                    node5.bWidth = (d / myrectangle.weight) * myrectangle.width;
                    node5.pos.y = d4 + node5.bHeight / 2D;
                    node5.pos.x = myrectangle.center.x - (myrectangle.width - node5.bWidth) / 2D;
                    node5.histSide = 3;
                    d4 += node5.bHeight;
                }

                double d8 = myrectangle.width - theTree.nodes[node.children[i]].bWidth;
                myrectangle.center.x = myrectangle.center.x + (myrectangle.width - d8) / 2D;
                myrectangle.weight = (myrectangle.weight * d8) / myrectangle.width;
                myrectangle.width = d8;
            }
        }
        return k;
    }

    private boolean canAddChild(Node node, int i, int j, MyRectangle myrectangle, int k)
    {
        boolean flag = false;
        double d = 0.0D;
        for(int l = i; l <= j; l++)
            d += theTree.nodes[node.children[l]].weight;

        if(d < myrectangle.weight + 0.01D && j > 0)
            if(myrectangle.non_divside < 0 || myrectangle.non_divside == 1 && k == 2 || myrectangle.non_divside == 2 && k == 1 || myrectangle.non_divside == 3 && k == 4 || myrectangle.non_divside == 4 && k == 3 || myrectangle.non_divside == 1 && k == 4 || myrectangle.non_divside == 2 && k == 3 || myrectangle.non_divside == 3 && k == 2 || myrectangle.non_divside == 4 && k == 1)
            {
                double d1 = (myrectangle.width * theTree.nodes[node.children[j]].weight) / d;
                double d3 = (myrectangle.height * d) / myrectangle.weight;
                if(d1 / d3 > 0.69999999999999996D)
                    flag = true;
            } else
            {
                double d2 = (myrectangle.height * theTree.nodes[node.children[j]].weight) / d;
                double d4 = (myrectangle.width * d) / myrectangle.weight;
                if(d2 / d4 > 0.69999999999999996D)
                    flag = true;
            }
        return flag;
    }

    private int nextToken(String s, char c, int i)
    {
        int j;
        if(i < 0)
        {
            j = i;
        } else
        {
            int k = s.length();
            for(j = i; j < k && s.charAt(j) != c; j++);
            if(j == k)
                j = -1;
        }
        return j;
    }

    public void setNewLayout(Node node, Node node1, Node node2, boolean flag, boolean flag1)
    {
        if(flag)
        {
            if(flag1)
                resetPreFocusLayout(node2);
            else
                setHistLayout(node1);
        } else
        {
            setPreHistLayout(node2);
            recallHistLayout(node);
        }
        node.aniPos.x = node.pos.x;
        node.aniPos.y = node.pos.y;
        node.pos.x = 0.0D;
        node.pos.y = 0.0D;
        node.bWidth = APPWIDTH;
        node.bHeight = APPHEIGHT;
        setLayout(node);
    }

    private void setNodeColors(int i, String s)
    {
        nodeColors = new Color[i];
        int l = 1;
        for(int i1 = 0; l > 0 && i1 < i; i1++)
        {
            l = s.indexOf(';');
            String s1;
            if(l > 0)
                s1 = s.substring(0, l);
            else
                s1 = s;
            int j = s1.indexOf(',');
            int k = s1.indexOf(',', j + 1);
            int j1 = Integer.parseInt(s1.substring(0, j));
            int k1 = Integer.parseInt(s1.substring(j + 1, k));
            int l1 = Integer.parseInt(s1.substring(k + 1));
            nodeColors[i1] = new Color(j1, k1, l1);
            s = s.substring(l + 1);
        }

    }

    private void setLabelColors(int i, String s)
    {
        labelColors = new Color[i];
        int l = 1;
        for(int i1 = 0; l > 0 && i1 < i; i1++)
        {
            l = s.indexOf(';');
            String s1;
            if(l > 0)
                s1 = s.substring(0, l);
            else
                s1 = s;
            int j = s1.indexOf(',');
            int k = s1.indexOf(',', j + 1);
            int j1 = Integer.parseInt(s1.substring(0, j));
            int k1 = Integer.parseInt(s1.substring(j + 1, k));
            int l1 = Integer.parseInt(s1.substring(k + 1));
            labelColors[i1] = new Color(j1, k1, l1);
            s = s.substring(l + 1);
        }

    }

    private void setEdgeColors(int i, String s)
    {
        if(s.equals("null"))
        {
            edgeColors = nodeColors;
        } else
        {
            edgeColors = new Color[i];
            int l = 1;
            for(int i1 = 0; l > 0 && i1 < i; i1++)
            {
                l = s.indexOf(';');
                String s1;
                if(l > 0)
                    s1 = s.substring(0, l);
                else
                    s1 = s;
                int j = s1.indexOf(',');
                int k = s1.indexOf(',', j + 1);
                int j1 = Integer.parseInt(s1.substring(0, j));
                int k1 = Integer.parseInt(s1.substring(j + 1, k));
                int l1 = Integer.parseInt(s1.substring(k + 1));
                edgeColors[i1] = new Color(j1, k1, l1);
                s = s.substring(l + 1);
            }

        }
    }

    private void setInactiveNodeColors(int i)
    {
        inActiveNodeColors = new Color[i];
        for(int j = 0; j < i; j++)
        {
            Color color = nodeColors[j].brighter().brighter();
            inActiveNodeColors[j] = new Color(color.getRed(), color.getGreen(), color.getBlue(), transparentFactor);
        }

    }

    private void setInactiveLabelColors(int i)
    {
        inActiveLabelColors = new Color[i];
        for(int j = 0; j < i; j++)
        {
            Color color = labelColors[j].brighter();
            inActiveLabelColors[j] = new Color(color.getRed(), color.getGreen(), color.getBlue(), transparentFactor);
        }

    }

    private void setInactiveEdgeColors(int i)
    {
        inActiveEdgeColors = new Color[i];
        for(int j = 0; j < i; j++)
        {
            Color color = edgeColors[j];
            inActiveEdgeColors[j] = new Color(color.getRed(), color.getGreen(), color.getBlue(), transparentFactor);
        }

    }

    private void setHistNodeColors(int i)
    {
        histNodeColors = new Color[i];
        for(int j = 0; j < i; j++)
        {
            Color color = nodeColors[j].brighter();
            histNodeColors[j] = new Color(color.getRed(), color.getGreen(), color.getBlue(), transparentFactor);
        }

    }

    private void setHistEdgeColors(int i)
    {
        histEdgeColors = new Color[i];
        for(int j = 0; j < i; j++)
        {
            Color color = edgeColors[j];
            histEdgeColors[j] = new Color(color.getRed(), color.getGreen(), color.getBlue(), transparentFactor);
        }

    }

    private void setAnimationColors(int i)
    {
        aniFadeoutColors = new Color[i];
        aniFadeinColors = new Color[i];
        aniFadeinEdgeColors = new Color[i];
        for(int j = 0; j < i; j++)
        {
            aniFadeoutColors[j] = nodeColors[j];
            aniFadeinColors[j] = nodeColors[j];
            aniFadeinEdgeColors[j] = edgeColors[j];
        }

    }

    public void displayHierarchy(Graphics g, Node node, Node node1)
    {
        pickedNode = null;
        displayEdges(node, g, node.level);
        displayNodes(node, g, node.level);
        if(isDrawnBoundary)
            displayBoundary(node, g);
        if(node.father >= 0)
        {
            int i = (APPWIDTH - HISTWIDTH) / 2;
            int j = (APPHEIGHT - HISTHEIGHT) / 2;
            if(isHistoryActive || !isHistoryActive && gr.currentX > i && gr.currentX < i + HISTWIDTH && gr.currentY >= j && gr.currentY <= j + HISTHEIGHT)
                g.setColor(histOnFocusBackgroundColor);
            else
                g.setColor(histBackgroundColor);
            g.fillRect((APPWIDTH - HISTWIDTH) / 2, (APPHEIGHT - HISTHEIGHT) / 2, HISTWIDTH, HISTHEIGHT);
            displayHistoryHierarchy(node1, node, 0, g);
        }
        if(pickedNode != null)
            drawPickedNode(pickedNode, g);
    }

    private void displayEdges(Node node, Graphics g, int i)
    {
        if(node != null)
        {
            for(int j = 0; j < node.numChildren; j++)
            {
                displayEdges(theTree.nodes[node.children[j]], g, i);
                drawEdge(node, theTree.nodes[node.children[j]], g, i);
            }

        }
    }

    private void displayNodes(Node node, Graphics g, int i)
    {
        if(node != null)
        {
            for(int j = 0; j < node.numChildren; j++)
                displayNodes(theTree.nodes[node.children[j]], g, i);

            drawNode(node, g, i);
        }
    }

    private void drawNode(Node node, Graphics g, int i)
    {
        int j = node.whichBranch;
        if(j >= colorArraySize)
        {
            j %= colorArraySize - 1;
            if(j == 0)
                j = colorArraySize - 1;
        }
        int k = (int)node.pos.x + APPWIDTH / 2;
        int l = (int)(-node.pos.y) + APPHEIGHT / 2;
        int i1 = 0;
        int j1 = 0;
        int k1 = fontSize - nodeWidthDiff * (node.level - i);
        node.fontSize = k1;
        FontMetrics fontmetrics = null;
        if(k1 > 6)
        {
            int l1 = (k1 - 8) / 2;
            g.setFont(theFonts[l1]);
            fontmetrics = g.getFontMetrics();
            i1 = fontmetrics.stringWidth(node.label) + 8;
            j1 = fontmetrics.getHeight() + 4;
        }
        if(k1 > 1 && k1 <= 6)
        {
            j1 = 2 * k1;
            i1 = 2 * j1;
            k -= i1 / 2;
            l -= j1 / 2;
            if(!gr.isResizingHistory && gr.currentX >= k && gr.currentX <= k + i1 && gr.currentY >= l && gr.currentY <= l + j1)
                pickedNode = node;
            Color color = nodeColors[j];
            if(!isHistoryActive)
            {
                g.setColor(nodeColors[j]);
            } else
            {
                g.setColor(inActiveNodeColors[j]);
                color = inActiveNodeColors[j];
            }
            if(!node.isFinalItem)
            {
                g.fillRect(k, l, i1, j1);
                g.setColor(color.darker());
                g.drawRect(k, l, i1, j1);
            } else
            {
                g.fillRect(k, l, i1, j1);
                if(node.displayStyle == '1')
                {
                    g.setColor(nodeColors[j].darker());
                    g.fillRect(k, l, 5, j1);
                } else
                if(node.displayStyle == '2')
                {
                    g.setColor(nodeColors[j].darker());
                    g.fillRect((k + i1) - 5, l, 5, j1);
                }
            }
        } else
        {
            k -= i1 / 2;
            l -= j1 / 2;
            if(k < 0)
                k = 0;
            else
            if(k > APPWIDTH - i1)
                k = APPWIDTH - i1;
            if(!isHistoryActive && gr.currentX >= k && gr.currentX <= k + i1 && gr.currentY >= l && gr.currentY <= l + j1)
                pickedNode = node;
            Color color1 = nodeColors[j];
            if(!isHistoryActive)
            {
                g.setColor(nodeColors[j]);
            } else
            {
                g.setColor(inActiveNodeColors[j]);
                color1 = inActiveNodeColors[j];
            }
            if(!node.isFinalItem)
            {
                g.fillRect(k, l, i1, j1);
                g.setColor(color1.darker());
                g.drawRect(k, l, i1, j1);
            } else
            {
                g.fillRect(k, l, i1, j1);
                if(node.displayStyle == '1')
                {
                    g.setColor(nodeColors[j].darker());
                    g.fillRect(k, l, 5, j1);
                } else
                if(node.displayStyle == '2')
                {
                    g.setColor(nodeColors[j].darker());
                    g.fillRect((k + i1) - 5, l, 5, j1);
                }
            }
            if(isNodeLabel && fontmetrics != null)
            {
                if(!isHistoryActive)
                    g.setColor(labelColors[j]);
                else
                    g.setColor(inActiveLabelColors[j]);
                g.drawString(node.label, k + 4, l + 2 + fontmetrics.getAscent());
            }
        }
    }

    private void drawPickedNode(Node node, Graphics g)
    {
        int i = node.whichBranch;
        if(i >= colorArraySize)
        {
            i %= colorArraySize - 1;
            if(i == 0)
                i = colorArraySize - 1;
        }
        int j = (int)node.pos.x + APPWIDTH / 2;
        int k = (int)(-node.pos.y) + APPHEIGHT / 2;
        if(isHistoryActive)
        {
            j = (int)node.histPos.x + APPWIDTH / 2;
            k = (int)(-node.histPos.y) + APPHEIGHT / 2;
        }
        int l = 0;
        int i1 = 0;
        int j1 = fontSize;
        FontMetrics fontmetrics = null;
        if(j1 > 2)
        {
            int k1 = (j1 - 8) / 2;
            g.setFont(theFonts[k1]);
            fontmetrics = g.getFontMetrics();
            l = fontmetrics.stringWidth(node.label) + 8;
            i1 = fontmetrics.getHeight() + 4;
        }
        j -= l / 2;
        k -= i1 / 2;
        if(j < 0)
            j = 0;
        else
        if(j > APPWIDTH - l)
            j = APPWIDTH - l;
        if(node.numDisplayInfo > 0)
        {
            infoDisplayHeight = node.numDisplayInfo * fontmetrics.getAscent() + 10;
            infoDisplayWidth = fontmetrics.stringWidth(node.displayInfo[node.numDisplayInfo - 1]) + 8;
            int l1 = j + l;
            int i2 = (k + i1) - infoDisplayHeight;
            if(l1 + infoDisplayWidth > APPWIDTH)
            {
                l1 = j - infoDisplayWidth;
                if(l1 < 0)
                    l1 = 0;
            }
            if(i2 < 0)
                i2 = 0;
            g.setColor(infoDisplayBGColor);
            g.fillRect(l1, i2, infoDisplayWidth, infoDisplayHeight);
            g.setColor(infoDisplayTxtColor);
            i2 += fontmetrics.getAscent();
            for(int j2 = 0; j2 < node.numDisplayInfo; j2++)
            {
                g.drawString(node.displayInfo[j2], l1 + 4, i2);
                i2 += fontmetrics.getAscent();
            }

        }
        Color color = nodeColors[i].brighter();
        color = color.brighter();
        g.setColor(color);
        if(!node.isFinalItem)
        {
            g.fillRect(j, k, l, i1);
            g.setColor(nodeColors[i]);
            g.drawRect(j, k, l, i1);
        } else
        {
            g.fillRect(j, k, l, i1);
        }
        if(isNodeLabel && fontmetrics != null)
        {
            g.setColor(labelColors[i]);
            g.drawString(node.label, j + 4, k + 2 + fontmetrics.getAscent());
        }
        if(node.numChildren > 0 && !isHistoryActive)
            drawBoundaryActive(node, g);
    }

    private void drawEdge(Node node, Node node1, Graphics g, int i)
    {
        int j = node1.whichBranch;
        if(j >= colorArraySize)
        {
            j %= colorArraySize - 1;
            if(j == 0)
                j = colorArraySize - 1;
        }
        int k = (int)node.pos.x + APPWIDTH / 2;
        int l = (int)(-node.pos.y) + APPHEIGHT / 2;
        int i1 = (int)node1.pos.x + APPWIDTH / 2;
        int j1 = (int)(-node1.pos.y) + APPHEIGHT / 2;
        int k1 = edgeWidth - node.level - 1;
        if(k1 <= 0)
            k1 = 1;
        if(!isHistoryActive)
            g.setColor(edgeColors[j]);
        else
            g.setColor(inActiveEdgeColors[j]);
        drawLine(g, k1, k, l, i1, j1);
    }

    private void drawLine(Graphics g, int i, int j, int k, int l, int i1)
    {
        if(j != l || k != i1)
        {
            int j1 = 0;
            for(int k1 = 0; k1 < i; k1++)
            {
                if(Math.abs(l - j) > Math.abs(i1 - k))
                    g.drawLine(j, k + j1, l, i1 + j1);
                else
                    g.drawLine(j + j1, k, l + j1, i1);
                if(j1 > 0)
                    j1 = -j1;
                else
                    j1 = -j1 + 1;
            }

        }
    }

    private void drawBoundaryActive(Node node, Graphics g)
    {
        int i = (int)(((node.pos.x + (double)(APPWIDTH / 2)) - node.bWidth / 2D) + 1.0D);
        int j = (int)(((-node.pos.y + (double)(APPHEIGHT / 2)) - node.bHeight / 2D) + 1.0D);
        g.setColor(nodeBoundColor);
        g.drawRect(i, j, (int)node.bWidth - 2, (int)node.bHeight - 2);
    }

    private void drawBoundary(Node node, Graphics g)
    {
        if(node.numChildren > 0)
        {
            int i = (int)(((node.pos.x + (double)(APPWIDTH / 2)) - node.bWidth / 2D) + 1.0D);
            int j = (int)(((-node.pos.y + (double)(APPHEIGHT / 2)) - node.bHeight / 2D) + 1.0D);
            int k = node.whichBranch;
            if(k >= colorArraySize)
            {
                k %= colorArraySize - 1;
                if(k == 0)
                    k = colorArraySize - 1;
            }
            g.setColor(nodeColors[k].darker());
            g.drawRect(i, j, (int)node.bWidth - 2, (int)node.bHeight - 2);
        }
    }

    private void displayHistoryHierarchy(Node node, Node node1, int i, Graphics g)
    {
        if(node == node1)
        {
            int j = node.numChildren;
            int l = (int)node.histPos.x + APPWIDTH / 2;
            int k1 = (int)(-node.histPos.y) + APPHEIGHT / 2;
            for(int j2 = 0; j2 < j; j2++)
            {
                Node node2 = theTree.nodes[node.children[j2]];
                int j3 = (int)node2.histPos.x + APPWIDTH / 2;
                int l3 = (int)(-node2.histPos.y) + APPHEIGHT / 2;
                int j4 = node.whichBranch;
                if(j4 >= colorArraySize)
                {
                    j4 %= colorArraySize - 1;
                    if(j4 == 0)
                        j4 = colorArraySize - 1;
                }
                drawHistoryEdge(l, k1, j3, l3, g, j4);
                displayHistoryHierarchy(node2, node1, i + 1, g);
            }

            int k2 = (int)(node.bHistWidth / HISTSCALE);
            int i3 = (int)(node.bHistHeight / HISTSCALE);
            g.setColor(histSelectedBackgroundColor);
            g.fillRect(l - k2 / 2, k1 - i3 / 2, k2, i3);
            drawHistorySelectedNode(node, l, k1, g, histMaxFontWidth - i);
        } else
        {
            int k = node.numChildren;
            if(node.level < node1.level || i < HISTMAXLEVELS)
            {
                int i1 = (int)node.histPos.x + APPWIDTH / 2;
                int l1 = (int)(-node.histPos.y) + APPHEIGHT / 2;
                for(int l2 = 0; l2 < k; l2++)
                {
                    Node node3 = theTree.nodes[node.children[l2]];
                    int k3 = (int)node3.histPos.x + APPWIDTH / 2;
                    int i4 = (int)(-node3.histPos.y) + APPHEIGHT / 2;
                    int k4 = node.whichBranch;
                    if(k4 >= colorArraySize)
                    {
                        k4 %= colorArraySize - 1;
                        if(k4 == 0)
                            k4 = colorArraySize - 1;
                    }
                    drawHistoryEdge(i1, l1, k3, i4, g, k4);
                    displayHistoryHierarchy(node3, node1, i + 1, g);
                }

                drawHistoryNode(node, i1, l1, g, histMaxFontWidth - i);
            } else
            {
                int j1 = (int)node.histPos.x + APPWIDTH / 2;
                int i2 = (int)(-node.histPos.y) + APPHEIGHT / 2;
                drawHistoryNode(node, j1, i2, g, histMaxFontWidth - i);
            }
        }
    }

    private void drawHistoryNode(Node node, int i, int j, Graphics g, int k)
    {
        int l = node.whichBranch;
        if(l >= colorArraySize)
        {
            l %= colorArraySize - 1;
            if(l == 0)
                l = colorArraySize - 1;
        }
        if(k > 6)
        {
            if(!isHistoryActive)
                g.setColor(histNodeColors[l]);
            else
                g.setColor(nodeColors[l]);
            int i1 = (k - 8) / 2;
            g.setFont(theFonts[i1]);
            FontMetrics fontmetrics = g.getFontMetrics();
            int j1 = fontmetrics.stringWidth(node.label) + 8;
            int k1 = fontmetrics.getHeight() + 4;
            i -= j1 / 2;
            j -= k1 / 2;
            if(isHistoryActive && gr.currentX >= i && gr.currentX <= i + j1 && gr.currentY >= j && gr.currentY <= j + k1)
                pickedNode = node;
            g.fillRect(i, j, j1, k1);
            if(!isHistoryActive)
                g.setColor(inActiveLabelColors[l]);
            else
                g.setColor(labelColors[l]);
            g.drawString(node.label, i + 4, j + 2 + fontmetrics.getAscent());
        } else
        if(k > 1)
        {
            if(!isHistoryActive)
                g.setColor(histNodeColors[l]);
            else
                g.setColor(nodeColors[l]);
            g.fillRect(i - 2 * k, j - k, 4 * k, 2 * k);
            if(isHistoryActive && gr.currentX >= i - 2 * k && gr.currentX <= i + 2 * k && gr.currentY >= j - k && gr.currentY <= j + k)
                pickedNode = node;
        }
    }

    private void drawHistorySelectedNode(Node node, int i, int j, Graphics g, int k)
    {
        if(k > 6)
        {
            if(!isHistoryActive)
                g.setColor(histSelectedNodeColor);
            else
                g.setColor(histActiveSelectedNodeColor);
            int l = (k - 8) / 2;
            g.setFont(theFonts[l]);
            FontMetrics fontmetrics = g.getFontMetrics();
            int i1 = fontmetrics.stringWidth(node.label) + 8;
            int j1 = fontmetrics.getHeight() + 4;
            i -= i1 / 2;
            j -= j1 / 2;
            if(isHistoryActive && gr.currentX >= i && gr.currentX <= i + i1 && gr.currentY >= j && gr.currentY <= j + j1)
                pickedNode = node;
            g.fillRect(i, j, i1, j1);
            if(!isHistoryActive)
                g.setColor(inActiveLabelColors[node.whichBranch]);
            else
                g.setColor(labelColors[node.whichBranch]);
            g.drawString(node.label, i + 4, j + 2 + fontmetrics.getAscent());
        } else
        if(k > 1)
        {
            if(!isHistoryActive)
                g.setColor(histSelectedNodeColor);
            else
                g.setColor(histActiveSelectedNodeColor);
            g.fillRect(i - 2 * k, j - k, 4 * k, 2 * k);
            if(isHistoryActive && gr.currentX >= i - 2 * k && gr.currentX <= i + 2 * k && gr.currentY >= j - k && gr.currentY <= j + k)
                pickedNode = node;
        }
    }

    private void drawHistoryEdge(int i, int j, int k, int l, Graphics g, int i1)
    {
        if(!isHistoryActive)
            g.setColor(histEdgeColors[i1]);
        else
            g.setColor(edgeColors[i1]);
        g.drawLine(i, j, k, l);
    }

    private void setNodeBranches()
    {
        for(int i = 0; i < theTree.root.numChildren; i++)
        {
            Node node = theTree.nodes[theTree.root.children[i]];
            node.whichBranch = i + 1;
            setNodeBranch(node);
        }

    }

    private void setNodeBranch(Node node)
    {
        int i = node.numChildren;
        for(int j = 0; j < i; j++)
        {
            Node node1 = theTree.nodes[node.children[j]];
            node1.whichBranch = node.whichBranch;
            setNodeBranch(node1);
        }

    }

    private void displayBoundary(Node node, Graphics g)
    {
        if(node != null)
        {
            for(int i = 0; i < node.numChildren; i++)
                drawBoundary(theTree.nodes[node.children[i]], g);

        }
    }

    public void setStatus4LeftClick(Node node, Node node1, int i, int j)
    {
        if(node == node1)
            i = 1;
        if(i == 1)
            node.status = 2;
        else
        if(node.level < node1.level || j < HISTMAXLEVELS)
            node.status = 5;
        else
            node.status = 1;
        for(int k = 0; k < node.numChildren; k++)
            setStatus4LeftClick(theTree.nodes[node.children[k]], node1, i, j + 1);

    }

    public void setStatus4RightClick(Node node, Node node1, int i)
    {
        if(node == node1)
            i = 1;
        if(i == 1)
            if(node.status == 0)
                node.status = 4;
            else
            if(node.status == 1)
                node.status = 3;
        for(int j = 0; j < node.numChildren; j++)
            setStatus4RightClick(theTree.nodes[node.children[j]], node1, i);

    }

    public void setNodeStatus(Node node, Node node1, int i)
    {
        if(node == node1)
            i = 1;
        if(i == 1)
            node.status = 0;
        else
            node.status = 1;
        for(int j = 0; j < node.numChildren; j++)
            setNodeStatus(theTree.nodes[node.children[j]], node1, i);

    }

    public void displayHierarchyAnimation(Graphics g, Node node, Node node1, Node node2)
    {
        if(!gr.isSelectedFromHistory)
        {
            for(int i = 0; i < colorArraySize; i++)
            {
                Color color = nodeColors[i];
                Color color1 = edgeColors[i];
                int l = color.getRed();
                int i1 = color.getGreen();
                int j1 = color.getBlue();
                Color color2 = gr.getBackground();
                int k1 = color2.getRed();
                int l1 = color2.getGreen();
                int i2 = color2.getBlue();
                int j2 = color1.getRed();
                int k2 = color1.getGreen();
                int l2 = color1.getBlue();
                if(animationState <= FADEOUT_ENDANIMATION)
                {
                    int i3 = l + ((k1 - l) * animationState) / FADEOUT_ENDANIMATION;
                    int l3 = i1 + ((l1 - i1) * animationState) / FADEOUT_ENDANIMATION;
                    int k4 = j1 + ((i2 - j1) * animationState) / FADEOUT_ENDANIMATION;
                    if(i3 < 0)
                        i3 = 0;
                    if(i3 > 255)
                        i3 = 255;
                    if(l3 < 0)
                        l3 = 0;
                    if(l3 > 255)
                        l3 = 255;
                    if(k4 < 0)
                        k4 = 0;
                    if(k4 > 255)
                        k4 = 255;
                    aniFadeoutColors[i] = new Color(i3, l3, k4);
                }
                if(animationState <= FADEIN_ENDANIMATION)
                {
                    int j3 = k1 + ((l - k1) * animationState) / FADEIN_ENDANIMATION;
                    int i4 = l1 + ((i1 - l1) * animationState) / FADEIN_ENDANIMATION;
                    int l4 = i2 + ((j1 - i2) * animationState) / FADEIN_ENDANIMATION;
                    if(j3 < 0)
                        j3 = 0;
                    if(j3 > 255)
                        j3 = 255;
                    if(i4 < 0)
                        i4 = 0;
                    if(i4 > 255)
                        i4 = 255;
                    if(l4 < 0)
                        l4 = 0;
                    if(l4 > 255)
                        l4 = 255;
                    aniFadeinColors[i] = new Color(j3, i4, l4);
                }
                if(animationState > FADEIN_ENDANIMATION)
                    continue;
                int k3 = k1 + ((j2 - k1) * animationState) / FADEIN_ENDANIMATION;
                int j4 = l1 + ((k2 - l1) * animationState) / FADEIN_ENDANIMATION;
                int i5 = i2 + ((l2 - i2) * animationState) / FADEIN_ENDANIMATION;
                if(k3 < 0)
                    k3 = 0;
                if(k3 > 255)
                    k3 = 255;
                if(j4 < 0)
                    j4 = 0;
                if(j4 > 255)
                    j4 = 255;
                if(i5 < 0)
                    i5 = 0;
                if(i5 > 255)
                    i5 = 255;
                aniFadeinEdgeColors[i] = new Color(k3, j4, i5);
            }

            if(node.father != -1 && animationState < FADEOUT_ENDANIMATION)
            {
                int j = APPWIDTH - ((APPWIDTH - HISTWIDTH) * animationState) / FADEOUT_ENDANIMATION;
                int k = APPHEIGHT - ((APPHEIGHT - HISTHEIGHT) * animationState) / FADEOUT_ENDANIMATION;
                g.setColor(histBackgroundColor);
                g.fillRect((APPWIDTH - j) / 2, (APPHEIGHT - k) / 2, j, k);
            }
            displayHierarchyAnimation(node1, g, node.level, node1.level, node2.level, 0);
        } else
        {
            g.setColor(histOnFocusBackgroundColor);
            g.fillRect((APPWIDTH - HISTWIDTH) / 2, (APPHEIGHT - HISTHEIGHT) / 2, HISTWIDTH, HISTHEIGHT);
            displayHistoryHierarchy(node1, node, 0, g);
            displayHistoryHierarchyAnimation(node, g, node.level, node1.level, 0);
        }
    }

    private void displayHierarchyAnimation(Node node, Graphics g, int i, int j, int k, int l)
    {
        if(node != null)
        {
            for(int i1 = 0; i1 < node.numChildren; i1++)
                displayHierarchyAnimation(theTree.nodes[node.children[i1]], g, i, j, k, l + 1);

            if(node.status == 2)
            {
                if(animationState <= FADEOUT_ENDANIMATION && l < HISTMAXLEVELS)
                    drawAnimationNodeEdgeFadeoutInvis(node, g, j, l);
                drawAnimationNodeEdgeFadeinVis(node, g, i);
            } else
            if(node.status == 3)
            {
                if(l < HISTMAXLEVELS)
                    drawAnimationNodeEdgeFadeinInvis(node, g, i, l);
            } else
            if(node.status == 4)
            {
                drawAnimationNodeEdgeFadeoutVis(node, g, k);
                if(animationState <= FADEOUT_ENDANIMATION && l < HISTMAXLEVELS)
                    drawAnimationNodeEdgeFadeinInvis(node, g, i, l);
            } else
            if(node.status == 5 && animationState <= FADEOUT_ENDANIMATION && l < HISTMAXLEVELS)
                drawAnimationNodeEdgeFadeoutInvis(node, g, j, l);
        }
    }

    private void displayHistoryHierarchyAnimation(Node node, Graphics g, int i, int j, int k)
    {
        if(node != null)
        {
            for(int l = 0; l < node.numChildren; l++)
                displayHistoryHierarchyAnimation(theTree.nodes[node.children[l]], g, i, j, k + 1);

            drawAnimationNodeEdgeFadeinHistory(node, g, i);
        }
    }

    private void drawAnimationNodeEdgeFadeinVis(Node node, Graphics g, int i)
    {
        int j = node.whichBranch;
        if(j >= colorArraySize)
        {
            j %= colorArraySize - 1;
            if(j == 0)
                j = colorArraySize - 1;
        }
        int k = (int)(node.aniPos.x + ((double)animationState * (node.pos.x - node.aniPos.x)) / (double)FADEIN_ENDANIMATION) + APPWIDTH / 2;
        int l = (int)(-(node.aniPos.y + ((double)animationState * (node.pos.y - node.aniPos.y)) / (double)FADEIN_ENDANIMATION)) + APPHEIGHT / 2;
        int i1 = 0;
        int j1 = 0;
        g.setColor(edgeColors[j]);
        for(int k1 = 0; k1 < node.numChildren; k1++)
        {
            Node node1 = theTree.nodes[node.children[k1]];
            int i2 = (int)(node1.aniPos.x + ((double)animationState * (node1.pos.x - node1.aniPos.x)) / (double)FADEIN_ENDANIMATION) + APPWIDTH / 2;
            int k2 = (int)(-(node1.aniPos.y + ((double)animationState * (node1.pos.y - node1.aniPos.y)) / (double)FADEIN_ENDANIMATION)) + APPHEIGHT / 2;
            g.drawLine(k, l, i2, k2);
        }

        int l1 = fontSize - nodeWidthDiff * (node.level - i);
        l1 = node.fontSize + ((l1 - node.fontSize) * animationState) / FADEIN_ENDANIMATION;
        FontMetrics fontmetrics = null;
        if(l1 > 6)
        {
            int j2 = (l1 - 8) / 2;
            g.setFont(theFonts[j2]);
            fontmetrics = g.getFontMetrics();
            i1 = fontmetrics.stringWidth(node.label) + 8;
            j1 = fontmetrics.getHeight() + 4;
        }
        if(l1 > 1 && l1 <= 6)
        {
            j1 = 2 * l1;
            i1 = 2 * j1;
            k -= i1 / 2;
            l -= j1 / 2;
            if(gr.currentX >= k && gr.currentX <= k + i1 && gr.currentY >= l && gr.currentY <= l + j1)
                pickedNode = node;
            g.setColor(nodeColors[j]);
            g.fillRect(k, l, i1, j1);
        } else
        {
            k -= i1 / 2;
            l -= j1 / 2;
            g.setColor(nodeColors[j]);
            g.fillRect(k, l, i1, j1);
            if(isNodeLabel && fontmetrics != null)
            {
                g.setColor(labelColors[j]);
                g.drawString(node.label, k + 4, l + 2 + fontmetrics.getAscent());
            }
        }
    }

    private void drawAnimationNodeEdgeFadeinInvis(Node node, Graphics g, int i, int j)
    {
        int k = (int)(node.aniPos.x + ((double)animationState * (node.pos.x - node.aniPos.x)) / (double)FADEIN_ENDANIMATION) + APPWIDTH / 2;
        int l = (int)(-(node.aniPos.y + ((double)animationState * (node.pos.y - node.aniPos.y)) / (double)FADEIN_ENDANIMATION)) + APPHEIGHT / 2;
        int i1 = 0;
        int j1 = 0;
        for(int k1 = 0; k1 < node.numChildren; k1++)
        {
            Node node1 = theTree.nodes[node.children[k1]];
            int i2 = node1.whichBranch;
            if(i2 >= colorArraySize)
            {
                i2 %= colorArraySize - 1;
                if(i2 == 0)
                    i2 = colorArraySize - 1;
            }
            int l2 = (int)(node1.aniPos.x + ((double)animationState * (node1.pos.x - node1.aniPos.x)) / (double)FADEIN_ENDANIMATION) + APPWIDTH / 2;
            int i3 = (int)(-(node1.aniPos.y + ((double)animationState * (node1.pos.y - node1.aniPos.y)) / (double)FADEIN_ENDANIMATION)) + APPHEIGHT / 2;
            g.setColor(edgeColors[i2]);
            g.drawLine(k, l, l2, i3);
            if(j < HISTMAXLEVELS - 2)
                continue;
            int j3 = histMaxFontWidth - j - 1;
            j3 += ((node1.fontSize - j3) * animationState) / FADEIN_ENDANIMATION;
            FontMetrics fontmetrics1 = null;
            if(j3 > 6)
            {
                int k3 = (j3 - 8) / 2;
                g.setFont(theFonts[k3]);
                fontmetrics1 = g.getFontMetrics();
                i1 = fontmetrics1.stringWidth(node.label) + 8;
                j1 = fontmetrics1.getHeight() + 4;
            }
            if(j3 > 1 && j3 <= 6)
            {
                j1 = 2 * j3;
                i1 = 2 * j1;
                l2 -= i1 / 2;
                i3 -= j1 / 2;
                g.setColor(nodeColors[i2]);
                g.fillRect(l2, i3, i1, j1);
                continue;
            }
            if(j3 <= 6)
                continue;
            l2 -= i1 / 2;
            i3 -= j1 / 2;
            g.setColor(nodeColors[i2]);
            g.fillRect(l2, i3, i1, j1);
            if(isNodeLabel && fontmetrics1 != null)
            {
                g.setColor(labelColors[i2]);
                g.drawString(node.label, l2 + 4, i3 + 2 + fontmetrics1.getAscent());
            }
        }

        int l1 = histMaxFontWidth - j;
        l1 += ((node.fontSize - l1) * animationState) / FADEIN_ENDANIMATION;
        FontMetrics fontmetrics = null;
        if(l1 > 6)
        {
            int j2 = (l1 - 8) / 2;
            g.setFont(theFonts[j2]);
            fontmetrics = g.getFontMetrics();
            i1 = fontmetrics.stringWidth(node.label) + 8;
            j1 = fontmetrics.getHeight() + 4;
        }
        int k2 = node.whichBranch;
        if(k2 >= colorArraySize)
        {
            k2 %= colorArraySize - 1;
            if(k2 == 0)
                k2 = colorArraySize - 1;
        }
        if(l1 > 1 && l1 <= 6)
        {
            j1 = 2 * l1;
            i1 = 2 * j1;
            k -= i1 / 2;
            l -= j1 / 2;
            g.setColor(nodeColors[k2]);
            g.fillRect(k, l, i1, j1);
        } else
        if(l1 > 6)
        {
            k -= i1 / 2;
            l -= j1 / 2;
            g.setColor(nodeColors[k2]);
            g.fillRect(k, l, i1, j1);
            if(isNodeLabel && fontmetrics != null)
            {
                g.setColor(labelColors[k2]);
                g.drawString(node.label, k + 4, l + 2 + fontmetrics.getAscent());
            }
        }
    }

    private void drawAnimationNodeEdgeFadeoutVis(Node node, Graphics g, int i)
    {
        int j = node.whichBranch;
        if(j >= colorArraySize)
        {
            j %= colorArraySize - 1;
            if(j == 0)
                j = colorArraySize - 1;
        }
        int k = (int)node.preAniPos.x + APPWIDTH / 2;
        int l = (int)(-node.preAniPos.y) + APPHEIGHT / 2;
        int i1 = 0;
        int j1 = 0;
        int k1 = fontSize - nodeWidthDiff * (node.level - i);
        node.fontSize = k1;
        FontMetrics fontmetrics = null;
        if(k1 > 6)
        {
            int l1 = (k1 - 8) / 2;
            g.setFont(theFonts[l1]);
            fontmetrics = g.getFontMetrics();
            i1 = fontmetrics.stringWidth(node.label) + 8;
            j1 = fontmetrics.getHeight() + 4;
        }
        if(k1 > 1 && k1 <= 6)
        {
            j1 = 2 * k1;
            i1 = 2 * j1;
            k -= i1 / 2;
            l -= j1 / 2;
            g.setColor(aniFadeoutColors[j]);
            g.fillRect(k, l, i1, j1);
        } else
        {
            k -= i1 / 2;
            l -= j1 / 2;
            g.setColor(aniFadeoutColors[j]);
            g.fillRect(k, l, i1, j1);
            if(isNodeLabel && fontmetrics != null)
            {
                g.setColor(labelColors[j]);
                g.drawString(node.label, k + 4, l + 2 + fontmetrics.getAscent());
            }
        }
    }

    private void drawAnimationNodeEdgeFadeoutInvis(Node node, Graphics g, int i, int j)
    {
        int k = node.whichBranch;
        if(k >= colorArraySize)
        {
            k %= colorArraySize - 1;
            if(k == 0)
                k = colorArraySize - 1;
        }
        int l = (int)(node.pos.x + ((double)animationState * (node.histPos.x - node.pos.x)) / (double)FADEOUT_ENDANIMATION) + APPWIDTH / 2;
        int i1 = (int)(-(node.pos.y + ((double)animationState * (node.histPos.y - node.pos.y)) / (double)FADEOUT_ENDANIMATION)) + APPHEIGHT / 2;
        int j1 = 0;
        int k1 = 0;
        g.setColor(histEdgeColors[k]);
        for(int l1 = 0; l1 < node.numChildren; l1++)
        {
            Node node1 = theTree.nodes[node.children[l1]];
            int j2 = (int)(node1.pos.x + ((double)animationState * (node1.histPos.x - node1.pos.x)) / (double)FADEOUT_ENDANIMATION) + APPWIDTH / 2;
            int l2 = (int)(-(node1.pos.y + ((double)animationState * (node1.histPos.y - node1.pos.y)) / (double)FADEOUT_ENDANIMATION)) + APPHEIGHT / 2;
            g.drawLine(l, i1, j2, l2);
        }

        int i2 = histMaxFontWidth - j;
        i2 = node.fontSize + ((i2 - node.fontSize) * animationState) / FADEOUT_ENDANIMATION;
        FontMetrics fontmetrics = null;
        if(i2 > 6)
        {
            int k2 = (i2 - 8) / 2;
            g.setFont(theFonts[k2]);
            fontmetrics = g.getFontMetrics();
            j1 = fontmetrics.stringWidth(node.label) + 8;
            k1 = fontmetrics.getHeight() + 4;
        }
        if(i2 > 1 && i2 <= 6)
        {
            k1 = 2 * i2;
            j1 = 2 * k1;
            l -= j1 / 2;
            i1 -= k1 / 2;
            g.setColor(histNodeColors[k]);
            g.fillRect(l, i1, j1, k1);
        } else
        if(i2 > 6)
        {
            l -= j1 / 2;
            i1 -= k1 / 2;
            g.setColor(histNodeColors[k]);
            g.fillRect(l, i1, j1, k1);
            if(isNodeLabel && fontmetrics != null)
            {
                g.setColor(labelColors[k]);
                g.drawString(node.label, l + 4, i1 + 2 + fontmetrics.getAscent());
            }
        }
    }

    private void drawAnimationNodeEdgeFadeinHistory(Node node, Graphics g, int i)
    {
        int j = node.whichBranch;
        if(j >= colorArraySize)
        {
            j %= colorArraySize - 1;
            if(j == 0)
                j = colorArraySize - 1;
        }
        int k = (int)(node.histPos.x + ((double)animationState * (node.pos.x - node.histPos.x)) / (double)FADEIN_ENDANIMATION) + APPWIDTH / 2;
        int l = (int)(-(node.histPos.y + ((double)animationState * (node.pos.y - node.histPos.y)) / (double)FADEIN_ENDANIMATION)) + APPHEIGHT / 2;
        int i1 = 0;
        int j1 = 0;
        g.setColor(edgeColors[j]);
        for(int k1 = 0; k1 < node.numChildren; k1++)
        {
            Node node1 = theTree.nodes[node.children[k1]];
            int i2 = (int)(node1.histPos.x + ((double)animationState * (node1.pos.x - node1.histPos.x)) / (double)FADEIN_ENDANIMATION) + APPWIDTH / 2;
            int k2 = (int)(-(node1.histPos.y + ((double)animationState * (node1.pos.y - node1.histPos.y)) / (double)FADEIN_ENDANIMATION)) + APPHEIGHT / 2;
            g.drawLine(k, l, i2, k2);
        }

        int l1 = fontSize - nodeWidthDiff * (node.level - i);
        l1 = node.fontSize + ((l1 - node.fontSize) * animationState) / FADEIN_ENDANIMATION;
        FontMetrics fontmetrics = null;
        if(l1 > 6)
        {
            int j2 = (l1 - 8) / 2;
            g.setFont(theFonts[j2]);
            fontmetrics = g.getFontMetrics();
            i1 = fontmetrics.stringWidth(node.label) + 8;
            j1 = fontmetrics.getHeight() + 4;
        }
        if(l1 > 1 && l1 <= 6)
        {
            j1 = 2 * l1;
            i1 = 2 * j1;
            k -= i1 / 2;
            l -= j1 / 2;
            if(gr.currentX >= k && gr.currentX <= k + i1 && gr.currentY >= l && gr.currentY <= l + j1)
                pickedNode = node;
            g.setColor(nodeColors[j]);
            g.fillRect(k, l, i1, j1);
        } else
        {
            k -= i1 / 2;
            l -= j1 / 2;
            g.setColor(nodeColors[j]);
            g.fillRect(k, l, i1, j1);
            if(isNodeLabel && fontmetrics != null)
            {
                g.setColor(labelColors[j]);
                g.drawString(node.label, k + 4, l + 2 + fontmetrics.getAscent());
            }
        }
    }

    private void drawEdgeAnimation(Node node, Node node1, Graphics g)
    {
        int i = node1.whichBranch;
        if(i >= colorArraySize)
        {
            i %= colorArraySize - 1;
            if(i == 0)
                i = colorArraySize - 1;
        }
        int j = (int)node.aniPos.x + APPWIDTH / 2;
        int k = (int)(-node.aniPos.y) + APPHEIGHT / 2;
        int l = (int)node1.aniPos.x + APPWIDTH / 2;
        int i1 = (int)(-node1.aniPos.y) + APPHEIGHT / 2;
        g.setColor(edgeColors[i]);
        drawLine(g, 1, j, k, l, i1);
    }

    private void printTree(Node node)
    {
        printNode(node);
        for(int i = 0; i < node.numChildren; i++)
            printTree(theTree.nodes[node.children[i]]);

    }

    private void printNode(Node node)
    {
        System.out.println("NODE " + node.label + "(" + node.pos.x + ", " + node.pos.y + ")");
        System.out.println("Weight: " + node.weight + ", Width, Height: (" + node.bWidth + ", " + node.bHeight + ")");
        System.out.println("Level: " + node.level + "----");
    }

    private void printChildren(Node node)
    {
        System.out.print("NODE " + node.label + ": ");
        for(int i = 0; i < node.numChildren; i++)
            System.out.print(theTree.nodes[node.children[i]].label + "(" + theTree.nodes[node.children[i]].weight + "), ");

        System.out.println();
    }

    private void printRectangle(MyRectangle myrectangle)
    {
        System.out.println("Rectangle: (" + myrectangle.center.x + ", " + myrectangle.center.y + ")");
        System.out.println(" Width, Height: (" + myrectangle.width + ", " + myrectangle.height + "), Weight: " + myrectangle.weight + ", Non-div: " + myrectangle.non_divside);
        System.out.println("----");
    }

    private Graph gr;
    HierarchyTree theTree;
    final double WEIGHT_CONST = 0.45000000000000001D;
    final double MIN_RATIO = 0.69999999999999996D;
    final double DEDUCT_RATIO = 0.96999999999999997D;
    boolean isNodeLabel;
    int APPWIDTH;
    int APPHEIGHT;
    int HISTWIDTH;
    int HISTHEIGHT;
    double DEFAULTHISTSCALE;
    double PREHISTSCALE;
    double HISTSCALE;
    int HISTMAXLEVELS;
    int transparentFactor;
    int colorArraySize;
    Color nodeColors[];
    Color inActiveNodeColors[];
    Color edgeColors[];
    Color inActiveEdgeColors[];
    Color labelColors[];
    Color inActiveLabelColors[];
    Color nodeBoundColor;
    Color histBackgroundColor;
    Color histOnFocusBackgroundColor;
    Color histSelectedBackgroundColor;
    Color histNodeColors[];
    Color histSelectedNodeColor;
    Color histActiveSelectedNodeColor;
    Color histEdgeColors[];
    int defaultHistMaxFontWidth;
    int histMaxFontWidth;
    int fontSize;
    final int smallestFontSize = 8;
    Font theFonts[];
    int fontArrSize;
    boolean isDrawnBoundary;
    Color boundaryColor;
    boolean isHistoryActive;
    int edgeWidth;
    int nodeWidthDiff;
    int animationState;
    int FADEIN_ENDANIMATION;
    int FADEOUT_ENDANIMATION;
    private Color aniFadeoutColors[];
    private Color aniFadeinColors[];
    private Color aniFadeinEdgeColors[];
    private Color infoDisplayBGColor;
    private Color infoDisplayTxtColor;
    private int infoDisplayWidth;
    private int infoDisplayHeight;
    Node pickedNode;
}
