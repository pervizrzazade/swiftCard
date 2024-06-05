import { getData, setAddToCartHandler, discountCalc } from "./app.js";
const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
const firstSlider = document.querySelector(".home__first__slider .swiper-wrapper");

let allData = [];
let hasVaucherItems = [];

getData().then((data) => {
  allData = data.allItems;
  hasVaucherItems = [
    {
      title: "Up to 40% <br> off Voucher",
      product: allData.notebooks.find(
        (item) => item.prodName == "MSI Thin 15 B12VE-1809XAZ 9S7-16R831-1809"
      ),
    },
    {
      title: "Up to 20% <br> off Voucher",
      product: allData.pComp.find(
        (item) => item.prodName == "Gaming & Design PC i7-12700|16 GB|SSD 1TB|RTX"
      ),
    },
    {
      title: "Up to 12% <br> off Voucher",
      product: allData.monitors.find(
        (item) =>
          item.prodName == "Monitor Dell P2722H (210-AZYZ)"
      ),
    },
    {
      title: "Up to 60% <br> off Voucher",
      product: allData.printers.find(
        (item) => item.prodName == "Printer HP Color LaserJet Pro MFP 4303fdw (5HH67A1)"
      ),
    },
    {
      title: "Up to 18% <br> off Voucher",
      product: allData.phones.find(
        (item) => item.prodName == "Tablet Lenovo TAB M10 X505F (ZA4G0021RU-N)"
      ),
    },
  ];
  createVaucherSlider(hasVaucherItems);
  setAddToCartHandler();
});

function createVaucherSlider(items) {
  let rate = [];
  hasVaucherItems.forEach((item) => {
    let rateCount = parseFloat(item.title.match(/\d+/));
    if (!isNaN(rateCount)) {
      rate.push(rateCount);
    }
  });

  firstSlider.innerHTML = items.map((slide, ind) => {
    return `
    <div class="swiper-slide">
        <div class="swiper-slide__title">
        <h3>${slide.title}</h3>
      </div>
      <div class="swiper__right" >
        <figure>
          <img src="${slide.product.img}" alt="">
          <figcaption class="prod-name">${slide.product.prodName}</figcaption>
          <span class="first-price">${slide.product.price.toLocaleString("az-AZ")} ₼</span>
          <span class="disc-price">${discountCalc(rate[ind],slide.product.price).toLocaleString("az-AZ") + '₼'}</span>
        </figure>

      <button class="CartBtn" data-prodname="${slide.product.prodName}" data-disc="${rate[ind]}">
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
    `;
  }).join('') ;

  showSlider();
}

function showSlider() {
  new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
