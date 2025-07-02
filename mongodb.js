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
17) Provide names and salaries, including annual salaries, of employees whose   annual salary exceeds 12000.
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

//! find the details of user who are working as sales man in dept 10 or 20
db.emp.find({ $and: [{ job: "salesman" }, { $or: [{ deptNo: 10 }, { deptNo: 30 }] }] });
db.emp.find({ $and: [{ job: "salesman" }, { deptNo: { $in: [10, 20] } }] });

//~ fetching based on array values
//! find the students details who are having physics as a subject
db.students.find({ subjects: "physics" });

//! find the students details who are having physics and chemistry as a subject
db.students.find({ $and: [{ subjects: "physics" }, { subjects: "chemistry" }] });

//! find the students details who are having physics , maths, and chemistry as a subject
db.students.find({
  $and: [{ subjects: "physics" }, { subjects: "chemistry" }, { subjects: "maths" }],
});

//! find the students details who are having physics and chemistry as a subject
db.students.find({ subjects: ["chemistry", "physics"] }); // this will not work

//! find the students details who are having physics and chemistry as a subject
db.students.find({ subjects: { $all: ["chemistry", "physics"] } });

//! ======================= array operators => $all, $size ===================
//& $all ==> it is used on array, fetches all the documents which fulfills all the given values
//? syntax ==> { key_name: { $all: [v1, v2, v2, .....] } }

//& $size ==> it targets the docs, based on the size of the array
//? syntax ==> { key_name: { $size: number} }

//! find the students details who are having only 2 subjects
db.students.find({ subjects: { $size: 2 } });

db.students.insertOne({
  "user name": "san",
  "user-age": 24,
  user_gender: "M",
  "user subjects": ["maths"],
  1: "helloo",
});
// user name
// user-age
// gender
// user subjects

db.students.find({ "user name": "san" });
db.students.find({ 1: "helloo" });

let ob = {
  "user name": "san",
  "user-age": 24,
  user_gender: "M",
  "user subjects": ["maths"],
  1: "helloo",
  address: {
    key1: "",
  },
};

console.log(ob[1]);
console.log(ob["user name"]);

db.students.insertOne({
  name: "rahul",
  age: 23,
  gender: "M",
  address: {
    city: "Banglore",
  },
});

db.students.findOne({ "address.city": "Banglore" });

//! query op ==>
//! comparison($eq, $ne, $gt, $gte, $lt, $lte, $nin, $in),
//! logical($and, $or, $nor, $not),
//! array ($all, $size)
//! misc. ($regex, $expr)

//? $regex ==> it stands for regular expression. it is used for pattern matching. only applicable on strings
//& syntax ==> { key_name: { $regex: /pattern/ } }

// display all the employees names who have letter "a" in their name
db.emp.find({ empName: { $regex: /a/ } }, { empName: 1, _id: 0 });

// display all the employees names whose first letter of the name is "a"
db.emp.find({ empName: { $regex: /^a/ } }, { empName: 1, _id: 0 });
//& cap symbol ==> ^ (shift + 6)

// display all the employees names whose first two letters are "ad"
db.emp.find({ empName: { $regex: /^ad/ } }, { empName: 1, _id: 0 });

// display all the employees names whose last letter of the name is "s"
db.emp.find({ empName: { $regex: /s$/ } }, { empName: 1, _id: 0 });
//& dollar symbol ==> $ (shift + 4)

// display all the employees names whose last two letters are "es"
db.emp.find({ empName: { $regex: /es$/ } }, { empName: 1, _id: 0 });

//& if you want to skip characters use dot symbol( "." )
// display the name of all the emp who have letter "a" as the second character from start
db.emp.find({ empName: { $regex: /^.a/ } }, { empName: 1, _id: 0 });

// display the name of all the emp who have letter "s" as the third last character
db.emp.find({ empName: { $regex: /s..$/ } }, { empName: 1, _id: 0 });

// display the name of all the emp who have are having exactly 4 characters
db.emp.find({ empName: { $regex: /^....$/ } }, { empName: 1, _id: 0 });

// display the name of all the emp who have are having first letter as "a" and last letter "n"
db.emp.find({ empName: { $regex: /^a.*n$/ } }, { empName: 1, _id: 0 });

db.emp.find({ sal: { $regex: /^20..$/ } }, { sal: 1, _id: 0 });

//? comm> sal
//! $expr ==> syntax ==> {$expr: {expression}}
db.emp.find({ $expr: { $gt: ["$comm", "$sal"] } });

// Can you give details of employees who were hired after January 1, 1981?
// { key_name: ISODate/new Date("YY-MM-DDTHH:MM:SSZ") }
db.emp.find({ hireDate: { $gt: ISODate("1981-01-01T00:00:00Z") } });

