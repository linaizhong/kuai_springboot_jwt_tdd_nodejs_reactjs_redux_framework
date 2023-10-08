// Decompiled by Jad v1.5.7. Copyright 1997-99 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/SiliconValley/Bridge/8617/jad.html
// Decompiler options: packimports(3)
// Source File Name:   HGraph_Panel.java

import java.applet.Applet;
import java.applet.AppletContext;
import java.awt.*;
import java.io.PrintStream;

public class HGraph_Panel extends Panel
{

    public HGraph_Panel(HGraph hgraph, Dimension dimension, String s)
    {
        hptree = null;
        limit_disp = 0.69999999999999996D;
        edgeColor = Color.gray;
        nodeColor = Color.yellow;
        isNodeOutline = true;
        increment_scale = 40;
        labelColor = Color.black;
        outline_nodeColor = Color.black;
        picked_nodeColor = Color.green;
        stressColor = Color.gray;
        edge_length = 0.17999999999999999D;
        isLongText = false;
        pickedNode = null;
        gr = hgraph;
        parsingInfo(s);
        ptransform = new Complex_Number(0.0D, 0.0D);
        thetatransform = new Complex_Number(1.0D, 0.0D);
        offscreensize = dimension;
        startPointX = dimension.width / 2;
        startPointY = dimension.height / 2;
        prePointX = startPointX;
        prePointY = startPointY;
        curPointX = prePointX;
        curPointY = prePointY;
    }

    public Complex_Number addComplex(Complex_Number complex_number, Complex_Number complex_number1)
    {
        Complex_Number complex_number2 = new Complex_Number();
        complex_number2.real = complex_number.real + complex_number1.real;
        complex_number2.im = complex_number.im + complex_number1.im;
        return complex_number2;
    }

    private double argtanh(double d)
    {
        return Math.log(Math.abs((1.0D + d) / (1.0D - d))) / 2D;
    }

    public void changeFirstMapping(double d, double d1)
    {
        double d2;
        if(offscreensize.width < offscreensize.height)
            d2 = offscreensize.width / 2 - 1;
        else
            d2 = offscreensize.height / 2 - 1;
        double d3 = offscreensize.width / 2;
        double d4 = offscreensize.height / 2;
        double d5 = Math.sqrt((d3 - d) * (d3 - d) + (d4 - d1) * (d4 - d1));
        if(d5 > d2)
        {
            d = d3 + (d2 / d5) * (d - d3);
            d1 = d4 + (d2 / d5) * (d1 - d4);
        }
        startPointX = d;
        startPointY = d1;
    }

    public void changePreMapping()
    {
        prePointX = curPointX;
        prePointY = curPointY;
    }

    private TransformPair compositionTransformation(Complex_Number complex_number, Complex_Number complex_number1, Complex_Number complex_number2, Complex_Number complex_number3)
    {
        TransformPair transformpair = new TransformPair();
        transformpair.p = transform(complex_number, complex_number3, complex_number2);
        Complex_Number complex_number4 = new Complex_Number();
        double d = complex_number.real * complex_number2.real + complex_number.im * complex_number2.im;
        double d1 = complex_number.real * complex_number2.im - complex_number.im * complex_number2.real;
        complex_number4.real = ((complex_number1.real * complex_number3.real - complex_number1.im * complex_number3.im) + complex_number1.real * d) - complex_number1.im * d1;
        complex_number4.im = complex_number1.real * complex_number3.im + complex_number1.im * complex_number3.real + complex_number1.im * d + complex_number1.real * d1;
        Complex_Number complex_number5 = new Complex_Number();
        complex_number5.real = 1.0D + complex_number3.real * d + complex_number3.im * d1;
        complex_number5.im = complex_number3.im * d - complex_number3.real * d1;
        double d2 = complex_number5.real * complex_number5.real + complex_number5.im * complex_number5.im;
        transformpair.theta.real = (complex_number4.real * complex_number5.real + complex_number4.im * complex_number5.im) / d2;
        transformpair.theta.im = (complex_number4.im * complex_number5.real - complex_number4.real * complex_number5.im) / d2;
        double d3 = Math.sqrt(transformpair.theta.real * transformpair.theta.real + transformpair.theta.im * transformpair.theta.im);
        transformpair.theta.real = transformpair.theta.real / d3;
        transformpair.theta.im = transformpair.theta.im / d3;
        return transformpair;
    }

