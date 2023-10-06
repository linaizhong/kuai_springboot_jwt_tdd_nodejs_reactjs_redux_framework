public class HierarchyTree
{

    public HierarchyTree()
    {
        MAX_NUMNODES = 100;
        numNodes = 0;
        nodes = new Node[MAX_NUMNODES];
        root = null;
    }

    public HierarchyTree(Node node)
    {
        MAX_NUMNODES = 100;
        numNodes = 0;
        nodes = new Node[MAX_NUMNODES];
        root = node;
        root.level = 0;
        nodes[0] = node;
        numNodes++;
    }

    public int findNode(String s)
    {
        int i = -1;
        boolean flag = false;
        for(int j = 0; j < numNodes && !flag; j++)
            if(s.equals(nodes[j].id))
            {
                i = j;
                flag = true;
            }

        return i;
    }

    private int findNode_inChildrenList(Node node, String s)
    {
        int i = -1;
        boolean flag = false;
        for(int j = 0; j < node.numChildren && !flag; j++)
        {
            Node node1 = nodes[node.children[j]];
            if(s.equals(node1.id))
            {
                i = j;
                flag = true;
            }
        }

        return i;
    }

    private int findNode_inLinkNodesList(Node node, String s)
    {
        int i = -1;
        boolean flag = false;
        for(int j = 0; j < node.numLinks && !flag; j++)
        {
            Node node1 = nodes[node.linkNodes[j]];
            if(s.equals(node1.id))
            {
                i = j;
                flag = true;
            }
        }

        return i;
    }

    public void addRoot(Node node)
    {
        root = node;
        root.level = 0;
        nodes[0] = node;
        numNodes++;
    }

    public boolean addNode(InfoObject infoobject)
    {
        boolean flag = true;
        int i = findNode(infoobject.from_node_id);
        int j = findNode(infoobject.to_node_id);
        if(j < 0)
        {
            if(i < 0)
            {
                flag = false;
            } else
            {
                Node node = nodes[i];
                Node node1 = null;
                if(node.whichBranch == 0)
                    node1 = new Node(infoobject.to_node_id, infoobject.to_node_lbl, infoobject.theURL, node.level + 1, i, node.numChildren + 1, infoobject.menuStr, infoobject.isFinalItem, infoobject.infoStr, infoobject.dispStyle);
                else
                    node1 = new Node(infoobject.to_node_id, infoobject.to_node_lbl, infoobject.theURL, node.level + 1, i, node.whichBranch, infoobject.menuStr, infoobject.isFinalItem, infoobject.infoStr, infoobject.dispStyle);
                if(numNodes >= MAX_NUMNODES)
                    upgradeNodesSize();
                if(infoobject.isHierarchical == '1')
                {
                    if(node.numChildren >= node.MAXSIZE)
                        upgradeChilrenListSize(node);
                    node.children[node.numChildren] = numNodes;
                    node.numChildren++;
                } else
                {
                    if(node.numLinks >= node.LMAXSIZE)
                        upgradeLinkNodesSize(node);
                    node.linkNodes[node.numLinks] = numNodes;
                    node.numLinks++;
                }
                nodes[numNodes] = node1;
                numNodes++;
            }
        } else
        if(i < 0)
            flag = false;
        return flag;
    }

    private void upgradeNodesSize()
    {
        MAX_NUMNODES = 2 * MAX_NUMNODES;
        Node anode[] = new Node[MAX_NUMNODES];
        for(int i = 0; i < numNodes; i++)
            anode[i] = nodes[i];

        nodes = anode;
    }

    private void upgradeChilrenListSize(Node node)
    {
        node.MAXSIZE = 2 * node.MAXSIZE;
        int ai[] = new int[node.MAXSIZE];
        for(int i = 0; i < node.numChildren; i++)
            ai[i] = node.children[i];

        node.children = ai;
    }

    private void upgradeLinkNodesSize(Node node)
    {
        node.LMAXSIZE = 2 * node.LMAXSIZE;
        int ai[] = new int[node.LMAXSIZE];
        for(int i = 0; i < node.numLinks; i++)
            ai[i] = node.linkNodes[i];

        node.linkNodes = ai;
    }

    public String getRootId(Node node, int i)
    {
        String s = "-1";
        if(node.level > i)
        {
            Node node1 = node;
            for(int j = node.level; j > i; j--)
                node1 = nodes[node1.father];

            s = node1.id;
        }
        return s;
    }

    public Node root;
    int MAX_NUMNODES;
    int numNodes;
    Node nodes[];
}
