public class Node
    implements Comparable
{

    public Node(String s, String s1, String s2, int i, int j, int k, String s3, 
            char c, String s4, char c1)
    {
        weight = 1.0D;
        numChildren = 0;
        MAXSIZE = 20;
        children = new int[MAXSIZE];
        numLinks = 0;
        LMAXSIZE = 5;
        linkNodes = new int[LMAXSIZE];
        bWidth = 0.0D;
        bHeight = 0.0D;
        bHistWidth = 0.0D;
        bHistHeight = 0.0D;
        histSide = 2;
        status = 0;
        fontSize = 0;
        whichBranch = 0;
        menu = new MenuOptions();
        isFinalItem = false;
        numDisplayInfo = 0;
        displayInfo = new String[5];
        displayStyle = '0';
        id = s;
        label = s1;
        urlStr = s2;
        level = i;
        pos = new Point();
        aniPos = new Point();
        preAniPos = new Point();
        histPos = new Point();
        preHistPos = new Point();
        father = j;
        whichBranch = k;
        if(c == '1')
            isFinalItem = true;
        setMenuOptions(s3);
        setDisplayInfo(s4);
        displayStyle = c1;
    }

    public Node()
    {
        weight = 1.0D;
        numChildren = 0;
        MAXSIZE = 20;
        children = new int[MAXSIZE];
        numLinks = 0;
        LMAXSIZE = 5;
        linkNodes = new int[LMAXSIZE];
        bWidth = 0.0D;
        bHeight = 0.0D;
        bHistWidth = 0.0D;
        bHistHeight = 0.0D;
        histSide = 2;
        status = 0;
        fontSize = 0;
        whichBranch = 0;
        menu = new MenuOptions();
        isFinalItem = false;
        numDisplayInfo = 0;
        displayInfo = new String[5];
        displayStyle = '0';
        id = null;
        label = null;
        urlStr = null;
        level = -1;
        pos = new Point();
        aniPos = new Point();
        preAniPos = new Point();
        histPos = new Point();
        preHistPos = new Point();
        father = -1;
    }

    public boolean equals(Node node)
    {
        return node != null && id.equals(node.id);
    }

    public int compareTo(Object obj)
    {
        Node node = (Node)obj;
        if(weight < node.weight)
            return 1;
        return weight != node.weight ? -1 : 0;
    }

    private void setMenuOptions(String s)
    {
        if(s != null && !s.equals(""))
        {
            byte byte0 = 44;
            byte byte1 = 124;
            int i = 0;
            for(int j = s.indexOf(byte0, i + 1); j >= 0; j = s.indexOf(byte0, i))
            {
                String s1 = s.substring(i, j);
                s1.trim();
                int k = s1.indexOf(byte1);
                menu.name[menu.numItems] = s1.substring(0, k);
                menu.urlString[menu.numItems] = s1.substring(k + 1);
                menu.numItems++;
                i = j + 1;
            }

        }
    }

    private void setDisplayInfo(String s)
    {
        if(s != null && !s.equals(""))
        {
            byte byte0 = 44;
            int i = 0;
            for(int j = s.indexOf(byte0, i + 1); j >= 0; j = s.indexOf(byte0, i))
            {
                displayInfo[numDisplayInfo] = s.substring(i, j);
                numDisplayInfo++;
                i = j + 1;
            }

        }
    }

    String id;
    String label;
    String urlStr;
    Point pos;
    int level;
    double weight;
    int father;
    int numChildren;
    int MAXSIZE;
    int children[];
    int numLinks;
    int LMAXSIZE;
    int linkNodes[];
    Point aniPos;
    Point preAniPos;
    Point histPos;
    Point preHistPos;
    double bWidth;
    double bHeight;
    double bHistWidth;
    double bHistHeight;
    int histSide;
    int status;
    int fontSize;
    int whichBranch;
    MenuOptions menu;
    boolean isFinalItem;
    int numDisplayInfo;
    String displayInfo[];
    char displayStyle;
}