    private void display_whendrag(Node node, Graphics g, FontMetrics fontmetrics)
    {
        Complex_Number complex_number = transform(node.cpoint, thetatransform, ptransform);
        RealPoint realpoint = scaletoRealCoord(complex_number);
        int i = node.numChildren;
        for(int j = 0; j < i; j++)
        {
            Node node1 = node.children[j];
            Complex_Number complex_number1 = transform(node1.cpoint, thetatransform, ptransform);
            RealPoint realpoint1 = scaletoRealCoord(complex_number1);
            drawLine(realpoint, realpoint1, g);
            display_whendrag(node.children[j], g, fontmetrics);
        }

        drawNode(node, g, fontmetrics);
    }

    public void display_whendrag(Graphics g, FontMetrics fontmetrics)
    {
        pickedNode = null;
        if(hptree.root != null)
            display_whendrag(hptree.root, g, fontmetrics);
        if(pickedNode != null)
            drawPickedNode(pickedNode, g, fontmetrics);
    }

    private void drawArc(RealPoint realpoint, RealPoint realpoint1, RealPoint realpoint2, Graphics g)
    {
        double d = Math.sqrt((realpoint.x - realpoint1.x) * (realpoint.x - realpoint1.x) + (realpoint.y - realpoint1.y) * (realpoint.y - realpoint1.y));
        double d1 = offscreensize.width;
        if(d1 > (double)offscreensize.height)
            d1 = offscreensize.height;
        if(d > 2.3999999999999999D * d1)
        {
            drawLine(realpoint1, realpoint2, g);
        }
        else
        {
            int i = (int)(realpoint.x - d);
            int j = (int)(realpoint.y - d);
            double d2;
            if(realpoint1.x >= realpoint.x && realpoint1.y < realpoint.y)
            {
                d2 = Math.atan((realpoint.y - realpoint1.y) / (realpoint1.x - realpoint.x));
                d2 = (d2 * 180D) / 3.1415926535897931D;
            }
            else
            if(realpoint1.x < realpoint.x && realpoint1.y < realpoint.y)
            {
                d2 = Math.atan((realpoint.y - realpoint1.y) / (realpoint.x - realpoint1.x));
                d2 = 180D - (d2 * 180D) / 3.1415926535897931D;
            }
            else
            if(realpoint1.x < realpoint.x && realpoint1.y >= realpoint.y)
            {
                d2 = Math.atan((realpoint1.y - realpoint.y) / (realpoint.x - realpoint1.x));
                d2 = 180D + (d2 * 180D) / 3.1415926535897931D;
            }
            else
            {
                d2 = Math.atan((realpoint1.y - realpoint.y) / (realpoint1.x - realpoint.x));
                d2 = 360D - (d2 * 180D) / 3.1415926535897931D;
            }
            double d3;
            if(realpoint2.x >= realpoint.x && realpoint2.y < realpoint.y)
            {
                d3 = Math.atan((realpoint.y - realpoint2.y) / (realpoint2.x - realpoint.x));
                d3 = (d3 * 180D) / 3.1415926535897931D;
            }
            else
            if(realpoint2.x < realpoint.x && realpoint2.y < realpoint.y)
            {
                d3 = Math.atan((realpoint.y - realpoint2.y) / (realpoint.x - realpoint2.x));
                d3 = 180D - (d3 * 180D) / 3.1415926535897931D;
            }
            else
            if(realpoint2.x < realpoint.x && realpoint2.y >= realpoint.y)
            {
                d3 = Math.atan((realpoint2.y - realpoint.y) / (realpoint.x - realpoint2.x));
                d3 = 180D + (d3 * 180D) / 3.1415926535897931D;
            }
            else
            {
                d3 = Math.atan((realpoint2.y - realpoint.y) / (realpoint2.x - realpoint.x));
                d3 = 360D - (d3 * 180D) / 3.1415926535897931D;
            }
            int l = (int)(d3 - d2);
            if(l > 180)
                l -= 360;
            else
            if(l < -180)
                l = 360 + l;
            int k;
            if(l >= 0)
            {
                k = (int)d2 + 1;
                l--;
            }
            else
            {
                k = (int)d2;
                l++;
            }
            g.setColor(edgeColor);
            if(l != 0)
                g.drawArc(i, j, (int)(2D * d), (int)(2D * d), k, l);
            double d4 = realpoint.x + d * Math.cos((3.1415926535897931D * (double)k) / 180D);
            double d5 = realpoint.y - d * Math.sin((3.1415926535897931D * (double)k) / 180D);
            g.drawLine((int)realpoint1.x, (int)realpoint1.y, (int)d4, (int)d5);
            d4 = realpoint.x + d * Math.cos((3.1415926535897931D * (double)(k + l)) / 180D);
            d5 = realpoint.y - d * Math.sin((3.1415926535897931D * (double)(k + l)) / 180D);
            g.drawLine((int)realpoint2.x, (int)realpoint2.y, (int)d4, (int)d5);
        }
    }

