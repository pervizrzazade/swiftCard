import { getData, setAddToCartHandler, discountCalc } from "./app.js";

const bestSeller = document.querySelector(".best__seller");

let speakers = [];

getData().then((data) => {
  speakers = data.allItems.speakers;
  createBestSellerproduct(speakers);
  setAddToCartHandler();
});

function createBestSellerproduct(bestSellProd) {
  bestSeller.innerHTML += bestSellProd.map((speakers) => {
    if (speakers.id === 1) {

      return `
      <div class="best__seller__content">
      <div class="best__seller__left">
      <h3 class="left__title">Speaker</h3>
      <div class="best__seller__left__bottom">
      <h5 class="prod__name">${speakers.prodName}</h5>
      <div class=prices>
      <span class="first-price">${speakers.price.toLocaleString("az-AZ")}₼</span>
      <span class="disc-price">${discountCalc(speakers.discount,speakers.price)}₼</span>
    </div>
    <button class="CartBtn"  data-prodname="${speakers.prodName}" data-disc="${speakers.discount}"">
    <span class="IconContainer">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"
            fill="rgb(17, 17, 17)" class="cart">
            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
        </svg>
    </span>
    <p class="text">Shop now</p>
  </button>
      </div>
    </div>
    <div class=best__seller__right>
    <figure>
      <img src="${speakers.img}" alt="${speakers.prodName}">
    </figure>
    </div>
      </div>
      `
    }
  }).join("")
}
