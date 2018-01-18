class toHtml{
  constructor(){}
  generateForm(todos){
    if(!todos.length) return " ";
    let formInitial=`<form action="view" method="post">`;
    let radioButton = todos.map((todo)=>{
      return `<input type="radio" name="todo" value=${todo}> ${todo}`;
    }).join('<br>');
    let view=`<br><input type="submit" name="button" value="view">`;
    let edit=`<input type="submit" name="button" value="Edit" formaction="/edit">`;
    return formInitial+radioButton+view+edit+"</form>";
  }
  convertTodoToHtml(todo){
    let title=`<h1>Title: ${todo.title}</h1>`;
    let description = `<h2>description: ${todo.description}</h2>`;
    let items = todo.items.map((task)=>{
      let moto=task.content;
      if(task.status){
        return `<input type="checkbox" name="task" value=${moto} checked> ${moto}`;
      }
      return `<input type="checkbox" name="task" value=${moto}> ${moto}`;
    }).join('<br>') || '';
    let add=`<br><input type="submit" name="${todo.title}" value="add" formaction="/add">`;
    return title+description+items+add;
  };
}
module.exports=toHtml;
