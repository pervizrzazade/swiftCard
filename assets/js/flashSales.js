import { getData, setAddToCartHandler, discountCalc } from "./app.js";

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const swiperWrp = document.querySelector(".flash__sales .swiper-wrapper");
let allData = [];
let hasVaucherItems = [];

getData().then((data) => {
  allData = data.allItems;
  hasVaucherItems = [
    {
      product: allData.phones.find((item) => {
        return (
          item.prodName == "Apple iPad Pro 12.9 (6th Gen) Wi-Fi 512GB Space"
        );
      }),
    },
    {
      product: allData.phones.find((item) => {
        return item.prodName == "ASUS Zenfone 4 Max (ZC554KL)";
      }),
    },
    {
      product: allData.printers.find((item) => {
        return item.prodName == "Canon Laser Printer i-SENSYS X C1127iF";
      }),
    },
    {
      product: allData.printers.find((item) => {
        return item.prodName == "Canon Laser Printer i-SENSYS X C1333i";
      }),
    },
    {
      product: allData.monitors.find((item) => {
        return item.prodName == "Gaming Monitor LENOVO LEGION Y27f-30";
      }),
    },
    {
      product: allData.monitors.find((item) => {
        return item.prodName == "Philips Gaming 27M1N3200ZA 27 FHD";
      }),
    },
    {
      product: allData.pComp.find((item) => {
        return item.prodName == "HP Pro Tower 400 G9 i7 - 12700 16GB/512PC";
      }),
    },
    {
      product: allData.pComp.find((item) => {
        return item.prodName == "HP 295 G8 MT R5 5600G 8GB/1TB PC 47M55EA";
      }),
    },
  ];

  createVaucherSlider(hasVaucherItems);
  setAddToCartHandler();
});

function createVaucherSlider(items) {
  swiperWrp.innerHTML = items.map((slide) => {
    return `
    <div class="swiper-slide">
      <div class="swiper__content" >
      <div class="discount"><i class="fa-solid fa-tag"></i>-${slide.product.discount}%</div>
      <div class="heart"  >

      <label class="ui-bookmark">
          <input type="checkbox"  data-prodname="${slide.product.prodName}" data-disc="${slide.product.discount}" />
          <div class="bookmark">
              <svg viewBox="0 0 16 16" style="margin-top:4px" class="bi bi-heart-fill" width="30"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                      fill-rule="evenodd"></path>
              </svg>
          </div>
      </label>

  </div>

        <figure>
          <img src="${slide.product.img}" alt="">
          <figcaption class="prod-name">${slide.product.prodName} </figcaption>
          <div class=prices>
            <span class="first-price">${slide.product.price.toLocaleString("az-AZ")}₼</span>
            <span class="disc-price">${discountCalc(slide.product.discount,slide.product.price)}₼</span>
          </div>
        </figure>

        <button class="CartBtn"  data-prodname="${slide.product.prodName}" data-disc="${slide.product.discount}"">
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
    })
    .join("");
  showSlider();
}


let countDownDate = new Date().getTime() + 4 * 24 * 60 * 60 * 1000;
const saveCountDownDate = () => {
  localStorage.setItem("countDownDate", countDownDate);
};

const loadCountDownDate = () => {
  const savedCountDownDate = localStorage.getItem("countDownDate");
  if (savedCountDownDate) {
    countDownDate = parseInt(savedCountDownDate);
  }
};

const updateTimer = () => {
  const now = new Date().getTime();
  const difference = countDownDate - now;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  daysElement.textContent = days;
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;

  if (difference < 0) {
    clearInterval(timerInterval);
    daysElement.textContent = 0;
    hoursElement.textContent = 0;
    minutesElement.textContent = 0;
    secondsElement.textContent = 0;
    document.querySelector(".timer-title").textContent = "Timer sona çatdı";
  }
};

loadCountDownDate();
updateTimer();
saveCountDownDate();

const timerInterval = setInterval(() => {
  updateTimer();
  saveCountDownDate();
}, 1000);

function showSlider() {
  new Swiper(".flashSwiper", {
    effect: "coverflow",
    grabCursor: false,
    centeredSlides: true,
    slidesPerView: "auto",
    
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },

    loop: true,
    simulateTouch:true,
    autoplay: {
      enabled: true,
      delay: 1000,          
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
    centerInsufficientSlides:true,
    speed: 1000,    
  });
}
