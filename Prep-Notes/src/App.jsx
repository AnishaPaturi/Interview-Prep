// import { useState, useMemo } from "react";

// const notes = {
//   "Operating Systems": {
//     icon: "ti-cpu",
//     color: "#185FA5",
//     topics: {
//       "Process": {
//         explanation: "A process is an instance of a program in execution. It includes the program code, current activity (program counter), stack, data section, and heap. Each process has its own memory space and is independent from other processes.",
//         details: [
//           "States: New → Ready → Running → Waiting → Terminated",
//           "PCB (Process Control Block): stores PID, state, program counter, CPU registers, memory limits, open files",
//           "Types: Foreground (interactive) and Background (daemon) processes"
//         ],
//         example: `// Process states in pseudocode
// Process P = create("program.exe");
// P.state = NEW;         // process being created
// P.state = READY;       // waiting in ready queue
// P.state = RUNNING;     // being executed by CPU
// P.state = WAITING;     // waiting for I/O or event
// P.state = TERMINATED;  // execution completed

// // Fork in C (UNIX)
// #include <unistd.h>
// pid_t pid = fork();
// if (pid == 0) {
//     // Child process
//     printf("Child PID: %d\\n", getpid());
// } else {
//     // Parent process
//     printf("Parent PID: %d, Child PID: %d\\n", getpid(), pid);
// }`
//       },
//       "Thread": {
//         explanation: "A thread is the smallest unit of CPU execution within a process. Multiple threads share the same process memory (code, data, heap) but each has its own stack, registers, and program counter. Threads are lighter than processes.",
//         details: [
//           "User-level threads: managed by user libraries (faster context switch)",
//           "Kernel-level threads: managed by OS kernel (true parallelism)",
//           "Benefits: faster creation, shared memory, efficient communication"
//         ],
//         example: `// Java Thread example
// class MyThread extends Thread {
//     public void run() {
//         System.out.println("Thread running: " + getName());
//     }
// }
// MyThread t1 = new MyThread();
// t1.start();  // creates new thread, calls run()

// // Runnable interface (preferred)
// Runnable r = () -> System.out.println("Lambda thread");
// Thread t2 = new Thread(r);
// t2.start();

// // Python threading
// import threading
// def task():
//     print("Thread:", threading.current_thread().name)

// t = threading.Thread(target=task)
// t.start()
// t.join()  # wait for thread to finish`
//       },
//       "Process Scheduling": {
//         explanation: "Process scheduling is the activity of the process manager that handles the removal of running process from CPU and selection of another process on basis of a strategy. The scheduler manages the ready queue.",
//         details: [
//           "Long-term scheduler: decides which processes enter ready queue from disk",
//           "Short-term scheduler (CPU scheduler): selects from ready queue → runs on CPU",
//           "Medium-term scheduler: swapping processes in/out of memory",
//           "Scheduling criteria: CPU utilization, throughput, turnaround time, waiting time, response time"
//         ],
//         example: `// Key scheduling metrics
// Arrival Time (AT):  when process enters ready queue
// Burst Time (BT):    CPU time required to complete
// Completion Time (CT): when process finishes
// Turnaround Time (TAT) = CT - AT
// Waiting Time (WT) = TAT - BT
// Response Time = first_response_time - AT

// // Example
// Process  AT  BT  CT  TAT  WT
// P1       0   4   4   4    0
// P2       1   3   7   6    3
// P3       2   1   5   3    2
// Average TAT = (4+6+3)/3 = 4.33
// Average WT  = (0+3+2)/3 = 1.67`
//       },
//       "CPU Scheduling Algorithms": {
//         explanation: "CPU scheduling algorithms determine the order in which processes in the ready queue get CPU time. Different algorithms optimize for different goals.",
//         details: [
//           "FCFS (First Come First Served): non-preemptive, simple, convoy effect",
//           "SJF (Shortest Job First): optimal avg wait time, starvation possible",
//           "SRTF (Shortest Remaining Time First): preemptive SJF",
//           "Round Robin: preemptive, uses time quantum, good for time-sharing",
//           "Priority Scheduling: CPU goes to highest priority; aging prevents starvation",
//           "Multilevel Queue: multiple queues with different priorities"
//         ],
//         example: `// Round Robin example (Quantum = 2)
// Processes: P1(BT=4), P2(BT=3), P3(BT=1)

// Gantt Chart:
// | P1 | P2 | P3 | P1 | P2 |
// 0    2    4    5    7    8

// P1: CT=7, TAT=7, WT=3
// P2: CT=8, TAT=8, WT=5
// P3: CT=5, TAT=5, WT=4

// // FCFS example
// Processes arrive: P1(AT=0,BT=5), P2(AT=1,BT=3), P3(AT=2,BT=1)
// Gantt: | P1 | P2 | P3 |
//         0    5    8    9
// // SJF would order: P3→P2→P1 (shorter jobs first)`
//       },
//       "Deadlock": {
//         explanation: "A deadlock is a situation where a set of processes are blocked, each waiting for a resource held by another process in the set. No progress is possible.",
//         details: [
//           "Four necessary conditions (Coffman conditions): Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait",
//           "Prevention: eliminate one of the four conditions",
//           "Avoidance: Banker's Algorithm — safe state analysis",
//           "Detection: Resource Allocation Graph (RAG); cycle = deadlock",
//           "Recovery: process termination or resource preemption"
//         ],
//         example: `// Deadlock scenario
// Thread T1:          Thread T2:
// lock(A);            lock(B);
// lock(B); // waits   lock(A); // waits
// // DEADLOCK!

// // Banker's Algorithm (Safe State Check)
// Available: [3, 3, 2]     (A, B, C resources)
// Allocation:   Need:
// P0: [0,1,0]   [7,4,3]
// P1: [2,0,0]   [1,2,2]
// P2: [3,0,2]   [6,0,0]
// P3: [2,1,1]   [0,1,1]
// P4: [0,0,2]   [4,3,1]

// Safe sequence: P1→P3→P4→P2→P0
// // Each process can finish with available resources`
//       },
//       "Starvation": {
//         explanation: "Starvation occurs when a process waits indefinitely because other higher-priority processes keep getting resources. Common in priority scheduling. Solution: Aging — gradually increase priority of waiting processes.",
//         details: [
//           "Aging: increase priority of waiting processes over time",
//           "Different from deadlock: process CAN run, just never gets scheduled",
//           "Common in SJF (long jobs starve) and priority scheduling"
//         ],
//         example: `// Starvation example - Priority Scheduling
// P1 (priority=1, BT=5) — always preempted
// P2 (priority=5, BT=3) — runs immediately
// P3 (priority=5, BT=2) — runs immediately
// // P1 never gets CPU time = Starvation

// // Aging Solution
// Every T seconds, increase waiting process priority by 1
// Initial priority of P1 = 1
// After 10s: priority = 2
// After 20s: priority = 3
// ... eventually P1 gets scheduled`
//       },
//       "Synchronization": {
//         explanation: "Process synchronization ensures that multiple processes/threads access shared resources in a controlled manner to avoid race conditions and ensure data consistency.",
//         details: [
//           "Race condition: outcome depends on execution order",
//           "Critical section: code segment accessing shared resource",
//           "Requirements: Mutual exclusion, Progress, Bounded waiting",
//           "Mechanisms: Mutex, Semaphore, Monitor, Spinlock"
//         ],
//         example: `// Race condition example
// int counter = 0;
// // Thread 1: counter++
// // Thread 2: counter++
// // Expected: 2, Actual: may be 1 (race!)

// // Machine level breakdown:
// // T1: READ counter (gets 0)
// // T2: READ counter (gets 0)
// // T1: counter = 0+1 = 1, WRITE
// // T2: counter = 0+1 = 1, WRITE
// // Final: 1 (WRONG! should be 2)

// // Solution: synchronize access to counter`
//       },
//       "Semaphores": {
//         explanation: "A semaphore is a synchronization tool — an integer variable accessed only through two atomic operations: wait (P/down) and signal (V/up). Used to control access to shared resources.",
//         details: [
//           "Binary semaphore (mutex): values 0 or 1 — mutual exclusion",
//           "Counting semaphore: any non-negative integer — resource counting",
//           "wait(S): if S>0, S--; else block process",
//           "signal(S): S++; if processes blocked, wake one"
//         ],
//         example: `// Semaphore in C (POSIX)
// #include <semaphore.h>
// sem_t sem;
// sem_init(&sem, 0, 1);  // init to 1 (binary)

// // Critical section using semaphore
// sem_wait(&sem);    // P operation: S--
// // --- critical section ---
// counter++;
// // --- end critical section ---
// sem_sem(&sem);     // V operation: S++

// // Producer-Consumer with semaphore
// sem_t full, empty, mutex;
// sem_init(&full, 0, 0);   // items in buffer
// sem_init(&empty, 0, N);  // empty slots
// sem_init(&mutex, 0, 1);  // mutual exclusion

// // Producer:
// sem_wait(&empty);   // wait for empty slot
// sem_wait(&mutex);
// // add item to buffer
// sem_post(&mutex);
// sem_post(&full);    // signal item available

// // Consumer:
// sem_wait(&full);    // wait for item
// sem_wait(&mutex);
// // remove item from buffer
// sem_post(&mutex);
// sem_post(&empty);   // signal slot free`
//       },
//       "Mutex": {
//         explanation: "A Mutex (Mutual Exclusion lock) is a locking mechanism ensuring only one thread can access a resource at a time. Unlike semaphore, only the thread that locked a mutex can unlock it.",
//         details: [
//           "Binary state: locked or unlocked",
//           "Ownership: only the locking thread can unlock",
//           "Prevents race conditions in critical sections",
//           "Deadlock risk if not used carefully"
//         ],
//         example: `// C++ std::mutex
// #include <mutex>
// std::mutex mtx;
// int shared_data = 0;

// void increment() {
//     mtx.lock();         // acquire lock
//     shared_data++;      // critical section
//     mtx.unlock();       // release lock
// }

// // Better: std::lock_guard (RAII - auto unlock)
// void safe_increment() {
//     std::lock_guard<std::mutex> guard(mtx);
//     shared_data++;
// }   // guard destroyed here → auto unlock

// // Python
// import threading
// lock = threading.Lock()
// counter = 0

// def increment():
//     global counter
//     with lock:          # acquire and auto-release
//         counter += 1`
//       },
//       "Critical Section": {
//         explanation: "A critical section is a segment of code that accesses shared resources (variables, files, etc.) that must not be accessed by more than one process at a time. Proper management ensures data integrity.",
//         details: [
//           "Entry section: code requesting permission to enter",
//           "Critical section: actual shared resource access",
//           "Exit section: code releasing permission",
//           "Remainder section: rest of the code"
//         ],
//         example: `// Structure of a process with critical section
// do {
//     // ENTRY SECTION
//     acquire_lock();
    
//     // CRITICAL SECTION
//     // access/modify shared resource
//     shared_variable++;
    
//     // EXIT SECTION
//     release_lock();
    
//     // REMAINDER SECTION
//     // non-critical code
// } while(true);

// // Peterson's Solution (2 processes)
// // For P0:
// flag[0] = true;      // I want to enter
// turn = 1;            // give chance to other
// while(flag[1] && turn == 1); // wait
// // CRITICAL SECTION
// flag[0] = false;     // I'm done`
//       },
//       "Paging": {
//         explanation: "Paging is a memory management scheme that eliminates the need for contiguous memory allocation. Physical memory is divided into fixed-size frames; logical memory into pages of the same size. A page table maps logical to physical addresses.",
//         details: [
//           "Page size = Frame size (typically 4KB)",
//           "Internal fragmentation possible (last page may not be full)",
//           "No external fragmentation",
//           "Page table stored in memory; TLB (cache) speeds up translation"
//         ],
//         example: `// Address translation
// Logical address: page_number | offset
// page_number = logical_addr / page_size
// offset = logical_addr % page_size

// Example:
// Page size = 4KB = 4096 bytes
// Logical address = 5000

// Page number = 5000 / 4096 = 1
// Offset      = 5000 % 4096 = 904

// Page table: page 1 → frame 3
// Physical address = frame * page_size + offset
//                  = 3 * 4096 + 904 = 13192

// // TLB (Translation Lookaside Buffer)
// // Fast associative cache for page table entries
// // TLB hit: direct physical address
// // TLB miss: go to page table in memory`
//       },
//       "Segmentation": {
//         explanation: "Segmentation divides memory into variable-size segments based on logical divisions (code, stack, heap, data). Each segment has a name/number and length. A segment table maps segment numbers to base addresses.",
//         details: [
//           "Supports user's logical view of memory",
//           "Segment table: base address + limit for each segment",
//           "External fragmentation possible",
//           "No internal fragmentation"
//         ],
//         example: `// Segment table structure
// Segment  Base    Limit
//   0      1400    1000   // code segment
//   1      6300    400    // stack segment
//   2      4300    400    // data segment

// // Address translation
// Logical address = (segment, offset)
// Physical address = base[segment] + offset
// (if offset < limit[segment], else segment fault)

// Example: address (2, 100)
// Base of segment 2 = 4300
// Offset = 100 < limit 400 ✓
// Physical = 4300 + 100 = 4400`
//       },
//       "Virtual Memory": {
//         explanation: "Virtual memory is a technique that allows execution of processes not completely in memory. It creates an illusion of a larger memory by using disk storage. Enables multiprogramming and efficient memory use.",
//         details: [
//           "Virtual address space can be larger than physical RAM",
//           "Pages loaded on demand (demand paging)",
//           "Page fault: accessing a page not in memory",
//           "Working set: set of pages a process actively uses"
//         ],
//         example: `// Virtual vs Physical memory
// Virtual Address Space: 0 to 2^32 (4GB on 32-bit)
// Physical RAM: maybe only 1GB

// // When program accesses virtual address:
// 1. Check TLB → if hit, use physical address
// 2. If miss → check page table
// 3. If page in memory → translate address
// 4. If page NOT in memory → PAGE FAULT
// 5. OS loads page from disk to memory frame
// 6. Update page table
// 7. Restart instruction`
//       },
//       "Demand Paging": {
//         explanation: "Demand paging loads pages into memory only when they are needed (on demand), rather than loading all pages at program start. Reduces initial load time and memory usage.",
//         details: [
//           "Lazy swapper: never swaps page into memory unless needed",
//           "Valid-invalid bit: marks if page is in memory",
//           "Page fault handler: loads missing page from disk",
//           "Pure demand paging: start with no pages in memory"
//         ],
//         example: `// Page fault handling steps
// 1. Process references page P
// 2. Check page table: valid bit = 0 (not in memory)
// 3. Trap to OS (page fault)
// 4. OS verifies valid memory reference
// 5. Find free frame in physical memory
// 6. Schedule disk read: load page P into frame
// 7. Update page table: frame number + valid bit = 1
// 8. Restart the instruction that caused fault

// // Page replacement algorithms (when memory full)
// FIFO: replace oldest loaded page
// LRU: replace least recently used
// Optimal: replace page not used longest in future`
//       },
//       "Thrashing": {
//         explanation: "Thrashing occurs when a process spends more time paging (swapping in/out) than executing. CPU utilization drops dramatically. Caused by insufficient frames allocated to a process.",
//         details: [
//           "Working set model: allocate enough frames for active pages",
//           "Page fault frequency: monitor and adjust frame allocation",
//           "When thrashing detected: reduce degree of multiprogramming",
//           "Locality model: process migrates through regions"
//         ],
//         example: `// Thrashing scenario
// Available frames: 10
// 5 processes each need 4 frames minimum
// 5 × 4 = 20 frames needed but only 10 available

// Each process constantly page-faults
// CPU utilization → near 0%
// OS responds by loading more processes → worse!

// // Prevention using Working Set
// W(t, window) = set of pages used in last 'window' references
// Sum of all working sets > available frames → suspend a process
// Sum <= available frames → can admit new process`
//       },
//       "Memory Management": {
//         explanation: "Memory management is the OS function that tracks every memory location (used/free), allocates memory to processes, and deallocates it when done. Goals: efficiency, protection, and sharing.",
//         details: [
//           "Contiguous: fixed partition, variable partition",
//           "Non-contiguous: paging, segmentation, paged segmentation",
//           "Fragmentation: internal (wasted inside partition), external (wasted between)",
//           "Compaction: shuffle memory contents to combine free space"
//         ],
//         example: `// Memory allocation strategies
// First Fit: allocate first hole big enough (fast)
// Best Fit:  allocate smallest hole that fits (least waste, slow)
// Worst Fit: allocate largest hole (maximizes leftover, usually bad)

// // Example - holes: [100KB, 500KB, 200KB, 300KB, 600KB]
// // Request 212KB:
// First Fit → 500KB hole (wastes 288KB)
// Best Fit  → 300KB hole (wastes 88KB)  
// Worst Fit → 600KB hole (wastes 388KB)`
//       },
//       "Cache Memory": {
//         explanation: "Cache memory is a small, fast memory between CPU and RAM that stores frequently accessed data. Exploits locality of reference: spatial (nearby data used soon) and temporal (recently used data used again).",
//         details: [
//           "L1 cache: fastest, smallest, on-chip (~32KB)",
//           "L2 cache: slower, larger (~256KB)",
//           "L3 cache: shared among cores (~8MB)",
//           "Cache hit: data found in cache; cache miss: fetch from RAM",
//           "Hit ratio = hits / (hits + misses)"
//         ],
//         example: `// Cache access time calculation
// Hit time = 10ns, Miss penalty = 100ns, Hit rate = 90%
// AMAT = Hit time + (Miss rate × Miss penalty)
//      = 10 + (0.10 × 100) = 10 + 10 = 20ns

// // Cache mapping
// Direct mapped: each memory block → exactly one cache line
// Fully associative: any block → any cache line
// Set associative: block → specific set, any line in set (compromise)

// // Locality
// Temporal: int sum=0; for(i=0;i<n;i++) sum+=a[i];
// // 'sum' accessed repeatedly → temporal locality

// Spatial: for(int i=0;i<n;i++) sum+=a[i];
// // a[0],a[1],a[2]... → consecutive memory → spatial locality`
//       },
//       "Context Switching": {
//         explanation: "Context switching is the process of saving the state of a currently running process and loading the saved state of the next process. Allows multitasking but introduces overhead.",
//         details: [
//           "Save: PCB of current process (registers, PC, stack pointer)",
//           "Load: PCB of next process",
//           "Pure overhead: no useful work done during switch",
//           "Triggered by: interrupt, system call, time quantum expiry"
//         ],
//         example: `// Context switch sequence
// 1. CPU running Process A
// 2. Timer interrupt fires (time quantum expired)
// 3. Save A's context into PCB_A:
//    - Program Counter: 0x4000
//    - Registers: AX=5, BX=10, ...
//    - Stack Pointer: 0xFF00
//    - State: RUNNING → READY
// 4. Load Process B's context from PCB_B:
//    - Restore registers, PC, SP
//    - State: READY → RUNNING
// 5. CPU resumes Process B from where it left off

// // Context switch time: typically 1-10 microseconds`
//       },
//       "Multitasking": {
//         explanation: "Multitasking is the ability of an OS to run multiple tasks (processes) concurrently. The CPU rapidly switches between tasks, giving the illusion of parallel execution.",
//         details: [
//           "Preemptive multitasking: OS can forcibly take CPU from a process",
//           "Cooperative multitasking: process voluntarily yields CPU",
//           "Time-sharing: each process gets a time slice (quantum)",
//           "Modern OS use preemptive multitasking"
//         ],
//         example: `// Preemptive vs Cooperative
// // Preemptive (modern OS)
// Process A running...
// Timer interrupt → OS saves A, runs B
// (A didn't choose to stop)

// // Cooperative (older OS like Windows 3.x)
// Process A running...
// A calls yield() → OS runs B
// (A chose to give up CPU)

// // Process timeline (time sharing, Q=10ms)
// Time: 0   10   20   30   40ms
//       |P1 |P2 |P1 |P2 |P1...
// // Each process gets 10ms turns`
//       },
//       "Multithreading": {
//         explanation: "Multithreading allows multiple threads of a single process to execute concurrently. Threads share the process's resources but execute independently.",
//         details: [
//           "Benefits: responsiveness, resource sharing, economy, scalability",
//           "Models: Many-to-One, One-to-One, Many-to-Many",
//           "Challenges: race conditions, deadlock, synchronization"
//         ],
//         example: `// Java multithreading
// class Counter {
//     private int count = 0;
    
//     synchronized void increment() {  // thread-safe
//         count++;
//     }
    
//     int getCount() { return count; }
// }

// Counter c = new Counter();
// Thread t1 = new Thread(() -> { for(int i=0;i<1000;i++) c.increment(); });
// Thread t2 = new Thread(() -> { for(int i=0;i<1000;i++) c.increment(); });
// t1.start(); t2.start();
// t1.join(); t2.join();
// System.out.println(c.getCount()); // always 2000 (synchronized)`
//       },
//       "Kernel Mode": {
//         explanation: "Kernel mode (supervisor/privileged mode) is a CPU mode where the OS kernel runs with full access to hardware and all instructions. Critical for system calls and hardware management.",
//         details: [
//           "Full hardware access, all instructions allowed",
//           "Can access entire memory space",
//           "Handles system calls, interrupts, exceptions",
//           "Switching to kernel mode: via system call trap instruction"
//         ],
//         example: `// Mode transitions
// User program calls read() system call
//     ↓
// Trap instruction → switches to Kernel Mode
//     ↓
// OS kernel executes read() with full privileges
// Accesses disk hardware directly
//     ↓
// Returns result, switches back to User Mode
//     ↓
// User program continues

// // Mode bit: 0 = Kernel, 1 = User
// // Privileged instructions only execute in kernel mode`
//       },
//       "User Mode": {
//         explanation: "User mode is a restricted CPU mode where user applications run. Limited instructions available, no direct hardware access. Protection prevents user programs from crashing the OS.",
//         details: [
//           "Restricted instruction set",
//           "Cannot access kernel memory directly",
//           "Uses system calls to request OS services",
//           "Fault in user mode → process terminated, not OS crash"
//         ],
//         example: `// User space vs Kernel space
// User Space (User Mode):
//   - Your C/Java/Python programs
//   - Libraries (libc, JVM)
//   - Cannot directly access hardware

// To access hardware, make a system call:
//   open("file.txt") → syscall → Kernel handles it

// Kernel Space (Kernel Mode):
//   - OS kernel code
//   - Device drivers
//   - Memory management
//   - Process scheduling`
//       },
//       "File System": {
//         explanation: "A file system organizes and stores data on storage devices. It manages file creation, deletion, reading, writing, and directory organization.",
//         details: [
//           "Components: files, directories, metadata",
//           "Common FS: FAT32, NTFS (Windows), ext4 (Linux), APFS (macOS)",
//           "Inode: data structure storing file metadata (Unix/Linux)",
//           "Directory: file containing list of file names and inode numbers"
//         ],
//         example: `// Linux file system structure
// /           root
// ├── bin/    essential binaries
// ├── etc/    configuration files
// ├── home/   user home directories
// ├── var/    variable data (logs)
// ├── tmp/    temporary files
// └── dev/    device files

// // File operations
// open(path, flags)     // open file, return fd
// read(fd, buf, n)      // read n bytes
// write(fd, buf, n)     // write n bytes
// close(fd)             // close file descriptor
// lseek(fd, offset, whence) // move file pointer
// unlink(path)          // delete file`
//       },
//       "Disk Scheduling": {
//         explanation: "Disk scheduling algorithms determine the order in which disk I/O requests are serviced to minimize seek time (time for read/write head to move to correct track).",
//         details: [
//           "FCFS: simple, fair, but poor performance",
//           "SSTF (Shortest Seek Time First): minimum seek, starvation possible",
//           "SCAN (Elevator): move in one direction, reverse — no starvation",
//           "C-SCAN: move one direction only, jump back — uniform wait time",
//           "LOOK/C-LOOK: only go as far as last request (not end of disk)"
//         ],
//         example: `// SCAN algorithm example
// Head at position 50, moving toward high numbers
// Request queue: [82, 170, 43, 140, 24, 16, 190]
// Disk size: 0-199

// SCAN sequence: 50→82→140→170→190→199→43→24→16
// Seek distance: 32+58+30+20+9+156+19+8 = 332

// SSTF sequence: 50→43→24→16→82→140→170→190
// (always pick closest request)
// Seek distance: 7+19+8+66+58+30+20 = 208 (better!)
// But: requests 170,190 may starve`
//       }
//     }
//   },
//   "DBMS": {
//     icon: "ti-database",
//     color: "#0F6E56",
//     topics: {
//       "DBMS Basics": {
//         explanation: "A Database Management System (DBMS) is software that manages databases. It provides an interface between users and databases for storing, retrieving, and managing data efficiently and securely.",
//         details: [
//           "Components: Data, DBMS software, Users, Applications",
//           "Types: Hierarchical, Network, Relational (RDBMS), Object-oriented, NoSQL",
//           "DBMS vs File system: data redundancy control, data integrity, concurrent access, security",
//           "3-level architecture: External, Conceptual, Internal (ANSI/SPARC)"
//         ],
//         example: `// DBMS advantages over file system
// File System Problems → DBMS Solution
// Data redundancy      → Normalization
// Data inconsistency   → Single source of truth
// No data sharing      → Multi-user concurrent access
// Security issues      → Role-based access control
// No backup/recovery   → Transaction management, ACID

// // Database languages
// DDL (Data Definition Language):   CREATE, ALTER, DROP
// DML (Data Manipulation Language): SELECT, INSERT, UPDATE, DELETE
// DCL (Data Control Language):      GRANT, REVOKE
// TCL (Transaction Control):        COMMIT, ROLLBACK, SAVEPOINT`
//       },
//       "ER Model": {
//         explanation: "The Entity-Relationship (ER) model is a conceptual data model representing real-world objects (entities), their properties (attributes), and relationships between them.",
//         details: [
//           "Entity: real-world object with independent existence (Student, Course)",
//           "Attribute: property of entity (name, age, ID)",
//           "Relationship: association between entities (Student ENROLLS Course)",
//           "Cardinality: 1:1, 1:N, M:N"
//         ],
//         example: `// ER Model components
// Entity:      [Student]    [Course]
// Attributes:  Student: {SID, Name, Age}
//              Course: {CID, CourseName, Credits}
// Relationship: Student ─── ENROLLS ─── Course
// Cardinality:  Many-to-Many (M:N)
//               A student can enroll in many courses
//               A course can have many students

// // Attribute types
// Simple:     cannot be divided (Age, ID)
// Composite:  can be divided (FullName → First + Last)
// Derived:    calculated from others (Age from DOB)
// Multi-valued: multiple values (PhoneNumbers: {111,222})
// Key:        uniquely identifies entity (StudentID)`
//       },
//       "Relational Model": {
//         explanation: "The relational model represents data as tables (relations). Each table has rows (tuples) and columns (attributes). Relationships are expressed through keys.",
//         details: [
//           "Relation = table, Tuple = row, Attribute = column",
//           "Domain: set of allowed values for an attribute",
//           "Degree: number of attributes in a relation",
//           "Cardinality: number of tuples in a relation"
//         ],
//         example: `// Relational model example
// STUDENT relation (table):
// ┌──────┬──────────┬─────┬────────┐
// │ SID  │ Name     │ Age │ DeptID │
// ├──────┼──────────┼─────┼────────┤
// │ 101  │ Alice    │ 20  │ CS     │
// │ 102  │ Bob      │ 21  │ EE     │
// │ 103  │ Charlie  │ 19  │ CS     │
// └──────┴──────────┴─────┴────────┘
// Degree = 4 (attributes)
// Cardinality = 3 (tuples)
// Primary Key = SID

// // Relational algebra
// σ (Selection):    σ(Age>20)(Student) → rows where age>20
// π (Projection):   π(Name,Age)(Student) → only Name,Age columns
// ⋈ (Join):         Student ⋈ Department → combined table
// ∪ (Union):        R ∪ S
// ∩ (Intersection): R ∩ S`
//       },
//       "Primary Key": {
//         explanation: "A primary key is a column (or set of columns) that uniquely identifies each row in a table. It must be unique and NOT NULL.",
//         details: [
//           "Must be unique for every row",
//           "Cannot contain NULL values",
//           "Only one primary key per table",
//           "Can be a single or composite column"
//         ],
//         example: `-- Single column primary key
// CREATE TABLE Students (
//     StudentID INT PRIMARY KEY,
//     Name VARCHAR(50),
//     Age INT
// );

// -- Composite primary key
// CREATE TABLE Enrollment (
//     StudentID INT,
//     CourseID INT,
//     PRIMARY KEY (StudentID, CourseID)
//     -- combination must be unique
// );

