const competitiveProgrammingData = {
  "Competitive Programming": {
    icon: "ti-tournament",
    color: "#B5451B",
    topics: {
      "Sliding Window": {
        explanation: "Sliding Window maintains a window (subarray/substring) that slides over data, adding elements from one end and removing from the other. Reduces O(n²) brute force to O(n).",
        details: [
          "Fixed Window: window size k is constant — slide by one each step",
          "Variable Window: window grows/shrinks based on a condition",
          "Key insight: avoid recomputing entire window — only process the change",
          "Applications: max subarray sum of size k, longest substring with k distinct chars"
        ],
        example: `// Fixed Window — max sum subarray of size k
int maxSumFixed(int[] arr, int k) {
    int windowSum = 0, maxSum = 0;
    for (int i = 0; i < k; i++) windowSum += arr[i];  // first window
    maxSum = windowSum;
    for (int i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k];  // slide: add right, remove left
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}
// O(n) vs brute force O(n*k)

// Variable Window — longest subarray with sum ≤ k
int longestSubarray(int[] arr, int k) {
    int left = 0, sum = 0, maxLen = 0;
    for (int right = 0; right < arr.length; right++) {
        sum += arr[right];
        while (sum > k) sum -= arr[left++];  // shrink window
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}

// Distinct Numbers in Each Subarray of size K
// Maximum of All Subarrays of Size K → use Deque (monotonic)`
      },
      "Two Pointers": {
        explanation: "Two Pointers uses two indices that move through data simultaneously, often from both ends or at different speeds. Reduces O(n²) to O(n) for many array/string problems.",
        details: [
          "Left & Right: start at opposite ends, move towards each other",
          "Fast & Slow: both start at same end, move at different speeds (Floyd's cycle detection)",
          "Sliding window is a special case of two pointers",
          "Applications: pair sum, palindrome check, remove duplicates, 3-sum"
        ],
        example: `// Two Sum in sorted array — left & right pointers
int[] twoSum(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return new int[]{left, right};
        if (sum < target) left++;
        else right--;
    }
    return new int[]{-1, -1};
}

// Check palindrome
boolean isPalindrome(String s) {
    int l = 0, r = s.length() - 1;
    while (l < r) {
        if (s.charAt(l) != s.charAt(r)) return false;
        l++; r--;
    }
    return true;
}

// Remove duplicates from sorted array (in-place)
int removeDuplicates(int[] nums) {
    int slow = 0;
    for (int fast = 1; fast < nums.length; fast++)
        if (nums[fast] != nums[slow]) nums[++slow] = nums[fast];
    return slow + 1;
}

// Closest Pair from Two Sorted Arrays
// Merge both conceptually, use two pointers`
      },
      "Bit Manipulation": {
        explanation: "Bit Manipulation operates directly on binary representations of integers. Extremely fast (single CPU instruction) and useful for space-efficient solutions.",
        details: [
          "AND (&): both bits 1 → 1; clears bits, checks if bit is set",
          "OR (|): either bit 1 → 1; sets bits",
          "XOR (^): bits differ → 1; a^a=0, a^0=a; finds unique element",
          "NOT (~): flips all bits",
          "Left shift (<<): multiply by 2; Right shift (>>): divide by 2",
          "Two's complement: negative numbers; -x = ~x + 1"
        ],
        example: `// Common bit tricks
int n = 13;   // binary: 1101

// Check if bit i is set
boolean isSet = (n & (1 << i)) != 0;

// Set bit i
n = n | (1 << i);

// Clear bit i
n = n & ~(1 << i);

// Toggle bit i
n = n ^ (1 << i);

// XOR — find non-repeated element
int[] arr = {2, 3, 4, 3, 2};
int unique = 0;
for (int x : arr) unique ^= x;  // unique = 4

// Swap without temp
a ^= b; b ^= a; a ^= b;

// Check if n is a power of 2
boolean isPow2 = (n & (n-1)) == 0;

// Count set bits (Brian Kernighan's)
int countBits(int n) {
    int count = 0;
    while (n > 0) { n &= (n-1); count++; }  // clears lowest set bit
    return count;
}

// x & (-x) → isolates lowest set bit (used in Fenwick Tree)`
      },
      "Fenwick Tree": {
        explanation: "A Fenwick Tree (Binary Indexed Tree / BIT) is a data structure for efficient prefix sum queries and point updates. O(log n) for both operations vs O(n) for naive array.",
        details: [
          "Point update: add value to a specific index — O(log n)",
          "Prefix sum query: sum from index 1 to i — O(log n)",
          "Range sum: prefixSum(r) - prefixSum(l-1) — O(log n)",
          "Key trick: x & (-x) isolates the lowest set bit to navigate the tree",
          "Space: O(n) — stored as flat array"
        ],
        example: `class FenwickTree {
    int[] tree;
    int n;

    FenwickTree(int n) { this.n = n; tree = new int[n+1]; }

    // Point update: add val at index i (1-indexed)
    void update(int i, int val) {
        for (; i <= n; i += i & (-i))  // move to parent
            tree[i] += val;
    }

    // Prefix sum: sum of elements from 1 to i
    int query(int i) {
        int sum = 0;
        for (; i > 0; i -= i & (-i))   // remove lowest set bit
            sum += tree[i];
        return sum;
    }

    // Range sum: l to r
    int rangeQuery(int l, int r) { return query(r) - query(l-1); }
}

// i & (-i) examples:
// 6 (110) & (-6)(010) = 010 = 2  ← step size
// 4 (100) & (-4)(100) = 100 = 4

// Build BIT from array in O(n log n):
FenwickTree bit = new FenwickTree(n);
for (int i = 0; i < arr.length; i++) bit.update(i+1, arr[i]);`
      },
      "Segment Tree": {
        explanation: "A Segment Tree is a tree-based data structure for range queries (sum, min, max) and range/point updates. More powerful than Fenwick Tree — supports lazy propagation for range updates.",
        details: [
          "Build: O(n); Query: O(log n); Update: O(log n)",
          "Each node stores aggregate of a range [l, r]",
          "Leaves store individual elements; internal nodes store combined values",
          "Lazy propagation: defer range updates for O(log n) range update",
          "Used for: range sum, range min/max, range GCD"
        ],
        example: `class SegmentTree {
    int[] tree;
    int n;

    SegmentTree(int[] arr) {
        n = arr.length;
        tree = new int[4 * n];
        build(arr, 0, 0, n - 1);
    }

    void build(int[] arr, int node, int l, int r) {
        if (l == r) { tree[node] = arr[l]; return; }
        int mid = (l + r) / 2;
        build(arr, 2*node+1, l, mid);
        build(arr, 2*node+2, mid+1, r);
        tree[node] = tree[2*node+1] + tree[2*node+2];  // range sum
    }

    // Point update: set arr[idx] = val
    void update(int node, int l, int r, int idx, int val) {
        if (l == r) { tree[node] = val; return; }
        int mid = (l + r) / 2;
        if (idx <= mid) update(2*node+1, l, mid, idx, val);
        else            update(2*node+2, mid+1, r, idx, val);
        tree[node] = tree[2*node+1] + tree[2*node+2];
    }

    // Range query: sum from ql to qr
    int query(int node, int l, int r, int ql, int qr) {
        if (qr < l || r < ql) return 0;           // out of range
        if (ql <= l && r <= qr) return tree[node]; // fully in range
        int mid = (l + r) / 2;
        return query(2*node+1,l,mid,ql,qr) + query(2*node+2,mid+1,r,ql,qr);
    }
}`
      },
      "Trie": {
        explanation: "A Trie (Prefix Tree) is a tree-based data structure for storing strings. Each node represents a character. Enables O(L) insert, search, and prefix-match where L is the string length.",
        details: [
          "Each node has up to 26 children (for lowercase English letters)",
          "isEndOfWord flag marks complete words",
          "Prefix search: follow characters — if path exists, prefix exists",
          "Applications: autocomplete, spell-check, IP routing, word games"
        ],
        example: `class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEnd = false;
}

class Trie {
    TrieNode root = new TrieNode();

    void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null)
                node.children[idx] = new TrieNode();
            node = node.children[idx];
        }
        node.isEnd = true;
    }

    boolean search(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) return false;
            node = node.children[idx];
        }
        return node.isEnd;
    }

    boolean startsWith(String prefix) {
        TrieNode node = root;
        for (char c : prefix.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) return false;
            node = node.children[idx];
        }
        return true;  // prefix exists
    }
}

// Top K Frequent Words: use Trie + DFS to collect words by frequency`
      },
      "Graph Algorithms": {
        explanation: "Advanced graph algorithms solve connectivity, flow, dependency, and ordering problems. Essential for competitive programming and system design.",
        details: [
          "Topological Sort: linear ordering of DAG vertices — O(V+E)",
          "Connected Components: groups of mutually reachable vertices",
          "Bridges: edges whose removal disconnects the graph (Tarjan's)",
          "Articulation Points: vertices whose removal disconnects the graph",
          "LCA: Lowest Common Ancestor — uses binary lifting O(log n) per query"
        ],
        example: `// Topological Sort (Kahn's Algorithm — BFS)
int[] topologicalSort(int V, List<List<Integer>> adj) {
    int[] inDegree = new int[V];
    for (int u = 0; u < V; u++)
        for (int v : adj.get(u)) inDegree[v]++;
    Queue<Integer> q = new LinkedList<>();
    for (int i = 0; i < V; i++) if (inDegree[i] == 0) q.offer(i);
    int[] order = new int[V]; int idx = 0;
    while (!q.isEmpty()) {
        int u = q.poll(); order[idx++] = u;
        for (int v : adj.get(u))
            if (--inDegree[v] == 0) q.offer(v);
    }
    return order;
}
// Application: Course Schedule (detect cycle → if idx < V, cycle exists)

// Connected Components using DFS
int countComponents(int V, List<List<Integer>> adj) {
    boolean[] vis = new boolean[V]; int count = 0;
    for (int i = 0; i < V; i++)
        if (!vis[i]) { dfs(i, adj, vis); count++; }
    return count;
}

// Bridges — Tarjan's Algorithm
// An edge (u,v) is a bridge if low[v] > disc[u]
// low[v] = min discovery time reachable from subtree of v`
      },
      "DSU (Union Find)": {
        explanation: "Disjoint Set Union (DSU / Union-Find) efficiently tracks a partition of elements into disjoint sets. Supports near-O(1) union and find operations with path compression and union by rank.",
        details: [
          "Find: returns the root/representative of an element's set",
          "Union: merges two sets — connect their roots",
          "Path Compression: flatten tree during Find — near-O(1) amortised",
          "Union by Rank: always attach smaller tree under larger — O(log n) without compression",
          "Together: nearly O(α(n)) ≈ O(1) amortised — essentially constant"
        ],
        example: `class DSU {
    int[] parent, rank;

    DSU(int n) {
        parent = new int[n]; rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i; // each is own root
    }

    // Find with Path Compression
    int find(int x) {
        if (parent[x] != x)
            parent[x] = find(parent[x]);  // compress path
        return parent[x];
    }

    // Union by Rank
    boolean union(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;  // already in same set (cycle!)
        if (rank[px] < rank[py]) { int t=px; px=py; py=t; }
        parent[py] = px;
        if (rank[px] == rank[py]) rank[px]++;
        return true;
    }

    boolean connected(int x, int y) { return find(x) == find(y); }
}

// Application: Number of Connected Components
int countComponents(int n, int[][] edges) {
    DSU dsu = new DSU(n);
    int components = n;
    for (int[] e : edges)
        if (dsu.union(e[0], e[1])) components--;
    return components;
}

// Application: Kruskal's MST
// Sort edges by weight, add edge if it doesn't form a cycle (union returns true)`
      }
    }
  }
};

export default competitiveProgrammingData;
