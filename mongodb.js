db.teachers.insertMany([{ name: "abc" }, { age: 45 }, { name: "def" }]);

db.teachers.findOne();
db.teachers.findOne({});

db.teachers.findOne({ age: 45 });

db.students.insertMany([
  { name: "varun", age: 23, gender: "M", subjects: ["physics", "chemistry", "maths"] },
  { name: "chetna", age: 24, gender: "F", subjects: ["physics", "chemistry", "bio"] },
  { name: "ashwin", age: 22, gender: "M", subjects: ["physics", "chemistry", "maths"] },
  { name: "sirisha", age: 22, gender: "F", subjects: ["physics", "chemistry", "maths", "bio"] },
]);

db.students.findOne({ gender: "M" });
db.students.findOne({ gender: "M" }, { name: 1, _id: 0 });