// INSERT INTO Students VALUES (101, 'Alice', 20);
// INSERT INTO Students VALUES (101, 'Bob', 21);
// -- ERROR: duplicate primary key (101)!`
//       },
//       "Foreign Key": {
//         explanation: "A foreign key is a column in one table that refers to the primary key of another table. It enforces referential integrity — ensuring linked data is consistent.",
//         details: [
//           "Establishes link between two tables",
//           "Value must exist in the referenced table (or be NULL)",
//           "ON DELETE CASCADE: delete child rows when parent deleted",
//           "ON UPDATE CASCADE: update child rows when parent key updated"
//         ],
//         example: `CREATE TABLE Department (
//     DeptID INT PRIMARY KEY,
//     DeptName VARCHAR(50)
// );

// CREATE TABLE Employee (
//     EmpID INT PRIMARY KEY,
//     Name VARCHAR(50),
//     DeptID INT,
//     FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
//     ON DELETE SET NULL
//     ON UPDATE CASCADE
// );

// -- Valid: DeptID 10 exists in Department
// INSERT INTO Employee VALUES (1, 'Alice', 10);

// -- Invalid: DeptID 99 doesn't exist in Department
// INSERT INTO Employee VALUES (2, 'Bob', 99); -- ERROR!`
//       },
//       "Normalization": {
//         explanation: "Normalization is the process of organizing a database to reduce data redundancy and improve data integrity. It involves decomposing tables according to normal form rules.",
//         details: [
//           "Goal: eliminate insertion, update, deletion anomalies",
//           "1NF → 2NF → 3NF → BCNF (increasing strictness)",
//           "Functional dependency: A → B (knowing A determines B)"
//         ],
//         example: `// Unnormalized table (problems!)
// Student_Course:
// SID | SName  | CID  | CName    | Grade | InstructorID | InstructorName
// 101 | Alice  | CS1  | OOP      | A     | I01          | Prof.Smith
// 101 | Alice  | CS2  | DBMS     | B     | I02          | Prof.Jones
// 102 | Bob    | CS1  | OOP      | B     | I01          | Prof.Smith

// Problems:
// - If Prof.Smith changes name → update in many rows (update anomaly)
// - Can't store instructor before they teach (insertion anomaly)
// - Delete last student in CS1 → lose CS1 info (deletion anomaly)`
//       },
//       "1NF": {
//         explanation: "First Normal Form (1NF): A table is in 1NF if all column values are atomic (indivisible), there are no repeating groups, and each row is unique.",
//         details: [
//           "No multi-valued attributes",
//           "No composite attributes (or decompose them)",
//           "Each column must have a single value",
//           "Each row must be unique (has a primary key)"
//         ],
//         example: `// NOT in 1NF (multi-valued attribute)
// Student:
// SID | Name  | Courses
// 101 | Alice | CS1, CS2, CS3  ← violation!

// // Convert to 1NF
// Student_Course:
// SID | Name  | Course
// 101 | Alice | CS1
// 101 | Alice | CS2
// 101 | Alice | CS3

// // Another violation: nested table
// Order: OrderID | Items(ItemID, Qty, Price)
// // Items is a repeating group → not 1NF!
// // Fix: separate Items table with OrderID FK`
//       },
//       "2NF": {
//         explanation: "Second Normal Form (2NF): A table is in 2NF if it is in 1NF and every non-key attribute is fully functionally dependent on the entire primary key (no partial dependencies).",
//         details: [
//           "Only applies to tables with composite primary keys",
//           "Partial dependency: non-key attribute depends on PART of composite key",
//           "Solution: move partially dependent columns to separate table"
//         ],
//         example: `// In 1NF but NOT 2NF
// Order_Item(OrderID, ProductID, Qty, ProductName, OrderDate)
// PK = (OrderID, ProductID)

// Functional dependencies:
// (OrderID, ProductID) → Qty    ✓ full dependency
// ProductID → ProductName       ✗ partial dependency!
// OrderID → OrderDate           ✗ partial dependency!

// // Convert to 2NF - decompose:
// Order(OrderID, OrderDate)
// Product(ProductID, ProductName)
// Order_Item(OrderID, ProductID, Qty)  ← only full deps`
//       },
//       "3NF": {
//         explanation: "Third Normal Form (3NF): A table is in 3NF if it is in 2NF and no non-key attribute is transitively dependent on the primary key (no transitive dependencies).",
//         details: [
//           "Transitive dependency: A → B → C (where A is PK, B and C are non-key)",
//           "Solution: move transitive dependencies to a new table",
//           "3NF: 'non-key attributes depend on the key, the whole key, and nothing but the key'"
//         ],
//         example: `// In 2NF but NOT 3NF
// Employee(EmpID, EmpName, DeptID, DeptName, DeptLocation)
// PK = EmpID

// Dependencies:
// EmpID → DeptID        ✓
// EmpID → EmpName       ✓
// DeptID → DeptName     ← transitive! (EmpID→DeptID→DeptName)
// DeptID → DeptLocation ← transitive!

// // Convert to 3NF:
// Employee(EmpID, EmpName, DeptID)
// Department(DeptID, DeptName, DeptLocation)
// // No more transitive dependencies!`
//       },
//       "BCNF": {
//         explanation: "Boyce-Codd Normal Form (BCNF) is a stronger version of 3NF. A table is in BCNF if for every functional dependency X → Y, X must be a superkey. BCNF handles anomalies that 3NF misses.",
//         details: [
//           "Every determinant must be a candidate key",
//           "3NF allows non-superkey → non-prime attribute",
//           "BCNF does not allow non-superkey to determine anything",
//           "BCNF is stricter than 3NF but may lose some FDs during decomposition"
//         ],
//         example: `// In 3NF but NOT BCNF
// Student_Advisor(StudentID, Subject, Advisor)
// Candidate keys: (StudentID, Subject), (StudentID, Advisor)
// FD: Advisor → Subject (Advisor is NOT a superkey here → violates BCNF)

// // Convert to BCNF:
// Advisor_Subject(Advisor, Subject)
// Student_Advisor(StudentID, Advisor)

// // Note: BCNF decomposition may not always preserve all FDs`
//       },
//       "ACID Properties": {
//         explanation: "ACID properties guarantee that database transactions are processed reliably: Atomicity, Consistency, Isolation, and Durability.",
//         details: [
//           "Atomicity: transaction is all-or-nothing",
//           "Consistency: transaction brings DB from one valid state to another",
//           "Isolation: concurrent transactions don't interfere with each other",
//           "Durability: committed transactions survive system failures"
//         ],
//         example: `// Bank transfer: move $100 from A to B
// BEGIN TRANSACTION;
//     UPDATE accounts SET balance = balance - 100 WHERE id = 'A';
//     UPDATE accounts SET balance = balance + 100 WHERE id = 'B';
// COMMIT;

// Atomicity: if second UPDATE fails → ROLLBACK both
// Consistency: total money in system unchanged
// Isolation: another transaction can't see partial state
// Durability: after COMMIT, data persists even after crash

// // Isolation levels (trade-off: performance vs consistency)
// READ UNCOMMITTED → dirty reads possible
// READ COMMITTED   → prevents dirty reads
// REPEATABLE READ  → prevents non-repeatable reads
// SERIALIZABLE     → strictest, prevents phantom reads`
//       },
//       "Transactions": {
//         explanation: "A transaction is a sequence of database operations treated as a single logical unit of work. It either completes fully (commit) or is entirely undone (rollback).",
//         details: [
//           "BEGIN/START TRANSACTION: marks start",
//           "COMMIT: makes changes permanent",
//           "ROLLBACK: undoes all changes since BEGIN",
//           "SAVEPOINT: partial rollback point"
//         ],
//         example: `BEGIN TRANSACTION;
//     INSERT INTO orders VALUES (1001, 'Alice', '2024-01-15');
//     INSERT INTO order_items VALUES (1001, 'Laptop', 1, 1000);
//     UPDATE inventory SET qty = qty - 1 WHERE item = 'Laptop';
    
//     -- If inventory goes negative, rollback
//     IF (SELECT qty FROM inventory WHERE item='Laptop') < 0 THEN
//         ROLLBACK;
//     ELSE
//         COMMIT;
//     END IF;

// -- Savepoint example
// BEGIN;
//     UPDATE a SET x = 1;
//     SAVEPOINT sp1;
//     UPDATE b SET y = 2;
//     ROLLBACK TO sp1;  -- undo b, keep a
// COMMIT;`
//       },
//       "Joins": {
//         explanation: "SQL JOINs combine rows from two or more tables based on a related column. Essential for querying relational data spread across multiple tables.",
//         details: [
//           "INNER JOIN: only matching rows from both tables",
//           "LEFT JOIN: all rows from left table + matching from right",
//           "RIGHT JOIN: all rows from right table + matching from left",
//           "FULL JOIN: all rows from both tables",
//           "CROSS JOIN: cartesian product of both tables",
//           "SELF JOIN: table joined with itself"
//         ],
//         example: `-- Sample tables
// -- Students: SID, Name, DeptID
// -- Department: DeptID, DeptName

// -- INNER JOIN: only students with departments
// SELECT s.Name, d.DeptName
// FROM Students s
// INNER JOIN Department d ON s.DeptID = d.DeptID;

// -- LEFT JOIN: all students (even without dept)
// SELECT s.Name, d.DeptName
// FROM Students s
// LEFT JOIN Department d ON s.DeptID = d.DeptID;
// -- Students with no dept: DeptName = NULL

// -- FULL OUTER JOIN: all records
// SELECT s.Name, d.DeptName
// FROM Students s
// FULL OUTER JOIN Department d ON s.DeptID = d.DeptID;

// -- SELF JOIN: employees and their managers
// SELECT e.Name AS Employee, m.Name AS Manager
// FROM Employee e
// LEFT JOIN Employee m ON e.ManagerID = m.EmpID;`
//       },
//       "Indexing": {
//         explanation: "An index is a data structure (typically B-tree) that improves data retrieval speed by providing fast lookup. Like a book's index — find data without scanning every row.",
//         details: [
//           "Clustered index: data rows sorted by index key (one per table)",
//           "Non-clustered index: separate structure pointing to data rows",
//           "Composite index: index on multiple columns",
//           "Trade-off: faster reads, slower writes (index must be maintained)"
//         ],
//         example: `-- Without index: full table scan O(n)
// SELECT * FROM Students WHERE Name = 'Alice';
// -- Scans all rows!

// -- Create index
// CREATE INDEX idx_name ON Students(Name);
// -- Now uses B-tree: O(log n) lookup

// CREATE UNIQUE INDEX idx_email ON Users(Email);
// -- Ensures uniqueness + fast lookup

// CREATE INDEX idx_dept_age ON Employee(DeptID, Age);
// -- Composite index: best for queries on DeptID or (DeptID AND Age)

// -- Check if index is used (PostgreSQL)
// EXPLAIN SELECT * FROM Students WHERE Name = 'Alice';

// -- Drop index
// DROP INDEX idx_name;`
//       },
//       "Aggregate Functions": {
//         explanation: "Aggregate functions perform calculations on a set of rows and return a single value. Used with SELECT to summarize data.",
//         details: [
//           "COUNT: number of rows",
//           "SUM: total of values",
//           "AVG: average value",
//           "MIN/MAX: smallest/largest value",
//           "Used with GROUP BY to aggregate per group"
//         ],
//         example: `-- COUNT: number of students
// SELECT COUNT(*) AS TotalStudents FROM Students;
// SELECT COUNT(DISTINCT DeptID) AS Depts FROM Students;

// -- SUM, AVG
// SELECT SUM(Salary) AS TotalPayroll, 
//        AVG(Salary) AS AvgSalary,
//        MIN(Salary) AS MinSal,
//        MAX(Salary) AS MaxSal
// FROM Employees;

// -- GROUP BY: aggregate per department
// SELECT DeptID, 
//        COUNT(*) AS EmpCount,
//        AVG(Salary) AS AvgSal
// FROM Employees
// GROUP BY DeptID;

// -- HAVING: filter groups (like WHERE but for aggregates)
// SELECT DeptID, AVG(Salary) AS AvgSal
// FROM Employees
// GROUP BY DeptID
// HAVING AVG(Salary) > 50000;  -- only high-paying depts`
//       }
//     }
//   },
//   "SQL": {
//     icon: "ti-table",
//     color: "#3B6D11",
//     topics: {
//       "SELECT": {
//         explanation: "SELECT is the most fundamental SQL command used to retrieve data from one or more tables. It can filter, sort, join, and aggregate data.",
//         details: [
//           "SELECT *: all columns",
//           "SELECT col1, col2: specific columns",
//           "Aliases: AS keyword for column/table names",
//           "Order of clauses: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY"
//         ],
//         example: `-- Basic select
// SELECT * FROM Employees;
// SELECT Name, Salary FROM Employees;

// -- Aliases
// SELECT Name AS EmployeeName, Salary AS Pay 
// FROM Employees AS E;

// -- Arithmetic
// SELECT Name, Salary, Salary * 1.1 AS NewSalary
// FROM Employees;

// -- Distinct values
// SELECT DISTINCT DeptID FROM Employees;

// -- Full query example
// SELECT d.DeptName, COUNT(e.EmpID) AS Headcount, AVG(e.Salary) AS AvgPay
// FROM Employees e
// JOIN Department d ON e.DeptID = d.DeptID
// WHERE e.Salary > 30000
// GROUP BY d.DeptName
// HAVING COUNT(e.EmpID) > 5
// ORDER BY AvgPay DESC
// LIMIT 10;`
//       },
//       "WHERE": {
//         explanation: "WHERE clause filters rows based on conditions. Used with SELECT, UPDATE, DELETE to specify which rows to affect.",
//         details: [
//           "Comparison: =, !=, <, >, <=, >=",
//           "Logical: AND, OR, NOT",
//           "BETWEEN, IN, LIKE, IS NULL",
//           "WHERE is evaluated BEFORE GROUP BY"
//         ],
//         example: `-- Basic conditions
// SELECT * FROM Employees WHERE Salary > 50000;
// SELECT * FROM Employees WHERE DeptID = 10 AND Age < 30;

// -- IN operator
// SELECT * FROM Students WHERE Major IN ('CS', 'IT', 'ECE');

// -- BETWEEN (inclusive)
// SELECT * FROM Orders WHERE Amount BETWEEN 100 AND 500;
// -- equivalent to: Amount >= 100 AND Amount <= 500

// -- LIKE for pattern matching
// SELECT * FROM Customers WHERE Name LIKE 'A%';   -- starts with A
// SELECT * FROM Customers WHERE Email LIKE '%@gmail.com';
// SELECT * FROM Products WHERE Code LIKE 'AB_12'; -- _ = any 1 char

// -- NULL checks
// SELECT * FROM Employees WHERE ManagerID IS NULL;  -- top-level managers
// SELECT * FROM Employees WHERE Phone IS NOT NULL;`
//       },
//       "ORDER BY": {
//         explanation: "ORDER BY sorts the result set by one or more columns, either ascending (ASC, default) or descending (DESC). Applied last in query execution.",
//         details: [
//           "ASC: ascending order (default)",
//           "DESC: descending order",
//           "Can sort by multiple columns",
//           "NULL values handled differently per DB (first/last)"
//         ],
//         example: `-- Sort by salary descending
// SELECT Name, Salary FROM Employees 
// ORDER BY Salary DESC;

// -- Multiple column sort
// SELECT Name, DeptID, Salary FROM Employees
// ORDER BY DeptID ASC, Salary DESC;
// -- Sort by dept first, then by salary within each dept

// -- Sort by column alias
// SELECT Name, Salary * 1.2 AS NewSalary 
// FROM Employees
// ORDER BY NewSalary DESC;

// -- Sort by column position (not recommended)
// SELECT Name, Age, Salary FROM Employees
// ORDER BY 3 DESC;  -- sort by 3rd column (Salary)`
//       },
//       "GROUP BY": {
//         explanation: "GROUP BY groups rows with the same values in specified columns into summary rows. Used with aggregate functions to calculate per-group statistics.",
//         details: [
//           "All non-aggregated columns in SELECT must be in GROUP BY",
//           "Executed after WHERE, before HAVING",
//           "Can group by multiple columns",
//           "Produces one row per group"
//         ],
//         example: `-- Count employees per department
// SELECT DeptID, COUNT(*) AS EmpCount
// FROM Employees
// GROUP BY DeptID;

// -- Multiple aggregates
// SELECT DeptID, 
//        COUNT(*) AS Count,
//        AVG(Salary) AS AvgSal,
//        MAX(Salary) AS MaxSal
// FROM Employees
// GROUP BY DeptID;

// -- Group by multiple columns
// SELECT DeptID, JobTitle, AVG(Salary) AS AvgSal
// FROM Employees
// GROUP BY DeptID, JobTitle;
// -- One row per (department, job title) combination

// -- WITH ROLLUP (subtotals)
// SELECT DeptID, JobTitle, SUM(Salary)
// FROM Employees
// GROUP BY DeptID, JobTitle WITH ROLLUP;`
//       },
//       "HAVING": {
//         explanation: "HAVING filters groups after GROUP BY (unlike WHERE which filters rows before grouping). Used to filter based on aggregate function results.",
//         details: [
//           "WHERE filters rows; HAVING filters groups",
//           "HAVING comes after GROUP BY",
//           "Can use aggregate functions in HAVING",
//           "Can be used without GROUP BY (treats all rows as one group)"
//         ],
//         example: `-- Only departments with more than 5 employees
// SELECT DeptID, COUNT(*) AS EmpCount
// FROM Employees
// GROUP BY DeptID
// HAVING COUNT(*) > 5;

// -- WHERE + HAVING together
// SELECT DeptID, AVG(Salary) AS AvgSal
// FROM Employees
// WHERE Status = 'Active'   -- filter rows first
// GROUP BY DeptID
// HAVING AVG(Salary) > 60000  -- then filter groups

// -- Difference: WHERE vs HAVING
// -- WHERE: filters BEFORE grouping (individual rows)
// -- HAVING: filters AFTER grouping (aggregate results)
// SELECT DeptID, SUM(Salary) AS Total
// FROM Employees
// WHERE Age > 25          -- must be individual row condition
// GROUP BY DeptID
// HAVING SUM(Salary) > 500000;  -- must be aggregate condition`
//       },
//       "INSERT": {
//         explanation: "INSERT adds new rows to a table. Can insert one row, multiple rows, or results from a SELECT query.",
//         details: [
//           "Specify column names to avoid order dependency",
//           "INSERT INTO ... SELECT: insert query results",
//           "Omitted columns get NULL or DEFAULT values",
//           "Auto-increment columns can be omitted"
//         ],
//         example: `-- Single row insert
// INSERT INTO Students (SID, Name, Age, DeptID)
// VALUES (101, 'Alice', 20, 'CS');

// -- Multiple rows (one statement)
// INSERT INTO Students VALUES
// (102, 'Bob', 21, 'EE'),
// (103, 'Charlie', 19, 'CS'),
// (104, 'Diana', 22, 'IT');

// -- Insert from SELECT
// INSERT INTO Graduates (GID, Name, DeptID)
// SELECT SID, Name, DeptID 
// FROM Students
// WHERE GPA >= 3.5;

// -- Insert with defaults
// CREATE TABLE Products (
//     PID INT AUTO_INCREMENT PRIMARY KEY,
//     Name VARCHAR(50),
//     CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
// INSERT INTO Products (Name) VALUES ('Laptop');
// -- PID and CreatedAt auto-filled`
//       },
//       "UPDATE": {
//         explanation: "UPDATE modifies existing rows in a table. Always use WHERE clause to specify which rows to update — without WHERE, all rows are updated!",
//         details: [
//           "SET clause specifies column = new value",
//           "WHERE clause restricts which rows",
//           "Can update multiple columns at once",
//           "Can use subqueries in SET and WHERE"
//         ],
//         example: `-- Update single column
// UPDATE Employees SET Salary = 60000 WHERE EmpID = 101;

// -- Update multiple columns
// UPDATE Employees 
// SET Salary = Salary * 1.1, LastUpdated = NOW()
// WHERE DeptID = 10;

// -- Update with calculation
// UPDATE Orders 
// SET TotalAmount = Quantity * UnitPrice
// WHERE OrderDate = '2024-01-15';

// -- Update using subquery
// UPDATE Employees 
// SET DeptName = (SELECT DeptName FROM Department WHERE DeptID = Employees.DeptID)
// WHERE DeptName IS NULL;

// -- DANGER: Update without WHERE → updates ALL rows!
// UPDATE Employees SET Salary = 0;  -- catastrophic!
// -- Always verify with SELECT first:
// SELECT * FROM Employees WHERE DeptID = 10;
// -- Then update:`
//       },
//       "DELETE": {
//         explanation: "DELETE removes rows from a table. Always use WHERE to specify rows — without WHERE, ALL rows are deleted! DELETE can be rolled back (unlike TRUNCATE).",
//         details: [
//           "DELETE can be rolled back in a transaction",
//           "Fires DELETE triggers",
//           "Slower than TRUNCATE for large datasets",
//           "Can use subqueries in WHERE"
//         ],
//         example: `-- Delete specific rows
// DELETE FROM Students WHERE SID = 101;

// -- Delete with condition
// DELETE FROM Orders WHERE OrderDate < '2020-01-01';

// -- Delete with subquery
// DELETE FROM Employees 
// WHERE DeptID IN (SELECT DeptID FROM Department WHERE Status = 'Closed');

// -- Delete all rows (use TRUNCATE instead for efficiency)
// DELETE FROM TempTable;  -- slow for large tables
// TRUNCATE TABLE TempTable;  -- fast, can't rollback

// -- DELETE vs DROP vs TRUNCATE
// DELETE   → removes rows, table structure remains, rollback possible
// TRUNCATE → removes all rows, faster, resets auto-increment, rollback depends on DB
// DROP     → removes entire table (structure + data), permanent!`
//       },
//       "Subqueries": {
//         explanation: "A subquery (inner query) is a query nested inside another SQL query. Used to break complex queries into simpler parts.",
//         details: [
//           "Scalar subquery: returns single value",
//           "Row subquery: returns single row",
//           "Table subquery: returns a table (used in FROM)",
//           "Correlated subquery: references outer query columns"
//         ],
//         example: `-- Scalar subquery: find employees earning above average
// SELECT Name, Salary FROM Employees
// WHERE Salary > (SELECT AVG(Salary) FROM Employees);

// -- IN subquery: employees in CS department
// SELECT Name FROM Employees
// WHERE DeptID IN (SELECT DeptID FROM Department WHERE DeptName = 'CS');

// -- EXISTS subquery: departments with at least one employee
// SELECT DeptName FROM Department d
// WHERE EXISTS (SELECT 1 FROM Employees e WHERE e.DeptID = d.DeptID);

// -- Correlated subquery: employees earning more than their dept avg
// SELECT Name, Salary, DeptID FROM Employees e
// WHERE Salary > (
//     SELECT AVG(Salary) FROM Employees 
//     WHERE DeptID = e.DeptID  -- references outer query
// );

// -- Subquery in FROM (derived table)
// SELECT DeptID, AvgSal FROM (
//     SELECT DeptID, AVG(Salary) AS AvgSal
//     FROM Employees GROUP BY DeptID
// ) AS DeptAvg
// WHERE AvgSal > 70000;`
//       }
//     }
//   },
//   "Data Structures": {
//     icon: "ti-binary-tree",
//     color: "#7F77DD",
//     topics: {
//       "Arrays": {
//         explanation: "An array is a collection of elements of the same type stored in contiguous memory locations. Provides O(1) access by index.",
//         details: [
//           "Static (fixed size) or dynamic (resizable like ArrayList)",
//           "Access: O(1); Search: O(n); Insert/Delete: O(n) at arbitrary position",
//           "Row-major vs column-major storage in 2D arrays",
//           "Base address + index × element_size = memory address"
//         ],
//         example: `// Array declaration and operations
// int[] arr = {10, 20, 30, 40, 50};    // Java
// int arr[] = {10, 20, 30, 40, 50};    // C/C++

// // Access: O(1)
// int x = arr[2];    // x = 30

// // Linear search: O(n)
// for (int i = 0; i < arr.length; i++) {
//     if (arr[i] == 30) return i;  // found at index 2
// }

// // Insert at index (shift right): O(n)
// // [10,20,30,40,50] insert 25 at index 2
// // [10,20,25,30,40,50]

// // 2D array
// int[][] matrix = {{1,2,3},{4,5,6},{7,8,9}};
// int val = matrix[1][2];  // row 1, col 2 = 6

// // Memory formula: addr(i,j) = base + (i*cols + j)*size`
//       },
//       "Linked List": {
//         explanation: "A linked list is a linear data structure where elements (nodes) are connected by pointers. Each node contains data and a reference to the next node. Dynamic size, efficient insertions/deletions.",
//         details: [
//           "Singly linked: each node → next",
//           "Doubly linked: each node ↔ next and prev",
//           "Circular: last node → first node",
//           "No random access; must traverse from head"
//         ],
//         example: `// Node structure
// class Node {
//     int data;
//     Node next;
//     Node(int data) { this.data = data; this.next = null; }
// }

// // Linked list operations
// class LinkedList {
//     Node head;
    
//     // Insert at beginning: O(1)
//     void prepend(int data) {
//         Node newNode = new Node(data);
//         newNode.next = head;
//         head = newNode;
//     }
    
//     // Insert at end: O(n)
//     void append(int data) {
//         Node newNode = new Node(data);
//         if (head == null) { head = newNode; return; }
//         Node curr = head;
//         while (curr.next != null) curr = curr.next;
//         curr.next = newNode;
//     }
    
//     // Delete node with value: O(n)
//     void delete(int key) {
//         if (head.data == key) { head = head.next; return; }
//         Node curr = head;
//         while (curr.next != null && curr.next.data != key)
//             curr = curr.next;
//         if (curr.next != null) curr.next = curr.next.next;
//     }
// }`
//       },
//       "Stack": {
//         explanation: "A stack is a LIFO (Last In, First Out) data structure. Elements are added and removed from the same end (top).",
//         details: [
//           "Push: add to top O(1); Pop: remove from top O(1); Peek: view top O(1)",
//           "Applications: undo/redo, browser back, expression evaluation, recursion",
//           "Can be implemented with array or linked list"
//         ],
//         example: `// Stack using array (Java)
// class Stack {
//     int[] data;
//     int top = -1;
//     int capacity;
    
//     Stack(int n) { data = new int[n]; capacity = n; }
    
//     void push(int x) {
//         if (top == capacity - 1) throw new RuntimeException("Stack overflow");
//         data[++top] = x;
//     }
    
//     int pop() {
//         if (top == -1) throw new RuntimeException("Stack underflow");
//         return data[top--];
//     }
    
//     int peek() { return data[top]; }
//     boolean isEmpty() { return top == -1; }
// }

// // Java built-in
// Stack<Integer> s = new Stack<>();
// s.push(10); s.push(20); s.push(30);
// s.pop();    // returns 30
// s.peek();   // returns 20

// // Application: balanced parentheses
// // Input: "{[()]}"
// // Push '(', '[', '{'
// // On ')', pop and check if '(' → match
// // On empty stack at end → balanced!`
//       },
//       "Queue": {
//         explanation: "A queue is a FIFO (First In, First Out) data structure. Elements are added at the rear and removed from the front.",
//         details: [
//           "Enqueue: add to rear O(1); Dequeue: remove from front O(1)",
//           "Applications: process scheduling, BFS, print queue, breadth-first search",
//           "Circular queue solves the front-wasting problem of linear queue"
//         ],
//         example: `// Queue using linked list
// class Queue<T> {
//     private LinkedList<T> list = new LinkedList<>();
    
//     void enqueue(T item) { list.addLast(item); }    // O(1)
//     T dequeue() { return list.removeFirst(); }       // O(1)
//     T peek() { return list.getFirst(); }
//     boolean isEmpty() { return list.isEmpty(); }
// }

// // Java built-in
// Queue<Integer> q = new LinkedList<>();
// q.offer(10);   // enqueue (preferred over add)
// q.offer(20);
// q.offer(30);
// q.poll();      // dequeue → returns 10
// q.peek();      // view front → returns 20

