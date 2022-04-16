

const header = document.createElement("template");
header.id = "header";
header.innerHTML = `
  <header class="header">

    <div class="hamburger">
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
    </div>

    <nav>
      <ul>
        <li><a class="current" href="../index.html">Home</a></li>
        <li><a class="current" href="../html/list.html" id="list-a">List</a>
          <ul class="dropdwn-ul">
            <li><a class="regional" href="#">Regional</a></li>
            <li><a class="large" href="#">Large</a></li>
            <li><a class="bar" href="#">Bar</a></li>
          </ul>
        </li>
        <li><a class="current" href="../html/about-us.html">About us</a></li>
        <li><a class="current" href="../html/contact-us.html">Contact us</a></li>
      </ul>
    </nav>

    <a href ='/index.html'> <img src="../images/beer_123784216.png" alt="logo" /></a>

  </header>

  <div class="hamburger-smallscreen">
    <ul>
      <li><a href="../index.html">Home</a></li>
      <li class="ham-dropdwn">
        <a href="../html/list.html">List</a>
        <a id="list-arrow" href="#">
          <i class="fa-solid fa-chevron-down"></i>
        </a>
      </li>
      
      <div id="ham-dropdwn-div" class="hide">
        <ul id="dropdwn-ul">
          <li><a class="regional" href="#">Regional</a></li>
          <li><a class="large" href="#">Large</a></li>
          <li><a class="bar" href="#">Bar</a></li>
        </ul>
      </div>

      <li><a href="../html/about-us.html">About us</a></li>
      <li><a href="../html/contact-us.html">Contact us</a></li>
    </ul>
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

let navRegional = document.querySelectorAll(".regional");
let navLarge = document.querySelectorAll(".large");
let navBar = document.querySelectorAll(".bar");

export function returnRegional() {
  return navRegional;
}
export function returnLarge() {
  return navLarge;
}
export function returnBar() {
  return navBar;
}

let listArrow = document.getElementById('list-arrow');
let hamDropdwnDiv = document.getElementById('ham-dropdwn-div');


listArrow.addEventListener('click', () => { hamDropdwnDiv.classList.toggle('hide'); })

// for active link 
const ActivePage = window.location.pathname;
const navLinks = document.querySelectorAll('.current')
.forEach(link => {
  if(link.href.includes(`${ActivePage}`)) {
    link.classList.add('active');
  }
});
