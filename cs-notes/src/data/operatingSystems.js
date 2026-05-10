const operatingSystemsData = {
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
  }
};

export default operatingSystemsData;
