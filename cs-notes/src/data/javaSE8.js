const javaSE8Data = {
  "Java SE 8 (OCA + OCP)": {
    icon: "ti-coffee",
    color: "#D85A30",
    topics: {
      "Java Basics & Class Structure": {
        explanation: "Java programs are built from classes. Every Java program must have a class, and execution begins with the main() method. The JVM compiles .java files to .class bytecode, which runs on any platform — 'Write Once, Run Anywhere'.",
        details: [
          "File rule: public class name must match filename (Animal.java → public class Animal)",
          "A file can contain multiple classes but only one public class",
          "main() signature: public static void main(String[] args) — also accepts String[] or String...",
          "java.lang package is automatically imported (System, String, Object, Math, etc.)",
          "Compile: javac Zoo.java → Run: java Zoo (omit .class extension)",
          "Package naming: reverse domain convention (com.amazon.app), child packages separated by dots",
          "Wildcard import: import java.util.*; — imports classes only, not sub-packages or static members"
        ],
        example: `// Minimal valid Java program
public class Zoo {
    public static void main(String[] args) {
        System.out.println("Welcome to the Zoo!");
    }
}

// Multiple classes in one file (only one public)
class Animal { String name; }
public class Zoo { /* must be in Zoo.java */ }

// Import examples
import java.util.ArrayList;       // specific import
import java.util.*;               // wildcard (imports all classes)
import static java.lang.Math.PI;  // static import — access PI directly

// Redundant imports (java.lang auto-imported)
import java.lang.System;  // redundant
import java.lang.*;       // redundant

// Command-line arguments
// java Zoo Bronx "San Diego"
// args[0] = "Bronx", args[1] = "San Diego"
// All args are Strings even if they look like numbers`
      },
      "Primitive Types & Variables": {
        explanation: "Java has 8 primitive types for storing raw values. Reference types point to objects on the heap. Variables must be declared before use, and local variables must be explicitly initialized before reading.",
        details: [
          "byte (8-bit, -128 to 127), short (16-bit), int (32-bit), long (64-bit, suffix L)",
          "float (32-bit, suffix f), double (64-bit, default for decimals)",
          "char (16-bit Unicode, single quotes 'A'), boolean (true/false only)",
          "Numeric promotion: byte/short/char → int in arithmetic; int + long → long; int/long + float/double → double",
          "Local variables: no default value — must initialize before use (compiler error if not)",
          "Instance/static variables: get default values (0, 0.0, false, null, '\\u0000')",
          "Identifier rules: start with letter, $, or _; cannot start with digit; cannot use reserved words"
        ],
        example: `// Primitive declarations
byte   b  = 127;
short  s  = 32767;
int    i  = 2_000_000;   // underscores allowed (Java 7+)
long   l  = 100L;        // L suffix required for long literals
float  f  = 3.14f;       // f suffix required
double d  = 3.14159;     // default decimal type
char   c  = 'A';         // single quotes
boolean ok = true;

// Reference type (null is valid default)
String str = null;
String greeting = "Hello";   // String literal from pool

// Numeric promotion gotchas
byte x = 1; byte y = 2;
// byte z = x + y;  // DOES NOT COMPILE — result is int!
byte z = (byte)(x + y);  // explicit cast required

// Cast (narrowing — may lose data)
double pi = 3.14159;
int truncated = (int) pi;  // 3 (truncates decimal)

// Widening (automatic)
int num = 100;
double wider = num;  // 100.0 — implicit widening

// Default values (instance variables)
// int    → 0
// double → 0.0
// boolean→ false
// char   → '\u0000'
// Object → null`
      },
      "Operators & Statements": {
        explanation: "Java operators follow strict precedence rules. The switch statement works with byte, short, int, char, String, and enum. Loops come in four forms: for, enhanced-for, while, and do-while.",
        details: [
          "Operator precedence (high→low): post++/--, pre++/--, unary -/!, cast, */%,  +-, <<>>, <><= instanceof, ==!=, &, ^, |, &&, ||, ?:, =",
          "Compound assignment (+=, -=, *=, /=) include implicit cast — e.g., x += 1.5 on int x is valid",
          "switch works with: byte, short, int, char, String, enum (NOT long, float, double, boolean)",
          "switch case values must be compile-time constants (literals or final variables)",
          "break in switch prevents fall-through; without break, execution continues into next case",
          "Labels on loops allow break/continue to target an outer loop",
          "do-while guarantees the body executes at least once"
        ],
        example: `// Switch statement
int day = 3;
switch (day) {
    case 1: System.out.println("Mon"); break;
    case 2: System.out.println("Tue"); break;
    case 3:
    case 4: System.out.println("Wed or Thu"); break;  // fall-through
    default: System.out.println("Other");
}

// Switch with String (Java 7+)
String season = "SPRING";
switch (season) {
    case "SPRING": case "SUMMER": System.out.println("Warm"); break;
    case "FALL":   case "WINTER": System.out.println("Cold"); break;
}

// Compound assignment with implicit cast
byte b = 5;
b += 2;    // OK — equivalent to b = (byte)(b + 2)
// b = b + 2; // DOES NOT COMPILE — b+2 is int, needs cast

// Labeled loop
outer:
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (j == 1) continue outer;  // skip to next outer iteration
        if (i == 2) break outer;     // exit both loops
        System.out.println(i + "," + j);
    }
}

// Ternary operator
int x = 5;
String result = (x > 3) ? "big" : "small";  // "big"`
      },
      "String & StringBuilder": {
        explanation: "Strings are immutable objects from the String pool. StringBuilder is mutable and more efficient for concatenation. Key distinction: == checks reference equality; .equals() checks value equality.",
        details: [
          "Strings are immutable — any 'modification' creates a new String object",
          "String pool: literals are cached; 'new String()' always creates a new heap object",
          "== on String checks reference (same object); .equals() checks character sequence",
          "StringBuilder is mutable, not thread-safe; StringBuffer is thread-safe (slower)",
          "String methods return new Strings: substring(), replace(), toLowerCase(), toUpperCase(), trim()",
          "StringBuilder key methods modify in place and return 'this': append(), insert(), delete(), reverse(), replace()",
          "charAt(i) — both; length() — both; indexOf(str) — both; substring(s,e) — both"
        ],
        example: `// String immutability
String s = "hello";
s.toUpperCase();       // creates new String — s still "hello"!
s = s.toUpperCase();   // must reassign to use result → "HELLO"

// String pool
String a = "Java";
String b = "Java";
String c = new String("Java");
System.out.println(a == b);       // true  (same pool object)
System.out.println(a == c);       // false (c is new heap object)
System.out.println(a.equals(c));  // true  (same characters)

// Key String methods
"Hello World".length()          // 11
"Hello World".charAt(4)         // 'o'
"Hello World".indexOf("World")  // 6
"Hello World".substring(6)      // "World"
"Hello World".substring(0, 5)   // "Hello"
"  hi  ".trim()                 // "hi"
"hello".toUpperCase()           // "HELLO"
"Hello".replace('l', 'r')       // "Herro"
"hello world".contains("world") // true
"abc".startsWith("ab")          // true

// StringBuilder (mutable, fluent API)
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");    // "Hello World"
sb.insert(5, ",");      // "Hello, World"
sb.delete(5, 6);        // "Hello World"
sb.reverse();           // "dlroW olleH"
sb.replace(0, 5, "Bye");// "Bye World"   (after reversal undone)
sb.deleteCharAt(0);     // removes char at index 0
System.out.println(sb.length());
System.out.println(sb.toString());

// StringBuilder == checks reference, NOT content
StringBuilder sb1 = new StringBuilder("hi");
StringBuilder sb2 = new StringBuilder("hi");
System.out.println(sb1.equals(sb2));  // false! (Object.equals)`
      },
      "Arrays & ArrayList": {
        explanation: "Arrays are fixed-size, zero-indexed data structures. ArrayList is a resizable List backed by an array. Java 5+ autoboxing converts between primitives and wrapper types automatically.",
        details: [
          "Array declaration: int[] arr or int arr[] — both valid; int[] arr preferred",
          "Arrays are objects — default values apply (0, false, null) when created with new",
          "Arrays.sort() sorts in-place; Arrays.binarySearch() requires sorted array",
          "Multi-dimensional: int[][] matrix = new int[3][4]; access: matrix[row][col]",
          "ArrayList is generic: ArrayList<String>; add(), remove(), get(), set(), size(), contains()",
          "Autoboxing: int → Integer (box); Integer → int (unbox); happens automatically",
          "ArrayList.remove(int index) vs remove(Object o) — careful with Integer!"
        ],
        example: `// Array creation
int[] nums = new int[5];         // [0,0,0,0,0]
String[] names = {"Alice","Bob"}; // array initializer
int[][] matrix = {{1,2},{3,4}};

// Array operations
System.out.println(nums.length);   // 5 (field, not method!)
Arrays.sort(nums);
int idx = Arrays.binarySearch(nums, 3);  // must be sorted first
int[] copy = Arrays.copyOf(nums, 3);     // [0,0,0]
System.out.println(Arrays.toString(nums));

// Varargs (variable arguments) — treated as array
void printAll(String... args) {
    for (String s : args) System.out.println(s);
}
printAll("a", "b", "c");  // or pass String[]

// ArrayList<E>
ArrayList<String> list = new ArrayList<>();
list.add("Alice");
list.add(0, "Zara");          // insert at index
list.set(1, "Bob");           // replace
list.remove("Alice");          // remove by value
list.remove(0);                // remove by index
list.get(0);                   // "Bob"
list.size();                   // 1
list.contains("Bob");          // true

// Autoboxing
ArrayList<Integer> nums2 = new ArrayList<>();
nums2.add(5);           // autoboxed: 5 → Integer.valueOf(5)
int val = nums2.get(0); // unboxed: Integer → int

// Converting between array and List
String[] arr = {"a","b","c"};
List<String> fromArr = Arrays.asList(arr);  // fixed size!
List<String> mutable = new ArrayList<>(Arrays.asList(arr));

// Sort ArrayList
Collections.sort(list);
Collections.sort(list, Comparator.reverseOrder());`
      },
      "Methods & Encapsulation": {
        explanation: "Methods define behavior. Encapsulation protects data with private fields and public getters/setters. Java is pass-by-value — primitives copy the value; references copy the pointer.",
        details: [
          "Method signature: [access] [static] returnType name(params) [throws Exception]",
          "Overloading: same method name, different parameter list (type, number, or order)",
          "Pass-by-value: primitives — caller's variable unchanged; references — object's state can change but reassigning param doesn't affect caller",
          "Varargs (String... args) must be last parameter; only one varargs per method",
          "Static members belong to class, accessed via ClassName.member (not via instance)",
          "Static initializer blocks run once when class is loaded, before any constructor",
          "final field: must be set in declaration or constructor; cannot change after"
        ],
        example: `// Method overloading
int add(int a, int b)       { return a + b; }
double add(double a, double b) { return a + b; }
int add(int a, int b, int c) { return a + b + c; }

// Pass-by-value demonstration
void change(int x) { x = 99; }         // caller's int unchanged
void change(StringBuilder sb) {
    sb.append("!!");                    // modifies original object
    sb = new StringBuilder("new");     // does NOT affect caller
}

// Static members
class Counter {
    private static int count = 0;        // shared across instances
    static { count = 10; }              // static initializer
    public Counter() { count++; }
    public static int getCount() { return count; }
}
Counter.getCount();   // access via class name

// Encapsulation with validation
class BankAccount {
    private double balance;  // private field

    public double getBalance() { return balance; }

    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Must be positive");
        balance += amount;
    }
}

// final field
class Circle {
    private final double radius;   // must be set in constructor
    Circle(double r) { this.radius = r; }
    // radius = 5; // compile error after construction
}

// Varargs
void log(String message, Object... args) {
    System.out.printf(message, args);
}
log("Hello %s, you are %d", "Alice", 30);`
      },
      "Class Design & Inheritance": {
        explanation: "Java supports single class inheritance with extends. Subclasses inherit non-private members. Constructors are not inherited but can be chained with super(). The first line of any constructor must be this() or super().",
        details: [
          "extends for classes (single), implements for interfaces (multiple)",
          "super() must be first statement in constructor; Java inserts super() if omitted",
          "Method overriding requires same signature + return type (or covariant return)",
          "@Override annotation verifies you are overriding (compile-time check)",
          "Hiding: static methods with same signature create a 'hidden' method, not override",
          "final class: cannot be subclassed; final method: cannot be overridden",
          "instanceof: checks if object is instance of type, returns boolean"
        ],
        example: `class Animal {
    protected String name;
    Animal(String name) { this.name = name; }

    String speak() { return "..."; }
    static String type() { return "Animal"; }
}

class Dog extends Animal {
    private String breed;

    Dog(String name, String breed) {
        super(name);        // MUST be first line — calls Animal constructor
        this.breed = breed;
    }

    @Override
    String speak() { return "Woof!"; }         // overrides

    static String type() { return "Dog"; }     // HIDES (not overrides)
}

// Polymorphism
Animal a = new Dog("Rex", "Lab");
System.out.println(a.speak());    // "Woof!" — dynamic dispatch
System.out.println(a.type());     // "Animal" — static method uses reference type!

// instanceof
if (a instanceof Dog) {
    Dog d = (Dog) a;              // safe cast after instanceof check
    System.out.println(d.breed);
}

// Constructor chaining with this()
class Person {
    String name; int age;
    Person() { this("Unknown", 0); }         // calls other constructor
    Person(String name, int age) {
        this.name = name; this.age = age;
    }
}

// Object class methods (all classes inherit)
// toString(), equals(), hashCode(), getClass(), clone(), finalize()`
      },
      "Abstract Classes & Interfaces": {
        explanation: "Abstract classes cannot be instantiated and may contain abstract methods. Interfaces define contracts. In Java 8, interfaces can have default and static methods. A class can implement multiple interfaces but extend only one class.",
        details: [
          "abstract class: cannot be instantiated; may have abstract + concrete methods + fields",
          "Abstract method has no body; subclass must implement all abstract methods or be abstract itself",
          "interface (pre-Java 8): all methods public abstract, all fields public static final",
          "Java 8 interface: can have default methods (with body) and static methods",
          "A class can implement multiple interfaces; interfaces can extend multiple interfaces",
          "interface variables are implicitly public static final — must be initialized",
          "Choosing abstract class vs interface: use abstract class when sharing code/state; interface for capability contract"
        ],
        example: `// Abstract class
abstract class Shape {
    protected String color;
    Shape(String color) { this.color = color; }

    abstract double area();           // abstract — no body
    abstract double perimeter();

    String describe() {               // concrete method
        return "Shape: area=" + area();
    }
}

class Circle extends Shape {
    private double radius;
    Circle(String color, double r) { super(color); radius = r; }

    @Override double area()      { return Math.PI * radius * radius; }
    @Override double perimeter() { return 2 * Math.PI * radius; }
}
// Shape s = new Shape("red");  // ERROR — can't instantiate abstract

// Interface
interface Flyable {
    double MAX_ALTITUDE = 10000;  // implicitly public static final

    void fly();                   // implicitly public abstract

    default void land() {         // Java 8 default method
        System.out.println("Landing...");
    }

    static void checkWeather() {  // Java 8 static method
        System.out.println("Checking weather...");
    }
}

interface Swimmable { void swim(); }

class Duck extends Animal implements Flyable, Swimmable {
    public void fly()  { System.out.println("Duck flying"); }
    public void swim() { System.out.println("Duck swimming"); }
}

// interface extending interface
interface Athletic extends Flyable, Swimmable {
    void train();
}`
      },
      "Polymorphism & Casting": {
        explanation: "Polymorphism allows one reference type to represent many object types. Method calls resolve at runtime based on the actual object type. Casting changes the reference type but not the object.",
        details: [
          "Upcasting (widening): Dog → Animal — always safe, implicit",
          "Downcasting (narrowing): Animal → Dog — may throw ClassCastException at runtime",
          "Always use instanceof before downcasting to avoid ClassCastException",
          "Virtual method invocation: instance methods always call the actual object's version",
          "Covariant return type: overriding method can return a subtype of the parent's return type",
          "The reference type determines which fields/static methods are accessible",
          "The object type determines which instance methods are called (dynamic dispatch)"
        ],
        example: `// Polymorphism
Animal[] animals = { new Dog("Rex"), new Cat("Whiskers") };
for (Animal a : animals) {
    a.speak();  // calls Dog.speak() or Cat.speak() at runtime
}

// Upcasting — implicit, always safe
Animal a = new Dog("Buddy");  // OK

// Downcasting — explicit, risky
Dog d = (Dog) a;              // OK if a really is a Dog
// Dog d2 = (Dog) new Cat();  // ClassCastException at runtime!

// Safe downcast with instanceof
if (a instanceof Dog) {
    Dog dog = (Dog) a;
    dog.fetch();
}

// Reference type vs object type
Animal ref = new Dog("Rex");
// ref.fetch();           // COMPILE ERROR — fetch() not in Animal
((Dog) ref).fetch();     // OK after cast

// Virtual method invocation (always uses object type)
class Base {
    String name = "Base";
    String getName() { return "Base"; }
}
class Sub extends Base {
    String name = "Sub";
    @Override String getName() { return "Sub"; }
}
Base b = new Sub();
System.out.println(b.name);      // "Base"    (field — reference type)
System.out.println(b.getName()); // "Sub"     (method — object type)

// Covariant return
class AnimalFactory {
    Animal create() { return new Animal(); }
}
class DogFactory extends AnimalFactory {
    @Override Dog create() { return new Dog(); }  // OK — Dog is subtype
}`
      },
      "Exceptions": {
        explanation: "Exceptions are events that disrupt normal program flow. Checked exceptions must be declared or handled; unchecked (RuntimeException) need not be. The finally block always executes. Java 7 introduced try-with-resources and multi-catch.",
        details: [
          "Hierarchy: Throwable → Error / Exception → RuntimeException",
          "Checked exceptions: must catch or declare with throws (IOException, SQLException)",
          "Unchecked: RuntimeException and subclasses — compiler doesn't require handling",
          "Errors: JVM problems (OutOfMemoryError, StackOverflowError) — don't catch these",
          "finally runs even if exception thrown or return statement reached (except System.exit())",
          "try-with-resources (Java 7): auto-closes AutoCloseable; resource closed before catch/finally",
          "Multi-catch (Java 7): catch (IOException | SQLException e) — e is effectively final"
        ],
        example: `// try-catch-finally
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Caught: " + e.getMessage());
} finally {
    System.out.println("Always runs");
}

// Multi-catch (Java 7)
try {
    // risky code
} catch (IOException | SQLException e) {
    System.out.println("DB or IO error: " + e.getMessage());
    // e is effectively final — cannot reassign e
}

// try-with-resources (Java 7) — auto-closes
try (FileReader fr = new FileReader("file.txt");
     BufferedReader br = new BufferedReader(fr)) {
    String line = br.readLine();
} catch (IOException e) {
    e.printStackTrace();
}
// fr and br closed automatically, even if exception thrown

// Custom checked exception
class InsufficientFundsException extends Exception {
    private double amount;
    InsufficientFundsException(double amount) {
        super("Need " + amount + " more");
        this.amount = amount;
    }
}

// Custom unchecked exception
class ValidationException extends RuntimeException {
    ValidationException(String msg) { super(msg); }
}

// Common Runtime Exceptions (OCA must-know)
// NullPointerException:           null.method()
// ArrayIndexOutOfBoundsException: arr[arr.length]
// ClassCastException:             (Dog) new Cat()
// ArithmeticException:            x / 0
// IllegalArgumentException:       bad method argument
// StackOverflowError:             infinite recursion (Error, not Exception)
// NumberFormatException:          Integer.parseInt("abc")`
      },
      "Dates, Times & Wrappers": {
        explanation: "Java 8 introduced the java.time package with immutable date-time classes. Wrapper classes provide object representations of primitives and utility methods for parsing and converting.",
        details: [
          "LocalDate: date only (year/month/day); LocalTime: time only; LocalDateTime: both",
          "All java.time classes are immutable — methods return new objects",
          "Period: date-based duration (years/months/days); Duration: time-based (hours/minutes/seconds)",
          "DateTimeFormatter: format/parse; ISO_LOCAL_DATE is default",
          "Wrapper classes: Integer, Double, Boolean, Character, Byte, Short, Long, Float",
          "Integer.parseInt(str) → int; Integer.valueOf(str) → Integer; toString(int) → String",
          "Integer constants: MAX_VALUE, MIN_VALUE; compareTo(), equals(), intValue()"
        ],
        example: `// LocalDate
LocalDate today = LocalDate.now();
LocalDate birthday = LocalDate.of(1990, Month.JUNE, 15);
LocalDate nextWeek = today.plusDays(7);
LocalDate lastMonth = today.minusMonths(1);
boolean isBefore = birthday.isBefore(today);  // true

// LocalTime
LocalTime now = LocalTime.now();
LocalTime noon = LocalTime.of(12, 0);
LocalTime later = noon.plusHours(3).plusMinutes(30);  // 15:30

// LocalDateTime
LocalDateTime dt = LocalDateTime.of(2024, 1, 15, 10, 30);
LocalDateTime withTime = LocalDate.of(2024,1,1).atTime(9,0);

// Period (date-based)
Period oneYear = Period.ofYears(1);
Period custom = Period.of(1, 2, 3);  // 1 year, 2 months, 3 days
LocalDate future = today.plus(oneYear);

// DateTimeFormatter
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("MM/dd/yyyy");
String formatted = today.format(fmt);          // "06/15/2024"
LocalDate parsed = LocalDate.parse("06/15/2024", fmt);

// Wrapper classes
int primitive = 42;
Integer boxed = Integer.valueOf(42);     // preferred boxing
Integer autoBoxed = 42;                  // autoboxing

int parsed2 = Integer.parseInt("123");   // "123" → 123
String str = Integer.toString(42);       // 42 → "123"
Integer.MAX_VALUE                        // 2147483647
Integer.MIN_VALUE                        // -2147483648

// Numeric wrapper methods
Double.parseDouble("3.14")
Boolean.parseBoolean("true")   // case-insensitive
Character.isDigit('5')         // true
Character.toUpperCase('a')     // 'A'`
      },
      "Lambdas & Functional Interfaces": {
        explanation: "Java 8 lambdas provide a concise way to implement functional interfaces (interfaces with exactly one abstract method). Predicates, Functions, Consumers, and Suppliers are the core built-in functional interfaces.",
        details: [
          "Lambda syntax: (params) -> expression or (params) -> { body; return val; }",
          "Functional interface: exactly one abstract method (SAM — Single Abstract Method)",
          "Predicate<T>: T → boolean; test() method",
          "Consumer<T>: T → void; accept() method",
          "Supplier<T>: () → T; get() method",
          "Function<T,R>: T → R; apply() method",
          "BiFunction<T,U,R>: (T,U) → R; UnaryOperator<T>: T → T; BinaryOperator<T>: (T,T) → T"
        ],
        example: `// Basic lambda syntax
Runnable r = () -> System.out.println("Hello!");
Comparator<String> c = (s1, s2) -> s1.compareTo(s2);
// or multi-line:
Comparator<String> c2 = (s1, s2) -> {
    int result = s1.compareTo(s2);
    return result;
};

// Predicate<T>
Predicate<String> isEmpty = s -> s.isEmpty();
Predicate<Integer> isEven = n -> n % 2 == 0;
Predicate<Integer> isPositive = n -> n > 0;

// Chaining predicates
Predicate<Integer> isEvenAndPositive = isEven.and(isPositive);
Predicate<Integer> isEvenOrNegative  = isEven.or(n -> n < 0);
Predicate<Integer> isOdd = isEven.negate();

// Using with Collections
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
names.removeIf(s -> s.startsWith("A"));  // removes "Alice"
names.forEach(s -> System.out.println(s));

// Consumer<T>
Consumer<String> printer = System.out::println;  // method reference
printer.accept("Hello");

// Supplier<T>
Supplier<LocalDate> todaySupplier = LocalDate::now;
LocalDate today = todaySupplier.get();

// Function<T,R>
Function<String, Integer> strLen = String::length;
Function<Integer, String> toStr = Object::toString;
Function<String, Integer> composed = strLen.compose(s -> s.trim());

// UnaryOperator
UnaryOperator<String> toUpper = String::toUpperCase;

// BinaryOperator
BinaryOperator<Integer> add = (a, b) -> a + b;

// Method references — 4 types
// 1. Static method:            Integer::parseInt
// 2. Instance on specific obj: myList::add
// 3. Instance on param type:   String::toUpperCase
// 4. Constructor:              ArrayList::new`
      },
      "Generics & Wildcards (OCP)": {
        explanation: "Generics provide compile-time type safety. Wildcards (?) represent unknown types. Upper-bounded wildcards (? extends T) allow reading; lower-bounded (? super T) allow writing. Generic methods have type parameters before the return type.",
        details: [
          "Generic class: class Box<T> { T value; } — T is type parameter",
          "Diamond operator: new ArrayList<>() — infers type from context (Java 7+)",
          "Bounded type: <T extends Comparable<T>> — T must implement Comparable",
          "Unbounded wildcard: List<?> — can read as Object, can't add (except null)",
          "Upper-bounded: List<? extends Number> — read as Number, can't add",
          "Lower-bounded: List<? super Integer> — can add Integer/int, read as Object",
          "PECS: Producer Extends, Consumer Super — guideline for wildcard choice"
        ],
        example: `// Generic class
class Box<T> {
    private T value;
    Box(T value) { this.value = value; }
    T get() { return value; }
}
Box<String> strBox  = new Box<>("Hello");
Box<Integer> intBox = new Box<>(42);

// Generic method
<T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}
max(3, 5)       // 5
max("cat","dog")// "dog"

// Wildcards
List<Integer> intList = Arrays.asList(1, 2, 3);

// Upper-bounded: read elements as Number
void printAll(List<? extends Number> list) {
    for (Number n : list) System.out.println(n);
}
printAll(intList);  // OK — Integer extends Number
// list.add(1);     // COMPILE ERROR — can't add to ? extends

// Lower-bounded: add Integer or subtypes
void addInts(List<? super Integer> list) {
    list.add(42);  // OK
}
addInts(new ArrayList<Number>());    // OK
addInts(new ArrayList<Object>());    // OK
addInts(new ArrayList<Integer>());   // OK
// addInts(new ArrayList<Double>()); // COMPILE ERROR

// Unbounded wildcard
void printList(List<?> list) {
    for (Object o : list) System.out.println(o);
}

// Type erasure: generics are compile-time only
// At runtime, List<String> and List<Integer> are both just List`
      },
      "Collections Framework (OCP)": {
        explanation: "Java Collections Framework provides interfaces and implementations for storing and manipulating groups of objects. Key: choose the right collection for the job — ordered vs sorted, duplicates allowed, key-value pairs.",
        details: [
          "List: ordered, duplicates OK → ArrayList (fast get), LinkedList (fast insert/delete)",
          "Set: no duplicates → HashSet (O(1) ops), LinkedHashSet (insertion order), TreeSet (sorted, O(log n))",
          "Map: key→value, unique keys → HashMap (O(1)), LinkedHashMap (order), TreeMap (sorted)",
          "Queue: FIFO → LinkedList, PriorityQueue (min-heap); Deque: double-ended",
          "Collections utility class: sort(), binarySearch(), min(), max(), frequency(), unmodifiableList()",
          "Comparable: natural order (compareTo, in class); Comparator: custom order (compare, separate)",
          "Arrays.asList() returns fixed-size list; Collections.unmodifiableList() prevents modification"
        ],
        example: `// List
List<String> list = new ArrayList<>(Arrays.asList("B","A","C"));
Collections.sort(list);                  // [A, B, C]
Collections.sort(list, Comparator.reverseOrder()); // [C, B, A]
int idx = Collections.binarySearch(list, "B");  // must be sorted first

// Set
Set<String> hashSet = new HashSet<>();
Set<String> linked  = new LinkedHashSet<>(); // insertion order
Set<String> tree    = new TreeSet<>();        // natural sorted order

// Map
Map<String,Integer> map = new HashMap<>();
map.put("Alice", 90);
map.putIfAbsent("Bob", 85);          // only if key absent
map.getOrDefault("Carol", 0);        // 0 if missing
map.forEach((k, v) -> System.out.println(k + ": " + v));
map.entrySet()                        // Set<Map.Entry<K,V>>
map.merge("Alice", 5, Integer::sum); // Alice: 90+5=95

// Comparable (natural order — in the class)
class Student implements Comparable<Student> {
    int grade;
    @Override public int compareTo(Student other) {
        return Integer.compare(this.grade, other.grade);
    }
}

// Comparator (external — flexible)
Comparator<Student> byName = Comparator.comparing(s -> s.name);
Comparator<Student> byGradeDesc = Comparator.comparingInt(s -> s.grade).reversed();
Comparator<Student> multi = byName.thenComparingInt(s -> s.grade);

List<Student> students = new ArrayList<>();
students.sort(byName);
Collections.sort(students, byGradeDesc);

// PriorityQueue (min-heap by default)
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(3); pq.offer(1); pq.offer(2);
pq.poll();  // 1 (min)

// ArrayDeque (stack/queue operations)
Deque<String> deque = new ArrayDeque<>();
deque.push("A");    // stack push (front)
deque.pop();        // stack pop (front)
deque.offer("B");   // queue enqueue (back)
deque.poll();       // queue dequeue (front)`
      },
      "Functional Programming & Streams (OCP)": {
        explanation: "The Streams API enables declarative data processing. Streams are lazy — intermediate operations are not executed until a terminal operation is called. Streams can only be consumed once.",
        details: [
          "Stream pipeline: source → intermediate ops (lazy) → terminal op (triggers execution)",
          "Intermediate (return Stream): filter(), map(), flatMap(), sorted(), distinct(), limit(), skip()",
          "Terminal (return result): forEach(), count(), collect(), reduce(), min(), max(), anyMatch(), allMatch(), noneMatch(), findFirst(), findAny()",
          "Optional<T>: container that may or may not hold a value; avoids NullPointerException",
          "Optional methods: isPresent(), get(), orElse(), orElseGet(), orElseThrow(), map(), filter()",
          "Collectors: toList(), toSet(), joining(), groupingBy(), partitioningBy(), counting()",
          "Primitive streams: IntStream, LongStream, DoubleStream — avoid boxing overhead"
        ],
        example: `// Stream pipeline
List<String> names = Arrays.asList("Alice","Bob","Charlie","Anna");

// filter + map + collect
List<String> result = names.stream()
    .filter(s -> s.startsWith("A"))   // intermediate
    .map(String::toUpperCase)          // intermediate
    .sorted()                          // intermediate
    .collect(Collectors.toList());     // terminal → ["ALICE","ANNA"]

// count, min, max
long count = names.stream().filter(s -> s.length() > 3).count();
Optional<String> longest = names.stream()
    .max(Comparator.comparingInt(String::length));

// reduce
int sum = IntStream.rangeClosed(1, 10).reduce(0, Integer::sum);  // 55

// Collectors
String joined = names.stream().collect(Collectors.joining(", ", "[", "]"));
// "[Alice, Bob, Charlie, Anna]"

Map<Integer, List<String>> byLength = names.stream()
    .collect(Collectors.groupingBy(String::length));

Map<Boolean, List<String>> partitioned = names.stream()
    .collect(Collectors.partitioningBy(s -> s.startsWith("A")));

// Optional
Optional<String> opt = Optional.of("Hello");
Optional<String> empty = Optional.empty();
Optional<String> nullable = Optional.ofNullable(null);  // empty

opt.isPresent()         // true
opt.get()               // "Hello"
empty.orElse("default") // "default"
empty.orElseGet(() -> computeDefault())
empty.orElseThrow(() -> new RuntimeException("No value"))
opt.map(String::length) // Optional<Integer> with 5

// Primitive streams (no boxing)
IntStream.range(1, 5)          // 1,2,3,4
IntStream.rangeClosed(1, 5)    // 1,2,3,4,5
IntStream.of(1, 2, 3).sum()    // 6
IntStream.of(1,2,3).average()  // OptionalDouble(2.0)

// flatMap
List<List<Integer>> nested = Arrays.asList(
    Arrays.asList(1,2), Arrays.asList(3,4)
);
List<Integer> flat = nested.stream()
    .flatMap(Collection::stream)
    .collect(Collectors.toList());  // [1,2,3,4]

// Infinite stream — must use limit!
Stream.iterate(0, n -> n + 2).limit(5)  // 0,2,4,6,8
Stream.generate(Math::random).limit(3)  // 3 random doubles`
      },
      "Enums & Nested Classes (OCP)": {
        explanation: "Enums are special classes representing fixed sets of constants. They can have fields, methods, and constructors. Nested classes come in four types: static nested, inner, local, and anonymous.",
        details: [
          "enum: implicitly extends java.lang.Enum; can have abstract methods, constructors, fields",
          "enum methods: values() → array of all; ordinal() → position (0-based); name() → String name",
          "enum can implement interfaces; cannot extend a class (already extends Enum)",
          "Static nested class: like a regular class inside another; accessed via OuterClass.Inner",
          "Inner class: has access to outer instance; needs outer instance to create",
          "Local class: defined inside a method; can access final/effectively final local vars",
          "Anonymous class: inline class definition used for one-off implementations"
        ],
        example: `// Enum with fields and methods
enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS  (4.869e+24, 6.0518e6),
    EARTH  (5.976e+24, 6.37814e6);

    private final double mass;
    private final double radius;

    Planet(double mass, double radius) {
        this.mass = mass; this.radius = radius;
    }
    double surfaceGravity() { return 6.67300E-11 * mass / (radius*radius); }
    double surfaceWeight(double mass) { return mass * surfaceGravity(); }
}

// Enum usage
Planet p = Planet.EARTH;
System.out.println(p.name());           // "EARTH"
System.out.println(p.ordinal());        // 2
Planet[] all = Planet.values();         // all enum constants
Planet fromStr = Planet.valueOf("MARS");// IllegalArgumentException

// Enum in switch
switch (p) {
    case EARTH: System.out.println("Home"); break;
    case MARS:  System.out.println("Red"); break;
}

// Static nested class (no reference to outer instance)
class Outer {
    static class StaticNested {
        void greet() { System.out.println("Static nested"); }
    }
    class Inner {
        void greet() { System.out.println("Inner of " + Outer.this); }
    }
}
Outer.StaticNested sn = new Outer.StaticNested();
Outer.Inner inner = new Outer().new Inner();  // needs outer instance!

// Local class (inside a method)
void process() {
    final String prefix = "LOG";  // must be effectively final
    class Logger {
        void log(String msg) { System.out.println(prefix + ": " + msg); }
    }
    new Logger().log("Hello");
}

// Anonymous class
Comparator<String> comp = new Comparator<String>() {
    @Override public int compare(String a, String b) {
        return a.length() - b.length();
    }
};
// Lambda equivalent:
Comparator<String> comp2 = (a, b) -> a.length() - b.length();`
      },
      "equals, hashCode & toString (OCP)": {
        explanation: "Every Java class inherits from Object. The three most commonly overridden methods are toString(), equals(), and hashCode(). They have a critical contract: if two objects are equal, they must have the same hashCode.",
        details: [
          "toString(): default is ClassName@hexHashCode; override for meaningful output",
          "equals(): default checks reference (==); override to check value equality",
          "hashCode(): default based on memory address; must match equals() contract",
          "equals/hashCode contract: equal objects → same hashCode; same hashCode → not necessarily equal",
          "If you override equals(), ALWAYS override hashCode() — required for HashMap/HashSet correctness",
          "equals() must be: reflexive, symmetric, transitive, consistent, and handle null",
          "instanceof check required before casting in equals() implementation"
        ],
        example: `class Point {
    int x, y;
    Point(int x, int y) { this.x = x; this.y = y; }

    // toString
    @Override public String toString() {
        return "Point(" + x + ", " + y + ")";
    }

    // equals — must handle null and wrong type
    @Override public boolean equals(Object obj) {
        if (this == obj) return true;           // same reference
        if (obj == null) return false;          // null check
        if (!(obj instanceof Point)) return false; // type check
        Point other = (Point) obj;
        return this.x == other.x && this.y == other.y;
    }

    // hashCode — same fields as equals
    @Override public int hashCode() {
        return Objects.hash(x, y);  // java.util.Objects helper
    }
}

// Without proper hashCode, HashMap breaks:
Set<Point> set = new HashSet<>();
set.add(new Point(1, 2));
System.out.println(set.contains(new Point(1, 2)));
// true only if hashCode() is correct!

// String has equals() and hashCode() implemented:
String s1 = new String("hello");
String s2 = new String("hello");
s1.equals(s2);   // true (value equality)
s1 == s2;        // false (different objects)

// StringBuilder does NOT override equals:
StringBuilder sb1 = new StringBuilder("hi");
StringBuilder sb2 = new StringBuilder("hi");
sb1.equals(sb2); // false (Object.equals — reference check)`
      },
      "Concurrency (OCP)": {
        explanation: "Java concurrency enables parallel execution via threads. The java.util.concurrent package provides higher-level tools: thread pools, futures, concurrent collections, and atomic variables to safely share data between threads.",
        details: [
          "Thread creation: extend Thread or implement Runnable; prefer Runnable for flexibility",
          "synchronized: ensures mutual exclusion on instance (this) or class object",
          "volatile: guarantees visibility across threads; does not prevent race conditions",
          "Atomic classes (AtomicInteger, AtomicBoolean): lock-free thread-safe operations",
          "ExecutorService: manages thread pool; submit() for Callable (returns Future), execute() for Runnable",
          "Future<T>: get() blocks until result; isDone(); cancel(true)",
          "CyclicBarrier, CountDownLatch, Semaphore: coordination between threads"
        ],
        example: `// Thread creation
class MyTask implements Runnable {
    @Override public void run() { System.out.println("Running"); }
}
Thread t = new Thread(new MyTask());
t.start();

// Lambda (preferred)
Thread t2 = new Thread(() -> System.out.println("Lambda thread"));
t2.start();
t2.join();  // wait for t2 to finish

// Synchronized method (lock on 'this')
class SafeCounter {
    private int count = 0;
    public synchronized void increment() { count++; }
    public synchronized int get() { return count; }
}

// Synchronized block (narrower lock)
class BankAccount {
    private double balance;
    private final Object lock = new Object();
    void transfer(double amount) {
        synchronized (lock) { balance -= amount; }
    }
}

// ExecutorService (thread pool)
ExecutorService pool = Executors.newFixedThreadPool(4);

// Runnable (no return value)
pool.execute(() -> System.out.println("Task"));

// Callable (returns value via Future)
Future<Integer> future = pool.submit(() -> 42);
Integer result = future.get();  // blocks until done
future.isDone();                // check without blocking

// Multiple futures
List<Future<Integer>> futures = new ArrayList<>();
for (int i = 0; i < 5; i++) {
    final int taskId = i;
    futures.add(pool.submit(() -> taskId * 2));
}
for (Future<Integer> f : futures) System.out.println(f.get());
pool.shutdown();

// Atomic variables (lock-free)
AtomicInteger counter = new AtomicInteger(0);
counter.incrementAndGet();  // thread-safe increment
counter.compareAndSet(1, 2); // CAS operation

// Concurrent collections (thread-safe)
ConcurrentHashMap<String,Integer> cmap = new ConcurrentHashMap<>();
CopyOnWriteArrayList<String> clist = new CopyOnWriteArrayList<>();

// volatile — guarantees visibility (not atomicity)
class SharedFlag {
    private volatile boolean running = true;
    void stop() { running = false; }
    void run() { while (running) { /* work */ } }
}`
      },
      "IO & NIO.2 (OCP)": {
        explanation: "Java IO provides stream-based file reading/writing. NIO.2 (Java 7, java.nio.file) provides a modern, more powerful Path-based API for file operations, directory walking, and file watching.",
        details: [
          "IO streams: InputStream/OutputStream (bytes), Reader/Writer (characters)",
          "Buffered wrappers: BufferedReader, BufferedWriter — dramatically improves performance",
          "Serialization: implements Serializable; ObjectOutputStream/ObjectInputStream; transient fields skipped",
          "NIO.2: Path, Paths, Files — replacing legacy File class",
          "Path operations: resolve(), relativize(), normalize(), toAbsolutePath()",
          "Files utility: copy(), move(), delete(), readAllLines(), write(), walk(), find()",
          "try-with-resources is essential for IO — always closes streams automatically"
        ],
        example: `// Reading a file (Java IO)
try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) { e.printStackTrace(); }

// Writing a file
try (BufferedWriter bw = new BufferedWriter(new FileWriter("out.txt"))) {
    bw.write("Hello, World!");
    bw.newLine();
    bw.write("Second line");
}

// Serialization
class Person implements Serializable {
    String name;
    transient String password;  // NOT serialized
}
// Write:
try (ObjectOutputStream oos = new ObjectOutputStream(
        new FileOutputStream("person.ser"))) {
    oos.writeObject(new Person("Alice"));
}
// Read:
try (ObjectInputStream ois = new ObjectInputStream(
        new FileInputStream("person.ser"))) {
    Person p = (Person) ois.readObject();
}

// NIO.2 — Path and Files (Java 7+)
Path path = Paths.get("/home/user/file.txt");
Path relative = Paths.get("src", "main", "App.java");

// Path operations
path.getFileName()     // file.txt
path.getParent()       // /home/user
path.getRoot()         // /
path.toString()        // /home/user/file.txt
path.resolve("other.txt")   // /home/user/other.txt
path.relativize(otherPath)  // relative path between two

// Files utility methods
Files.exists(path)
Files.isDirectory(path)
Files.copy(src, dest, StandardCopyOption.REPLACE_EXISTING)
Files.move(src, dest)
Files.delete(path)
Files.deleteIfExists(path)
List<String> lines = Files.readAllLines(path, StandardCharsets.UTF_8)
Files.write(path, lines, StandardCharsets.UTF_8)

// Walking directory tree
Files.walk(Paths.get("/home/user"))     // Stream<Path> recursive
     .filter(Files::isRegularFile)
     .forEach(System.out::println);

// Files.find with attribute filter
Files.find(Paths.get("/"), 10,
    (p, attr) -> attr.isRegularFile() && p.toString().endsWith(".java"))
    .forEach(System.out::println);`
      },
      "JDBC (OCP)": {
        explanation: "JDBC (Java Database Connectivity) provides a standard API for connecting Java applications to relational databases. It supports executing SQL, managing transactions, and reading results.",
        details: [
          "Steps: Load driver → get Connection → create Statement → execute SQL → process ResultSet → close",
          "DriverManager.getConnection(url, user, pass) → Connection",
          "Statement: basic SQL; PreparedStatement: parameterized (prevents SQL injection)",
          "ResultSet: cursor starts before first row; next() advances; getXxx(column) retrieves data",
          "Transactions: setAutoCommit(false); commit() or rollback()",
          "try-with-resources works for Connection, Statement, ResultSet (all AutoCloseable)",
          "SQL exceptions: SQLException is checked — must be caught or declared"
        ],
        example: `// JDBC connection and query
String url = "jdbc:postgresql://localhost:5432/mydb";
String sql = "SELECT id, name, salary FROM employees WHERE dept = ?";

try (Connection conn = DriverManager.getConnection(url, "user", "pass");
     PreparedStatement ps = conn.prepareStatement(sql)) {

    ps.setString(1, "Engineering");  // set parameter (1-indexed)

    try (ResultSet rs = ps.executeQuery()) {
        while (rs.next()) {
            int id       = rs.getInt("id");
            String name  = rs.getString("name");
            double sal   = rs.getDouble("salary");
            System.out.println(id + " " + name + " " + sal);
        }
    }
} catch (SQLException e) {
    e.printStackTrace();
}

// INSERT with PreparedStatement
String insert = "INSERT INTO employees (name, dept, salary) VALUES (?,?,?)";
try (Connection conn = DriverManager.getConnection(url, "user", "pass");
     PreparedStatement ps = conn.prepareStatement(insert)) {
    ps.setString(1, "Alice");
    ps.setString(2, "Engineering");
    ps.setDouble(3, 95000.0);
    int rowsAffected = ps.executeUpdate();  // returns count
}

// Transaction management
try (Connection conn = DriverManager.getConnection(url, "user", "pass")) {
    conn.setAutoCommit(false);  // start transaction
    try {
        // multiple operations
        Statement st = conn.createStatement();
        st.executeUpdate("UPDATE accounts SET balance=balance-100 WHERE id=1");
        st.executeUpdate("UPDATE accounts SET balance=balance+100 WHERE id=2");
        conn.commit();    // success — make permanent
    } catch (SQLException e) {
        conn.rollback();  // failure — undo all
    }
}

// ResultSet navigation (default: forward-only, read-only)
// ResultSet.TYPE_SCROLL_INSENSITIVE → can scroll
// rs.absolute(n)  → move to row n (-1 = last)
// rs.first()      → row 1
// rs.last()       → last row
// rs.beforeFirst()→ before row 1`
      },
      "Design Patterns (OCP)": {
        explanation: "Design patterns are reusable solutions to common software design problems. Java 8 OCP covers Singleton, Immutable, Builder, Factory, and functional interface-based patterns.",
        details: [
          "Singleton: one instance per JVM; private constructor, static getInstance()",
          "Immutable: no setters, final fields, final class, defensive copies for mutable fields",
          "Builder: step-by-step object construction; fluent API; handles many optional params",
          "Factory: creates objects without exposing creation logic; returns interface type",
          "Observer/Listener: callbacks via functional interfaces (replaces anonymous classes)",
          "Strategy: encapsulate algorithms; swap implementations via interface",
          "Template Method: abstract class defines skeleton; subclasses fill in steps"
        ],
        example: `// Singleton (thread-safe with initialization-on-demand)
class Singleton {
    private Singleton() {}
    private static class Holder {
        static final Singleton INSTANCE = new Singleton();
    }
    public static Singleton getInstance() { return Holder.INSTANCE; }
}

// Immutable class
final class ImmutablePoint {
    private final int x;
    private final int y;
    ImmutablePoint(int x, int y) { this.x = x; this.y = y; }
    int getX() { return x; }
    int getY() { return y; }
    ImmutablePoint withX(int newX) { return new ImmutablePoint(newX, y); }
}

// Builder pattern
class Animal {
    private final String name;
    private final String species;
    private final int age;

    private Animal(Builder b) {
        this.name = b.name;
        this.species = b.species;
        this.age = b.age;
    }

    static class Builder {
        private String name;
        private String species;
        private int age;

        Builder name(String name)       { this.name = name; return this; }
        Builder species(String species) { this.species = species; return this; }
        Builder age(int age)            { this.age = age; return this; }
        Animal build()                  { return new Animal(this); }
    }
}
Animal a = new Animal.Builder().name("Rex").species("Dog").age(3).build();

// Factory pattern
interface Shape { double area(); }
class Circle implements Shape { double r; Circle(double r){this.r=r;} public double area(){return Math.PI*r*r;} }
class Square implements Shape { double s; Square(double s){this.s=s;} public double area(){return s*s;} }

class ShapeFactory {
    static Shape create(String type, double size) {
        return switch (type) {
            case "circle" -> new Circle(size);
            case "square" -> new Square(size);
            default -> throw new IllegalArgumentException("Unknown: " + type);
        };
    }
}

// Strategy (with lambda!)
interface SortStrategy { void sort(List<Integer> list); }
SortStrategy ascending  = list -> Collections.sort(list);
SortStrategy descending = list -> Collections.sort(list, Comparator.reverseOrder());`
      },
      "Localization & Dates (OCP)": {
        explanation: "Java provides Locale, ResourceBundle, and NumberFormat for internationalization (i18n). The java.time package with DateTimeFormatter handles locale-sensitive date and number formatting.",
        details: [
          "Locale: represents a language/country combination (Locale.US, Locale.FRANCE, new Locale('fr','FR'))",
          "ResourceBundle: key-value property files for locale-specific text (messages_en.properties)",
          "NumberFormat.getInstance(locale): format/parse numbers; getCurrencyInstance(); getPercentInstance()",
          "DateTimeFormatter.ofLocalizedDate(FormatStyle.FULL).withLocale(locale): locale-aware dates",
          "DateTimeFormatter patterns: yyyy (year), MM (month), dd (day), HH:mm:ss, EEE (day name)",
          "ZonedDateTime: date+time+timezone; ZoneId.of('America/New_York')",
          "Period vs Duration: Period for dates (years/months/days), Duration for times (hours/minutes/seconds)"
        ],
        example: `// Locale
Locale us  = Locale.US;
Locale fr  = Locale.FRANCE;
Locale de  = new Locale("de", "DE");

// Number formatting
NumberFormat nf = NumberFormat.getInstance(Locale.US);
String formatted = nf.format(1234567.89);  // "1,234,567.89"
Number parsed = nf.parse("1,234.56");      // 1234.56

NumberFormat currency = NumberFormat.getCurrencyInstance(Locale.US);
currency.format(9.99);  // "$9.99"

NumberFormat pct = NumberFormat.getPercentInstance(Locale.US);
pct.format(0.75);       // "75%"

// ResourceBundle (internationalization)
// messages_en.properties: greeting=Hello
// messages_fr.properties: greeting=Bonjour
ResourceBundle rb = ResourceBundle.getBundle("messages", Locale.FRANCE);
String greeting = rb.getString("greeting");  // "Bonjour"

// DateTimeFormatter patterns
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm");
LocalDateTime dt = LocalDateTime.of(2024, 6, 15, 14, 30);
String out = dt.format(fmt);              // "06/15/2024 14:30"
LocalDateTime parsed2 = LocalDateTime.parse("06/15/2024 14:30", fmt);

// Localized date format
DateTimeFormatter localFmt = DateTimeFormatter
    .ofLocalizedDate(FormatStyle.FULL)
    .withLocale(Locale.FRANCE);
String frDate = LocalDate.now().format(localFmt);  // "samedi 15 juin 2024"

// ZonedDateTime
ZoneId nyZone = ZoneId.of("America/New_York");
ZonedDateTime nyTime = ZonedDateTime.now(nyZone);
ZonedDateTime tokyoTime = nyTime.withZoneSameInstant(ZoneId.of("Asia/Tokyo"));

// Duration vs Period
Duration d = Duration.ofHours(2).plusMinutes(30);  // 2h 30m
Period p = Period.of(1, 2, 3);                     // 1yr 2mo 3d
long minutes = d.toMinutes();                       // 150`
      },
      "Assertions & Exceptions Advanced (OCP)": {
        explanation: "Assertions are used during development to verify assumptions. Advanced exception handling includes try-with-resources chaining, suppressed exceptions, and re-throwing with type inference.",
        details: [
          "assert condition : 'message' — throws AssertionError if condition is false",
          "Assertions disabled by default; enable with -ea (or -enableassertions) JVM flag",
          "Do not use assert for argument validation in public methods (use IllegalArgumentException)",
          "Suppressed exceptions: in try-with-resources, close() exceptions are suppressed; access via getSuppressed()",
          "Exception chaining: new Exception('msg', cause) — wraps original exception",
          "Re-throw: catch (Exception e) { throw e; } — Java infers specific type",
          "Multi-catch variable is effectively final — cannot reassign in catch block"
        ],
        example: `// Assertions
int age = -5;
assert age >= 0 : "Age cannot be negative: " + age;
// Throws AssertionError if assertions enabled and age < 0

// Enable: java -ea MyApp
// Disable: java -da MyApp (default)

// DO use assert for:
assert list != null;            // internal invariant
assert result > 0 : "Expected positive, got " + result;

// DON'T use assert for:
// public void setAge(int age) { assert age >= 0; }  // wrong!
// Instead:
public void setAge(int age) {
    if (age < 0) throw new IllegalArgumentException("Negative age");
    this.age = age;
}

// Suppressed exceptions (try-with-resources)
class Resource implements AutoCloseable {
    public void use() throws Exception { throw new Exception("use"); }
    public void close() throws Exception { throw new Exception("close"); }
}
try (Resource r = new Resource()) {
    r.use();
} catch (Exception e) {
    System.out.println("Main: " + e.getMessage());  // "use"
    Throwable[] suppressed = e.getSuppressed();
    System.out.println("Suppressed: " + suppressed[0].getMessage());  // "close"
}

// Exception chaining
try {
    Integer.parseInt("abc");
} catch (NumberFormatException e) {
    throw new RuntimeException("Invalid input", e);  // e is the cause
}

// Catch and re-throw (Java 7+ infers specific type)
void rethrow() throws IOException, SQLException {
    try {
        // may throw IOException or SQLException
    } catch (Exception e) {
        throw e;  // Java infers which checked type to rethrow
    }
}`
      }
    }
  }
};

export default javaSE8Data;
