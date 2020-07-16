var expanded = false;
var validToDoList = [];
var profileImage, userId, user = "";
var categoryvalues = "";
//get valid user list if present in localStorage on load
window.onload = function() {
    if (sessionStorage.IsLoggedIn == undefined || sessionStorage.IsLoggedIn == false) {
        window.location.href = "../Views/Login.html";
    }
    userId = window.sessionStorage.UserId;
    if (localStorage.getItem("ValidToDoList") !== null) {
        validToDoList = JSON.parse(localStorage.getItem("ValidToDoList"));
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
    var createToDoForm = document.forms.CreateToDo;
    var toDoItemtext = createToDoForm.elements.ToDoItem.value; //document.forms["CreateToDo"]["ToDoItem"].value;
    var date = createToDoForm.elements.Date.value; //document.forms["CreateToDo"]["Date"].value;
    categoryvalues = (document.getElementById("Practical").checked == true ? document.getElementById("Practical").value : "");
    categoryvalues = categoryvalues + ',' + (document.getElementById("Technical").checked == true ? document.getElementById("Technical").value : "");
    var categories = categoryvalues.replace(/^,|,$/g, '');
    var e = document.getElementById("Status");
    var status = e.options[e.selectedIndex].value;
    var isReminderYesorNo = (createToDoForm.elements.isReminder.value == "Yes") ? "Yes" : "No";
    var reminderDate = createToDoForm.elements.ReminderDate.value; // document.forms["CreateToDo"]["ReminderDate"].value;
    if (isReminderYesorNo == "No") {
        reminderDate = "";
    }
    var isPublic = (createToDoForm.elements.isPublic.value == "Yes") ? "Yes" : "No";

    function ToDoList(todoid, toDoItemtext, categories, date, profileImage, userId, reminder, reminderdate, markdone, ispublic) {
        this.ToDoId = todoid;
        this.ToDoItem = toDoItemtext
        this.Categories = categories;
        //this.UserName = username;
        this.Date = date;
        this.ProfileImage = profileImage;
        this.UserId = userId;
        this.Reminder = reminder;
        this.ReminderDate = reminderdate;
        this.Status = markdone;
        this.isPublic = ispublic;
    }

    // Create a ToDo object
    var todoObj = new ToDoList(getNextToDoId() + 1, toDoItemtext, categories, date, profileImage, userId, isReminderYesorNo, reminderDate, status, isPublic);

    validToDoList.push(todoObj);
    localStorage.setItem("ValidToDoList", JSON.stringify(validToDoList));

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
    var techVal = document.getElementById("Technical").checked;
    var pracVal = document.getElementById("Practical").checked;
    if (techVal == true || pracVal == true) {
        return true;
    } else {
        alert('Category value is mandatory');
        return false;
    }
}





function CreateToDoItem() {
    var boolValue = ValidateReminder();
    if (!boolValue) {
        return false;
    }
    var categoryVal = ValidateCategory();
    if (!categoryVal) {
        return false;
    }

    CreateItem();
    window.location.assign("../Views/ToDoItem.html");
    alert('To Do item created Successfully;');
    return true;
}

function getNextToDoId() {
    if (validToDoList.length == 0) {
        return 0;
    } else {
        var arr = validToDoList.filter(function(counter) {
            return counter.UserId == userId;
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
    var yesCheck = document.getElementById("isReminderYes").checked;
    if (yesCheck == true) {
        document.getElementById("divReminderDate").style.display = "block";
    } else {
        document.getElementById("divReminderDate").style.display = "none";
    }
}