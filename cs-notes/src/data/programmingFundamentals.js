const programmingFundamentalsData = {
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
  }
};

export default programmingFundamentalsData;
