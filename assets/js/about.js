function counterStart() {
    let valueDisplays = document.querySelectorAll(".counter_num");
  
    valueDisplays.forEach((valueDisplay) => {
      let startValue = 0;
      let endValue = parseInt(valueDisplay.getAttribute("data-val"));
      let step = Math.ceil(endValue / 100);
      let counter = setInterval(function () {
        startValue += step;
        valueDisplay.textContent = startValue;
        if (startValue >= endValue) {
          clearInterval(counter);
          valueDisplay.textContent = endValue;
        }
      }, 0);
    });
  }
  


  document.addEventListener("DOMContentLoaded", () => {
    let section = document.querySelector(".counter_section");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            counterStart();
            observer.unobserve(entry.target); 
          }
        });
      },
      {threshold: 0.8}
    );
    observer.observe(section);
  });
  
