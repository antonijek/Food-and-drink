const header = document.createElement("template");
header.id = "header";
header.innerHTML = `
     <header>
     <div class="hamburger">
     <div class="bar1"></div>
     <div class="bar2"></div>
     <div class="bar3"></div>
   </div>
  <nav>
    <a href="#">Home</a>
    <a href="#">List</a>
    <a href="#">About us</a>
    <a href="#">Custom page</a>
    <a href="#">Another</a>
  </nav>
 <a href ='#'> <img src="./images/beer_123784216.png" alt="logo" /></a>
</header>
<div class="hamburger-smallscreen">
          <a href="#">Home</a>
          <a href="#">List</a>
          <a href="#">About us</a>
          <a href="#">Custom page</a>
          <a href="#">Another</a>
        </div>
`;
const openHamburger = (element) => {
  element.classList.toggle("change");
};
const isHamburgerOpen = (elem1, elem2) => {
  elem1.classList.contains("change")
    ? (elem2.style.visibility = "visible")
    : (elem2.style.visibility = "hidden");
};
const hamburgerHandler = () => {
  openHamburger(hamburger);
  isHamburgerOpen(hamburger, hamburgerSmallScreen);
};
let importedHeader = document.querySelector(".header");
importedHeader.appendChild(header.content);
let hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", hamburgerHandler);
let hamburgerSmallScreen = document.querySelector(".hamburger-smallscreen");
