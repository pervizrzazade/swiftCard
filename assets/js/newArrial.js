import { getData, setAddToCartHandler, discountCalc, addToWishListHandler } from "./app.js";

const newArrialSec = document.querySelector(".new__arrial__sec");

let allData = [];
let hasVaucherItems = [];

getData().then((data) => {
  allData = data.allItems;
  hasVaucherItems = [
    {
      product: allData.speakers.find((item) => {
        return item.id == 2;
      }),
    },
    {
      product: allData.notebooks.find((item) => {
        return item.id == 2;
      }),
    },
    {
      product: allData.speakers.find((item) => {
        return item.id == 7;
      }),
    },
  ];

  createVaucherArrial(hasVaucherItems);
  addToWishListHandler();
  setAddToCartHandler();
});

function createVaucherArrial(items) {
  newArrialSec.innerHTML += items
    .map((item) => {

      return `
    <div class="new__arrial__wrp">
        <div class="new__arrial__box">
       
        <div class="discount">
            <i class="fa-solid fa-tag"></i>
            <span>-${item.product.discount}%</span>
        </div>
        <div class="heart"  >

            <label class="ui-bookmark">
                <input type="checkbox"  data-prodname="${
                  item.product.prodName
                }" data-disc="${item.product.discount}" />
                <div class="bookmark">
                    <svg viewBox="0 0 16 16" style="margin-top:4px" class="bi bi-heart-fill" width="30"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                            fill-rule="evenodd"></path>
                    </svg>
                </div>
            </label>

        </div>

            <img src="${item.product.img}">
            <div class="new__arrial__content">
                <h2>${item.product.prodName}</h2>
                <div class=prices>
                  <span class="first-price">${item.product.price.toLocaleString(
                    "az-AZ"
                  )}₼</span>
                  <span class="disc-price">${discountCalc(
                    item.product.discount,
                    item.product.price
                  )}₼</span>
                </div>
                    <button class="CartBtn" data-prodname="${
                      item.product.prodName
                    }" data-disc="${item.product.discount}">
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
        </div>
    </div>`;
    })
    .join("");

  VanillaTilt.init(document.querySelectorAll(".new__arrial__box"), {
    max: 10,
    speed: 400,
    glare: true,
    "max-glare": 0.3,
  });
}
