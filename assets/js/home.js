const dropDown = document.querySelector(".dropdown");
const profile = document.querySelector(".profile");
const logOut = document.querySelector(".log-out");
console.log(logOut)


dropDown.addEventListener("click",()=>{
    dropDown.classList.toggle("active")
})

logOut.addEventListener("click",()=>{
    window.location.pathname = "/index.html";
    console.log("log out")
})