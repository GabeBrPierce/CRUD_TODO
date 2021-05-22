var counter = 3;
class note {
    constructor(text, id, checked = false) {
        this.checked = checked;
        this.text = text;
        this.id = id;
    }
    display() {
        return '<div class="row" ><input type="checkbox" class="checkbox col-1" id = "' + this.id + '"' + (this.checked ? 'checked' : '') + '><div class="col-1">' + this.text + "</div></div>";
    }
}
// test notes
var thing1 = new note("yay!", 1, true);
var thing2 = new note("horay!", 2);
var thing3 = new note("what?", 3)
var todo_list = [thing1, thing2, thing3];
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
        var selected_id = this.id;
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
        todo_list.push(new note($('#newNoteText').val(),counter));
        update();
    });
}
function removeListeners() {
    $("#options").off();
    $(".checkbox").off();
    $("#newNoteButton").off();
}
// start up method
$(function () {
    all();
    removeListeners();
    addListeners();
});