db.emp.find({ hireDate: { $gt: new Date("1 jan 1980") } }); // UTC FORMATS (NOT LOCAL FORMATS)

//? https://github.com/utk-281/mongodb_1200

//~ update operators --> $set, $unset, $inc, $max, $min, $rename
// one/many( { filter }, { updation value }, { options } )
// updating docs ==>
//? we can add a new key value pair ==> ($set)
//? we can update the existing value ==> ($set)
//? we can update existing key ==> ($rename)
//? we can remove the key value pair ==> ($unset)

//! $set ==> using $set we can add a new key value pair or update the existing value
// One/Many--> ({filter}, { $set: { key_name: value } })
db.cars.insertMany([
  { name: "Honda", model: "Civic", price: 30000 },
  { name: "Honda", model: "Accord", price: 40000 },
  { name: "Honda", model: "CRV", price: 50000 },
]);

//! update the honda civic model and add a spoiler (spoiler:true)
db.cars.updateOne({ model: "Civic" }, { $set: { Spoiler: true } });
/*
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
*/

//! update the price of honda civic model to 50000
db.cars.updateOne({ model: "Civic" }, { $set: { price: 50000 } });

//! $rename ==> it is used to rename a key
// One/Many--> ({filter}, { $rename: { "old_key": "new_key"} })

//! update the key "Spoiler" to "spoilers" of honda civic
db.cars.updateOne(
  { model: "Civic" }, // filter part
  {
    $rename: {
      // updation part
      Spoiler: "spoilers",
    },
  }
);

/*
db.cars.updateOne(
  { model: "Civic" }, // filter part
  {
    $rename: {
      // updation part
      spoilers: "spoilers",
    },
  }
);
! this will throw an error ==> as we have to provide different new key
*/

//!
// db.cars.updateOne({ model: "Civic" }, { $set: { spoilers: "" } });
// db.cars.updateOne({ newModel: "Civic" }, { $set: { spoilers: undefined } });
// db.cars.updateOne({ newModel: "Civic" }, { $set: { spoilers: null } });

//! truthy and falsy
//! $unset ==> ({filter}, { $unset: { key_name: ""} })
// it is used to remove the key value pair
db.cars.updateOne({ newModel: "Civic" }, { $unset: { price: "" } });

//!
db.cars.insertOne({
  _id: 123456,
  name: "Honda",
  model: "Civic",
});

// update _id to 123
db.cars.updateOne({ model: "Civic" }, { $set: { _id: 123 } });
//?  Performing an update on the path '_id' would modify the immutable field '_id'

//! $inc ==> it is used to increment/decrement
// { $inc: { key_name: +/- number } }

//! update the price of CRV by 10,000
db.cars.updateOne({ model: "CRV" }, { $inc: { price: -10000 } });

db.cars.updateOne({ model: "CRV" }, { $inc: { carsSold: 5 } });
//? in case the key is not present, it will create a new key value pair
//? null as a value cannot be passed with $inc

// $max and $min
//? $max ==> it is used to set the maximum value of a key
//? $min ==> it is used to set the minimum value of a key

// syntax ==> ({ $max/$min :{key_name: value}})
db.scores.insertMany([
  { name: "a", high: 200, low: 40 },
  { name: "b", high: 2000, low: 140 },
]);

db.scores.updateOne({ name: "a" }, { $max: { high: 100000 } });
db.scores.updateOne({ name: "a" }, { $min: { low: 150 } });

//! data modelling ==> it is a process of defining of how data is stored and what is the relationship between the data

// relation between the data can be defined in two ways
//? 1) embedded relation/ nested relation
//? 2) reference relation

// example for embedded ==
/*
  emp = {
      name:""
      age:
      address:{
            city:""
            state:""
          },
      contact:{
            email:""
            phone:""
          }
    }
*/

//! embedded
db.users.insertMany([
  {
    name: "varun",
    age: "24",
    skills: ["html", "css", "js"],
    address: { city: "delhi", state: "Ut" },
    contact: {
      email: "v@gmail.com",
      phone: 12345678,
    },
  },
  {
    name: "chetna",
    age: "24",
    skills: ["html", "css", "js"],
    address: { city: "gurgaon", state: "Haryana" },
    contact: {
      email: "c@gmail.com",
      phone: 12345678,
    },
  },
]);

//! reference
db.users.insertMany([
  {
    name: "rahul",
    age: 34,
    skills: ["java"],
  },
  {
    name: "sirisha",
    age: 34,
    skills: ["python"],
  },
]);

db.address.insertMany([
  {
    city: "delhi",
    state: "Ut",
  },
  {
    city: "gurgaon",
    state: "Haryana",
  },
]);

