var ValidUserList = [];
var UserName = "",
    Password = "";

window.onload = (function() {
    if (sessionStorage.IsLoggedIn == "true") {

        window.location.href = "../Views/ProfileDashboard.html";
    }
    if (localStorage.getItem("ValidUserList") !== null) {
        ValidUserList = JSON.parse(localStorage.getItem("ValidUserList"));
    }
})();

function checkLogin() {

    UserName = document.forms["ToDoLogin"]["email"].value;
    Password = document.forms["ToDoLogin"]["pwd"].value;
    var validuser;
    ValidUserList.forEach(function(index) {
        if (index.UserName == UserName && index.Password == Password) {
            validuser = true;
        }
    })
    if (validuser == true) {

        // Set SessionStorage()
        SetSessionStoorageLoggedIn();
        window.location.assign('../Views/ProfileDashboard.html');
        return false;

    } else {
        alert('Password /UserName is Incorrect !!');
    }
}


function SetSessionStoorageLoggedIn() {

    var user = ValidUserList.filter(function(index) {
        if (index.UserName == UserName && index.Password == Password) {
            return index;
        }

    });
    sessionStorage.IsLoggedIn = true;
    sessionStorage.UserId = user[0].UserId;
}
//./