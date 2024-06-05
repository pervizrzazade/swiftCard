const hamburgerMenu = document.querySelector(".hamburger input");

const emailLogin = document.getElementById("emailLogin");
const passwordLogin = document.getElementById("passwordLogin");
const login = document.querySelector(".submit");

hamburgerMenu.addEventListener("click", () => {
  document.body.classList.toggle("activeBurger");
});

let valueEmail = "";

emailLogin.addEventListener("input", () => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regex.test(valueEmail)) {
    emailLogin.classList.remove("err");
  } else {
    emailLogin.classList.add("err");
  }
  valueEmail = emailLogin.value;
  valueEmail
    ? emailLogin.classList.add("fill")
    : emailLogin.classList.remove("fill");
});

let valuePass = "";
passwordLogin.addEventListener("input", () => {
  if (passwordLogin.value.length > 7) {
    passwordLogin.classList.remove("err");
  } else {
    passwordLogin.classList.add("err");
  }
  valuePass = passwordLogin.value;
  valuePass
    ? passwordLogin.classList.add("fill")
    : passwordLogin.classList.remove("fill");
});

login.addEventListener("click", async (e) => {
  e.preventDefault();
  let users = await fetch('https://66604a0e5425580055b32ea2.mockapi.io/users').then(res => res.json());
  let error = true;
  users.forEach(user => {
    if(valueEmail == user.email && valuePass == user.pass) {
      error = false;
      localStorage.setItem('userName', user.name);
      window.location.pathname = "/index.html";
    }
  });

  if(error) alert('email ve ya parol yanlishdir')

  
});
