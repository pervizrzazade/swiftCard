const hamburgerMenu = document.querySelector(".hamburger input");

const nameRegister = document.getElementById("registerName");
const emailRegister = document.getElementById("registerEmail");
const passwordRegister = document.getElementById("registerPassword");
const register = document.querySelector(".submit");

hamburgerMenu.addEventListener("click", () => {
  document.body.classList.toggle("activeBurger");
});

let valueName = "";
nameRegister.addEventListener("input", () => {
  if (nameRegister.value.length > 2) {
    nameRegister.classList.remove("err");
  } else {
    nameRegister.classList.add("err");
  }
  valueName = nameRegister.value;
  valueName
    ? nameRegister.classList.add("fill")
    : nameRegister.classList.remove("fill");
});

let valueEmail = "";
emailRegister.addEventListener("input", () => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regex.test(valueEmail)) {
    emailRegister.classList.remove("err");
  } else {
    emailRegister.classList.add("err");
  }
  valueEmail = emailRegister.value;
  valueEmail
    ? emailRegister.classList.add("fill")
    : emailRegister.classList.remove("fill");
});

let valuePass = "";
passwordRegister.addEventListener("input", () => {
  if (passwordRegister.value.length > 7) {
    passwordRegister.classList.remove("err");
  } else {
    passwordRegister.classList.add("err");
  }
  valuePass = passwordRegister.value;
  valuePass
    ? passwordRegister.classList.add("fill")
    : passwordRegister.classList.remove("fill");
});

console.log(register);

function areAllValuesPresent(obj) {
  return Object.values(obj).every((value) => value);
}
async function setUserData() {
  const userData = {
    name: valueName,
    email: valueEmail,
    pass: valuePass,
  };
  if (areAllValuesPresent(userData)) {

    await fetch('https://66604a0e5425580055b32ea2.mockapi.io/users', {
      method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(userData)
    })

    alert('Siz qeydiyyatdan kecdiz!')

    window.location.pathname = "/login.html";
  }
}

register.addEventListener("click", setUserData);