// // Circular queue (array-based)
// class CircularQueue {
//     int[] arr; int front, rear, size, capacity;
//     void enqueue(int x) {
//         rear = (rear + 1) % capacity;
//         arr[rear] = x;
//     }
//     int dequeue() {
//         int val = arr[front];
//         front = (front + 1) % capacity;
//         return val;
//     }
// }`
//       },
//       "Hash Table": {
//         explanation: "A hash table stores key-value pairs with O(1) average lookup using a hash function to map keys to array indices.",
//         details: [
//           "Hash function: maps key → index",
//           "Collision handling: chaining (linked list per bucket) or open addressing (linear probing)",
//           "Load factor: n/m (n = elements, m = table size); typically <0.75",
//           "Java: HashMap; Python: dict"
//         ],
//         example: `// HashMap in Java
// HashMap<String, Integer> map = new HashMap<>();
// map.put("Alice", 90);     // insert
// map.put("Bob", 85);
// int score = map.get("Alice");  // 90
// map.containsKey("Alice");      // true
// map.remove("Bob");
// map.getOrDefault("Carol", 0);  // 0 if not found

// // Iterate
// for (Map.Entry<String, Integer> e : map.entrySet())
//     System.out.println(e.getKey() + ": " + e.getValue());

// // Hash function (simple)
// int hash(String key, int tableSize) {
//     int h = 0;
//     for (char c : key.toCharArray())
//         h = (h * 31 + c) % tableSize;
//     return h;
// }

// // Collision - Chaining
// // Index 3: [Alice→90] → [Carl→75] → null
// // Both "Alice" and "Carl" hash to index 3`
//       },
//       "Binary Tree": {
//         explanation: "A binary tree is a hierarchical data structure where each node has at most two children (left and right). Root is the topmost node; leaves have no children.",
//         details: [
//           "Height: longest path from root to leaf",
//           "Perfect binary tree: all levels full",
//           "Complete binary tree: all levels full except last (filled left to right)",
//           "Traversals: Inorder (LNR), Preorder (NLR), Postorder (LRN), Level order (BFS)"
//         ],
//         example: `// Binary tree node
// class TreeNode {
//     int val;
//     TreeNode left, right;
//     TreeNode(int val) { this.val = val; }
// }

// // Build tree:      1
// //                /   \\
// //               2     3
// //              / \\
// //             4   5

// TreeNode root = new TreeNode(1);
// root.left = new TreeNode(2);
// root.right = new TreeNode(3);
// root.left.left = new TreeNode(4);
// root.left.right = new TreeNode(5);

// // Inorder (L-N-R): 4, 2, 5, 1, 3
// // Preorder (N-L-R): 1, 2, 4, 5, 3
// // Postorder (L-R-N): 4, 5, 2, 3, 1

// void inorder(TreeNode node) {
//     if (node == null) return;
//     inorder(node.left);
//     System.out.print(node.val + " ");
//     inorder(node.right);
// }`
//       },
//       "BST": {
//         explanation: "A Binary Search Tree (BST) is a binary tree where for each node: all left subtree values are smaller, all right subtree values are larger. Enables efficient search, insert, and delete.",
//         details: [
//           "Search: O(h) where h = height; O(log n) balanced, O(n) skewed",
//           "Inorder traversal of BST gives sorted sequence",
//           "Successor: smallest node in right subtree",
//           "Predecessor: largest node in left subtree"
//         ],
//         example: `// BST operations
// class BST {
//     TreeNode root;
    
//     // Insert: O(log n) average
//     TreeNode insert(TreeNode node, int key) {
//         if (node == null) return new TreeNode(key);
//         if (key < node.val) node.left = insert(node.left, key);
//         else if (key > node.val) node.right = insert(node.right, key);
//         return node;
//     }
    
//     // Search: O(log n) average
//     boolean search(TreeNode node, int key) {
//         if (node == null) return false;
//         if (key == node.val) return true;
//         if (key < node.val) return search(node.left, key);
//         return search(node.right, key);
//     }
    
//     // Delete: find node, handle 3 cases:
//     // 1) Leaf: just remove
//     // 2) One child: replace with child
//     // 3) Two children: replace with inorder successor
// }
// // BST Example:
// //      5
// //    /   \\
// //   3     7
// //  / \\   / \\
// // 2   4  6   8
// // Search 6: 5→7→6 ✓`
//       },
//       "Graph": {
//         explanation: "A graph is a collection of vertices (nodes) connected by edges. Models networks, relationships, maps, and many real-world problems.",
//         details: [
//           "Directed (digraph): edges have direction; Undirected: edges are bidirectional",
//           "Weighted: edges have weights/costs; Unweighted: equal edges",
//           "Representation: Adjacency Matrix O(V²) space, Adjacency List O(V+E) space",
//           "Terms: degree, path, cycle, connected, spanning tree"
//         ],
//         example: `// Graph representations
// // Adjacency List (space-efficient)
// Map<Integer, List<Integer>> graph = new HashMap<>();
// graph.put(0, Arrays.asList(1, 2));
// graph.put(1, Arrays.asList(0, 3));
// graph.put(2, Arrays.asList(0, 4));

// // Adjacency Matrix (fast edge lookup)
// int[][] matrix = {
// //   0  1  2  3  4
//     {0, 1, 1, 0, 0},  // 0 connects to 1, 2
//     {1, 0, 0, 1, 0},  // 1 connects to 0, 3
//     {1, 0, 0, 0, 1},  // 2 connects to 0, 4
//     {0, 1, 0, 0, 0},  // 3 connects to 1
//     {0, 0, 1, 0, 0}   // 4 connects to 2
// };

// // Graph: 0 - 1 - 3
// //        |
// //        2 - 4`
//       },
//       "Heap": {
//         explanation: "A heap is a complete binary tree satisfying the heap property. Max-heap: parent ≥ children. Min-heap: parent ≤ children. Efficiently supports priority queue operations.",
//         details: [
//           "Insert: O(log n); Extract-max/min: O(log n); Peek: O(1)",
//           "Stored as array: parent at i, children at 2i+1 and 2i+2",
//           "Heapify: convert array to heap O(n)",
//           "Used in: Heap Sort, Priority Queue, Dijkstra's algorithm"
//         ],
//         example: `// Min-heap using PriorityQueue (Java)
// PriorityQueue<Integer> minHeap = new PriorityQueue<>();
// minHeap.offer(5); minHeap.offer(3); minHeap.offer(8);
// minHeap.peek();   // 3 (min)
// minHeap.poll();   // 3 (remove min)

// // Max-heap
// PriorityQueue<Integer> maxHeap = 
//     new PriorityQueue<>(Collections.reverseOrder());

// // Heap array representation (Max-heap)
// // Index:   0   1   2   3   4   5   6
// // Value: [90, 80, 70, 60, 50, 40, 30]
// //
// //           90
// //          /  \\
// //        80    70
// //       / \\   / \\
// //      60  50 40  30
// //
// // Parent of i: (i-1)/2
// // Children of i: 2i+1 (left), 2i+2 (right)`
//       }
//     }
//   },
//   "Algorithms": {
//     icon: "ti-sort-ascending",
//     color: "#BA7517",
//     topics: {
//       "Binary Search": {
//         explanation: "Binary search finds an element in a sorted array by repeatedly halving the search space. Much more efficient than linear search for sorted data.",
//         details: [
//           "Requires sorted input",
//           "Time: O(log n); Space: O(1) iterative, O(log n) recursive",
//           "At each step, compare middle element with target"
//         ],
//         example: `// Iterative Binary Search
// int binarySearch(int[] arr, int target) {
//     int left = 0, right = arr.length - 1;
    
//     while (left <= right) {
//         int mid = left + (right - left) / 2; // avoid overflow
        
//         if (arr[mid] == target) return mid;      // found
//         else if (arr[mid] < target) left = mid + 1;  // search right
//         else right = mid - 1;                    // search left
//     }
//     return -1; // not found
// }

// // Trace: arr=[2,4,6,8,10,12], target=8
// // left=0, right=5, mid=2 → arr[2]=6 < 8 → left=3
// // left=3, right=5, mid=4 → arr[4]=10 > 8 → right=3
// // left=3, right=3, mid=3 → arr[3]=8 == 8 ✓ return 3

// // Recursive version
// int bsearch(int[] arr, int l, int r, int target) {
//     if (l > r) return -1;
//     int mid = l + (r - l) / 2;
//     if (arr[mid] == target) return mid;
//     if (arr[mid] < target) return bsearch(arr, mid+1, r, target);
//     return bsearch(arr, l, mid-1, target);
// }`
//       },
//       "Merge Sort": {
//         explanation: "Merge sort is a divide-and-conquer sorting algorithm. Divides array into halves, recursively sorts each half, then merges the sorted halves.",
//         details: [
//           "Time: O(n log n) in all cases",
//           "Space: O(n) auxiliary space",
//           "Stable sort: equal elements maintain relative order",
//           "Preferred for linked lists and external sorting"
//         ],
//         example: `void mergeSort(int[] arr, int left, int right) {
//     if (left >= right) return;
    
//     int mid = left + (right - left) / 2;
//     mergeSort(arr, left, mid);       // sort left half
//     mergeSort(arr, mid + 1, right);  // sort right half
//     merge(arr, left, mid, right);    // merge sorted halves
// }

// void merge(int[] arr, int left, int mid, int right) {
//     int n1 = mid - left + 1, n2 = right - mid;
//     int[] L = new int[n1], R = new int[n2];
    
//     System.arraycopy(arr, left, L, 0, n1);
//     System.arraycopy(arr, mid+1, R, 0, n2);
    
//     int i = 0, j = 0, k = left;
//     while (i < n1 && j < n2)
//         arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
//     while (i < n1) arr[k++] = L[i++];
//     while (j < n2) arr[k++] = R[j++];
// }

// // Trace: [38, 27, 43, 3]
// // Split: [38,27] | [43,3]
// // Split: [38]|[27]  [43]|[3]
// // Merge: [27,38]    [3,43]
// // Merge: [3, 27, 38, 43] ✓`
//       },
//       "Quick Sort": {
//         explanation: "Quick sort uses a pivot to partition the array into elements less than and greater than the pivot, then recursively sorts each partition.",
//         details: [
//           "Average: O(n log n); Worst case: O(n²) (sorted input with bad pivot)",
//           "In-place: O(log n) stack space",
//           "Not stable by default",
//           "Usually fastest in practice; used in most stdlib sort implementations"
//         ],
//         example: `void quickSort(int[] arr, int low, int high) {
//     if (low < high) {
//         int pi = partition(arr, low, high);
//         quickSort(arr, low, pi - 1);   // sort left
//         quickSort(arr, pi + 1, high);  // sort right
//     }
// }

// int partition(int[] arr, int low, int high) {
//     int pivot = arr[high];  // choose last element as pivot
//     int i = low - 1;        // index of smaller element
    
//     for (int j = low; j < high; j++) {
//         if (arr[j] <= pivot) {
//             i++;
//             int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
//         }
//     }
//     // Place pivot in correct position
//     int temp = arr[i+1]; arr[i+1] = arr[high]; arr[high] = temp;
//     return i + 1;
// }

// // Trace: [10, 7, 8, 9, 1, 5], pivot=5
// // After partition: [1, 5, 8, 9, 7, 10]
// // Recurse on [1] and [8, 9, 7, 10]`
//       },
//       "BFS": {
//         explanation: "Breadth-First Search (BFS) explores a graph level by level, visiting all nodes at distance k before nodes at distance k+1. Uses a queue.",
//         details: [
//           "Time: O(V+E); Space: O(V)",
//           "Finds shortest path in unweighted graphs",
//           "Level-order traversal of trees",
//           "Applications: shortest path, web crawling, social network friends"
//         ],
//         example: `// BFS on graph
// void bfs(Map<Integer, List<Integer>> graph, int start) {
//     Set<Integer> visited = new HashSet<>();
//     Queue<Integer> queue = new LinkedList<>();
    
//     visited.add(start);
//     queue.offer(start);
    
//     while (!queue.isEmpty()) {
//         int node = queue.poll();
//         System.out.print(node + " ");
        
//         for (int neighbor : graph.get(node)) {
//             if (!visited.contains(neighbor)) {
//                 visited.add(neighbor);
//                 queue.offer(neighbor);
//             }
//         }
//     }
// }

// // Graph: 0─1─3
// //        │
// //        2─4
// // BFS from 0: 0, 1, 2, 3, 4

// // Find shortest path distance
// int[] dist = new int[n];
// Arrays.fill(dist, -1);
// dist[start] = 0;
// // When processing node u, for each neighbor v:
// // dist[v] = dist[u] + 1`
//       },
//       "DFS": {
//         explanation: "Depth-First Search (DFS) explores as far as possible along each branch before backtracking. Uses a stack (or recursion).",
//         details: [
//           "Time: O(V+E); Space: O(V) for recursion stack",
//           "Applications: topological sort, cycle detection, connected components, maze solving",
//           "Preorder/Inorder/Postorder tree traversals are DFS variants"
//         ],
//         example: `// Recursive DFS
// void dfs(Map<Integer, List<Integer>> graph, int node, Set<Integer> visited) {
//     visited.add(node);
//     System.out.print(node + " ");
    
//     for (int neighbor : graph.get(node)) {
//         if (!visited.contains(neighbor)) {
//             dfs(graph, neighbor, visited);
//         }
//     }
// }

// // Iterative DFS (using stack)
// void dfsIterative(Map<Integer, List<Integer>> graph, int start) {
//     Set<Integer> visited = new HashSet<>();
//     Stack<Integer> stack = new Stack<>();
    
//     stack.push(start);
//     while (!stack.isEmpty()) {
//         int node = stack.pop();
//         if (visited.contains(node)) continue;
//         visited.add(node);
//         System.out.print(node + " ");
//         for (int neighbor : graph.get(node))
//             if (!visited.contains(neighbor))
//                 stack.push(neighbor);
//     }
// }
// // DFS from 0: 0, 1, 3, 2, 4 (order may vary)`
//       },
//       "Dynamic Programming": {
//         explanation: "Dynamic Programming (DP) solves complex problems by breaking them into overlapping subproblems, solving each once, and storing results (memoization/tabulation).",
//         details: [
//           "Memoization: top-down (recursion + cache)",
//           "Tabulation: bottom-up (iterative, fill table)",
//           "Optimal substructure: optimal solution from optimal sub-solutions",
//           "Overlapping subproblems: same subproblem solved multiple times"
//         ],
//         example: `// Fibonacci — classic DP
// // Naive recursion: O(2^n) 
// int fib(int n) { return n<=1 ? n : fib(n-1)+fib(n-2); }

// // Memoization: O(n)
// int[] memo = new int[n+1];
// int fib(int n) {
//     if (n <= 1) return n;
//     if (memo[n] != 0) return memo[n];
//     return memo[n] = fib(n-1) + fib(n-2);
// }

// // Tabulation: O(n)
// int fibTab(int n) {
//     int[] dp = new int[n+1];
//     dp[0] = 0; dp[1] = 1;
//     for (int i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];
//     return dp[n];
// }

// // 0/1 Knapsack
// // dp[i][w] = max value using first i items with capacity w
// for (int i = 1; i <= n; i++)
//     for (int w = 0; w <= W; w++)
//         if (weight[i] <= w)
//             dp[i][w] = Math.max(dp[i-1][w], 
//                                 val[i] + dp[i-1][w-weight[i]]);
//         else
//             dp[i][w] = dp[i-1][w];`
//       },
//       "Big O Notation": {
//         explanation: "Big O notation describes the upper bound of an algorithm's time or space complexity as input size n grows. It ignores constants and lower-order terms, focusing on the dominant term.",
//         details: [
//           "O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)",
//           "Drop constants: 5n → O(n); 3n² + 2n → O(n²)",
//           "Best case (Ω), Average case (Θ), Worst case (O)"
//         ],
//         example: `// O(1) - constant
// int getFirst(int[] arr) { return arr[0]; }

// // O(log n) - binary search, balanced BST
// int binarySearch(int[] arr, int target) { ... }

// // O(n) - linear scan
// int linearSearch(int[] arr, int target) {
//     for (int x : arr) if (x == target) return 1;
//     return -1;
// }

// // O(n log n) - merge sort, heap sort
// void mergeSort(int[] arr) { ... }

// // O(n²) - nested loops, bubble sort
// void bubbleSort(int[] arr) {
//     for (int i = 0; i < n; i++)        // O(n)
//         for (int j = 0; j < n-i; j++)  // O(n)
//             if (arr[j] > arr[j+1]) swap(arr, j, j+1);
// }

// // O(2^n) - generating all subsets
// void subsets(int[] arr, int i, List<Integer> curr) {
//     if (i == arr.length) { print(curr); return; }
//     curr.add(arr[i]); subsets(arr, i+1, curr);  // include
//     curr.remove(...); subsets(arr, i+1, curr);  // exclude
// }`
//       },
//       "Recursion": {
//         explanation: "Recursion is a technique where a function calls itself to solve a smaller version of the same problem. Requires a base case (stops recursion) and recursive case.",
//         details: [
//           "Call stack: each recursive call adds a frame",
//           "Stack overflow: too many recursive calls",
//           "Tail recursion: recursive call is last operation (can be optimized)",
//           "Every recursive solution can be written iteratively"
//         ],
//         example: `// Base case + recursive case pattern
// int factorial(int n) {
//     if (n == 0) return 1;         // base case
//     return n * factorial(n - 1);  // recursive case
// }
// // factorial(4) = 4 × factorial(3)
// //              = 4 × 3 × factorial(2)
// //              = 4 × 3 × 2 × factorial(1)
// //              = 4 × 3 × 2 × 1 × factorial(0)
// //              = 4 × 3 × 2 × 1 × 1 = 24

// // Tower of Hanoi
// void hanoi(int n, char from, char to, char aux) {
//     if (n == 1) { 
//         System.out.println("Move disk 1: " + from + " → " + to);
//         return;
//     }
//     hanoi(n-1, from, aux, to);  // move n-1 disks to aux
//     System.out.println("Move disk " + n + ": " + from + " → " + to);
//     hanoi(n-1, aux, to, from);  // move n-1 from aux to to
// }
// // 3 disks needs 2³-1 = 7 moves`
//       },
//       "Greedy Algorithms": {
//         explanation: "Greedy algorithms make the locally optimal choice at each step, hoping to find the global optimum. Works when greedy choice + optimal substructure applies.",
//         details: [
//           "Examples: Huffman coding, Kruskal's, Prim's, Dijkstra's, activity selection",
//           "Greedy doesn't always work: 0/1 Knapsack needs DP",
//           "Coin change: greedy works for standard currency systems"
//         ],
//         example: `// Activity Selection (maximize activities)
// // Sort by finish time, always pick earliest-finishing activity
// activities = [{start:1,end:4},{start:3,end:5},{start:0,end:6},
//               {start:5,end:7},{start:8,end:9},{start:5,end:9}]
// // Sort by end: [1,4],[3,5],[0,6],[5,7],[5,9],[8,9]
// // Pick [1,4] → next compatible: [5,7] → [8,9]
// // Result: 3 activities selected (optimal!)

// // Fractional Knapsack
// // Sort by value/weight ratio, take most valuable first
// items = [{val:60,wt:10},{val:100,wt:20},{val:120,wt:30}]
// capacity = 50
// // Ratios: 6, 5, 4
// // Take item1 (10kg), item2 (20kg), item3 (20/30 of it)
// // Total value = 60 + 100 + 80 = 240

// // Coin change (greedy - standard coins)
// coins = [25,10,5,1], amount = 41
// 25 → 25, 10 → 35, 5 → 40, 1 → 41 (4 coins)`
//       }
//     }
//   },
//   "OOPs": {
//     icon: "ti-box",
//     color: "#D85A30",
//     topics: {
//       "Class": {
//         explanation: "A class is a blueprint or template for creating objects. It defines attributes (data members) and methods (functions) that objects of the class will have.",
//         details: [
//           "Class defines the structure; object is an instance",
//           "Members: fields (attributes), methods, constructors",
//           "Access modifiers control visibility",
//           "static members belong to class, not instances"
//         ],
//         example: `// Java class
// public class BankAccount {
//     // Fields (attributes)
//     private String owner;
//     private double balance;
//     private static int count = 0;  // class-level
    
//     // Constructor
//     public BankAccount(String owner, double initialBalance) {
//         this.owner = owner;
//         this.balance = initialBalance;
//         count++;
//     }
    
//     // Methods
//     public void deposit(double amount) {
//         if (amount > 0) balance += amount;
//     }
    
//     public boolean withdraw(double amount) {
//         if (amount > balance) return false;
//         balance -= amount;
//         return true;
//     }
    
//     public double getBalance() { return balance; }
//     public static int getCount() { return count; }
// }

// BankAccount acc = new BankAccount("Alice", 1000);
// acc.deposit(500);
// System.out.println(acc.getBalance()); // 1500`
//       },
//       "Encapsulation": {
//         explanation: "Encapsulation bundles data (attributes) and methods that operate on the data into a single unit (class), and restricts direct access to internal data (information hiding).",
//         details: [
//           "Private fields: accessed only within class",
//           "Public getters/setters: controlled access",
//           "Benefits: data validation, flexibility, security",
//           "Follows 'tell, don't ask' principle"
//         ],
//         example: `// Without encapsulation (bad)
// class Person {
//     public int age;  // anyone can set age = -5!
// }

// // With encapsulation (good)
// class Person {
//     private int age;    // can't directly access
//     private String name;
    
//     // Getter
//     public int getAge() { return age; }
    
//     // Setter with validation
//     public void setAge(int age) {
//         if (age < 0 || age > 150) 
//             throw new IllegalArgumentException("Invalid age");
//         this.age = age;
//     }
    
//     public String getName() { return name; }
//     public void setName(String name) {
//         if (name == null || name.isEmpty())
//             throw new IllegalArgumentException("Name cannot be empty");
//         this.name = name;
//     }
// }`
//       },
//       "Inheritance": {
//         explanation: "Inheritance allows a class (child/subclass) to inherit properties and methods from another class (parent/superclass). Promotes code reuse and establishes IS-A relationships.",
//         details: [
//           "extends keyword in Java; : in C++",
//           "Single inheritance (Java classes), Multiple (Java interfaces, C++)",
//           "super keyword: access parent class members",
//           "Method overriding: child redefines parent method"
//         ],
//         example: `// Parent class
// class Animal {
//     protected String name;
//     public Animal(String name) { this.name = name; }
    
//     public void makeSound() {
//         System.out.println(name + " makes a sound");
//     }
    
//     public void eat() {
//         System.out.println(name + " is eating");
//     }
// }

// // Child class (IS-A Animal)
// class Dog extends Animal {
//     private String breed;
    
//     public Dog(String name, String breed) {
//         super(name);  // call parent constructor
//         this.breed = breed;
//     }
    
//     @Override
//     public void makeSound() {  // override parent method
//         System.out.println(name + " says: Woof!");
//     }
    
//     public void fetch() {  // new method
//         System.out.println(name + " fetches the ball");
//     }
// }

// Dog d = new Dog("Rex", "Labrador");
// d.makeSound();  // Rex says: Woof! (overridden)
// d.eat();        // Rex is eating (inherited)
// d.fetch();      // Rex fetches the ball (own)`
//       },
//       "Polymorphism": {
//         explanation: "Polymorphism means 'many forms' — the ability of different objects to respond to the same method call in different ways. Enables writing flexible, extensible code.",
//         details: [
//           "Compile-time (static): method overloading",
//           "Runtime (dynamic): method overriding + reference type",
//           "Upcasting: parent reference to child object",
//           "Dynamic dispatch: runtime determination of which method to call"
//         ],
//         example: `// Runtime polymorphism (method overriding)
// Animal[] animals = {new Dog("Rex"), new Cat("Whiskers"), new Bird("Tweety")};

// for (Animal a : animals) {
//     a.makeSound();  // calls the correct version for each object
// }
// // Rex says: Woof!
// // Whiskers says: Meow!
// // Tweety says: Tweet!

// // Compile-time polymorphism (method overloading)
// class Calculator {
//     int add(int a, int b) { return a + b; }
//     double add(double a, double b) { return a + b; }
//     int add(int a, int b, int c) { return a + b + c; }
//     String add(String a, String b) { return a + b; }
// }
// // Java decides which add() to call based on parameter types
// Calculator c = new Calculator();
// c.add(1, 2);         // int version
// c.add(1.5, 2.5);     // double version
// c.add("Hello", " World"); // String version`
//       },
//       "Abstract Classes": {
//         explanation: "An abstract class is a class that cannot be instantiated directly. It may contain abstract methods (no body) that subclasses must implement, as well as concrete methods.",
//         details: [
//           "abstract keyword in Java",
//           "Can have constructors, fields, concrete methods",
//           "Cannot instantiate abstract class directly",
//           "Used when you want to enforce a contract with partial implementation"
//         ],
//         example: `abstract class Shape {
//     protected String color;
    
//     public Shape(String color) { this.color = color; }
    
//     // Abstract method - MUST be overridden
//     abstract double area();
//     abstract double perimeter();
    
//     // Concrete method - inherited as-is
//     public void displayColor() {
//         System.out.println("Color: " + color);
//     }
    
//     public String describe() {
//         return "Shape with area: " + area();
//     }
// }

// class Circle extends Shape {
//     private double radius;
    
//     public Circle(String color, double radius) {
//         super(color);
//         this.radius = radius;
//     }
    
//     @Override
//     double area() { return Math.PI * radius * radius; }
    
//     @Override
//     double perimeter() { return 2 * Math.PI * radius; }
// }

// // Shape s = new Shape("Red"); // ERROR! Can't instantiate
// Shape s = new Circle("Red", 5.0); // OK - polymorphism
// System.out.println(s.area()); // 78.54`
//       },
//       "Interfaces": {
//         explanation: "An interface is a contract specifying what a class can do (methods without implementation, in Java 7 and earlier). Classes implement interfaces, promising to provide the implementations.",
//         details: [
//           "All methods abstract by default (Java 7); Java 8+ allows default and static methods",
//           "All fields are public static final",
//           "A class can implement multiple interfaces",
//           "Enables loose coupling and 'programming to interface'"
//         ],
//         example: `// Interface definition
// interface Printable {
//     void print();  // abstract by default
// }

// interface Serializable {
//     byte[] serialize();
//     static Object deserialize(byte[] data) { ... }  // Java 8+
//     default String toJSON() { return "{}"; }         // Java 8+ default
// }

// // Class implementing multiple interfaces
// class Document implements Printable, Serializable {
//     private String content;
    
//     @Override
//     public void print() {
//         System.out.println(content);
//     }
    
//     @Override
//     public byte[] serialize() {
//         return content.getBytes();
//     }
// }

// // Interface as type (polymorphism)
// Printable p = new Document();
// p.print();

// // When to use abstract class vs interface?
// // Abstract class: shared code, IS-A relationship
// // Interface: capability contract, can-do relationship
// // Flyable, Serializable, Comparable → interfaces`
//       }
//     }
//   },
//   "Computer Networks": {
//     icon: "ti-network",
//     color: "#533AB7",
//     topics: {
//       "OSI Model": {
//         explanation: "The OSI (Open Systems Interconnection) model is a conceptual framework with 7 layers that standardizes how different network systems communicate. Each layer provides specific services to the layer above it.",
//         details: [
//           "Layer 7 Application: user interface (HTTP, FTP, SMTP)",
//           "Layer 6 Presentation: encryption, compression, encoding",
//           "Layer 5 Session: session management, authentication",
//           "Layer 4 Transport: end-to-end communication (TCP, UDP)",
//           "Layer 3 Network: routing, logical addressing (IP)",
//           "Layer 2 Data Link: framing, MAC addressing (Ethernet)",
//           "Layer 1 Physical: bits over wire (cables, signals)"
//         ],
//         example: `// OSI Model mnemonic: "All People Seem To Need Data Processing"
// Layer 7: Application  - HTTP, HTTPS, FTP, SMTP, DNS
// Layer 6: Presentation - SSL/TLS, JPEG, MP3, ASCII
// Layer 5: Session      - NetBIOS, RPC, PPTP
// Layer 4: Transport    - TCP, UDP, port numbers
// Layer 3: Network      - IP, ICMP, routers
// Layer 2: Data Link    - Ethernet, Wi-Fi, switches, MAC addr
// Layer 1: Physical     - cables, fiber, radio waves, hubs

// // Data encapsulation (sending)
// Data → Segment (L4 adds port) → Packet (L3 adds IP)
// → Frame (L2 adds MAC) → Bits (L1 transmits)

