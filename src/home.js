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
let apiUrl =
  "https://api.openbrewerydb.org/breweries?by_type=micro&per_page=10";
let tenItemsFromResponse;
let x = 0;
let numberOfBoxes = 3;
let numberOfBoxesForMObile = 1;

fetch(apiUrl)
  .then((res) => res.json())
  .then((res) => {
    tenItemsFromResponse = res.slice();
    hendlerResponse(
      res,
      window.innerWidth > "480" ? numberOfBoxes : numberOfBoxesForMObile
    );
  });

const hendlerResponse = (data, num) => {
  console.log(data);
  let threeItems = data.slice(x, x + num);
  threeItems.map((item) => {
    createBox(item);
  });
};

//change names inside createBox
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
//create variables instead 7  and 3

const increaseX = () => {
  x++;
  if (x === 10) {
    x = 0;
  }

  nextItem();
  console.log(x);
};
const decreaseX = () => {
  if (x === 0) {
    x = 10;
  }
  x--;
  nextItem();
  console.log(x);
};

const nextItem = () => {
  boxes.innerHTML = "";
  let threeItems = [];
  if (window.innerWidth < "480") {
    threeItems.push(tenItemsFromResponse[x]);
  } else {
    if (x <= 7) {
      threeItems = tenItemsFromResponse.slice(x, x + 3);
    } else if (x === 8) {
      threeItems = tenItemsFromResponse
        .slice(x, x + 2)
        .concat(tenItemsFromResponse[0]);
    } else if (x === 9) {
      threeItems = tenItemsFromResponse
        .slice(x, x + 1)
        .concat(tenItemsFromResponse[0])
        .concat(tenItemsFromResponse[1]);
    }
  }

  threeItems.map((item) => {
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
