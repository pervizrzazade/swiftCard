const accountDetail = document.querySelector(".accaunt-details");
const name = localStorage.userName;
let userData;
getUserData();
async function getUserData() {
  userData = await fetch(
    "https://66604a0e5425580055b32ea2.mockapi.io/users"
  ).then((res) => res.json());

  setUserData(userData);
}

function setUserData(userInfo) {
  validationName = () => {
    let nameInp = document.getElementById("name");
    let errorText = document.querySelector(".nameErr");
    if (nameInp.value.length > 2) {
      nameInp.classList.remove("err");
      errorText.classList.remove("active");
    } else {
      nameInp.classList.add("err");
      errorText.classList.add("active");
    }
  };
  validationEmail = () => {
    let emailInp = document.getElementById("email");
    let errorText = document.querySelector(".emailErr");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(emailInp.value)) {
      emailInp.classList.remove("err");
      errorText.classList.remove("active");
    } else {
      emailInp.classList.add("err");
      errorText.classList.add("active");
    }
  };
  validationPass = () => {
    let passInp = document.getElementById("password");
    let errorText = document.querySelector(".passErr");
    if (passInp.value.length > 7) {
      passInp.classList.remove("err");
      errorText.classList.remove("active");
    } else {
      passInp.classList.add("err");
      errorText.classList.add("active");
    }
  };
  accountDetail.innerHTML = userInfo
    .map((user) => {
      if (name == user.name) {
        return `
        <div class="accaunt__info">
                <div class="accaunt__info__top">
                  <h3>Account info</h3>
                  <span class='delete' onclick="deleteUser(${user.id})"> Delete account<i class="fa-solid fa-user-minus"></i></span> 
                </div>
                <div class="name__info">
                    <label for="name">Name</label>
                    <input type="text" oninput="validationName()" id="name" value="${user.name}">
                    <span class="nameErr">Enter your name correctly</span>
                </div>
                <div class="email__info">
                    <label for="email">Email</label>
                    <input type="email" oninput="validationEmail()" name="" id="email" value="${user.email}">
                    <span class="emailErr">Enter your email correctly</span>

                </div>
                <div class="pass__info">
                    <label for="password">Password</label>
                    <input type="password" oninput="validationPass()" name="" id="password" value="${user.pass}">
                    <span class="passErr">Enter your passsword correctly</span>
                </div>
                <div class="accaunt__update">
                    <button class="update" onclick="updateUserData(${user.id})">Update</button>
                </div>
            </div>
        `;
      }
    })
    .join("");
}

 function updateUserData(id) {
  let userName = document.getElementById("name");
  let userEmail = document.getElementById("email");
  let userPass = document.getElementById("password");

  const userData = {
    name: userName.value,
    email: userEmail.value,
    pass: userPass.value,
  };

  fetch(`https://66604a0e5425580055b32ea2.mockapi.io/users//${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("userName", data.name);

      console.log("Success:", data);
      accountDetail.innerHTML = `
    <div class="accaunt__info">
                <h3>Account info</h3>
                <div class="name__info">
                    <label for="name">Name</label>
                    <input type="text"  name="" id="name" value="${data.name}">
                </div>
                <div class="email__info">
                    <label for="email">Email</label>
                    <input type="email" name="" id="email" value="${data.email}">
                </div>
                <div class="pass__info">
                    <label for="password">Password</label>
                    <input type="password" name="" id="password"}">
                </div>
                <div class="accaunt__update">
                    <button class="update" onclick="updateUserData(${data.id})">Update</button>
                </div>
            </div>
        `;
      location.reload();
    })

    .catch((error) => {
      console.error("Error:", error);
    });


}


function deleteUser (id){
  fetch(`https://66604a0e5425580055b32ea2.mockapi.io/users//${id}`, {
    method: 'DELETE'
  }).then(() => {
     alert('Removed account');
     localStorage.removeItem("userName")
     window.location.pathname= '/index.html'
  }).catch(err => {
    console.error(err)
  })
}