console.log('js sourced');
$(document).ready(readyNow);

function readyNow() {
    refreshTask();
    $('#addBtn').on('click', addClicked);
    $('#viewTask').on('click', '.deleteBtn', deleteClicked);
    $('#viewTask').on('click', '.completeBtn', completeClicked);
    $('tr').on('click', changebackground);
}


// Add Task button
function addClicked() {
    //console.log('in addClicked btn');
    var taskName = $('#taskIn').val();  // set var equal to input values
    console.log('add your task:', taskName);
    var objectToSend = {         // Create an object of task to send to server
        name: taskName
    }
    //console.log('objectToSend:', objectToSend);
    // Set input back to empty
    $('#taskIn').val('');   
    // Make ajax call to server
    $.ajax({
        type:'POST',
        url: '/task',
        data: objectToSend
    })
    .done(function (response){
        console.log('back from server for POST', response);   // Handle success response
        refreshTask();
        
    })
    .fail(function (message){
        console.log('Error message from server for POST', message);  // Handle fail response
        
    });
}

// Create Refresh function 
function refreshTask() {
    $.ajax({
        type: 'GET',
        url: '/task',
    })
    .done(function (response){
        var taskList = response;
        console.log('taskList', taskList);
        appendTask(taskList);
    })
    .fail(function (error){
        alert('Task list didnt refresh', error);
    });
}

// Create Append function to display all tasks in the table
function appendTask(tasks){
    $('#viewTask').empty();
    // Loop through tasks and append to DOM
    for (var i = 0; i < tasks.length; i+=1){
        var task = tasks[i];
        var $tr = $('<tr></tr>');
        //console.log(task.task);
        $tr.data('task', task);
        $tr.append('<td>' + task.task + '</td>');
        $tr.append('<td><button class="deleteBtn" class="btn btn-delete" data-id="' + task.id + '">Delete</button></td>');
        $tr.append('<td><button class="completeBtn" class="btn btn-complete" data-id="' + task.id + '">Complete</button></td>');
        $('#viewTask').append($tr);
    }
}

function deleteClicked(){
    var taskId = $(this).data('id');
    console.log('Delete task with this id', taskId);
    $.ajax({
        type: 'DELETE',
        url: '/task/' + taskId,
    })
    .done(function (response) {
        console.log('back from server for DELETE', response);
        if( confirm('Are you sure?')){
        }
        refreshTask();
    })
    .fail(function(error){
        console.log('Error message from server for DELETE', error);
        
    })
}

var $todolist = $('#viewTask');

function completeClicked() {
    var taskId = $(this).data('id');

    if (this.style.background == "" || this.style.background == "white") {
        ($(this).closest('tr').css('background', 'green'));
    }
    else {
        ($(this).closest('tr').css('background', 'white'));
    }
}

