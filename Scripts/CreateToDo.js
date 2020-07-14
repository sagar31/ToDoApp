var expanded = false;
var ValidToDoList = [];
var profileImage, UserId, user = "";
var Categoryvalues = "";
//get valid user list if present in localStorage on load
window.onload = function() {
    if (sessionStorage.IsLoggedIn == undefined || sessionStorage.IsLoggedIn == false) {
        window.location.href = "../Views/Login.html";
    }
    UserId = window.sessionStorage.UserId;
    if (localStorage.getItem("ValidToDoList") !== null) {
        ValidToDoList = JSON.parse(localStorage.getItem("ValidToDoList"));
    }

    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("Date")[0].setAttribute('min', today);
    document.getElementsByName("ReminderDate")[0].setAttribute('min', today);
}


function showCheckboxesForm() {
    var checkboxes = document.getElementById("showCheckboxesForm");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}


function CreateItem() {

    var ToDoItemtext = document.forms["CreateToDo"]["ToDoItem"].value;
    var Date = document.forms["CreateToDo"]["Date"].value;
    Categoryvalues = (document.getElementById("Practical").checked == true ? document.getElementById("Practical").value : "");
    Categoryvalues = Categoryvalues + ',' + (document.getElementById("Technical").checked == true ? document.getElementById("Technical").value : "");
    var Categories = Categoryvalues.replace(/^,|,$/g, '');
    var e = document.getElementById("Status");
    var Status = e.options[e.selectedIndex].value;
    var IsReminderYesorNo = (document.forms["CreateToDo"]["isReminder"].value == "Yes") ? "Yes" : "No";
    var ReminderDate = document.forms["CreateToDo"]["ReminderDate"].value;
    if (IsReminderYesorNo == "No") {
        ReminderDate = "";
    }
    var isPublic = (document.forms["CreateToDo"]["isPublic"].value == "Yes") ? "Yes" : "No";

    function ToDoList(todoid, toDoItemtext, categories, date, profileImage, userid, reminder, reminderdate, markdone, ispublic) {
        this.ToDoId = todoid;
        this.ToDoItem = toDoItemtext
        this.Categories = categories;
        //this.UserName = username;
        this.Date = date;
        this.ProfileImage = profileImage;
        this.UserId = userid;
        this.Reminder = reminder;
        this.ReminderDate = reminderdate;
        this.Status = markdone;
        this.isPublic = ispublic;
    }

    // Create a ToDo object
    var TodoObj = new ToDoList(getNextToDoId() + 1, ToDoItemtext, Categories, Date, profileImage, UserId, IsReminderYesorNo, ReminderDate, Status, isPublic);

    ValidToDoList.push(TodoObj);
    localStorage.setItem("ValidToDoList", JSON.stringify(ValidToDoList));

}



function ValidateReminder() {
    var val = document.getElementById("isReminderYes").checked;
    var dateval = document.getElementById("ReminderDate").value;
    if (val == true) {
        if (dateval == "") {
            alert('Reminder date is mandatory');
            return false;
        }
        return true;
    } else {
        return true;
    }
}

function ValidateCategory() {
    var techval = document.getElementById("Technical").checked;
    var pracval = document.getElementById("Practical").checked;
    if (techval == true || pracval == true) {
        return true;
    } else {
        alert('Category value is mandatory');
        return false;
    }
}





function CreateToDoItem() {
    var boolvalue = ValidateReminder();
    if (!boolvalue) {
        return false;
    }
    var catehoryval = ValidateCategory();
    if (!catehoryval) {
        return false;
    }

    CreateItem();
    window.location.assign("../Views/ToDoItem.html");
    alert('To Do item created Successfully;');
    return true;
}

function getNextToDoId() {
    if (ValidToDoList.length == 0) {
        return 0;
    } else {
        var arr = ValidToDoList.filter(function(counter) {
            return counter.UserId == UserId;
        });
        if (arr.length == 0 || arr == null) {
            return 0;
        }
        return Math.max.apply(Math, arr.map(function(o) { return o.ToDoId }))
    }

}


getImageData = function() {

    var input = document.getElementById("ProfileImage");
    var fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function(event) {
        var img = document.getElementById("ProfileImage");
        var output = document.getElementById("output");
        output.src = URL.createObjectURL(input.files[0]);
        img.src = event.target.result;
        profileImage = img.src;

    }
}

function ChangeIsReminder() {
    var yescheck = document.getElementById("isReminderYes").checked;
    if (yescheck == true) {
        document.getElementById("divReminderDate").style.display = "block";
    } else {
        document.getElementById("divReminderDate").style.display = "none";
    }
}