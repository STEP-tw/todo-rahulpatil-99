class toHtml{
  constructor(){}
  convertToRadio(todos){
    return todos.map((todo)=>{
      return `<input type="radio" name="todo" value=${todo}> ${todo}`;
    }).join('<br>') || ' ';
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
    return title+description+items+'<br>';
  };
}
module.exports=toHtml;
