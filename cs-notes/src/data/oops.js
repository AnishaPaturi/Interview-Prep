const oopsData = {
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
  }
};

export default oopsData;
