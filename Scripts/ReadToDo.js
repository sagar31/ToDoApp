var expanded = false;
var ValidToDoList  =[];
var profileImage , UserId , user ="" , todo;
var Categoryvalues ="";
var temptodoid ;

//get valid user list if present in localStorage on load
window.onload = function(){
    if (sessionStorage.IsLoggedIn == undefined ||  sessionStorage.IsLoggedIn == false) {
        window.location.href= "../Views/Login.html";
    } 
    UserId = window.sessionStorage.UserId;
    if (localStorage.getItem("ValidToDoList") !== null) {
        ValidToDoList = JSON.parse(localStorage.getItem("ValidToDoList"));
        todo = ValidToDoList.filter(function(index){
          if(index.ToDoId == localStorage.CurrentToDoItem){
                      return index;
                  }     
          });
        }
        temptodoid = todo[0].ToDoId;
        document.getElementById('output').src= todo[0].ProfileImage;
        profileImage = todo[0].ProfileImage;
        document.getElementById('output').setAttribute("style","height:5%");
        document.getElementById('output').setAttribute("style","width:10%");
        document.getElementById("ToDoItem").value  = todo[0].ToDoItem;
        document.getElementById("Date").value  = todo[0].Date;
        document.getElementById("ReminderDate").value  = todo[0].ReminderDate;
        var status_e = document.getElementById("Status");
        if(todo[0].Status == "Pending"){
            status_e.selectedIndex = 0;
        }
        else{
            status_e.selectedIndex = 1;
        }
        if(todo[0].isPublic == "Yes"){
            document.getElementById("isPublicYes").checked = true;
        }
        else{
            document.getElementById("isPublicNo").checked = true;
        }
        if(todo[0].Reminder == "Yes"){
            document.getElementById("isReminderYes").checked = true;
        }
        else{
            document.getElementById("isReminderNo").checked = true;
        }
        if(todo[0].Categories.split(',').includes('Technical')){
            document.getElementById("Technical").checked = true
        }
        if(todo[0].Categories.split(',').includes('Practical')){
            document.getElementById("Practical").checked = true
        }
        
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


function EditToDoItem(){
   // EditItem();
} 

function ChangeIsReminder(){
    var yescheck = document.getElementById("isReminderYes").checked ;
    if(yescheck == true){
        document.getElementById("divReminderDate").style.display = "block";  
    }
    else{
        document.getElementById("divReminderDate").style.display = "none";  
    }
}