// // HTTP request journey:
// App layer: "GET /index.html HTTP/1.1"
// Transport: wraps in TCP segment, adds port 80
// Network:   wraps in IP packet, adds source/dest IP
// Data Link: wraps in Ethernet frame, adds MAC addresses
// Physical:  converts to electrical/light signals`
//       },
//       "TCP vs UDP": {
//         explanation: "TCP (Transmission Control Protocol) provides reliable, ordered, error-checked delivery. UDP (User Datagram Protocol) is faster but unreliable — fire and forget.",
//         details: [
//           "TCP: connection-oriented (3-way handshake: SYN→SYN-ACK→ACK)",
//           "TCP: flow control, congestion control, ordering, retransmission",
//           "UDP: connectionless, no guarantee of delivery or order",
//           "UDP: lower latency, good for video/audio streaming, gaming, DNS"
//         ],
//         example: `// TCP 3-way handshake
// Client → Server: SYN (seq=x)
// Server → Client: SYN-ACK (seq=y, ack=x+1)
// Client → Server: ACK (ack=y+1)
// // Connection established!

// // TCP 4-way teardown
// Client → Server: FIN
// Server → Client: ACK
// Server → Client: FIN
// Client → Server: ACK
// // Connection closed

// // TCP vs UDP use cases
// TCP: HTTP/HTTPS, FTP, SSH, email, file transfer
//      (correctness matters more than speed)

// UDP: DNS queries, VoIP, video streaming, online games
//      (speed matters more than occasional packet loss)

// // Socket programming
// // TCP Server (Java)
// ServerSocket ss = new ServerSocket(8080);
// Socket client = ss.accept();  // blocks until connection
// // UDP
// DatagramSocket ds = new DatagramSocket(8080);
// byte[] buf = new byte[1024];
// DatagramPacket packet = new DatagramPacket(buf, buf.length);
// ds.receive(packet);  // receive datagram`
//       },
//       "IP Address": {
//         explanation: "An IP address is a unique numerical label assigned to each device on a network. IPv4 uses 32 bits (4 octets); IPv6 uses 128 bits.",
//         details: [
//           "IPv4: 192.168.1.1 (32 bits, ~4.3 billion addresses)",
//           "IPv6: 2001:0db8:85a3::8a2e:0370:7334 (128 bits)",
//           "Classes: A (1-127), B (128-191), C (192-223)",
//           "Private ranges: 10.x.x.x, 172.16-31.x.x, 192.168.x.x",
//           "Subnet mask: divides IP into network and host parts"
//         ],
//         example: `// IPv4 structure
// 192  .  168  .   1   .  100
//  8bit   8bit   8bit   8bit  = 32 bits total

// // Subnetting example
// IP:       192.168.1.0
// Mask:     255.255.255.0 = /24
// Network:  192.168.1.0
// Hosts:    192.168.1.1 to 192.168.1.254 (254 hosts)
// Broadcast:192.168.1.255

// // /24 means first 24 bits = network part
// // 2^(32-24) - 2 = 254 usable hosts

// // IPv6 example
// Full:     2001:0db8:85a3:0000:0000:8a2e:0370:7334
// Compact:  2001:db8:85a3::8a2e:370:7334
// // :: replaces consecutive zero groups

// // NAT (Network Address Translation)
// // Private IP 192.168.1.5 →[NAT Router]→ Public IP 203.0.113.1
// // Allows many devices to share one public IP`
//       },
//       "HTTP/HTTPS": {
//         explanation: "HTTP (HyperText Transfer Protocol) is the foundation of data communication on the web. HTTPS adds TLS/SSL encryption for security.",
//         details: [
//           "HTTP methods: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS",
//           "Status codes: 200 OK, 301 Redirect, 400 Bad Request, 404 Not Found, 500 Server Error",
//           "Headers: Host, Content-Type, Authorization, Cookie",
//           "HTTPS: TLS handshake + certificate verification"
//         ],
//         example: `// HTTP Request format
// GET /api/users/123 HTTP/1.1
// Host: api.example.com
// Authorization: Bearer eyJhbGc...
// Accept: application/json

// // HTTP Response
// HTTP/1.1 200 OK
// Content-Type: application/json
// Content-Length: 58

// {"id": 123, "name": "Alice", "email": "alice@example.com"}

// // Status code categories
// 1xx: Informational (100 Continue)
// 2xx: Success (200 OK, 201 Created, 204 No Content)
// 3xx: Redirection (301 Moved, 302 Found, 304 Not Modified)
// 4xx: Client Error (400 Bad Request, 401 Unauthorized, 
//      403 Forbidden, 404 Not Found, 429 Too Many Requests)
// 5xx: Server Error (500 Internal Error, 503 Service Unavailable)

// // HTTPS TLS handshake
// 1. Client Hello (cipher suites, TLS version)
// 2. Server Hello + Certificate
// 3. Client verifies certificate
// 4. Key exchange (asymmetric → symmetric)
// 5. Encrypted communication begins`
//       },
//       "DNS": {
//         explanation: "DNS (Domain Name System) translates human-readable domain names (google.com) to IP addresses (142.250.80.46). The internet's phone book.",
//         details: [
//           "Hierarchical: root → TLD (.com, .org) → domain → subdomain",
//           "Records: A (name→IPv4), AAAA (name→IPv6), CNAME (alias), MX (mail), NS (nameserver)",
//           "Caching: reduces lookup time, TTL controls cache duration",
//           "Recursive vs iterative resolution"
//         ],
//         example: `// DNS lookup process for "www.example.com"
// 1. Check local cache
// 2. Query recursive resolver (usually ISP)
// 3. Resolver queries root nameserver → ".com" NS address
// 4. Resolver queries .com TLD server → "example.com" NS address
// 5. Resolver queries example.com nameserver → "www" IP
// 6. Returns 93.184.216.34 to client
// 7. Cache result for TTL duration

// // DNS record types
// A     example.com → 93.184.216.34
// AAAA  example.com → 2606:2800:220:1:248:1893:25c8:1946
// CNAME www.example.com → example.com (alias)
// MX    example.com → mail.example.com (email server)
// NS    example.com → ns1.example.com (nameserver)
// TXT   "v=spf1 include:..." (text record, SPF, DKIM)

// // nslookup / dig commands
// nslookup google.com
// dig google.com A`
//       }
//     }
//   },
//   "Programming Fundamentals": {
//     icon: "ti-code",
//     color: "#072C53",
//     topics: {
//       "Variables & Data Types": {
//         explanation: "Variables are named storage locations in memory. Data types define the kind of data a variable can hold and the operations that can be performed on it.",
//         details: [
//           "Primitive types: int, float, char, boolean, byte, long, double",
//           "Reference types: arrays, objects, strings",
//           "Static typing (Java/C++): type checked at compile time",
//           "Dynamic typing (Python/JS): type checked at runtime"
//         ],
//         example: `// Java - statically typed
// int age = 25;
// double salary = 75000.50;
// char grade = 'A';
// boolean isActive = true;
// String name = "Alice";    // reference type

// // Python - dynamically typed
// age = 25            # int
// salary = 75000.50   # float
// name = "Alice"      # str
// is_active = True    # bool
// items = [1,2,3]     # list

// # Type checking
// type(age)           # <class 'int'>
// isinstance(age, int)  # True

// // C++ - statically typed
// int x = 10;
// auto y = 3.14;      // type inference (double)
// const int MAX = 100; // constant

// // Type conversion
// int n = (int)3.7;   // explicit cast → 3
// double d = 5;       // implicit cast (widening) → 5.0`
//       },
//       "Loops": {
//         explanation: "Loops execute a block of code repeatedly. Three main types: for (known iterations), while (condition-based), do-while (executes at least once).",
//         details: [
//           "break: exit loop immediately",
//           "continue: skip current iteration",
//           "Nested loops: O(n²) complexity",
//           "Infinite loops: when condition never becomes false"
//         ],
//         example: `// For loop
// for (int i = 0; i < 5; i++) {
//     System.out.print(i + " ");  // 0 1 2 3 4
// }

// // While loop
// int n = 10;
// while (n > 0) {
//     System.out.print(n + " ");
//     n -= 3;  // 10 7 4 1
// }

// // Do-while (always runs at least once)
// int count = 0;
// do {
//     count++;
// } while (count < 5);

// // Enhanced for (for-each)
// int[] arr = {1, 2, 3, 4, 5};
// for (int x : arr) System.out.print(x + " ");

// // Python loops
// for i in range(5): print(i)         # 0 1 2 3 4
// for item in ["a","b","c"]: print(item)

// # List comprehension (Pythonic loop)
// squares = [x**2 for x in range(10)]  # [0,1,4,9,16,...]`
//       },
//       "Recursion": {
//         explanation: "Recursion is a programming technique where a function calls itself. Requires a base case to stop and a recursive case that reduces the problem.",
//         details: [
//           "Call stack: each call creates a new stack frame",
//           "Stack overflow: max recursion depth exceeded",
//           "Tail recursion optimization: compiler converts to iteration",
//           "Types: direct recursion, indirect recursion, tail recursion"
//         ],
//         example: `// Classic recursion examples
// // 1. Factorial
// int factorial(int n) {
//     if (n <= 1) return 1;           // base case
//     return n * factorial(n - 1);    // recursive case
// }

// // 2. Fibonacci
// int fib(int n) {
//     if (n <= 1) return n;           // base case
//     return fib(n-1) + fib(n-2);    // two recursive calls
// }

// // 3. Power
// double power(double base, int exp) {
//     if (exp == 0) return 1;
//     if (exp % 2 == 0)
//         return power(base * base, exp / 2);  // fast power
//     return base * power(base, exp - 1);
// }

// // 4. Sum of array
// int sum(int[] arr, int n) {
//     if (n == 0) return 0;
//     return arr[n-1] + sum(arr, n-1);
// }

// // Recursion tree for fib(4):
// //        fib(4)
// //       /      \\
// //    fib(3)   fib(2)
// //    /    \\   /    \\
// // fib(2) fib(1) fib(1) fib(0)`
//       },
//       "Exception Handling": {
//         explanation: "Exception handling manages runtime errors gracefully, preventing program crashes and providing meaningful error messages or recovery mechanisms.",
//         details: [
//           "try: code that might throw exception",
//           "catch: handles specific exceptions",
//           "finally: always executes (cleanup)",
//           "throw/throws: explicitly throw exceptions"
//         ],
//         example: `// Java exception handling
// try {
//     int[] arr = new int[5];
//     arr[10] = 1;  // ArrayIndexOutOfBoundsException!
//     int result = 10 / 0;  // ArithmeticException!
// } catch (ArrayIndexOutOfBoundsException e) {
//     System.out.println("Array error: " + e.getMessage());
// } catch (ArithmeticException e) {
//     System.out.println("Math error: " + e.getMessage());
// } catch (Exception e) {  // catch-all (should be last)
//     System.out.println("Error: " + e.getMessage());
// } finally {
//     System.out.println("This always executes!");
// }

// // Custom exception
// class InsufficientFundsException extends Exception {
//     private double amount;
//     public InsufficientFundsException(double amount) {
//         super("Insufficient funds: need " + amount + " more");
//         this.amount = amount;
//     }
// }

// // Python exception handling
// try:
//     x = int(input("Enter number: "))
//     result = 10 / x
// except ValueError:
//     print("Not a number!")
// except ZeroDivisionError:
//     print("Cannot divide by zero!")
// except Exception as e:
//     print(f"Error: {e}")
// else:
//     print(f"Result: {result}")  # runs if no exception
// finally:
//     print("Done!")`
//       },
//       "Functions/Methods": {
//         explanation: "Functions (or methods in OOP) are reusable blocks of code that perform specific tasks. They accept inputs (parameters) and optionally return outputs.",
//         details: [
//           "Parameters: variables in function definition",
//           "Arguments: values passed when calling function",
//           "Return type: type of value returned",
//           "Scope: local variables exist only within function"
//         ],
//         example: `// Java method
// public static int add(int a, int b) {
//     return a + b;
// }
// // Return type: int; Parameters: a, b

// // Method overloading
// int add(int a, int b) { return a + b; }
// double add(double a, double b) { return a + b; }
// String add(String a, String b) { return a + b; }

// // Varargs
// int sum(int... numbers) {
//     int total = 0;
//     for (int n : numbers) total += n;
//     return total;
// }
// sum(1, 2, 3, 4, 5);  // any number of args

// // Python function
// def greet(name, greeting="Hello"):  # default param
//     return f"{greeting}, {name}!"

// greet("Alice")              # "Hello, Alice!"
// greet("Bob", "Hi")          # "Hi, Bob!"
// greet(greeting="Hey", name="Carol")  # keyword args

// # Lambda (anonymous function)
// square = lambda x: x ** 2
// double = lambda x: x * 2
// print(list(map(square, [1,2,3,4,5])))  # [1,4,9,16,25]`
//       }
//     }
//   },
//   "AI / ML / GenAI": {
//     icon: "ti-brain",
//     color: "#A32D2D",
//     topics: {
//       "Machine Learning": {
//         explanation: "Machine Learning (ML) is a subset of AI where systems learn from data to make predictions or decisions without being explicitly programmed for each task.",
//         details: [
//           "Supervised: labeled data (classification, regression)",
//           "Unsupervised: unlabeled data (clustering, dimensionality reduction)",
//           "Reinforcement: learn through rewards and penalties",
//           "Training vs test set: 80/20 or 70/30 split typical"
//         ],
//         example: `# Supervised Learning - Linear Regression
// from sklearn.linear_model import LinearRegression
// import numpy as np

// X = np.array([[1],[2],[3],[4],[5]])  # features (house size)
// y = np.array([150,250,300,400,500]) # labels (price in $K)

// model = LinearRegression()
// model.fit(X, y)         # train

// prediction = model.predict([[6]])  # predict
// print(prediction)  # ~580K

// # Classification - Logistic Regression
// from sklearn.linear_model import LogisticRegression
// from sklearn.datasets import load_iris

// X, y = load_iris(return_X_y=True)
// model = LogisticRegression()
// model.fit(X[:120], y[:120])       # train on 120 samples
// accuracy = model.score(X[120:], y[120:])  # test on rest

// # Unsupervised - K-Means Clustering
// from sklearn.cluster import KMeans
// kmeans = KMeans(n_clusters=3)
// kmeans.fit(X)
// labels = kmeans.labels_  # which cluster each point belongs to`
//       },
//       "Neural Networks": {
//         explanation: "Neural networks are ML models inspired by the brain. They consist of layers of interconnected nodes (neurons) that learn by adjusting weights through backpropagation.",
//         details: [
//           "Input layer → Hidden layers → Output layer",
//           "Activation functions: ReLU, Sigmoid, Tanh, Softmax",
//           "Backpropagation: compute gradients, adjust weights",
//           "Gradient descent: optimize weights to minimize loss"
//         ],
//         example: `# Neural Network with PyTorch
// import torch
// import torch.nn as nn

// class SimpleNN(nn.Module):
//     def __init__(self):
//         super().__init__()
//         self.network = nn.Sequential(
//             nn.Linear(784, 256),   # input: 28×28 image
//             nn.ReLU(),
//             nn.Linear(256, 128),
//             nn.ReLU(),
//             nn.Linear(128, 10),    # output: 10 classes (digits)
//             nn.Softmax(dim=1)
//         )
    
//     def forward(self, x):
//         return self.network(x)

// model = SimpleNN()
// optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
// criterion = nn.CrossEntropyLoss()

// # Training loop
// for epoch in range(100):
//     output = model(X_train)
//     loss = criterion(output, y_train)
//     optimizer.zero_grad()
//     loss.backward()      # backpropagation
//     optimizer.step()     # update weights`
//       },
//       "LLMs": {
//         explanation: "Large Language Models (LLMs) are transformer-based neural networks trained on massive text corpora to understand and generate human language. Examples: GPT-4, Claude, Gemini.",
//         details: [
//           "Architecture: transformer with self-attention mechanism",
//           "Pre-training: predict next token on large dataset",
//           "Fine-tuning: adapt to specific tasks/behavior",
//           "RLHF: Reinforcement Learning from Human Feedback"
//         ],
//         example: `// LLM concepts
// Tokenization: "Hello world" → [15496, 995] (token IDs)
// Context window: max tokens model can process at once
// Temperature: randomness in generation (0=deterministic, 1=creative)
// Top-p sampling: sample from top p% probability tokens

// // Using OpenAI API
// const response = await openai.chat.completions.create({
//     model: "gpt-4",
//     messages: [
//         { role: "system", content: "You are a helpful assistant." },
//         { role: "user", content: "Explain recursion simply." }
//     ],
//     temperature: 0.7,
//     max_tokens: 500
// });
// console.log(response.choices[0].message.content);

// // Transformer attention: "The bank on the river bank"
// // Attention helps model understand which "bank" means what
// // by looking at context ("river" → financial bank? No → riverbank)`
//       },
//       "Prompt Engineering": {
//         explanation: "Prompt engineering is the practice of designing effective inputs for LLMs to get desired, high-quality outputs. It's the art of communicating clearly with AI.",
//         details: [
//           "Zero-shot: no examples provided",
//           "Few-shot: provide 2-5 examples in prompt",
//           "Chain-of-thought: ask model to think step-by-step",
//           "Role prompting: give the AI a persona/role"
//         ],
//         example: `// Zero-shot prompting
// "Classify the sentiment: 'This movie was amazing!'"
// // Output: Positive

// // Few-shot prompting
// """
// Classify the sentiment:
// 'Terrible product.' → Negative
// 'I love it!' → Positive
// 'Not bad, could be better.' → Neutral
// 'This is absolutely wonderful!' → 
// """
// // Output: Positive (learned from examples)

// // Chain-of-thought
// "Q: Roger has 5 tennis balls. He buys 2 more cans of 3.
// How many does he have?
// A: Let me think step by step:
//    Roger starts with 5 balls.
//    2 cans × 3 balls = 6 new balls.
//    5 + 6 = 11 balls total."

// // System prompt (role + context)
// "You are a senior software engineer reviewing code.
// Identify security vulnerabilities, suggest fixes,
// and rate severity on scale 1-10."

// // Structured output
// "Return JSON only:
// {'function': ..., 'complexity': ..., 'bugs': []}"`
//       },
//       "RAG": {
//         explanation: "Retrieval-Augmented Generation (RAG) enhances LLMs by retrieving relevant documents from a knowledge base and including them in the prompt context, giving the model up-to-date or domain-specific knowledge.",
//         details: [
//           "Problem: LLMs have knowledge cutoffs and may hallucinate",
//           "Solution: retrieve relevant documents → inject into prompt",
//           "Components: Document store, Embedding model, Vector DB, LLM",
//           "Enables private knowledge bases without fine-tuning"
//         ],
//         example: `// RAG pipeline
// // 1. INDEXING (done once)
// from langchain.embeddings import OpenAIEmbeddings
// from langchain.vectorstores import Chroma

// # Load and split documents
// docs = load_documents("company_docs/")
// chunks = split_into_chunks(docs, chunk_size=500)

// # Create embeddings and store
// embeddings = OpenAIEmbeddings()
// vectorstore = Chroma.from_documents(chunks, embeddings)

// // 2. QUERYING
// query = "What is our refund policy?"

// # Retrieve relevant chunks
// relevant_docs = vectorstore.similarity_search(query, k=3)

// # Build augmented prompt
// context = "\\n".join([doc.page_content for doc in relevant_docs])
// prompt = f"""
// Context information:
// {context}

// Based on the context, answer: {query}
// """

// # Generate answer with LLM
// answer = llm(prompt)`
//       },
//       "Hallucinations": {
//         explanation: "LLM hallucinations occur when a model generates confident but factually incorrect information. The model 'makes up' plausible-sounding but false content.",
//         details: [
//           "Factual hallucination: wrong facts presented confidently",
//           "Source hallucination: citing non-existent papers/sources",
//           "Causes: gaps in training data, overconfident generation",
//           "Mitigation: RAG, grounding, factual verification, lower temperature"
//         ],
//         example: `// Example hallucination
// User: "What did Einstein say about quantum computing?"
// LLM: "Einstein famously stated 'Quantum computing will 
//       revolutionize civilization by 2050' in his 1949 lecture."
// // HALLUCINATION: Einstein died in 1955, quantum computing
// // was not conceived then. This quote doesn't exist.

// // Mitigation strategies
// 1. RAG: provide actual sources to model
//    "Based on these retrieved documents: [...]"

// 2. Self-consistency: ask multiple times, compare
//    "Let me verify this answer..."

// 3. Citation checking: ask model to cite sources
//    "Only answer if you can cite a specific source."

// 4. Grounding: restrict to provided context only
//    "Answer ONLY using the provided document. 
//     If not in document, say 'I don't know.'"

// 5. Temperature=0: more deterministic, less creative`
//       }
//     }
//   },
//   "Software Engineering": {
//     icon: "ti-settings",
//     color: "#5F5E5A",
//     topics: {
//       "SDLC": {
//         explanation: "The Software Development Life Cycle (SDLC) is a structured process for planning, creating, testing, and deploying software. It provides a framework for managing the entire development lifecycle.",
//         details: [
//           "Phases: Planning, Requirements, Design, Implementation, Testing, Deployment, Maintenance",
//           "Models: Waterfall, Agile, Spiral, V-Model, RAD",
//           "Goal: deliver high-quality software on time and within budget"
//         ],
//         example: `// SDLC phases
// 1. PLANNING
//    - Feasibility study
//    - Project timeline and budget
//    - Resource allocation

// 2. REQUIREMENTS ANALYSIS
//    - Functional requirements (what system does)
//    - Non-functional requirements (performance, security)
//    - SRS (Software Requirements Specification) document

// 3. SYSTEM DESIGN
//    - High-level design (HLD): architecture, tech stack
//    - Low-level design (LLD): database schema, class diagrams

// 4. IMPLEMENTATION (Coding)
//    - Development per design documents
//    - Code reviews, version control

// 5. TESTING
//    - Unit, Integration, System, UAT testing
//    - Bug fixes

// 6. DEPLOYMENT
//    - Release to production
//    - User training

// 7. MAINTENANCE
//    - Bug fixes, updates, enhancements`
//       },
//       "Agile/Scrum": {
//         explanation: "Agile is an iterative software development methodology. Scrum is a popular Agile framework using short sprints (1-4 weeks) to deliver working software incrementally.",
//         details: [
//           "Scrum roles: Product Owner, Scrum Master, Development Team",
//           "Artifacts: Product Backlog, Sprint Backlog, Increment",
//           "Ceremonies: Sprint Planning, Daily Standup, Sprint Review, Retrospective",
//           "Values: Individuals, Working software, Customer collaboration, Responding to change"
//         ],
//         example: `// Scrum Sprint cycle
// Sprint (2 weeks):
// ┌─ Sprint Planning ─────────────────────────────┐
// │  - PO presents backlog                         │
// │  - Team selects items for sprint               │
// │  - Break into tasks (story points)             │
// └────────────────────────────────────────────────┘
//          ↓ (every day)
// ┌─ Daily Standup (15 min) ──────────────────────┐
// │  - What did I do yesterday?                    │
// │  - What will I do today?                       │
// │  - Any blockers?                               │
// └────────────────────────────────────────────────┘
//          ↓ (end of sprint)
// ┌─ Sprint Review ────────────────────────────────┐
// │  - Demo working software to stakeholders       │
// └────────────────────────────────────────────────┘
// ┌─ Sprint Retrospective ─────────────────────────┐
// │  - What went well?                             │
// │  - What to improve?                            │
// └────────────────────────────────────────────────┘

// // User Story format
// "As a [user], I want [feature] so that [benefit]"
// Example: "As a customer, I want to filter products by 
//           price so that I can find affordable items."`
//       },
//       "Git": {
//         explanation: "Git is a distributed version control system that tracks changes in code, enables collaboration, and allows reverting to previous versions.",
//         details: [
//           "Repository: project folder tracked by git",
//           "Commit: snapshot of changes",
//           "Branch: independent line of development",
//           "Merge: combine branches; Rebase: replay commits"
//         ],
//         example: `// Git workflow
// git init                    # initialize repository
// git clone <url>             # clone remote repo

// git status                  # check changes
// git add file.js             # stage specific file
// git add .                   # stage all changes
// git commit -m "Add login"   # commit with message

// git branch feature/login    # create branch
// git checkout feature/login  # switch to branch
// git checkout -b feature/signup  # create and switch

// git push origin main        # push to remote
// git pull origin main        # pull latest changes

// git merge feature/login     # merge branch into current
// git rebase main             # rebase onto main

// // Common workflow
// git log --oneline           # view commit history
// git diff                    # see unstaged changes
// git stash                   # temporarily save changes
// git stash pop               # restore stashed changes
// git reset --soft HEAD~1     # undo last commit (keep changes)
// git reset --hard HEAD~1     # undo last commit (discard changes)
// git cherry-pick <hash>      # apply specific commit`
//       }
//     }
//   },
//   "Cybersecurity": {
//     icon: "ti-shield",
//     color: "#3C3489",
//     topics: {
//       "Encryption": {
//         explanation: "Encryption converts readable data (plaintext) into an unreadable format (ciphertext) using an algorithm and key. Only authorized parties with the correct key can decrypt it.",
//         details: [
//           "Symmetric: same key for encrypt/decrypt (AES, DES) — fast",
//           "Asymmetric: public key encrypts, private key decrypts (RSA, ECC) — slow but key exchange solved",
//           "Key length: longer = more secure (AES-256 is current standard)",
//           "TLS uses asymmetric to exchange symmetric key, then symmetric for speed"
//         ],
//         example: `// Symmetric encryption (AES-256)
// // Same key used for both encrypt and decrypt
// from Crypto.Cipher import AES
// from Crypto.Random import get_random_bytes

// key = get_random_bytes(32)    # 256-bit key
// cipher = AES.new(key, AES.MODE_GCM)
// ciphertext, tag = cipher.encrypt_and_digest(b"Secret message")

// # Decrypt
// cipher = AES.new(key, cipher.nonce, AES.MODE_GCM)
// plaintext = cipher.decrypt_and_verify(ciphertext, tag)

// // Asymmetric encryption (RSA)
// // Alice sends Bob a message:
// // 1. Alice gets Bob's PUBLIC key (shared openly)
// // 2. Alice encrypts message with Bob's public key
// // 3. Only Bob can decrypt with his PRIVATE key

// from cryptography.hazmat.primitives.asymmetric import rsa, padding
// private_key = rsa.generate_private_key(65537, 2048)
// public_key = private_key.public_key()

// # Encrypt
// ciphertext = public_key.encrypt(b"Hello Bob", padding.OAEP(...))
// # Decrypt
// plaintext = private_key.decrypt(ciphertext, padding.OAEP(...))`
//       },
//       "Hashing": {
//         explanation: "Hashing converts input data into a fixed-size string (hash/digest) using a one-way function. The same input always produces the same hash, but you can't reverse a hash to get the input.",
//         details: [
//           "One-way function: hash → original data is computationally infeasible",
//           "Deterministic: same input → same hash always",
//           "Avalanche effect: small input change → completely different hash",
//           "Algorithms: MD5 (broken), SHA-1 (deprecated), SHA-256, SHA-3, bcrypt (passwords)"
//         ],
//         example: `// Python hashing
// import hashlib

// # SHA-256
// data = "password123"
// hash = hashlib.sha256(data.encode()).hexdigest()
// # "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f"

// # Same input → same hash (deterministic)
// hashlib.sha256(b"password123").hexdigest() == hash  # True

// # Different input → completely different hash
// hashlib.sha256(b"password124").hexdigest()
// # "5e8a36c9..." (completely different!)

// # Password hashing (use bcrypt, not SHA-256!)
// import bcrypt
// password = b"mypassword"
// salt = bcrypt.gensalt()
// hashed = bcrypt.hashpw(password, salt)
// # "$2b$12$randomsalthere...hashedpassword..."

// # Verify (timing-safe)
// bcrypt.checkpw(b"mypassword", hashed)    # True
// bcrypt.checkpw(b"wrongpassword", hashed) # False

// # Why bcrypt? It's slow by design (resists brute force)
// # SHA-256: billions/sec; bcrypt: ~100/sec`
//       }
//     }
//   },
//   "Cloud & DevOps": {
//     icon: "ti-cloud",
//     color: "#185FA5",
//     topics: {
//       "Docker": {
//         explanation: "Docker is a platform for building, packaging, and running applications in containers — lightweight, portable environments that include everything needed to run the application.",
//         details: [
//           "Container: running instance of an image",
//           "Image: read-only template (built from Dockerfile)",
//           "Dockerfile: instructions to build an image",
//           "Docker Hub: public registry for images"
//         ],
//         example: `# Dockerfile example
// FROM python:3.11-slim              # base image

// WORKDIR /app                        # set working directory
// COPY requirements.txt .             # copy dependency file
// RUN pip install -r requirements.txt # install deps
// COPY . .                            # copy source code
// EXPOSE 8000                         # document port
// CMD ["python", "app.py"]            # start command

