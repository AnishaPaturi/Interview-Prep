import { useState, useMemo } from "react";

const notes = {
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
t.join()  # wait for thread to finish`
      },
      "Process Scheduling": {
        explanation: "Process scheduling is the activity of the process manager that handles the removal of running process from CPU and selection of another process on basis of a strategy. The scheduler manages the ready queue.",
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
Waiting Time (WT) = TAT - BT
Response Time = first_response_time - AT

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
Processes arrive: P1(AT=0,BT=5), P2(AT=1,BT=3), P3(AT=2,BT=1)
Gantt: | P1 | P2 | P3 |
        0    5    8    9
// SJF would order: P3→P2→P1 (shorter jobs first)`
      },
      "Deadlock": {
        explanation: "A deadlock is a situation where a set of processes are blocked, each waiting for a resource held by another process in the set. No progress is possible.",
        details: [
          "Four necessary conditions (Coffman conditions): Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait",
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

Safe sequence: P1→P3→P4→P2→P0
// Each process can finish with available resources`
      },
      "Starvation": {
        explanation: "Starvation occurs when a process waits indefinitely because other higher-priority processes keep getting resources. Common in priority scheduling. Solution: Aging — gradually increase priority of waiting processes.",
        details: [
          "Aging: increase priority of waiting processes over time",
          "Different from deadlock: process CAN run, just never gets scheduled",
          "Common in SJF (long jobs starve) and priority scheduling"
        ],
        example: `// Starvation example - Priority Scheduling
P1 (priority=1, BT=5) — always preempted
P2 (priority=5, BT=3) — runs immediately
P3 (priority=5, BT=2) — runs immediately
// P1 never gets CPU time = Starvation

// Aging Solution
Every T seconds, increase waiting process priority by 1
Initial priority of P1 = 1
After 10s: priority = 2
After 20s: priority = 3
... eventually P1 gets scheduled`
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

// Machine level breakdown:
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
        example: `// Semaphore in C (POSIX)
#include <semaphore.h>
sem_t sem;
sem_init(&sem, 0, 1);  // init to 1 (binary)

// Critical section using semaphore
sem_wait(&sem);    // P operation: S--
// --- critical section ---
counter++;
// --- end critical section ---
sem_sem(&sem);     // V operation: S++

// Producer-Consumer with semaphore
sem_t full, empty, mutex;
sem_init(&full, 0, 0);   // items in buffer
sem_init(&empty, 0, N);  // empty slots
sem_init(&mutex, 0, 1);  // mutual exclusion

// Producer:
sem_wait(&empty);   // wait for empty slot
sem_wait(&mutex);
// add item to buffer
sem_post(&mutex);
sem_post(&full);    // signal item available

// Consumer:
sem_wait(&full);    // wait for item
sem_wait(&mutex);
// remove item from buffer
sem_post(&mutex);
sem_post(&empty);   // signal slot free`
      },
      "Mutex": {
        explanation: "A Mutex (Mutual Exclusion lock) is a locking mechanism ensuring only one thread can access a resource at a time. Unlike semaphore, only the thread that locked a mutex can unlock it.",
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
      "Critical Section": {
        explanation: "A critical section is a segment of code that accesses shared resources (variables, files, etc.) that must not be accessed by more than one process at a time. Proper management ensures data integrity.",
        details: [
          "Entry section: code requesting permission to enter",
          "Critical section: actual shared resource access",
          "Exit section: code releasing permission",
          "Remainder section: rest of the code"
        ],
        example: `// Structure of a process with critical section
do {
    // ENTRY SECTION
    acquire_lock();
    
    // CRITICAL SECTION
    // access/modify shared resource
    shared_variable++;
    
    // EXIT SECTION
    release_lock();
    
    // REMAINDER SECTION
    // non-critical code
} while(true);

// Peterson's Solution (2 processes)
// For P0:
flag[0] = true;      // I want to enter
turn = 1;            // give chance to other
while(flag[1] && turn == 1); // wait
// CRITICAL SECTION
flag[0] = false;     // I'm done`
      },
      "Paging": {
        explanation: "Paging is a memory management scheme that eliminates the need for contiguous memory allocation. Physical memory is divided into fixed-size frames; logical memory into pages of the same size. A page table maps logical to physical addresses.",
        details: [
          "Page size = Frame size (typically 4KB)",
          "Internal fragmentation possible (last page may not be full)",
          "No external fragmentation",
          "Page table stored in memory; TLB (cache) speeds up translation"
        ],
        example: `// Address translation
Logical address: page_number | offset
page_number = logical_addr / page_size
offset = logical_addr % page_size

Example:
Page size = 4KB = 4096 bytes
Logical address = 5000

Page number = 5000 / 4096 = 1
Offset      = 5000 % 4096 = 904

Page table: page 1 → frame 3
Physical address = frame * page_size + offset
                 = 3 * 4096 + 904 = 13192

// TLB (Translation Lookaside Buffer)
// Fast associative cache for page table entries
// TLB hit: direct physical address
// TLB miss: go to page table in memory`
      },
      "Segmentation": {
        explanation: "Segmentation divides memory into variable-size segments based on logical divisions (code, stack, heap, data). Each segment has a name/number and length. A segment table maps segment numbers to base addresses.",
        details: [
          "Supports user's logical view of memory",
          "Segment table: base address + limit for each segment",
          "External fragmentation possible",
          "No internal fragmentation"
        ],
        example: `// Segment table structure
Segment  Base    Limit
  0      1400    1000   // code segment
  1      6300    400    // stack segment
  2      4300    400    // data segment

// Address translation
Logical address = (segment, offset)
Physical address = base[segment] + offset
(if offset < limit[segment], else segment fault)

Example: address (2, 100)
Base of segment 2 = 4300
Offset = 100 < limit 400 ✓
Physical = 4300 + 100 = 4400`
      },
      "Virtual Memory": {
        explanation: "Virtual memory is a technique that allows execution of processes not completely in memory. It creates an illusion of a larger memory by using disk storage. Enables multiprogramming and efficient memory use.",
        details: [
          "Virtual address space can be larger than physical RAM",
          "Pages loaded on demand (demand paging)",
          "Page fault: accessing a page not in memory",
          "Working set: set of pages a process actively uses"
        ],
        example: `// Virtual vs Physical memory
Virtual Address Space: 0 to 2^32 (4GB on 32-bit)
Physical RAM: maybe only 1GB

// When program accesses virtual address:
1. Check TLB → if hit, use physical address
2. If miss → check page table
3. If page in memory → translate address
4. If page NOT in memory → PAGE FAULT
5. OS loads page from disk to memory frame
6. Update page table
7. Restart instruction`
      },
      "Demand Paging": {
        explanation: "Demand paging loads pages into memory only when they are needed (on demand), rather than loading all pages at program start. Reduces initial load time and memory usage.",
        details: [
          "Lazy swapper: never swaps page into memory unless needed",
          "Valid-invalid bit: marks if page is in memory",
          "Page fault handler: loads missing page from disk",
          "Pure demand paging: start with no pages in memory"
        ],
        example: `// Page fault handling steps
1. Process references page P
2. Check page table: valid bit = 0 (not in memory)
3. Trap to OS (page fault)
4. OS verifies valid memory reference
5. Find free frame in physical memory
6. Schedule disk read: load page P into frame
7. Update page table: frame number + valid bit = 1
8. Restart the instruction that caused fault

// Page replacement algorithms (when memory full)
FIFO: replace oldest loaded page
LRU: replace least recently used
Optimal: replace page not used longest in future`
      },
      "Thrashing": {
        explanation: "Thrashing occurs when a process spends more time paging (swapping in/out) than executing. CPU utilization drops dramatically. Caused by insufficient frames allocated to a process.",
        details: [
          "Working set model: allocate enough frames for active pages",
          "Page fault frequency: monitor and adjust frame allocation",
          "When thrashing detected: reduce degree of multiprogramming",
          "Locality model: process migrates through regions"
        ],
        example: `// Thrashing scenario
Available frames: 10
5 processes each need 4 frames minimum
5 × 4 = 20 frames needed but only 10 available

Each process constantly page-faults
CPU utilization → near 0%
OS responds by loading more processes → worse!

// Prevention using Working Set
W(t, window) = set of pages used in last 'window' references
Sum of all working sets > available frames → suspend a process
Sum <= available frames → can admit new process`
      },
      "Memory Management": {
        explanation: "Memory management is the OS function that tracks every memory location (used/free), allocates memory to processes, and deallocates it when done. Goals: efficiency, protection, and sharing.",
        details: [
          "Contiguous: fixed partition, variable partition",
          "Non-contiguous: paging, segmentation, paged segmentation",
          "Fragmentation: internal (wasted inside partition), external (wasted between)",
          "Compaction: shuffle memory contents to combine free space"
        ],
        example: `// Memory allocation strategies
First Fit: allocate first hole big enough (fast)
Best Fit:  allocate smallest hole that fits (least waste, slow)
Worst Fit: allocate largest hole (maximizes leftover, usually bad)

// Example - holes: [100KB, 500KB, 200KB, 300KB, 600KB]
// Request 212KB:
First Fit → 500KB hole (wastes 288KB)
Best Fit  → 300KB hole (wastes 88KB)  
Worst Fit → 600KB hole (wastes 388KB)`
      },
      "Cache Memory": {
        explanation: "Cache memory is a small, fast memory between CPU and RAM that stores frequently accessed data. Exploits locality of reference: spatial (nearby data used soon) and temporal (recently used data used again).",
        details: [
          "L1 cache: fastest, smallest, on-chip (~32KB)",
          "L2 cache: slower, larger (~256KB)",
          "L3 cache: shared among cores (~8MB)",
          "Cache hit: data found in cache; cache miss: fetch from RAM",
          "Hit ratio = hits / (hits + misses)"
        ],
        example: `// Cache access time calculation
Hit time = 10ns, Miss penalty = 100ns, Hit rate = 90%
AMAT = Hit time + (Miss rate × Miss penalty)
     = 10 + (0.10 × 100) = 10 + 10 = 20ns

// Cache mapping
Direct mapped: each memory block → exactly one cache line
Fully associative: any block → any cache line
Set associative: block → specific set, any line in set (compromise)

// Locality
Temporal: int sum=0; for(i=0;i<n;i++) sum+=a[i];
// 'sum' accessed repeatedly → temporal locality

Spatial: for(int i=0;i<n;i++) sum+=a[i];
// a[0],a[1],a[2]... → consecutive memory → spatial locality`
      },
      "Context Switching": {
        explanation: "Context switching is the process of saving the state of a currently running process and loading the saved state of the next process. Allows multitasking but introduces overhead.",
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

// Context switch time: typically 1-10 microseconds`
      },
      "Multitasking": {
        explanation: "Multitasking is the ability of an OS to run multiple tasks (processes) concurrently. The CPU rapidly switches between tasks, giving the illusion of parallel execution.",
        details: [
          "Preemptive multitasking: OS can forcibly take CPU from a process",
          "Cooperative multitasking: process voluntarily yields CPU",
          "Time-sharing: each process gets a time slice (quantum)",
          "Modern OS use preemptive multitasking"
        ],
        example: `// Preemptive vs Cooperative
// Preemptive (modern OS)
Process A running...
Timer interrupt → OS saves A, runs B
(A didn't choose to stop)

// Cooperative (older OS like Windows 3.x)
Process A running...
A calls yield() → OS runs B
(A chose to give up CPU)

// Process timeline (time sharing, Q=10ms)
Time: 0   10   20   30   40ms
      |P1 |P2 |P1 |P2 |P1...
// Each process gets 10ms turns`
      },
      "Multithreading": {
        explanation: "Multithreading allows multiple threads of a single process to execute concurrently. Threads share the process's resources but execute independently.",
        details: [
          "Benefits: responsiveness, resource sharing, economy, scalability",
          "Models: Many-to-One, One-to-One, Many-to-Many",
          "Challenges: race conditions, deadlock, synchronization"
        ],
        example: `// Java multithreading
class Counter {
    private int count = 0;
    
    synchronized void increment() {  // thread-safe
        count++;
    }
    
    int getCount() { return count; }
}

Counter c = new Counter();
Thread t1 = new Thread(() -> { for(int i=0;i<1000;i++) c.increment(); });
Thread t2 = new Thread(() -> { for(int i=0;i<1000;i++) c.increment(); });
t1.start(); t2.start();
t1.join(); t2.join();
System.out.println(c.getCount()); // always 2000 (synchronized)`
      },
      "Kernel Mode": {
        explanation: "Kernel mode (supervisor/privileged mode) is a CPU mode where the OS kernel runs with full access to hardware and all instructions. Critical for system calls and hardware management.",
        details: [
          "Full hardware access, all instructions allowed",
          "Can access entire memory space",
          "Handles system calls, interrupts, exceptions",
          "Switching to kernel mode: via system call trap instruction"
        ],
        example: `// Mode transitions
User program calls read() system call
    ↓
Trap instruction → switches to Kernel Mode
    ↓
OS kernel executes read() with full privileges
Accesses disk hardware directly
    ↓
Returns result, switches back to User Mode
    ↓
User program continues

// Mode bit: 0 = Kernel, 1 = User
// Privileged instructions only execute in kernel mode`
      },
      "User Mode": {
        explanation: "User mode is a restricted CPU mode where user applications run. Limited instructions available, no direct hardware access. Protection prevents user programs from crashing the OS.",
        details: [
          "Restricted instruction set",
          "Cannot access kernel memory directly",
          "Uses system calls to request OS services",
          "Fault in user mode → process terminated, not OS crash"
        ],
        example: `// User space vs Kernel space
User Space (User Mode):
  - Your C/Java/Python programs
  - Libraries (libc, JVM)
  - Cannot directly access hardware

To access hardware, make a system call:
  open("file.txt") → syscall → Kernel handles it

Kernel Space (Kernel Mode):
  - OS kernel code
  - Device drivers
  - Memory management
  - Process scheduling`
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
open(path, flags)     // open file, return fd
read(fd, buf, n)      // read n bytes
write(fd, buf, n)     // write n bytes
close(fd)             // close file descriptor
lseek(fd, offset, whence) // move file pointer
unlink(path)          // delete file`
      },
      "Disk Scheduling": {
        explanation: "Disk scheduling algorithms determine the order in which disk I/O requests are serviced to minimize seek time (time for read/write head to move to correct track).",
        details: [
          "FCFS: simple, fair, but poor performance",
          "SSTF (Shortest Seek Time First): minimum seek, starvation possible",
          "SCAN (Elevator): move in one direction, reverse — no starvation",
          "C-SCAN: move one direction only, jump back — uniform wait time",
          "LOOK/C-LOOK: only go as far as last request (not end of disk)"
        ],
        example: `// SCAN algorithm example
Head at position 50, moving toward high numbers
Request queue: [82, 170, 43, 140, 24, 16, 190]
Disk size: 0-199

SCAN sequence: 50→82→140→170→190→199→43→24→16
Seek distance: 32+58+30+20+9+156+19+8 = 332

SSTF sequence: 50→43→24→16→82→140→170→190
(always pick closest request)
Seek distance: 7+19+8+66+58+30+20 = 208 (better!)
But: requests 170,190 may starve`
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
          "DBMS vs File system: data redundancy control, data integrity, concurrent access, security",
          "3-level architecture: External, Conceptual, Internal (ANSI/SPARC)"
        ],
        example: `// DBMS advantages over file system
File System Problems → DBMS Solution
Data redundancy      → Normalization
Data inconsistency   → Single source of truth
No data sharing      → Multi-user concurrent access
Security issues      → Role-based access control
No backup/recovery   → Transaction management, ACID

// Database languages
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
        example: `// ER Model components
Entity:      [Student]    [Course]
Attributes:  Student: {SID, Name, Age}
             Course: {CID, CourseName, Credits}
Relationship: Student ─── ENROLLS ─── Course
Cardinality:  Many-to-Many (M:N)
              A student can enroll in many courses
              A course can have many students

// Attribute types
Simple:     cannot be divided (Age, ID)
Composite:  can be divided (FullName → First + Last)
Derived:    calculated from others (Age from DOB)
Multi-valued: multiple values (PhoneNumbers: {111,222})
Key:        uniquely identifies entity (StudentID)`
      },
      "Relational Model": {
        explanation: "The relational model represents data as tables (relations). Each table has rows (tuples) and columns (attributes). Relationships are expressed through keys.",
        details: [
          "Relation = table, Tuple = row, Attribute = column",
          "Domain: set of allowed values for an attribute",
          "Degree: number of attributes in a relation",
          "Cardinality: number of tuples in a relation"
        ],
        example: `// Relational model example
STUDENT relation (table):
┌──────┬──────────┬─────┬────────┐
│ SID  │ Name     │ Age │ DeptID │
├──────┼──────────┼─────┼────────┤
│ 101  │ Alice    │ 20  │ CS     │
│ 102  │ Bob      │ 21  │ EE     │
│ 103  │ Charlie  │ 19  │ CS     │
└──────┴──────────┴─────┴────────┘
Degree = 4 (attributes)
Cardinality = 3 (tuples)
Primary Key = SID

// Relational algebra
σ (Selection):    σ(Age>20)(Student) → rows where age>20
π (Projection):   π(Name,Age)(Student) → only Name,Age columns
⋈ (Join):         Student ⋈ Department → combined table
∪ (Union):        R ∪ S
∩ (Intersection): R ∩ S`
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
    CourseID INT,
    PRIMARY KEY (StudentID, CourseID)
    -- combination must be unique
);

INSERT INTO Students VALUES (101, 'Alice', 20);
INSERT INTO Students VALUES (101, 'Bob', 21);
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
    DeptID INT PRIMARY KEY,
    DeptName VARCHAR(50)
);

CREATE TABLE Employee (
    EmpID INT PRIMARY KEY,
    Name VARCHAR(50),
    DeptID INT,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);

-- Valid: DeptID 10 exists in Department
INSERT INTO Employee VALUES (1, 'Alice', 10);

-- Invalid: DeptID 99 doesn't exist in Department
INSERT INTO Employee VALUES (2, 'Bob', 99); -- ERROR!`
      },
      "Normalization": {
        explanation: "Normalization is the process of organizing a database to reduce data redundancy and improve data integrity. It involves decomposing tables according to normal form rules.",
        details: [
          "Goal: eliminate insertion, update, deletion anomalies",
          "1NF → 2NF → 3NF → BCNF (increasing strictness)",
          "Functional dependency: A → B (knowing A determines B)"
        ],
        example: `// Unnormalized table (problems!)
Student_Course:
SID | SName  | CID  | CName    | Grade | InstructorID | InstructorName
101 | Alice  | CS1  | OOP      | A     | I01          | Prof.Smith
101 | Alice  | CS2  | DBMS     | B     | I02          | Prof.Jones
102 | Bob    | CS1  | OOP      | B     | I01          | Prof.Smith

Problems:
- If Prof.Smith changes name → update in many rows (update anomaly)
- Can't store instructor before they teach (insertion anomaly)
- Delete last student in CS1 → lose CS1 info (deletion anomaly)`
      },
      "1NF": {
        explanation: "First Normal Form (1NF): A table is in 1NF if all column values are atomic (indivisible), there are no repeating groups, and each row is unique.",
        details: [
          "No multi-valued attributes",
          "No composite attributes (or decompose them)",
          "Each column must have a single value",
          "Each row must be unique (has a primary key)"
        ],
        example: `// NOT in 1NF (multi-valued attribute)
Student:
SID | Name  | Courses
101 | Alice | CS1, CS2, CS3  ← violation!

// Convert to 1NF
Student_Course:
SID | Name  | Course
101 | Alice | CS1
101 | Alice | CS2
101 | Alice | CS3

// Another violation: nested table
Order: OrderID | Items(ItemID, Qty, Price)
// Items is a repeating group → not 1NF!
// Fix: separate Items table with OrderID FK`
      },
      "2NF": {
        explanation: "Second Normal Form (2NF): A table is in 2NF if it is in 1NF and every non-key attribute is fully functionally dependent on the entire primary key (no partial dependencies).",
        details: [
          "Only applies to tables with composite primary keys",
          "Partial dependency: non-key attribute depends on PART of composite key",
          "Solution: move partially dependent columns to separate table"
        ],
        example: `// In 1NF but NOT 2NF
Order_Item(OrderID, ProductID, Qty, ProductName, OrderDate)
PK = (OrderID, ProductID)

Functional dependencies:
(OrderID, ProductID) → Qty    ✓ full dependency
ProductID → ProductName       ✗ partial dependency!
OrderID → OrderDate           ✗ partial dependency!

// Convert to 2NF - decompose:
Order(OrderID, OrderDate)
Product(ProductID, ProductName)
Order_Item(OrderID, ProductID, Qty)  ← only full deps`
      },
      "3NF": {
        explanation: "Third Normal Form (3NF): A table is in 3NF if it is in 2NF and no non-key attribute is transitively dependent on the primary key (no transitive dependencies).",
        details: [
          "Transitive dependency: A → B → C (where A is PK, B and C are non-key)",
          "Solution: move transitive dependencies to a new table",
          "3NF: 'non-key attributes depend on the key, the whole key, and nothing but the key'"
        ],
        example: `// In 2NF but NOT 3NF
Employee(EmpID, EmpName, DeptID, DeptName, DeptLocation)
PK = EmpID

Dependencies:
EmpID → DeptID        ✓
EmpID → EmpName       ✓
DeptID → DeptName     ← transitive! (EmpID→DeptID→DeptName)
DeptID → DeptLocation ← transitive!

// Convert to 3NF:
Employee(EmpID, EmpName, DeptID)
Department(DeptID, DeptName, DeptLocation)
// No more transitive dependencies!`
      },
      "BCNF": {
        explanation: "Boyce-Codd Normal Form (BCNF) is a stronger version of 3NF. A table is in BCNF if for every functional dependency X → Y, X must be a superkey. BCNF handles anomalies that 3NF misses.",
        details: [
          "Every determinant must be a candidate key",
          "3NF allows non-superkey → non-prime attribute",
          "BCNF does not allow non-superkey to determine anything",
          "BCNF is stricter than 3NF but may lose some FDs during decomposition"
        ],
        example: `// In 3NF but NOT BCNF
Student_Advisor(StudentID, Subject, Advisor)
Candidate keys: (StudentID, Subject), (StudentID, Advisor)
FD: Advisor → Subject (Advisor is NOT a superkey here → violates BCNF)

// Convert to BCNF:
Advisor_Subject(Advisor, Subject)
Student_Advisor(StudentID, Advisor)

// Note: BCNF decomposition may not always preserve all FDs`
      },
      "ACID Properties": {
        explanation: "ACID properties guarantee that database transactions are processed reliably: Atomicity, Consistency, Isolation, and Durability.",
        details: [
          "Atomicity: transaction is all-or-nothing",
          "Consistency: transaction brings DB from one valid state to another",
          "Isolation: concurrent transactions don't interfere with each other",
          "Durability: committed transactions survive system failures"
        ],
        example: `// Bank transfer: move $100 from A to B
BEGIN TRANSACTION;
    UPDATE accounts SET balance = balance - 100 WHERE id = 'A';
    UPDATE accounts SET balance = balance + 100 WHERE id = 'B';
COMMIT;

Atomicity: if second UPDATE fails → ROLLBACK both
Consistency: total money in system unchanged
Isolation: another transaction can't see partial state
Durability: after COMMIT, data persists even after crash

// Isolation levels (trade-off: performance vs consistency)
READ UNCOMMITTED → dirty reads possible
READ COMMITTED   → prevents dirty reads
REPEATABLE READ  → prevents non-repeatable reads
SERIALIZABLE     → strictest, prevents phantom reads`
      },
      "Transactions": {
        explanation: "A transaction is a sequence of database operations treated as a single logical unit of work. It either completes fully (commit) or is entirely undone (rollback).",
        details: [
          "BEGIN/START TRANSACTION: marks start",
          "COMMIT: makes changes permanent",
          "ROLLBACK: undoes all changes since BEGIN",
          "SAVEPOINT: partial rollback point"
        ],
        example: `BEGIN TRANSACTION;
    INSERT INTO orders VALUES (1001, 'Alice', '2024-01-15');
    INSERT INTO order_items VALUES (1001, 'Laptop', 1, 1000);
    UPDATE inventory SET qty = qty - 1 WHERE item = 'Laptop';
    
    -- If inventory goes negative, rollback
    IF (SELECT qty FROM inventory WHERE item='Laptop') < 0 THEN
        ROLLBACK;
    ELSE
        COMMIT;
    END IF;

-- Savepoint example
BEGIN;
    UPDATE a SET x = 1;
    SAVEPOINT sp1;
    UPDATE b SET y = 2;
    ROLLBACK TO sp1;  -- undo b, keep a
COMMIT;`
      },
      "Joins": {
        explanation: "SQL JOINs combine rows from two or more tables based on a related column. Essential for querying relational data spread across multiple tables.",
        details: [
          "INNER JOIN: only matching rows from both tables",
          "LEFT JOIN: all rows from left table + matching from right",
          "RIGHT JOIN: all rows from right table + matching from left",
          "FULL JOIN: all rows from both tables",
          "CROSS JOIN: cartesian product of both tables",
          "SELF JOIN: table joined with itself"
        ],
        example: `-- Sample tables
-- Students: SID, Name, DeptID
-- Department: DeptID, DeptName

-- INNER JOIN: only students with departments
SELECT s.Name, d.DeptName
FROM Students s
INNER JOIN Department d ON s.DeptID = d.DeptID;

-- LEFT JOIN: all students (even without dept)
SELECT s.Name, d.DeptName
FROM Students s
LEFT JOIN Department d ON s.DeptID = d.DeptID;
-- Students with no dept: DeptName = NULL

-- FULL OUTER JOIN: all records
SELECT s.Name, d.DeptName
FROM Students s
FULL OUTER JOIN Department d ON s.DeptID = d.DeptID;

-- SELF JOIN: employees and their managers
SELECT e.Name AS Employee, m.Name AS Manager
FROM Employee e
LEFT JOIN Employee m ON e.ManagerID = m.EmpID;`
      },
      "Indexing": {
        explanation: "An index is a data structure (typically B-tree) that improves data retrieval speed by providing fast lookup. Like a book's index — find data without scanning every row.",
        details: [
          "Clustered index: data rows sorted by index key (one per table)",
          "Non-clustered index: separate structure pointing to data rows",
          "Composite index: index on multiple columns",
          "Trade-off: faster reads, slower writes (index must be maintained)"
        ],
        example: `-- Without index: full table scan O(n)
SELECT * FROM Students WHERE Name = 'Alice';
-- Scans all rows!

-- Create index
CREATE INDEX idx_name ON Students(Name);
-- Now uses B-tree: O(log n) lookup

CREATE UNIQUE INDEX idx_email ON Users(Email);
-- Ensures uniqueness + fast lookup

CREATE INDEX idx_dept_age ON Employee(DeptID, Age);
-- Composite index: best for queries on DeptID or (DeptID AND Age)

-- Check if index is used (PostgreSQL)
EXPLAIN SELECT * FROM Students WHERE Name = 'Alice';

-- Drop index
DROP INDEX idx_name;`
      },
      "Aggregate Functions": {
        explanation: "Aggregate functions perform calculations on a set of rows and return a single value. Used with SELECT to summarize data.",
        details: [
          "COUNT: number of rows",
          "SUM: total of values",
          "AVG: average value",
          "MIN/MAX: smallest/largest value",
          "Used with GROUP BY to aggregate per group"
        ],
        example: `-- COUNT: number of students
SELECT COUNT(*) AS TotalStudents FROM Students;
SELECT COUNT(DISTINCT DeptID) AS Depts FROM Students;

-- SUM, AVG
SELECT SUM(Salary) AS TotalPayroll, 
       AVG(Salary) AS AvgSalary,
       MIN(Salary) AS MinSal,
       MAX(Salary) AS MaxSal
FROM Employees;

-- GROUP BY: aggregate per department
SELECT DeptID, 
       COUNT(*) AS EmpCount,
       AVG(Salary) AS AvgSal
FROM Employees
GROUP BY DeptID;

-- HAVING: filter groups (like WHERE but for aggregates)
SELECT DeptID, AVG(Salary) AS AvgSal
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
          "SELECT *: all columns",
          "SELECT col1, col2: specific columns",
          "Aliases: AS keyword for column/table names",
          "Order of clauses: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY"
        ],
        example: `-- Basic select
SELECT * FROM Employees;
SELECT Name, Salary FROM Employees;

-- Aliases
SELECT Name AS EmployeeName, Salary AS Pay 
FROM Employees AS E;

-- Arithmetic
SELECT Name, Salary, Salary * 1.1 AS NewSalary
FROM Employees;

-- Distinct values
SELECT DISTINCT DeptID FROM Employees;

-- Full query example
SELECT d.DeptName, COUNT(e.EmpID) AS Headcount, AVG(e.Salary) AS AvgPay
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
        example: `-- Basic conditions
SELECT * FROM Employees WHERE Salary > 50000;
SELECT * FROM Employees WHERE DeptID = 10 AND Age < 30;

-- IN operator
SELECT * FROM Students WHERE Major IN ('CS', 'IT', 'ECE');

-- BETWEEN (inclusive)
SELECT * FROM Orders WHERE Amount BETWEEN 100 AND 500;
-- equivalent to: Amount >= 100 AND Amount <= 500

-- LIKE for pattern matching
SELECT * FROM Customers WHERE Name LIKE 'A%';   -- starts with A
SELECT * FROM Customers WHERE Email LIKE '%@gmail.com';
SELECT * FROM Products WHERE Code LIKE 'AB_12'; -- _ = any 1 char

-- NULL checks
SELECT * FROM Employees WHERE ManagerID IS NULL;  -- top-level managers
SELECT * FROM Employees WHERE Phone IS NOT NULL;`
      },
      "ORDER BY": {
        explanation: "ORDER BY sorts the result set by one or more columns, either ascending (ASC, default) or descending (DESC). Applied last in query execution.",
        details: [
          "ASC: ascending order (default)",
          "DESC: descending order",
          "Can sort by multiple columns",
          "NULL values handled differently per DB (first/last)"
        ],
        example: `-- Sort by salary descending
SELECT Name, Salary FROM Employees 
ORDER BY Salary DESC;

-- Multiple column sort
SELECT Name, DeptID, Salary FROM Employees
ORDER BY DeptID ASC, Salary DESC;
-- Sort by dept first, then by salary within each dept

-- Sort by column alias
SELECT Name, Salary * 1.2 AS NewSalary 
FROM Employees
ORDER BY NewSalary DESC;

-- Sort by column position (not recommended)
SELECT Name, Age, Salary FROM Employees
ORDER BY 3 DESC;  -- sort by 3rd column (Salary)`
      },
      "GROUP BY": {
        explanation: "GROUP BY groups rows with the same values in specified columns into summary rows. Used with aggregate functions to calculate per-group statistics.",
        details: [
          "All non-aggregated columns in SELECT must be in GROUP BY",
          "Executed after WHERE, before HAVING",
          "Can group by multiple columns",
          "Produces one row per group"
        ],
        example: `-- Count employees per department
SELECT DeptID, COUNT(*) AS EmpCount
FROM Employees
GROUP BY DeptID;

-- Multiple aggregates
SELECT DeptID, 
       COUNT(*) AS Count,
       AVG(Salary) AS AvgSal,
       MAX(Salary) AS MaxSal
FROM Employees
GROUP BY DeptID;

-- Group by multiple columns
SELECT DeptID, JobTitle, AVG(Salary) AS AvgSal
FROM Employees
GROUP BY DeptID, JobTitle;
-- One row per (department, job title) combination

-- WITH ROLLUP (subtotals)
SELECT DeptID, JobTitle, SUM(Salary)
FROM Employees
GROUP BY DeptID, JobTitle WITH ROLLUP;`
      },
      "HAVING": {
        explanation: "HAVING filters groups after GROUP BY (unlike WHERE which filters rows before grouping). Used to filter based on aggregate function results.",
        details: [
          "WHERE filters rows; HAVING filters groups",
          "HAVING comes after GROUP BY",
          "Can use aggregate functions in HAVING",
          "Can be used without GROUP BY (treats all rows as one group)"
        ],
        example: `-- Only departments with more than 5 employees
SELECT DeptID, COUNT(*) AS EmpCount
FROM Employees
GROUP BY DeptID
HAVING COUNT(*) > 5;

-- WHERE + HAVING together
SELECT DeptID, AVG(Salary) AS AvgSal
FROM Employees
WHERE Status = 'Active'   -- filter rows first
GROUP BY DeptID
HAVING AVG(Salary) > 60000  -- then filter groups

-- Difference: WHERE vs HAVING
-- WHERE: filters BEFORE grouping (individual rows)
-- HAVING: filters AFTER grouping (aggregate results)
SELECT DeptID, SUM(Salary) AS Total
FROM Employees
WHERE Age > 25          -- must be individual row condition
GROUP BY DeptID
HAVING SUM(Salary) > 500000;  -- must be aggregate condition`
      },
      "INSERT": {
        explanation: "INSERT adds new rows to a table. Can insert one row, multiple rows, or results from a SELECT query.",
        details: [
          "Specify column names to avoid order dependency",
          "INSERT INTO ... SELECT: insert query results",
          "Omitted columns get NULL or DEFAULT values",
          "Auto-increment columns can be omitted"
        ],
        example: `-- Single row insert
INSERT INTO Students (SID, Name, Age, DeptID)
VALUES (101, 'Alice', 20, 'CS');

-- Multiple rows (one statement)
INSERT INTO Students VALUES
(102, 'Bob', 21, 'EE'),
(103, 'Charlie', 19, 'CS'),
(104, 'Diana', 22, 'IT');

-- Insert from SELECT
INSERT INTO Graduates (GID, Name, DeptID)
SELECT SID, Name, DeptID 
FROM Students
WHERE GPA >= 3.5;

-- Insert with defaults
CREATE TABLE Products (
    PID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO Products (Name) VALUES ('Laptop');
-- PID and CreatedAt auto-filled`
      },
      "UPDATE": {
        explanation: "UPDATE modifies existing rows in a table. Always use WHERE clause to specify which rows to update — without WHERE, all rows are updated!",
        details: [
          "SET clause specifies column = new value",
          "WHERE clause restricts which rows",
          "Can update multiple columns at once",
          "Can use subqueries in SET and WHERE"
        ],
        example: `-- Update single column
UPDATE Employees SET Salary = 60000 WHERE EmpID = 101;

-- Update multiple columns
UPDATE Employees 
SET Salary = Salary * 1.1, LastUpdated = NOW()
WHERE DeptID = 10;

-- Update with calculation
UPDATE Orders 
SET TotalAmount = Quantity * UnitPrice
WHERE OrderDate = '2024-01-15';

-- Update using subquery
UPDATE Employees 
SET DeptName = (SELECT DeptName FROM Department WHERE DeptID = Employees.DeptID)
WHERE DeptName IS NULL;

-- DANGER: Update without WHERE → updates ALL rows!
UPDATE Employees SET Salary = 0;  -- catastrophic!
-- Always verify with SELECT first:
SELECT * FROM Employees WHERE DeptID = 10;
-- Then update:`
      },
      "DELETE": {
        explanation: "DELETE removes rows from a table. Always use WHERE to specify rows — without WHERE, ALL rows are deleted! DELETE can be rolled back (unlike TRUNCATE).",
        details: [
          "DELETE can be rolled back in a transaction",
          "Fires DELETE triggers",
          "Slower than TRUNCATE for large datasets",
          "Can use subqueries in WHERE"
        ],
        example: `-- Delete specific rows
DELETE FROM Students WHERE SID = 101;

-- Delete with condition
DELETE FROM Orders WHERE OrderDate < '2020-01-01';

-- Delete with subquery
DELETE FROM Employees 
WHERE DeptID IN (SELECT DeptID FROM Department WHERE Status = 'Closed');

-- Delete all rows (use TRUNCATE instead for efficiency)
DELETE FROM TempTable;  -- slow for large tables
TRUNCATE TABLE TempTable;  -- fast, can't rollback

-- DELETE vs DROP vs TRUNCATE
DELETE   → removes rows, table structure remains, rollback possible
TRUNCATE → removes all rows, faster, resets auto-increment, rollback depends on DB
DROP     → removes entire table (structure + data), permanent!`
      },
      "Subqueries": {
        explanation: "A subquery (inner query) is a query nested inside another SQL query. Used to break complex queries into simpler parts.",
        details: [
          "Scalar subquery: returns single value",
          "Row subquery: returns single row",
          "Table subquery: returns a table (used in FROM)",
          "Correlated subquery: references outer query columns"
        ],
        example: `-- Scalar subquery: find employees earning above average
SELECT Name, Salary FROM Employees
WHERE Salary > (SELECT AVG(Salary) FROM Employees);

-- IN subquery: employees in CS department
SELECT Name FROM Employees
WHERE DeptID IN (SELECT DeptID FROM Department WHERE DeptName = 'CS');

-- EXISTS subquery: departments with at least one employee
SELECT DeptName FROM Department d
WHERE EXISTS (SELECT 1 FROM Employees e WHERE e.DeptID = d.DeptID);

-- Correlated subquery: employees earning more than their dept avg
SELECT Name, Salary, DeptID FROM Employees e
WHERE Salary > (
    SELECT AVG(Salary) FROM Employees 
    WHERE DeptID = e.DeptID  -- references outer query
);

-- Subquery in FROM (derived table)
SELECT DeptID, AvgSal FROM (
    SELECT DeptID, AVG(Salary) AS AvgSal
    FROM Employees GROUP BY DeptID
) AS DeptAvg
WHERE AvgSal > 70000;`
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
          "Static (fixed size) or dynamic (resizable like ArrayList)",
          "Access: O(1); Search: O(n); Insert/Delete: O(n) at arbitrary position",
          "Row-major vs column-major storage in 2D arrays",
          "Base address + index × element_size = memory address"
        ],
        example: `// Array declaration and operations
int[] arr = {10, 20, 30, 40, 50};    // Java
int arr[] = {10, 20, 30, 40, 50};    // C/C++

// Access: O(1)
int x = arr[2];    // x = 30

// Linear search: O(n)
for (int i = 0; i < arr.length; i++) {
    if (arr[i] == 30) return i;  // found at index 2
}

// Insert at index (shift right): O(n)
// [10,20,30,40,50] insert 25 at index 2
// [10,20,25,30,40,50]

// 2D array
int[][] matrix = {{1,2,3},{4,5,6},{7,8,9}};
int val = matrix[1][2];  // row 1, col 2 = 6

// Memory formula: addr(i,j) = base + (i*cols + j)*size`
      },
      "Linked List": {
        explanation: "A linked list is a linear data structure where elements (nodes) are connected by pointers. Each node contains data and a reference to the next node. Dynamic size, efficient insertions/deletions.",
        details: [
          "Singly linked: each node → next",
          "Doubly linked: each node ↔ next and prev",
          "Circular: last node → first node",
          "No random access; must traverse from head"
        ],
        example: `// Node structure
class Node {
    int data;
    Node next;
    Node(int data) { this.data = data; this.next = null; }
}

// Linked list operations
class LinkedList {
    Node head;
    
    // Insert at beginning: O(1)
    void prepend(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
    }
    
    // Insert at end: O(n)
    void append(int data) {
        Node newNode = new Node(data);
        if (head == null) { head = newNode; return; }
        Node curr = head;
        while (curr.next != null) curr = curr.next;
        curr.next = newNode;
    }
    
    // Delete node with value: O(n)
    void delete(int key) {
        if (head.data == key) { head = head.next; return; }
        Node curr = head;
        while (curr.next != null && curr.next.data != key)
            curr = curr.next;
        if (curr.next != null) curr.next = curr.next.next;
    }
}`
      },
      "Stack": {
        explanation: "A stack is a LIFO (Last In, First Out) data structure. Elements are added and removed from the same end (top).",
        details: [
          "Push: add to top O(1); Pop: remove from top O(1); Peek: view top O(1)",
          "Applications: undo/redo, browser back, expression evaluation, recursion",
          "Can be implemented with array or linked list"
        ],
        example: `// Stack using array (Java)
class Stack {
    int[] data;
    int top = -1;
    int capacity;
    
    Stack(int n) { data = new int[n]; capacity = n; }
    
    void push(int x) {
        if (top == capacity - 1) throw new RuntimeException("Stack overflow");
        data[++top] = x;
    }
    
    int pop() {
        if (top == -1) throw new RuntimeException("Stack underflow");
        return data[top--];
    }
    
    int peek() { return data[top]; }
    boolean isEmpty() { return top == -1; }
}

// Java built-in
Stack<Integer> s = new Stack<>();
s.push(10); s.push(20); s.push(30);
s.pop();    // returns 30
s.peek();   // returns 20

// Application: balanced parentheses
// Input: "{[()]}"
// Push '(', '[', '{'
// On ')', pop and check if '(' → match
// On empty stack at end → balanced!`
      },
      "Queue": {
        explanation: "A queue is a FIFO (First In, First Out) data structure. Elements are added at the rear and removed from the front.",
        details: [
          "Enqueue: add to rear O(1); Dequeue: remove from front O(1)",
          "Applications: process scheduling, BFS, print queue, breadth-first search",
          "Circular queue solves the front-wasting problem of linear queue"
        ],
        example: `// Queue using linked list
class Queue<T> {
    private LinkedList<T> list = new LinkedList<>();
    
    void enqueue(T item) { list.addLast(item); }    // O(1)
    T dequeue() { return list.removeFirst(); }       // O(1)
    T peek() { return list.getFirst(); }
    boolean isEmpty() { return list.isEmpty(); }
}

// Java built-in
Queue<Integer> q = new LinkedList<>();
q.offer(10);   // enqueue (preferred over add)
q.offer(20);
q.offer(30);
q.poll();      // dequeue → returns 10
q.peek();      // view front → returns 20

// Circular queue (array-based)
class CircularQueue {
    int[] arr; int front, rear, size, capacity;
    void enqueue(int x) {
        rear = (rear + 1) % capacity;
        arr[rear] = x;
    }
    int dequeue() {
        int val = arr[front];
        front = (front + 1) % capacity;
        return val;
    }
}`
      },
      "Hash Table": {
        explanation: "A hash table stores key-value pairs with O(1) average lookup using a hash function to map keys to array indices.",
        details: [
          "Hash function: maps key → index",
          "Collision handling: chaining (linked list per bucket) or open addressing (linear probing)",
          "Load factor: n/m (n = elements, m = table size); typically <0.75",
          "Java: HashMap; Python: dict"
        ],
        example: `// HashMap in Java
HashMap<String, Integer> map = new HashMap<>();
map.put("Alice", 90);     // insert
map.put("Bob", 85);
int score = map.get("Alice");  // 90
map.containsKey("Alice");      // true
map.remove("Bob");
map.getOrDefault("Carol", 0);  // 0 if not found

// Iterate
for (Map.Entry<String, Integer> e : map.entrySet())
    System.out.println(e.getKey() + ": " + e.getValue());

// Hash function (simple)
int hash(String key, int tableSize) {
    int h = 0;
    for (char c : key.toCharArray())
        h = (h * 31 + c) % tableSize;
    return h;
}

// Collision - Chaining
// Index 3: [Alice→90] → [Carl→75] → null
// Both "Alice" and "Carl" hash to index 3`
      },
      "Binary Tree": {
        explanation: "A binary tree is a hierarchical data structure where each node has at most two children (left and right). Root is the topmost node; leaves have no children.",
        details: [
          "Height: longest path from root to leaf",
          "Perfect binary tree: all levels full",
          "Complete binary tree: all levels full except last (filled left to right)",
          "Traversals: Inorder (LNR), Preorder (NLR), Postorder (LRN), Level order (BFS)"
        ],
        example: `// Binary tree node
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

// Build tree:      1
//                /   \\
//               2     3
//              / \\
//             4   5

TreeNode root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

// Inorder (L-N-R): 4, 2, 5, 1, 3
// Preorder (N-L-R): 1, 2, 4, 5, 3
// Postorder (L-R-N): 4, 5, 2, 3, 1

void inorder(TreeNode node) {
    if (node == null) return;
    inorder(node.left);
    System.out.print(node.val + " ");
    inorder(node.right);
}`
      },
      "BST": {
        explanation: "A Binary Search Tree (BST) is a binary tree where for each node: all left subtree values are smaller, all right subtree values are larger. Enables efficient search, insert, and delete.",
        details: [
          "Search: O(h) where h = height; O(log n) balanced, O(n) skewed",
          "Inorder traversal of BST gives sorted sequence",
          "Successor: smallest node in right subtree",
          "Predecessor: largest node in left subtree"
        ],
        example: `// BST operations
class BST {
    TreeNode root;
    
    // Insert: O(log n) average
    TreeNode insert(TreeNode node, int key) {
        if (node == null) return new TreeNode(key);
        if (key < node.val) node.left = insert(node.left, key);
        else if (key > node.val) node.right = insert(node.right, key);
        return node;
    }
    
    // Search: O(log n) average
    boolean search(TreeNode node, int key) {
        if (node == null) return false;
        if (key == node.val) return true;
        if (key < node.val) return search(node.left, key);
        return search(node.right, key);
    }
    
    // Delete: find node, handle 3 cases:
    // 1) Leaf: just remove
    // 2) One child: replace with child
    // 3) Two children: replace with inorder successor
}
// BST Example:
//      5
//    /   \\
//   3     7
//  / \\   / \\
// 2   4  6   8
// Search 6: 5→7→6 ✓`
      },
      "Graph": {
        explanation: "A graph is a collection of vertices (nodes) connected by edges. Models networks, relationships, maps, and many real-world problems.",
        details: [
          "Directed (digraph): edges have direction; Undirected: edges are bidirectional",
          "Weighted: edges have weights/costs; Unweighted: equal edges",
          "Representation: Adjacency Matrix O(V²) space, Adjacency List O(V+E) space",
          "Terms: degree, path, cycle, connected, spanning tree"
        ],
        example: `// Graph representations
// Adjacency List (space-efficient)
Map<Integer, List<Integer>> graph = new HashMap<>();
graph.put(0, Arrays.asList(1, 2));
graph.put(1, Arrays.asList(0, 3));
graph.put(2, Arrays.asList(0, 4));

// Adjacency Matrix (fast edge lookup)
int[][] matrix = {
//   0  1  2  3  4
    {0, 1, 1, 0, 0},  // 0 connects to 1, 2
    {1, 0, 0, 1, 0},  // 1 connects to 0, 3
    {1, 0, 0, 0, 1},  // 2 connects to 0, 4
    {0, 1, 0, 0, 0},  // 3 connects to 1
    {0, 0, 1, 0, 0}   // 4 connects to 2
};

// Graph: 0 - 1 - 3
//        |
//        2 - 4`
      },
      "Heap": {
        explanation: "A heap is a complete binary tree satisfying the heap property. Max-heap: parent ≥ children. Min-heap: parent ≤ children. Efficiently supports priority queue operations.",
        details: [
          "Insert: O(log n); Extract-max/min: O(log n); Peek: O(1)",
          "Stored as array: parent at i, children at 2i+1 and 2i+2",
          "Heapify: convert array to heap O(n)",
          "Used in: Heap Sort, Priority Queue, Dijkstra's algorithm"
        ],
        example: `// Min-heap using PriorityQueue (Java)
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.offer(5); minHeap.offer(3); minHeap.offer(8);
minHeap.peek();   // 3 (min)
minHeap.poll();   // 3 (remove min)

// Max-heap
PriorityQueue<Integer> maxHeap = 
    new PriorityQueue<>(Collections.reverseOrder());

// Heap array representation (Max-heap)
// Index:   0   1   2   3   4   5   6
// Value: [90, 80, 70, 60, 50, 40, 30]
//
//           90
//          /  \\
//        80    70
//       / \\   / \\
//      60  50 40  30
//
// Parent of i: (i-1)/2
// Children of i: 2i+1 (left), 2i+2 (right)`
      }
    }
  },
  "Algorithms": {
    icon: "ti-sort-ascending",
    color: "#BA7517",
    topics: {
      "Binary Search": {
        explanation: "Binary search finds an element in a sorted array by repeatedly halving the search space. Much more efficient than linear search for sorted data.",
        details: [
          "Requires sorted input",
          "Time: O(log n); Space: O(1) iterative, O(log n) recursive",
          "At each step, compare middle element with target"
        ],
        example: `// Iterative Binary Search
int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2; // avoid overflow
        
        if (arr[mid] == target) return mid;      // found
        else if (arr[mid] < target) left = mid + 1;  // search right
        else right = mid - 1;                    // search left
    }
    return -1; // not found
}

// Trace: arr=[2,4,6,8,10,12], target=8
// left=0, right=5, mid=2 → arr[2]=6 < 8 → left=3
// left=3, right=5, mid=4 → arr[4]=10 > 8 → right=3
// left=3, right=3, mid=3 → arr[3]=8 == 8 ✓ return 3

// Recursive version
int bsearch(int[] arr, int l, int r, int target) {
    if (l > r) return -1;
    int mid = l + (r - l) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) return bsearch(arr, mid+1, r, target);
    return bsearch(arr, l, mid-1, target);
}`
      },
      "Merge Sort": {
        explanation: "Merge sort is a divide-and-conquer sorting algorithm. Divides array into halves, recursively sorts each half, then merges the sorted halves.",
        details: [
          "Time: O(n log n) in all cases",
          "Space: O(n) auxiliary space",
          "Stable sort: equal elements maintain relative order",
          "Preferred for linked lists and external sorting"
        ],
        example: `void mergeSort(int[] arr, int left, int right) {
    if (left >= right) return;
    
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);       // sort left half
    mergeSort(arr, mid + 1, right);  // sort right half
    merge(arr, left, mid, right);    // merge sorted halves
}

void merge(int[] arr, int left, int mid, int right) {
    int n1 = mid - left + 1, n2 = right - mid;
    int[] L = new int[n1], R = new int[n2];
    
    System.arraycopy(arr, left, L, 0, n1);
    System.arraycopy(arr, mid+1, R, 0, n2);
    
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2)
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

// Trace: [38, 27, 43, 3]
// Split: [38,27] | [43,3]
// Split: [38]|[27]  [43]|[3]
// Merge: [27,38]    [3,43]
// Merge: [3, 27, 38, 43] ✓`
      },
      "Quick Sort": {
        explanation: "Quick sort uses a pivot to partition the array into elements less than and greater than the pivot, then recursively sorts each partition.",
        details: [
          "Average: O(n log n); Worst case: O(n²) (sorted input with bad pivot)",
          "In-place: O(log n) stack space",
          "Not stable by default",
          "Usually fastest in practice; used in most stdlib sort implementations"
        ],
        example: `void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);   // sort left
        quickSort(arr, pi + 1, high);  // sort right
    }
}

int partition(int[] arr, int low, int high) {
    int pivot = arr[high];  // choose last element as pivot
    int i = low - 1;        // index of smaller element
    
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
        }
    }
    // Place pivot in correct position
    int temp = arr[i+1]; arr[i+1] = arr[high]; arr[high] = temp;
    return i + 1;
}

// Trace: [10, 7, 8, 9, 1, 5], pivot=5
// After partition: [1, 5, 8, 9, 7, 10]
// Recurse on [1] and [8, 9, 7, 10]`
      },
      "BFS": {
        explanation: "Breadth-First Search (BFS) explores a graph level by level, visiting all nodes at distance k before nodes at distance k+1. Uses a queue.",
        details: [
          "Time: O(V+E); Space: O(V)",
          "Finds shortest path in unweighted graphs",
          "Level-order traversal of trees",
          "Applications: shortest path, web crawling, social network friends"
        ],
        example: `// BFS on graph
void bfs(Map<Integer, List<Integer>> graph, int start) {
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> queue = new LinkedList<>();
    
    visited.add(start);
    queue.offer(start);
    
    while (!queue.isEmpty()) {
        int node = queue.poll();
        System.out.print(node + " ");
        
        for (int neighbor : graph.get(node)) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                queue.offer(neighbor);
            }
        }
    }
}

// Graph: 0─1─3
//        │
//        2─4
// BFS from 0: 0, 1, 2, 3, 4

// Find shortest path distance
int[] dist = new int[n];
Arrays.fill(dist, -1);
dist[start] = 0;
// When processing node u, for each neighbor v:
// dist[v] = dist[u] + 1`
      },
      "DFS": {
        explanation: "Depth-First Search (DFS) explores as far as possible along each branch before backtracking. Uses a stack (or recursion).",
        details: [
          "Time: O(V+E); Space: O(V) for recursion stack",
          "Applications: topological sort, cycle detection, connected components, maze solving",
          "Preorder/Inorder/Postorder tree traversals are DFS variants"
        ],
        example: `// Recursive DFS
void dfs(Map<Integer, List<Integer>> graph, int node, Set<Integer> visited) {
    visited.add(node);
    System.out.print(node + " ");
    
    for (int neighbor : graph.get(node)) {
        if (!visited.contains(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}

// Iterative DFS (using stack)
void dfsIterative(Map<Integer, List<Integer>> graph, int start) {
    Set<Integer> visited = new HashSet<>();
    Stack<Integer> stack = new Stack<>();
    
    stack.push(start);
    while (!stack.isEmpty()) {
        int node = stack.pop();
        if (visited.contains(node)) continue;
        visited.add(node);
        System.out.print(node + " ");
        for (int neighbor : graph.get(node))
            if (!visited.contains(neighbor))
                stack.push(neighbor);
    }
}
// DFS from 0: 0, 1, 3, 2, 4 (order may vary)`
      },
      "Dynamic Programming": {
        explanation: "Dynamic Programming (DP) solves complex problems by breaking them into overlapping subproblems, solving each once, and storing results (memoization/tabulation).",
        details: [
          "Memoization: top-down (recursion + cache)",
          "Tabulation: bottom-up (iterative, fill table)",
          "Optimal substructure: optimal solution from optimal sub-solutions",
          "Overlapping subproblems: same subproblem solved multiple times"
        ],
        example: `// Fibonacci — classic DP
// Naive recursion: O(2^n) 
int fib(int n) { return n<=1 ? n : fib(n-1)+fib(n-2); }

// Memoization: O(n)
int[] memo = new int[n+1];
int fib(int n) {
    if (n <= 1) return n;
    if (memo[n] != 0) return memo[n];
    return memo[n] = fib(n-1) + fib(n-2);
}

// Tabulation: O(n)
int fibTab(int n) {
    int[] dp = new int[n+1];
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}

// 0/1 Knapsack
// dp[i][w] = max value using first i items with capacity w
for (int i = 1; i <= n; i++)
    for (int w = 0; w <= W; w++)
        if (weight[i] <= w)
            dp[i][w] = Math.max(dp[i-1][w], 
                                val[i] + dp[i-1][w-weight[i]]);
        else
            dp[i][w] = dp[i-1][w];`
      },
      "Big O Notation": {
        explanation: "Big O notation describes the upper bound of an algorithm's time or space complexity as input size n grows. It ignores constants and lower-order terms, focusing on the dominant term.",
        details: [
          "O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)",
          "Drop constants: 5n → O(n); 3n² + 2n → O(n²)",
          "Best case (Ω), Average case (Θ), Worst case (O)"
        ],
        example: `// O(1) - constant
int getFirst(int[] arr) { return arr[0]; }

// O(log n) - binary search, balanced BST
int binarySearch(int[] arr, int target) { ... }

// O(n) - linear scan
int linearSearch(int[] arr, int target) {
    for (int x : arr) if (x == target) return 1;
    return -1;
}

// O(n log n) - merge sort, heap sort
void mergeSort(int[] arr) { ... }

// O(n²) - nested loops, bubble sort
void bubbleSort(int[] arr) {
    for (int i = 0; i < n; i++)        // O(n)
        for (int j = 0; j < n-i; j++)  // O(n)
            if (arr[j] > arr[j+1]) swap(arr, j, j+1);
}

// O(2^n) - generating all subsets
void subsets(int[] arr, int i, List<Integer> curr) {
    if (i == arr.length) { print(curr); return; }
    curr.add(arr[i]); subsets(arr, i+1, curr);  // include
    curr.remove(...); subsets(arr, i+1, curr);  // exclude
}`
      },
      "Recursion": {
        explanation: "Recursion is a technique where a function calls itself to solve a smaller version of the same problem. Requires a base case (stops recursion) and recursive case.",
        details: [
          "Call stack: each recursive call adds a frame",
          "Stack overflow: too many recursive calls",
          "Tail recursion: recursive call is last operation (can be optimized)",
          "Every recursive solution can be written iteratively"
        ],
        example: `// Base case + recursive case pattern
int factorial(int n) {
    if (n == 0) return 1;         // base case
    return n * factorial(n - 1);  // recursive case
}
// factorial(4) = 4 × factorial(3)
//              = 4 × 3 × factorial(2)
//              = 4 × 3 × 2 × factorial(1)
//              = 4 × 3 × 2 × 1 × factorial(0)
//              = 4 × 3 × 2 × 1 × 1 = 24

// Tower of Hanoi
void hanoi(int n, char from, char to, char aux) {
    if (n == 1) { 
        System.out.println("Move disk 1: " + from + " → " + to);
        return;
    }
    hanoi(n-1, from, aux, to);  // move n-1 disks to aux
    System.out.println("Move disk " + n + ": " + from + " → " + to);
    hanoi(n-1, aux, to, from);  // move n-1 from aux to to
}
// 3 disks needs 2³-1 = 7 moves`
      },
      "Greedy Algorithms": {
        explanation: "Greedy algorithms make the locally optimal choice at each step, hoping to find the global optimum. Works when greedy choice + optimal substructure applies.",
        details: [
          "Examples: Huffman coding, Kruskal's, Prim's, Dijkstra's, activity selection",
          "Greedy doesn't always work: 0/1 Knapsack needs DP",
          "Coin change: greedy works for standard currency systems"
        ],
        example: `// Activity Selection (maximize activities)
// Sort by finish time, always pick earliest-finishing activity
activities = [{start:1,end:4},{start:3,end:5},{start:0,end:6},
              {start:5,end:7},{start:8,end:9},{start:5,end:9}]
// Sort by end: [1,4],[3,5],[0,6],[5,7],[5,9],[8,9]
// Pick [1,4] → next compatible: [5,7] → [8,9]
// Result: 3 activities selected (optimal!)

// Fractional Knapsack
// Sort by value/weight ratio, take most valuable first
items = [{val:60,wt:10},{val:100,wt:20},{val:120,wt:30}]
capacity = 50
// Ratios: 6, 5, 4
// Take item1 (10kg), item2 (20kg), item3 (20/30 of it)
// Total value = 60 + 100 + 80 = 240

// Coin change (greedy - standard coins)
coins = [25,10,5,1], amount = 41
25 → 25, 10 → 35, 5 → 40, 1 → 41 (4 coins)`
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
          "Access modifiers control visibility",
          "static members belong to class, not instances"
        ],
        example: `// Java class
public class BankAccount {
    // Fields (attributes)
    private String owner;
    private double balance;
    private static int count = 0;  // class-level
    
    // Constructor
    public BankAccount(String owner, double initialBalance) {
        this.owner = owner;
        this.balance = initialBalance;
        count++;
    }
    
    // Methods
    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
    
    public boolean withdraw(double amount) {
        if (amount > balance) return false;
        balance -= amount;
        return true;
    }
    
    public double getBalance() { return balance; }
    public static int getCount() { return count; }
}

BankAccount acc = new BankAccount("Alice", 1000);
acc.deposit(500);
System.out.println(acc.getBalance()); // 1500`
      },
      "Encapsulation": {
        explanation: "Encapsulation bundles data (attributes) and methods that operate on the data into a single unit (class), and restricts direct access to internal data (information hiding).",
        details: [
          "Private fields: accessed only within class",
          "Public getters/setters: controlled access",
          "Benefits: data validation, flexibility, security",
          "Follows 'tell, don't ask' principle"
        ],
        example: `// Without encapsulation (bad)
class Person {
    public int age;  // anyone can set age = -5!
}

// With encapsulation (good)
class Person {
    private int age;    // can't directly access
    private String name;
    
    // Getter
    public int getAge() { return age; }
    
    // Setter with validation
    public void setAge(int age) {
        if (age < 0 || age > 150) 
            throw new IllegalArgumentException("Invalid age");
        this.age = age;
    }
    
    public String getName() { return name; }
    public void setName(String name) {
        if (name == null || name.isEmpty())
            throw new IllegalArgumentException("Name cannot be empty");
        this.name = name;
    }
}`
      },
      "Inheritance": {
        explanation: "Inheritance allows a class (child/subclass) to inherit properties and methods from another class (parent/superclass). Promotes code reuse and establishes IS-A relationships.",
        details: [
          "extends keyword in Java; : in C++",
          "Single inheritance (Java classes), Multiple (Java interfaces, C++)",
          "super keyword: access parent class members",
          "Method overriding: child redefines parent method"
        ],
        example: `// Parent class
class Animal {
    protected String name;
    public Animal(String name) { this.name = name; }
    
    public void makeSound() {
        System.out.println(name + " makes a sound");
    }
    
    public void eat() {
        System.out.println(name + " is eating");
    }
}

// Child class (IS-A Animal)
class Dog extends Animal {
    private String breed;
    
    public Dog(String name, String breed) {
        super(name);  // call parent constructor
        this.breed = breed;
    }
    
    @Override
    public void makeSound() {  // override parent method
        System.out.println(name + " says: Woof!");
    }
    
    public void fetch() {  // new method
        System.out.println(name + " fetches the ball");
    }
}

Dog d = new Dog("Rex", "Labrador");
d.makeSound();  // Rex says: Woof! (overridden)
d.eat();        // Rex is eating (inherited)
d.fetch();      // Rex fetches the ball (own)`
      },
      "Polymorphism": {
        explanation: "Polymorphism means 'many forms' — the ability of different objects to respond to the same method call in different ways. Enables writing flexible, extensible code.",
        details: [
          "Compile-time (static): method overloading",
          "Runtime (dynamic): method overriding + reference type",
          "Upcasting: parent reference to child object",
          "Dynamic dispatch: runtime determination of which method to call"
        ],
        example: `// Runtime polymorphism (method overriding)
Animal[] animals = {new Dog("Rex"), new Cat("Whiskers"), new Bird("Tweety")};

for (Animal a : animals) {
    a.makeSound();  // calls the correct version for each object
}
// Rex says: Woof!
// Whiskers says: Meow!
// Tweety says: Tweet!

// Compile-time polymorphism (method overloading)
class Calculator {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
    int add(int a, int b, int c) { return a + b + c; }
    String add(String a, String b) { return a + b; }
}
// Java decides which add() to call based on parameter types
Calculator c = new Calculator();
c.add(1, 2);         // int version
c.add(1.5, 2.5);     // double version
c.add("Hello", " World"); // String version`
      },
      "Abstract Classes": {
        explanation: "An abstract class is a class that cannot be instantiated directly. It may contain abstract methods (no body) that subclasses must implement, as well as concrete methods.",
        details: [
          "abstract keyword in Java",
          "Can have constructors, fields, concrete methods",
          "Cannot instantiate abstract class directly",
          "Used when you want to enforce a contract with partial implementation"
        ],
        example: `abstract class Shape {
    protected String color;
    
    public Shape(String color) { this.color = color; }
    
    // Abstract method - MUST be overridden
    abstract double area();
    abstract double perimeter();
    
    // Concrete method - inherited as-is
    public void displayColor() {
        System.out.println("Color: " + color);
    }
    
    public String describe() {
        return "Shape with area: " + area();
    }
}

class Circle extends Shape {
    private double radius;
    
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    
    @Override
    double area() { return Math.PI * radius * radius; }
    
    @Override
    double perimeter() { return 2 * Math.PI * radius; }
}

// Shape s = new Shape("Red"); // ERROR! Can't instantiate
Shape s = new Circle("Red", 5.0); // OK - polymorphism
System.out.println(s.area()); // 78.54`
      },
      "Interfaces": {
        explanation: "An interface is a contract specifying what a class can do (methods without implementation, in Java 7 and earlier). Classes implement interfaces, promising to provide the implementations.",
        details: [
          "All methods abstract by default (Java 7); Java 8+ allows default and static methods",
          "All fields are public static final",
          "A class can implement multiple interfaces",
          "Enables loose coupling and 'programming to interface'"
        ],
        example: `// Interface definition
interface Printable {
    void print();  // abstract by default
}

interface Serializable {
    byte[] serialize();
    static Object deserialize(byte[] data) { ... }  // Java 8+
    default String toJSON() { return "{}"; }         // Java 8+ default
}

// Class implementing multiple interfaces
class Document implements Printable, Serializable {
    private String content;
    
    @Override
    public void print() {
        System.out.println(content);
    }
    
    @Override
    public byte[] serialize() {
        return content.getBytes();
    }
}

// Interface as type (polymorphism)
Printable p = new Document();
p.print();

// When to use abstract class vs interface?
// Abstract class: shared code, IS-A relationship
// Interface: capability contract, can-do relationship
// Flyable, Serializable, Comparable → interfaces`
      }
    }
  },
  "Computer Networks": {
    icon: "ti-network",
    color: "#533AB7",
    topics: {
      "OSI Model": {
        explanation: "The OSI (Open Systems Interconnection) model is a conceptual framework with 7 layers that standardizes how different network systems communicate. Each layer provides specific services to the layer above it.",
        details: [
          "Layer 7 Application: user interface (HTTP, FTP, SMTP)",
          "Layer 6 Presentation: encryption, compression, encoding",
          "Layer 5 Session: session management, authentication",
          "Layer 4 Transport: end-to-end communication (TCP, UDP)",
          "Layer 3 Network: routing, logical addressing (IP)",
          "Layer 2 Data Link: framing, MAC addressing (Ethernet)",
          "Layer 1 Physical: bits over wire (cables, signals)"
        ],
        example: `// OSI Model mnemonic: "All People Seem To Need Data Processing"
Layer 7: Application  - HTTP, HTTPS, FTP, SMTP, DNS
Layer 6: Presentation - SSL/TLS, JPEG, MP3, ASCII
Layer 5: Session      - NetBIOS, RPC, PPTP
Layer 4: Transport    - TCP, UDP, port numbers
Layer 3: Network      - IP, ICMP, routers
Layer 2: Data Link    - Ethernet, Wi-Fi, switches, MAC addr
Layer 1: Physical     - cables, fiber, radio waves, hubs

// Data encapsulation (sending)
Data → Segment (L4 adds port) → Packet (L3 adds IP)
→ Frame (L2 adds MAC) → Bits (L1 transmits)

// HTTP request journey:
App layer: "GET /index.html HTTP/1.1"
Transport: wraps in TCP segment, adds port 80
Network:   wraps in IP packet, adds source/dest IP
Data Link: wraps in Ethernet frame, adds MAC addresses
Physical:  converts to electrical/light signals`
      },
      "TCP vs UDP": {
        explanation: "TCP (Transmission Control Protocol) provides reliable, ordered, error-checked delivery. UDP (User Datagram Protocol) is faster but unreliable — fire and forget.",
        details: [
          "TCP: connection-oriented (3-way handshake: SYN→SYN-ACK→ACK)",
          "TCP: flow control, congestion control, ordering, retransmission",
          "UDP: connectionless, no guarantee of delivery or order",
          "UDP: lower latency, good for video/audio streaming, gaming, DNS"
        ],
        example: `// TCP 3-way handshake
Client → Server: SYN (seq=x)
Server → Client: SYN-ACK (seq=y, ack=x+1)
Client → Server: ACK (ack=y+1)
// Connection established!

// TCP 4-way teardown
Client → Server: FIN
Server → Client: ACK
Server → Client: FIN
Client → Server: ACK
// Connection closed

// TCP vs UDP use cases
TCP: HTTP/HTTPS, FTP, SSH, email, file transfer
     (correctness matters more than speed)

UDP: DNS queries, VoIP, video streaming, online games
     (speed matters more than occasional packet loss)

// Socket programming
// TCP Server (Java)
ServerSocket ss = new ServerSocket(8080);
Socket client = ss.accept();  // blocks until connection
// UDP
DatagramSocket ds = new DatagramSocket(8080);
byte[] buf = new byte[1024];
DatagramPacket packet = new DatagramPacket(buf, buf.length);
ds.receive(packet);  // receive datagram`
      },
      "IP Address": {
        explanation: "An IP address is a unique numerical label assigned to each device on a network. IPv4 uses 32 bits (4 octets); IPv6 uses 128 bits.",
        details: [
          "IPv4: 192.168.1.1 (32 bits, ~4.3 billion addresses)",
          "IPv6: 2001:0db8:85a3::8a2e:0370:7334 (128 bits)",
          "Classes: A (1-127), B (128-191), C (192-223)",
          "Private ranges: 10.x.x.x, 172.16-31.x.x, 192.168.x.x",
          "Subnet mask: divides IP into network and host parts"
        ],
        example: `// IPv4 structure
192  .  168  .   1   .  100
 8bit   8bit   8bit   8bit  = 32 bits total

// Subnetting example
IP:       192.168.1.0
Mask:     255.255.255.0 = /24
Network:  192.168.1.0
Hosts:    192.168.1.1 to 192.168.1.254 (254 hosts)
Broadcast:192.168.1.255

// /24 means first 24 bits = network part
// 2^(32-24) - 2 = 254 usable hosts

// IPv6 example
Full:     2001:0db8:85a3:0000:0000:8a2e:0370:7334
Compact:  2001:db8:85a3::8a2e:370:7334
// :: replaces consecutive zero groups

// NAT (Network Address Translation)
// Private IP 192.168.1.5 →[NAT Router]→ Public IP 203.0.113.1
// Allows many devices to share one public IP`
      },
      "HTTP/HTTPS": {
        explanation: "HTTP (HyperText Transfer Protocol) is the foundation of data communication on the web. HTTPS adds TLS/SSL encryption for security.",
        details: [
          "HTTP methods: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS",
          "Status codes: 200 OK, 301 Redirect, 400 Bad Request, 404 Not Found, 500 Server Error",
          "Headers: Host, Content-Type, Authorization, Cookie",
          "HTTPS: TLS handshake + certificate verification"
        ],
        example: `// HTTP Request format
GET /api/users/123 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGc...
Accept: application/json

// HTTP Response
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 58

{"id": 123, "name": "Alice", "email": "alice@example.com"}

// Status code categories
1xx: Informational (100 Continue)
2xx: Success (200 OK, 201 Created, 204 No Content)
3xx: Redirection (301 Moved, 302 Found, 304 Not Modified)
4xx: Client Error (400 Bad Request, 401 Unauthorized, 
     403 Forbidden, 404 Not Found, 429 Too Many Requests)
5xx: Server Error (500 Internal Error, 503 Service Unavailable)

// HTTPS TLS handshake
1. Client Hello (cipher suites, TLS version)
2. Server Hello + Certificate
3. Client verifies certificate
4. Key exchange (asymmetric → symmetric)
5. Encrypted communication begins`
      },
      "DNS": {
        explanation: "DNS (Domain Name System) translates human-readable domain names (google.com) to IP addresses (142.250.80.46). The internet's phone book.",
        details: [
          "Hierarchical: root → TLD (.com, .org) → domain → subdomain",
          "Records: A (name→IPv4), AAAA (name→IPv6), CNAME (alias), MX (mail), NS (nameserver)",
          "Caching: reduces lookup time, TTL controls cache duration",
          "Recursive vs iterative resolution"
        ],
        example: `// DNS lookup process for "www.example.com"
1. Check local cache
2. Query recursive resolver (usually ISP)
3. Resolver queries root nameserver → ".com" NS address
4. Resolver queries .com TLD server → "example.com" NS address
5. Resolver queries example.com nameserver → "www" IP
6. Returns 93.184.216.34 to client
7. Cache result for TTL duration

// DNS record types
A     example.com → 93.184.216.34
AAAA  example.com → 2606:2800:220:1:248:1893:25c8:1946
CNAME www.example.com → example.com (alias)
MX    example.com → mail.example.com (email server)
NS    example.com → ns1.example.com (nameserver)
TXT   "v=spf1 include:..." (text record, SPF, DKIM)

// nslookup / dig commands
nslookup google.com
dig google.com A`
      }
    }
  },
  "Programming Fundamentals": {
    icon: "ti-code",
    color: "#072C53",
    topics: {
      "Variables & Data Types": {
        explanation: "Variables are named storage locations in memory. Data types define the kind of data a variable can hold and the operations that can be performed on it.",
        details: [
          "Primitive types: int, float, char, boolean, byte, long, double",
          "Reference types: arrays, objects, strings",
          "Static typing (Java/C++): type checked at compile time",
          "Dynamic typing (Python/JS): type checked at runtime"
        ],
        example: `// Java - statically typed
int age = 25;
double salary = 75000.50;
char grade = 'A';
boolean isActive = true;
String name = "Alice";    // reference type

// Python - dynamically typed
age = 25            # int
salary = 75000.50   # float
name = "Alice"      # str
is_active = True    # bool
items = [1,2,3]     # list

# Type checking
type(age)           # <class 'int'>
isinstance(age, int)  # True

// C++ - statically typed
int x = 10;
auto y = 3.14;      // type inference (double)
const int MAX = 100; // constant

// Type conversion
int n = (int)3.7;   // explicit cast → 3
double d = 5;       // implicit cast (widening) → 5.0`
      },
      "Loops": {
        explanation: "Loops execute a block of code repeatedly. Three main types: for (known iterations), while (condition-based), do-while (executes at least once).",
        details: [
          "break: exit loop immediately",
          "continue: skip current iteration",
          "Nested loops: O(n²) complexity",
          "Infinite loops: when condition never becomes false"
        ],
        example: `// For loop
for (int i = 0; i < 5; i++) {
    System.out.print(i + " ");  // 0 1 2 3 4
}

// While loop
int n = 10;
while (n > 0) {
    System.out.print(n + " ");
    n -= 3;  // 10 7 4 1
}

// Do-while (always runs at least once)
int count = 0;
do {
    count++;
} while (count < 5);

// Enhanced for (for-each)
int[] arr = {1, 2, 3, 4, 5};
for (int x : arr) System.out.print(x + " ");

// Python loops
for i in range(5): print(i)         # 0 1 2 3 4
for item in ["a","b","c"]: print(item)

# List comprehension (Pythonic loop)
squares = [x**2 for x in range(10)]  # [0,1,4,9,16,...]`
      },
      "Recursion": {
        explanation: "Recursion is a programming technique where a function calls itself. Requires a base case to stop and a recursive case that reduces the problem.",
        details: [
          "Call stack: each call creates a new stack frame",
          "Stack overflow: max recursion depth exceeded",
          "Tail recursion optimization: compiler converts to iteration",
          "Types: direct recursion, indirect recursion, tail recursion"
        ],
        example: `// Classic recursion examples
// 1. Factorial
int factorial(int n) {
    if (n <= 1) return 1;           // base case
    return n * factorial(n - 1);    // recursive case
}

// 2. Fibonacci
int fib(int n) {
    if (n <= 1) return n;           // base case
    return fib(n-1) + fib(n-2);    // two recursive calls
}

// 3. Power
double power(double base, int exp) {
    if (exp == 0) return 1;
    if (exp % 2 == 0)
        return power(base * base, exp / 2);  // fast power
    return base * power(base, exp - 1);
}

// 4. Sum of array
int sum(int[] arr, int n) {
    if (n == 0) return 0;
    return arr[n-1] + sum(arr, n-1);
}

// Recursion tree for fib(4):
//        fib(4)
//       /      \\
//    fib(3)   fib(2)
//    /    \\   /    \\
// fib(2) fib(1) fib(1) fib(0)`
      },
      "Exception Handling": {
        explanation: "Exception handling manages runtime errors gracefully, preventing program crashes and providing meaningful error messages or recovery mechanisms.",
        details: [
          "try: code that might throw exception",
          "catch: handles specific exceptions",
          "finally: always executes (cleanup)",
          "throw/throws: explicitly throw exceptions"
        ],
        example: `// Java exception handling
try {
    int[] arr = new int[5];
    arr[10] = 1;  // ArrayIndexOutOfBoundsException!
    int result = 10 / 0;  // ArithmeticException!
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Array error: " + e.getMessage());
} catch (ArithmeticException e) {
    System.out.println("Math error: " + e.getMessage());
} catch (Exception e) {  // catch-all (should be last)
    System.out.println("Error: " + e.getMessage());
} finally {
    System.out.println("This always executes!");
}

// Custom exception
class InsufficientFundsException extends Exception {
    private double amount;
    public InsufficientFundsException(double amount) {
        super("Insufficient funds: need " + amount + " more");
        this.amount = amount;
    }
}

// Python exception handling
try:
    x = int(input("Enter number: "))
    result = 10 / x
except ValueError:
    print("Not a number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
except Exception as e:
    print(f"Error: {e}")
else:
    print(f"Result: {result}")  # runs if no exception
finally:
    print("Done!")`
      },
      "Functions/Methods": {
        explanation: "Functions (or methods in OOP) are reusable blocks of code that perform specific tasks. They accept inputs (parameters) and optionally return outputs.",
        details: [
          "Parameters: variables in function definition",
          "Arguments: values passed when calling function",
          "Return type: type of value returned",
          "Scope: local variables exist only within function"
        ],
        example: `// Java method
public static int add(int a, int b) {
    return a + b;
}
// Return type: int; Parameters: a, b

// Method overloading
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }
String add(String a, String b) { return a + b; }

// Varargs
int sum(int... numbers) {
    int total = 0;
    for (int n : numbers) total += n;
    return total;
}
sum(1, 2, 3, 4, 5);  // any number of args

// Python function
def greet(name, greeting="Hello"):  # default param
    return f"{greeting}, {name}!"

greet("Alice")              # "Hello, Alice!"
greet("Bob", "Hi")          # "Hi, Bob!"
greet(greeting="Hey", name="Carol")  # keyword args

# Lambda (anonymous function)
square = lambda x: x ** 2
double = lambda x: x * 2
print(list(map(square, [1,2,3,4,5])))  # [1,4,9,16,25]`
      }
    }
  },
  "AI / ML / GenAI": {
    icon: "ti-brain",
    color: "#A32D2D",
    topics: {
      "Machine Learning": {
        explanation: "Machine Learning (ML) is a subset of AI where systems learn from data to make predictions or decisions without being explicitly programmed for each task.",
        details: [
          "Supervised: labeled data (classification, regression)",
          "Unsupervised: unlabeled data (clustering, dimensionality reduction)",
          "Reinforcement: learn through rewards and penalties",
          "Training vs test set: 80/20 or 70/30 split typical"
        ],
        example: `# Supervised Learning - Linear Regression
from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([[1],[2],[3],[4],[5]])  # features (house size)
y = np.array([150,250,300,400,500]) # labels (price in $K)

model = LinearRegression()
model.fit(X, y)         # train

prediction = model.predict([[6]])  # predict
print(prediction)  # ~580K

# Classification - Logistic Regression
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_iris

X, y = load_iris(return_X_y=True)
model = LogisticRegression()
model.fit(X[:120], y[:120])       # train on 120 samples
accuracy = model.score(X[120:], y[120:])  # test on rest

# Unsupervised - K-Means Clustering
from sklearn.cluster import KMeans
kmeans = KMeans(n_clusters=3)
kmeans.fit(X)
labels = kmeans.labels_  # which cluster each point belongs to`
      },
      "Neural Networks": {
        explanation: "Neural networks are ML models inspired by the brain. They consist of layers of interconnected nodes (neurons) that learn by adjusting weights through backpropagation.",
        details: [
          "Input layer → Hidden layers → Output layer",
          "Activation functions: ReLU, Sigmoid, Tanh, Softmax",
          "Backpropagation: compute gradients, adjust weights",
          "Gradient descent: optimize weights to minimize loss"
        ],
        example: `# Neural Network with PyTorch
import torch
import torch.nn as nn

class SimpleNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(784, 256),   # input: 28×28 image
            nn.ReLU(),
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Linear(128, 10),    # output: 10 classes (digits)
            nn.Softmax(dim=1)
        )
    
    def forward(self, x):
        return self.network(x)

model = SimpleNN()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
criterion = nn.CrossEntropyLoss()

# Training loop
for epoch in range(100):
    output = model(X_train)
    loss = criterion(output, y_train)
    optimizer.zero_grad()
    loss.backward()      # backpropagation
    optimizer.step()     # update weights`
      },
      "LLMs": {
        explanation: "Large Language Models (LLMs) are transformer-based neural networks trained on massive text corpora to understand and generate human language. Examples: GPT-4, Claude, Gemini.",
        details: [
          "Architecture: transformer with self-attention mechanism",
          "Pre-training: predict next token on large dataset",
          "Fine-tuning: adapt to specific tasks/behavior",
          "RLHF: Reinforcement Learning from Human Feedback"
        ],
        example: `// LLM concepts
Tokenization: "Hello world" → [15496, 995] (token IDs)
Context window: max tokens model can process at once
Temperature: randomness in generation (0=deterministic, 1=creative)
Top-p sampling: sample from top p% probability tokens

// Using OpenAI API
const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Explain recursion simply." }
    ],
    temperature: 0.7,
    max_tokens: 500
});
console.log(response.choices[0].message.content);

// Transformer attention: "The bank on the river bank"
// Attention helps model understand which "bank" means what
// by looking at context ("river" → financial bank? No → riverbank)`
      },
      "Prompt Engineering": {
        explanation: "Prompt engineering is the practice of designing effective inputs for LLMs to get desired, high-quality outputs. It's the art of communicating clearly with AI.",
        details: [
          "Zero-shot: no examples provided",
          "Few-shot: provide 2-5 examples in prompt",
          "Chain-of-thought: ask model to think step-by-step",
          "Role prompting: give the AI a persona/role"
        ],
        example: `// Zero-shot prompting
"Classify the sentiment: 'This movie was amazing!'"
// Output: Positive

// Few-shot prompting
"""
Classify the sentiment:
'Terrible product.' → Negative
'I love it!' → Positive
'Not bad, could be better.' → Neutral
'This is absolutely wonderful!' → 
"""
// Output: Positive (learned from examples)

// Chain-of-thought
"Q: Roger has 5 tennis balls. He buys 2 more cans of 3.
How many does he have?
A: Let me think step by step:
   Roger starts with 5 balls.
   2 cans × 3 balls = 6 new balls.
   5 + 6 = 11 balls total."

// System prompt (role + context)
"You are a senior software engineer reviewing code.
Identify security vulnerabilities, suggest fixes,
and rate severity on scale 1-10."

// Structured output
"Return JSON only:
{'function': ..., 'complexity': ..., 'bugs': []}"`
      },
      "RAG": {
        explanation: "Retrieval-Augmented Generation (RAG) enhances LLMs by retrieving relevant documents from a knowledge base and including them in the prompt context, giving the model up-to-date or domain-specific knowledge.",
        details: [
          "Problem: LLMs have knowledge cutoffs and may hallucinate",
          "Solution: retrieve relevant documents → inject into prompt",
          "Components: Document store, Embedding model, Vector DB, LLM",
          "Enables private knowledge bases without fine-tuning"
        ],
        example: `// RAG pipeline
// 1. INDEXING (done once)
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma

# Load and split documents
docs = load_documents("company_docs/")
chunks = split_into_chunks(docs, chunk_size=500)

# Create embeddings and store
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(chunks, embeddings)

// 2. QUERYING
query = "What is our refund policy?"

# Retrieve relevant chunks
relevant_docs = vectorstore.similarity_search(query, k=3)

# Build augmented prompt
context = "\\n".join([doc.page_content for doc in relevant_docs])
prompt = f"""
Context information:
{context}

Based on the context, answer: {query}
"""

# Generate answer with LLM
answer = llm(prompt)`
      },
      "Hallucinations": {
        explanation: "LLM hallucinations occur when a model generates confident but factually incorrect information. The model 'makes up' plausible-sounding but false content.",
        details: [
          "Factual hallucination: wrong facts presented confidently",
          "Source hallucination: citing non-existent papers/sources",
          "Causes: gaps in training data, overconfident generation",
          "Mitigation: RAG, grounding, factual verification, lower temperature"
        ],
        example: `// Example hallucination
User: "What did Einstein say about quantum computing?"
LLM: "Einstein famously stated 'Quantum computing will 
      revolutionize civilization by 2050' in his 1949 lecture."
// HALLUCINATION: Einstein died in 1955, quantum computing
// was not conceived then. This quote doesn't exist.

// Mitigation strategies
1. RAG: provide actual sources to model
   "Based on these retrieved documents: [...]"

2. Self-consistency: ask multiple times, compare
   "Let me verify this answer..."

3. Citation checking: ask model to cite sources
   "Only answer if you can cite a specific source."

4. Grounding: restrict to provided context only
   "Answer ONLY using the provided document. 
    If not in document, say 'I don't know.'"

5. Temperature=0: more deterministic, less creative`
      }
    }
  },
  "Software Engineering": {
    icon: "ti-settings",
    color: "#5F5E5A",
    topics: {
      "SDLC": {
        explanation: "The Software Development Life Cycle (SDLC) is a structured process for planning, creating, testing, and deploying software. It provides a framework for managing the entire development lifecycle.",
        details: [
          "Phases: Planning, Requirements, Design, Implementation, Testing, Deployment, Maintenance",
          "Models: Waterfall, Agile, Spiral, V-Model, RAD",
          "Goal: deliver high-quality software on time and within budget"
        ],
        example: `// SDLC phases
1. PLANNING
   - Feasibility study
   - Project timeline and budget
   - Resource allocation

2. REQUIREMENTS ANALYSIS
   - Functional requirements (what system does)
   - Non-functional requirements (performance, security)
   - SRS (Software Requirements Specification) document

3. SYSTEM DESIGN
   - High-level design (HLD): architecture, tech stack
   - Low-level design (LLD): database schema, class diagrams

4. IMPLEMENTATION (Coding)
   - Development per design documents
   - Code reviews, version control

5. TESTING
   - Unit, Integration, System, UAT testing
   - Bug fixes

6. DEPLOYMENT
   - Release to production
   - User training

7. MAINTENANCE
   - Bug fixes, updates, enhancements`
      },
      "Agile/Scrum": {
        explanation: "Agile is an iterative software development methodology. Scrum is a popular Agile framework using short sprints (1-4 weeks) to deliver working software incrementally.",
        details: [
          "Scrum roles: Product Owner, Scrum Master, Development Team",
          "Artifacts: Product Backlog, Sprint Backlog, Increment",
          "Ceremonies: Sprint Planning, Daily Standup, Sprint Review, Retrospective",
          "Values: Individuals, Working software, Customer collaboration, Responding to change"
        ],
        example: `// Scrum Sprint cycle
Sprint (2 weeks):
┌─ Sprint Planning ─────────────────────────────┐
│  - PO presents backlog                         │
│  - Team selects items for sprint               │
│  - Break into tasks (story points)             │
└────────────────────────────────────────────────┘
         ↓ (every day)
┌─ Daily Standup (15 min) ──────────────────────┐
│  - What did I do yesterday?                    │
│  - What will I do today?                       │
│  - Any blockers?                               │
└────────────────────────────────────────────────┘
         ↓ (end of sprint)
┌─ Sprint Review ────────────────────────────────┐
│  - Demo working software to stakeholders       │
└────────────────────────────────────────────────┘
┌─ Sprint Retrospective ─────────────────────────┐
│  - What went well?                             │
│  - What to improve?                            │
└────────────────────────────────────────────────┘

// User Story format
"As a [user], I want [feature] so that [benefit]"
Example: "As a customer, I want to filter products by 
          price so that I can find affordable items."`
      },
      "Git": {
        explanation: "Git is a distributed version control system that tracks changes in code, enables collaboration, and allows reverting to previous versions.",
        details: [
          "Repository: project folder tracked by git",
          "Commit: snapshot of changes",
          "Branch: independent line of development",
          "Merge: combine branches; Rebase: replay commits"
        ],
        example: `// Git workflow
git init                    # initialize repository
git clone <url>             # clone remote repo

git status                  # check changes
git add file.js             # stage specific file
git add .                   # stage all changes
git commit -m "Add login"   # commit with message

git branch feature/login    # create branch
git checkout feature/login  # switch to branch
git checkout -b feature/signup  # create and switch

git push origin main        # push to remote
git pull origin main        # pull latest changes

git merge feature/login     # merge branch into current
git rebase main             # rebase onto main

// Common workflow
git log --oneline           # view commit history
git diff                    # see unstaged changes
git stash                   # temporarily save changes
git stash pop               # restore stashed changes
git reset --soft HEAD~1     # undo last commit (keep changes)
git reset --hard HEAD~1     # undo last commit (discard changes)
git cherry-pick <hash>      # apply specific commit`
      }
    }
  },
  "Cybersecurity": {
    icon: "ti-shield",
    color: "#3C3489",
    topics: {
      "Encryption": {
        explanation: "Encryption converts readable data (plaintext) into an unreadable format (ciphertext) using an algorithm and key. Only authorized parties with the correct key can decrypt it.",
        details: [
          "Symmetric: same key for encrypt/decrypt (AES, DES) — fast",
          "Asymmetric: public key encrypts, private key decrypts (RSA, ECC) — slow but key exchange solved",
          "Key length: longer = more secure (AES-256 is current standard)",
          "TLS uses asymmetric to exchange symmetric key, then symmetric for speed"
        ],
        example: `// Symmetric encryption (AES-256)
// Same key used for both encrypt and decrypt
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes

key = get_random_bytes(32)    # 256-bit key
cipher = AES.new(key, AES.MODE_GCM)
ciphertext, tag = cipher.encrypt_and_digest(b"Secret message")

# Decrypt
cipher = AES.new(key, cipher.nonce, AES.MODE_GCM)
plaintext = cipher.decrypt_and_verify(ciphertext, tag)

// Asymmetric encryption (RSA)
// Alice sends Bob a message:
// 1. Alice gets Bob's PUBLIC key (shared openly)
// 2. Alice encrypts message with Bob's public key
// 3. Only Bob can decrypt with his PRIVATE key

from cryptography.hazmat.primitives.asymmetric import rsa, padding
private_key = rsa.generate_private_key(65537, 2048)
public_key = private_key.public_key()

# Encrypt
ciphertext = public_key.encrypt(b"Hello Bob", padding.OAEP(...))
# Decrypt
plaintext = private_key.decrypt(ciphertext, padding.OAEP(...))`
      },
      "Hashing": {
        explanation: "Hashing converts input data into a fixed-size string (hash/digest) using a one-way function. The same input always produces the same hash, but you can't reverse a hash to get the input.",
        details: [
          "One-way function: hash → original data is computationally infeasible",
          "Deterministic: same input → same hash always",
          "Avalanche effect: small input change → completely different hash",
          "Algorithms: MD5 (broken), SHA-1 (deprecated), SHA-256, SHA-3, bcrypt (passwords)"
        ],
        example: `// Python hashing
import hashlib

# SHA-256
data = "password123"
hash = hashlib.sha256(data.encode()).hexdigest()
# "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f"

# Same input → same hash (deterministic)
hashlib.sha256(b"password123").hexdigest() == hash  # True

# Different input → completely different hash
hashlib.sha256(b"password124").hexdigest()
# "5e8a36c9..." (completely different!)

# Password hashing (use bcrypt, not SHA-256!)
import bcrypt
password = b"mypassword"
salt = bcrypt.gensalt()
hashed = bcrypt.hashpw(password, salt)
# "$2b$12$randomsalthere...hashedpassword..."

# Verify (timing-safe)
bcrypt.checkpw(b"mypassword", hashed)    # True
bcrypt.checkpw(b"wrongpassword", hashed) # False

# Why bcrypt? It's slow by design (resists brute force)
# SHA-256: billions/sec; bcrypt: ~100/sec`
      }
    }
  },
  "Cloud & DevOps": {
    icon: "ti-cloud",
    color: "#185FA5",
    topics: {
      "Docker": {
        explanation: "Docker is a platform for building, packaging, and running applications in containers — lightweight, portable environments that include everything needed to run the application.",
        details: [
          "Container: running instance of an image",
          "Image: read-only template (built from Dockerfile)",
          "Dockerfile: instructions to build an image",
          "Docker Hub: public registry for images"
        ],
        example: `# Dockerfile example
FROM python:3.11-slim              # base image

WORKDIR /app                        # set working directory
COPY requirements.txt .             # copy dependency file
RUN pip install -r requirements.txt # install deps
COPY . .                            # copy source code
EXPOSE 8000                         # document port
CMD ["python", "app.py"]            # start command

# Build and run
docker build -t myapp:latest .
docker run -p 8080:8000 myapp:latest
# localhost:8080 maps to container's 8000

# Common Docker commands
docker ps                   # list running containers
docker ps -a                # list all containers
docker images               # list images
docker pull nginx           # pull image from registry
docker exec -it <id> bash   # enter running container
docker logs <id>            # view container logs
docker stop <id>            # stop container
docker rm <id>              # remove container
docker rmi <image>          # remove image

# docker-compose.yml
version: '3'
services:
  web:
    build: .
    ports: ["8000:8000"]
  db:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: secret`
      },
      "CI/CD": {
        explanation: "CI/CD (Continuous Integration/Continuous Deployment) automates the process of integrating code changes, running tests, and deploying to production.",
        details: [
          "CI: automatically build and test on every commit",
          "CD: automatically deploy to staging/production after tests pass",
          "Tools: GitHub Actions, Jenkins, GitLab CI, CircleCI",
          "Benefits: faster releases, catch bugs early, consistent deployments"
        ],
        example: `# GitHub Actions CI/CD pipeline (.github/workflows/main.yml)
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: pip install -r requirements.txt
      - name: Run tests
        run: pytest tests/
  
  deploy:
    needs: test  # only deploy if tests pass
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to production
        run: |
          docker build -t app:latest .
          docker push registry/app:latest
          kubectl rollout restart deployment/app`
      }
    }
  },
  "Java": {
    icon: "ti-coffee",
    color: "#D85A30",
    topics: {
      "Collections Framework": {
        explanation: "Java Collections Framework provides a unified architecture for storing and manipulating groups of objects. Key interfaces: List, Set, Map, Queue.",
        details: [
          "List: ordered, allows duplicates (ArrayList, LinkedList)",
          "Set: no duplicates (HashSet, TreeSet, LinkedHashSet)",
          "Map: key-value pairs (HashMap, TreeMap, LinkedHashMap)",
          "Queue: FIFO (LinkedList, PriorityQueue, ArrayDeque)"
        ],
        example: `// ArrayList - dynamic array
ArrayList<String> list = new ArrayList<>();
list.add("Apple"); list.add("Banana"); list.add("Apple");
list.get(0);           // "Apple"
list.size();           // 3
list.remove("Banana"); // by value
list.contains("Apple");// true
Collections.sort(list); // sort

// HashMap - key-value store
HashMap<String, Integer> map = new HashMap<>();
map.put("Alice", 90);
map.put("Bob", 85);
map.getOrDefault("Carol", 0);  // 0 if key missing
map.containsKey("Alice");      // true
for (Map.Entry<String,Integer> e : map.entrySet())
    System.out.println(e.getKey() + ": " + e.getValue());

// HashSet - no duplicates
HashSet<Integer> set = new HashSet<>(Arrays.asList(1,2,3,2,1));
// set = {1, 2, 3} (duplicates removed)

// Choose the right collection
// Fast access by index? → ArrayList
// Fast insert/delete in middle? → LinkedList
// No duplicates? → HashSet
// Sorted order? → TreeSet or TreeMap
// Key-value, fast lookup? → HashMap`
      },
      "Multithreading in Java": {
        explanation: "Java provides built-in support for multithreading. Threads can be created by extending Thread class or implementing Runnable interface.",
        details: [
          "Thread states: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED",
          "synchronized: ensures only one thread executes block at a time",
          "volatile: ensures variable is read from main memory, not cache",
          "ExecutorService: thread pool for managing multiple threads"
        ],
        example: `// Thread creation
// Method 1: extend Thread
class MyTask extends Thread {
    public void run() {
        System.out.println(Thread.currentThread().getName());
    }
}
new MyTask().start();

// Method 2: implement Runnable (preferred)
Runnable task = () -> System.out.println("Task running");
Thread t = new Thread(task);
t.start();

// Synchronized method
class Counter {
    private int count = 0;
    public synchronized void increment() { count++; }
    public synchronized int getCount() { return count; }
}

// ExecutorService (thread pool)
ExecutorService executor = Executors.newFixedThreadPool(4);
for (int i = 0; i < 10; i++) {
    final int taskId = i;
    executor.submit(() -> System.out.println("Task " + taskId));
}
executor.shutdown();

// Future (async result)
Future<Integer> future = executor.submit(() -> {
    Thread.sleep(1000);
    return 42;
});
int result = future.get(); // blocks until done`
      }
    }
  },
  "Python": {
    icon: "ti-brand-python",
    color: "#3B6D11",
    topics: {
      "Python OOP": {
        explanation: "Python supports OOP with classes, inheritance, and polymorphism. It uses dynamic typing and has special methods (dunder/magic methods) for operator overloading.",
        details: [
          "__init__: constructor",
          "__str__: string representation",
          "__repr__: developer representation",
          "super(): call parent class method",
          "Multiple inheritance supported"
        ],
        example: `class Animal:
    species = "Unknown"  # class variable
    
    def __init__(self, name, age):
        self.name = name        # instance variable
        self.age = age
    
    def speak(self):
        raise NotImplementedError  # abstract-like
    
    def __str__(self):
        return f"{self.name} ({self.age} yrs)"
    
    def __repr__(self):
        return f"Animal(name='{self.name}', age={self.age})"
    
    def __eq__(self, other):
        return self.name == other.name

class Dog(Animal):
    def __init__(self, name, age, breed):
        super().__init__(name, age)  # call parent
        self.breed = breed
    
    def speak(self):
        return f"{self.name} says: Woof!"
    
    @classmethod
    def from_string(cls, s):  # alternate constructor
        name, age, breed = s.split(',')
        return cls(name, int(age), breed)

# Dunder methods for operator overloading
class Vector:
    def __init__(self, x, y): self.x, self.y = x, y
    def __add__(self, other): return Vector(self.x+other.x, self.y+other.y)
    def __len__(self): return int((self.x**2+self.y**2)**0.5)
    def __str__(self): return f"({self.x}, {self.y})"`
      },
      "Dictionaries & Lists": {
        explanation: "Python's built-in data structures. Lists are ordered, mutable sequences. Dictionaries are mutable key-value mappings (hash tables).",
        details: [
          "List: [], append, extend, insert, remove, pop, slice",
          "Dict: {}, get, update, keys, values, items",
          "List comprehension: [expr for x in iterable if cond]",
          "Dict comprehension: {k:v for k,v in pairs}"
        ],
        example: `# List operations
nums = [1, 2, 3, 4, 5]
nums.append(6)           # [1,2,3,4,5,6]
nums.insert(0, 0)        # [0,1,2,3,4,5,6]
nums.pop()               # removes and returns 6
nums.remove(3)           # removes first 3
nums[1:3]                # slice: [1,2]
nums[::-1]               # reverse: [5,4,3,2,1,0]
sorted(nums)             # sorted copy
nums.sort(reverse=True)  # sort in place

# Dictionary operations
student = {"name": "Alice", "age": 20, "gpa": 3.8}
student["major"] = "CS"          # add key
student.get("phone", "N/A")      # "N/A" if missing
student.update({"age": 21})      # update values
"name" in student                # True
del student["gpa"]               # remove key

# List comprehension (Pythonic)
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
matrix = [[i*j for j in range(5)] for i in range(5)]

# Dict comprehension
word_len = {word: len(word) for word in ["apple","banana","fig"]}
# {'apple': 5, 'banana': 6, 'fig': 3}`
      }
    }
  }
};

