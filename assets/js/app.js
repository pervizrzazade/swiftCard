const body = document.querySelector("body");
const hamburgerMenu = document.querySelector(".hamburger input");
const wishList = document.querySelector(".fav__list");
const cardList = document.querySelector(".card__list");
const shopIcon = document.querySelector(".shopping__icon");
const wishlistIcon = document.querySelector(".wishlist__icon");
const wishlistCounter = document.querySelector(".wishlist__counter .count");
const shopCounter = document.querySelector(".shop__counter .count");
//User
const dropDown = document.querySelector(".dropdown");
const dropdownItems = document.querySelector(".dropdown__items");
let logOut = null;
const userNameDisplay = document.querySelector(".user__name");
const registered = `<ul class="registered">
    <li class="profile">Profile <i class="fa-regular fa-user"></i></a></li>
    <li class="log-out"> Log Out <i class="fa-solid fa-power-off"></i></li>
    </ul>`;
const guest = ` <ul class="guest">
    <li><a href="./login.html">Login</a></li>
    <li><a href="./signup.html">Register</a></li>
    </ul>`;
//***** */
const cardClose = document.querySelectorAll(".close__btn");
const totalPrice = document.querySelector(".total__price span");
const confirmCart = document.querySelector(".confirm-cart");
let addToCard = [];
let addToWishlist = [];
let data = [];
let cartItems =
  localStorage.cardData != undefined ? JSON.parse(localStorage.cardData) : [];
let wishlistItem =
  localStorage.wishlistData != undefined
    ? JSON.parse(localStorage.wishlistData)
    : [];


//User tools functions

setUserDropdowTools();
function setUserDropdowTools() {
  let auth = Boolean(localStorage.userName);
  dropdownItems.innerHTML = auth ? registered : guest ;
  logOut = auth ? document.querySelector(".log-out") : null;
  if(auth) logOut.onclick = setLogoutHandler;
  userNameDisplay.textContent = auth ? localStorage.userName : "Guest";
}

dropDown.addEventListener("click", () => {
  dropDown.classList.toggle("active");
});


function setLogoutHandler() {
  localStorage.removeItem('userName');
  setUserDropdowTools();
  console.log("log out");
}


//User tools functions -END-

export const getData = async () => {
  try {
    data = await fetch("../../products/product.JSON").then((res) => res.json());

    return data;
  } catch (error) {
    console.log("Err: " + error);
  }
};
getData();

shopIcon.addEventListener("click", () => {
  body.classList.toggle("activeCard");
  body.classList.remove("activeFav");
});
wishlistIcon.addEventListener("click", () => {
  body.classList.remove("activeCard");
  body.classList.toggle("activeFav");
});

hamburgerMenu.addEventListener("click", () => {
  body.classList.toggle("activeBurger");
});

cardClose.forEach((btn) => {
  btn.addEventListener("click", () => {
    body.classList.remove("activeCard");
    body.classList.remove("activeFav");
  });
});


confirmCart?.addEventListener("click", () => {
  let checkUser = localStorage.getItem("userName");
  console.log(checkUser);
  if (checkUser) {
    window.location.pathname = "/signup.html";
  } else {
    alert("Your cart has been confirmed");
  }
});

export function setAddToCartHandler() {
  addToCard = document.querySelectorAll(".CartBtn");
  addToCard.forEach((btn) => {
    btn.onclick = () => {
      console.log(1);

      let selectData = false;
      Object.values(data.allItems).some((item) => {
        item.some((elem) => {
          if (elem.prodName == btn.dataset.prodname) {
            selectData = {
              ...elem,
              discount: +btn.dataset.disc,
              quantity: 1,
            };
          }
        });

        return selectData ? true : false;
      });

      checkDoubleItem(selectData);
      localStorage.setItem("cardData", JSON.stringify(cartItems));
      showCardItems(cartItems);
    };
  });

  checkItemsState();
}

export function addToWishListHandler() {
  addToWishlist = document.querySelectorAll(".heart input");

  addToWishlist.forEach((btn) => {
    btn.onclick = () => {
      let selectData = false;
      console.log(selectData);
      Object.values(data.allItems).some((item) => {
        item.some((elem) => {
          if (elem.prodName == btn.dataset.prodname) {
            selectData = {
              ...elem,
              discount: +btn.dataset.disc,
              wishlist: true,
            };
          }
        });

        return selectData ? true : false;
      });
      checkWishlist(selectData);
      console.log(wishlistItem);

      localStorage.setItem("wishlistData", JSON.stringify(wishlistItem));
      showWishlistItems(wishlistItem);
      setAddToCartHandler();
    };
  });
}

