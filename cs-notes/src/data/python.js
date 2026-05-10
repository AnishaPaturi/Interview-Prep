const pythonData = {
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

export default pythonData;
