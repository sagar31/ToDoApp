function Logout(){
   window.sessionStorage.clear();
   //localStorage.removeItem("IsLoggedIn");
   //localStorage.removeItem("UserName");
   //localStorage.removeItem("UserId");
   window.location.href = '../Views/Login.html';
}