    private void drawEdge(Graphics g, Node node, Node node1)
    {
        double d = 0.01D;
        Complex_Number complex_number = transform(node.cpoint, thetatransform, ptransform);
        Complex_Number complex_number1 = transform(node1.cpoint, thetatransform, ptransform);
        double d1 = complex_number.real * complex_number1.im - complex_number1.real * complex_number.im;
        double d2 = complex_number.real * complex_number.real + complex_number.im * complex_number.im;
        double d3 = complex_number1.real * complex_number1.real + complex_number1.im * complex_number1.im;
        Complex_Number complex_number2 = mult_point(complex_number, 1.0D + d3);
        Complex_Number complex_number3 = mult_point(complex_number1, 1.0D + d2);
        Complex_Number complex_number4 = new Complex_Number();
        complex_number4.real = complex_number2.real - complex_number3.real;
        complex_number4.im = complex_number2.im - complex_number3.im;
        if(d1 != 0.0D)
        {
            Complex_Number complex_number5 = new Complex_Number();
            complex_number5.real = -complex_number4.im / (2D * d1);
            complex_number5.im = complex_number4.real / (2D * d1);
            drawArc(scaletoRealCoord(complex_number5), scaletoRealCoord(complex_number), scaletoRealCoord(complex_number1), g);
        }
        else
        {
            drawLine(scaletoRealCoord(complex_number), scaletoRealCoord(complex_number1), g);
        }
    }

    private void drawLine(RealPoint realpoint, RealPoint realpoint1, Graphics g)
    {
        g.setColor(edgeColor);
        g.drawLine((int)realpoint.x, (int)realpoint.y, (int)realpoint1.x, (int)realpoint1.y);
    }

    private void drawNode(Node node, Graphics g, FontMetrics fontmetrics)
    {
        Complex_Number complex_number = transform(node.cpoint, thetatransform, ptransform);
        RealPoint realpoint = toRealCoord(complex_number);
        if(node.level == 0)
        {
            Font font = fontmetrics.getFont();
            Font font1 = new Font(font.getName(), 1, font.getSize());
            g.setFont(font1);
            FontMetrics fontmetrics1 = g.getFontMetrics();
            int l = (int)realpoint.x;
            int j1 = (int)realpoint.y;
            int l1 = fontmetrics1.stringWidth(node.label) + 16;
            int j2 = fontmetrics1.getHeight() + 16;
            int l2 = l - l1 / 2;
            int j3 = j1 - j2 / 2;
            if(gr.currentX >= l2 && gr.currentX <= l2 + l1 && gr.currentY >= j3 && gr.currentY <= j3 + j2)
                pickedNode = node;
            g.setColor(nodeColor);
            g.fillOval(l2, j3, l1, j2);
            if(isNodeOutline)
            {
                g.setColor(outline_nodeColor);
                g.drawOval(l2, j3, l1 - 1, j2 - 1);
            }
            g.setColor(labelColor);
            g.drawString(node.label, l - (l1 - 16) / 2, (j1 - (j2 - 16) / 2) + fontmetrics1.getAscent());
            g.setFont(fontmetrics.getFont());
        }
        else
        {
            double d = complex_number.real * complex_number.real + complex_number.im * complex_number.im;
            if(d < limit_disp)
            {
                int i = (int)realpoint.x;
                int j = (int)realpoint.y;
                int k = fontmetrics.stringWidth(node.label) + 10;
                int i1 = fontmetrics.getHeight() + 4;
                int k1 = i - k / 2;
                int i2 = j - i1 / 2;
                if(gr.currentX >= k1 && gr.currentX <= k1 + k && gr.currentY >= i2 && gr.currentY <= i2 + i1)
                    pickedNode = node;
                int k2 = nodeColor.getRed() + node.level * increment_scale;
                if(k2 > 255)
                    k2 = 255;
                int i3 = nodeColor.getGreen() + node.level * increment_scale;
                if(i3 > 255)
                    i3 = 255;
                int k3 = nodeColor.getBlue() + node.level * increment_scale;
                if(k3 > 255)
                    k3 = 255;
                g.setColor(new Color(k2, i3, k3));
                g.fillRect(k1, i2, k, i1);
                if(isNodeOutline)
                {
                    g.setColor(outline_nodeColor);
                    g.drawRect(k1 - 1, i2 - 1, k + 1, i1 + 1);
                }
                g.setColor(labelColor);
                g.drawString(node.label, i - (k - 10) / 2, (j - (i1 - 4) / 2) + fontmetrics.getAscent());
            }
        }
    }

