/* global $ */
$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)
    .catch(function(err){
        console.log(err);
    });
    
    $("#todoInput").keypress(function(e){
        //hit enter key
        if(e.which === 13){
            //create todo
            createTodo();
            pop_up("A Todo Was Successfully Created!");
        }
    });
    
    $(".list").on("click", "li", function() {
        updateTodo($(this));
    });
    
    //listen to span inside the list class
    $(".list").on("click", "span", function(e){
        e.stopPropagation();
        removeTodo($(this).parent());
        pop_up("A Todo Was Successfully Removed!");
    });
});


function addTodos(todos){
    //add todos to the page
    todos.forEach(function(todo){
        addTodo(todo);
    });
}


function addTodo(todo) {
    //create new todo li
    var newTodo = $("<li class = 'task'>" + todo.name + "<span>X</span></li>");
    newTodo.data("id", todo._id);
    newTodo.data("completed", todo.completed);
    if(todo.completed)
        newTodo.addClass("done");
    //add new todo to the list
    $(".list").append(newTodo);
}


function createTodo(){
    //send request to create new todo
    var userInput = $("#todoInput").val();
    $.post("/api/todos", {name: userInput})
    .then(function(newTodo){
        $("#todoInput").val("");
        addTodo(newTodo);
    })
    .catch(function(err){
        console.log(err);
    });
}


function updateTodo(todo){
    var updateUrl = "/api/todos/" + todo.data("id");
    var isDone = !todo.data("completed");
    var updateData = {completed: isDone};
    $.ajax({
       method: "PUT",
       url: updateUrl,
       data: updateData
    })
    .then(function(updateTodo){
        todo.toggleClass("done");
        todo.data("completed", isDone);
    })
    .catch(function(err){
        console.log(err);
    })
}


function removeTodo(todo){
    var clickedId = todo.data("id");
    var deleteUrl = "/api/todos/" + clickedId;
    $.ajax({
        method: "delete",
        url: deleteUrl
    })
    .then(function(data){
        todo.remove();
    })
    .catch(function(err){
        console.log(err);
    });
}


function pop_up(message){
    //create new element where the content of the error will be represented
        var check_node = document.createElement("p");
        var check_input = document.createTextNode(message);
        check_node.appendChild(check_input);

        var pop_up = document.getElementById("pop_up");
        var content = document.getElementById("content");
        var button = document.getElementsByClassName("close")[0];

        //insert the error message before the button
        content.insertBefore(check_node, content.firstChild);
        pop_up.style.display = "block";
        
        //when the OK button is clicked then the value that was entered to the input is erased and so is created table
        button.onclick = function () {
            pop_up.style.display = "none";
            content.removeChild(check_node);
        };
}