const algorithmsData = {
  "Algorithms": {
    icon: "ti-sort-ascending",
    color: "#BA7517",
    topics: {
      "Binary Search": {
        explanation: "Binary search finds an element in a sorted array by repeatedly halving the search space. O(log n) time, O(1) space iterative.",
        details: [
          "Requires sorted input",
          "At each step: compare middle element with target",
          "Left half or right half — discard the irrelevant half"
        ],
        example: `int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2; // avoid overflow
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left  = mid + 1;
        else                        right = mid - 1;
    }
    return -1;
}

// Trace: arr=[2,4,6,8,10,12], target=8
// mid=2 → arr[2]=6 < 8 → left=3
// mid=4 → arr[4]=10 > 8 → right=3
// mid=3 → arr[3]=8 == 8 ✓`
      },
      "Merge Sort": {
        explanation: "Merge sort divides the array into halves, recursively sorts each half, then merges the sorted halves. O(n log n) in all cases.",
        details: [
          "Time: O(n log n) in all cases",
          "Space: O(n) auxiliary",
          "Stable sort: equal elements maintain relative order"
        ],
        example: `void mergeSort(int[] arr, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

// Trace: [38, 27, 43, 3]
// Split: [38,27] | [43,3]
// Sort:  [27,38] | [3,43]
// Merge: [3, 27, 38, 43] ✓`
      },
      "Quick Sort": {
        explanation: "Quick sort uses a pivot to partition the array, then recursively sorts each partition. Average O(n log n), worst O(n²).",
        details: [
          "Average: O(n log n); Worst: O(n²) with bad pivot",
          "In-place: O(log n) stack space",
          "Usually fastest in practice — used in most stdlib sort implementations"
        ],
        example: `void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
// Partition: place pivot in correct position
// Elements left of pivot < pivot < elements right`
      },
      "BFS": {
        explanation: "Breadth-First Search explores a graph level by level, visiting all nodes at distance k before nodes at distance k+1. Uses a queue. Finds shortest path in unweighted graphs.",
        details: [
          "Time: O(V+E); Space: O(V)",
          "Finds shortest path in unweighted graphs",
          "Applications: shortest path, web crawling, social network friends"
        ],
        example: `void bfs(Map<Integer, List<Integer>> graph, int start) {
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> queue = new LinkedList<>();
    visited.add(start); queue.offer(start);
    while (!queue.isEmpty()) {
        int node = queue.poll();
        System.out.print(node + " ");
        for (int nb : graph.get(node))
            if (!visited.contains(nb)) {
                visited.add(nb); queue.offer(nb);
            }
    }
}
// Graph: 0─1─3 / 0─2─4
// BFS from 0: 0, 1, 2, 3, 4`
      },
      "DFS": {
        explanation: "Depth-First Search explores as far as possible along each branch before backtracking. Uses a stack (or recursion). O(V+E) time.",
        details: [
          "Time: O(V+E); Space: O(V) for recursion stack",
          "Applications: topological sort, cycle detection, connected components"
        ],
        example: `void dfs(Map<Integer, List<Integer>> graph,
         int node, Set<Integer> visited) {
    visited.add(node);
    System.out.print(node + " ");
    for (int nb : graph.get(node))
        if (!visited.contains(nb))
            dfs(graph, nb, visited);
}
// DFS from 0: 0, 1, 3, 2, 4 (order may vary by adj list)`
      },
      "Dynamic Programming": {
        explanation: "Dynamic Programming solves complex problems by breaking them into overlapping subproblems, solving each once, and storing results.",
        details: [
          "Memoization: top-down recursion + cache",
          "Tabulation: bottom-up iterative table",
          "Optimal substructure + overlapping subproblems required"
        ],
        example: `// Fibonacci — memoization O(n)
int[] memo = new int[n+1];
int fib(int n) {
    if (n <= 1) return n;
    if (memo[n] != 0) return memo[n];
    return memo[n] = fib(n-1) + fib(n-2);
}

// 0/1 Knapsack tabulation
for (int i = 1; i <= n; i++)
    for (int w = 0; w <= W; w++)
        if (weight[i] <= w)
            dp[i][w] = Math.max(dp[i-1][w],
                                val[i] + dp[i-1][w-weight[i]]);
        else dp[i][w] = dp[i-1][w];`
      },
      "Big O Notation": {
        explanation: "Big O notation describes the upper bound of an algorithm's time or space complexity as input size n grows. Ignores constants and lower-order terms.",
        details: [
          "O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)",
          "Drop constants: 5n → O(n); 3n² + 2n → O(n²)",
          "Best case (Ω), Average case (Θ), Worst case (O)"
        ],
        example: `O(1):       arr[0]                  // constant
O(log n):   binary search             // halving
O(n):       linear scan               // one loop
O(n log n): merge sort, heap sort
O(n²):      bubble sort (nested loops)
O(2ⁿ):      all subsets generation
O(n!):      all permutations`
      },
      "Recursion": {
        explanation: "Recursion is a technique where a function calls itself to solve a smaller version of the same problem. Requires a base case (stops recursion) and a recursive case.",
        details: [
          "Call stack: each recursive call adds a new stack frame",
          "Stack overflow: max recursion depth exceeded",
          "Every recursive solution can be written iteratively"
        ],
        example: `int factorial(int n) {
    if (n == 0) return 1;           // base case
    return n * factorial(n - 1);    // recursive case
}

// factorial(4) = 4 × 3 × 2 × 1 × 1 = 24

// Tower of Hanoi: T(n) = 2T(n-1) + 1 → O(2ⁿ)
void hanoi(int n, char from, char to, char aux) {
    if (n == 1) { System.out.println(from + " → " + to); return; }
    hanoi(n-1, from, aux, to);
    System.out.println(from + " → " + to);
    hanoi(n-1, aux, to, from);
}`
      },
      "Greedy Algorithms": {
        explanation: "Greedy algorithms make the locally optimal choice at each step, hoping to find the global optimum. Works when greedy choice + optimal substructure applies.",
        details: [
          "Examples: Huffman coding, Kruskal's, Prim's, Dijkstra's, activity selection",
          "Greedy does not always work: 0/1 Knapsack needs DP",
          "Coin change: greedy works for standard currency denominations"
        ],
        example: `// Activity Selection (maximize non-overlapping activities)
// Sort by finish time, always pick earliest-finishing activity
// Activities: [1,4],[3,5],[0,6],[5,7],[5,9],[8,9]
// Pick [1,4] → [5,7] → [8,9] = 3 activities (optimal!)

// Fractional Knapsack
// Sort by value/weight ratio, take most valuable first
// items = [{val:60,wt:10},{val:100,wt:20},{val:120,wt:30}]
// Ratios: 6, 5, 4 → take item1 fully + item2 fully + 2/3 of item3
// Total value = 60 + 100 + 80 = 240`
      }
    }
  }
};

export default algorithmsData;