    private void drawPickedNode(Node node, Graphics g, FontMetrics fontmetrics)
    {
        Complex_Number complex_number = transform(node.cpoint, thetatransform, ptransform);
        RealPoint realpoint = toRealCoord(complex_number);
        if(node.level == 0)
        {
            Font font = fontmetrics.getFont();
            Font font1 = new Font(font.getName(), 1, font.getSize());
            g.setFont(font1);
            FontMetrics fontmetrics1 = g.getFontMetrics();
            int l = (int)realpoint.x;
            int j1 = (int)realpoint.y;
            int l1 = fontmetrics1.stringWidth(node.label) + 16;
            int j2 = fontmetrics1.getHeight() + 16;
            int k2 = l - l1 / 2;
            int l2 = j1 - j2 / 2;
            if(gr.currentX >= k2 && gr.currentX <= k2 + l1 && gr.currentY >= l2 && gr.currentY <= l2 + j2)
                pickedNode = node;
            g.setColor(picked_nodeColor);
            g.fillOval(k2, l2, l1, j2);
            if(isNodeOutline)
            {
                g.setColor(outline_nodeColor);
                g.drawOval(k2, l2, l1 - 1, j2 - 1);
            }
            g.setColor(labelColor);
            g.drawString(node.label, l - (l1 - 16) / 2, (j1 - (j2 - 16) / 2) + fontmetrics1.getAscent());
            g.setFont(fontmetrics.getFont());
        }
        else
        {
            int i = (int)realpoint.x;
            int j = (int)realpoint.y;
            int k = fontmetrics.stringWidth(node.label) + 10;
            int i1 = fontmetrics.getHeight() + 4;
            int k1 = i - k / 2;
            int i2 = j - i1 / 2;
            g.setColor(picked_nodeColor);
            g.fillRect(k1, i2, k, i1);
            g.setColor(outline_nodeColor);
            g.drawRect(k1 - 1, i2 - 1, k + 1, i1 + 1);
            g.setColor(labelColor);
            g.drawString(node.label, i - (k - 10) / 2, (j - (i1 - 4) / 2) + fontmetrics.getAscent());
        }
    }

    private TransformPair final_interaction(Complex_Number complex_number, Complex_Number complex_number1, Complex_Number complex_number2)
    {
        Complex_Number complex_number3 = new Complex_Number(1.0D, 0.0D);
        Complex_Number complex_number4 = mult_point(complex_number2, -1D);
        Complex_Number complex_number5 = transform(complex_number, complex_number3, complex_number4);
        Complex_Number complex_number6 = new Complex_Number(complex_number5.real * complex_number1.real - complex_number5.im * complex_number1.im, complex_number5.real * complex_number1.im + complex_number5.im * complex_number1.real);
        double d = 1.0D - (complex_number6.real * complex_number6.real + complex_number6.im * complex_number6.im);
        Complex_Number complex_number7 = new Complex_Number();
        complex_number7.real = ((complex_number1.real - complex_number5.real) * (1.0D + complex_number6.real) + (complex_number1.im - complex_number5.im) * complex_number6.im) / d;
        complex_number7.im = ((complex_number1.real - complex_number5.real) * complex_number6.im + (complex_number1.im - complex_number5.im) * (1.0D - complex_number6.real)) / d;
        return compositionTransformation(complex_number4, complex_number3, complex_number7, complex_number3);
    }

