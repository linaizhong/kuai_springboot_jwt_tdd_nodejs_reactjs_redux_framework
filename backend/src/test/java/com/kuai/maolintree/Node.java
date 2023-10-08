// Decompiled by Jad v1.5.7. Copyright 1997-99 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/SiliconValley/Bridge/8617/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   Graph.java


class Node
{

    Node()
    {
        growth_dir = false;
        growth_coeff = 0;
    }

    double x;
    double y;
    double dx;
    double dy;
    boolean fixed;
    boolean growth_dir;
    int growth_coeff;
    String lbl;
    String address;
}
