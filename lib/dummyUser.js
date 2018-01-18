const Admin = require('./admin.js');

let administrator = new Admin();
let Rahul = administrator.addUser("Rahul");
Rahul.addTodo("practice","improving code");
Rahul.addTodoItem("practice","play with the code");
Rahul.addTodoItem("practice","take breaks");

Rahul.addTodo("sample","sample file");
Rahul.addTodoItem("sample","take food at right time");
Rahul.addTodoItem("sample","take healthy food");
console.log(Rahul);
console.log();
console.log("practice task:",Rahul.getTodoItems("practice"));
console.log("sample task:",Rahul.getTodoItems("sample"));
exports.Rahul=Rahul;
