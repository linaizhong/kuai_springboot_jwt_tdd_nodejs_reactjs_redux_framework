public class InfoObject
{

    public InfoObject(String s, String s1, String s2, String s3, String s4, char c, String s5, 
            char c1, String s6, char c2)
    {
        from_node_id = null;
        from_node_lbl = null;
        to_node_id = null;
        to_node_lbl = null;
        theURL = null;
        isHierarchical = '0';
        menuStr = null;
        isFinalItem = '0';
        infoStr = null;
        dispStyle = '0';
        from_node_id = s;
        from_node_lbl = s1;
        to_node_id = s2;
        to_node_lbl = s3;
        theURL = s4;
        isHierarchical = c;
        menuStr = s5;
        isFinalItem = c1;
        infoStr = s6;
        dispStyle = c2;
    }

    String from_node_id;
    String from_node_lbl;
    String to_node_id;
    String to_node_lbl;
    String theURL;
    char isHierarchical;
    String menuStr;
    char isFinalItem;
    String infoStr;
    char dispStyle;
}
