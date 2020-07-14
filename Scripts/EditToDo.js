var expanded = false;
var ValidToDoList = [];
var profileImage, UserId, user = "",
    todo;
var Categoryvalues = "";
var temptodoid;
//get valid user list if present in localStorage on load
window.onload = function() {

    if (sessionStorage.IsLoggedIn == undefined || sessionStorage.IsLoggedIn == false) {
        window.location.href = "../Views/Login.html";
    }
    UserId = window.sessionStorage.UserId;
    if (localStorage.getItem("ValidToDoList") !== null) {
        ValidToDoList = JSON.parse(localStorage.getItem("ValidToDoList"));
        todo = ValidToDoList.filter(function(index) {
            if (index.ToDoId == localStorage.CurrentToDoItem) {
                return index;
            }
        });
    }
    temptodoid = todo[0].ToDoId;
    document.getElementById('output').src = todo[0].ProfileImage;
    profileImage = todo[0].ProfileImage;
    document.getElementById('output').setAttribute("style", "height:5%");
    document.getElementById('output').setAttribute("style", "width:10%");
    document.getElementById("ToDoItem").value = todo[0].ToDoItem;
    document.getElementById("Date").value = todo[0].Date;
    document.getElementById("ReminderDate").value = todo[0].ReminderDate;
    var status_e = document.getElementById("Status");
    if (todo[0].Status == "Pending") {
        status_e.selectedIndex = 0;
    } else {
        status_e.selectedIndex = 1;
    }
    if (todo[0].isPublic == "Yes") {
        document.getElementById("isPublicYes").checked = true;
    } else {
        document.getElementById("isPublicNo").checked = true;
    }
    if (todo[0].Reminder == "Yes") {
        document.getElementById("isReminderYes").checked = true;
        document.getElementById("divReminderDate").style.display = "block";
    } else {
        document.getElementById("isReminderNo").checked = true;
        document.getElementById("divReminderDate").style.display = "none";
    }
    if (todo[0].Categories.split(',').includes('Technical')) {
        document.getElementById("Technical").checked = true
    }
    if (todo[0].Categories.split(',').includes('Practical')) {
        document.getElementById("Practical").checked = true
    }

    //Date
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


function EditItem() {

    var ToDoItemtext = document.forms["EditToDo"]["ToDoItem"].value;
    var Date = document.forms["EditToDo"]["Date"].value;
    Categoryvalues = (document.getElementById("Practical").checked == true ? document.getElementById("Practical").value : "");
    Categoryvalues = Categoryvalues + ',' + (document.getElementById("Technical").checked == true ? document.getElementById("Technical").value : "");
    var Categories = Categoryvalues.replace(/^,|,$/g, '');
    var e = document.getElementById("Status");
    var Status = e.options[e.selectedIndex].value;
    var IsReminderYesorNo = (document.forms["EditToDo"]["isReminder"].value == "Yes") ? "Yes" : "No";
    var ReminderDate = document.forms["EditToDo"]["ReminderDate"].value;
    if (IsReminderYesorNo == "No") {
        ReminderDate = "";
    }
    var isPublic = (document.forms["EditToDo"]["isPublic"].value == "Yes") ? "Yes" : "No";

    function ToDoList(todoid, toDoItemtext, categories, date, profileImage, userid, reminder, reminderdate, markdone, ispublic) {
        this.ToDoId = todoid;
        this.ToDoItem = toDoItemtext;
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

    // edit a ToDo object
    var TodoObj = new ToDoList(temptodoid, ToDoItemtext, Categories, Date, profileImage, UserId, IsReminderYesorNo, ReminderDate, Status, isPublic);

    var foundIndex = ValidToDoList.findIndex(x => x.UserId == UserId && x.ToDoId == localStorage.CurrentToDoItem);
    ValidToDoList[foundIndex] = TodoObj;

    localStorage.setItem("ValidToDoList", JSON.stringify(ValidToDoList));
}

function EditToDoItem() {
    var boolvalue = ValidateReminder();
    var catehoryval = ValidateCategory();
    if (!catehoryval) {
        return false;
    }

    if (!boolvalue) {
        return false;
    }
    EditItem();
    alert('To Do item updated Successfully;');
    window.location.assign("../Views/ReadToDo.html");
    return true;

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