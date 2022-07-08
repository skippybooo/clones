import * as flsFunctions from "./modules/functions.js";
import Swiper, {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper";

flsFunctions.isWebp();

window.onload = () => {
  //-------------Smooth Scrolling on Buttons Clicks ---------------------------

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  //---------------Add Scroll Event Listener with Multiple Calbacks-----

  window.addEventListener("scroll", () => {
    doughnutAnimate(), navHighlighter();
  });

  //---------------Animate Doughnuts-------------------------------

  let doughnuts = document.querySelectorAll(".product-item__chart-circle");

  function doughnutAnimate() {
    // doughnuts = document.querySelectorAll(".product-item__chart-circle");
    for (let i = 0; i < doughnuts.length; i++) {
      let windowHeight = window.innerHeight;
      let elementTop = doughnuts[i].getBoundingClientRect().top;
      let elementVisible = 0;
      if (elementTop < windowHeight - elementVisible) {
        doughnuts[i].classList.add("animate-doughnut");
      } else {
        doughnuts[i].classList.remove("animate-doughnut");
      }
    }
  }

  //--------------Highlignt Nav Links--------------------------------

  // Get all sectionn wrappers by their className
  const sections = document.querySelectorAll(".product-item__wrapper");
  let activeNavlink = null;

  function navHighlighter() {
    // Get current scroll position
    let scrollYWindow = window.pageYOffset;

    // Now we loop through sections to get height, top and ID values for each
    sections.forEach((currentSection) => {
      const sectionHeight = currentSection.offsetHeight;
      const sectionTop = currentSection.offsetTop - 24;
      let sectionId = currentSection.getAttribute("id");

      /*
      - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
      - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
      */
      if (
        scrollYWindow > sectionTop &&
        scrollYWindow <= sectionTop + sectionHeight
      ) {
        activeNavlink = document.querySelector(
          ".left-middle a[href*=" + sectionId + "]"
        );

        activeNavlink.classList.add("active");
        activeNavlink.scrollIntoView({ block: "center", behavior: "smooth" });
      } else {
        document
          .querySelector(".left-middle a[href*=" + sectionId + "]")
          .classList.remove("active");
      }
    });
  }

  //--------------Accordion--------------

  function initAcc(elem, option) {
    //addEventListener on mouse click
    document.addEventListener("click", function (e) {
      //check is the right element clicked
      if (!e.target.matches(elem + " .accordion__header")) return;
      else {
        //check if element contains active class
        if (!e.target.parentElement.classList.contains("active")) {
          if (option == true) {
            //if option true remove active class from all other accordions
            let elementList = document.querySelectorAll(
              elem + " .accordion__container"
            );
            Array.prototype.forEach.call(elementList, function (e) {
              e.classList.remove("active");
            });
          }
          //add active class on cliked accordion
          e.target.parentElement.classList.add("active");
        } else {
          //remove active class on cliked accordion
          e.target.parentElement.classList.remove("active");
        }
      }
    });
  }

  //activate accordion function
  initAcc(".accordion", false);

  //--------------Swiper-----------------------------

  let swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    modules: [Navigation, Pagination, EffectCoverflow, Autoplay],
    // autoHeight: true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1.89,
    loop: true,
    coverflowEffect: {
      rotate: 0,
      scale: 1,
      stretch: 77.5,
      depth: 100,
      modifier: 1.8,
      slideShadows: false,
    },
    navigation: {
      nextEl: ".swiper-button-next0",
      prevEl: ".swiper-button-prev0",
    },
    pagination: {
      el: ".swiper-pagination0",
      clickable: true,
    },
    autoplay: {
      delay: 2100,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
  });

  let itemSwipers = [];

  let swipersCount = document.querySelectorAll(".product-item__slider").length;

  for (let i = 1; i < swipersCount + 1; i++) {
    itemSwipers[i] = new Swiper(".swiper" + i, {
      modules: [Navigation, Pagination, EffectCoverflow, Autoplay],
      spaceBetween: 0,
      // loop: true,
      navigation: {
        nextEl: ".swiper-button-next" + i,
        prevEl: ".swiper-button-prev" + i,
      },
      pagination: {
        el: ".swiper-pagination" + i,
        clickable: true,
      },
      autoplay: {
        delay: 2100,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      },
    });
    console.log(itemSwipers[i]);
  }
};