    private TransformPair interaction_animate(Complex_Number complex_number, Complex_Number complex_number1, int i)
    {
        TransformPair transformpair = new TransformPair();
        double d = complex_number.real * complex_number.real + complex_number.im * complex_number.im;
        double d1 = (complex_number1.real - 1.0D) * (complex_number1.real - 1.0D) + complex_number1.im * complex_number1.im;
        double d2 = (complex_number1.real + 1.0D) * (complex_number1.real + 1.0D) + complex_number1.im * complex_number1.im;
        double d3 = 4D * d - d1;
        double d6;
        double d7;
        if(d3 > 0.0D)
        {
            double d4 = Math.sqrt(d3) / Math.sqrt(d2);
            double d8 = argtanh(d4) / (double)i;
            double d11 = tanh(d8) / d4;
            d6 = (d11 * d11 * d1) / d2;
            d7 = d11 * Math.sqrt((1.0D + d1 / d2) / (1.0D + d6));
        }
        else
        if(d3 == 0.0D)
        {
            d6 = d1 / ((double)(i * i) * d2);
            d7 = Math.sqrt((1.0D + d1 / d2) / (1.0D + d6)) / (double)i;
        }
        else
        {
            double d5 = Math.sqrt(-d3) / Math.sqrt(d2);
            double d9 = Math.atan(d5) / (double)i;
            d9 = Math.tan(d9);
            d6 = (d9 * d9 * d1) / -d3;
            d7 = Math.sqrt((4D * d6) / ((1.0D + d6) * d1));
        }
        if(complex_number1.im > 0.0D)
        {
            transformpair.theta.real = (1.0D - d6) / (1.0D + d6);
            transformpair.theta.im = (2D * Math.sqrt(d6)) / (1.0D + d6);
        }
        else
        {
            transformpair.theta.real = (1.0D - d6) / (1.0D + d6);
            transformpair.theta.im = (-2D * Math.sqrt(d6)) / (1.0D + d6);
        }
        double d10 = (transformpair.theta.real * complex_number1.real + transformpair.theta.im * complex_number1.im) / (complex_number1.real * complex_number1.real + complex_number1.im * complex_number1.im);
        double d12 = (transformpair.theta.im * complex_number1.real - transformpair.theta.real * complex_number1.im) / (complex_number1.real * complex_number1.real + complex_number1.im * complex_number1.im);
        Complex_Number complex_number2 = new Complex_Number();
        double d13 = Math.sqrt((d10 + Math.sqrt(d10 * d10 + d12 * d12)) / 2D);
        double d14 = d12 / (2D * d13);
        transformpair.p.real = d7 * (complex_number.real * d13 - complex_number.im * d14);
        transformpair.p.im = d7 * (complex_number.real * d14 + complex_number.im * d13);
        return transformpair;
    }

    private Complex_Number invertTransform(Complex_Number complex_number, Complex_Number complex_number1, Complex_Number complex_number2)
    {
        Complex_Number complex_number3 = new Complex_Number(complex_number1.real, -complex_number1.im);
        Complex_Number complex_number4 = new Complex_Number();
        complex_number4.real = -(complex_number1.real * complex_number2.real + complex_number1.im * complex_number2.im);
        complex_number4.im = complex_number2.real * complex_number1.im - complex_number2.im * complex_number1.real;
        return transform(complex_number, complex_number3, complex_number4);
    }

    public void layout()
    {
        if(hptree != null && hptree.root != null && hptree.root.numChildren != 0)
        {
            Wedge wedge = new Wedge();
            wedge.vertexPoint = hptree.root.cpoint;
            wedge.mendPoint = invertTransform(new Complex_Number(1.0D, 0.0D), thetatransform, ptransform);
            wedge.angle = 3.1415926535897931D;
            layout(hptree.root, wedge);
        }
    }

