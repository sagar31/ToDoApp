'use Strict'
var validUserList = [];
var profileImage = "";
//get valid user list if present in localStorage on load
window.onload = function() {

    if (sessionStorage.IsLoggedIn == "true") {

        window.location.href = "../Views/ProfileDashboard.html";
    }
    if (localStorage.getItem("ValidUserList") !== null) {
        validUserList = JSON.parse(localStorage.getItem("ValidUserList"))
    }
}


function CreateUser() {
    var registrationForm = document.forms.CreateUser;
    var userName = registrationForm.elements.email.value;
    var firstName = registrationForm.elements.FirstName.value;
    var lastName = registrationForm.elements.LastName.value;
    var gender = registrationForm.elements.Gender.value;
    var address = registrationForm.elements.Address.value;


    //constructor function for User
    function User(first, last, gender, username, address, profileImage, userId) {
        this.FirstName = first;
        this.LastName = last;
        this.Gender = gender;
        this.UserName = username;
        this.Address = address;
        this.ProfileImage = profileImage;
        this.UserId = userId;
        this.Password = username;
    }

    // Create a Person object
    var createdUser = new User(firstName, lastName, gender, userName, address, profileImage, getNextUserId() + 1);

    validUserList.push(createdUser);
    alert('User created Successfully;');
    localStorage.setItem("ValidUserList", JSON.stringify(validUserList));


}

function checkRegistration() {
    var boolValue = CheckUserNameAvailable();
    if (boolValue == false) {
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
        validUserList = JSON.parse(localStorage.getItem("ValidUserList"));
        var usernametemp = validUserList.filter(function(index) {
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
    if (validUserList == null || validUserList.length == 0) {
        return 0;
    } else {
        return Math.max.apply(Math, validUserList.map(function(o) { return o.UserId; }))
    }

}