let todos = [];

function addToDo(todo) {
    //Hiding error message empty label
    var messageError = document.getElementById("error-message-label");
    messageError.style.display = "none";

    //Searching for the text
    var textToDo = document.getElementById("tasktodo");

    if (textToDo.value === "" && todo.description === "") {
        messageError.style.display = "inline";
    }
    else {
        //Creating li element with the close button
        let description = textToDo.value != "" ? textToDo.value : todo.description;
        var toDo = document.createElement("li");
        toDo.classList.add("list-group-item");
        toDo.innerHTML = description;

        //Adding id to the li element
        var newID = null;
        if (todo) {
            newID = todo.id;
        }
        else {

            var counter = 1;
            while (newID === null) {
                if (document.getElementById("li" + counter) === null) {
                    newID = "li" + counter;
                }
                else {
                    counter++;
                }
            }

        }

        toDo.id = newID;

        //Adding close button to the list
        var closeButton = document.createElement("button");
        closeButton.classList.add("close");
        closeButton.setAttribute('type', 'button');
        closeButton.setAttribute('aria-label', 'Close');
        toDo.appendChild(closeButton);

        //Adding span that shows an X
        var spanButton = document.createElement("span");
        spanButton.setAttribute('aria-hidden', 'true');
        spanButton.innerHTML = "&times;";
        closeButton.appendChild(spanButton);
        spanButton.id = newID;

        //adding the element to the list
        var toDoList = document.querySelector(".list-group");
        toDoList.appendChild(toDo);

        //adding the element to the local storage
        if (!todo) {
            todos.push({ id: toDo.id, description, done: false });
            localStorage.setItem("todos", JSON.stringify(todos));
        }
        else {
            if (todo.done) {
                toDo.classList.add("done");
            }
        }

        //Clean textfield
        textToDo.value = "";

        //Close modal
        $('#AddToDo').modal('hide');

        //Mark as done
        toDo.addEventListener("click", function (event) {
            var isdone;
            if (event.target.classList.contains("done")) {
                event.target.classList.remove("done");
                isdone = false;
            }
            else {
                event.target.classList.add("done");
                isdone = true;
            }

            var temp = [];
            for (var i = 0; i < todos.length; i++) {
                if (todos[i].id === event.target.id) {
                    todos[i].done = isdone;
                }
                temp.push(todos[i]);
            }
            todos = temp;
            localStorage.setItem("todos", JSON.stringify(todos));
        });

        //Delete to do
        spanButton.addEventListener("click", function (event) {
            var liid = event.target.id;
            var litoDelete = document.getElementById(liid);
            litoDelete.parentNode.removeChild(litoDelete);

            //Deleting the to do from local storage
            var temp = [];
            for (var i = 0; i < todos.length; i++) {
                if (todos[i].id != liid) {
                    temp.push(todos[i]);
                }
            }
            todos = temp;
            localStorage.setItem("todos", JSON.stringify(todos));
        });
    }
}

function loadTodos() {
    todos = JSON.parse(localStorage.getItem("todos")) || [];

    for (var i = 0; i < todos.length; i++) {
        addToDo(todos[i]);
    }
}

window.onload = function () {
    loadTodos();
};