db.contact.insertMany([
  {
    email: "v@gmail.com",
    phone: 12345678,
  },
  {
    email: "c@gmail.com",
    phone: 12345678,
  },
]);

db.users.updateOne(
  { name: "rahul" }, // filter
  { $set: { address: ObjectId("685e448f65e243272650eb6d") } } // updation
);

db.users.updateOne(
  {
    name: "rahul",
  },
  {
    $set: { contact: ObjectId("685e44ac65e243272650eb6f") },
  }
);

// // aggregation
// db.users.aggregate([
//   {
//     $match: {
//       name: "rahul",
//     },
//   },
//   {
//     $lookup: {
//       from: "address",
//       foreignField: "_id",
//       localField: "address",
//       as: "address",
//     },
//   },
// ]);

/*

{
  name:string,
  age:number,
}

*/

//! how data is stored ==> creating a structure
db.createCollection("users", {
  validator: {
    // will validate the data before saving
    $jsonSchema: {
      // $jsonSchema will provide a structure to compare against input data
      bsonType: "object", // this will be always object, mongodb stores js like objects
      required: ["name", "age"], // in this we have to define all the required inputs
      properties: {
        // with the help of properties, we define datatypes of the inputs
        name: {
          bsonType: "string",
        },
        age: {
          bsonType: "number",
        },
      },
    },
  },
});

db.users.insertMany([{ name: "abc" }, { age: 34 }]);

db.users.insertOne({
  name: "abc",
  age: null,
});

db.createCollection("c2", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "contact", "isMarried"],
      properties: {
        email: {
          bsonType: "string",
          description: "email must be a string",
        },
        contact: {
          bsonType: "number",
          description: "provide a number",
        },
        isMarried: {
          bsonType: "bool",
          description: "only true/false should be passed",
        },
      },
    },
  },
});

db.c2.insertOne({ email: "abc", contact: 123456, isMarried: false });

db.createCollection("c4", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "age", "address"],
      properties: {
        name: { bsonType: "string" },
        age: { bsonType: "number" },
        address: { bsonType: "object" },
      },
    },
  },
});

db.c4.insertOne({
  name: "abc",
  age: 12,
  address: {},
  contact: 123456,
});

db.createCollection("c5", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "age", "skills"],
      properties: {
        name: { bsonType: "string" },
        age: { bsonType: "string" },
        skills: {
          bsonType: "array",
          items: {
            bsonType: "string",
          },
        },
      },
    },
  },
});

db.c5.insertOne({
  name: "anc",
  age: "2344",
  skills: [123],
});

db.createCollection("c6", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "skills"],
      properties: {
        name: { bsonType: "string" },
        skills: {
          bsonType: "object",
          required: ["fe", "be", "db"],
          properties: {
            fe: {
              bsonType: "array",
              items: { bsonType: "string" },
            },
            be: {
              bsonType: "array",
              items: { bsonType: "string" },
            },
            db: {
              bsonType: "array",
              items: { bsonType: "string" },
            },
          },
        },
      },
    },
  },
});

//! aggregation ==> it is a process of returning the documents based on some calculations and conditions, using aggregation we can find average, max, count, add new fields, etc...

// syntax for aggregate ==>
// db.collectionName.aggregate([{stage1}, {stage2}, {}, {}, {}, ......])
// {} ==> stages

//~ aggregate() accepts array of stages
//~ in every stages, we will use one aggregation operator ($addFields, $match, $group.....)
//~ using aggregation we can filter documents, we can group similar documents, we can add new fields, we can find max, min, sum ,etc...
//~ output of each stage is given as input to next stage

//& diff aggregation operators
//1) $addFields ==> to create a new key-value pair at the time of display
//2) $match ==> it is used to filter the documents based on certain conditions/ and also used to filter grouped documents
//3) $group ==> it is used to group the documents based on certain value
//4) $lookup ==> it is used to join 2 or more collections
//5) $sort ==> it is used to sort the data in asc/desc order
//6) $project ==> it is used to hide/display the data
//7) $unwind ==> it is used to remove array from the field
//8) $skip ==> it is used to skip the documents based on certain value
//9) $limit ==> it is used to limit the documents based on certain value

//? Provide names and salaries, including annual salaries, of employees whose   annual salary exceeds 12000.
//? give me the count of employees who are working in sales department
//? fetch the details of highest paid employee

//& find the details of all the employees.
db.emp.find();
db.emp.aggregate();

//? find me the count of employees in each department in which count is greater than 2 and whose name starts with "a"

//! syntax for $match
/* db.collectionName.aggregate([
  {
    $match: {condition},
  },
]);
 */

