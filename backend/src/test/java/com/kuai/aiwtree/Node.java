
import java.net.MalformedURLException;
import java.net.URL;

public class Node
{
    public Node(String s, String s1, int i)
    {
        numChildren = 0;
        children = new Node[50];
        label = s;
        try
        {
            url = new URL(s1);
        }
        catch(MalformedURLException _ex) { }
        level = i;
        parent = null;
        cpoint = new Complex_Number();
    }

    public Node(String s, String s1, int i, Node node)
    {
        numChildren = 0;
        children = new Node[50];
        label = s;
        try
        {
            url = new URL(s1);
        }
        catch(MalformedURLException _ex) { }
        level = i;
        parent = node;
        cpoint = new Complex_Number();
    }

    Complex_Number cpoint;
    String label;
    URL url;
    int level;
    Node parent;
    int numChildren;
    Node children[];
}
