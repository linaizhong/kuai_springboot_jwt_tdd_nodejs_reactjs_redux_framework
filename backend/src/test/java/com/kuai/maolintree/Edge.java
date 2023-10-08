// Decompiled by Jad v1.5.7. Copyright 1997-99 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/SiliconValley/Bridge/8617/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   Graph.java


class Edge
{

    Edge()
    {
        evisible = false;
    }

    int from;
    int to;
    String fromAddress;
    String toAddress;
    double len;
    boolean evisible;
}
