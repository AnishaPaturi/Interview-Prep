const algorithmsData = {
  "Algorithms": {
    icon: "ti-sort-ascending",
    color: "#BA7517",
    topics: {
      "Binary Search": {
        explanation: "Binary search finds an element in a sorted array by repeatedly halving the search space. Each comparison eliminates half of remaining candidates, giving O(log n) time. It is one of the most fundamental and widely applied algorithms in computer science.",
        details: [
          "Precondition: input MUST be sorted — otherwise use linear scan O(n)",
          "At each step: compare middle element with target → go left (smaller) or right (larger)",
          "Overflow-safe midpoint: mid = left + (right - left) / 2, NOT (left + right) / 2",
          "Time: O(log n) — 1 billion elements = at most 30 comparisons",
          "Space: O(1) iterative; O(log n) recursive (call stack)",
          "Template variants: find exact, find first occurrence, find last occurrence, find boundary (leftmost true)",
          "Left boundary pattern: when condition is true, narrow right → finds leftmost valid position",
          "Right boundary pattern: when condition is true, narrow left → finds rightmost valid position",
          "Real applications: searching in sorted arrays, finding sqrt(n), peak finding, rotated array search, answer-space BS",
          "Answer-space binary search: BS on the answer range when you can validate a candidate answer in O(n)"
        ],
        example: `// ── Standard Binary Search ──────────────────────────────────
int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;   // overflow-safe
        if      (arr[mid] == target) return mid;
        else if (arr[mid] <  target) left  = mid + 1;
        else                         right = mid - 1;
    }
    return -1;
}

// Trace: arr=[2,4,6,8,10,12], target=8
// left=0, right=5 → mid=2 → arr[2]=6 < 8 → left=3
// left=3, right=5 → mid=4 → arr[4]=10 > 8 → right=3
// left=3, right=3 → mid=3 → arr[3]=8 ✓ return 3

// ── Find First Occurrence (Left Boundary) ───────────────────
int firstOccurrence(int[] arr, int target) {
    int left = 0, right = arr.length - 1, result = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            result = mid;         // record and keep searching left
            right = mid - 1;
        } else if (arr[mid] < target) left  = mid + 1;
        else                          right = mid - 1;
    }
    return result;
}
// arr=[1,2,2,2,3], target=2 → returns index 1

// ── Find Last Occurrence (Right Boundary) ───────────────────
int lastOccurrence(int[] arr, int target) {
    int left = 0, right = arr.length - 1, result = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            result = mid;
            left = mid + 1;       // record and keep searching right
        } else if (arr[mid] < target) left  = mid + 1;
        else                          right = mid - 1;
    }
    return result;
}

// ── Binary Search on Answer Space ───────────────────────────
// "Koko eating bananas" — find min eating speed to finish in h hours
int minEatingSpeed(int[] piles, int h) {
    int left = 1, right = Arrays.stream(piles).max().getAsInt();
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (canFinish(piles, mid, h)) right = mid;   // valid, try slower
        else                          left  = mid + 1; // too slow
    }
    return left;
}
boolean canFinish(int[] piles, int speed, int h) {
    int hours = 0;
    for (int p : piles) hours += Math.ceil((double) p / speed);
    return hours <= h;
}

// ── Binary Search on Rotated Array ─────────────────────────
int searchRotated(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[left] <= arr[mid]) {         // left half is sorted
            if (arr[left] <= target && target < arr[mid]) right = mid - 1;
            else                                           left  = mid + 1;
        } else {                             // right half is sorted
            if (arr[mid] < target && target <= arr[right]) left  = mid + 1;
            else                                            right = mid - 1;
        }
    }
    return -1;
}

// ── Integer Square Root ─────────────────────────────────────
int mySqrt(int x) {
    if (x < 2) return x;
    int left = 1, right = x / 2;
    while (left <= right) {
        long mid = left + (right - left) / 2;
        if      (mid * mid == x) return (int) mid;
        else if (mid * mid <  x) left  = (int) mid + 1;
        else                     right = (int) mid - 1;
    }
    return right;   // floor of sqrt
}`
      },
      "Merge Sort": {
        explanation: "Merge Sort uses the divide-and-conquer paradigm: split the array in half recursively until single elements, then merge sorted halves. It guarantees O(n log n) in all cases and is the algorithm of choice when stability is required or when sorting linked lists.",
        details: [
          "Time: O(n log n) in ALL cases — best, average, and worst — unlike quicksort which degrades to O(n²)",
          "Space: O(n) auxiliary for the temporary merged array",
          "Stable: equal elements preserve their original relative order — important for multi-key sorting",
          "Divide step: O(log n) recursive splits until single elements (trivially sorted)",
          "Conquer step: merge two sorted halves — each merge is O(n)",
          "Total work: log n levels × O(n) per level = O(n log n)",
          "External sort: merge sort works when data doesn't fit in memory — merge sorted chunks from disk",
          "Linked lists: merge sort is optimal for linked lists (no random access needed, no extra space)",
          "Bottom-up merge sort: iterative version — merge pairs, then groups of 4, 8, 16... avoids recursion overhead",
          "Natural merge sort: exploits existing runs in data — nearly sorted input runs in O(n) (Timsort basis)",
          "Parallelizable: each half can be sorted independently on different threads"
        ],
        example: `// ── Standard Merge Sort ─────────────────────────────────────
void mergeSort(int[] arr, int left, int right) {
    if (left >= right) return;              // base case: single element
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);             // sort left half
    mergeSort(arr, mid + 1, right);        // sort right half
    merge(arr, left, mid, right);          // merge sorted halves
}

void merge(int[] arr, int left, int mid, int right) {
    int[] temp = new int[right - left + 1];
    int i = left, j = mid + 1, k = 0;

    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j])   // <= ensures stability
            temp[k++] = arr[i++];
        else
            temp[k++] = arr[j++];
    }
    while (i <= mid)  temp[k++] = arr[i++];  // remaining left
    while (j <= right) temp[k++] = arr[j++]; // remaining right

    for (int x = 0; x < temp.length; x++)
        arr[left + x] = temp[x];
}

// Trace: [38, 27, 43, 3]
// Split:  [38, 27] | [43, 3]
// Split:  [38]|[27]  [43]|[3]
// Merge:  [27, 38]   [3, 43]
// Merge:  [3, 27, 38, 43] ✓

// ── Count Inversions (classic merge sort application) ────────
// Inversion: arr[i] > arr[j] where i < j
// Count inversions in arr = number of swaps bubble sort would make
long mergeCount(int[] arr, int left, int right) {
    if (left >= right) return 0;
    int mid = left + (right - left) / 2;
    long count = mergeCount(arr, left, mid)
               + mergeCount(arr, mid + 1, right);

    int[] temp = new int[right - left + 1];
    int i = left, j = mid + 1, k = 0;
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j])
            temp[k++] = arr[i++];
        else {
            count += (mid - i + 1);   // all remaining left elements > arr[j]
            temp[k++] = arr[j++];
        }
    }
    while (i <= mid)   temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    for (int x = 0; x < temp.length; x++) arr[left + x] = temp[x];
    return count;
}

// ── Bottom-Up Merge Sort (iterative, no recursion) ───────────
void mergeSortBottomUp(int[] arr) {
    int n = arr.length;
    for (int size = 1; size < n; size *= 2) {      // sizes: 1,2,4,8...
        for (int left = 0; left < n - size; left += 2 * size) {
            int mid   = left + size - 1;
            int right = Math.min(left + 2 * size - 1, n - 1);
            merge(arr, left, mid, right);
        }
    }
}

// ── Merge K Sorted Arrays (extension) ───────────────────────
// Use a min-heap to efficiently merge k sorted arrays
// Time: O(N log k) where N = total elements, k = number of arrays
import java.util.PriorityQueue;
int[] mergeKSorted(int[][] arrays) {
    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    int total = 0;
    for (int i = 0; i < arrays.length; i++) {
        if (arrays[i].length > 0) {
            heap.offer(new int[]{arrays[i][0], i, 0});
            total += arrays[i].length;
        }
    }
    int[] result = new int[total];
    int idx = 0;
    while (!heap.isEmpty()) {
        int[] curr = heap.poll();
        result[idx++] = curr[0];
        int arrIdx = curr[1], elemIdx = curr[2];
        if (elemIdx + 1 < arrays[arrIdx].length)
            heap.offer(new int[]{arrays[arrIdx][elemIdx+1], arrIdx, elemIdx+1});
    }
    return result;
}`
      },
      "Quick Sort": {
        explanation: "Quick sort partitions the array around a pivot element such that all smaller elements are left and all larger elements are right, then recursively sorts each partition. It is the fastest sorting algorithm in practice due to excellent cache performance and low constant factors.",
        details: [
          "Average: O(n log n); Worst: O(n²) — occurs with sorted input + bad pivot (always first/last element)",
          "Space: O(log n) average for recursion stack; O(n) worst case",
          "NOT stable: equal elements may be reordered",
          "In-place: no auxiliary array needed (unlike merge sort)",
          "Cache-friendly: accesses memory sequentially → excellent CPU cache performance",
          "Pivot strategies: first element (bad for sorted), last element (bad for sorted), random (good), median-of-3 (best)",
          "Lomuto partition: simpler to implement; Hoare partition: fewer swaps, slightly faster",
          "3-way partition (Dutch National Flag): handles duplicate elements efficiently — O(n) for all-same array",
          "Introsort: hybrid used in stdlib — quicksort + heapsort fallback when depth > 2 log n (avoids O(n²))",
          "Tail call optimization: recurse on smaller partition first → O(log n) stack space guaranteed"
        ],
        example: `// ── Lomuto Partition Scheme ─────────────────────────────────
void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partitionLomuto(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partitionLomuto(int[] arr, int low, int high) {
    // Randomize pivot to avoid O(n²) on sorted input
    int randIdx = low + (int)(Math.random() * (high - low + 1));
    swap(arr, randIdx, high);

    int pivot = arr[high];
    int i = low - 1;                    // boundary of smaller elements

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);             // place pivot in correct position
    return i + 1;
}

// ── Hoare Partition (original, fewer swaps) ──────────────────
int partitionHoare(int[] arr, int low, int high) {
    int pivot = arr[low + (high - low) / 2];  // median element
    int i = low - 1, j = high + 1;
    while (true) {
        do { i++; } while (arr[i] < pivot);
        do { j--; } while (arr[j] > pivot);
        if (i >= j) return j;
        swap(arr, i, j);
    }
}

// ── 3-Way Partition (Dutch National Flag) ───────────────────
// Efficient when many duplicate elements exist
void quickSort3Way(int[] arr, int low, int high) {
    if (low >= high) return;
    int pivot = arr[low + (int)(Math.random() * (high - low + 1))];
    int lt = low, gt = high, i = low;

    while (i <= gt) {
        if      (arr[i] < pivot) swap(arr, lt++, i++);  // < pivot → left zone
        else if (arr[i] > pivot) swap(arr, i,  gt--);   // > pivot → right zone
        else                     i++;                     // == pivot → middle zone
    }
    // arr[low..lt-1] < pivot; arr[lt..gt] == pivot; arr[gt+1..high] > pivot
    quickSort3Way(arr, low, lt - 1);
    quickSort3Way(arr, gt + 1, high);
}

// ── Quickselect — Find Kth Smallest in O(n) average ─────────
// Same partitioning idea, but only recurse on one side
int quickSelect(int[] arr, int low, int high, int k) {
    if (low == high) return arr[low];
    int pi = partitionLomuto(arr, low, high);
    if      (pi == k) return arr[pi];
    else if (pi >  k) return quickSelect(arr, low,    pi - 1, k);
    else              return quickSelect(arr, pi + 1, high,   k);
}
// Usage: quickSelect(arr, 0, n-1, k-1) → kth smallest element

// ── Trace Example ────────────────────────────────────────────
// arr = [3, 6, 8, 10, 1, 2, 1], pivot = 3 (Lomuto)
// After partition: [1, 2, 1, 3, 8, 10, 6], pivot at index 3
// Left: [1,2,1], Right: [8,10,6] → sort recursively

void swap(int[] arr, int i, int j) {
    int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
}`
      },
      "BFS": {
        explanation: "Breadth-First Search (BFS) explores a graph level by level using a queue (FIFO). It visits all nodes at distance k before any node at distance k+1, making it the go-to algorithm for shortest path in unweighted graphs and level-order traversal.",
        details: [
          "Data structure: Queue (FIFO) — nodes at distance k processed before distance k+1",
          "Time: O(V + E) — visits every vertex and edge once",
          "Space: O(V) — queue can hold all nodes at the widest level",
          "Guarantees shortest path (fewest edges) in unweighted graphs",
          "Dijkstra's = BFS with a priority queue for weighted graphs",
          "Level-order traversal of trees is BFS",
          "Multi-source BFS: enqueue all sources at start simultaneously — finds min distance from any source",
          "Bidirectional BFS: search from both source and destination, meet in middle — O(b^(d/2)) vs O(b^d)",
          "0-1 BFS: use deque instead of queue — front for cost-0 edges, back for cost-1 edges",
          "Applications: shortest path, web crawling, social network friend suggestions, flood fill, bipartite check",
          "Visited array: critical to prevent re-visiting nodes in cyclic graphs"
        ],
        example: `import java.util.*;

// ── Standard BFS (Adjacency List) ───────────────────────────
void bfs(Map<Integer, List<Integer>> graph, int start) {
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> queue = new LinkedList<>();
    visited.add(start);
    queue.offer(start);

    while (!queue.isEmpty()) {
        int node = queue.poll();
        System.out.print(node + " ");
        for (int neighbor : graph.getOrDefault(node, new ArrayList<>())) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                queue.offer(neighbor);
            }
        }
    }
}

// ── BFS with Shortest Distance ───────────────────────────────
Map<Integer, Integer> shortestPath(Map<Integer, List<Integer>> graph, int src) {
    Map<Integer, Integer> dist = new HashMap<>();
    Queue<Integer> queue = new LinkedList<>();
    dist.put(src, 0);
    queue.offer(src);

    while (!queue.isEmpty()) {
        int node = queue.poll();
        for (int neighbor : graph.getOrDefault(node, new ArrayList<>())) {
            if (!dist.containsKey(neighbor)) {
                dist.put(neighbor, dist.get(node) + 1);
                queue.offer(neighbor);
            }
        }
    }
    return dist;  // dist.get(target) = shortest path length
}

// ── Level-Order BFS (process level by level) ─────────────────
List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        int size = queue.size();   // nodes at current level
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left  != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        result.add(level);
    }
    return result;
}

// ── Multi-Source BFS (e.g., walls and gates) ─────────────────
void wallsAndGates(int[][] rooms) {
    int m = rooms.length, n = rooms[0].length;
    Queue<int[]> queue = new LinkedList<>();

    for (int i = 0; i < m; i++)            // enqueue all gates
        for (int j = 0; j < n; j++)
            if (rooms[i][j] == 0) queue.offer(new int[]{i, j});

    int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};
    while (!queue.isEmpty()) {
        int[] cell = queue.poll();
        for (int[] d : dirs) {
            int r = cell[0] + d[0], c = cell[1] + d[1];
            if (r < 0 || r >= m || c < 0 || c >= n || rooms[r][c] != Integer.MAX_VALUE)
                continue;
            rooms[r][c] = rooms[cell[0]][cell[1]] + 1;
            queue.offer(new int[]{r, c});
        }
    }
}

// ── Bipartite Check via BFS ──────────────────────────────────
boolean isBipartite(int[][] graph) {
    int n = graph.length;
    int[] color = new int[n];  // 0=unvisited, 1=red, -1=blue
    for (int start = 0; start < n; start++) {
        if (color[start] != 0) continue;
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(start);
        color[start] = 1;
        while (!queue.isEmpty()) {
            int node = queue.poll();
            for (int neighbor : graph[node]) {
                if (color[neighbor] == 0) {
                    color[neighbor] = -color[node];
                    queue.offer(neighbor);
                } else if (color[neighbor] == color[node]) {
                    return false;   // same color = not bipartite
                }
            }
        }
    }
    return true;
}

// ── 0-1 BFS (deque — mix of 0-cost and 1-cost edges) ─────────
int[] bfs01(int[][] graph, int[][] weights, int src, int n) {
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;
    Deque<Integer> deque = new ArrayDeque<>();
    deque.offerFirst(src);
    while (!deque.isEmpty()) {
        int node = deque.pollFirst();
        for (int i = 0; i < graph[node].length; i++) {
            int nb = graph[node][i], w = weights[node][i];
            if (dist[node] + w < dist[nb]) {
                dist[nb] = dist[node] + w;
                if (w == 0) deque.offerFirst(nb);   // free edge → front
                else        deque.offerLast(nb);    // cost-1 edge → back
            }
        }
    }
    return dist;
}`
      },
      "DFS": {
        explanation: "Depth-First Search (DFS) explores as far as possible along each path before backtracking. It uses a stack (explicit or implicit via recursion) and is the foundation of many graph algorithms including cycle detection, topological sort, SCCs, and tree path problems.",
        details: [
          "Data structure: Stack (explicit) or recursion call stack (implicit)",
          "Time: O(V + E); Space: O(V) for the recursion/stack depth",
          "Preorder: process node before children; Postorder: process after all children",
          "Tree traversals: Inorder (Left-Node-Right), Preorder (Node-Left-Right), Postorder (Left-Right-Node)",
          "Topological sort: DFS postorder on DAG — valid linear ordering of tasks with dependencies",
          "Cycle detection: track 'in-stack' nodes (gray) — back edge to gray node = cycle",
          "Connected components: run DFS from each unvisited node — count = number of components",
          "Strongly Connected Components (SCCs): Kosaraju's or Tarjan's algorithm — both use DFS",
          "Flood fill: DFS on 2D grid — paint connected region",
          "Backtracking: DFS with undo step — used for permutations, combinations, N-Queens, Sudoku",
          "Iterative DFS: use explicit stack; note different order than recursive DFS",
          "Bridge/articulation point detection: Tarjan's algorithm using discovery time and low values"
        ],
        example: `import java.util.*;

// ── Recursive DFS ────────────────────────────────────────────
void dfs(Map<Integer, List<Integer>> graph, int node, Set<Integer> visited) {
    visited.add(node);
    System.out.print(node + " ");
    for (int neighbor : graph.getOrDefault(node, new ArrayList<>())) {
        if (!visited.contains(neighbor))
            dfs(graph, neighbor, visited);
    }
}

// ── Iterative DFS (explicit stack) ───────────────────────────
void dfsIterative(Map<Integer, List<Integer>> graph, int start) {
    Set<Integer> visited = new HashSet<>();
    Deque<Integer> stack = new ArrayDeque<>();
    stack.push(start);
    while (!stack.isEmpty()) {
        int node = stack.pop();
        if (visited.contains(node)) continue;
        visited.add(node);
        System.out.print(node + " ");
        for (int nb : graph.getOrDefault(node, new ArrayList<>()))
            if (!visited.contains(nb)) stack.push(nb);
    }
}

// ── Topological Sort (DFS postorder) ────────────────────────
List<Integer> topoSort(Map<Integer, List<Integer>> graph, int n) {
    Set<Integer> visited = new HashSet<>();
    Deque<Integer> stack = new ArrayDeque<>();
    for (int i = 0; i < n; i++)
        if (!visited.contains(i))
            topoHelper(graph, i, visited, stack);
    List<Integer> order = new ArrayList<>(stack);
    return order;
}
void topoHelper(Map<Integer, List<Integer>> g, int node,
                Set<Integer> visited, Deque<Integer> stack) {
    visited.add(node);
    for (int nb : g.getOrDefault(node, new ArrayList<>()))
        if (!visited.contains(nb)) topoHelper(g, nb, visited, stack);
    stack.push(node);   // add to stack AFTER all descendants processed
}

// ── Cycle Detection in Directed Graph ───────────────────────
boolean hasCycle(Map<Integer, List<Integer>> graph, int n) {
    Set<Integer> visited = new HashSet<>();
    Set<Integer> inStack = new HashSet<>();  // gray nodes (in current path)
    for (int i = 0; i < n; i++)
        if (!visited.contains(i) && cycleHelper(graph, i, visited, inStack))
            return true;
    return false;
}
boolean cycleHelper(Map<Integer, List<Integer>> g, int node,
                    Set<Integer> visited, Set<Integer> inStack) {
    visited.add(node); inStack.add(node);
    for (int nb : g.getOrDefault(node, new ArrayList<>())) {
        if (!visited.contains(nb) && cycleHelper(g, nb, visited, inStack)) return true;
        if (inStack.contains(nb)) return true;   // back edge = cycle!
    }
    inStack.remove(node);
    return false;
}

// ── Flood Fill (2D Grid DFS) ─────────────────────────────────
void floodFill(int[][] image, int r, int c, int newColor) {
    int original = image[r][c];
    if (original == newColor) return;
    fill(image, r, c, original, newColor);
}
void fill(int[][] img, int r, int c, int orig, int newColor) {
    if (r < 0 || r >= img.length || c < 0 || c >= img[0].length) return;
    if (img[r][c] != orig) return;
    img[r][c] = newColor;
    fill(img, r+1, c, orig, newColor);
    fill(img, r-1, c, orig, newColor);
    fill(img, r, c+1, orig, newColor);
    fill(img, r, c-1, orig, newColor);
}

// ── Number of Islands ────────────────────────────────────────
int numIslands(char[][] grid) {
    int count = 0;
    for (int r = 0; r < grid.length; r++)
        for (int c = 0; c < grid[0].length; c++)
            if (grid[r][c] == '1') { sink(grid, r, c); count++; }
    return count;
}
void sink(char[][] grid, int r, int c) {
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] != '1') return;
    grid[r][c] = '0';   // sink visited land
    sink(grid, r+1, c); sink(grid, r-1, c);
    sink(grid, r, c+1); sink(grid, r, c-1);
}

// ── Backtracking Template (e.g., Permutations) ───────────────
List<List<Integer>> permutations(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, new ArrayList<>(), new boolean[nums.length], result);
    return result;
}
void backtrack(int[] nums, List<Integer> current, boolean[] used, List<List<Integer>> result) {
    if (current.size() == nums.length) {
        result.add(new ArrayList<>(current)); return;
    }
    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;
        used[i] = true;
        current.add(nums[i]);
        backtrack(nums, current, used, result);  // recurse
        current.remove(current.size() - 1);      // UNDO (backtrack)
        used[i] = false;
    }
}`
      },
      "Dynamic Programming": {
        explanation: "Dynamic Programming (DP) solves complex optimization problems by breaking them into overlapping subproblems, solving each subproblem exactly once, and storing results. The key insight: optimal solution uses optimal solutions of subproblems.",
        details: [
          "Two required properties: (1) Optimal substructure — optimal solution built from optimal subproblems; (2) Overlapping subproblems — same subproblems solved multiple times",
          "Memoization (top-down): write recursive solution, add a cache — problems are only solved when first needed",
          "Tabulation (bottom-up): iteratively fill a table from base cases — no recursion overhead, cache-friendly",
          "State design: what minimum information uniquely identifies a subproblem? This defines your DP state",
          "Recurrence relation: express current state in terms of smaller states — the heart of DP",
          "Space optimization: often only need previous row/column, reducing space from O(n²) to O(n)",
          "1D DP: Fibonacci, climbing stairs, house robber, coin change, word break",
          "2D DP: knapsack, longest common subsequence, edit distance, matrix chain multiplication",
          "Interval DP: burst balloons, palindrome partitioning — solve subarrays, build up to full array",
          "Bitmask DP: subset states — travelling salesman problem, assignment problem with n ≤ 20",
          "DP on trees: rerooting technique — compute DP both from root and reroot for each node",
          "Pattern: if problem asks 'max/min/count' of something with 'choices', think DP"
        ],
        example: `// ── Fibonacci (memoization vs tabulation) ───────────────────
// Naive recursive: O(2^n) — recalculates same values exponentially
// With memoization: O(n)
Map<Integer, Long> memo = new HashMap<>();
long fibMemo(int n) {
    if (n <= 1) return n;
    if (memo.containsKey(n)) return memo.get(n);
    long result = fibMemo(n-1) + fibMemo(n-2);
    memo.put(n, result);
    return result;
}

// Tabulation (bottom-up):
long fibTab(int n) {
    if (n <= 1) return n;
    long[] dp = new long[n+1];
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}

// Space-optimized (O(1) space):
long fibOpt(int n) {
    long a = 0, b = 1;
    for (int i = 2; i <= n; i++) { long c = a + b; a = b; b = c; }
    return b;
}

// ── 0/1 Knapsack ─────────────────────────────────────────────
// State: dp[i][w] = max value using first i items with capacity w
// Choice: take item i (if fits) or skip it
int knapsack(int[] val, int[] weight, int W) {
    int n = val.length;
    int[][] dp = new int[n+1][W+1];
    for (int i = 1; i <= n; i++)
        for (int w = 0; w <= W; w++)
            if (weight[i-1] <= w)
                dp[i][w] = Math.max(dp[i-1][w],
                                    val[i-1] + dp[i-1][w - weight[i-1]]);
            else
                dp[i][w] = dp[i-1][w];
    return dp[n][W];
}

// ── Longest Common Subsequence (LCS) ────────────────────────
// State: dp[i][j] = LCS of s1[0..i-1] and s2[0..j-1]
int lcs(String s1, String s2) {
    int m = s1.length(), n = s2.length();
    int[][] dp = new int[m+1][n+1];
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            if (s1.charAt(i-1) == s2.charAt(j-1))
                dp[i][j] = 1 + dp[i-1][j-1];
            else
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    return dp[m][n];
}

// ── Edit Distance (Levenshtein) ──────────────────────────────
// Min operations (insert, delete, replace) to convert s1 → s2
int editDistance(String s1, String s2) {
    int m = s1.length(), n = s2.length();
    int[][] dp = new int[m+1][n+1];
    for (int i = 0; i <= m; i++) dp[i][0] = i;     // delete all of s1
    for (int j = 0; j <= n; j++) dp[0][j] = j;     // insert all of s2
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            if (s1.charAt(i-1) == s2.charAt(j-1))
                dp[i][j] = dp[i-1][j-1];            // no operation
            else
                dp[i][j] = 1 + Math.min(dp[i-1][j-1],      // replace
                            Math.min(dp[i-1][j],             // delete
                                     dp[i][j-1]));           // insert

    return dp[m][n];
}

// ── Coin Change (min coins to make amount) ──────────────────
// State: dp[amount] = min coins to make this amount
// Recurrence: dp[a] = 1 + min(dp[a - coin]) for all coins
int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);   // initialize to "infinity"
    dp[0] = 0;
    for (int a = 1; a <= amount; a++)
        for (int coin : coins)
            if (coin <= a) dp[a] = Math.min(dp[a], 1 + dp[a - coin]);
    return dp[amount] > amount ? -1 : dp[amount];
}

// ── Longest Increasing Subsequence (LIS) ────────────────────
// O(n²) DP
int lis(int[] nums) {
    int n = nums.length;
    int[] dp = new int[n];
    Arrays.fill(dp, 1);    // each element is LIS of length 1
    for (int i = 1; i < n; i++)
        for (int j = 0; j < i; j++)
            if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    return Arrays.stream(dp).max().getAsInt();
}

// O(n log n) using patience sorting + binary search
int lisOptimal(int[] nums) {
    List<Integer> tails = new ArrayList<>();
    for (int num : nums) {
        int pos = Collections.binarySearch(tails, num);
        if (pos < 0) pos = -(pos + 1);
        if (pos == tails.size()) tails.add(num);
        else tails.set(pos, num);
    }
    return tails.size();
}`
      },
      "Big O Notation": {
        explanation: "Big O notation describes the asymptotic upper bound of an algorithm's time or space complexity as input size n grows toward infinity. It captures the dominant term while ignoring constants and lower-order terms, enabling comparison of algorithms independent of hardware.",
        details: [
          "Formal definition: f(n) = O(g(n)) if ∃ c, n₀ such that f(n) ≤ c·g(n) for all n > n₀",
          "Drop constants: 5n → O(n); 100 → O(1); 3n² + 2n + 7 → O(n²)",
          "Drop lower-order: O(n² + n) = O(n²); O(n log n + n) = O(n log n)",
          "O(1): constant — array index, hash map lookup, stack push/pop",
          "O(log n): logarithmic — binary search, balanced BST ops, divide-and-conquer with no combination work",
          "O(n): linear — single loop, linear scan, BFS/DFS",
          "O(n log n): linearithmic — merge sort, heap sort, FFT; optimal comparison sort lower bound",
          "O(n²): quadratic — nested loops, bubble/selection/insertion sort, naive string matching",
          "O(n³): cubic — naive matrix multiplication, Floyd-Warshall, some DP",
          "O(2ⁿ): exponential — all subsets, recursive fib without memo, some backtracking",
          "O(n!): factorial — all permutations, brute force TSP",
          "Ω (Big Omega): lower bound (best case); Θ (Theta): tight bound (best = worst case); O: upper bound (worst case)",
          "Amortized analysis: average cost per operation over a sequence (dynamic array append = O(1) amortized)",
          "Space complexity: accounts for additional memory used, excluding input (or including it — specify)"
        ],
        example: `// ── Complexity Examples ──────────────────────────────────────

// O(1) — constant time: doesn't depend on input size
int getFirst(int[] arr) { return arr[0]; }
map.get(key);   // HashMap average case

// O(log n) — each step halves the problem
int binarySearch(int[] arr, int t) { ... }  // see Binary Search
height of balanced BST with n nodes = O(log n)

// O(n) — single pass through input
int sum(int[] arr) {
    int s = 0;
    for (int x : arr) s += x;  // one loop
    return s;
}

// O(n log n) — divide n times, each level is O(n)
mergeSort(arr);       // guaranteed
Arrays.sort(arr);     // TimSort (hybrid merge + insertion)

// O(n²) — nested loops
void bubbleSort(int[] arr) {
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n-i-1; j++)  // nested loop
            if (arr[j] > arr[j+1]) swap(arr, j, j+1);
}

// O(n³) — triple nested loop
void matMul(int[][] A, int[][] B, int[][] C, int n) {
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            for (int k = 0; k < n; k++)
                C[i][j] += A[i][k] * B[k][j];
}

// O(2^n) — branches double each level
int fibNaive(int n) {
    if (n <= 1) return n;
    return fibNaive(n-1) + fibNaive(n-2);  // 2 recursive calls
}

// O(n!) — generates all orderings
void permutations(int[] arr, int start) {
    if (start == arr.length) { print(arr); return; }
    for (int i = start; i < arr.length; i++) {
        swap(arr, start, i);
        permutations(arr, start + 1);  // n × (n-1) × (n-2)... paths
        swap(arr, start, i);
    }
}

// ── Identifying Complexity ───────────────────────────────────
// One loop = O(n)
// Loop inside loop = O(n²)
// Divide by 2 each step = O(log n)
// Loop + divide = O(n log n)
// Recursive with 2 branches, halving = O(n) [binary tree = 2n nodes]
// Recursive with 2 branches, same size = O(2^n)

// ── Amortized Analysis ───────────────────────────────────────
// Dynamic array (ArrayList): most appends are O(1)
// Occasionally doubles capacity = O(n) copy
// Over n appends: total work = n + n/2 + n/4 + ... ≈ 2n = O(n)
// Amortized per append = O(n)/n = O(1)

// ── Space Complexity ─────────────────────────────────────────
// Merge sort: O(n) aux space for temp array
// In-place quicksort: O(log n) stack space
// BFS: O(n) for visited + queue
// DFS recursive: O(h) stack, h = height of tree/graph
// DP knapsack: O(nW); space-optimized 1D = O(W)

// ── Common Sorting Complexities ──────────────────────────────
// Algorithm       Best        Average     Worst       Space   Stable?
// Bubble Sort     O(n)        O(n²)       O(n²)       O(1)    Yes
// Selection Sort  O(n²)       O(n²)       O(n²)       O(1)    No
// Insertion Sort  O(n)        O(n²)       O(n²)       O(1)    Yes
// Merge Sort      O(n log n)  O(n log n)  O(n log n)  O(n)    Yes
// Quick Sort      O(n log n)  O(n log n)  O(n²)       O(log n) No
// Heap Sort       O(n log n)  O(n log n)  O(n log n)  O(1)    No
// Tim Sort        O(n)        O(n log n)  O(n log n)  O(n)    Yes`
      },
      "Recursion": {
        explanation: "Recursion is a problem-solving technique where a function calls itself on a smaller version of the problem. Every recursive solution requires a base case (termination condition) and a recursive case (reduce problem size). Recursion maps naturally to problems with self-similar structure: trees, fractals, divide-and-conquer.",
        details: [
          "Base case: condition that stops recursion — MUST be reached for every input path",
          "Recursive case: problem must shrink toward the base case each call",
          "Call stack: each call pushes a new stack frame with local variables; popped on return",
          "Stack overflow: default max depth is ~1000–10000 calls; deep recursion crashes",
          "Head recursion: recursive call before processing (top-down); Tail recursion: call after processing",
          "Tail call optimization (TCO): compiler replaces tail recursion with iteration — no stack growth; Java doesn't support TCO, Scala/Haskell do",
          "Mutual recursion: function A calls B which calls A — ensure base cases cover both",
          "Memoization: cache return values to avoid recomputing — transforms tree recursion to linear",
          "Recurrence relations: T(n) = aT(n/b) + f(n) — Master Theorem solves these",
          "Master Theorem: if T(n) = aT(n/b) + O(n^d) → O(n^d) if d>log_b(a), O(n^d log n) if equal, O(n^log_b(a)) if less",
          "Tree recursion: each call spawns multiple sub-calls — visualize as a tree; depth = stack depth",
          "When to use recursion: tree/graph traversal, divide-and-conquer, backtracking, mathematical induction-style proofs"
        ],
        example: `// ── Basic Examples ───────────────────────────────────────────
// Factorial — linear recursion
int factorial(int n) {
    if (n == 0) return 1;           // BASE CASE
    return n * factorial(n - 1);    // RECURSIVE CASE: shrinks toward 0
}
// factorial(4) call stack:
// factorial(4) → 4 × factorial(3)
//   factorial(3) → 3 × factorial(2)
//     factorial(2) → 2 × factorial(1)
//       factorial(1) → 1 × factorial(0)
//         factorial(0) → 1  ← base case
// Unwinds: 1→1→2→6→24

// ── Fibonacci (tree recursion — exponential without memo) ─────
int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);   // TWO recursive calls = tree shape
}
// fib(5) spawns fib(4)+fib(3), each spawns more... = O(2^n)
// With @memoization = O(n)

// ── Power Function (divide-and-conquer recursion) ────────────
double myPow(double x, int n) {
    if (n == 0) return 1.0;
    if (n < 0) { x = 1/x; n = -n; }
    double half = myPow(x, n/2);
    return n % 2 == 0 ? half * half : half * half * x;
}
// O(log n) instead of O(n) — halves the problem each time

// ── Tower of Hanoi: T(n) = 2T(n-1) + 1 → O(2^n) ─────────────
void hanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        System.out.println(from + " → " + to);
        return;
    }
    hanoi(n-1, from, aux, to);   // move n-1 disks to aux
    System.out.println(from + " → " + to); // move biggest disk
    hanoi(n-1, aux, to, from);  // move n-1 disks from aux to to
}
// hanoi(3, A, C, B):
// A→C, A→B, C→B, A→C, B→A, B→C, A→C (7 moves = 2³-1)

// ── Tree Traversals (pure recursion) ─────────────────────────
void inorder(TreeNode node) {   // Left → Node → Right
    if (node == null) return;
    inorder(node.left);
    System.out.print(node.val + " ");
    inorder(node.right);
}
void preorder(TreeNode node) {  // Node → Left → Right
    if (node == null) return;
    System.out.print(node.val + " ");
    preorder(node.left);
    preorder(node.right);
}
int height(TreeNode node) {     // max depth of tree
    if (node == null) return 0;
    return 1 + Math.max(height(node.left), height(node.right));
}

// ── Generate Subsets (power set) ─────────────────────────────
List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    generateSubsets(nums, 0, new ArrayList<>(), result);
    return result;
}
void generateSubsets(int[] nums, int idx, List<Integer> current, List<List<Integer>> result) {
    result.add(new ArrayList<>(current));   // always add current subset
    for (int i = idx; i < nums.length; i++) {
        current.add(nums[i]);                // choose
        generateSubsets(nums, i+1, current, result); // explore
        current.remove(current.size()-1);   // unchoose (backtrack)
    }
}

// ── Tail Recursion (optimize to iteration) ───────────────────
// Tail recursive factorial (accumulator pattern):
int factTail(int n, int acc) {
    if (n == 0) return acc;
    return factTail(n-1, n * acc);   // tail call — last operation
}
// Equivalent iterative:
int factIter(int n) {
    int acc = 1;
    while (n > 0) { acc *= n; n--; }
    return acc;
}`
      },
      "Greedy Algorithms": {
        explanation: "Greedy algorithms build solutions piece by piece, always choosing the locally optimal option at each step. They work when the 'greedy choice property' holds: a locally optimal choice leads to a globally optimal solution. They are simpler and faster than DP but don't always work.",
        details: [
          "Greedy choice property: a locally optimal choice is always part of some globally optimal solution",
          "Optimal substructure: optimal solution to problem contains optimal solutions to subproblems (shared with DP)",
          "Key distinction from DP: greedy commits to one choice and never revisits; DP explores all choices",
          "Proving correctness: use 'greedy stays ahead' or 'exchange argument' — assume optimal differs, show you can swap to greedy",
          "Activity selection: sort by finish time, always pick earliest finishing compatible activity",
          "Fractional knapsack: sort by value/weight ratio, take greedily — works because fractions allowed",
          "0/1 knapsack: greedy FAILS — must use DP (can't take fractions, greedy choice may be suboptimal)",
          "Huffman encoding: build optimal prefix-free code — greedy via min-heap, optimal for lossless compression",
          "Coin change with standard coins: greedy works; with arbitrary denominations, use DP",
          "Minimum spanning tree: Kruskal's (sort edges, add if no cycle) and Prim's (grow from start) are both greedy",
          "Dijkstra's shortest path: greedy — always expand the unvisited node with minimum distance",
          "Interval scheduling maximization vs minimization: greedy sort differs (finish time vs start time)"
        ],
        example: `import java.util.*;

// ── Activity Selection (max non-overlapping intervals) ────────
// Greedy: sort by finish time, pick if compatible (start >= last finish)
int activitySelection(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[1] - b[1]);  // sort by finish time
    int count = 1, lastFinish = intervals[0][1];
    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] >= lastFinish) {    // no overlap
            count++;
            lastFinish = intervals[i][1];
        }
    }
    return count;
}
// intervals: [[1,4],[3,5],[0,6],[5,7],[5,9],[8,9]]
// sorted by finish: [[1,4],[3,5],[0,6],[5,7],[5,9],[8,9]]
// pick [1,4] → lastFinish=4
// skip [3,5] (3<4), skip [0,6] (0<4)
// pick [5,7] → lastFinish=7
// skip [5,9] (5<7)
// pick [8,9] → count=3 ✓

// ── Meeting Rooms II (min rooms needed) ──────────────────────
// Greedy: sort start times, use min-heap of end times
int minMeetingRooms(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    PriorityQueue<Integer> heap = new PriorityQueue<>();  // end times
    for (int[] i : intervals) {
        if (!heap.isEmpty() && heap.peek() <= i[0])
            heap.poll();   // reuse the room that just freed up
        heap.offer(i[1]);  // allocate room ending at i[1]
    }
    return heap.size();    // rooms in use = answer
}

// ── Huffman Encoding ─────────────────────────────────────────
// Build optimal variable-length prefix-free codes
// Chars with higher frequency = shorter codes
class HuffmanNode implements Comparable<HuffmanNode> {
    char ch; int freq;
    HuffmanNode left, right;
    public int compareTo(HuffmanNode o) { return this.freq - o.freq; }
}

HuffmanNode buildHuffman(char[] chars, int[] freqs) {
    PriorityQueue<HuffmanNode> pq = new PriorityQueue<>();
    for (int i = 0; i < chars.length; i++) {
        HuffmanNode node = new HuffmanNode();
        node.ch = chars[i]; node.freq = freqs[i];
        pq.offer(node);
    }
    while (pq.size() > 1) {
        HuffmanNode left = pq.poll(), right = pq.poll();
        HuffmanNode parent = new HuffmanNode();
        parent.freq = left.freq + right.freq;
        parent.left = left; parent.right = right;
        pq.offer(parent);
    }
    return pq.poll();  // root of Huffman tree
}
// Example: a=5, b=9, c=12, d=13, e=16, f=45
// f=45 (0), c=12 (100), d=13 (101), a=5 (1100), b=9 (1101), e=16 (111)
// Total bits = 224 (vs 288 for fixed 3-bit encoding)

// ── Dijkstra's Algorithm (greedy shortest path) ───────────────
int[] dijkstra(int[][] graph, int src) {
    int n = graph.length;
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;

    // [distance, node]
    PriorityQueue<int[]> pq = new PriorityQueue<>((a,b) -> a[0]-b[0]);
    pq.offer(new int[]{0, src});

    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int d = curr[0], u = curr[1];
        if (d > dist[u]) continue;   // stale entry
        for (int v = 0; v < n; v++) {
            if (graph[u][v] > 0 && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
                pq.offer(new int[]{dist[v], v});
            }
        }
    }
    return dist;
}

// ── When Greedy FAILS → Use DP ───────────────────────────────
// Coin change with coins [1, 3, 4], amount = 6:
// Greedy: 4 + 1 + 1 = 3 coins
// DP: 3 + 3 = 2 coins ← BETTER
// Greedy chose 4 greedily but missed the optimal [3,3]

// ── Fractional Knapsack (greedy works) ───────────────────────
double fractionalKnapsack(int W, int[] val, int[] wt) {
    int n = val.length;
    Integer[] idx = new Integer[n];
    for (int i = 0; i < n; i++) idx[i] = i;
    Arrays.sort(idx, (a, b) -> Double.compare((double)val[b]/wt[b], (double)val[a]/wt[a]));

    double total = 0; int remaining = W;
    for (int i : idx) {
        if (remaining == 0) break;
        int take = Math.min(wt[i], remaining);
        total += (double) take / wt[i] * val[i];
        remaining -= take;
    }
    return total;
}`
      },
      "Two Pointers & Sliding Window": {
        explanation: "Two Pointers and Sliding Window are linear-time techniques that replace O(n²) nested loops. Two pointers use two indices moving through data; sliding window maintains a subarray of variable or fixed size by expanding/shrinking from both ends.",
        details: [
          "Two pointers — opposite ends: start at both ends, move inward (e.g., two-sum sorted, container with most water)",
          "Two pointers — same direction: fast/slow pointers for linked list cycles, removing duplicates",
          "Sliding window — fixed size: maintain window of size k, slide one element at a time",
          "Sliding window — variable size: expand right to include, shrink left when condition violated",
          "Key insight: avoids recomputing entire window each step by subtracting outgoing, adding incoming element",
          "Time: O(n) — each element enters and leaves the window at most once",
          "Applications: longest substring without repeats, min window substring, max sum subarray, trapping rain water"
        ],
        example: `// ── Two Sum in Sorted Array (opposite pointers) ─────────────
int[] twoSum(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left < right) {
        int sum = nums[left] + nums[right];
        if      (sum == target) return new int[]{left, right};
        else if (sum <  target) left++;
        else                    right--;
    }
    return new int[]{-1, -1};
}

// ── Linked List Cycle (Floyd's fast/slow) ────────────────────
boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;   // they meet inside cycle
    }
    return false;
}

// ── Max Sum Subarray of size k (fixed window) ────────────────
int maxSumK(int[] arr, int k) {
    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += arr[i];  // first window
    int maxSum = windowSum;
    for (int i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k];   // slide: add right, remove left
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}

// ── Longest Substring Without Repeating (variable window) ────
int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> map = new HashMap<>();
    int left = 0, maxLen = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (map.containsKey(c) && map.get(c) >= left)
            left = map.get(c) + 1;   // shrink: move past the duplicate
        map.put(c, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}

// ── Container With Most Water ────────────────────────────────
int maxArea(int[] height) {
    int left = 0, right = height.length - 1, max = 0;
    while (left < right) {
        int area = Math.min(height[left], height[right]) * (right - left);
        max = Math.max(max, area);
        if (height[left] < height[right]) left++;   // move shorter side
        else                              right--;
    }
    return max;
}`
      }
    }
  }
};

export default algorithmsData;