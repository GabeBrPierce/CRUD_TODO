var counter = 3;
class note {
    constructor(text, id, checked = false) {
        this.checked = checked;
        this.text = text;
        this.id = id;
    }
    display() {
        return '<div class="row" id = "' + this.id + '"><input type="checkbox" class="checkbox col-1"' + (this.checked ? 'checked' : '') + '><div class="col-4 to-do-label">' + this.text + "</div><div class='col-2'><button class='primary edit'>edit</button></div><div class='col-2'><button class='primary delete'>delete</button></div></div>";
    }
}


var todo_list = [];
function all() {
    removeListeners();
    $(".list").text('');
    todo_list.forEach(element => {
        $(".list").append(element.display());
    });
    addListeners();
}
function pending() {
    removeListeners();
    $(".list").text('');
    todo_list.forEach(element => {
        if (element.checked == false) {
            $(".list").append(element.display());
        }
    });
    addListeners();
}
function complete() {
    removeListeners();
    $(".list").text('');
    todo_list.forEach(element => {
        if (element.checked == true) {
            $(".list").append(element.display());
        }
    });
    addListeners();
}
function update() {
    switch ($("#options").val()) {
        case "all":
            all();
            break;
        case "pending":
            pending();
            break;
        case "complete":
            complete();
            break;
        default:
            all();
            break;
    }
}
function addListeners() {
    // a switch method nested inside of a change event listener
    // for the select element on the page. It listens for the different values
    // and calls the approprient methods.
    $("#options").change(function () {
        update();
    });
    // listens for a change for any checkbox with the class
    // checkbox, then saves that checkboxe's id and checked value
    // and searches for a note object with the same id and sets it 
    // value.
    $(".checkbox").change(function () {
        var selected_id = $(this).parent().attr('id');
        var selected_value = this.checked;
        todo_list.forEach(element => {
            if (element.id == selected_id) {
                element.checked = selected_value;
            }
        });
        update();
    });
    $("#newNoteButton").click(function (e) {
        counter++;
        todo_list.push(new note($('#newNoteText').val(), counter));
        update();
    });
    $(".edit").click(function () {
        var selected_parent = $(this).parent().parent();
        var old_label = $(selected_parent).find(".to-do-label").text();
        var old_id = $(selected_parent).attr('id');
        selected_parent.text("");
        selected_parent.html('<div class="row" id = "' + old_id + '"><div class="col-4"></div><input type = "text" class="to-do-label" value ="'+ old_label + '">' + "</div><div class='col-2'><button class='primary save'>save</button></div></div>");
        removeListeners();
        addListeners();
    });
    $(".save").click(function () {
        var selected_parent = $(this).parent().parent();
        var new_label = selected_parent.find('.to-do-label').val();
        todo_list.forEach(element => {
            if (element.id == selected_parent.attr('id')){
                element.text = new_label;
            }
        });
        update();
    });
    $(".delete").click(function () {
        var selected_id = $(this).parent().parent().attr('id');
        
        var temp_todo_list = todo_list.filter(function (value, index, arr) {
            return value.id != selected_id;
        });
        todo_list = temp_todo_list;
        update();
    });
}
function removeListeners() {
    $("#options").off();
    $(".checkbox").off();
    $("#newNoteButton").off();
    $(".edit").off();
    $(".delete").off();
    $(".save").off();
}
// start up method
$(function () {
    all();
    removeListeners();
    addListeners();
});