    private void layout(Node node, Wedge wedge)
    {
        node.cpoint = wedge.vertexPoint;
        int i = node.numChildren;
        double ad[] = new double[i];
        if(i > 0)
        {
            Complex_Number complex_number = new Complex_Number(1.0D, 0.0D);
            double d = 0.84999999999999998D;
            double d1 = 1.0D - d;
            double d2 = 1.0D;
            for(int j = 0; j < i; j++)
            {
                Node node1 = node.children[j];
                int k = node1.numChildren;
                int l = 0;
                for(int j1 = 0; j1 < k; j1++)
                {
                    Node node3 = node1.children[j1];
                    l += node3.numChildren;
                }

                ad[j] = d * (double)k + d1 * (double)l + 2D;
                d2 *= ad[j];
            }

            double d3 = wedge.angle;
            for(int i1 = 0; i1 < i; i1++)
            {
                Node node2 = node.children[i1];
                double d4 = wedge.angle * (Math.log(ad[i1]) / Math.log(d2));
                double d5 = Math.abs(((1.0D - edge_length * edge_length) * Math.sin(d4)) / (2D * edge_length));
                double d6 = Math.sqrt(d5 * d5 + 1.0D) - d5;
                if(d6 < edge_length)
                    d6 = edge_length;
                Complex_Number complex_number1 = transform(node.cpoint, thetatransform, ptransform);
                Complex_Number complex_number2 = transform(wedge.mendPoint, thetatransform, ptransform);
                d3 -= d4;
                Complex_Number complex_number3 = new Complex_Number();
                if(complex_number2.real != 0.0D)
                {
                    complex_number3.real = complex_number2.real * Math.cos(d3) + complex_number2.im * Math.sin(d3);
                    complex_number3.im = complex_number2.im * Math.cos(d3) - complex_number2.real * Math.sin(d3);
                }
                else
                if(complex_number2.im > 0.0D)
                {
                    if(d3 > 0.0D)
                    {
                        complex_number3.im = Math.cos(d3);
                        complex_number3.real = Math.sin(d3);
                    }
                    else
                    {
                        complex_number3.im = Math.cos(d3);
                        complex_number3.real = -Math.sin(d3);
                    }
                }
                else
                if(d3 > 0.0D)
                {
                    complex_number3.im = -Math.cos(d3);
                    complex_number3.real = Math.sin(d3);
                }
                else
                {
                    complex_number3.im = -Math.cos(d3);
                    complex_number3.real = -Math.sin(d3);
                }
                d3 -= d4;
                complex_number3 = invertTransform(complex_number3, thetatransform, ptransform);
                Wedge wedge1 = new Wedge();
                Complex_Number complex_number4 = mult_point(complex_number3, d6);
                wedge1.vertexPoint = transform(complex_number4, complex_number, node.cpoint);
                Complex_Number complex_number5 = transform(complex_number3, complex_number, wedge.vertexPoint);
                wedge1.mendPoint = transform(complex_number5, complex_number, mult_point(wedge1.vertexPoint, -1D));
                Complex_Number complex_number6 = new Complex_Number(Math.cos(d4), Math.sin(d4));
                Complex_Number complex_number7 = new Complex_Number(-d6, 0.0D);
                Complex_Number complex_number8 = transform(complex_number6, complex_number, complex_number7);
                if(complex_number8.real == 0.0D)
                    wedge1.angle = 1.5707963267948966D;
                else
                if(complex_number8.im >= 0.0D && complex_number8.real > 0.0D)
                    wedge1.angle = Math.atan(complex_number8.im / complex_number8.real);
                else
                if(complex_number8.im >= 0.0D && complex_number8.real < 0.0D)
                    wedge1.angle = 3.1415926535897931D - Math.atan(complex_number8.im / -complex_number8.real);
                else
                if(complex_number8.im < 0.0D && complex_number8.real > 0.0D)
                    wedge1.angle = 3.1415926535897931D + Math.atan(-complex_number8.im / complex_number8.real);
                else
                    wedge1.angle = 6.2831853071795862D - Math.atan(complex_number8.im / complex_number8.real);
                layout(node2, wedge1);
            }

        }
    }

    public void mouseClickedProcess(double d, double d1)
    {
        if(pickedNode == null)
        {
            startPointX = offscreensize.width / 2;
            startPointY = offscreensize.height / 2;
            prePointX = startPointX;
            prePointY = startPointY;
            curPointX = prePointX;
            curPointY = prePointY;
            ptransform = new Complex_Number(0.0D, 0.0D);
            thetatransform = new Complex_Number(1.0D, 0.0D);
        }
    }