function checkWishlist(selectData) {
  let double = false;
  wishlistItem = wishlistItem.filter((item) => {
    if (item.prodName == selectData.prodName) {
      double = true;
    } else return item;
  });
  !double && wishlistItem.push(selectData);
}

function checkDoubleItem(selectData) {
  let double = false;
  cartItems = cartItems.map((item) => {
    if (item.prodName == selectData.prodName) {
      double = true;
      item.quantity += 1;
    }
    return item;
  });
  !double && cartItems.push(selectData);
}

export function discountCalc(discount, price) {
  return parseInt(price - (price * discount) / 100);
}



function showCardItems(cartItems) {
  cardList.innerHTML = cartItems.length
    ? cartItems
        .map((product) => {
          return `
  <li class="cart__item">
    <h3>${product.prodName}</h3>
    <i class="fa-solid fa-trash trash"></i>
    <h5>${
      (
        discountCalc(product.discount, product.price) * product.quantity
      ).toLocaleString("az-AZ") + "₼"
    }</h5>
    <div>
      <img src=${product.img}>
      <button class="dec">-</button>
      <span>${product.quantity}</span>
      <button class="inc">+</button>
    </div>
  </li>
  `;
        })
        .join("")
    : '<li class="empty">Empty Cart</li>';

  document
    .querySelectorAll(".card__list  .cart__item")
    .forEach((item, index) => {
      let btns = item.querySelectorAll("button");
      let trash = item.querySelector(".trash");
      trash.onclick = () => {
        cartItems.splice(index, 1);
        localStorage.setItem("cardData", JSON.stringify(cartItems));
        showCardItems(cartItems);
      };
      btns.forEach((elem) => {
        if (elem.classList.contains("dec") && cartItems[index].quantity == 1)
          elem.disabled = true;
        elem.onclick = () => {
          let quantity = elem.classList.contains("inc")
            ? ++cartItems[index].quantity
            : --cartItems[index].quantity;
          elem.disabled = false;

          if (quantity < 1) {
            elem.disabled = true;
            cartItems[index].quantity = 1;
            return;
          } else changePriceHandler(quantity, index);
        };
      });
    });
  shopCounter.textContent = cartItems.length;
  totalPrice.textContent =
    "Total: " +
    cartItems
      .reduce((accum, currentValue) => {
        return (accum +=
          discountCalc(currentValue.discount, currentValue.price) *
          currentValue.quantity);
      }, 0)
      .toLocaleString("az-AZ") +
    "₼";
}

function changePriceHandler(quantity, index) {
  cartItems[index].quantity = quantity;
  localStorage.setItem("cardData", JSON.stringify(cartItems));
  showCardItems(cartItems);
}
showCardItems(cartItems);

showWishlistItems(wishlistItem);

function showWishlistItems(wishListItems) {
  wishList.innerHTML = wishListItems.length
    ? wishListItems
        .map((item) => {
          let checked = item.wishlist && "checked";
          return `
    <li class="fav__item">

    <div class="fav__item__top">
        <h3>${item.prodName}</h3>
        <div class="heart ">
            <label class="ui-bookmark">
                <input type="checkbox" ${checked} data-prodname="${
            item.prodName
          }" data-disc="${item.discount}" />
                <div class="bookmark">
                    <svg viewBox="0 0 16 16" style="margin-top:4px" class="bi bi-heart-fill" width="30"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                            fill-rule="evenodd"></path>
                    </svg>
                </div>
            </label>
        </div>
    </div>
        <div class="fav__item__bottom">
            <h5>${
              discountCalc(item.discount, item.price).toLocaleString("az-AZ") +
              "₼"
            }</h5>
            <img src=${item.img}>

            <button class="CartBtn" data-prodname="${
              item.prodName
            }" data-disc="${item.discount}">
                <span class="IconContainer">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"
                        fill="rgb(17, 17, 17)" class="cart">
                        <path
                            d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z">
                        </path>
                    </svg>
                </span>
                <p class="text">Add to Cart</p>
            </button>
        </div>
</li>
  `;
        })
        .join("")
    : '<li class="empty">Empty Wishlist</li>';

  wishlistCounter.textContent = wishListItems.length;
  checkItemsState();
  addToWishListHandler();
}

function checkItemsState() {
  let allWishlistIcon = document.querySelectorAll(".heart input");

  allWishlistIcon.forEach((elem) => {
    if (wishlistItem.length) {
      elem.checked = wishlistItem.some(
        (item) => elem.dataset.prodname == item.prodName
      );
    } else elem.checked = false;
  });
}
