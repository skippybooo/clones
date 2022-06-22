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

//--------------Highlignt Nav Links--------------------------------

// Get all sections that have an ID defined
const sections = document.querySelectorAll("section[id]");
console.log(sections);

// Add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

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
      console.log(
        document.querySelector(".left-middle a[href*=" + sectionId + "]")
      );
    } else {
      document
        .querySelector(".left-middle a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
}