    public void mouseDraggedProcess(double d, double d1, double d2, double d3)
    {
        double d4;
        if(offscreensize.width < offscreensize.height)
            d4 = offscreensize.width / 2 - 1;
        else
            d4 = offscreensize.height / 2 - 1;
        double d5 = offscreensize.width / 2;
        double d6 = offscreensize.height / 2;
        double d7 = (d2 + prePointX) - d;
        double d8 = (d3 + prePointY) - d1;
        double d9 = Math.sqrt((d5 - d7) * (d5 - d7) + (d6 - d8) * (d6 - d8));
        if(d9 > d4)
        {
            d7 = d5 + (d4 / d9) * (d7 - d5);
            d8 = d6 + (d4 / d9) * (d8 - d6);
        }
        Complex_Number complex_number = realCoordToEuclideanCoord(startPointX, startPointY);
        Complex_Number complex_number1 = realCoordToEuclideanCoord(d7, d8);
        TransformPair transformpair = final_interaction(complex_number, complex_number1, hptree.root.cpoint);
        ptransform = transformpair.p;
        thetatransform = transformpair.theta;
        curPointX = d7;
        curPointY = d8;
    }

    private Complex_Number mult_point(Complex_Number complex_number, double d)
    {
        Complex_Number complex_number1 = new Complex_Number();
        complex_number1.real = d * complex_number.real;
        complex_number1.im = d * complex_number.im;
        return complex_number1;
    }

    private int nextToken(String s, char c, int i)
    {
        int j;
        if(i < 0)
        {
            j = i;
        }
        else
        {
            int k = s.length();
            for(j = i; j < k && s.charAt(j) != c; j++);
            if(j == k)
                j = -1;
        }
        return j;
    }

    public void nodeClickedProcess()
    {
        if(pickedNode != null && pickedNode.url != null)
        {
            //AppletContext appletcontext = gr.getAppletContext();
            //appletcontext.showDocument(pickedNode.url, gr.thetarget);
        }
    }

    private void parsingInfo(String s)
    {
        byte byte0 = 96;
        char c = '/';
        int i = 0;
        boolean flag = false;
        try
        {
            int k = s.indexOf(byte0, i);
            if(k > 0)
            {
                String s1 = s.substring(i, k);
                s1 = s1.trim();
                if(!s1.equals(""))
                {
                    int l = nextToken(s1, c, 0);
                    int j1 = nextToken(s1, c, l + 1);
                    String s3 = s1.substring(0, l);
                    String s5 = s1.substring(l + 1, j1);
                    String s7 = s1.substring(j1 + 1);
                    Node node = new Node(s3, "", 0);
                    hptree = new Hyperbolic_Tree(node);
                    hptree.addNode(s3, s5, s7);
                }
                i = k + 1;
                k = s.indexOf(byte0, i);
                if(k >= 0)
                {
                    String s2 = s.substring(i, k);
                    s2.trim();
                    while(k >= 0)
                    {
                        if(!s2.equals(""))
                        {
                            int i1 = nextToken(s2, c, 0);
                            int k1 = nextToken(s2, c, i1 + 1);
                            String s4 = s2.substring(0, i1);
                            String s6 = s2.substring(i1 + 1, k1);
                            String s8 = s2.substring(k1 + 1);
                            hptree.addNode(s4, s6, s8);
                        }
                        int j = k + 1;
                        k = s.indexOf(byte0, j);
                        if(k >= 0)
                        {
                            s2 = s.substring(j, k);
                            s2.trim();
                        }
                    }

                }
            }
        }
        catch(Exception exception)
        {
            System.err.println("Graph_Panel.parsingInfo: " + exception);
        }
    }

    private void printNode(Node node)
    {
        System.out.println(node.label + ": Position: " + node.cpoint.real + ", " + node.cpoint.im);
    }

    private Complex_Number realCoordToEuclideanCoord(double d, double d1)
    {
        Complex_Number complex_number = new Complex_Number();
        double d2;
        if(offscreensize.width < offscreensize.height)
            d2 = offscreensize.width / 2;
        else
            d2 = offscreensize.height / 2;
        complex_number.real = d / d2 - 1.0D;
        complex_number.im = 1.0D - d1 / d2;
        return complex_number;
    }

