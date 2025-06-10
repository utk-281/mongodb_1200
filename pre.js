let arr = ["hello", true, 123, ["myName", "myAge", ["myAdd"]]];
console.log(arr[2]);
console.log(arr[3][1]);
console.log(arr[3][2][0]);

let object = {
  name: "name",
  age: 34,
  address: {
    city: "abc",
    state: "xyz",
  },
  skills: {
    frontend: ["html", "css", "js"],
    backend: ["nodejs", "express", "mongodb"],
  },
};

console.log(object.name);
console.log(object.age);
console.log(object.address.state);
console.log(object[1]);
console.log(object["name"]);
console.log(object["skills"]["backend"][2]);

let object2 = {
  name: "abc",
  age: 34,
  name: "def",
  name: "xyz",
  age: 45,
};
console.log(object);

let object3 = {
  name: "abc",
  age: 34,
  KEY3: true,
  key4: function () {},
  key5: undefined,
  key6: null,
  key7: new Date(),
  key8: 123.213,
  key9: [],
  key10: {},
};

//! json ==> javascript object notation
//? it does not support undefined, date, function
let object4 = {
  name: "abc",
  age: 34,
  KEY3: true,
};

//! json ==> it is language independent


//! compass ==> https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-8.0.10-signed.msi
//! shell ==> https://downloads.mongodb.com/compass/mongosh-2.5.2-x64.msi

//! exe ==> https://downloads.mongodb.com/compass/mongodb-compass-1.46.3-win32-x64.exe
