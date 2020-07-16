var expanded = false;
var validToDoList = [];
var profileImage, userId, user = "",
    todo;
var categoryvalues = "";
var temptodoid;
//get valid user list if present in localStorage on load
window.onload = function() {

    if (sessionStorage.IsLoggedIn == undefined || sessionStorage.IsLoggedIn == false) {
        window.location.href = "../Views/Login.html";
    }
    userId = window.sessionStorage.UserId;
    if (localStorage.getItem("ValidToDoList") !== null) {
        validToDoList = JSON.parse(localStorage.getItem("ValidToDoList"));
        todo = validToDoList.filter(function(index) {
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

    var editToDoForm = document.forms.EditToDo;
    var toDoItemtext = editToDoForm.elements.ToDoItem.value;
    var date = editToDoForm.elements.Date.value;
    categoryvalues = (editToDoForm.elements.Practical.checked == true ? editToDoForm.elements.Practical.value : "");
    categoryvalues = categoryvalues + ',' + (editToDoForm.elements.Technical.checked == true ? editToDoForm.elements.Technical.value : "");
    var categories = categoryvalues.replace(/^,|,$/g, '');
    var e = document.getElementById("Status");
    var status = e.options[e.selectedIndex].value;
    var isReminderYesorNo = (editToDoForm.elements.isReminder.value == "Yes") ? "Yes" : "No";
    var reminderDate = editToDoForm.elements.ReminderDate.value;
    if (isReminderYesorNo == "No") {
        reminderDate = "";
    }
    var isPublic = (editToDoForm.elements.isPublic.value == "Yes") ? "Yes" : "No";

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

    //--------
    // edit a ToDo object
    var todoObj = new ToDoList(temptodoid, toDoItemtext, categories, date, profileImage, userId, isReminderYesorNo, reminderDate, status, isPublic);

    var foundIndex = validToDoList.findIndex(x => x.UserId == userId && x.ToDoId == localStorage.CurrentToDoItem);
    validToDoList[foundIndex] = todoObj;

    localStorage.setItem("ValidToDoList", JSON.stringify(validToDoList));
}

function EditToDoItem() {
    var boolValue = ValidateReminder();
    var categoryVal = ValidateCategory();
    if (!categoryVal) {
        return false;
    }

    if (!boolValue) {
        return false;
    }
    EditItem();
    alert('To Do item updated Successfully;');
    window.location.assign("../Views/ReadToDo.html");
    return true;

}


function ValidateReminder() {
    var editTodoform = document.forms.EditToDo;
    //var yescheck = editTodoform.elements.isReminderYes.checked;
    var val = editTodoform.elements.isReminderYes.checked;
    var dateVal = document.forms.EditToDo.ReminderDate.value; // document.getElementById("ReminderDate").value;
    if (val == true) {
        if (dateVal == "") {
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
    var editTodoform = document.forms.EditToDo;

    var yescheck = editTodoform.elements.isReminderYes.checked;
    if (yescheck == true) {
        document.getElementById("divReminderDate").style.display = "block";
    } else {
        document.getElementById("divReminderDate").style.display = "none";
    }
}

function ValidateCategory() {
    var editTodoform = document.forms.EditToDo;

    var techVal = editTodoform.elements.Technical.checked;
    var pracVal = editTodoform.elements.Practical.checked;
    if (techVal == true || pracVal == true) {
        return true;
    } else {
        alert('Category value is mandatory');
        return false;
    }
}