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

//! display all the students whose age is greater than or equal to 23
db.students.find({ age: { $gte: 23 } });

//! display all the students who are having sub either maths or bio
db.students.find({ subjects: { $in: ["maths", "bio"] } });

//! display all the employees who are working as clerk
db.emp.find({ job: "clerk" }); // implicit command
db.emp.find({ job: { $eq: "clerk" } }); // explicit command

//! display names and hire date of all employees who are working as clerk
db.emp.find({ job: "clerk" }, { empName: 1, hireDate: 1, _id: 0 });
db.emp.find({ job: { $in: ["clerk"] } }, { empName: 1, hireDate: 1, _id: 0 });

//! display all the emp who are working as clerk in 20th department
db.emp.find({ $and: [{ job: "clerk" }, { deptNo: 20 }] });
// db.emp.find({ $or: [{ job: "clerk" }, { deptNo: 20 }] });

//! display the names and deptNo the emp who are working as clerk in 20th department and having salary less than 1500.
db.emp.find(
  { $and: [{ job: "clerk" }, { deptNo: 20 }, { sal: { $lt: 1500 } }] },
  { empName: 1, deptNo: 1, _id: 0, sal: 1 }
);
db.emp.find(
  { job: "clerk", deptNo: 20, sal: { $lt: 1500 } },
  { empName: 1, deptNo: 1, _id: 0, sal: 1 }
);

//! case1 : when we have multiple conditions on multiple keys ==> implicit $and (we may or my not use the $and)
//~ display the name and job of emp who are working as clerk in dept 20
db.emp.find({ job: "clerk", deptNo: 20 }, { empName: 1, job: 1, _id: 0 });

//! case2: when we have  multiple conditions on same key ==> the last condition will get executed
//~ display the name and salary of all employees who are having salary less than 2500 and greater than 1500
db.emp.find({ sal: { $gt: 1500 }, sal: { $lt: 2500 } }, { empName: 1, sal: 1, _id: 0 }); // this is wrong
db.emp.find(
  { $and: [{ sal: { $gt: 1500 } }, { sal: { $lt: 2500 } }] },
  { empName: 1, sal: 1, _id: 0 }
);

/*
Questions
1) Display all the details from the employee collection.
2) Names of all the employees.
3) Name and salary given to all the employees.
4) Name and commission given to all the employees.
5) Employee ID and department number of all the employees in the employee collection.
6) Name and hire date of all the employees.
7) Name and designation of all the employees.
8) Name, job, and salary given to all the employees.
9) DNames present in the department collection.
10) DName and location present in the department collection.
11) What is the salary of the employee whose name is Smith?
12) What are the names of employees working as clerks?
13) What is the salary of employees who are working as salesmen?
14) Can you provide details of employees earning more than 2000?
15) Could you provide details of the employee whose name is Jones?
16) Can you give details of employees who were hired after January 1, 1981?
17) Provide names and salaries, including annual salaries, of employees whose annual salary exceeds 12000.
18) What are the details of the  employee working in department 30?
19) Can you list the names and hire dates of employees hired before 1981?
20) Provide details of employees working as managers.
21) What are the names and salaries of employees earning a commission of 1400?
22) Can you list details of employees whose commission exceeds their salary?
23) What are the employee numbers of employees hired before 1987?
24) Could you provide details of employees working as analyst?
25) Provide details of employees earning more than 2000 rupees per month.
*/

//! display the emp details whose unique id is "66a23517b5c6990483c4e4a8".
db.emp.findOne({ _id: ObjectId("66a23517b5c6990483c4e4a8") });
//& for fetching data based on _id, we have to mention the data type i.e. ObjectId("123")