// # Build and run
// docker build -t myapp:latest .
// docker run -p 8080:8000 myapp:latest
// # localhost:8080 maps to container's 8000

// # Common Docker commands
// docker ps                   # list running containers
// docker ps -a                # list all containers
// docker images               # list images
// docker pull nginx           # pull image from registry
// docker exec -it <id> bash   # enter running container
// docker logs <id>            # view container logs
// docker stop <id>            # stop container
// docker rm <id>              # remove container
// docker rmi <image>          # remove image

// # docker-compose.yml
// version: '3'
// services:
//   web:
//     build: .
//     ports: ["8000:8000"]
//   db:
//     image: postgres:14
//     environment:
//       POSTGRES_PASSWORD: secret`
//       },
//       "CI/CD": {
//         explanation: "CI/CD (Continuous Integration/Continuous Deployment) automates the process of integrating code changes, running tests, and deploying to production.",
//         details: [
//           "CI: automatically build and test on every commit",
//           "CD: automatically deploy to staging/production after tests pass",
//           "Tools: GitHub Actions, Jenkins, GitLab CI, CircleCI",
//           "Benefits: faster releases, catch bugs early, consistent deployments"
//         ],
//         example: `# GitHub Actions CI/CD pipeline (.github/workflows/main.yml)
// name: CI/CD Pipeline

// on:
//   push:
//     branches: [main]
//   pull_request:
//     branches: [main]

// jobs:
//   test:
//     runs-on: ubuntu-latest
//     steps:
//       - uses: actions/checkout@v3
//       - name: Set up Python
//         uses: actions/setup-python@v4
//         with:
//           python-version: '3.11'
//       - name: Install dependencies
//         run: pip install -r requirements.txt
//       - name: Run tests
//         run: pytest tests/
  
//   deploy:
//     needs: test  # only deploy if tests pass
//     runs-on: ubuntu-latest
//     if: github.ref == 'refs/heads/main'
//     steps:
//       - name: Deploy to production
//         run: |
//           docker build -t app:latest .
//           docker push registry/app:latest
//           kubectl rollout restart deployment/app`
//       }
//     }
//   },
//   "Java": {
//     icon: "ti-coffee",
//     color: "#D85A30",
//     topics: {
//       "Collections Framework": {
//         explanation: "Java Collections Framework provides a unified architecture for storing and manipulating groups of objects. Key interfaces: List, Set, Map, Queue.",
//         details: [
//           "List: ordered, allows duplicates (ArrayList, LinkedList)",
//           "Set: no duplicates (HashSet, TreeSet, LinkedHashSet)",
//           "Map: key-value pairs (HashMap, TreeMap, LinkedHashMap)",
//           "Queue: FIFO (LinkedList, PriorityQueue, ArrayDeque)"
//         ],
//         example: `// ArrayList - dynamic array
// ArrayList<String> list = new ArrayList<>();
// list.add("Apple"); list.add("Banana"); list.add("Apple");
// list.get(0);           // "Apple"
// list.size();           // 3
// list.remove("Banana"); // by value
// list.contains("Apple");// true
// Collections.sort(list); // sort

// // HashMap - key-value store
// HashMap<String, Integer> map = new HashMap<>();
// map.put("Alice", 90);
// map.put("Bob", 85);
// map.getOrDefault("Carol", 0);  // 0 if key missing
// map.containsKey("Alice");      // true
// for (Map.Entry<String,Integer> e : map.entrySet())
//     System.out.println(e.getKey() + ": " + e.getValue());

// // HashSet - no duplicates
// HashSet<Integer> set = new HashSet<>(Arrays.asList(1,2,3,2,1));
// // set = {1, 2, 3} (duplicates removed)

// // Choose the right collection
// // Fast access by index? → ArrayList
// // Fast insert/delete in middle? → LinkedList
// // No duplicates? → HashSet
// // Sorted order? → TreeSet or TreeMap
// // Key-value, fast lookup? → HashMap`
//       },
//       "Multithreading in Java": {
//         explanation: "Java provides built-in support for multithreading. Threads can be created by extending Thread class or implementing Runnable interface.",
//         details: [
//           "Thread states: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED",
//           "synchronized: ensures only one thread executes block at a time",
//           "volatile: ensures variable is read from main memory, not cache",
//           "ExecutorService: thread pool for managing multiple threads"
//         ],
//         example: `// Thread creation
// // Method 1: extend Thread
// class MyTask extends Thread {
//     public void run() {
//         System.out.println(Thread.currentThread().getName());
//     }
// }
// new MyTask().start();

// // Method 2: implement Runnable (preferred)
// Runnable task = () -> System.out.println("Task running");
// Thread t = new Thread(task);
// t.start();

// // Synchronized method
// class Counter {
//     private int count = 0;
//     public synchronized void increment() { count++; }
//     public synchronized int getCount() { return count; }
// }

// // ExecutorService (thread pool)
// ExecutorService executor = Executors.newFixedThreadPool(4);
// for (int i = 0; i < 10; i++) {
//     final int taskId = i;
//     executor.submit(() -> System.out.println("Task " + taskId));
// }
// executor.shutdown();

// // Future (async result)
// Future<Integer> future = executor.submit(() -> {
//     Thread.sleep(1000);
//     return 42;
// });
// int result = future.get(); // blocks until done`
//       }
//     }
//   },
//   "Python": {
//     icon: "ti-brand-python",
//     color: "#3B6D11",
//     topics: {
//       "Python OOP": {
//         explanation: "Python supports OOP with classes, inheritance, and polymorphism. It uses dynamic typing and has special methods (dunder/magic methods) for operator overloading.",
//         details: [
//           "__init__: constructor",
//           "__str__: string representation",
//           "__repr__: developer representation",
//           "super(): call parent class method",
//           "Multiple inheritance supported"
//         ],
//         example: `class Animal:
//     species = "Unknown"  # class variable
    
//     def __init__(self, name, age):
//         self.name = name        # instance variable
//         self.age = age
    
//     def speak(self):
//         raise NotImplementedError  # abstract-like
    
//     def __str__(self):
//         return f"{self.name} ({self.age} yrs)"
    
//     def __repr__(self):
//         return f"Animal(name='{self.name}', age={self.age})"
    
//     def __eq__(self, other):
//         return self.name == other.name

// class Dog(Animal):
//     def __init__(self, name, age, breed):
//         super().__init__(name, age)  # call parent
//         self.breed = breed
    
//     def speak(self):
//         return f"{self.name} says: Woof!"
    
//     @classmethod
//     def from_string(cls, s):  # alternate constructor
//         name, age, breed = s.split(',')
//         return cls(name, int(age), breed)

// # Dunder methods for operator overloading
// class Vector:
//     def __init__(self, x, y): self.x, self.y = x, y
//     def __add__(self, other): return Vector(self.x+other.x, self.y+other.y)
//     def __len__(self): return int((self.x**2+self.y**2)**0.5)
//     def __str__(self): return f"({self.x}, {self.y})"`
//       },
//       "Dictionaries & Lists": {
//         explanation: "Python's built-in data structures. Lists are ordered, mutable sequences. Dictionaries are mutable key-value mappings (hash tables).",
//         details: [
//           "List: [], append, extend, insert, remove, pop, slice",
//           "Dict: {}, get, update, keys, values, items",
//           "List comprehension: [expr for x in iterable if cond]",
//           "Dict comprehension: {k:v for k,v in pairs}"
//         ],
//         example: `# List operations
// nums = [1, 2, 3, 4, 5]
// nums.append(6)           # [1,2,3,4,5,6]
// nums.insert(0, 0)        # [0,1,2,3,4,5,6]
// nums.pop()               # removes and returns 6
// nums.remove(3)           # removes first 3
// nums[1:3]                # slice: [1,2]
// nums[::-1]               # reverse: [5,4,3,2,1,0]
// sorted(nums)             # sorted copy
// nums.sort(reverse=True)  # sort in place

// # Dictionary operations
// student = {"name": "Alice", "age": 20, "gpa": 3.8}
// student["major"] = "CS"          # add key
// student.get("phone", "N/A")      # "N/A" if missing
// student.update({"age": 21})      # update values
// "name" in student                # True
// del student["gpa"]               # remove key

// # List comprehension (Pythonic)
// squares = [x**2 for x in range(10)]
// evens = [x for x in range(20) if x % 2 == 0]
// matrix = [[i*j for j in range(5)] for i in range(5)]

// # Dict comprehension
// word_len = {word: len(word) for word in ["apple","banana","fig"]}
// # {'apple': 5, 'banana': 6, 'fig': 3}`
//       }
//     }
//   }
// };

// const allTopics = Object.entries(notes).flatMap(([section, data]) =>
//   Object.keys(data.topics).map(topic => ({ section, topic }))
// );

// export default function CSNotes() {
//   const [activeSection, setActiveSection] = useState(Object.keys(notes)[0]);
//   const [activeTopic, setActiveTopic] = useState(Object.keys(notes[Object.keys(notes)[0]].topics)[0]);
//   const [search, setSearch] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const searchResults = useMemo(() => {
//     if (!search.trim()) return [];
//     const q = search.toLowerCase();
//     return allTopics.filter(({ topic, section }) =>
//       topic.toLowerCase().includes(q) || section.toLowerCase().includes(q)
//     ).slice(0, 10);
//   }, [search]);

//   const currentNote = notes[activeSection]?.topics[activeTopic];

//   const selectTopic = (section, topic) => {
//     setActiveSection(section);
//     setActiveTopic(topic);
//     setSearch("");
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh", fontFamily: "var(--font-sans)", background: "#ffffff", overflow: "hidden" }}>
//       {/* Sidebar */}
//       <div style={{
//         width: sidebarOpen ? 260 : 0,
//         minWidth: sidebarOpen ? 260 : 0,
//         transition: "all 0.2s",
//         overflow: "hidden",
//         background: "#ffffff",
//         borderRight: "0.5px solid #e0e0e0",
//         display: "flex",
//         flexDirection: "column"
//       }}>
//         <div style={{ padding: "16px 12px 8px", borderBottom: "0.5px solid #e0e0e0" }}>
//           <div style={{ fontWeight: 500, fontSize: 15, color: "#000000", marginBottom: 8 }}>
//             <i className="ti ti-book-2" style={{ marginRight: 6, color: "#333333" }} aria-hidden="true" />
//             CS Notes
//           </div>
//           <input
//             type="text"
//             placeholder="Search topics..."
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//             style={{ width: "100%", fontSize: 13, boxSizing: "border-box", color: "#000000", background: "#fff" }}
//           />
//           {searchResults.length > 0 && (
//             <div style={{ marginTop: 6, maxHeight: 200, overflowY: "auto", background: "#ffffff", borderRadius: 8, border: "0.5px solid #e0e0e0" }}>
//               {searchResults.map(({ section, topic }) => (
//                 <div key={`${section}:${topic}`}
//                   onClick={() => selectTopic(section, topic)}
//                   style={{ padding: "8px 10px", cursor: "pointer", fontSize: 12, borderBottom: "0.5px solid #e0e0e0" }}>
//                   <div style={{ fontWeight: 500, color: "#000000" }}>{topic}</div>
//                   <div style={{ color: "#666666", fontSize: 11 }}>{section}</div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         <div style={{ overflowY: "auto", flex: 1 }}>
//           {Object.entries(notes).map(([section, data]) => (
//             <div key={section}>
//               <div style={{
//                 padding: "10px 12px 4px",
//                 fontSize: 11,
//                 fontWeight: 500,
//                 color: "#555555",
//                 textTransform: "uppercase",
//                 letterSpacing: "0.06em",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 6
//               }}>
//                 <i className={`ti ${data.icon}`} style={{ fontSize: 13, color: data.color, color: "#333333" }} aria-hidden="true" />
//                 {section}
//               </div>
//               {Object.keys(data.topics).map(topic => (
//                 <div key={topic}
//                   onClick={() => selectTopic(section, topic)}
//                   style={{
//                     padding: "6px 12px 6px 28px",
//                     cursor: "pointer",
//                     fontSize: 13,
//                     color: activeSection === section && activeTopic === topic ? "#000000" : "#666666",
//                     background: activeSection === section && activeTopic === topic ? "#f0f0f0" : "transparent",
//                     borderLeft: activeSection === section && activeTopic === topic ? `3px solid ${data.color}` : "3px solid transparent",
//                     fontWeight: activeSection === section && activeTopic === topic ? 500 : 400
//                   }}>
//                   {topic}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main content */}
//       <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
//         {/* Top bar */}
//         <div style={{
//           padding: "12px 20px",
//           background: "#ffffff",
//           borderBottom: "0.5px solid #e0e0e0",
//           display: "flex",
//           alignItems: "center",
//           gap: 12,
//           position: "sticky",
//           top: 0,
//           zIndex: 10
//         }}>
//           <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#666666" }}>
//             <i className="ti ti-menu-2" style={{ fontSize: 18, color: "#333333" }} aria-hidden="true" />
//           </button>
//           <span style={{ fontSize: 13, color: "#666666" }}>{activeSection}</span>
//           <i className="ti ti-chevron-right" style={{ fontSize: 12, color: "#999999" }} aria-hidden="true" />
//           <span style={{ fontSize: 13, fontWeight: 500, color: "#000000" }}>{activeTopic}</span>
//         </div>

//         {/* Note content */}
//         {currentNote && (
//           <div style={{ padding: "24px 32px", maxWidth: 860 }}>
//             {/* Header */}
//             <div style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: 6,
//                 background: "#f5f5f5",
//                 padding: "4px 12px",
//                 borderRadius: 100,
//                 fontSize: 12,
//                 color: "#666666",
//                 marginBottom: 12
//               }}>
//                 <i className={`ti ${notes[activeSection].icon}`} style={{ color: notes[activeSection].color, fontSize: 13, color: "#333333" }} aria-hidden="true" />
//                 {activeSection}
//               </div>
//               <h1 style={{ margin: 0, fontSize: 26, fontWeight: 500, color: "#000000", marginBottom: 12 }}>
//                 {activeTopic}
//               </h1>
//               <p style={{ margin: 0, fontSize: 15, color: "#555555", lineHeight: 1.7 }}>
//                 {currentNote.explanation}
//               </p>

//             {/* Key Points */}
//             {currentNote.details && (
//               <div style={{
//                 background: "#f5f5f5",
//                 borderRadius: 10,
//                 padding: "16px 20px",
//                 marginBottom: 20,
//                 borderLeft: `3px solid ${notes[activeSection].color}`
//               }}>
//                 <div style={{ fontSize: 12, fontWeight: 500, color: "#666666", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
//                   Key Points
//                 </div>
//                 {currentNote.details.map((d, i) => (
//                   <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 13, color: "#000000", lineHeight: 1.6 }}>
//                     <span style={{ color: notes[activeSection].color, fontWeight: 500, minWidth: 16 }}>•</span>
//                     {d}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Code Example */}
//             {currentNote.example && (
//               <div style={{ marginBottom: 20 }}>
//                 <div style={{ fontSize: 12, fontWeight: 500, color: "#666666", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
//                   Syntax & Examples
//                 </div>
//                 <div style={{
//                   background: "#f5f5f5",
//                   borderRadius: 10,
//                   padding: "20px 24px",
//                   overflowX: "auto"
//                 }}>
//                   <pre style={{
//                     margin: 0,
//                     fontFamily: "var(--font-mono)",
//                     fontSize: 13,
//                     lineHeight: 1.7,
//                     color: "#000000",
//                     whiteSpace: "pre-wrap",
//                     wordBreak: "break-word"
//                   }}>
//                     {currentNote.example}
//                   </pre>
//                 </div>
//               </div>
//             )}

//             {/* Navigation between topics */}
//             <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, paddingTop: 20, borderTop: "0.5px solid #e0e0e0" }}>
//               {(() => {
//                 const topics = Object.keys(notes[activeSection].topics);
//                 const idx = topics.indexOf(activeTopic);
//                 const prev = idx > 0 ? topics[idx - 1] : null;
//                 const next = idx < topics.length - 1 ? topics[idx + 1] : null;
//                 return <>
//                   {prev ? (
//                     <button onClick={() => setActiveTopic(prev)} style={{ fontSize: 13, color: "#666666", cursor: "pointer" }}>
//                       <i className="ti ti-arrow-left" style={{ marginRight: 4 }} aria-hidden="true" />
//                       {prev}
//                     </button>
//                   ) : <span />}
//                   {next ? (
//                     <button onClick={() => setActiveTopic(next)} style={{ fontSize: 13, color: "#666666", cursor: "pointer" }}>
//                       {next}
//                       <i className="ti ti-arrow-right" style={{ marginLeft: 4 }} aria-hidden="true" />
//                     </button>
//                   ) : <span />}
//                 </>;
//               })()}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // To run this code, create a new React app (e.g. with Create React App), replace the contents of App.jsx with the above code, and add the following to index.css for the icons:


import { useState, useMemo } from "react";

