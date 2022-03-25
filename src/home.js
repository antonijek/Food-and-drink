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
let url = "https://api.openbrewerydb.org/breweries?by_type=micro&per_page=10";
let tenItems;
let x = 0;

fetch(url)
  .then((res) => res.json())
  .then((res) => {
    tenItems = res;
    return tenItems;
  })
  .then((res) => {
    let threeItems = res.slice(x, x + 3);
    threeItems.map((item) => {
      createBox(item);
    });
  });

const createBox = (data) => {
  let box = document.createElement("div");
  box.classList.add("box");
  let paragraf = document.createElement("p");
  paragraf.innerHTML = `Name:<br>${data.name}<br><br>`;
  let paragraf1 = document.createElement("p");
  paragraf1.innerHTML = `City:<br><br>${data.city}`;
  box.appendChild(paragraf);
  box.appendChild(paragraf1);
  let button = document.createElement("button");
  button.innerHTML = "Read more";
  box.appendChild(button);
  boxes.appendChild(box);
};

const increaseX = () => {
  x++;
  if (x === 7) {
    x = 0;
  }
  nextItem();
  console.log(x);
};
const decreaseX = () => {
  x--;
  if (x === 0) {
    x = 7;
  }
  nextItem();
  console.log(x);
};

const nextItem = () => {
  boxes.innerHTML = "";
  tenItems.slice(x, x + 3).map((item) => {
    createBox(item);
  });
};

let leftArrow = document.querySelector(".left-arrow");
leftArrow.addEventListener("click", decreaseX);
let rightArrow = document.querySelector(".right-arrow");
rightArrow.addEventListener("click", increaseX);

let boxes = document.querySelector(".boxes");
let importedHeader = document.querySelector(".header");
importedHeader.appendChild(header.content);
let hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", hamburgerHandler);
let hamburgerSmallScreen = document.querySelector(".hamburger-smallscreen");
