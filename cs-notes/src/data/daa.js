const daaData = {
  "DAA": {
    icon: "ti-math-function",
    color: "#6B3FA0",
    topics: {
      "Introduction to Algorithms": {
        explanation: "An algorithm is a finite, well-defined sequence of steps to solve a problem. It transforms an input into the desired output. Good algorithms are efficient in time, space, and correctness.",
        details: [
          "Characteristics: Input, Output, Definiteness, Finiteness, Effectiveness",
          "Types: Brute Force, Greedy, Divide & Conquer, Dynamic Programming, Backtracking, Randomized",
          "Performance is analysed by Time Complexity and Space Complexity",
          "Expressed via Pseudocode, flowcharts, or programming languages"
        ],
        example: `// Characteristics of a good algorithm
Input:        Takes zero or more inputs
Output:       Produces at least one output
Definiteness: Every step is clear and unambiguous
Finiteness:   Terminates after a finite number of steps
Effectiveness:Each step is simple enough to be executed

// Pseudocode example — linear search
Algorithm LinearSearch(A, n, key):
  for i = 0 to n-1 do
    if A[i] == key then
      return i
  return -1

// Brute Force: try all possibilities
// Greedy: pick locally optimal at each step
// D&C: divide → conquer → combine
// DP: memoize overlapping subproblems
// Backtracking: try and undo on failure`
      },
      "Asymptotic Notations": {
        explanation: "Asymptotic notations describe algorithm efficiency as input size grows. They characterise the best, average, and worst-case performance without hardware dependence.",
        details: [
          "Big O (O): upper bound — worst-case guarantee",
          "Omega (Ω): lower bound — best-case guarantee",
          "Theta (Θ): tight bound — average/exact behaviour",
          "Little o (o): strict upper bound (not asymptotically tight)",
          "Order: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)"
        ],
        example: `// Big O — worst case upper bound
// Linear search: O(n)  — at most n comparisons

// Omega — best case lower bound
// Linear search: Ω(1)  — found at index 0

// Theta — tight bound (same upper and lower)
// Merge sort: Θ(n log n) in all cases

// Rules for simplification
O(3n² + 5n + 1) → O(n²)   // drop constants & lower terms
O(n + log n)    → O(n)
O(n * n)        → O(n²)

// Common complexities
O(1)       : array access, hash table lookup
O(log n)   : binary search, balanced BST ops
O(n)       : linear scan, linear search
O(n log n) : merge sort, heap sort, quick sort (avg)
O(n²)      : bubble sort, insertion sort (worst)
O(2ⁿ)      : Fibonacci naive, all subsets
O(n!)      : permutations, travelling salesman brute force`
      },
      "Divide and Conquer": {
        explanation: "Divide and Conquer breaks a problem into smaller subproblems, solves each recursively, then combines results. It achieves efficiency via recursive halving.",
        details: [
          "Divide: split problem into smaller independent subproblems",
          "Conquer: solve each subproblem recursively (base case stops)",
          "Combine: merge subproblem solutions into overall solution",
          "Recurrence: T(n) = aT(n/b) + f(n) — solved by Master Theorem",
          "Examples: Merge Sort T(n)=2T(n/2)+n → Θ(n log n)"
        ],
        example: `// General D&C template
Algorithm DivideAndConquer(P):
  if P is small enough (base case):
    solve directly
  else:
    divide P into subproblems P1, P2, ..., Pk
    for each Pi: Si = DivideAndConquer(Pi)
    combine S1, S2, ..., Sk into solution S
    return S

// Majority Element (D&C)
// Find element appearing > n/2 times
int majorityElement(int[] nums, int l, int r) {
    if (l == r) return nums[l];
    int mid = (l + r) / 2;
    int left  = majorityElement(nums, l, mid);
    int right = majorityElement(nums, mid+1, r);
    if (left == right) return left;
    int lCount = count(nums, l, r, left);
    int rCount = count(nums, l, r, right);
    return lCount > rCount ? left : right;
}

// Power x^n in O(log n) using D&C
double power(double x, int n) {
    if (n == 0) return 1;
    double half = power(x, n / 2);
    if (n % 2 == 0) return half * half;
    return x * half * half;
}`
      },
      "Merge Sort": {
        explanation: "Merge Sort is a stable, comparison-based divide-and-conquer sorting algorithm. It divides the array into halves, recursively sorts them, then merges in O(n log n) always.",
        details: [
          "Time: Θ(n log n) in best, average, and worst case",
          "Space: O(n) auxiliary — needs temporary arrays",
          "Stable: equal elements maintain their original relative order",
          "Best for: linked lists, external sorting (data too large for RAM)",
          "Recurrence: T(n) = 2T(n/2) + n → O(n log n) by Master Theorem"
        ],
        example: `void mergeSort(int[] arr, int left, int right) {
    if (left >= right) return;         // base case: 1 element
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);         // sort left half
    mergeSort(arr, mid + 1, right);    // sort right half
    merge(arr, left, mid, right);      // merge sorted halves
}

void merge(int[] arr, int l, int m, int r) {
    int[] L = Arrays.copyOfRange(arr, l, m + 1);
    int[] R = Arrays.copyOfRange(arr, m + 1, r + 1);
    int i = 0, j = 0, k = l;
    while (i < L.length && j < R.length)
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < L.length) arr[k++] = L[i++];
    while (j < R.length) arr[k++] = R[j++];
}

// Trace: [38, 27, 43, 3]
// Split:   [38,27]     [43,3]
// Sort:    [27,38]     [3,43]
// Merge:   [3, 27, 38, 43] ✓`
      },
      "Quick Sort": {
        explanation: "Quick Sort picks a pivot, partitions the array around it (smaller left, larger right), then recursively sorts each partition. Average O(n log n) but worst O(n²) with bad pivots.",
        details: [
          "Average: O(n log n); Worst: O(n²) when array is already sorted with last element pivot",
          "In-place: O(log n) stack space (no auxiliary array needed)",
          "Not stable: equal elements may change relative order",
          "Randomised pivot selection avoids worst-case behaviour",
          "In practice fastest due to cache-friendly memory access"
        ],
        example: `void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);   // sort left partition
        quickSort(arr, pi + 1, high);  // sort right partition
    }
}

int partition(int[] arr, int low, int high) {
    int pivot = arr[high];  // last element as pivot
    int i = low - 1;        // index of smaller element
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        }
    }
    int tmp = arr[i+1]; arr[i+1] = arr[high]; arr[high] = tmp;
    return i + 1;
}

// Trace: [10, 80, 30, 90, 40] pivot=40
// Partition → [10, 30, 40, 90, 80]
// Recurse on [10,30] and [90,80]`
      },
      "Binary Search (D&C)": {
        explanation: "Binary Search is a classic Divide & Conquer algorithm that finds a target in a sorted array by halving the search space each step. O(log n) time, O(1) space iteratively.",
        details: [
          "Precondition: array must be sorted",
          "Each step eliminates half the remaining elements",
          "Iterative: O(1) space; Recursive: O(log n) stack space",
          "Variants: find first/last occurrence, floor/ceiling, rotated array"
        ],
        example: `// Iterative Binary Search
int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2; // avoid overflow
        if (arr[mid] == target) return mid;
        if (arr[mid] < target)  left  = mid + 1;
        else                    right = mid - 1;
    }
    return -1;
}

// Recursive Binary Search
int bsRecur(int[] arr, int l, int r, int x) {
    if (l > r) return -1;
    int mid = l + (r - l) / 2;
    if (arr[mid] == x) return mid;
    if (arr[mid] < x)  return bsRecur(arr, mid+1, r, x);
    return bsRecur(arr, l, mid-1, x);
}

// Application: Koko Eating Bananas
// Binary search on the answer (eating speed k)
// For each k, check: can Koko finish in h hours?
// Search k in range [1, max(piles)]`
      },
      "Greedy Method": {
        explanation: "The Greedy Method builds a solution piece by piece by always choosing the option that looks best at the current step (locally optimal), hoping to reach a globally optimal solution.",
        details: [
          "Greedy Choice Property: local optimal choice leads to global optimum",
          "Optimal Substructure: optimal solution contains optimal subsolutions",
          "Does NOT always give optimal (e.g. 0/1 Knapsack needs DP)",
          "Works for: Fractional Knapsack, Activity Selection, Huffman, Prim, Kruskal, Dijkstra"
        ],
        example: `// Activity Selection Problem
// Select maximum number of non-overlapping activities
// GREEDY: always pick the activity with earliest finish time

Activity[] acts = {{1,4},{3,5},{0,6},{5,7},{3,8},{5,9},{6,10},{8,11},{8,12},{2,13},{12,14}};
Arrays.sort(acts, (a,b) -> a.end - b.end);  // sort by finish time
int count = 1, lastEnd = acts[0].end;
for (int i = 1; i < acts.length; i++) {
    if (acts[i].start >= lastEnd) { count++; lastEnd = acts[i].end; }
}
// Optimal!

// Fractional Knapsack
// GREEDY: pick items with highest value/weight ratio first
// Can take fractions of items (unlike 0/1 Knapsack)
Item[] items = {{60,10},{100,20},{120,30}};  // {value, weight}
Arrays.sort(items, (a,b) -> Double.compare((double)b.v/b.w, (double)a.v/a.w));
double totalValue = 0; int capacity = 50;
for (Item item : items) {
    if (capacity >= item.w) { totalValue += item.v; capacity -= item.w; }
    else { totalValue += item.v * (double)capacity / item.w; break; }
}
// Total = 60 + 100 + 80 = 240`
      },
      "Knapsack Problem": {
        explanation: "The 0/1 Knapsack Problem: given weights and values of n items and a capacity W, find the maximum value subset where total weight ≤ W. Each item can only be taken once (0 or 1).",
        details: [
          "0/1: each item is either taken completely or not at all",
          "Fractional: items can be split — solved greedily",
          "0/1 requires Dynamic Programming: dp[i][w] = max value using first i items with capacity w",
          "Time: O(nW); Space: O(nW) or O(W) with space optimisation"
        ],
        example: `// 0/1 Knapsack — DP Tabulation
int knapsack(int[] val, int[] wt, int n, int W) {
    int[][] dp = new int[n+1][W+1];
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            dp[i][w] = dp[i-1][w];  // don't take item i
            if (wt[i-1] <= w)       // take item i if it fits
                dp[i][w] = Math.max(dp[i][w],
                            val[i-1] + dp[i-1][w - wt[i-1]]);
        }
    }
    return dp[n][W];
}

// Example: n=4, W=5
// val = [1, 6, 10, 16], wt = [1, 2, 3, 5]
// dp table reveals max value = 22 (items 2+3, weight=2+3=5)

// Space-optimised (1D dp)
int[] dp = new int[W+1];
for (int i = 0; i < n; i++)
    for (int w = W; w >= wt[i]; w--)  // reverse to avoid reuse
        dp[w] = Math.max(dp[w], val[i] + dp[w - wt[i]]);`
      },
      "BFS & DFS": {
        explanation: "BFS and DFS are the two fundamental graph traversal algorithms. BFS explores level by level (shortest path). DFS explores as deep as possible before backtracking.",
        details: [
          "BFS: uses Queue, finds shortest path in unweighted graphs, O(V+E)",
          "DFS: uses Stack/Recursion, detects cycles, topological sort, O(V+E)",
          "BFS: level-order traversal, good for 'minimum steps/hops' problems",
          "DFS: good for path finding, flood fill, connected components, backtracking"
        ],
        example: `// BFS — level by level using Queue
void bfs(List<List<Integer>> graph, int src) {
    boolean[] visited = new boolean[graph.size()];
    Queue<Integer> q = new LinkedList<>();
    visited[src] = true; q.offer(src);
    while (!q.isEmpty()) {
        int node = q.poll();
        System.out.print(node + " ");
        for (int nb : graph.get(node))
            if (!visited[nb]) { visited[nb] = true; q.offer(nb); }
    }
}

// DFS — deep first using Recursion
void dfs(List<List<Integer>> graph, int node, boolean[] vis) {
    vis[node] = true;
    System.out.print(node + " ");
    for (int nb : graph.get(node))
        if (!vis[nb]) dfs(graph, nb, vis);
}

// BFS applications: Max Area of Island, Shortest Path
// DFS applications: Number of Islands, Boundary Tree, Maze

// BFS finds shortest path → visits 0→1→2→3 in layers
// DFS backtracks → explores 0→1→3 fully before going to 2`
      },
      "Backtracking": {
        explanation: "Backtracking is a systematic search strategy that builds a solution incrementally, abandoning a path (backtracking) as soon as it determines the path cannot lead to a valid solution.",
        details: [
          "State Space Tree: models all possible choices as a tree",
          "Pruning: cut branches that violate constraints early",
          "More efficient than brute force — avoids exploring invalid states",
          "Applications: N-Queens, Sudoku, Hamiltonian Cycle, Graph Colouring"
        ],
        example: `// N-Queens Problem: place N queens on NxN board, no two attack each other
void solve(int col, boolean[] rows, boolean[] d1, boolean[] d2,
           int n, List<List<Integer>> result, int[] board) {
    if (col == n) { result.add(toList(board)); return; }
    for (int row = 0; row < n; row++) {
        if (rows[row] || d1[row-col+n-1] || d2[row+col]) continue;
        // Place queen
        board[col] = row;
        rows[row] = d1[row-col+n-1] = d2[row+col] = true;
        solve(col+1, rows, d1, d2, n, result, board);
        // Backtrack (undo)
        rows[row] = d1[row-col+n-1] = d2[row+col] = false;
    }
}

// Hamiltonian Cycle: visit every vertex exactly once
boolean hamiltonian(int[][] graph, int[] path, int pos) {
    if (pos == graph.length)
        return graph[path[pos-1]][path[0]] == 1; // back to start?
    for (int v = 1; v < graph.length; v++) {
        if (isSafe(v, graph, path, pos)) {
            path[pos] = v;
            if (hamiltonian(graph, path, pos+1)) return true;
            path[pos] = -1; // backtrack
        }
    }
    return false;
}`
      },
      "Dynamic Programming": {
        explanation: "Dynamic Programming solves complex optimisation problems by breaking them into overlapping subproblems, solving each once, and storing results to avoid redundant computation.",
        details: [
          "Two approaches: Top-down (memoization) and Bottom-up (tabulation)",
          "Requires: Optimal Substructure + Overlapping Subproblems",
          "Memoization: recursive with cache (HashMap or array)",
          "Tabulation: iterative, fills table from base cases up",
          "Classic problems: Fibonacci, Knapsack, LCS, LIS, Matrix Chain, TSP"
        ],
        example: `// Fibonacci — 3 approaches
// Naive recursion: O(2ⁿ) — terrible
int fib(int n) { return n<=1 ? n : fib(n-1)+fib(n-2); }

// Memoization (top-down): O(n)
int[] memo = new int[n+1];
int fibMemo(int n) {
    if (n <= 1) return n;
    if (memo[n] != 0) return memo[n];
    return memo[n] = fibMemo(n-1) + fibMemo(n-2);
}

// Tabulation (bottom-up): O(n) time, O(1) space
int fibTab(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) { int c = a+b; a = b; b = c; }
    return b;
}

// Longest Common Subsequence (LCS)
// dp[i][j] = LCS of first i chars of X and first j chars of Y
int lcs(String X, String Y) {
    int m = X.length(), n = Y.length();
    int[][] dp = new int[m+1][n+1];
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = X.charAt(i-1)==Y.charAt(j-1)
                        ? dp[i-1][j-1]+1
                        : Math.max(dp[i-1][j], dp[i][j-1]);
    return dp[m][n];
}`
      },
      "Matrix Chain Multiplication": {
        explanation: "Matrix Chain Multiplication finds the optimal parenthesisation of a chain of matrices to minimise the total number of scalar multiplications. A classic DP problem.",
        details: [
          "Multiplying A(p×q)·B(q×r) costs p·q·r scalar multiplications",
          "Order of multiplication doesn't change result but changes cost",
          "dp[i][j] = min multiplications to compute matrices i through j",
          "Time: O(n³); Space: O(n²)"
        ],
        example: `// dp[i][j] = min cost to multiply matrices i..j
int matrixChain(int[] p, int n) {
    int[][] dp = new int[n][n];
    // len = chain length
    for (int len = 2; len <= n; len++) {
        for (int i = 0; i < n - len + 1; i++) {
            int j = i + len - 1;
            dp[i][j] = Integer.MAX_VALUE;
            for (int k = i; k < j; k++) {
                int cost = dp[i][k] + dp[k+1][j]
                           + p[i] * p[k+1] * p[j+1];
                dp[i][j] = Math.min(dp[i][j], cost);
            }
        }
    }
    return dp[0][n-1];
}

// Example: dimensions p = [10, 30, 5, 60]
// Matrices: A(10×30), B(30×5), C(5×60)
// Option 1: (A·B)·C = 10*30*5 + 10*5*60 = 1500+3000 = 4500
// Option 2: A·(B·C) = 30*5*60 + 10*30*60 = 9000+18000 = 27000
// dp[0][2] = 4500  ← optimal parenthesisation`
      },
      "Branch and Bound": {
        explanation: "Branch and Bound is an optimisation strategy that systematically explores the solution space using a state space tree, pruning branches that cannot yield better solutions than the current best.",
        details: [
          "Branching: split problem into subproblems (children in state space tree)",
          "Bounding: compute upper/lower bound for each node; prune if worse than best",
          "FIFO: BFS-style exploration; LC (Least Cost): explore most promising node first",
          "More efficient than backtracking — uses cost bounds to prune",
          "Applications: 0/1 Knapsack, Travelling Salesman Problem"
        ],
        example: `// Branch and Bound for 0/1 Knapsack
// Upper bound: take fractional items greedily (relaxation)
double upperBound(Node node, int n, int W, Item[] items) {
    if (node.weight >= W) return 0;
    double bound = node.value;
    int w = node.weight;
    int j = node.level + 1;
    while (j < n && w + items[j].weight <= W) {
        w += items[j].weight;
        bound += items[j].value;
        j++;
    }
    if (j < n)  // take fraction of next item
        bound += (W - w) * (double)items[j].value / items[j].weight;
    return bound;
}

// State Space Tree traversal:
// At each node: branch into "take item" and "skip item"
// Prune if bound <= current best value

// Backtracking vs Branch & Bound:
// Backtracking: feasibility check only (DFS)
// Branch & Bound: cost bounding + optimal solution (BFS/LC-search)
// B&B finds optimal; Backtracking finds any valid solution`
      },
      "NP Hard & NP Complete": {
        explanation: "Complexity classes classify problems by how hard they are to solve. P problems are solvable in polynomial time; NP problems are verifiable in polynomial time; NP-Complete are the hardest in NP.",
        details: [
          "P: solvable in polynomial time O(n^k) — easy problems",
          "NP: solution verifiable in polynomial time (may take exponential to solve)",
          "NP-Hard: at least as hard as any NP problem (may not even be in NP)",
          "NP-Complete: in NP AND NP-Hard — the hardest problems in NP",
          "Cook's Theorem: SAT (Boolean Satisfiability) is NP-Complete",
          "If any NP-Complete problem has polynomial solution → P = NP (unsolved!)"
        ],
        example: `// CLASS HIERARCHY
P ⊆ NP ⊆ NP-Hard
NP-Complete = NP ∩ NP-Hard

// P examples (polynomial-time solvable):
  Sorting: O(n log n)
  Binary Search: O(log n)
  Shortest Path (Dijkstra): O(V log V + E)

// NP examples (verifiable in poly time):
  Travelling Salesman Problem (decision version)
  0/1 Knapsack
  Graph Colouring
  Hamiltonian Cycle

// NP-Complete (hardest in NP):
  SAT (Boolean Satisfiability) ← Cook's Theorem
  3-SAT, Vertex Cover, Clique
  Hamiltonian Path/Cycle
  TSP (decision version)
  Sudoku (generalised)

// Proving NP-Completeness:
// Step 1: Show problem is in NP (verifiable in poly time)
// Step 2: Reduce known NP-Complete problem to it in poly time

// Deterministic vs Non-deterministic:
// Deterministic: one outcome per step (real computers)
// Non-deterministic: can "guess" correct choice (theoretical)`
      }
    }
  }
};

export default daaData;