const notes = {
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
  Task:  Binary classification
  Output: SPAM / NOT SPAM

Generative AI:
  Input: "Write a professional email declining a meeting"
  Task:  Content generation
  Output: "Dear [Name], Thank you for the invitation...
           Unfortunately, I'm unable to attend due to..."

// Real-world applications
Text:    ChatGPT, Claude, Gemini → writing, Q&A, coding
Images:  DALL·E, Midjourney, Stable Diffusion → art, design
Code:    GitHub Copilot, Claude Code → code completion
Audio:   Suno, ElevenLabs → music, voice synthesis
Video:   Sora, Runway → video generation

// Foundation: all modern GenAI is built on Transformers
                  +------------------+
  Transformers → | Self-Attention    | → Understand context
                  | Positional Enc.  | → Order-aware
                  | Feed-Forward     | → Pattern learning
                  +------------------+`
      },
      "Machine Learning Basics": {
        explanation: "Machine Learning is a subset of AI where systems learn patterns from data rather than following explicitly programmed rules. It is the foundation that makes Generative AI possible.",
        details: [
          "Supervised learning: labeled data pairs (input→output); learns to predict",
          "Unsupervised learning: unlabeled data; discovers hidden structure",
          "Reinforcement learning: agent learns by reward/penalty feedback",
          "Features: input variables (columns); Labels: target output (what we predict)",
          "Overfitting: model memorizes training data, fails on new data",
          "Underfitting: model too simple, cannot capture patterns in data",
          "Training/test split: typically 80/20 or 70/30"
        ],
        example: `# Supervised Learning — Linear Regression (house price)
from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([[1000],[1500],[2000],[2500]])  # sq ft (feature)
y = np.array([200000, 280000, 350000, 420000])  # price (label)

model = LinearRegression()
model.fit(X, y)               # learn from training data
print(model.predict([[1800]])) # predict new house: ~319,000

# Classification — Logistic Regression (spam or not)
from sklearn.linear_model import LogisticRegression
# X = email features (word counts, caps ratio, etc.)
# y = [1=spam, 0=not spam]

# Unsupervised — K-Means (customer segmentation)
from sklearn.cluster import KMeans
kmeans = KMeans(n_clusters=3)  # find 3 customer groups
kmeans.fit(X)                   # no labels needed!

# Overfitting example
# Training accuracy: 99%   ← memorized training data
# Test accuracy:     65%   ← fails on new data
# Fix: regularization, more data, simpler model

# Underfitting example
# Training accuracy: 60%   ← model too simple
# Test accuracy:     58%
# Fix: more complex model, more features`
      },
      "Deep Learning Basics": {
        explanation: "Deep Learning uses multi-layered neural networks to learn representations of data automatically. It powers almost all modern Generative AI — from image generation to language models.",
        details: [
          "Neural network: layers of artificial neurons inspired by the brain",
          "Input layer: receives raw data (pixels, words, numbers)",
          "Hidden layers: learn increasingly abstract features",
          "Output layer: final prediction (class, score, token)",
          "Activation functions: add non-linearity (ReLU, Sigmoid, Tanh, Softmax)",
          "Backpropagation: computes gradients; weights updated via gradient descent",
          "Epoch: one full pass through the training dataset"
        ],
        example: `# Neural network with PyTorch
import torch
import torch.nn as nn

class SimpleNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.layers = nn.Sequential(
            nn.Linear(784, 256),   # input → hidden (784 pixels)
            nn.ReLU(),             # activation: max(0, x)
            nn.Linear(256, 128),   # hidden → hidden
            nn.ReLU(),
            nn.Linear(128, 10),    # hidden → output (10 digits)
            nn.Softmax(dim=1)      # probabilities: sum=1
        )
    def forward(self, x):
        return self.layers(x)

model = SimpleNN()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
criterion = nn.CrossEntropyLoss()

# Training loop
for epoch in range(50):
    predictions = model(X_train)       # forward pass
    loss = criterion(predictions, y)   # measure error
    optimizer.zero_grad()
    loss.backward()      # backprop: compute gradients
    optimizer.step()     # update weights: w -= lr * grad

# Activation function choice:
# ReLU:    f(x) = max(0, x)  — hidden layers (fast, standard)
# Sigmoid: f(x) = 1/(1+e⁻ˣ) — binary output (0 to 1)
# Softmax: multi-class output (sums to 1)
# Tanh:    f(x) = (eˣ-e⁻ˣ)/(eˣ+e⁻ˣ)  — (-1 to 1)`
      },
      "NLP Fundamentals": {
        explanation: "Natural Language Processing (NLP) enables computers to understand and process human language. LLMs are built on NLP foundations — understanding these concepts is essential for working with language models.",
        details: [
          "Tokenization: splitting text into tokens (words, subwords, or characters)",
          "Stop words: common words with little meaning (the, is, a, an) — often removed",
          "Stemming: reduce word to root form (running → run, studies → studi) — crude",
          "Lemmatization: reduce to proper root (running → run, better → good) — accurate",
          "POS tagging: label each word's grammatical role (noun, verb, adjective...)",
          "NER: Named Entity Recognition — identify names, places, dates in text",
          "Sentiment analysis: detect emotional tone (positive, negative, neutral)"
        ],
        example: `import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer

text = "The students are running quickly through the library"

# Tokenization
tokens = word_tokenize(text)
# ["The","students","are","running","quickly","through","the","library"]

# Remove stop words
stop = set(stopwords.words('english'))
filtered = [t for t in tokens if t.lower() not in stop]
# ["students","running","quickly","library"]

# Stemming (crude)
ps = PorterStemmer()
stemmed = [ps.stem(w) for w in filtered]
# ["student","run","quickli","librari"]   ← "quickli" not a real word

# Lemmatization (accurate)
lem = WordNetLemmatizer()
lemmatized = [lem.lemmatize(w, pos='v') for w in filtered]
# ["student","run","quickly","library"]  ← proper words

# POS tagging
tagged = nltk.pos_tag(tokens)
# [("The","DT"),("students","NNS"),("are","VBP"),("running","VBG")]
# DT=determiner, NNS=plural noun, VBP=verb, VBG=verb-ing

# NER — spaCy
import spacy
nlp = spacy.load("en_core_web_sm")
doc = nlp("Apple Inc. was founded by Steve Jobs in Cupertino.")
for ent in doc.ents:
    print(ent.text, ent.label_)
# Apple Inc.  → ORG
# Steve Jobs  → PERSON
# Cupertino   → GPE (geopolitical entity)

# Sentiment Analysis
from transformers import pipeline
sentiment = pipeline("sentiment-analysis")
sentiment("This movie was absolutely fantastic!")
# [{'label': 'POSITIVE', 'score': 0.9998}]`
      },
      "Transformers": {
        explanation: "The Transformer architecture (2017, 'Attention Is All You Need') is the foundation of all modern LLMs. Its self-attention mechanism allows parallel processing and captures long-range dependencies far better than RNNs.",
        details: [
          "Encoder: reads input, creates contextual representations (used in BERT)",
          "Decoder: generates output token by token (used in GPT)",
          "Self-attention: each token attends to all other tokens simultaneously",
          "Multi-head attention: multiple heads capture different relationships",
          "Positional encoding: adds order information (transformers process all tokens at once)",
          "Why better than RNNs: parallel processing, no vanishing gradient, long-range deps",
          "Attention formula: Attention(Q,K,V) = softmax(QKᵀ / √d_k) · V"
        ],
        example: `# Transformer architecture overview
# Input: "The cat sat on the mat"

# STEP 1: Tokenize + Embed
tokens = ["The", "cat", "sat", "on", "the", "mat"]
embeddings = embed(tokens)  # each token → 512-dim vector

# STEP 2: Add positional encoding
# Inject position info (transformers process all tokens at once)
pe = positional_encoding(sequence_length=6, d_model=512)
x = embeddings + pe

# STEP 3: Self-attention
# Each token asks: "which other tokens are relevant to me?"
# Q (query): what am I looking for?
# K (key):   what do I offer?
# V (value): what info do I provide if matched?
Q = x @ W_Q  # query projection
K = x @ W_K  # key projection
V = x @ W_V  # value projection

# Attention score
scores = (Q @ K.T) / math.sqrt(d_k)  # scaled dot product
weights = softmax(scores)              # probabilities
output = weights @ V                   # weighted sum of values

# For "sat": high attention to "cat" (subject) and "mat" (object)

# STEP 4: Multi-head attention (8 heads typical)
# Head 1 might focus on syntax
# Head 2 might focus on coreference
# Head 3 might focus on semantic relations
# Results concatenated + projected

# WHY TRANSFORMERS WIN over RNNs:
# RNN:         processes tokens one-by-one (slow, sequential)
# Transformer: processes ALL tokens in PARALLEL (fast)
# RNN:         struggles with long sequences (gradient vanishes)
# Transformer: attention spans entire sequence (no distance limit)

# Encoder-only:   BERT → understanding tasks (classification)
# Decoder-only:   GPT, Claude → generation tasks
# Encoder-Decoder: T5, BART → translation, summarization`
      },
      "Large Language Models": {
        explanation: "Large Language Models (LLMs) are transformer-based models trained on massive text datasets to predict the next token. Through this simple objective on enough data, they develop emergent abilities like reasoning, coding, and instruction following.",
        details: [
          "Core task: next-token prediction — trained on trillions of tokens",
          "Parameters: adjustable weights (GPT-3: 175B, GPT-4: ~1T estimated)",
          "Pretraining: unsupervised learning on internet-scale text",
          "Fine-tuning: adapt pretrained model to specific task with labeled data",
          "RLHF: Reinforcement Learning from Human Feedback — aligns model with human preferences",
          "Context window: max tokens model can process at once (4K → 1M+ tokens)",
          "Hallucination: confident generation of false information"
        ],
        example: `# How LLMs work — next token prediction
# Training objective: given context, predict next word
# "The Eiffel Tower is located in ___" → "Paris"
# "def factorial(n): if n == 0: return ___" → "1"

# Tokenization (GPT-4 uses tiktoken — BPE encoding)
import tiktoken
enc = tiktoken.encoding_for_model("gpt-4")
tokens = enc.encode("Hello world!")
# [9906, 1917, 0]  ← integer token IDs
# Token ≠ word: "unhappy" → ["un", "happy"] (2 tokens)
# Rule of thumb: 1 token ≈ 0.75 words (English)

# Key parameters when calling an LLM API
import anthropic
client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-opus-4-6",
    max_tokens=1000,          # max output length
    temperature=0.7,          # 0=deterministic, 1=creative
    messages=[
        {"role": "user", "content": "Explain backpropagation"}
    ]
)

# Temperature effect:
# temperature=0.0 → always picks most probable token (consistent)
# temperature=0.7 → moderate creativity (good default)
# temperature=1.0 → very creative, sometimes incoherent

# Model size vs capability
# GPT-2:  1.5B params  → basic text, often incoherent
# GPT-3:  175B params  → few-shot capable, good general tasks
# GPT-4:  ~1T params   → reasoning, complex tasks, multimodal

# RLHF pipeline:
# 1. Pretrain on internet text (predict next token)
# 2. Fine-tune on demonstration data (supervised)
# 3. Train reward model from human preference rankings
# 4. Optimize LLM against reward model via PPO`
      },
      "Prompt Engineering": {
        explanation: "Prompt engineering is the practice of crafting effective inputs to get high-quality, reliable outputs from LLMs. It is a critical skill because the same model can give vastly different results depending on how you phrase the request.",
        details: [
          "Zero-shot: direct question with no examples — relies on model's pretrained knowledge",
          "One-shot: one example before the actual request",
          "Few-shot: 2–5 examples to demonstrate the desired pattern",
          "Chain-of-thought: ask model to 'think step by step' — dramatically improves reasoning",
          "Role prompting: assign a persona ('You are an expert Python developer...')",
          "System prompt: persistent instructions shaping all responses in a session",
          "Structured output: ask for JSON, XML, or specific formats for downstream use"
        ],
        example: `// ZERO-SHOT
"Classify the sentiment of: 'This product is terrible!'"
// Output: Negative

// ONE-SHOT
"Classify sentiment:
'I love this!' → Positive
'The battery died after 2 hours.' → "
// Output: Negative

// FEW-SHOT
"Translate English to SQL:
'Find all users' → SELECT * FROM users;
'Count products' → SELECT COUNT(*) FROM products;
'List orders from 2024' → "
// Output: SELECT * FROM orders WHERE YEAR(created_at)=2024;

// CHAIN-OF-THOUGHT
"A store had 45 apples. They sold 30% on Monday and 12 on Tuesday.
How many remain? Think step by step."
// Step 1: 30% of 45 = 13.5 → sold ~14 on Monday
// Step 2: Remaining: 45 - 14 = 31
// Step 3: After Tuesday: 31 - 12 = 19 apples

// ROLE PROMPTING
"You are a senior security engineer conducting a code review.
Identify SQL injection vulnerabilities and suggest parameterized fixes."

// STRUCTURED OUTPUT
"Analyze this code and return ONLY valid JSON:
{
  'issues': [...],
  'severity': 'low|medium|high',
  'fixed_code': '...'
}"

// BAD vs GOOD prompt
Bad:  "Write code"
Good: "Write a Python function that takes a list of integers,
       removes duplicates, sorts in descending order, and returns
       the result. Include type hints and a docstring."

// Prompt template (LangChain style)
from langchain.prompts import ChatPromptTemplate
prompt = ChatPromptTemplate.from_template(
    "You are a {role}. Explain {concept} to a {audience}."
)
formatted = prompt.format_messages(
    role="teacher", concept="recursion", audience="10-year-old"
)`
      },
      "Generative Models": {
        explanation: "Generative models are the architectural families that power content generation. Three main types dominate: GANs (adversarial), VAEs (variational), and Diffusion Models (noise-based). Each has different strengths.",
        details: [
          "GAN: Generator + Discriminator compete — G creates fakes, D distinguishes real/fake",
          "VAE: encodes data into latent space distribution, decodes to generate new samples",
          "Diffusion: gradually adds noise to data, then learns to reverse the process",
          "Diffusion models power: Stable Diffusion, DALL·E 3, Midjourney, Sora",
          "GANs power: deepfakes, face generation, image-to-image translation",
          "VAEs used for: representation learning, anomaly detection, compression"
        ],
        example: `# ── GANs (Generative Adversarial Networks) ──
import torch
import torch.nn as nn

class Generator(nn.Module):
    def __init__(self, z_dim=100):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(z_dim, 256),
            nn.ReLU(),
            nn.Linear(256, 784),   # 28×28 = 784 pixels
            nn.Tanh()              # output in [-1, 1]
        )
    def forward(self, z):
        return self.net(z)         # noise → fake image

class Discriminator(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(784, 256),
            nn.LeakyReLU(0.2),
            nn.Linear(256, 1),
            nn.Sigmoid()           # 0=fake, 1=real
        )
    def forward(self, x):
        return self.net(x)

# Training: adversarial game
# D tries to maximize: log D(real) + log(1 - D(G(z)))
# G tries to minimize: log(1 - D(G(z)))  ← fool D
# Nash equilibrium: G generates perfect fakes

# ── VAE (Variational Autoencoder) ──
class VAE(nn.Module):
    def encode(self, x):
        h = self.encoder(x)
        mu = self.fc_mu(h)       # mean of latent distribution
        logvar = self.fc_var(h)  # variance
        return mu, logvar

    def reparameterize(self, mu, logvar):
        std = torch.exp(0.5 * logvar)
        eps = torch.randn_like(std)
        return mu + eps * std    # sample from N(mu, std)

    def decode(self, z):
        return self.decoder(z)   # latent → reconstructed image

# ── Diffusion Model (conceptual) ──
# Forward process: add Gaussian noise step by step
# x₀ (clean) → x₁ (slight noise) → ... → xT (pure noise)

# Reverse process (what the model learns):
# xT (pure noise) → ... → x₁ → x₀ (clean image)

# UNet predicts the noise ε added at each step
# Loss: ||ε - ε_θ(xₜ, t)||²

# Text-to-image with diffusion:
from diffusers import StableDiffusionPipeline
pipe = StableDiffusionPipeline.from_pretrained("stabilityai/sdxl-turbo")
image = pipe("A futuristic city at sunset, cyberpunk style").images[0]`
      },
      "Training Concepts": {
        explanation: "Understanding how AI models are trained is essential for working with them effectively. The training pipeline — from raw data to an aligned, capable model — involves several distinct stages.",
        details: [
          "Dataset: curated collection of (input, output) pairs or raw text",
          "Pretraining: train from scratch on massive unlabeled data (billions of tokens)",
          "Fine-tuning: continue training pretrained model on smaller, task-specific dataset",
          "Transfer learning: use knowledge from one domain to bootstrap another",
          "RLHF: human raters rank outputs → reward model → optimize LLM via PPO",
          "DPO (Direct Preference Optimization): newer alternative to RLHF, more stable",
          "SFT (Supervised Fine-Tuning): first RLHF step — train on human demonstrations"
        ],
        example: `# Full LLM training pipeline

# STAGE 1: Pretraining (self-supervised)
# Dataset: Common Crawl, Books, Wikipedia, GitHub, etc.
# Objective: predict next token
# Duration: weeks to months on thousands of GPUs
# Result: base model (knows language but not how to chat)

# Example: GPT-3 pretrained on 570GB of text
# 300 billion tokens, 175B parameters

# STAGE 2: Supervised Fine-Tuning (SFT)
# Dataset: human-written (prompt, response) pairs
sft_data = [
    {"prompt": "Explain gravity in simple terms",
     "response": "Gravity is the force that pulls..."},
    {"prompt": "Write Python code to reverse a string",
     "response": "def reverse(s):\n    return s[::-1]"},
]
# Result: instruction-following model

# STAGE 3: RLHF
# Step A: collect preference data
prefs = [
    {"prompt": "...", "chosen": "Great response", "rejected": "Bad response"}
]
# Step B: train reward model (predicts which response is better)
# Step C: optimize LLM using PPO (Proximal Policy Optimization)
#   reward = reward_model(response) - KL_penalty(vs_original_model)

# Transfer Learning — fine-tune BERT for classification
from transformers import BertForSequenceClassification, Trainer
model = BertForSequenceClassification.from_pretrained(
    "bert-base-uncased",  # pretrained on Wikipedia+Books
    num_labels=2          # adapt output for binary classification
)
trainer = Trainer(model=model, train_dataset=your_data)
trainer.train()

# Parameter-Efficient Fine-Tuning (LoRA)
# Instead of updating all 7B params, update only ~1M adapter params
# 100x cheaper, same quality!`
      },
      "Embeddings & Vector DBs": {
        explanation: "Embeddings convert text (or images, audio) into dense numerical vectors where semantic similarity maps to geometric proximity. Vector databases efficiently store and search these embeddings, enabling semantic search at scale.",
        details: [
          "Word embedding: each word → fixed-size float vector (e.g., 1536 dimensions)",
          "Semantic similarity: similar meaning → small cosine distance in vector space",
          "Classic: king - man + woman ≈ queen (vector arithmetic works!)",
          "Sentence embeddings: entire sentences as vectors (OpenAI ada-002, Sentence-BERT)",
          "Vector search: find k-nearest neighbors by cosine/dot-product similarity (ANN)",
          "Popular vector DBs: Pinecone (managed), FAISS (local), ChromaDB (open-source)",
          "Use in RAG: embed docs, embed query, find closest docs, feed to LLM"
        ],
        example: `# Create embeddings with OpenAI
from openai import OpenAI
import numpy as np

client = OpenAI()

def embed(text):
    response = client.embeddings.create(
        model="text-embedding-3-small",  # 1536 dimensions
        input=text
    )
    return np.array(response.data[0].embedding)

# Semantic similarity
v1 = embed("The dog runs in the park")
v2 = embed("A puppy is jogging outside")
v3 = embed("Python list comprehension syntax")

def cosine_sim(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

print(cosine_sim(v1, v2))  # ~0.92 (very similar)
print(cosine_sim(v1, v3))  # ~0.21 (unrelated)

# Vector DB with ChromaDB (local)
import chromadb

client = chromadb.Client()
collection = client.create_collection("my_docs")

collection.add(
    documents=["AI is transforming healthcare",
               "Python is a popular language",
               "Neural networks learn from data"],
    ids=["doc1", "doc2", "doc3"]
)

# Semantic search — finds by MEANING, not keywords!
results = collection.query(
    query_texts=["machine learning"],
    n_results=2
)
# Returns: ["Neural networks learn from data",
#           "AI is transforming healthcare"]

# Pinecone (managed, production-scale)
import pinecone
pinecone.init(api_key="YOUR_KEY", environment="us-east1")
index = pinecone.Index("my-index")
index.upsert([("id1", embedding_vector, {"source": "doc1"})])
results = index.query(vector=query_embedding, top_k=5)`
      },
      "RAG": {
        explanation: "Retrieval-Augmented Generation (RAG) grounds LLM responses in retrieved documents, dramatically reducing hallucinations and enabling use of private or up-to-date knowledge without expensive retraining.",
        details: [
          "Problem: LLMs have knowledge cutoffs and hallucinate confidently",
          "Solution: retrieve relevant docs at query time → inject into context → LLM answers from facts",
          "Indexing phase: chunk docs → embed → store in vector DB (done once)",
          "Query phase: embed query → find similar chunks → build prompt → LLM generates",
          "Chunk size: 200–500 tokens typical; too small = missing context, too large = dilutes relevance",
          "Advantages: accurate, private, updatable, explainable (can cite sources)",
          "Advanced: re-ranking, multi-hop retrieval, HyDE (hypothetical document embeddings)"
        ],
        example: `# Full RAG pipeline with LangChain
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA

# ── INDEXING (done once) ──────────────────────────
loader = PyPDFLoader("company_policy.pdf")
documents = loader.load()

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50  # avoid losing info at chunk boundaries
)
chunks = splitter.split_documents(documents)

embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(chunks, embeddings)

# ── QUERYING (every user request) ────────────────
query = "What is our parental leave policy?"

relevant_chunks = vectorstore.similarity_search(query, k=3)

context = "\\n\\n".join([c.page_content for c in relevant_chunks])
augmented_prompt = f"""
You are a helpful HR assistant. Answer based ONLY on the
provided context. If not in context, say "I don't know."

Context:
{context}

Question: {query}
"""

llm = ChatOpenAI(model="gpt-4")
answer = llm.invoke(augmented_prompt)

# ── One-liner with RetrievalQA chain ─────────────
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(),
    retriever=vectorstore.as_retriever(search_kwargs={"k": 3})
)
result = qa_chain.run("What is the refund policy?")`
      },
      "AI Agents": {
        explanation: "AI Agents are LLM-powered systems that autonomously plan, reason, use tools, and take multi-step actions to accomplish goals — going beyond single-turn question answering.",
        details: [
          "Core loop: Observe → Think/Plan → Act → Observe results → Repeat",
          "Tools: web search, code execution, file access, APIs, database queries",
          "ReAct pattern: Reason + Act interleaved — model explains before acting",
          "Multi-agent: specialized agents collaborate (planner, coder, critic, researcher)",
          "Memory: short-term (context window) + long-term (vector DB) + episodic",
          "Examples: coding agents (Devin, Claude Code), research agents, computer-use agents"
        ],
        example: `# AI Agent with LangChain (ReAct pattern)
from langchain.agents import create_react_agent, AgentExecutor
from langchain.tools import DuckDuckGoSearchRun, WikipediaQueryRun
from langchain.tools import PythonREPLTool
from langchain.chat_models import ChatOpenAI

tools = [
    DuckDuckGoSearchRun(),   # web search
    WikipediaQueryRun(),     # Wikipedia
    PythonREPLTool()         # run Python code
]

llm = ChatOpenAI(model="gpt-4", temperature=0)
agent = create_react_agent(llm, tools, prompt=REACT_PROMPT)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

result = executor.invoke({
    "input": "What is the population of Tokyo and how does it compare "
             "to New York? Calculate the ratio."
})

# Agent's internal monologue (ReAct):
# Thought: I need to find Tokyo's population first
# Action: search("Tokyo population 2024")
# Observation: "Tokyo population is approximately 14 million..."
# Thought: Now I need New York's population
# Action: search("New York City population 2024")
# Observation: "New York City population is approximately 8.3 million..."
# Thought: Now I can calculate the ratio
# Action: python_repl("14000000 / 8300000")
# Observation: 1.6867...
# Final Answer: Tokyo (14M) is ~1.69x larger than New York (8.3M)

# Multi-Agent system (AutoGen style)
from autogen import AssistantAgent, UserProxyAgent

planner = AssistantAgent("Planner", system_message="Break tasks into steps")
coder   = AssistantAgent("Coder",   system_message="Write and debug code")
critic  = AssistantAgent("Critic",  system_message="Review and improve output")
# Agents collaborate asynchronously to complete complex tasks`
      },
      "Hallucinations": {
        explanation: "LLM hallucinations occur when models generate confident but factually incorrect content. Understanding why they happen and how to mitigate them is critical for production AI systems.",
        details: [
          "Factual hallucination: wrong facts stated with confidence ('Einstein said...')",
          "Source hallucination: fabricated citations to non-existent papers/books",
          "Causes: pattern completion over memorized facts, gaps in training data",
          "High temperature → more creative but more hallucination-prone",
          "Mitigation: RAG, grounding, citation requirements, self-consistency checks",
          "Constitutional AI: model trained to critique and revise its own outputs",
          "Detection: fact-checking pipelines, search verification, retrieval comparison"
        ],
        example: `# EXAMPLES OF HALLUCINATIONS (illustrating the problem)

# Factual hallucination
user: "When did Einstein publish his theory of quantum computing?"
llm:  "Einstein published his groundbreaking paper on quantum
       computing in 1932, titled 'Uber die Quantenmechanische
       Berechnung'."
# WRONG: Einstein never worked on quantum computing.
# The paper title and date are completely fabricated.

# Source hallucination
user: "Give me sources on transformer architecture"
llm:  "See Vaswani et al. (2017) ✓ ... and also Smith & Jones
       (2019) 'Advanced Transformer Variants' in IEEE Trans..."
# 'Smith & Jones 2019' may be completely fabricated!

# ── MITIGATION STRATEGIES ──────────────────────────

# 1. RAG (most effective) — ground answers in retrieved facts
context = retrieve_relevant_docs(query)
prompt = f"Answer ONLY using this context:\\n{context}\\n\\nQuestion: {query}"

# 2. Force citation
prompt = """Answer the question. For every claim, cite:
[Source: document_name, section X]
If you cannot cite it, say 'I don't have a source for this.'"""

# 3. Temperature = 0 (more deterministic)
response = client.chat.completions.create(
    model="gpt-4", temperature=0.0)

# 4. Self-consistency (sample multiple, vote)
responses = [llm(prompt) for _ in range(5)]
# Check if answers agree; flag disagreements

# 5. Post-generation verification pipeline
answer = llm(question)
claims = extract_claims(answer)
for claim in claims:
    evidence = web_search(claim)
    if not verify(claim, evidence):
        answer = revise(answer, claim)`
      },
      "Evaluation Metrics": {
        explanation: "Evaluating AI models requires different metrics depending on the task. Classification metrics measure prediction accuracy; generation metrics measure output quality for text generation tasks.",
        details: [
          "Accuracy: fraction of correct predictions — misleading on imbalanced datasets",
          "Precision: of all predicted positives, how many are truly positive",
          "Recall: of all actual positives, how many did we catch",
          "F1-score: harmonic mean of precision and recall — balanced metric",
          "BLEU: n-gram overlap between generated and reference text (translation quality)",
          "Perplexity: how well a language model predicts a text — lower = better",
          "ROUGE: recall-based n-gram overlap used for summarization quality"
        ],
        example: `from sklearn.metrics import (accuracy_score, precision_score,
                              recall_score, f1_score)

y_true = [1, 0, 1, 1, 0, 1, 0]
y_pred = [1, 0, 1, 0, 0, 1, 1]

acc  = accuracy_score(y_true, y_pred)   # 5/7 = 0.714
prec = precision_score(y_true, y_pred)  # TP/(TP+FP) = 3/4 = 0.75
rec  = recall_score(y_true, y_pred)     # TP/(TP+FN) = 3/4 = 0.75
f1   = f1_score(y_true, y_pred)         # 2*P*R/(P+R) = 0.75

# Confusion matrix
#                Predicted
#              Pos    Neg
# Actual Pos  [TP=3] [FN=1]   ← recall  = TP/(TP+FN)
#        Neg  [FP=1] [TN=2]   ← precision = TP/(TP+FP)

# BLEU score (translation quality)
from nltk.translate.bleu_score import sentence_bleu
reference  = [["the", "cat", "is", "on", "the", "mat"]]
hypothesis =  ["the", "cat", "sat", "on", "the", "mat"]
bleu = sentence_bleu(reference, hypothesis)
# ~0.83 (good overlap; only "is"→"sat" differs)

# Perplexity — lower is better
# PP(W) = P(w₁,w₂,...,wₙ)^(-1/N)
# Equivalent to: exp(cross-entropy loss)
import torch, torch.nn.functional as F

def perplexity(logits, targets):
    loss = F.cross_entropy(logits, targets)
    return torch.exp(loss).item()

# GPT-2 perplexity on Penn Treebank: ~29
# GPT-4 perplexity: ~3–10 on common text

# ROUGE (summarization)
from rouge_score import rouge_scorer
scorer = rouge_scorer.RougeScorer(['rouge1', 'rouge2', 'rougeL'])
scores = scorer.score("reference summary", "generated summary")
# rouge1: unigram overlap
# rouge2: bigram overlap
# rougeL: longest common subsequence`
      },
      "Model Comparison": {
        explanation: "Different neural architectures are suited to different data types and tasks. Understanding when to use CNN, RNN, LSTM, or Transformer is fundamental for AI engineering.",
        details: [
          "CNN: spatial pattern recognition — images, not sequential by nature",
          "RNN: sequential data — processes token by token, maintains hidden state",
          "LSTM: Long Short-Term Memory — solves RNN's vanishing gradient via gating",
          "Transformer: parallel attention over full sequence — now dominant for most tasks",
          "CNN + Transformer hybrid: Vision Transformers (ViT) for image understanding",
          "LSTM still used in: time-series forecasting, edge devices (lower compute)",
          "Transformers replaced RNNs/LSTMs for NLP tasks from ~2018 onward"
        ],
        example: `# CNN — for image classification
import torch.nn as nn

class CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3)   # detect edges
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3)  # detect shapes
        self.pool  = nn.MaxPool2d(2, 2)                # downsample
        self.fc    = nn.Linear(64*6*6, 10)             # classify

# RNN — basic sequence model
class RNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.rnn = nn.RNN(input_size=50, hidden_size=100, batch_first=True)
    # Problem: can't remember long sequences (gradient vanishes)
    # h_t = tanh(W_h * h_{t-1} + W_x * x_t)

# LSTM — solves vanishing gradient with gates
class LSTM(nn.Module):
    def __init__(self):
        super().__init__()
        self.lstm = nn.LSTM(input_size=50, hidden_size=100, batch_first=True)
    # Forget gate:  what to forget from previous state
    # Input gate:   what new info to add
    # Output gate:  what to output
    # Cell state:   long-term memory highway

# Transformer — parallel attention (dominant today)
from transformers import AutoModel
model = AutoModel.from_pretrained("bert-base-uncased")

# ── COMPARISON TABLE ──────────────────────────────────
# Model       | Best For           | Parallel | Long-range
# CNN         | Images, 1D signals | Yes      | Limited
# RNN         | Short sequences    | No       | Poor
# LSTM        | Medium sequences   | No       | Good
# Transformer | Any sequence/text  | Yes      | Excellent
#
# When to use (2024 guide):
# Images:           CNN for efficiency, ViT for best quality
# Time-series:      LSTM or Transformer
# NLP (all tasks):  Transformer
# Resource-limited: CNN or small LSTM
# State-of-the-art: Transformer variants`
      }
    }
  },
  "Operating Systems": {
    icon: "ti-cpu",
    color: "#185FA5",
    topics: {
      "Process": {
        explanation: "A process is an instance of a program in execution. It includes the program code, current activity (program counter), stack, data section, and heap. Each process has its own memory space and is independent from other processes.",
        details: [
          "States: New → Ready → Running → Waiting → Terminated",
          "PCB (Process Control Block): stores PID, state, program counter, CPU registers, memory limits, open files",
          "Types: Foreground (interactive) and Background (daemon) processes"
        ],
        example: `// Process states in pseudocode
Process P = create("program.exe");
P.state = NEW;         // process being created
P.state = READY;       // waiting in ready queue
P.state = RUNNING;     // being executed by CPU
P.state = WAITING;     // waiting for I/O or event
P.state = TERMINATED;  // execution completed

// Fork in C (UNIX)
#include <unistd.h>
pid_t pid = fork();
if (pid == 0) {
    // Child process
    printf("Child PID: %d\\n", getpid());
} else {
    // Parent process
    printf("Parent PID: %d, Child PID: %d\\n", getpid(), pid);
}`
      },
      "Thread": {
        explanation: "A thread is the smallest unit of CPU execution within a process. Multiple threads share the same process memory (code, data, heap) but each has its own stack, registers, and program counter. Threads are lighter than processes.",
        details: [
          "User-level threads: managed by user libraries (faster context switch)",
          "Kernel-level threads: managed by OS kernel (true parallelism)",
          "Benefits: faster creation, shared memory, efficient communication"
        ],
        example: `// Java Thread example
class MyThread extends Thread {
    public void run() {
        System.out.println("Thread running: " + getName());
    }
}
MyThread t1 = new MyThread();
t1.start();  // creates new thread, calls run()

// Runnable interface (preferred)
Runnable r = () -> System.out.println("Lambda thread");
Thread t2 = new Thread(r);
t2.start();

// Python threading
import threading
def task():
    print("Thread:", threading.current_thread().name)

t = threading.Thread(target=task)
t.start()
t.join()  // wait for thread to finish`
      },
      "Process Scheduling": {
        explanation: "Process scheduling is the activity of the process manager that handles the removal of running process from CPU and selection of another process on basis of a strategy.",
        details: [
          "Long-term scheduler: decides which processes enter ready queue from disk",
          "Short-term scheduler (CPU scheduler): selects from ready queue → runs on CPU",
          "Medium-term scheduler: swapping processes in/out of memory",
          "Scheduling criteria: CPU utilization, throughput, turnaround time, waiting time, response time"
        ],
        example: `// Key scheduling metrics
Arrival Time (AT):  when process enters ready queue
Burst Time (BT):    CPU time required to complete
Completion Time (CT): when process finishes
Turnaround Time (TAT) = CT - AT
Waiting Time (WT)    = TAT - BT

// Example
Process  AT  BT  CT  TAT  WT
P1       0   4   4   4    0
P2       1   3   7   6    3
P3       2   1   5   3    2
Average TAT = (4+6+3)/3 = 4.33
Average WT  = (0+3+2)/3 = 1.67`
      },
      "CPU Scheduling Algorithms": {
        explanation: "CPU scheduling algorithms determine the order in which processes in the ready queue get CPU time. Different algorithms optimize for different goals.",
        details: [
          "FCFS (First Come First Served): non-preemptive, simple, convoy effect",
          "SJF (Shortest Job First): optimal avg wait time, starvation possible",
          "SRTF (Shortest Remaining Time First): preemptive SJF",
          "Round Robin: preemptive, uses time quantum, good for time-sharing",
          "Priority Scheduling: CPU goes to highest priority; aging prevents starvation",
          "Multilevel Queue: multiple queues with different priorities"
        ],
        example: `// Round Robin example (Quantum = 2)
Processes: P1(BT=4), P2(BT=3), P3(BT=1)

Gantt Chart:
| P1 | P2 | P3 | P1 | P2 |
0    2    4    5    7    8

P1: CT=7, TAT=7, WT=3
P2: CT=8, TAT=8, WT=5
P3: CT=5, TAT=5, WT=4

// FCFS example
Processes: P1(AT=0,BT=5), P2(AT=1,BT=3), P3(AT=2,BT=1)
Gantt: | P1 | P2 | P3 |
        0    5    8    9
// SJF would order: P3 → P2 → P1 (shorter jobs first)`
      },
      "Deadlock": {
        explanation: "A deadlock is a situation where a set of processes are blocked, each waiting for a resource held by another process in the set. No progress is possible.",
        details: [
          "Four necessary conditions (Coffman): Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait",
          "Prevention: eliminate one of the four conditions",
          "Avoidance: Banker's Algorithm — safe state analysis",
          "Detection: Resource Allocation Graph (RAG); cycle = deadlock",
          "Recovery: process termination or resource preemption"
        ],
        example: `// Deadlock scenario
Thread T1:          Thread T2:
lock(A);            lock(B);
lock(B); // waits   lock(A); // waits
// DEADLOCK!

// Banker's Algorithm (Safe State Check)
Available: [3, 3, 2]     (A, B, C resources)
Allocation:   Need:
P0: [0,1,0]   [7,4,3]
P1: [2,0,0]   [1,2,2]
P2: [3,0,2]   [6,0,0]
P3: [2,1,1]   [0,1,1]
P4: [0,0,2]   [4,3,1]

Safe sequence: P1 → P3 → P4 → P2 → P0`
      },
      "Synchronization": {
        explanation: "Process synchronization ensures that multiple processes/threads access shared resources in a controlled manner to avoid race conditions and ensure data consistency.",
        details: [
          "Race condition: outcome depends on execution order",
          "Critical section: code segment accessing shared resource",
          "Requirements: Mutual exclusion, Progress, Bounded waiting",
          "Mechanisms: Mutex, Semaphore, Monitor, Spinlock"
        ],
        example: `// Race condition example
int counter = 0;
// Thread 1: counter++
// Thread 2: counter++
// Expected: 2, Actual: may be 1 (race!)

// Machine level:
// T1: READ counter (gets 0)
// T2: READ counter (gets 0)
// T1: counter = 0+1 = 1, WRITE
// T2: counter = 0+1 = 1, WRITE
// Final: 1 (WRONG! should be 2)

// Solution: synchronize access to counter`
      },
      "Semaphores": {
        explanation: "A semaphore is a synchronization tool — an integer variable accessed only through two atomic operations: wait (P/down) and signal (V/up). Used to control access to shared resources.",
        details: [
          "Binary semaphore (mutex): values 0 or 1 — mutual exclusion",
          "Counting semaphore: any non-negative integer — resource counting",
          "wait(S): if S>0, S--; else block process",
          "signal(S): S++; if processes blocked, wake one"
        ],
        example: `// POSIX Semaphore in C
#include <semaphore.h>
sem_t sem;
sem_init(&sem, 0, 1);  // init to 1 (binary)

sem_wait(&sem);    // P operation: S--
// --- critical section ---
counter++;
// --- end critical section ---
sem_post(&sem);    // V operation: S++

// Producer-Consumer
sem_t full, empty, mutex;
sem_init(&full,  0, 0);   // items in buffer
sem_init(&empty, 0, N);   // empty slots
sem_init(&mutex, 0, 1);   // mutual exclusion

// Producer:
sem_wait(&empty); sem_wait(&mutex);
// add item
sem_post(&mutex); sem_post(&full);

// Consumer:
sem_wait(&full);  sem_wait(&mutex);
// remove item
sem_post(&mutex); sem_post(&empty);`
      },
      "Mutex": {
        explanation: "A Mutex (Mutual Exclusion lock) is a locking mechanism ensuring only one thread can access a resource at a time. Unlike a semaphore, only the thread that locked a mutex can unlock it.",
        details: [
          "Binary state: locked or unlocked",
          "Ownership: only the locking thread can unlock",
          "Prevents race conditions in critical sections",
          "Deadlock risk if not used carefully"
        ],
        example: `// C++ std::mutex
#include <mutex>
std::mutex mtx;
int shared_data = 0;

void increment() {
    mtx.lock();         // acquire lock
    shared_data++;      // critical section
    mtx.unlock();       // release lock
}

// Better: std::lock_guard (RAII - auto unlock)
void safe_increment() {
    std::lock_guard<std::mutex> guard(mtx);
    shared_data++;
}   // guard destroyed here → auto unlock

// Python
import threading
lock = threading.Lock()
counter = 0

def increment():
    global counter
    with lock:          # acquire and auto-release
        counter += 1`
      },
      "Paging": {
        explanation: "Paging is a memory management scheme that eliminates the need for contiguous memory allocation. Physical memory is divided into fixed-size frames; logical memory into pages of the same size.",
        details: [
          "Page size = Frame size (typically 4KB)",
          "Internal fragmentation possible (last page may not be full)",
          "No external fragmentation",
          "Page table stored in memory; TLB (cache) speeds up translation"
        ],
        example: `// Address translation
page_number = logical_addr / page_size
offset      = logical_addr % page_size

Example:
Page size = 4KB = 4096 bytes
Logical address = 5000

Page number = 5000 / 4096 = 1
Offset      = 5000 % 4096 = 904

Page table: page 1 → frame 3
Physical = frame * page_size + offset
         = 3 * 4096 + 904 = 13192

// TLB (Translation Lookaside Buffer)
// Fast associative cache for page table entries
// TLB hit: direct physical address
// TLB miss: go to page table in memory`
      },
      "Virtual Memory": {
        explanation: "Virtual memory creates an illusion of a larger memory by using disk storage. Enables execution of processes not completely in memory, allowing multiprogramming and efficient memory use.",
        details: [
          "Virtual address space can be larger than physical RAM",
          "Pages loaded on demand (demand paging)",
          "Page fault: accessing a page not in memory",
          "Working set: set of pages a process actively uses"
        ],
        example: `// When program accesses virtual address:
1. Check TLB → if hit, use physical address
2. If miss → check page table
3. If page in memory → translate address
4. If page NOT in memory → PAGE FAULT
5. OS loads page from disk to memory frame
6. Update page table
7. Restart instruction

// Page replacement algorithms (when memory full)
FIFO:    replace oldest loaded page
LRU:     replace least recently used
Optimal: replace page not used longest in future`
      },
      "Memory Management": {
        explanation: "Memory management tracks every memory location (used/free), allocates memory to processes, and deallocates it when done. Goals: efficiency, protection, and sharing.",
        details: [
          "Contiguous: fixed partition, variable partition",
          "Non-contiguous: paging, segmentation, paged segmentation",
          "Fragmentation: internal (wasted inside partition), external (wasted between)",
          "Compaction: shuffle contents to combine free space"
        ],
        example: `// Memory allocation strategies
First Fit: allocate first hole big enough (fast)
Best Fit:  allocate smallest hole that fits (least waste)
Worst Fit: allocate largest hole (usually bad)

// Example - holes: [100KB, 500KB, 200KB, 300KB, 600KB]
// Request 212KB:
First Fit → 500KB hole (wastes 288KB)
Best Fit  → 300KB hole (wastes 88KB)
Worst Fit → 600KB hole (wastes 388KB)`
      },
      "Context Switching": {
        explanation: "Context switching saves the state of a currently running process and loads the saved state of the next process. Allows multitasking but introduces overhead — no useful work is done during the switch.",
        details: [
          "Save: PCB of current process (registers, PC, stack pointer)",
          "Load: PCB of next process",
          "Pure overhead: no useful work done during switch",
          "Triggered by: interrupt, system call, time quantum expiry"
        ],
        example: `// Context switch sequence
1. CPU running Process A
2. Timer interrupt fires (time quantum expired)
3. Save A's context into PCB_A:
   - Program Counter: 0x4000
   - Registers: AX=5, BX=10, ...
   - Stack Pointer: 0xFF00
   - State: RUNNING → READY
4. Load Process B's context from PCB_B:
   - Restore registers, PC, SP
   - State: READY → RUNNING
5. CPU resumes Process B from where it left off

// Context switch time: typically 1–10 microseconds`
      },
      "File System": {
        explanation: "A file system organizes and stores data on storage devices. It manages file creation, deletion, reading, writing, and directory organization.",
        details: [
          "Components: files, directories, metadata",
          "Common FS: FAT32, NTFS (Windows), ext4 (Linux), APFS (macOS)",
          "Inode: data structure storing file metadata (Unix/Linux)",
          "Directory: file containing list of file names and inode numbers"
        ],
        example: `// Linux file system structure
/           root
├── bin/    essential binaries
├── etc/    configuration files
├── home/   user home directories
├── var/    variable data (logs)
├── tmp/    temporary files
└── dev/    device files

// File operations
open(path, flags)         // open file, return fd
read(fd, buf, n)          // read n bytes
write(fd, buf, n)         // write n bytes
close(fd)                 // close file descriptor
unlink(path)              // delete file`
      },
      "Disk Scheduling": {
        explanation: "Disk scheduling algorithms determine the order in which disk I/O requests are serviced to minimize seek time (time for read/write head to move to the correct track).",
        details: [
          "FCFS: simple, fair, but poor performance",
          "SSTF (Shortest Seek Time First): minimum seek, starvation possible",
          "SCAN (Elevator): move in one direction, reverse — no starvation",
          "C-SCAN: move one direction only, jump back — uniform wait time",
          "LOOK/C-LOOK: only go as far as last request"
        ],
        example: `// SCAN algorithm example
Head at position 50, moving toward high numbers
Request queue: [82, 170, 43, 140, 24, 16, 190]

SCAN sequence: 50→82→140→170→190→199→43→24→16
Seek distance: 32+58+30+20+9+156+19+8 = 332

SSTF sequence: 50→43→24→16→82→140→170→190
Seek distance: 7+19+8+66+58+30+20 = 208 (better!)
But: requests 170, 190 may starve`
      }
    }
  },
  "DBMS": {
    icon: "ti-database",
    color: "#0F6E56",
    topics: {
      "DBMS Basics": {
        explanation: "A Database Management System (DBMS) is software that manages databases. It provides an interface between users and databases for storing, retrieving, and managing data efficiently and securely.",
        details: [
          "Components: Data, DBMS software, Users, Applications",
          "Types: Hierarchical, Network, Relational (RDBMS), Object-oriented, NoSQL",
          "DBMS vs File system: data redundancy control, integrity, concurrent access, security",
          "3-level architecture: External, Conceptual, Internal (ANSI/SPARC)"
        ],
        example: `// Database languages
DDL (Data Definition Language):   CREATE, ALTER, DROP
DML (Data Manipulation Language): SELECT, INSERT, UPDATE, DELETE
DCL (Data Control Language):      GRANT, REVOKE
TCL (Transaction Control):        COMMIT, ROLLBACK, SAVEPOINT`
      },
      "ER Model": {
        explanation: "The Entity-Relationship (ER) model is a conceptual data model representing real-world objects (entities), their properties (attributes), and relationships between them.",
        details: [
          "Entity: real-world object with independent existence (Student, Course)",
          "Attribute: property of entity (name, age, ID)",
          "Relationship: association between entities (Student ENROLLS Course)",
          "Cardinality: 1:1, 1:N, M:N"
        ],
        example: `// Attribute types
Simple:      cannot be divided (Age, ID)
Composite:   can be divided (FullName → First + Last)
Derived:     calculated from others (Age from DOB)
Multi-valued: multiple values (PhoneNumbers: {111,222})
Key:         uniquely identifies entity (StudentID)

// Cardinality: Student ─── ENROLLS ─── Course (M:N)
// A student can enroll in many courses
// A course can have many students`
      },
      "Primary Key": {
        explanation: "A primary key is a column (or set of columns) that uniquely identifies each row in a table. It must be unique and NOT NULL.",
        details: [
          "Must be unique for every row",
          "Cannot contain NULL values",
          "Only one primary key per table",
          "Can be a single or composite column"
        ],
        example: `-- Single column primary key
CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    Name VARCHAR(50),
    Age INT
);

-- Composite primary key
CREATE TABLE Enrollment (
    StudentID INT,
    CourseID  INT,
    PRIMARY KEY (StudentID, CourseID)
);

INSERT INTO Students VALUES (101, 'Alice', 20);
INSERT INTO Students VALUES (101, 'Bob',   21);
-- ERROR: duplicate primary key (101)!`
      },
      "Foreign Key": {
        explanation: "A foreign key is a column in one table that refers to the primary key of another table. It enforces referential integrity — ensuring linked data is consistent.",
        details: [
          "Establishes link between two tables",
          "Value must exist in the referenced table (or be NULL)",
          "ON DELETE CASCADE: delete child rows when parent deleted",
          "ON UPDATE CASCADE: update child rows when parent key updated"
        ],
        example: `CREATE TABLE Department (
    DeptID   INT PRIMARY KEY,
    DeptName VARCHAR(50)
);

CREATE TABLE Employee (
    EmpID  INT PRIMARY KEY,
    Name   VARCHAR(50),
    DeptID INT,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
    ON DELETE SET NULL ON UPDATE CASCADE
);

-- Valid: DeptID 10 exists in Department
INSERT INTO Employee VALUES (1, 'Alice', 10);

-- Invalid: DeptID 99 doesn't exist
INSERT INTO Employee VALUES (2, 'Bob', 99); -- ERROR!`
      },
      "Normalization": {
        explanation: "Normalization organizes a database to reduce data redundancy and improve data integrity by decomposing tables according to normal form rules.",
        details: [
          "Goal: eliminate insertion, update, deletion anomalies",
          "1NF → 2NF → 3NF → BCNF (increasing strictness)",
          "Functional dependency: A → B (knowing A determines B)"
        ],
        example: `// Update anomaly: changing Prof.Smith's name
// requires updates in many rows

// Deletion anomaly: deleting last student in CS1
// loses all info about CS1

// Solution: normalize into separate tables
// Student(SID, SName)
// Course(CID, CName, InstructorID)
// Instructor(InstructorID, InstructorName)
// Enrollment(SID, CID, Grade)`
      },
      "1NF": {
        explanation: "First Normal Form: A table is in 1NF if all column values are atomic (indivisible), there are no repeating groups, and each row is unique.",
        details: [
          "No multi-valued attributes",
          "No composite attributes",
          "Each column must have a single value",
          "Each row must be unique (has a primary key)"
        ],
        example: `// NOT in 1NF (multi-valued)
Student: SID | Name  | Courses
         101 | Alice | CS1, CS2, CS3  ← violation!

// Convert to 1NF
Student_Course: SID | Name  | Course
                101 | Alice | CS1
                101 | Alice | CS2
                101 | Alice | CS3`
      },
      "2NF": {
        explanation: "Second Normal Form: A table is in 2NF if it is in 1NF and every non-key attribute is fully functionally dependent on the entire primary key (no partial dependencies).",
        details: [
          "Only applies to tables with composite primary keys",
          "Partial dependency: non-key attribute depends on PART of composite key",
          "Solution: move partially dependent columns to a separate table"
        ],
        example: `// PK = (OrderID, ProductID)
// ProductID → ProductName  ← partial dep!
// OrderID   → OrderDate    ← partial dep!

// Convert to 2NF:
Order(OrderID, OrderDate)
Product(ProductID, ProductName)
Order_Item(OrderID, ProductID, Qty)  ← only full deps`
      },
      "3NF": {
        explanation: "Third Normal Form: A table is in 3NF if it is in 2NF and no non-key attribute is transitively dependent on the primary key.",
        details: [
          "Transitive dependency: PK → non-key B → non-key C",
          "Solution: move transitive dependencies to a new table",
          "'Non-key attributes depend on the key, the whole key, and nothing but the key'"
        ],
        example: `// EmpID → DeptID → DeptName (transitive!)
Employee(EmpID, EmpName, DeptID, DeptName)

// Convert to 3NF:
Employee(EmpID, EmpName, DeptID)
Department(DeptID, DeptName)`
      },
      "BCNF": {
        explanation: "Boyce-Codd Normal Form is a stronger version of 3NF. A table is in BCNF if for every functional dependency X → Y, X must be a superkey.",
        details: [
          "Every determinant must be a candidate key",
          "Stricter than 3NF — handles anomalies 3NF misses",
          "BCNF decomposition may not always preserve all FDs"
        ],
        example: `// In 3NF but NOT BCNF:
Student_Advisor(StudentID, Subject, Advisor)
FD: Advisor → Subject  (Advisor is NOT a superkey!)

// Convert to BCNF:
Advisor_Subject(Advisor, Subject)
Student_Advisor(StudentID, Advisor)`
      },
      "ACID Properties": {
        explanation: "ACID properties guarantee that database transactions are processed reliably: Atomicity, Consistency, Isolation, and Durability.",
        details: [
          "Atomicity: transaction is all-or-nothing",
          "Consistency: transaction brings DB from one valid state to another",
          "Isolation: concurrent transactions don't interfere with each other",
          "Durability: committed transactions survive system failures"
        ],
        example: `BEGIN TRANSACTION;
    UPDATE accounts SET balance = balance - 100 WHERE id = 'A';
    UPDATE accounts SET balance = balance + 100 WHERE id = 'B';
COMMIT;

// Atomicity:    if second UPDATE fails → ROLLBACK both
// Consistency:  total money unchanged
// Isolation:    another txn can't see partial state
// Durability:   after COMMIT, data persists through crash`
      },
      "Transactions": {
        explanation: "A transaction is a sequence of database operations treated as a single logical unit of work. It either completes fully (commit) or is entirely undone (rollback).",
        details: [
          "BEGIN/START TRANSACTION: marks start",
          "COMMIT: makes changes permanent",
          "ROLLBACK: undoes all changes since BEGIN",
          "SAVEPOINT: partial rollback point"
        ],
        example: `BEGIN;
    UPDATE a SET x = 1;
    SAVEPOINT sp1;
    UPDATE b SET y = 2;
    ROLLBACK TO sp1;  -- undo b, keep a
COMMIT;

-- Isolation levels
READ UNCOMMITTED → dirty reads possible
READ COMMITTED   → prevents dirty reads
REPEATABLE READ  → prevents non-repeatable reads
SERIALIZABLE     → strictest, prevents phantom reads`
      },
      "Joins": {
        explanation: "SQL JOINs combine rows from two or more tables based on a related column. Essential for querying relational data spread across multiple tables.",
        details: [
          "INNER JOIN: only matching rows from both tables",
          "LEFT JOIN: all rows from left table + matching from right",
          "RIGHT JOIN: all rows from right table + matching from left",
          "FULL JOIN: all rows from both tables",
          "SELF JOIN: table joined with itself"
        ],
        example: `-- INNER JOIN: only students with departments
SELECT s.Name, d.DeptName
FROM Students s INNER JOIN Department d ON s.DeptID = d.DeptID;

-- LEFT JOIN: all students (even without dept)
SELECT s.Name, d.DeptName
FROM Students s LEFT JOIN Department d ON s.DeptID = d.DeptID;
-- Students with no dept → DeptName = NULL

-- SELF JOIN: employees and their managers
SELECT e.Name AS Employee, m.Name AS Manager
FROM Employee e LEFT JOIN Employee m ON e.ManagerID = m.EmpID;`
      },
      "Indexing": {
        explanation: "An index is a data structure (typically B-tree) that improves data retrieval speed by providing fast lookup — like a book's index.",
        details: [
          "Clustered index: data rows sorted by index key (one per table)",
          "Non-clustered index: separate structure pointing to data rows",
          "Composite index: index on multiple columns",
          "Trade-off: faster reads, slower writes (index must be maintained)"
        ],
        example: `-- Without index: full table scan O(n)
SELECT * FROM Students WHERE Name = 'Alice';

-- Create index: O(log n) lookup
CREATE INDEX idx_name ON Students(Name);

-- Unique index
CREATE UNIQUE INDEX idx_email ON Users(Email);

-- Composite index
CREATE INDEX idx_dept_age ON Employee(DeptID, Age);

-- Explain plan (check index usage)
EXPLAIN SELECT * FROM Students WHERE Name = 'Alice';`
      },
      "Aggregate Functions": {
        explanation: "Aggregate functions perform calculations on a set of rows and return a single value. Used with SELECT to summarize data, and with GROUP BY to aggregate per group.",
        details: [
          "COUNT: number of rows",
          "SUM: total of values",
          "AVG: average value",
          "MIN/MAX: smallest/largest value",
          "HAVING: filter groups (like WHERE but for aggregates)"
        ],
        example: `SELECT DeptID,
       COUNT(*)    AS EmpCount,
       AVG(Salary) AS AvgSal,
       MAX(Salary) AS MaxSal
FROM Employees
GROUP BY DeptID
HAVING AVG(Salary) > 50000;  -- only high-paying depts`
      }
    }
  },
  "SQL": {
    icon: "ti-table",
    color: "#3B6D11",
    topics: {
      "SELECT": {
        explanation: "SELECT is the most fundamental SQL command used to retrieve data from one or more tables. It can filter, sort, join, and aggregate data.",
        details: [
          "SELECT *: all columns; SELECT col1, col2: specific columns",
          "Aliases: AS keyword for column/table names",
          "DISTINCT: remove duplicate rows",
          "Order of clauses: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY"
        ],
        example: `SELECT d.DeptName, COUNT(e.EmpID) AS Headcount, AVG(e.Salary) AS AvgPay
FROM Employees e
JOIN Department d ON e.DeptID = d.DeptID
WHERE e.Salary > 30000
GROUP BY d.DeptName
HAVING COUNT(e.EmpID) > 5
ORDER BY AvgPay DESC
LIMIT 10;`
      },
      "WHERE": {
        explanation: "WHERE clause filters rows based on conditions. Used with SELECT, UPDATE, DELETE to specify which rows to affect.",
        details: [
          "Comparison: =, !=, <, >, <=, >=",
          "Logical: AND, OR, NOT",
          "BETWEEN, IN, LIKE, IS NULL",
          "WHERE is evaluated BEFORE GROUP BY"
        ],
        example: `-- IN operator
SELECT * FROM Students WHERE Major IN ('CS', 'IT', 'ECE');

-- BETWEEN (inclusive)
SELECT * FROM Orders WHERE Amount BETWEEN 100 AND 500;

-- LIKE pattern matching
SELECT * FROM Customers WHERE Name LIKE 'A%';     -- starts with A
SELECT * FROM Products  WHERE Code LIKE 'AB_12';  -- _ = any 1 char

-- NULL checks
SELECT * FROM Employees WHERE ManagerID IS NULL;`
      },
      "GROUP BY": {
        explanation: "GROUP BY groups rows with the same values in specified columns into summary rows. Used with aggregate functions to calculate per-group statistics.",
        details: [
          "All non-aggregated columns in SELECT must be in GROUP BY",
          "Executed after WHERE, before HAVING",
          "Can group by multiple columns",
          "Produces one row per group"
        ],
        example: `SELECT DeptID, JobTitle, AVG(Salary) AS AvgSal
FROM Employees
GROUP BY DeptID, JobTitle;
-- One row per (department, job title) combination`
      },
      "HAVING": {
        explanation: "HAVING filters groups after GROUP BY. Unlike WHERE which filters rows before grouping, HAVING filters based on aggregate function results.",
        details: [
          "WHERE filters rows; HAVING filters groups",
          "HAVING comes after GROUP BY",
          "Can use aggregate functions in HAVING"
        ],
        example: `-- WHERE + HAVING together
SELECT DeptID, AVG(Salary) AS AvgSal
FROM Employees
WHERE Status = 'Active'          -- filter rows first
GROUP BY DeptID
HAVING AVG(Salary) > 60000;     -- then filter groups`
      },
      "INSERT": {
        explanation: "INSERT adds new rows to a table. Can insert one row, multiple rows, or results from a SELECT query.",
        details: [
          "Specify column names to avoid order dependency",
          "INSERT INTO ... SELECT: insert query results",
          "Omitted columns get NULL or DEFAULT values"
        ],
        example: `-- Multiple rows
INSERT INTO Students VALUES
(102, 'Bob',     21, 'EE'),
(103, 'Charlie', 19, 'CS');

-- Insert from SELECT
INSERT INTO Graduates (GID, Name, DeptID)
SELECT SID, Name, DeptID FROM Students WHERE GPA >= 3.5;`
      },
      "UPDATE": {
        explanation: "UPDATE modifies existing rows. Always use WHERE to specify which rows — without WHERE, ALL rows are updated!",
        details: [
          "SET clause specifies column = new value",
          "WHERE clause restricts which rows",
          "Can update multiple columns at once"
        ],
        example: `-- Update multiple columns
UPDATE Employees
SET Salary = Salary * 1.1, LastUpdated = NOW()
WHERE DeptID = 10;

-- DANGER: without WHERE → updates ALL rows!
-- Always verify with SELECT first!`
      },
      "DELETE": {
        explanation: "DELETE removes rows from a table. Always use WHERE to specify rows — without WHERE, ALL rows are deleted! DELETE can be rolled back (unlike TRUNCATE).",
        details: [
          "DELETE can be rolled back in a transaction",
          "Slower than TRUNCATE for large datasets",
          "DROP removes entire table (structure + data)"
        ],
        example: `DELETE FROM Orders WHERE OrderDate < '2020-01-01';

-- DELETE vs TRUNCATE vs DROP
DELETE   → removes rows, rollback possible
TRUNCATE → removes all rows, faster, resets auto-increment
DROP     → removes entire table permanently!`
      },
      "Subqueries": {
        explanation: "A subquery (inner query) is a query nested inside another SQL query. Used to break complex queries into simpler parts.",
        details: [
          "Scalar subquery: returns single value",
          "Table subquery: returns a table (used in FROM)",
          "Correlated subquery: references outer query columns"
        ],
        example: `-- Employees earning above average
SELECT Name, Salary FROM Employees
WHERE Salary > (SELECT AVG(Salary) FROM Employees);

-- Correlated: employees earning more than their dept avg
SELECT Name, Salary FROM Employees e
WHERE Salary > (
    SELECT AVG(Salary) FROM Employees
    WHERE DeptID = e.DeptID  -- references outer query
);`
      }
    }
  },
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
  },
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
  },
  "OOPs": {
    icon: "ti-box",
    color: "#D85A30",
    topics: {
      "Class": {
        explanation: "A class is a blueprint or template for creating objects. It defines attributes (data members) and methods (functions) that objects of the class will have.",
        details: [
          "Class defines the structure; object is an instance",
          "Members: fields (attributes), methods, constructors",
          "Access modifiers control visibility: public, private, protected",
          "static members belong to class, not individual instances"
        ],
        example: `public class BankAccount {
    private String owner;
    private double balance;
    private static int count = 0;

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
}

BankAccount acc = new BankAccount("Alice", 1000);
acc.deposit(500);
System.out.println(acc.getBalance()); // 1500`
      },
      "Encapsulation": {
        explanation: "Encapsulation bundles data (attributes) and methods that operate on the data into a single unit (class), and restricts direct access to internal data.",
        details: [
          "Private fields: accessed only within the class",
          "Public getters/setters: controlled access with validation",
          "Benefits: data validation, flexibility, security",
          "Follows the 'tell, don't ask' principle"
        ],
        example: `class Person {
    private int age;
    private String name;

    public int getAge() { return age; }

    public void setAge(int age) {
        if (age < 0 || age > 150)
            throw new IllegalArgumentException("Invalid age");
        this.age = age;
    }

    public void setName(String name) {
        if (name == null || name.isEmpty())
            throw new IllegalArgumentException("Name cannot be empty");
        this.name = name;
    }
}`
      },
      "Inheritance": {
        explanation: "Inheritance allows a child class to inherit properties and methods from a parent class. Promotes code reuse and establishes IS-A relationships.",
        details: [
          "extends keyword in Java; : in C++",
          "super keyword: access parent class members",
          "Method overriding: child redefines parent method",
          "Single inheritance (Java classes), Multiple (Java interfaces, C++)"
        ],
        example: `class Animal {
    protected String name;
    public Animal(String name) { this.name = name; }
    public void makeSound() { System.out.println("..."); }
    public void eat()       { System.out.println(name + " is eating"); }
}

class Dog extends Animal {
    public Dog(String name) { super(name); }

    @Override
    public void makeSound() { System.out.println(name + ": Woof!"); }

    public void fetch() { System.out.println(name + " fetches!"); }
}

Dog d = new Dog("Rex");
d.makeSound();  // Rex: Woof! (overridden)
d.eat();        // Rex is eating (inherited)`
      },
      "Polymorphism": {
        explanation: "Polymorphism means 'many forms' — the ability of different objects to respond to the same method call in different ways.",
        details: [
          "Runtime (dynamic): method overriding + upcasting",
          "Compile-time (static): method overloading",
          "Dynamic dispatch: JVM calls correct version at runtime"
        ],
        example: `// Runtime polymorphism
Animal[] animals = {new Dog("Rex"), new Cat("Whiskers")};
for (Animal a : animals) a.makeSound();
// Rex: Woof! / Whiskers: Meow!

// Compile-time (overloading)
class Calculator {
    int    add(int a, int b)       { return a + b; }
    double add(double a, double b) { return a + b; }
    String add(String a, String b) { return a + b; }
}
// Java picks the right add() based on argument types`
      },
      "Abstract Classes": {
        explanation: "An abstract class cannot be instantiated directly. It may contain abstract methods (no body) that subclasses must implement, plus concrete methods.",
        details: [
          "abstract keyword in Java",
          "Can have constructors, fields, concrete methods",
          "Cannot instantiate abstract class directly",
          "Use when you want enforced contract with partial implementation"
        ],
        example: `abstract class Shape {
    protected String color;
    public Shape(String color) { this.color = color; }

    abstract double area();          // MUST override
    abstract double perimeter();

    public String describe() {
        return "Shape with area: " + area();
    }
}

class Circle extends Shape {
    private double radius;
    public Circle(String color, double r) { super(color); radius = r; }

    @Override double area()      { return Math.PI * radius * radius; }
    @Override double perimeter() { return 2 * Math.PI * radius; }
}

// Shape s = new Shape("Red"); // ERROR!
Shape s = new Circle("Red", 5.0); // OK → polymorphism`
      },
      "Interfaces": {
        explanation: "An interface is a contract specifying what a class can do. Classes implement interfaces, promising to provide the method implementations. A class can implement multiple interfaces.",
        details: [
          "All methods abstract by default (Java 7); Java 8+ allows default and static methods",
          "All fields are public static final",
          "A class can implement multiple interfaces",
          "Enables loose coupling and 'programming to interface'"
        ],
        example: `interface Printable    { void print(); }
interface Serializable { byte[] serialize(); }

class Document implements Printable, Serializable {
    private String content;

    @Override public void print()        { System.out.println(content); }
    @Override public byte[] serialize()  { return content.getBytes(); }
}

// Interface as type (polymorphism)
Printable p = new Document();
p.print();

// Abstract class vs Interface
// Abstract class: shared code, IS-A relationship
// Interface:      capability contract (Flyable, Comparable)`
      }
    }
  },
  "Computer Networks": {
    icon: "ti-network",
    color: "#533AB7",
    topics: {
      "OSI Model": {
        explanation: "The OSI (Open Systems Interconnection) model is a conceptual framework with 7 layers standardizing how different network systems communicate.",
        details: [
          "Layer 7 Application: user interface (HTTP, FTP, SMTP, DNS)",
          "Layer 6 Presentation: encryption, compression, encoding",
          "Layer 5 Session: session management, authentication",
          "Layer 4 Transport: end-to-end communication (TCP, UDP)",
          "Layer 3 Network: routing, logical addressing (IP)",
          "Layer 2 Data Link: framing, MAC addressing (Ethernet)",
          "Layer 1 Physical: bits over wire (cables, signals)"
        ],
        example: `// Mnemonic: All People Seem To Need Data Processing
L7 Application:  HTTP, HTTPS, FTP, SMTP, DNS
L6 Presentation: SSL/TLS, JPEG, ASCII encoding
L5 Session:      NetBIOS, RPC, session auth
L4 Transport:    TCP (reliable), UDP (fast), ports
L3 Network:      IP, ICMP, routers
L2 Data Link:    Ethernet, Wi-Fi, switches, MAC
L1 Physical:     cables, fiber, radio waves

// HTTP request journey:
App layer → TCP segment (port 80) → IP packet → Ethernet frame → bits on wire`
      },
      "TCP vs UDP": {
        explanation: "TCP provides reliable, ordered, error-checked delivery. UDP is faster but unreliable — fire and forget.",
        details: [
          "TCP: connection-oriented (3-way handshake: SYN→SYN-ACK→ACK)",
          "TCP: flow control, congestion control, ordering, retransmission",
          "UDP: connectionless, no guarantee of delivery or order",
          "UDP: lower latency, good for video streaming, gaming, DNS"
        ],
        example: `// TCP 3-way handshake
Client → Server: SYN (seq=x)
Server → Client: SYN-ACK (seq=y, ack=x+1)
Client → Server: ACK (ack=y+1)
// Connection established!

// Use TCP: HTTP/HTTPS, FTP, SSH, email
// Use UDP: DNS, VoIP, video streaming, online games`
      },
      "IP Address": {
        explanation: "An IP address is a unique numerical label assigned to each device on a network. IPv4 uses 32 bits; IPv6 uses 128 bits.",
        details: [
          "IPv4: 192.168.1.1 (32 bits, ~4.3 billion addresses)",
          "IPv6: 2001:0db8::8a2e:370:7334 (128 bits)",
          "Private ranges: 10.x.x.x, 172.16-31.x.x, 192.168.x.x",
          "Subnet mask: divides IP into network and host parts"
        ],
        example: `// IPv4 subnetting
IP:       192.168.1.0 / 24
Mask:     255.255.255.0
Network:  192.168.1.0
Hosts:    192.168.1.1 – 192.168.1.254  (254 usable)
Broadcast:192.168.1.255

// /24 → 32-24 = 8 host bits → 2⁸ - 2 = 254 hosts

// NAT: many private IPs share one public IP
// 192.168.1.x → [NAT Router] → 203.0.113.1 (public)`
      },
      "HTTP/HTTPS": {
        explanation: "HTTP is the foundation of data communication on the web. HTTPS adds TLS/SSL encryption for security.",
        details: [
          "Methods: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS",
          "Status codes: 2xx success, 3xx redirect, 4xx client error, 5xx server error",
          "Headers: Host, Content-Type, Authorization, Cookie",
          "HTTPS: TLS handshake + certificate verification"
        ],
        example: `// HTTP Request
GET /api/users/123 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGc...

// HTTP Response
HTTP/1.1 200 OK
Content-Type: application/json
{"id": 123, "name": "Alice"}

// Common status codes
200 OK, 201 Created, 204 No Content
301 Moved Permanently, 304 Not Modified
400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found
500 Internal Server Error, 503 Service Unavailable`
      },
      "DNS": {
        explanation: "DNS (Domain Name System) translates human-readable domain names to IP addresses. The internet's phone book.",
        details: [
          "Hierarchical: root → TLD (.com, .org) → domain → subdomain",
          "Records: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), NS (nameserver)",
          "Caching: reduces lookup time; TTL controls cache duration"
        ],
        example: `// DNS lookup for "www.example.com"
1. Check local cache
2. Query recursive resolver (ISP)
3. Resolver → root nameserver → .com TLD address
4. Resolver → .com TLD → example.com NS address
5. Resolver → example.com NS → www IP address
6. Returns IP, cached for TTL duration

// DNS record types
A     example.com → 93.184.216.34
CNAME www.example.com → example.com (alias)
MX    example.com → mail.example.com`
      }
    }
  },
  "Programming Fundamentals": {
    icon: "ti-code",
    color: "#072C53",
    topics: {
      "Variables & Data Types": {
        explanation: "Variables are named storage locations in memory. Data types define the kind of data a variable can hold and operations that can be performed on it.",
        details: [
          "Primitive types: int, float, char, boolean, byte, long, double",
          "Reference types: arrays, objects, strings",
          "Static typing (Java/C++): type checked at compile time",
          "Dynamic typing (Python/JS): type checked at runtime"
        ],
        example: `// Java — statically typed
int age = 25;
double salary = 75000.50;
boolean isActive = true;
String name = "Alice";    // reference type

// Python — dynamically typed
age  = 25          # int
name = "Alice"     # str
nums = [1, 2, 3]   # list

// Type conversion
int n = (int)3.7;  // explicit cast → 3
double d = 5;      // implicit (widening) → 5.0`
      },
      "Loops": {
        explanation: "Loops execute a block of code repeatedly. Three main types: for (known iterations), while (condition-based), do-while (executes at least once).",
        details: [
          "break: exit loop immediately",
          "continue: skip current iteration",
          "Nested loops: O(n²) typical complexity"
        ],
        example: `// For loop
for (int i = 0; i < 5; i++) System.out.print(i + " ");

// While loop
int n = 10;
while (n > 0) { System.out.print(n + " "); n -= 3; }

// Python for-each
for item in ["a", "b", "c"]: print(item)

# List comprehension
squares = [x**2 for x in range(10)]`
      },
      "Exception Handling": {
        explanation: "Exception handling manages runtime errors gracefully, preventing program crashes and providing meaningful error messages or recovery mechanisms.",
        details: [
          "try: code that might throw exception",
          "catch: handles specific exceptions",
          "finally: always executes (cleanup code)",
          "throw/throws: explicitly raise exceptions"
        ],
        example: `try {
    int result = 10 / 0;  // ArithmeticException
} catch (ArithmeticException e) {
    System.out.println("Math error: " + e.getMessage());
} finally {
    System.out.println("Always executes!");
}

# Python
try:
    x = int(input())
    result = 10 / x
except (ValueError, ZeroDivisionError) as e:
    print(f"Error: {e}")
else:
    print(f"Result: {result}")  # runs if no exception`
      },
      "Functions/Methods": {
        explanation: "Functions are reusable blocks of code that perform specific tasks. They accept inputs (parameters) and optionally return outputs.",
        details: [
          "Parameters: variables in function definition",
          "Arguments: actual values passed when calling",
          "Return type: type of value returned",
          "Scope: local variables exist only within function"
        ],
        example: `// Java method
public static int add(int a, int b) { return a + b; }

// Method overloading
int    add(int a, int b)       { return a + b; }
double add(double a, double b) { return a + b; }

// Python with default + keyword args
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

greet("Alice")              # "Hello, Alice!"
greet("Bob", greeting="Hi") # "Hi, Bob!"

# Lambda
square = lambda x: x ** 2
print(list(map(square, [1,2,3,4,5])))  # [1,4,9,16,25]`
      },
      "Recursion": {
        explanation: "Recursion is a programming technique where a function calls itself. Requires a base case and a recursive case that reduces the problem.",
        details: [
          "Call stack: each call creates a new stack frame",
          "Stack overflow: max recursion depth exceeded",
          "Tail recursion optimization: compiler converts to iteration"
        ],
        example: `// Factorial
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Fibonacci
int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}

// Recursion tree for fib(4):
//        fib(4)
//       /      \\
//    fib(3)   fib(2)
//    /   \\    /    \\
// fib(2) fib(1) fib(1) fib(0)`
      }
    }
  },
  "AI / ML / GenAI": {
    icon: "ti-brain",
    color: "#A32D2D",
    topics: {
      "Machine Learning": {
        explanation: "Machine Learning is a subset of AI where systems learn from data to make predictions or decisions without being explicitly programmed for each task.",
        details: [
          "Supervised: labeled data (classification, regression)",
          "Unsupervised: unlabeled data (clustering, dimensionality reduction)",
          "Reinforcement: learn through rewards and penalties",
          "Training vs test set: 80/20 or 70/30 split typical"
        ],
        example: `from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([[1],[2],[3],[4],[5]])
y = np.array([150,250,300,400,500])

model = LinearRegression()
model.fit(X, y)
print(model.predict([[6]]))  # ~580

from sklearn.cluster import KMeans
kmeans = KMeans(n_clusters=3)
kmeans.fit(X)
print(kmeans.labels_)`
      },
      "Neural Networks": {
        explanation: "Neural networks are ML models inspired by the brain. Layers of interconnected neurons learn by adjusting weights through backpropagation.",
        details: [
          "Input → Hidden layers → Output",
          "Activation functions: ReLU, Sigmoid, Tanh, Softmax",
          "Backpropagation: compute gradients, adjust weights",
          "Gradient descent: optimize weights to minimize loss"
        ],
        example: `import torch.nn as nn

model = nn.Sequential(
    nn.Linear(784, 256),
    nn.ReLU(),
    nn.Linear(256, 128),
    nn.ReLU(),
    nn.Linear(128, 10),
    nn.Softmax(dim=1)
)

# Training loop
for epoch in range(100):
    output = model(X_train)
    loss = criterion(output, y_train)
    optimizer.zero_grad()
    loss.backward()   # backprop
    optimizer.step()  # update weights`
      },
      "LLMs": {
        explanation: "Large Language Models are transformer-based neural networks trained on massive text corpora to understand and generate human language.",
        details: [
          "Architecture: transformer with self-attention mechanism",
          "Pre-training: predict next token on large dataset",
          "Fine-tuning: adapt to specific tasks/behavior",
          "RLHF: Reinforcement Learning from Human Feedback"
        ],
        example: `import anthropic
client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-opus-4-6",
    max_tokens=1000,
    temperature=0.7,   # 0=deterministic, 1=creative
    messages=[
        {"role": "user", "content": "Explain recursion simply."}
    ]
)
print(response.content[0].text)`
      },
      "Prompt Engineering": {
        explanation: "Prompt engineering is the practice of designing effective inputs for LLMs to get desired, high-quality outputs.",
        details: [
          "Zero-shot: no examples provided",
          "Few-shot: provide 2–5 examples in prompt",
          "Chain-of-thought: ask model to think step-by-step",
          "Role prompting: give the AI a persona/role"
        ],
        example: `// Few-shot
"Classify sentiment:
'Terrible product.' → Negative
'I love it!' → Positive
'Not bad, could be better.' → Neutral
'This is absolutely wonderful!' → "
// Output: Positive

// Chain-of-thought
"Q: Roger has 5 balls. He buys 2 cans of 3. Total?
A: Step 1: 2 × 3 = 6 new balls.
   Step 2: 5 + 6 = 11 balls."

// Structured output
"Return ONLY valid JSON: {'score': ..., 'reason': '...'}"`
      },
      "RAG": {
        explanation: "Retrieval-Augmented Generation enhances LLMs by retrieving relevant documents and injecting them into the prompt, giving the model up-to-date or domain-specific knowledge.",
        details: [
          "Problem: LLMs have knowledge cutoffs and may hallucinate",
          "Solution: retrieve relevant documents → inject into prompt",
          "Components: Document store, Embedding model, Vector DB, LLM",
          "Enables private knowledge bases without fine-tuning"
        ],
        example: `# RAG pipeline
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings

vectorstore = Chroma.from_documents(chunks, OpenAIEmbeddings())
docs = vectorstore.similarity_search(query, k=3)

context = "\\n".join([d.page_content for d in docs])
prompt = f"Context:\\n{context}\\n\\nAnswer: {query}"
answer = llm(prompt)`
      },
      "Hallucinations": {
        explanation: "LLM hallucinations occur when a model generates confident but factually incorrect information — presenting plausible-sounding but false content.",
        details: [
          "Factual hallucination: wrong facts presented confidently",
          "Source hallucination: citing non-existent papers/sources",
          "Causes: gaps in training data, overconfident generation",
          "Mitigation: RAG, grounding, verification, lower temperature"
        ],
        example: `// Mitigation strategies

// 1. RAG — ground in retrieved facts
context = retrieve(query)
prompt = f"Answer ONLY using: {context}"

// 2. Force citations
prompt = "Cite [Source: doc, section] for every claim.
         If you cannot cite it, say 'I don't know.'"

// 3. Temperature = 0 (more deterministic)
response = client.create(model="gpt-4", temperature=0.0)

// 4. Self-consistency — sample multiple, vote
responses = [llm(prompt) for _ in range(5)]`
      }
    }
  },
  "Software Engineering": {
    icon: "ti-settings",
    color: "#5F5E5A",
    topics: {
      "SDLC": {
        explanation: "The Software Development Life Cycle is a structured process for planning, creating, testing, and deploying software.",
        details: [
          "Phases: Planning, Requirements, Design, Implementation, Testing, Deployment, Maintenance",
          "Models: Waterfall, Agile, Spiral, V-Model, RAD",
          "Goal: deliver high-quality software on time and within budget"
        ],
        example: `// SDLC phases
1. PLANNING       → feasibility, timeline, budget
2. REQUIREMENTS   → SRS document (functional + non-functional)
3. DESIGN         → HLD (architecture), LLD (schemas, classes)
4. IMPLEMENTATION → coding, code review, version control
5. TESTING        → unit, integration, system, UAT
6. DEPLOYMENT     → release to production
7. MAINTENANCE    → bug fixes, updates, enhancements`
      },
      "Agile/Scrum": {
        explanation: "Agile is an iterative methodology. Scrum is a popular framework using short sprints (1–4 weeks) to deliver working software incrementally.",
        details: [
          "Roles: Product Owner, Scrum Master, Development Team",
          "Artifacts: Product Backlog, Sprint Backlog, Increment",
          "Ceremonies: Sprint Planning, Daily Standup, Sprint Review, Retrospective"
        ],
        example: `// User Story format
"As a [user], I want [feature] so that [benefit]"
Ex: "As a customer, I want to filter by price
     so that I can find affordable items."

// Sprint 2 weeks:
Planning → Daily Standup (15 min) → Review → Retrospective

// Daily Standup:
// What did I do yesterday?
// What will I do today?
// Any blockers?`
      },
      "Git": {
        explanation: "Git is a distributed version control system that tracks changes in code, enables collaboration, and allows reverting to previous versions.",
        details: [
          "Repository: project folder tracked by git",
          "Commit: snapshot of changes with a message",
          "Branch: independent line of development",
          "Merge: combine branches; Rebase: replay commits"
        ],
        example: `git init / git clone <url>
git add . && git commit -m "Add feature"
git push origin main / git pull origin main

git branch feature/login    # create branch
git checkout -b feature/signup  # create + switch

git merge feature/login     # merge into current
git log --oneline           # view history
git stash / git stash pop   # save/restore WIP
git reset --soft HEAD~1     # undo last commit (keep changes)`
      }
    }
  },
  "Cybersecurity": {
    icon: "ti-shield",
    color: "#3C3489",
    topics: {
      "Encryption": {
        explanation: "Encryption converts readable data (plaintext) into unreadable format (ciphertext) using an algorithm and key. Only authorized parties with the correct key can decrypt it.",
        details: [
          "Symmetric: same key for encrypt/decrypt (AES, DES) — fast",
          "Asymmetric: public key encrypts, private key decrypts (RSA, ECC)",
          "TLS uses asymmetric to exchange a symmetric key, then symmetric for speed",
          "AES-256 is the current industry standard for symmetric encryption"
        ],
        example: `// Symmetric — AES-256
from Crypto.Cipher import AES
key = get_random_bytes(32)   # 256-bit key
cipher = AES.new(key, AES.MODE_GCM)
ciphertext, tag = cipher.encrypt_and_digest(b"Secret")

// Asymmetric — RSA
# 1. Alice gets Bob's PUBLIC key
# 2. Encrypts message with Bob's public key
# 3. Only Bob's PRIVATE key can decrypt
private_key = rsa.generate_private_key(65537, 2048)
public_key  = private_key.public_key()`
      },
      "Hashing": {
        explanation: "Hashing converts input into a fixed-size digest using a one-way function. Same input always produces the same hash; you cannot reverse a hash to recover the input.",
        details: [
          "One-way: hash → original is computationally infeasible",
          "Deterministic: same input → same hash always",
          "Avalanche effect: tiny input change → completely different hash",
          "Use bcrypt for passwords (slow by design — resists brute force)"
        ],
        example: `import hashlib, bcrypt

# SHA-256
h = hashlib.sha256(b"password123").hexdigest()
# "ef92b778..."

# Same input → same hash
# Different input → completely different hash

# Passwords: use bcrypt (NOT SHA-256!)
salt   = bcrypt.gensalt()
hashed = bcrypt.hashpw(b"mypassword", salt)
bcrypt.checkpw(b"mypassword",   hashed)  # True
bcrypt.checkpw(b"wrongpassword", hashed) # False

# SHA-256: billions/sec   ← vulnerable to brute force
# bcrypt:  ~100/sec       ← slow by design`
      }
    }
  },
  "Cloud & DevOps": {
    icon: "ti-cloud",
    color: "#185FA5",
    topics: {
      "Docker": {
        explanation: "Docker packages applications in containers — lightweight, portable environments that include everything needed to run the application.",
        details: [
          "Container: running instance of an image",
          "Image: read-only template built from a Dockerfile",
          "Dockerfile: instructions to build an image",
          "Docker Hub: public registry for images"
        ],
        example: `# Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "app.py"]

# Build & run
docker build -t myapp:latest .
docker run -p 8080:8000 myapp:latest

# Common commands
docker ps / docker ps -a      # list containers
docker images                 # list images
docker exec -it <id> bash     # enter container
docker logs <id>              # view logs`
      },
      "CI/CD": {
        explanation: "CI/CD automates the process of integrating code changes, running tests, and deploying to production.",
        details: [
          "CI: automatically build and test on every commit",
          "CD: automatically deploy after tests pass",
          "Tools: GitHub Actions, Jenkins, GitLab CI, CircleCI",
          "Benefits: faster releases, catch bugs early, consistent deployments"
        ],
        example: `# .github/workflows/main.yml
name: CI/CD
on: push

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: pip install -r requirements.txt
      - run: pytest tests/

  deploy:
    needs: test    # only if tests pass
    runs-on: ubuntu-latest
    steps:
      - run: docker build -t app . && docker push registry/app
      - run: kubectl rollout restart deployment/app`
      }
    }
  },
  "Java": {
    icon: "ti-coffee",
    color: "#D85A30",
    topics: {
      "Collections Framework": {
        explanation: "Java Collections Framework provides a unified architecture for storing and manipulating groups of objects with key interfaces: List, Set, Map, Queue.",
        details: [
          "List: ordered, allows duplicates (ArrayList, LinkedList)",
          "Set: no duplicates (HashSet, TreeSet, LinkedHashSet)",
          "Map: key-value pairs (HashMap, TreeMap, LinkedHashMap)",
          "Queue: FIFO (LinkedList, PriorityQueue, ArrayDeque)"
        ],
        example: `// ArrayList
ArrayList<String> list = new ArrayList<>();
list.add("Apple"); list.add("Apple"); // duplicates OK
Collections.sort(list);

// HashMap
HashMap<String, Integer> map = new HashMap<>();
map.put("Alice", 90);
map.getOrDefault("Carol", 0);  // 0 if missing

// HashSet — no duplicates
HashSet<Integer> set = new HashSet<>(Arrays.asList(1,2,2,3));
// {1, 2, 3}

// Choose:
// Fast index access  → ArrayList
// No duplicates      → HashSet
// Sorted order       → TreeSet / TreeMap
// Key-value lookup   → HashMap`
      },
      "Multithreading in Java": {
        explanation: "Java provides built-in multithreading. Threads can be created by extending Thread or implementing Runnable.",
        details: [
          "Thread states: NEW, RUNNABLE, BLOCKED, WAITING, TERMINATED",
          "synchronized: only one thread executes block at a time",
          "volatile: variable read from main memory, not CPU cache",
          "ExecutorService: thread pool for managing multiple threads"
        ],
        example: `// Runnable (preferred)
Runnable task = () -> System.out.println("Running");
new Thread(task).start();

// Synchronized counter (thread-safe)
class Counter {
    private int count = 0;
    public synchronized void increment() { count++; }
    public synchronized int getCount()   { return count; }
}

// Thread pool
ExecutorService exec = Executors.newFixedThreadPool(4);
Future<Integer> future = exec.submit(() -> 42);
int result = future.get();  // blocks until done
exec.shutdown();`
      }
    }
  },
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
  },
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
  },
  "Python": {
    icon: "ti-brand-python",
    color: "#3B6D11",
    topics: {
      "Python OOP": {
        explanation: "Python supports OOP with classes, inheritance, and polymorphism. It uses dynamic typing and special methods (dunder/magic methods) for operator overloading.",
        details: [
          "__init__: constructor",
          "__str__: human-readable string representation",
          "__repr__: developer/debug representation",
          "super(): call parent class method",
          "Multiple inheritance supported"
        ],
        example: `class Animal:
    def __init__(self, name, age):
        self.name = name
        self.age  = age

    def speak(self):
        raise NotImplementedError  # abstract-like

    def __str__(self):
        return f"{self.name} ({self.age} yrs)"

class Dog(Animal):
    def __init__(self, name, age, breed):
        super().__init__(name, age)
        self.breed = breed

    def speak(self):
        return f"{self.name}: Woof!"

# Operator overloading
class Vector:
    def __init__(self, x, y): self.x, self.y = x, y
    def __add__(self, o): return Vector(self.x+o.x, self.y+o.y)
    def __str__(self):    return f"({self.x}, {self.y})"`
      },
      "Dictionaries & Lists": {
        explanation: "Python's core built-in data structures. Lists are ordered mutable sequences. Dictionaries are mutable key-value mappings (hash tables).",
        details: [
          "List: [], append, extend, insert, remove, pop, slicing",
          "Dict: {}, get, update, keys, values, items",
          "List comprehension: [expr for x in iterable if cond]",
          "Dict comprehension: {k:v for k,v in pairs}"
        ],
        example: `# List operations
nums = [1, 2, 3, 4, 5]
nums.append(6)         # [1,2,3,4,5,6]
nums[::-1]             # [6,5,4,3,2,1] reverse
sorted(nums)           # sorted copy

# Dictionary operations
student = {"name": "Alice", "age": 20}
student["major"] = "CS"             # add key
student.get("phone", "N/A")         # "N/A" if missing
del student["age"]                  # remove key

# List comprehension
squares = [x**2 for x in range(10)]
evens   = [x for x in range(20) if x % 2 == 0]

# Dict comprehension
word_len = {w: len(w) for w in ["apple","banana","fig"]}
# {'apple': 5, 'banana': 6, 'fig': 3}`
      }
    }
  }
};

