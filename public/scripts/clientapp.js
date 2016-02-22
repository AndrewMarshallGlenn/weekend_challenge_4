function addTask(){
    //send task to db
    //append to DOM
    //add completed and remove buttons
    event.preventDefault()
    var values = {};
    $.each($('#taskInput').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });
    //$('#taskList').append('<div class="task"></div>');
    //var $el = $('#taskList').children().last();
    //$el.append(values.tasks + ' :: ');
    //$el.append('<button class="completed">Completed</button><button class="remove">Remove</button>');
    $('#taskInput').find('input[type=text]').val('');
    $.ajax({
        type: 'POST',
        url:'./routes/serverRequests',
        data: values,
        success: function(data) {
            if(data) {
                console.log('from server:', data);
                $('#taskList').children().last().data('id', data.rows[0].id);
                updateDom();
            } else {
                console.log('error');
            }

        }
    });

}

function completeTask(){
    var update = $(this).parent().data();
    $.ajax({
        type: 'PUT',
        url:'./routes/serverRequests',
        data: update,
        success: function(data) {
            if(data) {
                console.log('from server:', data);
            } else {
                console.log('error');
            }

        }
    });
    $(this).addClass('reset');
    $(this).removeClass('completed');
    $(this).text('reset');

}

function removeTask(){
    var remove = $(this).parent().data();
    var answer = window.confirm("Are you sure you want to remove this task?");
    if(answer === true) {
        $.ajax({
            type: 'DELETE',
            url: './routes/serverRequests',
            data: remove,
            success: function (data) {
                if (data) {
                    console.log('from server:', data);
                    updateDom();
                } else {
                    console.log('error');
                }

            }
        });
        $(this).parent().remove();
    }
}

function updateDom(){
    $.ajax({
        type: 'GET',
        url:'./routes/serverRequests',
        success: function(data) {
            $('#taskList').children().remove();
            $('#taskList').append('<h2>Open Tasks</h2>');
            for(var i = 0; i < data.length; i++){
                $('#taskList').append('<div class="task"></div>');
                $el = $('#taskList').children().last();
                $el.append(data[i].task + ' :: ');
                $el.data('id', data[i].id);
                $el.append('<button class="completed">Completed</button><button class="remove">Remove</button>');
            }
            if(data) {
                console.log('from server:', data);
            } else {
                console.log('error');
            }

        }
    });
}

$(document).ready(function(){
    $('#submitButton').on('click', addTask);
    $('#taskList').on('click', '.completed', completeTask);
    $('#taskList').on('click', '.remove', removeTask);
    updateDom();
});