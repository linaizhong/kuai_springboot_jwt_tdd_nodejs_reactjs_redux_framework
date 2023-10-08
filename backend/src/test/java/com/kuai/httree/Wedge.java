// Decompiled by Jad v1.5.7. Copyright 1997-99 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/SiliconValley/Bridge/8617/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   Wedge.java


public class Wedge
{

    public Wedge()
    {
        vertexPoint = new Complex_Number();
        mendPoint = new Complex_Number();
        angle = 0.0D;
    }

    public Wedge(Complex_Number complex_number, Complex_Number complex_number1, double d)
    {
        vertexPoint = complex_number;
        mendPoint = complex_number1;
        angle = d;
    }

    Complex_Number vertexPoint;
    Complex_Number mendPoint;
    double angle;
}
