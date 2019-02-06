function addToDo() {
    //Hiding error message empty label
    var messageError = document.getElementById("error-message-label");
    messageError.style.display = "none";

    //Searching for the text
    var textToDo = document.getElementById("tasktodo");

    if (textToDo.value === "") {
        messageError.style.display = "inline";
    }
    else {
        //Creating li element with the close button
        var toDo = document.createElement("li");
        toDo.classList.add("list-group-item");
        toDo.innerHTML = textToDo.value;

        //Adding id to the li element
        var newID = null;
        var counter = 1;
        while (newID === null) {
            if (document.getElementById("li" + counter) === null) {
                newID = "li" + counter;
            }
            else {
                counter++;
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

        //Clean textfield
        textToDo.value = "";

        //Close modal
        $('#AddToDo').modal('hide');

        //Mark as done
        toDo.addEventListener("click", function (event) {
            if (event.target.classList.contains("done")) {
                event.target.classList.remove("done");
            }
            else {
                event.target.classList.add("done");
            }
        });

        //Delete to do
        spanButton.addEventListener("click", function (event) {
            var liid = event.target.id;
            var litoDelete = document.getElementById(liid);
            litoDelete.parentNode.removeChild(litoDelete);
        });
    }
}