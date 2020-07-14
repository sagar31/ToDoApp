var ValidUserList = [];
var user , profileImage;

window.onload = function(){
  if (sessionStorage.IsLoggedIn == undefined ||  sessionStorage.IsLoggedIn == false) {
    window.location.href= "../Views/Login.html";
  } 
  if (localStorage.getItem("ValidUserList") !== null) {
    ValidUserList = JSON.parse(localStorage.getItem("ValidUserList"));
    user = ValidUserList.filter(function(index){
      if(index.UserId == sessionStorage.UserId){
                  return index;
              }     
      });
    }
    
    document.getElementById('ig').src= user[0].ProfileImage;
    document.getElementById('ig').setAttribute("style","height:100%");
    document.getElementById('ig').setAttribute("style","width:80%");
    document.getElementById("email").innerText  = user[0].UserName;
    document.getElementById("FirstName").innerText  = user[0].FirstName;
    document.getElementById("LastName").innerText  = user[0].LastName;
    document.getElementById("Gender").innerText  = user[0].Gender;
    document.getElementById("Address").innerText  = user[0].Address;
    HideControls()
}

getImageData = function(){

  var input = document.getElementById("ProfileImage");
  var fReader = new FileReader();
  fReader.readAsDataURL(input.files[0]);
   fReader.onloadend = function(event){
      var img = document.getElementById("ProfileImage");
      var output = document.getElementById("ig");
      output.src = URL.createObjectURL(input.files[0]);
      img.src = event.target.result;
      profileImage = img.src;
      
  }
}


function HideControls(){
  document.getElementById("emailEdit").style.display = "none";
  document.getElementById("FirstNameEdit").style.display = "none";
  document.getElementById("LastNameEdit").style.display = "none";
  document.getElementById("GenderEdit").style.display = "none";
  document.getElementById("AddressEdit").style.display = "none";
  document.getElementById("btnsubmit").style.display = "none";
  document.getElementById("btnreset").style.display = "none";
  
}

function UpdateProfile(){
 
  var UserName = document.getElementById("emailEdit").value;
  var FirstName = document.getElementById("FirstNameEdit").value
  var LastName = document.getElementById("LastNameEdit").value
  var Gender = document.getElementById("GenderEdit").value 
  var Address = document.getElementById("AddressEdit").value

  user = ValidUserList.filter(function(index){
    if(index.UserId == sessionStorage.UserId){
                return index;
            }     
    });

    if(profileImage == null || profileImage == undefined || profileImage ==""){
      profileImage = user[0].ProfileImage;
    } 

  function User(first, last, gender,username, address ,profileImage,userid) {
    this.FirstName = first;
    this.LastName = last;
    this.Gender = gender;
    this.UserName = username;
    this.Address = address;
    this.ProfileImage = profileImage;
    this.UserId = userid;
    this.Password = username;
  }
    var createdUser = new User(FirstName, LastName, Gender, UserName,Address,profileImage,user[0].UserId);
    //ValidUserList.push(createdUser);

    var foundIndex = ValidUserList.findIndex(x => x.UserId == user[0].UserId);
    ValidUserList[foundIndex] = createdUser;
    alert('User updated Successfully !!');
    localStorage.setItem("ValidUserList" , JSON.stringify(ValidUserList));
    window.location.reload();

}


function EditProfile(){
  document.getElementById("email").style.display = "none";
  document.getElementById("FirstName").style.display = "none";
  document.getElementById("LastName").style.display = "none";
  document.getElementById("Gender").style.display = "none";
  document.getElementById("Address").style.display = "none";
  document.getElementById("btnreset").style.display = "inline";
  document.getElementById("emailEdit").style.display = "block";
  document.getElementById("FirstNameEdit").style.display = "block";
  document.getElementById("LastNameEdit").style.display = "block";
  document.getElementById("GenderEdit").style.display = "block";
  document.getElementById("AddressEdit").style.display = "block";
  document.getElementById("btnsubmit").style.display = "inline";

  document.getElementById("emailEdit").value  = document.getElementById("email").innerText;
  document.getElementById("FirstNameEdit").value  = document.getElementById("FirstName").innerText;
  document.getElementById("LastNameEdit").value  = document.getElementById("LastName").innerText
  document.getElementById("GenderEdit").value  = document.getElementById("Gender").innerText
  document.getElementById("AddressEdit").value  = document.getElementById("Address").innerText
}

function ResetProfile(){
  document.getElementById("email").style.display = "block";
  document.getElementById("FirstName").style.display = "block";
  document.getElementById("LastName").style.display = "block";
  document.getElementById("Gender").style.display = "block";
  document.getElementById("Address").style.display = "block";
  document.getElementById("btnreset").style.display = "none";
  document.getElementById("emailEdit").style.display = "none";
  document.getElementById("FirstNameEdit").style.display = "none";
  document.getElementById("LastNameEdit").style.display = "none";
  document.getElementById("GenderEdit").style.display = "none";
  document.getElementById("AddressEdit").style.display = "none";
  document.getElementById("btnsubmit").style.display = "none";
  
}