    private RealPoint scaletoRealCoord(Complex_Number complex_number)
    {
        double d2;
        if(offscreensize.width < offscreensize.height)
            d2 = offscreensize.width / 2;
        else
            d2 = offscreensize.height / 2;
        double d = d2 + complex_number.real * d2;
        double d1 = d2 - complex_number.im * d2;
        return new RealPoint(d, d1);
    }

    private double tanh(double d)
    {
        return (Math.exp(d) - Math.exp(d)) / (Math.exp(d) + Math.exp(d));
    }

    private RealPoint toRealCoord(Complex_Number complex_number)
    {
        double d2;
        if(offscreensize.width < offscreensize.height)
            d2 = offscreensize.width / 2;
        else
            d2 = offscreensize.height / 2;
        double d = d2 + complex_number.real * d2;
        double d1 = d2 - complex_number.im * d2;
        return new RealPoint(d, d1);
    }

    private Complex_Number transform(Complex_Number complex_number, Complex_Number complex_number1, Complex_Number complex_number2)
    {
        double d = Math.sqrt(complex_number1.real * complex_number1.real + complex_number1.im * complex_number1.im);
        complex_number1.real = complex_number1.real / d;
        complex_number1.im = complex_number1.im / d;
        Complex_Number complex_number3 = new Complex_Number();
        Complex_Number complex_number4 = new Complex_Number();
        complex_number4.real = (complex_number1.real * complex_number.real - complex_number1.im * complex_number.im) + complex_number2.real;
        complex_number4.im = complex_number1.real * complex_number.im + complex_number1.im * complex_number.real + complex_number2.im;
        Complex_Number complex_number5 = new Complex_Number();
        complex_number5.real = 1.0D + (complex_number.real * (complex_number2.real * complex_number1.real + complex_number2.im * complex_number1.im) - complex_number.im * (complex_number2.real * complex_number1.im - complex_number2.im * complex_number1.real));
        complex_number5.im = complex_number.real * (complex_number2.real * complex_number1.im - complex_number2.im * complex_number1.real) + complex_number.im * (complex_number2.real * complex_number1.real + complex_number2.im * complex_number1.im);
        double d1 = complex_number5.real * complex_number5.real + complex_number5.im * complex_number5.im;
        complex_number3.real = (complex_number4.real * complex_number5.real + complex_number4.im * complex_number5.im) / d1;
        complex_number3.im = (complex_number4.im * complex_number5.real - complex_number4.real * complex_number5.im) / d1;
        if(complex_number3.real < -1D)
            complex_number3.real = -1D;
        else
        if(complex_number3.real > 1.0D)
            complex_number3.real = 1.0D;
        if(complex_number3.im < -1D)
            complex_number3.im = -1D;
        else
        if(complex_number3.im > 1.0D)
            complex_number3.im = 1.0D;
        return complex_number3;
    }

    private void treedisplay(Node node, Graphics g, FontMetrics fontmetrics)
    {
        int i = node.numChildren;
        for(int j = 0; j < i; j++)
        {
            drawEdge(g, node, node.children[j]);
            treedisplay(node.children[j], g, fontmetrics);
        }

        drawNode(node, g, fontmetrics);
    }

    public void treedisplay(Graphics g, FontMetrics fontmetrics)
    {
        pickedNode = null;
        if(hptree != null && hptree.root != null)
            treedisplay(hptree.root, g, fontmetrics);
        if(pickedNode != null)
            drawPickedNode(pickedNode, g, fontmetrics);
    }

    private HGraph gr;
    private Hyperbolic_Tree hptree;
    double limit_disp;
    private Color edgeColor;
    Color nodeColor;
    boolean isNodeOutline;
    private int increment_scale;
    private Color labelColor;
    private Color outline_nodeColor;
    private Color picked_nodeColor;
    private Color stressColor;
    double edge_length;
    private Dimension offscreensize;
    private boolean isLongText;
    private Complex_Number ptransform;
    private Complex_Number thetatransform;
    private double startPointX;
    private double startPointY;
    private double prePointX;
    private double prePointY;
    private double curPointX;
    private double curPointY;
    private Node pickedNode;
}