//! syntax for $group --> here we can perform few more operations like : max, min, avg, total, count
db.collectionName.aggregate([
  {
    $group: {
      _id: "$value", // whenever we are passing key as value we need to prefix $
      count: { $sum: 1 },
      maxValue: { $max: "$value" },
      minValue: { $min: "$value" },
      avgValue: { $avg: "$value" },
      totalValue: { $sum: "$value" },
    },
  },
]);

//! syntax for $project ==> whenever we will use $project, by default _id is set to 1
db.collectionName.aggregate([
  {
    $project: {
      keyName: 1, // display,
      keyName: 0, // hide
      aliasingName: "$keyName",
    },
  },
]);

//! syntax for $addFields
db.collectionName.aggregate([
  {
    $addFields: {
      key_name: { expression },
    },
  },
]);

//& 1) fetch the details of emp who are working in dept 20 and employee name should have letter "a"
db.emp.find({ deptNo: 20, empName: { $regex: /a/ } });
db.emp.aggregate([
  {
    $match: {
      $and: [{ deptNo: 20 }, { empName: { $regex: /a/ } }],
    },
  },
]);

//& group the emp based on department number and find total count and max sal give to the dept
db.emp.aggregate([
  {
    $group: {
      _id: "$deptNo",
      noOfEmp: { $sum: 1 },
      maxSalary: { $max: "$sal" },
      minSalary: { $min: "$sal" },
      averageSalary: { $avg: "$sal" },
      totalSalary: { $sum: "$sal" },
    },
  },
]);

//& 3) fetch emp name as "username" and deptNo of emp who are working in dept 20 and employee name should have letter "a"
db.emp.aggregate([
  {
    $match: {
      deptNo: 20,
      empName: { $regex: /a/ },
    },
  }, // stage1
  {
    $project: {
      username: "$empName", // aliasing
      deptNo: 1,
      _id: 0,
    },
  }, // stage2
]);

db.emp.aggregate([
  {
    $project: {
      hireDate: 1,
      _id: 0,
    },
  },
]);

//& 4) display number of employees working in each department along with deptNo
// number of stages =>
db.emp.aggregate([
  {
    $group: {
      _id: "$deptNo",
      noOfEmp: { $sum: 1 },
    },
  }, // stage1 --> group
  {
    $project: {
      noOfEmp: 1,
      deptNo: "$_id",
      _id: 0,
    },
  }, // stage2 --> project
]);

//& 5) display total salary needed to pay in each department
// stages ==> group, project
db.emp.aggregate([
  {
    $group: {
      _id: "$deptNo",
      totalSalary: { $sum: "$sal" },
    },
  }, // group stage
  {
    $project: {
      totalSalary: 1,
      _id: 0,
      empName: 1,
    },
  }, // project stage
]);

//& 5ext.) display total salary and employee names needed to pay in each department
db.emp.aggregate([
  {
    $group: {
      _id: "$deptNo",
      totalSalary: { $sum: "$sal" },
      employeeNames: { $push: "$empName" },
      // employeeJobs: { $push: "$job" },
    },
  }, // group stage
]);

//& 6) display total number of employees in each job along with names
db.emp.aggregate([
  {
    $group: {
      _id: "$job",
      total: { $sum: 1 },
      names: { $push: "$empName" },
    },
  },
]);

//& 7) display the employee name and annual salary needed to pay to all the employees
db.emp.aggregate([
  {
    $addFields: {
      annualSal: { $multiply: ["$sal", 12] },
    },
  }, // $addFields stage
  {
    $project: {
      empName: 1,
      annualSal: 1,
      _id: 0,
    },
  },
]);

//& 8) display the employee name and annual salary needed to pay to all the employees having letter a in their name.
// stages ==> match, addFields, project
db.emp.aggregate([
  {
    $match: {
      empName: { $regex: /a/ },
    },
  }, // stage1 --> match
  {
    $addFields: {
      anSal: { $multiply: ["$sal", 12] },
    },
  }, // stage2 --> addFields
  {
    $project: {
      empName: 1,
      anSal: 1,
      _id: 0,
    },
  }, // stage3 --> project
]);

//! 9) display employee names, mid term salary and job whose mid term salary is greater than 10,000
// stages ==> addFields, match, project

//! 10)  display maximum salary, emp names and job from each deptNo having maximum salary lesser than 4000
// stages ==> group , match
db.emp.aggregate([
  {
    $group: {
      _id: "$deptNo",
      maxSal: { $max: "$sal" },
      names: { $push: "$empName" },
      // jobs: { $push: "$job" },
      uniqueJobs: { $addToSet: "$job" },
    },
  },
  {
    $match: {
      maxSal: { $lt: 4000 },
    },
  },
]);

//! find the emp whose commission exceeds the salary
db.emp.find({ $expr: { $gt: ["$comm", "$sal"] } });
