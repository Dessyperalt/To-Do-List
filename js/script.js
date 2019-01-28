function addTodo()
{
    var toDo = document.createElement("li");
    toDo.classList.add("list-group-item");

    var toDoList = document.querySelector("list-group");
    toDoList.appendChild(toDo); 

}