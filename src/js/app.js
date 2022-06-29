import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

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

// Add an event listener listening for scroll
// window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  // Get current scroll position
  let scrollY = window.pageYOffset;
  // let scrollY = document.getElementById("center").scrollTop;

  // Now we loop through sections to get height, top and ID values for each
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    let sectionId = current.getAttribute("id");

    /*
    - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
    - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
    */
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".left-middle a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".left-middle a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
}
