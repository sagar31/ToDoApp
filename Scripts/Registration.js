'use Strict'
var ValidUserList = [];
var profileImage = "";
//get valid user list if present in localStorage on load
window.onload = function() {

    if (sessionStorage.IsLoggedIn == "true") {

        window.location.href = "../Views/ProfileDashboard.html";
    }
    if (localStorage.getItem("ValidUserList") !== null) {
        ValidUserList = JSON.parse(localStorage.getItem("ValidUserList"))
    }
}

function CreateUser() {
    var UserName = document.forms["CreateUser"]["email"].value;
    var FirstName = document.forms["CreateUser"]["FirstName"].value;
    var LastName = document.forms["CreateUser"]["LastName"].value;
    var Gender = document.forms["CreateUser"]["Gender"].value;
    var Address = document.forms["CreateUser"]["Address"].value;


    //constructor function for User
    function User(first, last, gender, username, address, profileImage, userid) {
        this.FirstName = first;
        this.LastName = last;
        this.Gender = gender;
        this.UserName = username;
        this.Address = address;
        this.ProfileImage = profileImage;
        this.UserId = userid;
        this.Password = username;
    }

    // Create a Person object
    var createdUser = new User(FirstName, LastName, Gender, UserName, Address, profileImage, getNextUserId() + 1);

    ValidUserList.push(createdUser);
    alert('User created Successfully;');
    localStorage.setItem("ValidUserList", JSON.stringify(ValidUserList));


}

function checkRegistration() {
    var boolvalue = CheckUserNameAvailable();
    if (boolvalue == false) {
        alert('Username is taken. Try with a different username');
        return false;
    }
    CreateUser();
}

function CheckUserNameAvailable() {

    if (localStorage.getItem("ValidUserList") == null || localStorage.ValidUserList == undefined) {
        return true;
    }

    if (localStorage.getItem("ValidUserList") !== null) {
        ValidUserList = JSON.parse(localStorage.getItem("ValidUserList"));
        var usernametemp = ValidUserList.filter(function(index) {
            if (index.UserName == document.getElementById("email").value) {
                return index;
            }
        });
    }
    if (usernametemp.length == 0) {
        return true;
    } else {
        return false;
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

function getNextUserId() {
    if (ValidUserList == null || ValidUserList.length == 0) {
        return 0;
    } else {
        return Math.max.apply(Math, ValidUserList.map(function(o) { return o.UserId; }))
    }

}