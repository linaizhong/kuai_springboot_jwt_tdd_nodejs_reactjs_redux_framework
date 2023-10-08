// Decompiled by Jad v1.5.7. Copyright 1997-99 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/SiliconValley/Bridge/8617/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   Graph.java

import java.applet.Applet;
import java.applet.AppletContext;
import java.awt.*;
import java.net.MalformedURLException;
import java.net.URL;

class GraphPanel extends Panel
    implements Runnable
{

    GraphPanel(Graph graph1)
    {
        nodes = new Node[100];
        edges = new Edge[200];
        fixedColor = Color.red;
        selectColor = Color.pink;
        edgeColor = Color.black;
        stressColor = Color.gray;
        arcColor2 = Color.pink;
        arcColor3 = Color.red;
        graph = graph1;
    }

    void addEdge(String s, String s1, String s2, String s3, int i, boolean flag)
    {
        Edge edge = new Edge();
        edge.from = findNode(s, s1, flag);
        edge.to = findNode(s2, s3, flag);
        edge.len = i;
        edge.evisible = flag;
        edges[nedges++] = edge;
    }

    int addNode(String s, String s1, boolean flag)
    {
        Node node = new Node();
        node.x = 10D + 480D * Math.random();
        node.y = 10D + 230D * Math.random();
        node.lbl = s;
        node.address = s1;
        node.growth_dir = flag;
        if(flag)
            node.growth_coeff = 26;
        nodes[nnodes] = node;
        return nnodes++;
    }

    void findNeighbours(int i)
    {
        for(int j = 0; j < nnodes; j++)
        {
            nodes[j].growth_dir = false;
            for(int k = 0; k < nedges; k++)
            {
                for(int i1 = 0; i1 < nedges; i1++)
                    if(j == edges[k].to && edges[k].from == i || j == edges[k].from && edges[k].to == i)
                    {
                        nodes[j].growth_dir = true;
                        edges[k].evisible = true;
                    }
                    else
                    if(j == edges[k].from && edges[k].to == edges[i1].from && edges[i1].to == i || j == edges[k].from && edges[k].to == edges[i1].to && edges[i1].from == i || j == edges[k].to && edges[k].from == edges[i1].from && edges[i1].to == i)
                        nodes[j].growth_dir = true;

            }

        }

        nodes[i].growth_dir = true;
        for(int l = 0; l < nedges; l++)
        {
            edges[l].evisible = true;
            if(!nodes[edges[l].from].growth_dir || !nodes[edges[l].to].growth_dir)
                edges[l].evisible = false;
        }

    }

    int findNode(String s, String s1, boolean flag)
    {
        for(int i = 0; i < nnodes; i++)
            if(nodes[i].lbl.equals(s))
                return i;

        return addNode(s, s1, flag);
    }

    public String getWebAddress(int i, int j)
    {
        double d = 1.7976931348623157E+308D;
        for(int k = 0; k < nnodes; k++)
        {
            Node node = nodes[k];
            double d1 = (node.x - (double)i) * (node.x - (double)i) + (node.y - (double)j) * (node.y - (double)j);
            if(d1 < d)
            {
                pick = node;
                d = d1;
            }
        }

        return pick.address;
    }

    public synchronized boolean mouseDown(Event event, int i, int j)
    {
        double d = 1.7976931348623157E+308D;
        int k = 0;
        for(int l = 0; l < nnodes; l++)
        {
            Node node = nodes[l];
            double d1 = (node.x - (double)i) * (node.x - (double)i) + (node.y - (double)j) * (node.y - (double)j);
            if(d1 < d)
            {
                pick = node;
                d = d1;
                k = l;
            }
        }

        pickfixed = pick.fixed;
        pick.fixed = true;
        pick.x = i;
        pick.y = j;
        findNeighbours(k);
        String s = getWebAddress(i, j);
        URL url = null;
        try
        {
            url = new URL(s);
        }
        catch(MalformedURLException malformedurlexception)
        {
            malformedurlexception.printStackTrace();
        }
        graph.getAppletContext().showDocument(url, "right");
        repaint();
        return true;
    }

    public synchronized boolean mouseDrag(Event event, int i, int j)
    {
        pick.x = i;
        pick.y = j;
        repaint();
        return true;
    }

    public synchronized boolean mouseUp(Event event, int i, int j)
    {
        pick.x = i;
        pick.y = j;
        pick.fixed = pickfixed;
        pick = null;
        repaint();
        return true;
    }

    public void paintNode(Graphics g, Node node, FontMetrics fontmetrics)
    {
        int i = (int)node.x;
        int j = (int)node.y;
        g.setColor(node != pick ? node.fixed ? fixedColor : nodeColor : selectColor);
        if(node.growth_dir)
        {
            node.growth_coeff++;
            if(node.growth_coeff > 26)
                node.growth_coeff = 26;
        }
        else
        {
            node.growth_coeff--;
            if(node.growth_coeff < 0)
                node.growth_coeff = 0;
        }
        if(node.growth_coeff > 0)
        {
            g.setFont(new Font("SansSerif", 1, 14));
            fontmetrics = g.getFontMetrics();
            int k = fontmetrics.stringWidth(node.lbl) + 10;
            int l = fontmetrics.getHeight() + 4;
            g.fillRect(i - k / 2, j - l / 2, k, l);
            g.drawRect(i - k / 2, j - l / 2, k - 1, l - 1);
            g.setColor(new Color(247 - (19 * node.growth_coeff) / 2, 221 - (17 * node.growth_coeff) / 2, 99 + 6 * node.growth_coeff));
            Font font = new Font("SansSerif", 1, (2 + node.growth_coeff) / 2);
            fontmetrics = g.getFontMetrics(font);
            g.setFont(font);
            g.drawString(node.lbl, i - (k - 10) / 2, (j - (l - 4) / 2) + fontmetrics.getAscent());
        }
    }

    synchronized void relax()
    {
        for(int i = 0; i < nedges; i++)
        {
            Edge edge = edges[i];
            double d = nodes[edge.to].x - nodes[edge.from].x;
            double d2 = nodes[edge.to].y - nodes[edge.from].y;
            double d4 = Math.sqrt(d * d + d2 * d2);
            double d5 = (edges[i].len - d4) / (d4 * 3D);
            double d8 = d5 * d;
            double d10 = d5 * d2;
            nodes[edge.to].dx += d8;
            nodes[edge.to].dy += d10;
            nodes[edge.from].dx += -d8;
            nodes[edge.from].dy += -d10;
        }

        for(int j = 0; j < nnodes; j++)
        {
            Node node = nodes[j];
            double d1 = 0.0D;
            double d3 = 0.0D;
            for(int l = 0; l < nnodes; l++)
                if(j != l)
                {
                    Node node2 = nodes[l];
                    double d7 = node.x - node2.x;
                    double d9 = node.y - node2.y;
                    double d11 = d7 * d7 + d9 * d9;
                    if(d11 == 0.0D)
                    {
                        d1 += Math.random();
                        d3 += Math.random();
                    }
                    else
                    if(d11 < 10000D)
                    {
                        d1 += d7 / d11;
                        d3 += d9 / d11;
                    }
                }

            double d6 = d1 * d1 + d3 * d3;
            if(d6 > 0.0D)
            {
                d6 = Math.sqrt(d6) / 2D;
                node.dx += d1 / d6;
                node.dy += d3 / d6;
            }
        }

        Dimension dimension = size();
        for(int k = 0; k < nnodes; k++)
        {
            Node node1 = nodes[k];
            if(!node1.fixed)
            {
                node1.x += Math.max(-5D, Math.min(5D, node1.dx));
                node1.y += Math.max(-5D, Math.min(5D, node1.dy));
                if(node1.x < 20D)
                    node1.x = 20D;
                else
                if(node1.x > (double)(dimension.width - 20))
                    node1.x = dimension.width - 20;
                if(node1.y < 10D)
                    node1.y = 10D;
                else
                if(node1.y > (double)(dimension.height - 10))
                    node1.y = dimension.height - 10;
            }
            node1.dx /= 2D;
            node1.dy /= 2D;
        }

        repaint();
    }

    public void run()
    {
        do
        {
            relax();
            if(random && Math.random() < 0.029999999999999999D)
            {
                Node node = nodes[(int)(Math.random() * (double)nnodes)];
                if(!node.fixed)
                {
                    node.x += 100D * Math.random() - 50D;
                    node.y += 100D * Math.random() - 50D;
                }
                graph.play(graph.getCodeBase(), "audio/drip.au");
            }
            try
            {
                Thread.sleep(100L);
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
        Dimension dimension = size();
        if(offscreen == null || dimension.width != offscreensize.width || dimension.height != offscreensize.height)
        {
            offscreen = createImage(dimension.width, dimension.height);
            offscreensize = dimension;
            offgraphics = offscreen.getGraphics();
            offgraphics.setFont(getFont());
        }
        offgraphics.setColor(new Color(247, 221, 99));
        offgraphics.fillRect(0, 0, dimension.width, dimension.height);
        for(int i = 0; i < nedges; i++)
            if(edges[i].evisible)
            {
                Edge edge = edges[i];
                int j = (int)nodes[edge.from].x;
                int l = (int)nodes[edge.from].y;
                int i1 = (int)nodes[edge.to].x;
                int j1 = (int)nodes[edge.to].y;
                int k1 = (int)Math.abs(Math.sqrt((j - i1) * (j - i1) + (l - j1) * (l - j1)) - edge.len);
                offgraphics.setColor(k1 >= 10 ? k1 >= 20 ? arcColor3 : arcColor2 : arcColor1);
                offgraphics.drawLine(j, l, i1, j1);
                if(stress)
                {
                    String s = String.valueOf(k1);
                    offgraphics.setColor(stressColor);
                    offgraphics.drawString(s, j + (i1 - j) / 2, l + (j1 - l) / 2);
                    offgraphics.setColor(edgeColor);
                }
            }

        FontMetrics fontmetrics = offgraphics.getFontMetrics();
        for(int k = 0; k < nnodes; k++)
            paintNode(offgraphics, nodes[k], fontmetrics);

        g.drawImage(offscreen, 0, 0, null);
    }

    Graph graph;
    int nnodes;
    Node nodes[];
    int nedges;
    Edge edges[];
    Thread relaxer;
    boolean stress;
    boolean random;
    Node pick;
    boolean pickfixed;
    Image offscreen;
    Dimension offscreensize;
    Graphics offgraphics;
    final Color fixedColor;
    final Color selectColor;
    final Color edgeColor;
    final Color nodeColor = new Color(247, 221, 99);
    final Color stressColor;
    final Color arcColor1 = new Color(0, 0, 255);
    final Color arcColor2;
    final Color arcColor3;
}
