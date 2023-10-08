// Decompiled by Jad v1.5.7. Copyright 1997-99 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/SiliconValley/Bridge/8617/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   Graph.java

import java.applet.Applet;
import java.awt.*;
import java.util.StringTokenizer;

public class Graph extends Applet
{

    public Graph()
    {
    }

    public boolean action(Event event, Object obj)
    {
        if(obj instanceof Boolean)
        {
            if(((Checkbox)event.target).getLabel().equals("Stress"))
                panel.stress = ((Boolean)obj).booleanValue();
            else
                panel.random = ((Boolean)obj).booleanValue();
            return true;
        }
        if("Navigation".equals(obj))
        {
            play(getCodeBase(), "audio/computer.au");
            Dimension dimension = size();
            for(int i = 0; i < panel.nnodes; i++)
            {
                Node node = panel.nodes[i];
                if(!node.fixed)
                {
                    node.x = 10D + (double)(dimension.width - 20) * Math.random();
                    node.y = 10D + (double)(dimension.height - 20) * Math.random();
                }
            }

            return true;
        }
        if("Access".equals(obj))
        {
            play(getCodeBase(), "audio/gong.au");
            Dimension dimension1 = size();
            for(int j = 0; j < panel.nnodes; j++)
            {
                Node node1 = panel.nodes[j];
                if(!node1.fixed)
                {
                    node1.x += 80D * Math.random() - 40D;
                    node1.y += 80D * Math.random() - 40D;
                }
            }

            return true;
        }
        else
        {
            return false;
        }
    }

    public void init()
    {
        setLayout(new BorderLayout());
        setBackground(Color.white);
        panel = new GraphPanel(this);
        add("Center", panel);
        Panel panel1 = new Panel();
        panel1.setBackground(new Color(255, 255, 255));
        panel.setBackground(Color.white);
        Checkbox checkbox = new Checkbox("Stress");
        Checkbox checkbox1 = new Checkbox("Random");
        checkbox.setFont(new Font("SansSerif", 0, 12));
        checkbox1.setFont(new Font("SansSerif", 0, 12));
        add("South", panel1);
        panel1.add(checkbox);
        panel1.add(checkbox1);
        String s = getParameter("edges");
        String s1 = getParameter("first");
        for(StringTokenizer stringtokenizer = new StringTokenizer(s, ","); stringtokenizer.hasMoreTokens();)
        {
            String s4 = stringtokenizer.nextToken();
            int i = s4.indexOf(45);
            if(i > 0)
            {
                int j = 50;
                int k = s4.indexOf(47);
                if(k > 0)
                {
                    j = Integer.valueOf(s4.substring(k + 1)).intValue();
                    s4 = s4.substring(0, k);
                }
                String s2 = s4.substring(0, i);
                String s3 = s4.substring(i + 1);
                if(s1.compareTo(s2) == 0 || s1.compareTo(s3) == 0)
                    panel.addEdge(s2, getParameter(s2), s3, getParameter(s3), j, true);
                else
                    panel.addEdge(s2, getParameter(s2), s3, getParameter(s3), j, false);
            }
        }

        Dimension dimension = size();
        String s5 = getParameter("center");
        if(s5 != null)
        {
            Node node = panel.nodes[panel.findNode(s5, getParameter(s5), true)];
            node.x = dimension.width / 2;
            node.y = dimension.height / 2;
            node.fixed = true;
        }
    }

    public void start()
    {
        panel.start();
    }

    public void stop()
    {
        panel.stop();
    }

    GraphPanel panel;
}
