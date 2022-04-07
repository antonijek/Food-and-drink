let apiUrl =
  "https://api.openbrewerydb.org/breweries?by_type=regional&per_page=10";
let tenItemsFromResponse;
let x = 0;
let numberOfBoxes = 3;
let numberOfBoxesForMObile = 1;
let numberOfBoxesForTablet = 2;
const theNearest3 = 3;
let screen =
  window.innerWidth < "600"
    ? numberOfBoxesForMObile
    : window.innerWidth < "992"
    ? numberOfBoxesForTablet
    : numberOfBoxes;

fetch(apiUrl)
  .then((res) => res.json())
  .then((res) => {
    tenItemsFromResponse = res.slice();
    //if screen less then 600 px only one box shown
    hendlerResponse(res, screen);
  });

const hendlerResponse = (data, num) => {
  let items = data.slice(x, x + num);
  items.map((item, i) => {
    createBox(item, i);
  });
};

//change names inside createBox
const createBox = (data, number) => {
  let box = document.createElement("div");
  box.classList.add("box");
  box.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
  url('./images/brewery${number}.jpg')`;
  let paragraf = document.createElement("p");
  paragraf.innerHTML = `Name:<br>${data.name}<br><br>`;
  let paragraf1 = document.createElement("p");
  paragraf1.innerHTML = `City:<br><br>${data.city}`;
  box.appendChild(paragraf);
  box.appendChild(paragraf1);
  let button = document.createElement("button");
  button.innerHTML = "Read more";
  button.classList.add("btn-box");
  button.addEventListener("click", (e) => {
    openModal(
      e.target.parentElement.style.backgroundImage.slice(78, 79),
      tenItemsFromResponse
    );
  });
  box.appendChild(button);
  boxes.appendChild(box);
};
//create variables instead 10  and 3

const openModal = (index, arr) => {
  brewery = arr[index];
  modal.innerHTML = "";
  modal.style.display = "block";
  overlay.style.display = "block";
  createModalContent(brewery, index);
};
  
const createModalContent = (data, i) => {
  let closeX = document.createElement("p");
  closeX.innerHTML = "X";
  closeX.addEventListener("click", closeModal);
  let img = document.createElement("img");
  img.src = `./images/brewery${i}.jpg`;
  let name = document.createElement("h2");
  name.innerHTML = `name: ${data.name}`;
  let webAdress = document.createElement("h3");
  webAdress.innerHTML = `web-adress: ${data.website_url}`;
  let type = document.createElement("h3");
  type.innerHTML = `type: ${data.brewery_type}`;
  let address = document.createElement("h3");
  address.innerHTML = `address: ${data.street}`;
  let city = document.createElement("h3");
  city.innerHTML = `city: ${data.city}`;
  modal.append(closeX, name, img, webAdress, type, address, city);
};

const closeModal = () => {
  modal.style.display = "none";
  overlay.style.display = "none";
};

const increaseX = () => {
  x++;
  if (x === 10) {
    x = 0;
  }
  nextItem();
};
const decreaseX = () => {
  if (x === 0) {
    x = 10;
  }
  x--;
  nextItem();
};

const nextItem = () => {
  boxes.innerHTML = "";
  let items = [];
  if (window.innerWidth < "600") {
    items.push(tenItemsFromResponse[x]);
  } else if (window.innerWidth < "992") {
    if (x === 9) {
      items.push(tenItemsFromResponse[x], tenItemsFromResponse[0]);
    } else {
      items.push(tenItemsFromResponse[x], tenItemsFromResponse[x + 1]);
    }
  } else {
    if (x <= 7) {
      items = tenItemsFromResponse.slice(x, x + 3);
    } else if (x === 8) {
      items = tenItemsFromResponse
        .slice(x, x + 2)
        .concat(tenItemsFromResponse[0]);
    } else if (x === 9) {
      items = tenItemsFromResponse
        .slice(x, x + 1)
        .concat(tenItemsFromResponse[0])
        .concat(tenItemsFromResponse[1]);
    }
  }
  items.map((item) => {
    createBox(item, tenItemsFromResponse.indexOf(item));
  });
};

setInterval(increaseX, 3000);

fetch(
  "https://api.openbrewerydb.org/breweries?by_type=large&per_page=10&page=3"
)
  .then((res) => res.json())
  .then((res) => {
    sortingByDistance(res);
  });

const sortingByDistance = (data) => {
  let arr = data.sort((a, b) =>
    Number(a.longitude) < Number(b.longitude)
      ? 1
      : Number(b.longitude) < Number(a.longitude)
      ? -1
      : 0
  );
  arr.slice(0, theNearest3).map((item, i) => {
    let p = document.createElement("p");
    p.innerHTML = `${item.name} <br>`;
    let img = document.createElement("img");
    img.src = `./images/brewery${i + 10}.jpg`;
    p.appendChild(img);
    bestBox.appendChild(p);
  });
};
let mousePointX = 0;
let mousePointY = 0;
const keyboardSliding = (e) => {
  if (e.key === "ArrowRight" && mousePointX > 0 && mousePointY > 0) {
    increaseX();
  }
  if (e.key === "ArrowLeft" && mousePointX > 0 && mousePointY > 0) {
    decreaseX();
  }
};
const setMousePosition = (e) => {
  mousePointX = e.offsetX;
  mousePointY = e.offsetY;
};

const resetMousePosition = () => {
  mousePointX = 0;
  mousePointY = 0;
};
let allBreweryFromResponse;
let apiUrl1 = "https://api.openbrewerydb.org/breweries?by_type=large";
fetch(apiUrl1)
  .then((res) => res.json())
  .then((res) => {
    allBreweryFromResponse = res;
    loadMore();
  });

const createTopBox = (data, index) => {
  let topRated = document.createElement("div");
  topRated.classList.add("top-rated");
  topRated.addEventListener("click", () => {
    openModal(index, allBreweryFromResponse);
  });
  let img = document.createElement("img");
  img.src = `./images/brewery${index}.jpg`;
  let state = document.createElement("p");
  state.innerHTML = data.state;
  let city = document.createElement("p");
  city.innerHTML = data.street;
  let textInfo = document.createElement("div");
  textInfo.classList.add("textInfo");
  let name = document.createElement("p");
  name.innerHTML = `"${data.name}"`;
  textInfo.append(name, city, state);
  topRated.append(img, textInfo);
  wraper.appendChild(topRated);
};

let y = 0;
const loadMore = () => {
  wraper.innerHTML = "";
  allBreweryFromResponse.slice(0, screen * 2 + y).map((item, i) => {
    createTopBox(item, i);
  });
  y += screen;
};

let wraper = document.querySelector(".top-rated-wraper");
let loadMoreBtn = document.querySelector(".btn");
loadMoreBtn.addEventListener("click", loadMore);
let leftArrow = document.querySelector(".left-arrow");
leftArrow.addEventListener("click", decreaseX);
let rightArrow = document.querySelector(".right-arrow");
rightArrow.addEventListener("click", increaseX);
let slider = document.querySelector(".slider");
slider.addEventListener("mouseenter", setMousePosition);
slider.addEventListener("mouseleave", resetMousePosition);
document.addEventListener("keyup", keyboardSliding);
let boxes = document.querySelector(".boxes");
let bestBox = document.querySelector(".best-box");
let modal = document.querySelector(".modal");
let overlay = document.querySelector(".overlay");
