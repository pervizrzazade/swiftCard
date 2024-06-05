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

login.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    valueEmail == JSON.parse(localStorage.userData).email &&
    valuePass == JSON.parse(localStorage.userData).pass
  ) {
    window.location.pathname = "/home.html";
  }
});
