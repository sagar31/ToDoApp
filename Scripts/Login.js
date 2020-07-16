var validUserList = [];
var userName = "",
    password = "";

window.onload = (function() {
    if (sessionStorage.IsLoggedIn == "true") {

        window.location.href = "../Views/ProfileDashboard.html";
    }
    if (localStorage.getItem("ValidUserList") !== null) {
        validUserList = JSON.parse(localStorage.getItem("ValidUserList"));
    }
})();

function checkLogin() {


    var loginForm = document.forms.ToDoLogin;
    userName = loginForm.elements.email.value;
    password = loginForm.elements.pwd.value;
    var validUser;
    validUserList.forEach(function(index) {
        if (index.UserName == userName && index.Password == password) {
            validUser = true;
        }
    })
    if (validUser == true) {

        // Set SessionStorage()
        SetSessionStoorageLoggedIn();
        window.location.assign('../Views/ProfileDashboard.html');
        return false;

    } else {
        alert('Password /UserName is Incorrect !!');
    }
}


function SetSessionStoorageLoggedIn() {

    var user = validUserList.filter(function(index) {
        if (index.UserName == userName && index.Password == password) {
            return index;
        }

    });
    sessionStorage.IsLoggedIn = true;
    sessionStorage.UserId = user[0].UserId;
}
//./