const allTopics = Object.entries(notes).flatMap(([section, data]) =>
  Object.keys(data.topics).map(topic => ({ section, topic }))
);

export default function CSNotes() {
  const [activeSection, setActiveSection] = useState(Object.keys(notes)[0]);
  const [activeTopic, setActiveTopic] = useState(Object.keys(notes[Object.keys(notes)[0]].topics)[0]);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return allTopics.filter(({ topic, section }) =>
      topic.toLowerCase().includes(q) || section.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [search]);

  const currentNote = notes[activeSection]?.topics[activeTopic];

  const selectTopic = (section, topic) => {
    setActiveSection(section);
    setActiveTopic(topic);
    setSearch("");
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "var(--font-sans)", background: "#ffffff", overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? 260 : 0,
        minWidth: sidebarOpen ? 260 : 0,
        transition: "all 0.2s",
        overflow: "hidden",
        background: "#ffffff",
        borderRight: "0.5px solid #e0e0e0",
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={{ padding: "16px 12px 8px", borderBottom: "0.5px solid #e0e0e0" }}>
          <div style={{ fontWeight: 500, fontSize: 15, color: "#000000", marginBottom: 8 }}>
            <i className="ti ti-book-2" style={{ marginRight: 6, color: "#333333" }} aria-hidden="true" />
            CS Notes
          </div>
          <input
            type="text"
            placeholder="Search topics..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: "100%", fontSize: 13, boxSizing: "border-box", color: "#000000", background: "#fff" }}
          />
          {searchResults.length > 0 && (
            <div style={{ marginTop: 6, maxHeight: 200, overflowY: "auto", background: "#ffffff", borderRadius: 8, border: "0.5px solid #e0e0e0" }}>
              {searchResults.map(({ section, topic }) => (
                <div key={`${section}:${topic}`}
                  onClick={() => selectTopic(section, topic)}
                  style={{ padding: "8px 10px", cursor: "pointer", fontSize: 12, borderBottom: "0.5px solid #e0e0e0" }}>
                  <div style={{ fontWeight: 500, color: "#000000" }}>{topic}</div>
                  <div style={{ color: "#666666", fontSize: 11 }}>{section}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ overflowY: "auto", flex: 1 }}>
          {Object.entries(notes).map(([section, data]) => (
            <div key={section}>
              <div style={{
                padding: "10px 12px 4px",
                fontSize: 11,
                fontWeight: 500,
                color: "#555555",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                display: "flex",
                alignItems: "center",
                gap: 6
              }}>
                <i className={`ti ${data.icon}`} style={{ fontSize: 13, color: data.color, color: "#333333" }} aria-hidden="true" />
                {section}
              </div>
              {Object.keys(data.topics).map(topic => (
                <div key={topic}
                  onClick={() => selectTopic(section, topic)}
                  style={{
                    padding: "6px 12px 6px 28px",
                    cursor: "pointer",
                    fontSize: 13,
                    color: activeSection === section && activeTopic === topic ? "#000000" : "#666666",
                    background: activeSection === section && activeTopic === topic ? "#f0f0f0" : "transparent",
                    borderLeft: activeSection === section && activeTopic === topic ? `3px solid ${data.color}` : "3px solid transparent",
                    fontWeight: activeSection === section && activeTopic === topic ? 500 : 400
                  }}>
                  {topic}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <div style={{
          padding: "12px 20px",
          background: "#ffffff",
          borderBottom: "0.5px solid #e0e0e0",
          display: "flex",
          alignItems: "center",
          gap: 12,
          position: "sticky",
          top: 0,
          zIndex: 10
        }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#666666" }}>
            <i className="ti ti-menu-2" style={{ fontSize: 18, color: "#333333" }} aria-hidden="true" />
          </button>
          <span style={{ fontSize: 13, color: "#666666" }}>{activeSection}</span>
          <i className="ti ti-chevron-right" style={{ fontSize: 12, color: "#999999" }} aria-hidden="true" />
          <span style={{ fontSize: 13, fontWeight: 500, color: "#000000" }}>{activeTopic}</span>
        </div>

        {/* Note content */}
        {currentNote && (
          <div style={{ padding: "24px 32px", maxWidth: 860 }}>
            {/* Header */}
            <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "#f5f5f5",
                padding: "4px 12px",
                borderRadius: 100,
                fontSize: 12,
                color: "#666666",
                marginBottom: 12
              }}>
                <i className={`ti ${notes[activeSection].icon}`} style={{ color: notes[activeSection].color, fontSize: 13, color: "#333333" }} aria-hidden="true" />
                {activeSection}
              </div>
              <h1 style={{ margin: 0, fontSize: 26, fontWeight: 500, color: "#000000", marginBottom: 12 }}>
                {activeTopic}
              </h1>
              <p style={{ margin: 0, fontSize: 15, color: "#555555", lineHeight: 1.7 }}>
                {currentNote.explanation}
              </p>

            {/* Key Points */}
            {currentNote.details && (
              <div style={{
                background: "#f5f5f5",
                borderRadius: 10,
                padding: "16px 20px",
                marginBottom: 20,
                borderLeft: `3px solid ${notes[activeSection].color}`
              }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: "#666666", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Key Points
                </div>
                {currentNote.details.map((d, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 13, color: "#000000", lineHeight: 1.6 }}>
                    <span style={{ color: notes[activeSection].color, fontWeight: 500, minWidth: 16 }}>•</span>
                    {d}
                  </div>
                ))}
              </div>
            )}

            {/* Code Example */}
            {currentNote.example && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: "#666666", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Syntax & Examples
                </div>
                <div style={{
                  background: "#f5f5f5",
                  borderRadius: 10,
                  padding: "20px 24px",
                  overflowX: "auto"
                }}>
                  <pre style={{
                    margin: 0,
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: "#000000",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word"
                  }}>
                    {currentNote.example}
                  </pre>
                </div>
              </div>
            )}

            {/* Navigation between topics */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, paddingTop: 20, borderTop: "0.5px solid #e0e0e0" }}>
              {(() => {
                const topics = Object.keys(notes[activeSection].topics);
                const idx = topics.indexOf(activeTopic);
                const prev = idx > 0 ? topics[idx - 1] : null;
                const next = idx < topics.length - 1 ? topics[idx + 1] : null;
                return <>
                  {prev ? (
                    <button onClick={() => setActiveTopic(prev)} style={{ fontSize: 13, color: "#666666", cursor: "pointer" }}>
                      <i className="ti ti-arrow-left" style={{ marginRight: 4 }} aria-hidden="true" />
                      {prev}
                    </button>
                  ) : <span />}
                  {next ? (
                    <button onClick={() => setActiveTopic(next)} style={{ fontSize: 13, color: "#666666", cursor: "pointer" }}>
                      {next}
                      <i className="ti ti-arrow-right" style={{ marginLeft: 4 }} aria-hidden="true" />
                    </button>
                  ) : <span />}
                </>;
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
