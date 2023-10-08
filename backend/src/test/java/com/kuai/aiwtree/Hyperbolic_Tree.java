// Decompiled by Jad v1.5.7. Copyright 1997-99 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/SiliconValley/Bridge/8617/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   Hyperbolic_Tree.java


public class Hyperbolic_Tree
{

    public Hyperbolic_Tree()
    {
        root = null;
    }

    public Hyperbolic_Tree(Node node)
    {
        root = node;
    }

    public void addNode(String s, String s1, String s2)
    {
        Node node1 = findNode(s);
        if(node1 != null)
        {
            Node node = new Node(s1, s2, node1.level + 1, node1);
            node1.children[node1.numChildren] = node;
            node1.numChildren++;
        }
    }

    public void addRoot(Node node)
    {
        root = node;
    }

    public Node findNode(String s)
    {
        return findNode(s, root);
    }

    private Node findNode(String s, Node node)
    {
        Node node1 = null;
        if(node != null)
            if(s.equals(node.label))
            {
                node1 = node;
            }
            else
            {
                int i = node.numChildren;
                for(int j = 0; j < i && node1 == null; j++)
                    node1 = findNode(s, node.children[j]);

            }
        return node1;
    }

    public Node root;
}
