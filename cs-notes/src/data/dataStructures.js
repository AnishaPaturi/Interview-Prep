const dataStructuresData = {
  "Data Structures": {
    icon: "ti-binary-tree",
    color: "#7F77DD",
    topics: {
      "Arrays": {
        explanation: "An array is a collection of elements of the same type stored in contiguous memory locations. Provides O(1) access by index.",
        details: [
          "Access: O(1); Search: O(n); Insert/Delete: O(n) at arbitrary position",
          "Static (fixed size) or dynamic (resizable like ArrayList)",
          "Memory address: base + index × element_size"
        ],
        example: `int[] arr = {10, 20, 30, 40, 50};
int x = arr[2];    // O(1) → 30

// 2D array
int[][] matrix = {{1,2,3},{4,5,6},{7,8,9}};
int val = matrix[1][2];  // row 1, col 2 = 6`
      },
      "Linked List": {
        explanation: "A linked list connects nodes by pointers. Each node contains data and a reference to the next node. Dynamic size, efficient insertions/deletions.",
        details: [
          "Singly linked: each node → next",
          "Doubly linked: each node ↔ prev and next",
          "Circular: last node → first node",
          "No random access; must traverse from head"
        ],
        example: `class Node { int data; Node next; }

// Prepend: O(1)
void prepend(int data) {
    Node n = new Node(data);
    n.next = head; head = n;
}

// Append: O(n)
void append(int data) {
    Node n = new Node(data);
    Node curr = head;
    while (curr.next != null) curr = curr.next;
    curr.next = n;
}`
      },
      "Stack": {
        explanation: "A stack is a LIFO (Last In, First Out) data structure. Elements are added and removed from the same end (top).",
        details: [
          "Push O(1), Pop O(1), Peek O(1)",
          "Applications: undo/redo, browser back, expression evaluation, recursion"
        ],
        example: `Stack<Integer> s = new Stack<>();
s.push(10); s.push(20); s.push(30);
s.pop();    // returns 30
s.peek();   // returns 20 (no removal)

// Balanced parentheses check using stack
// "{[()]}" → push opens, pop+check closes → balanced!`
      },
      "Queue": {
        explanation: "A queue is a FIFO (First In, First Out) data structure. Elements are added at the rear and removed from the front.",
        details: [
          "Enqueue O(1), Dequeue O(1)",
          "Applications: process scheduling, BFS, print queue",
          "Circular queue solves the wasted-front problem"
        ],
        example: `Queue<Integer> q = new LinkedList<>();
q.offer(10); q.offer(20); q.offer(30);
q.poll();    // dequeue → returns 10
q.peek();    // view front → returns 20

// Circular queue: rear = (rear + 1) % capacity`
      },
      "Hash Table": {
        explanation: "A hash table stores key-value pairs with O(1) average lookup using a hash function to map keys to array indices.",
        details: [
          "Hash function: maps key → index",
          "Collision handling: chaining (linked list per bucket) or open addressing",
          "Load factor: n/m; typically keep < 0.75"
        ],
        example: `HashMap<String, Integer> map = new HashMap<>();
map.put("Alice", 90);
map.get("Alice");                     // 90
map.getOrDefault("Carol", 0);         // 0 if missing
map.containsKey("Alice");             // true

for (Map.Entry<String,Integer> e : map.entrySet())
    System.out.println(e.getKey() + ": " + e.getValue());`
      },
      "Binary Tree": {
        explanation: "A binary tree is a hierarchical data structure where each node has at most two children (left and right). Root is the topmost node; leaves have no children.",
        details: [
          "Traversals: Inorder (LNR), Preorder (NLR), Postorder (LRN), Level order (BFS)",
          "Height: longest path from root to leaf",
          "Complete binary tree: all levels full except last (filled left to right)"
        ],
        example: `//      1
//    /   \\
//   2     3
//  / \\
// 4   5

// Inorder (L-N-R):   4, 2, 5, 1, 3
// Preorder (N-L-R):  1, 2, 4, 5, 3
// Postorder (L-R-N): 4, 5, 2, 3, 1

void inorder(TreeNode node) {
    if (node == null) return;
    inorder(node.left);
    System.out.print(node.val + " ");
    inorder(node.right);
}`
      },
      "BST": {
        explanation: "A Binary Search Tree (BST) is a binary tree where all left subtree values are smaller than the node and all right subtree values are larger.",
        details: [
          "Search: O(h) — O(log n) balanced, O(n) worst case skewed",
          "Inorder traversal of BST gives sorted sequence",
          "Delete: 3 cases — leaf, one child, two children"
        ],
        example: `//      5
//    /   \\
//   3     7
//  / \\   / \\
// 2   4  6   8

// Search 6: 5 → 7 → 6 ✓

TreeNode insert(TreeNode node, int key) {
    if (node == null) return new TreeNode(key);
    if (key < node.val) node.left  = insert(node.left,  key);
    else if (key > node.val) node.right = insert(node.right, key);
    return node;
}`
      },
      "Graph": {
        explanation: "A graph is a collection of vertices (nodes) connected by edges. Models networks, relationships, maps, and many real-world problems.",
        details: [
          "Directed (digraph): edges have direction; Undirected: edges are bidirectional",
          "Weighted: edges have costs; Unweighted: equal edges",
          "Adjacency List O(V+E) space; Adjacency Matrix O(V²) space"
        ],
        example: `// Adjacency List (space-efficient)
Map<Integer, List<Integer>> graph = new HashMap<>();
graph.put(0, Arrays.asList(1, 2));
graph.put(1, Arrays.asList(0, 3));

// Adjacency Matrix
int[][] matrix = {
    {0, 1, 1, 0},  // 0 connects to 1, 2
    {1, 0, 0, 1},  // 1 connects to 0, 3
    {1, 0, 0, 0},
    {0, 1, 0, 0}
};`
      },
      "Heap": {
        explanation: "A heap is a complete binary tree satisfying the heap property. Max-heap: parent ≥ children. Min-heap: parent ≤ children.",
        details: [
          "Insert O(log n), Extract-max/min O(log n), Peek O(1)",
          "Stored as array: parent at i, children at 2i+1 and 2i+2",
          "Used in: Heap Sort, Priority Queue, Dijkstra's algorithm"
        ],
        example: `// Min-heap (Java)
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.offer(5); minHeap.offer(3); minHeap.offer(8);
minHeap.peek();   // 3 (min)
minHeap.poll();   // 3 (remove min)

// Max-heap
PriorityQueue<Integer> maxHeap =
    new PriorityQueue<>(Collections.reverseOrder());

// Array representation (Max-heap):
// Index:  0   1   2   3   4
// Value: [90, 80, 70, 60, 50]
// Parent of i: (i-1)/2`
      }
    }
  }
};

export default dataStructuresData;
