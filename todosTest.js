const TodosPage = require('./todos');
const todosPage = new TodosPage("https://elevation-local-todo.herokuapp.com/")

async function TestCaseOne(){
    // await todosPage.insertAndDelete("Shiraz");
    await todosPage.insertAndComplete("Shiraz");
    // await todosPage.insertTwoDeleteFirst("Make a Malawach", "Eat the Malawach");
} 

TestCaseOne();