const allTopics = Object.entries(notes).flatMap(([section, data]) =>
  Object.keys(data.topics).map(topic => ({ section, topic }))
);

export default function CSNotes() {
  const [activeSection, setActiveSection] = useState("Generative AI");
  const [activeTopic, setActiveTopic] = useState("What is Generative AI?");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return allTopics
      .filter(({ topic, section }) =>
        topic.toLowerCase().includes(q) || section.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [search]);

  const currentNote = notes[activeSection]?.topics[activeTopic];

  const selectTopic = (section, topic) => {
    setActiveSection(section);
    setActiveTopic(topic);
    setSearch("");
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "var(--font-sans, sans-serif)",
        background: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen ? 260 : 0,
          minWidth: sidebarOpen ? 260 : 0,
          transition: "all 0.2s",
          overflow: "hidden",
          background: "#ffffff",
          borderRight: "0.5px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "16px 12px 8px",
            borderBottom: "0.5px solid #e0e0e0",
          }}
        >
          <div
            style={{
              fontWeight: 500,
              fontSize: 15,
              color: "#000000",
              marginBottom: 8,
            }}
          >
            <i
              className="ti ti-book-2"
              style={{ marginRight: 6, color: "#333333" }}
              aria-hidden="true"
            />
            CS Notes
          </div>
          <input
            type="text"
            placeholder="Search topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              fontSize: 13,
              boxSizing: "border-box",
              color: "#000000",
              background: "#fff",
              padding: "5px 8px",
              border: "0.5px solid #ccc",
              borderRadius: 6,
            }}
          />
          {searchResults.length > 0 && (
            <div
              style={{
                marginTop: 6,
                maxHeight: 200,
                overflowY: "auto",
                background: "#ffffff",
                borderRadius: 8,
                border: "0.5px solid #e0e0e0",
              }}
            >
              {searchResults.map(({ section, topic }) => (
                <div
                  key={`${section}:${topic}`}
                  onClick={() => selectTopic(section, topic)}
                  style={{
                    padding: "8px 10px",
                    cursor: "pointer",
                    fontSize: 12,
                    borderBottom: "0.5px solid #e0e0e0",
                  }}
                >
                  <div style={{ fontWeight: 500, color: "#000000" }}>
                    {topic}
                  </div>
                  <div style={{ color: "#666666", fontSize: 11 }}>
                    {section}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ overflowY: "auto", flex: 1 }}>
          {Object.entries(notes).map(([section, data]) => (
            <div key={section}>
              <div
                style={{
                  padding: "10px 12px 4px",
                  fontSize: 11,
                  fontWeight: 500,
                  color: "#555555",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <i
                  className={`ti ${data.icon}`}
                  style={{ fontSize: 13, color: "#333333" }}
                  aria-hidden="true"
                />
                {section}
              </div>
              {Object.keys(data.topics).map((topic) => (
                <div
                  key={topic}
                  onClick={() => selectTopic(section, topic)}
                  style={{
                    padding: "6px 12px 6px 28px",
                    cursor: "pointer",
                    fontSize: 13,
                    color:
                      activeSection === section && activeTopic === topic
                        ? "#000000"
                        : "#666666",
                    background:
                      activeSection === section && activeTopic === topic
                        ? "#f0f0f0"
                        : "transparent",
                    borderLeft:
                      activeSection === section && activeTopic === topic
                        ? `3px solid ${data.color}`
                        : "3px solid transparent",
                    fontWeight:
                      activeSection === section && activeTopic === topic
                        ? 500
                        : 400,
                  }}
                >
                  {topic}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            padding: "12px 20px",
            background: "#ffffff",
            borderBottom: "0.5px solid #e0e0e0",
            display: "flex",
            alignItems: "center",
            gap: 12,
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              color: "#666666",
            }}
          >
            <i
              className="ti ti-menu-2"
              style={{ fontSize: 18, color: "#333333" }}
              aria-hidden="true"
            />
          </button>
          <span style={{ fontSize: 13, color: "#666666" }}>{activeSection}</span>
          <i
            className="ti ti-chevron-right"
            style={{ fontSize: 12, color: "#999999" }}
            aria-hidden="true"
          />
          <span style={{ fontSize: 13, fontWeight: 500, color: "#000000" }}>
            {activeTopic}
          </span>
        </div>

        {/* Note content */}
        {currentNote && (
          <div style={{ padding: "24px 32px", maxWidth: 860 }}>
            {/* Section tag */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "#f5f5f5",
                padding: "4px 12px",
                borderRadius: 100,
                fontSize: 12,
                color: "#666666",
                marginBottom: 12,
              }}
            >
              <i
                className={`ti ${notes[activeSection].icon}`}
                style={{ color: "#333333", fontSize: 13 }}
                aria-hidden="true"
              />
              {activeSection}
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 26,
                fontWeight: 500,
                color: "#000000",
                marginBottom: 12,
              }}
            >
              {activeTopic}
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 15,
                color: "#555555",
                lineHeight: 1.7,
                marginBottom: 20,
              }}
            >
              {currentNote.explanation}
            </p>

            {/* Key Points */}
            {currentNote.details && (
              <div
                style={{
                  background: "#f5f5f5",
                  borderRadius: 10,
                  padding: "16px 20px",
                  marginBottom: 20,
                  borderLeft: `3px solid ${notes[activeSection].color}`,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#666666",
                    marginBottom: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Key Points
                </div>
                {currentNote.details.map((d, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 8,
                      marginBottom: 6,
                      fontSize: 13,
                      color: "#000000",
                      lineHeight: 1.6,
                    }}
                  >
                    <span
                      style={{
                        color: notes[activeSection].color,
                        fontWeight: 500,
                        minWidth: 16,
                      }}
                    >
                      •
                    </span>
                    {d}
                  </div>
                ))}
              </div>
            )}

            {/* Code Example */}
            {currentNote.example && (
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#666666",
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Syntax & Examples
                </div>
                <div
                  style={{
                    background: "#f5f5f5",
                    borderRadius: 10,
                    padding: "20px 24px",
                    overflowX: "auto",
                  }}
                >
                  <pre
                    style={{
                      margin: 0,
                      fontFamily: "monospace",
                      fontSize: 13,
                      lineHeight: 1.7,
                      color: "#000000",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {currentNote.example}
                  </pre>
                </div>
              </div>
            )}

            {/* Prev / Next navigation */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 32,
                paddingTop: 20,
                borderTop: "0.5px solid #e0e0e0",
              }}
            >
              {(() => {
                const topics = Object.keys(notes[activeSection].topics);
                const idx = topics.indexOf(activeTopic);
                const prev = idx > 0 ? topics[idx - 1] : null;
                const next = idx < topics.length - 1 ? topics[idx + 1] : null;
                return (
                  <>
                    {prev ? (
                      <button
                        onClick={() => setActiveTopic(prev)}
                        style={{
                          fontSize: 13,
                          color: "#666666",
                          cursor: "pointer",
                          background: "none",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <i className="ti ti-arrow-left" aria-hidden="true" />
                        {prev}
                      </button>
                    ) : (
                      <span />
                    )}
                    {next ? (
                      <button
                        onClick={() => setActiveTopic(next)}
                        style={{
                          fontSize: 13,
                          color: "#666666",
                          cursor: "pointer",
                          background: "none",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        {next}
                        <i className="ti ti-arrow-right" aria-hidden="true" />
                      </button>
                    ) : (
                      <span />
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}