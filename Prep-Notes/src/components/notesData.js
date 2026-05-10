// notesData.js — existing CS Notes data (Generative AI, OS, DBMS, DSA, Algorithms, OOPs, etc.)

const notesData = {
  "Generative AI": {
    icon: "ti-brain",
    color: "#A32D2D",
    topics: {
      "What is Generative AI?": {
        explanation: "Generative AI refers to AI systems capable of producing new content — text, images, audio, video, and code — rather than just classifying or predicting from existing data. It marks a shift from AI that recognizes patterns to AI that creates.",
        details: [
          "Traditional AI: classification and prediction (spam filter, price prediction)",
          "Generative AI: creates novel outputs (write an email, generate an image)",
          "Key examples: OpenAI → ChatGPT, Google → Gemini, Anthropic → Claude",
          "Modalities: text, image, audio, video, code, 3D, multimodal",
          "Underlying tech: Transformers, Diffusion Models, GANs, VAEs"
        ],
        example: `// Traditional AI vs Generative AI
Traditional AI:
  Input: "This email says 'Win $1000 now!!'"
  Output: SPAM / NOT SPAM  (binary classification)

Generative AI:
  Input: "Write a professional email declining a meeting"
  Output: "Dear [Name], Thank you for the invitation...
           Unfortunately, I'm unable to attend due to..."

// Real-world applications
Text:   ChatGPT, Claude, Gemini → writing, Q&A, coding
Images: DALL·E, Midjourney, Stable Diffusion → art, design
Code:   GitHub Copilot, Claude Code → code completion
Audio:  Suno, ElevenLabs → music, voice synthesis
Video:  Sora, Runway → video generation`
      },
      "Machine Learning Basics": {
        explanation: "Machine Learning is a subset of AI where systems learn patterns from data rather than following explicitly programmed rules. It is the foundation that makes Generative AI possible.",
        details: [
          "Supervised learning: labeled data pairs (input→output); learns to predict",
          "Unsupervised learning: unlabeled data; discovers hidden structure",
          "Reinforcement learning: agent learns by reward/penalty feedback",
          "Features: input variables; Labels: target output (what we predict)",
          "Overfitting: model memorizes training data, fails on new data",
          "Training/test split: typically 80/20 or 70/30"
        ],
        example: `# Supervised Learning — Linear Regression
from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([[1000],[1500],[2000],[2500]])  # sq ft
y = np.array([200000, 280000, 350000, 420000])  # price

model = LinearRegression()
model.fit(X, y)
print(model.predict([[1800]]))  # ~319,000

# Unsupervised — K-Means clustering
from sklearn.cluster import KMeans
kmeans = KMeans(n_clusters=3)
kmeans.fit(X)  # no labels needed!

# Overfitting: train=99%, test=65% → memorised training data
# Fix: regularisation, more data, simpler model`
      },
      "Deep Learning Basics": {
        explanation: "Deep Learning uses multi-layered neural networks to learn representations of data automatically. It powers almost all modern Generative AI.",
        details: [
          "Input layer → Hidden layers → Output layer",
          "Activation functions: ReLU, Sigmoid, Tanh, Softmax",
          "Backpropagation: computes gradients; weights updated via gradient descent",
          "Epoch: one full pass through the training dataset"
        ],
        example: `import torch.nn as nn

class SimpleNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.layers = nn.Sequential(
            nn.Linear(784, 256),
            nn.ReLU(),
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Linear(128, 10),
            nn.Softmax(dim=1)
        )
    def forward(self, x): return self.layers(x)

# Activation function choice:
# ReLU:    f(x) = max(0,x)   — hidden layers (fast, standard)
# Sigmoid: f(x) = 1/(1+e⁻ˣ) — binary output (0 to 1)
# Softmax: multi-class output (sums to 1)`
      },
      "Transformers": {
        explanation: "The Transformer architecture (2017, 'Attention Is All You Need') is the foundation of all modern LLMs. Its self-attention mechanism allows parallel processing and captures long-range dependencies.",
        details: [
          "Encoder: reads input, creates contextual representations (BERT)",
          "Decoder: generates output token by token (GPT, Claude)",
          "Self-attention: each token attends to all other tokens simultaneously",
          "Multi-head attention: multiple heads capture different relationships",
          "Attention formula: softmax(QKᵀ / √d_k) · V"
        ],
        example: `# Self-attention in pseudocode
Q = x @ W_Q  # query: what am I looking for?
K = x @ W_K  # key:   what do I offer?
V = x @ W_V  # value: what info do I provide?

scores  = (Q @ K.T) / math.sqrt(d_k)
weights = softmax(scores)
output  = weights @ V

# WHY TRANSFORMERS WIN over RNNs:
# RNN:         sequential, gradient vanishes on long sequences
# Transformer: PARALLEL, attention spans full sequence

# Encoder-only:    BERT → classification
# Decoder-only:    GPT, Claude → generation
# Encoder-Decoder: T5, BART → translation, summarisation`
      },
      "Large Language Models": {
        explanation: "LLMs are transformer-based models trained on massive text datasets to predict the next token. Through this objective on enough data, they develop emergent abilities like reasoning and coding.",
        details: [
          "Core task: next-token prediction — trained on trillions of tokens",
          "Parameters: GPT-3: 175B, GPT-4: ~1T estimated",
          "Pretraining: unsupervised on internet-scale text",
          "Fine-tuning: adapt pretrained model to specific task",
          "RLHF: Reinforcement Learning from Human Feedback",
          "Context window: max tokens model can process (4K → 1M+)"
        ],
        example: `# Temperature effect on generation
temperature=0.0 → always picks most probable token (deterministic)
temperature=0.7 → moderate creativity (good default)
temperature=1.0 → very creative, sometimes incoherent

# RLHF pipeline:
# 1. Pretrain on internet text (next-token prediction)
# 2. Fine-tune on demonstration data (supervised)
# 3. Train reward model from human preference rankings
# 4. Optimise LLM against reward model via PPO

import anthropic
client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1000,
    messages=[{"role": "user", "content": "Explain recursion"}]
)`
      },
      "Prompt Engineering": {
        explanation: "Prompt engineering is the practice of crafting effective inputs to get high-quality, reliable outputs from LLMs.",
        details: [
          "Zero-shot: direct question with no examples",
          "Few-shot: 2–5 examples to demonstrate the desired pattern",
          "Chain-of-thought: ask model to 'think step by step'",
          "Role prompting: assign a persona ('You are an expert...')",
          "Structured output: ask for JSON, XML for downstream use"
        ],
        example: `// Few-shot prompting
"Classify sentiment:
'Terrible product.' → Negative
'I love it!' → Positive
'Not bad, could be better.' → Neutral
'This is absolutely wonderful!' → "
// Output: Positive

// Chain-of-thought
"Q: Roger has 5 balls. He buys 2 cans of 3. Total?
A: Step 1: 2 × 3 = 6 new balls.
   Step 2: 5 + 6 = 11 balls. Answer: 11"

// Structured output
"Return ONLY valid JSON: {'score': ..., 'reason': '...'}"`
      },
      "RAG": {
        explanation: "Retrieval-Augmented Generation grounds LLM responses in retrieved documents, reducing hallucinations and enabling use of private or up-to-date knowledge without retraining.",
        details: [
          "Problem: LLMs have knowledge cutoffs and hallucinate",
          "Solution: retrieve relevant docs → inject into context → LLM answers from facts",
          "Indexing: chunk docs → embed → store in vector DB",
          "Query: embed query → find similar chunks → build prompt → generate"
        ],
        example: `# RAG pipeline with LangChain
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma

# INDEXING (done once)
chunks = splitter.split_documents(documents)
vectorstore = Chroma.from_documents(chunks, OpenAIEmbeddings())

# QUERYING (every request)
query = "What is our parental leave policy?"
relevant_chunks = vectorstore.similarity_search(query, k=3)
context = "\\n".join([c.page_content for c in relevant_chunks])
prompt = f"Answer ONLY from context:\\n{context}\\n\\nQ: {query}"
answer = llm(prompt)`
      },
      "Hallucinations": {
        explanation: "LLM hallucinations occur when models generate confident but factually incorrect content. Understanding why they happen and how to mitigate them is critical for production AI.",
        details: [
          "Factual hallucination: wrong facts stated with confidence",
          "Source hallucination: fabricated citations to non-existent papers",
          "Causes: pattern completion over memorised facts, gaps in training data",
          "Mitigation: RAG, grounding, citation requirements, temperature=0"
        ],
        example: `// Mitigation strategies

// 1. RAG — ground answers in retrieved facts
context = retrieve_relevant_docs(query)
prompt = f"Answer ONLY using this context:\\n{context}"

// 2. Force citation
prompt = """For every claim cite [Source: doc, section].
If you cannot cite it, say 'I don't have a source.'"""

// 3. Temperature = 0 (more deterministic)
response = client.create(model="gpt-4", temperature=0.0)

// 4. Self-consistency — sample 5, vote on answer
responses = [llm(prompt) for _ in range(5)]`
      }
    }
  },
  "Operating Systems": {
    icon: "ti-cpu",
    color: "#185FA5",
    topics: {
      "Process": {
        explanation: "A process is an instance of a program in execution. It includes the program code, current activity (program counter), stack, data section, and heap.",
        details: [
          "States: New → Ready → Running → Waiting → Terminated",
          "PCB: stores PID, state, program counter, registers, memory limits",
          "Types: Foreground (interactive) and Background (daemon) processes"
        ],
        example: `// Fork in C (UNIX)
pid_t pid = fork();
if (pid == 0) {
    printf("Child PID: %d\\n", getpid());
} else {
    printf("Parent PID: %d, Child: %d\\n", getpid(), pid);
}

// Process states
P.state = NEW;        // being created
P.state = READY;      // waiting in ready queue
P.state = RUNNING;    // executing on CPU
P.state = WAITING;    // waiting for I/O
P.state = TERMINATED; // execution complete`
      },
      "CPU Scheduling": {
        explanation: "CPU scheduling algorithms determine the order in which processes in the ready queue get CPU time.",
        details: [
          "FCFS: First Come First Served — non-preemptive, convoy effect",
          "SJF: Shortest Job First — optimal avg wait, starvation possible",
          "Round Robin: preemptive, time quantum, good for time-sharing",
          "Priority Scheduling: CPU → highest priority; aging prevents starvation",
          "TAT = CT - AT; WT = TAT - BT"
        ],
        example: `// Round Robin example (Quantum = 2)
// Processes: P1(BT=4), P2(BT=3), P3(BT=1)
// Gantt: | P1 | P2 | P3 | P1 | P2 |
//         0    2    4    5    7    8

// Key metrics
Turnaround Time (TAT) = Completion Time - Arrival Time
Waiting Time (WT)     = TAT - Burst Time
Response Time         = First Response - Arrival Time`
      },
      "Deadlock": {
        explanation: "A deadlock is a situation where a set of processes are blocked, each waiting for a resource held by another process in the set.",
        details: [
          "4 Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait",
          "Prevention: eliminate one of the four conditions",
          "Avoidance: Banker's Algorithm — safe state analysis",
          "Detection: Resource Allocation Graph — cycle = deadlock"
        ],
        example: `// Deadlock scenario
Thread T1:           Thread T2:
lock(A); lock(B);    lock(B); lock(A);
// T1 holds A, waits B; T2 holds B, waits A → DEADLOCK!

// Banker's Algorithm (Safe State Check)
Available: [3,3,2]
Allocation: P0[0,1,0] P1[2,0,0] P2[3,0,2]
Need:       P0[7,4,3] P1[1,2,2] P2[6,0,0]
Safe sequence: P1 → P3 → P4 → P2 → P0`
      },
      "Synchronisation": {
        explanation: "Process synchronisation ensures multiple processes access shared resources in a controlled manner to avoid race conditions.",
        details: [
          "Race condition: outcome depends on execution order",
          "Critical section: code accessing shared resource",
          "Requirements: Mutual exclusion, Progress, Bounded waiting",
          "Mechanisms: Mutex, Semaphore, Monitor, Spinlock"
        ],
        example: `// Semaphore in C (POSIX)
sem_t sem;
sem_init(&sem, 0, 1);  // binary semaphore

sem_wait(&sem);    // P: decrement — block if 0
  counter++;       // critical section
sem_post(&sem);    // V: increment — wake blocked

// Mutex (C++)
std::mutex mtx;
void safe_increment() {
    std::lock_guard<std::mutex> guard(mtx);
    shared_data++;  // auto-released when guard destroyed
}`
      },
      "Memory Management": {
        explanation: "Memory management tracks every location (used/free), allocates to processes, and deallocates when done.",
        details: [
          "Paging: physical memory split into fixed-size frames; logical into pages",
          "Segmentation: variable-size segments based on logical divisions",
          "Virtual Memory: illusion of larger memory using disk storage",
          "Page fault: accessing a page not currently in memory"
        ],
        example: `// Address translation (Paging)
page_number = logical_addr / page_size
offset      = logical_addr % page_size

// Example: logical=5000, page_size=4096
page_number = 5000 / 4096 = 1
offset      = 5000 % 4096 = 904
// Page table: page 1 → frame 3
physical    = 3 * 4096 + 904 = 13192

// Page replacement algorithms
FIFO: replace oldest loaded page
LRU:  replace least recently used
OPT:  replace page not used longest in future`
      }
    }
  },
  "DBMS": {
    icon: "ti-database",
    color: "#0F6E56",
    topics: {
      "ER Model": {
        explanation: "The Entity-Relationship model represents real-world objects (entities), their properties (attributes), and relationships between them.",
        details: [
          "Entity: real-world object (Student, Course)",
          "Attribute: property (name, age, ID) — simple, composite, derived, multi-valued",
          "Relationship: association between entities",
          "Cardinality: 1:1, 1:N, M:N"
        ],
        example: `// Cardinality examples
Student ─── ENROLLS ─── Course  (M:N)
Employee ─── WORKS_IN ─── Department (M:1)
Person ─── HAS ─── Passport (1:1)

// Attribute types
Simple:      Age, ID (cannot be divided)
Composite:   FullName → First + Last
Derived:     Age (calculated from DOB)
Multi-valued: PhoneNumbers {111, 222, 333}`
      },
      "Normalisation": {
        explanation: "Normalisation organises a database to reduce data redundancy and improve integrity by decomposing tables according to normal form rules.",
        details: [
          "1NF: all values atomic, no repeating groups",
          "2NF: 1NF + no partial dependencies on composite key",
          "3NF: 2NF + no transitive dependencies",
          "BCNF: every determinant must be a superkey (stricter than 3NF)"
        ],
        example: `// 2NF violation: PK = (OrderID, ProductID)
// ProductID → ProductName  ← partial dependency!
// Fix: separate tables
Order(OrderID, OrderDate)
Product(ProductID, ProductName)
Order_Item(OrderID, ProductID, Qty)

// 3NF violation: EmpID → DeptID → DeptName (transitive!)
// Fix:
Employee(EmpID, EmpName, DeptID)
Department(DeptID, DeptName, DeptLocation)`
      },
      "ACID Properties": {
        explanation: "ACID guarantees that database transactions are processed reliably: Atomicity, Consistency, Isolation, Durability.",
        details: [
          "Atomicity: transaction is all-or-nothing",
          "Consistency: transaction brings DB from one valid state to another",
          "Isolation: concurrent transactions don't interfere",
          "Durability: committed transactions survive system failures"
        ],
        example: `BEGIN TRANSACTION;
    UPDATE accounts SET balance = balance - 100 WHERE id = 'A';
    UPDATE accounts SET balance = balance + 100 WHERE id = 'B';
COMMIT;

// Isolation levels
READ UNCOMMITTED → dirty reads possible
READ COMMITTED   → prevents dirty reads
REPEATABLE READ  → prevents non-repeatable reads
SERIALIZABLE     → strictest, prevents phantom reads`
      },
      "SQL Joins": {
        explanation: "SQL JOINs combine rows from two or more tables based on a related column.",
        details: [
          "INNER JOIN: only matching rows from both tables",
          "LEFT JOIN: all rows from left + matching from right (NULLs for no match)",
          "RIGHT JOIN: all rows from right + matching from left",
          "FULL OUTER JOIN: all rows from both tables",
          "SELF JOIN: table joined with itself"
        ],
        example: `-- INNER JOIN: only students with departments
SELECT s.Name, d.DeptName
FROM Students s
INNER JOIN Department d ON s.DeptID = d.DeptID;

-- LEFT JOIN: all students (even without dept → NULL)
SELECT s.Name, d.DeptName
FROM Students s
LEFT JOIN Department d ON s.DeptID = d.DeptID;

-- Self JOIN: employees and their managers
SELECT e.Name AS Employee, m.Name AS Manager
FROM Employee e LEFT JOIN Employee m ON e.ManagerID = m.EmpID;`
      },
      "Indexing": {
        explanation: "An index (typically B-tree) improves data retrieval speed by providing fast lookup without scanning every row.",
        details: [
          "Clustered index: data rows sorted by index key (one per table)",
          "Non-clustered: separate structure pointing to data rows",
          "Trade-off: faster reads, slower writes (index must be maintained)"
        ],
        example: `-- Without index: full table scan O(n)
SELECT * FROM Students WHERE Name = 'Alice';

-- Create index: O(log n) lookup
CREATE INDEX idx_name ON Students(Name);

-- Composite index
CREATE INDEX idx_dept_age ON Employee(DeptID, Age);

-- Check query plan (PostgreSQL)
EXPLAIN SELECT * FROM Students WHERE Name = 'Alice';`
      }
    }
  },
  "Data Structures": {
    icon: "ti-binary-tree",
    color: "#7F77DD",
    topics: {
      "Arrays & Strings": {
        explanation: "Arrays store elements of same type in contiguous memory, providing O(1) access by index. Strings are character arrays.",
        details: [
          "Access: O(1); Search: O(n); Insert/Delete at position: O(n)",
          "Dynamic arrays (ArrayList): amortised O(1) append",
          "String immutability in Java — use StringBuilder for mutations"
        ],
        example: `int[] arr = {10, 20, 30, 40, 50};
int x = arr[2];    // O(1) → 30

// 2D array
int[][] matrix = {{1,2,3},{4,5,6},{7,8,9}};

// StringBuilder vs String concatenation
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++)
    sb.append(i);  // O(n) — efficient
// String s = "" + i + ...;  // O(n²) — creates new object each time`
      },
      "Linked List": {
        explanation: "A linked list connects nodes by pointers. Dynamic size, efficient insert/delete at known position.",
        details: [
          "Singly linked: each node → next",
          "Doubly linked: each node ↔ prev and next",
          "No random access; must traverse from head: O(n)"
        ],
        example: `class Node { int data; Node next; }

void prepend(int data) {          // O(1)
    Node n = new Node(data);
    n.next = head; head = n;
}

// Fast & slow pointer — detect cycle
Node slow = head, fast = head;
while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow == fast) return true; // cycle!
}`
      },
      "Stack & Queue": {
        explanation: "Stack: LIFO — push/pop from same end. Queue: FIFO — enqueue at rear, dequeue from front.",
        details: [
          "Stack — Push O(1), Pop O(1): undo/redo, expression evaluation, DFS",
          "Queue — Enqueue O(1), Dequeue O(1): BFS, process scheduling",
          "Deque: double-ended queue — works as both"
        ],
        example: `// Stack
Stack<Integer> s = new Stack<>();
s.push(10); s.push(20); s.push(30);
s.pop();   // 30  s.peek(); // 20

// Queue
Queue<Integer> q = new LinkedList<>();
q.offer(10); q.offer(20);
q.poll();    // 10  q.peek(); // 20

// Monotonic stack — next greater element
int[] nextGreater(int[] arr) {
    Stack<Integer> st = new Stack<>();
    int[] res = new int[arr.length];
    for (int i = arr.length-1; i >= 0; i--) {
        while (!st.isEmpty() && st.peek() <= arr[i]) st.pop();
        res[i] = st.isEmpty() ? -1 : st.peek();
        st.push(arr[i]);
    }
    return res;
}`
      },
      "Binary Tree": {
        explanation: "A binary tree is a hierarchical structure where each node has at most two children. BST adds the ordering property.",
        details: [
          "Inorder (LNR): sorted output for BST",
          "Preorder (NLR): copy/serialise tree",
          "Postorder (LRN): delete tree, evaluate expression",
          "BST search: O(h) — O(log n) balanced, O(n) skewed"
        ],
        example: `//       5
//      / \\
//     3   7
//    / \\ / \\
//   2  4 6  8

// Inorder:   2,3,4,5,6,7,8 (sorted!)
// Preorder:  5,3,2,4,7,6,8
// Postorder: 2,4,3,6,8,7,5

void inorder(TreeNode node) {
    if (node == null) return;
    inorder(node.left);
    System.out.print(node.val + " ");
    inorder(node.right);
}`
      },
      "Graph": {
        explanation: "A graph is a collection of vertices connected by edges. Models networks, maps, and relationships.",
        details: [
          "Adjacency List: O(V+E) space — best for sparse graphs",
          "Adjacency Matrix: O(V²) space — fast edge lookup",
          "Directed (digraph) vs Undirected; Weighted vs Unweighted"
        ],
        example: `// Adjacency List (space-efficient)
Map<Integer, List<Integer>> graph = new HashMap<>();
graph.put(0, Arrays.asList(1, 2));
graph.put(1, Arrays.asList(0, 3));

// BFS — level by level (shortest path)
void bfs(int src) {
    boolean[] vis = new boolean[n];
    Queue<Integer> q = new LinkedList<>();
    vis[src] = true; q.offer(src);
    while (!q.isEmpty()) {
        int u = q.poll();
        for (int v : graph.get(u))
            if (!vis[v]) { vis[v] = true; q.offer(v); }
    }
}`
      },
      "Heap": {
        explanation: "A heap is a complete binary tree satisfying the heap property. Min-heap: parent ≤ children. Used in priority queues.",
        details: [
          "Insert O(log n), Extract-min/max O(log n), Peek O(1)",
          "Stored as array: parent at i, children at 2i+1 and 2i+2",
          "Used in: Heap Sort, Priority Queue, Dijkstra's"
        ],
        example: `// Min-heap (Java)
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.offer(5); minHeap.offer(3); minHeap.offer(8);
minHeap.peek();  // 3 (min, no removal)
minHeap.poll();  // 3 (remove min)

// Max-heap
PriorityQueue<Integer> maxHeap =
    new PriorityQueue<>(Collections.reverseOrder());

// K largest elements
PriorityQueue<Integer> pq = new PriorityQueue<>();
for (int x : nums) {
    pq.offer(x);
    if (pq.size() > k) pq.poll();  // keep only k largest
}`
      }
    }
  },
  "Algorithms": {
    icon: "ti-sort-ascending",
    color: "#BA7517",
    topics: {
      "Sorting": {
        explanation: "Sorting algorithms arrange elements in order. Each has different time/space trade-offs and stability properties.",
        details: [
          "Merge Sort: O(n log n) all cases, stable, O(n) space",
          "Quick Sort: O(n log n) avg, O(n²) worst, in-place, fastest in practice",
          "Heap Sort: O(n log n) all cases, in-place, not stable",
          "Counting/Radix Sort: O(n+k) — non-comparison, for integers"
        ],
        example: `// Merge Sort
void mergeSort(int[] arr, int l, int r) {
    if (l >= r) return;
    int mid = l + (r-l)/2;
    mergeSort(arr, l, mid);
    mergeSort(arr, mid+1, r);
    merge(arr, l, mid, r);
}

// Quick Sort
void quickSort(int[] arr, int lo, int hi) {
    if (lo < hi) {
        int pi = partition(arr, lo, hi);
        quickSort(arr, lo, pi-1);
        quickSort(arr, pi+1, hi);
    }
}

// Sorting cheat sheet:
// Need stable sort → Merge Sort
// Best avg performance → Quick Sort
// External sorting → Merge Sort
// Simple, small arrays → Insertion Sort`
      },
      "Binary Search": {
        explanation: "Binary search finds an element in a sorted array by repeatedly halving the search space. O(log n) time.",
        details: [
          "Precondition: array must be sorted",
          "Each step eliminates half the remaining elements",
          "Template: find first/last occurrence, lower/upper bound"
        ],
        example: `int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left  = mid + 1;
        else                   right = mid - 1;
    }
    return -1;
}

// Find first occurrence (leftmost)
int lo = 0, hi = n - 1, ans = -1;
while (lo <= hi) {
    int mid = (lo + hi) / 2;
    if (arr[mid] == target) { ans = mid; hi = mid - 1; }
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
}`
      },
      "Dynamic Programming": {
        explanation: "DP solves complex problems by breaking them into overlapping subproblems, solving each once, and storing results.",
        details: [
          "Memoization: top-down recursion + cache",
          "Tabulation: bottom-up iterative table",
          "Requires: Optimal Substructure + Overlapping Subproblems"
        ],
        example: `// LCS (Longest Common Subsequence)
int lcs(String X, String Y) {
    int m = X.length(), n = Y.length();
    int[][] dp = new int[m+1][n+1];
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = X.charAt(i-1)==Y.charAt(j-1)
                        ? dp[i-1][j-1]+1
                        : Math.max(dp[i-1][j], dp[i][j-1]);
    return dp[m][n];
}

// 0/1 Knapsack
for (int i = 1; i <= n; i++)
    for (int w = W; w >= wt[i-1]; w--)
        dp[w] = Math.max(dp[w], val[i-1] + dp[w-wt[i-1]]);`
      },
      "Big O Notation": {
        explanation: "Big O describes the upper bound of an algorithm's time or space complexity as input size n grows.",
        details: [
          "O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)",
          "Drop constants: 5n → O(n); 3n² + 2n → O(n²)",
          "Best (Ω), Average (Θ), Worst case (O)"
        ],
        example: `O(1)       : arr[0], hash table get
O(log n)   : binary search, balanced BST
O(n)       : linear scan, linear search
O(n log n) : merge sort, heap sort, quicksort avg
O(n²)      : bubble sort, nested loops
O(2ⁿ)      : all subsets, naive Fibonacci
O(n!)      : all permutations, TSP brute force`
      },
      "Greedy Algorithms": {
        explanation: "Greedy makes the locally optimal choice at each step, hoping to reach the global optimum.",
        details: [
          "Greedy Choice Property: local optimal → global optimal",
          "Works for: Activity Selection, Fractional Knapsack, Huffman, Dijkstra",
          "Does NOT work for: 0/1 Knapsack (needs DP)"
        ],
        example: `// Activity Selection — sort by finish time
Arrays.sort(activities, (a,b) -> a.end - b.end);
int count = 1, lastEnd = activities[0].end;
for (int i = 1; i < n; i++)
    if (activities[i].start >= lastEnd) {
        count++; lastEnd = activities[i].end;
    }

// Fractional Knapsack — sort by value/weight ratio
Arrays.sort(items, (a,b) -> Double.compare(
    (double)b.value/b.weight, (double)a.value/a.weight));
double total = 0;
for (Item item : items) {
    if (capacity >= item.weight) { total += item.value; capacity -= item.weight; }
    else { total += item.value * (double)capacity/item.weight; break; }
}`
      }
    }
  },
  "OOPs": {
    icon: "ti-box",
    color: "#D85A30",
    topics: {
      "Class & Object": {
        explanation: "A class is a blueprint for creating objects. An object is a runtime instance of a class with its own state.",
        details: [
          "Fields hold state; methods operate on state",
          "Constructor: special method called when object is created",
          "static members belong to class, not individual instances",
          "Access modifiers: public, private, protected, default"
        ],
        example: `public class BankAccount {
    private String owner;
    private double balance;
    private static int count = 0;  // class-level

    public BankAccount(String owner, double initial) {
        this.owner = owner;
        this.balance = initial;
        count++;
    }

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
    public double getBalance() { return balance; }
    public static int getCount() { return count; }
}`
      },
      "Inheritance & Polymorphism": {
        explanation: "Inheritance allows child classes to inherit from parent. Polymorphism means different objects respond to the same method call differently.",
        details: [
          "extends (Java): single class inheritance",
          "Method overriding: child redefines parent method",
          "Runtime polymorphism: JVM calls correct version based on actual type",
          "Compile-time polymorphism: method overloading"
        ],
        example: `class Animal {
    public void makeSound() { System.out.println("..."); }
}

class Dog extends Animal {
    @Override
    public void makeSound() { System.out.println("Woof!"); }
}

// Runtime polymorphism
Animal[] animals = { new Dog(), new Cat() };
for (Animal a : animals) a.makeSound(); // calls correct version

// Compile-time (overloading)
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }`
      },
      "Abstract Classes & Interfaces": {
        explanation: "Abstract classes provide partial implementation. Interfaces define a contract of capabilities a class must implement.",
        details: [
          "Abstract class: cannot instantiate, can have abstract + concrete methods",
          "Interface: all abstract by default; Java 8+ allows default/static methods",
          "Class can extend one class but implement multiple interfaces",
          "Use abstract class for IS-A; interface for capability (Flyable, Comparable)"
        ],
        example: `abstract class Shape {
    abstract double area();            // must override
    public String describe() {
        return "Area: " + area();      // concrete method
    }
}

interface Printable    { void print(); }
interface Serializable { byte[] serialize(); }

class Document implements Printable, Serializable {
    public void print()       { /* ... */ }
    public byte[] serialize() { /* ... */ }
}

// Interface default method (Java 8+)
interface Greet {
    default String greet() { return "Hello!"; }
}`
      }
    }
  },
  "DAA": {
    icon: "ti-math-function",
    color: "#6B3FA0",
    topics: {
      "Asymptotic Notations": {
        explanation: "Asymptotic notations describe algorithm efficiency as input size grows without hardware dependence.",
        details: [
          "Big O (O): upper bound — worst-case guarantee",
          "Omega (Ω): lower bound — best-case guarantee",
          "Theta (Θ): tight bound — average/exact behaviour",
          "O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)"
        ],
        example: `// Simplification rules
O(3n² + 5n + 1) → O(n²)   // drop constants & lower terms
O(n + log n)    → O(n)

// Common complexities
O(1)       : array access, hash lookup
O(log n)   : binary search, balanced BST
O(n)       : linear scan
O(n log n) : merge sort, heap sort
O(n²)      : bubble sort (worst), nested loops
O(2ⁿ)      : all subsets, Fibonacci naive
O(n!)      : all permutations, TSP brute force`
      },
      "Divide and Conquer": {
        explanation: "D&C breaks a problem into smaller subproblems, solves each recursively, then combines results.",
        details: [
          "Divide: split into smaller subproblems",
          "Conquer: solve each recursively (base case stops recursion)",
          "Combine: merge subproblem solutions",
          "Recurrence T(n)=2T(n/2)+n → Θ(n log n) by Master Theorem"
        ],
        example: `// Merge Sort — classic D&C
void mergeSort(int[] arr, int l, int r) {
    if (l >= r) return;
    int mid = l + (r-l)/2;
    mergeSort(arr, l, mid);
    mergeSort(arr, mid+1, r);
    merge(arr, l, mid, r);
}

// Power x^n in O(log n)
double power(double x, int n) {
    if (n == 0) return 1;
    double half = power(x, n/2);
    if (n % 2 == 0) return half * half;
    return x * half * half;
}`
      },
      "Greedy Method": {
        explanation: "Greedy builds a solution piece by piece, always choosing the locally optimal option hoping for a globally optimal solution.",
        details: [
          "Works when: Greedy Choice Property + Optimal Substructure",
          "Activity Selection, Fractional Knapsack, Huffman Coding",
          "Prim's MST, Kruskal's MST, Dijkstra's shortest path",
          "Does NOT work for: 0/1 Knapsack (needs DP)"
        ],
        example: `// Minimum Spanning Tree — Kruskal's (Greedy)
// Sort edges by weight; add if no cycle (use DSU)
Arrays.sort(edges, (a,b) -> a.weight - b.weight);
DSU dsu = new DSU(V);
for (Edge e : edges)
    if (dsu.union(e.u, e.v))  // no cycle
        mst.add(e);

// Dijkstra's Shortest Path (Greedy with PQ)
PriorityQueue<int[]> pq = new PriorityQueue<>((a,b) -> a[1]-b[1]);
pq.offer(new int[]{src, 0});
while (!pq.isEmpty()) {
    int[] curr = pq.poll();
    for (int[] nb : graph.get(curr[0]))
        if (dist[curr[0]] + nb[1] < dist[nb[0]])
            pq.offer(new int[]{nb[0], dist[nb[0]] = dist[curr[0]] + nb[1]});
}`
      },
      "Backtracking": {
        explanation: "Backtracking builds a solution incrementally, abandoning a path as soon as it violates constraints.",
        details: [
          "State Space Tree: models all possible choices as a tree",
          "Pruning: cut branches that violate constraints early",
          "Applications: N-Queens, Sudoku, Hamiltonian Cycle, Subsets"
        ],
        example: `// N-Queens — backtracking
void solve(int col, boolean[] rows, boolean[] d1, boolean[] d2) {
    if (col == n) { result.add(toBoard()); return; }
    for (int row = 0; row < n; row++) {
        if (rows[row] || d1[row-col+n-1] || d2[row+col]) continue;
        rows[row] = d1[row-col+n-1] = d2[row+col] = true;
        solve(col + 1, rows, d1, d2);
        rows[row] = d1[row-col+n-1] = d2[row+col] = false; // backtrack
    }
}

// General template
void backtrack(state) {
    if (isGoal(state)) { results.add(state); return; }
    for (choice : choices) {
        if (isValid(choice)) {
            applyChoice(choice);
            backtrack(nextState);
            undoChoice(choice);   // backtrack!
        }
    }
}`
      },
      "Branch and Bound": {
        explanation: "Branch and Bound systematically explores the solution space using a state space tree, pruning branches that cannot yield better solutions.",
        details: [
          "Bounding: compute upper/lower bound for each node",
          "Pruning: discard nodes whose bound is worse than current best",
          "LC (Least Cost) search: explore most promising node first",
          "Finds optimal solution; more efficient than backtracking"
        ],
        example: `// B&B for 0/1 Knapsack
// Upper bound at node: take fractional items greedily
double upperBound(int level, int weight, double value) {
    if (weight >= W) return 0;
    double bound = value;
    int j = level + 1, w = weight;
    while (j < n && w + items[j].weight <= W) {
        w += items[j].weight;
        bound += items[j].value;
        j++;
    }
    if (j < n)
        bound += (W - w) * (double)items[j].value / items[j].weight;
    return bound;
}
// If upperBound(node) <= bestSoFar → PRUNE this branch!`
      },
      "NP-Complete": {
        explanation: "Complexity classes classify how hard problems are. NP-Complete problems are the hardest in NP — no known polynomial solution.",
        details: [
          "P: solvable in polynomial time",
          "NP: solution verifiable in polynomial time",
          "NP-Complete: in NP AND NP-Hard (hardest in NP)",
          "Cook's Theorem: SAT is NP-Complete (first proven)",
          "If P=NP: all NP problems solvable efficiently (unsolved!)"
        ],
        example: `// CLASS HIERARCHY
P ⊆ NP ⊆ NP-Hard
NP-Complete = NP ∩ NP-Hard

// P (polynomial): Sorting, Dijkstra, Binary Search

// NP-Complete examples:
  SAT (Boolean Satisfiability) ← Cook's Theorem
  3-SAT, Vertex Cover, Clique
  Hamiltonian Path/Cycle
  TSP (decision version)
  0/1 Knapsack (decision)
  Sudoku (generalised)

// Proving NP-Completeness:
// 1. Show problem is in NP (verifiable in poly time)
// 2. Polynomial reduction from known NP-Complete problem`
      }
    }
  },
  "Competitive Programming": {
    icon: "ti-tournament",
    color: "#B5451B",
    topics: {
      "Sliding Window": {
        explanation: "Sliding Window maintains a window that slides over data, avoiding recomputation. Reduces O(n²) to O(n).",
        details: [
          "Fixed Window: constant size k — slide by one each step",
          "Variable Window: shrink/grow based on condition",
          "Key: only process the change at each step (add right, remove left)"
        ],
        example: `// Fixed Window — max sum subarray of size k
int maxSum(int[] arr, int k) {
    int sum = 0, max = 0;
    for (int i = 0; i < k; i++) sum += arr[i];
    max = sum;
    for (int i = k; i < arr.length; i++) {
        sum += arr[i] - arr[i-k];   // slide
        max = Math.max(max, sum);
    }
    return max;
}

// Variable Window — longest subarray sum ≤ k
int lo = 0, sum = 0, maxLen = 0;
for (int hi = 0; hi < arr.length; hi++) {
    sum += arr[hi];
    while (sum > k) sum -= arr[lo++];  // shrink
    maxLen = Math.max(maxLen, hi - lo + 1);
}`
      },
      "Two Pointers": {
        explanation: "Two Pointers uses two indices that move through data simultaneously, reducing O(n²) to O(n).",
        details: [
          "Left & Right: start at ends, move inward",
          "Fast & Slow: different speeds (Floyd's cycle detection)",
          "Applications: pair sum in sorted array, palindrome, remove duplicates"
        ],
        example: `// Two Sum in sorted array
int[] twoSum(int[] arr, int target) {
    int l = 0, r = arr.length - 1;
    while (l < r) {
        int sum = arr[l] + arr[r];
        if (sum == target) return new int[]{l, r};
        if (sum < target) l++;
        else r--;
    }
    return new int[]{-1, -1};
}

// Remove duplicates (sorted array, in-place)
int slow = 0;
for (int fast = 1; fast < nums.length; fast++)
    if (nums[fast] != nums[slow]) nums[++slow] = nums[fast];
return slow + 1;`
      },
      "Bit Manipulation": {
        explanation: "Bit manipulation operates on binary representations. Extremely fast (single CPU instruction) and space-efficient.",
        details: [
          "AND (&): clear bits, check if bit set",
          "OR (|): set bits",
          "XOR (^): a^a=0, a^0=a — find unique element, toggle bits",
          "x & (-x): isolates lowest set bit — used in Fenwick Tree"
        ],
        example: `// Common bit tricks
(n & (1 << i)) != 0   // check if bit i is set
n | (1 << i)           // set bit i
n & ~(1 << i)          // clear bit i
n ^ (1 << i)           // toggle bit i
(n & (n-1)) == 0       // check if n is power of 2

// XOR — find single non-repeated element
int unique = 0;
for (int x : arr) unique ^= x;  // pairs cancel out

// Count set bits (Brian Kernighan's)
int count = 0;
while (n > 0) { n &= (n-1); count++; }  // clears lowest set bit`
      },
      "Fenwick Tree": {
        explanation: "A Fenwick Tree (BIT) supports O(log n) point updates and prefix sum queries.",
        details: [
          "Point update: O(log n); Prefix sum: O(log n)",
          "x & (-x) isolates lowest set bit to navigate the tree",
          "Range sum: prefixSum(r) - prefixSum(l-1)"
        ],
        example: `class BIT {
    int[] tree; int n;
    BIT(int n) { this.n = n; tree = new int[n+1]; }

    void update(int i, int val) {     // 1-indexed
        for (; i <= n; i += i & (-i)) tree[i] += val;
    }

    int query(int i) {                // prefix sum [1..i]
        int sum = 0;
        for (; i > 0; i -= i & (-i)) sum += tree[i];
        return sum;
    }

    int rangeQuery(int l, int r) { return query(r) - query(l-1); }
}`
      },
      "Segment Tree": {
        explanation: "A Segment Tree supports O(log n) range queries (sum/min/max) and point/range updates.",
        details: [
          "Build: O(n); Query: O(log n); Update: O(log n)",
          "Lazy propagation: deferred range updates",
          "More powerful than BIT — supports range min/max/GCD"
        ],
        example: `class SegTree {
    int[] tree; int n;
    SegTree(int[] arr) {
        n = arr.length; tree = new int[4*n];
        build(arr, 0, 0, n-1);
    }
    void build(int[] arr, int node, int l, int r) {
        if (l == r) { tree[node] = arr[l]; return; }
        int mid = (l+r)/2;
        build(arr, 2*node+1, l, mid);
        build(arr, 2*node+2, mid+1, r);
        tree[node] = tree[2*node+1] + tree[2*node+2];
    }
    int query(int node, int l, int r, int ql, int qr) {
        if (qr < l || r < ql) return 0;
        if (ql <= l && r <= qr) return tree[node];
        int mid = (l+r)/2;
        return query(2*node+1,l,mid,ql,qr) + query(2*node+2,mid+1,r,ql,qr);
    }
}`
      },
      "Trie": {
        explanation: "A Trie (Prefix Tree) stores strings for O(L) insert, search, and prefix-match where L is string length.",
        details: [
          "Each node has up to 26 children (lowercase English)",
          "isEndOfWord flag marks complete words",
          "Applications: autocomplete, spell-check, word search"
        ],
        example: `class TrieNode { TrieNode[] ch = new TrieNode[26]; boolean end; }

class Trie {
    TrieNode root = new TrieNode();

    void insert(String w) {
        TrieNode n = root;
        for (char c : w.toCharArray()) {
            int i = c - 'a';
            if (n.ch[i] == null) n.ch[i] = new TrieNode();
            n = n.ch[i];
        }
        n.end = true;
    }

    boolean startsWith(String prefix) {
        TrieNode n = root;
        for (char c : prefix.toCharArray()) {
            int i = c - 'a';
            if (n.ch[i] == null) return false;
            n = n.ch[i];
        }
        return true;  // prefix exists
    }
}`
      },
      "DSU (Union Find)": {
        explanation: "Disjoint Set Union efficiently tracks partitions. Near-O(1) union and find with path compression and union by rank.",
        details: [
          "Find: returns root/representative of element's set",
          "Union: merges two sets",
          "Path Compression + Union by Rank → O(α(n)) ≈ O(1)"
        ],
        example: `class DSU {
    int[] parent, rank;
    DSU(int n) {
        parent = new int[n]; rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int x) {  // path compression
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    boolean union(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;  // same set → cycle!
        if (rank[px] < rank[py]) { int t=px; px=py; py=t; }
        parent[py] = px;
        if (rank[px] == rank[py]) rank[px]++;
        return true;
    }
}
// Kruskal's MST: sort edges, union if no cycle`
      }
    }
  }
};

export default notesData;