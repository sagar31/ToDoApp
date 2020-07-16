 window.onload = function() {
     if (sessionStorage.IsLoggedIn == undefined || sessionStorage.IsLoggedIn == false) {
         window.location.href = "../Views/Login.html";
     }
 }

 function RedirectProfileView() {
     window.location.href = '../Views/ProfileView.html';
 }

 function RedirectToDoView() {
     window.location.href = '../Views/ToDoItem.html';
 }