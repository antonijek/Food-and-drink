(function () {
  let apiUrlRegional =
    "https://api.openbrewerydb.org/breweries?by_type=regional&per_page=10";
  let apiUrlLarge =
    "https://api.openbrewerydb.org/breweries?by_type=large&&page=3";
  let tenItemsFromResponse;
  let x = 0;
  let y = 0;
  let numberOfBoxes = 3;
  let numberOfBoxesForMObile = 1;
  let numberOfBoxesForTablet = 2;
  const theNearest3 = 3;
  let mousePointX = 0;
  let mousePointY = 0;
  let allBreweryFromResponse;
  let screen =
    window.innerWidth < "600"
      ? numberOfBoxesForMObile
      : window.innerWidth < "992"
      ? numberOfBoxesForTablet
      : numberOfBoxes;

  fetch(apiUrlRegional)
    .then((res) => res.json())
    .then((res) => {
      tenItemsFromResponse = res.slice();
      hendlerResponse(res, screen);
    })
    .catch((err) => console.log(err));

  //takes array and number,calls createBox function and return array
  const hendlerResponse = (data, num) => {
    let items = data.slice(x, x + num);
    items.map((item, i) => {
      createBox(item, i);
    });
    return items;
  };

  // takes event parametar, search apropriate image and calls function openModal
  const loadMoreInformation = (e) => {
    let backgroundImage = e.target.parentElement.style.backgroundImage;
    let numberOfImage = backgroundImage.slice(
      backgroundImage.length - 7,
      backgroundImage.length - 6
    );
    openModal(numberOfImage, tenItemsFromResponse);
  };

  //takes array and number, create an element object, and return the object
  const createBox = (data, number) => {
    let box = document.createElement("div");
    box.classList.add("box");
    box.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('./images/brewery${number}.jpg')`;
    let name = document.createElement("p");
    name.innerHTML = `${data.name}`;
    let city = document.createElement("p");
    city.innerHTML = `${data.city}`;
    box.appendChild(name);
    box.appendChild(city);
    let readMoreButton = document.createElement("button");
    readMoreButton.innerHTML = "Read more";
    readMoreButton.classList.add("btn-box");
    readMoreButton.addEventListener("click", loadMoreInformation);
    box.appendChild(readMoreButton);
    boxes.appendChild(box);
    return box;
  };

  //sets displays to block and calls  createModalContent function
  const openModal = (index, arr, x = 0) => {
    let brewery = arr[index - x];
    modal.innerHTML = "";
    modal.style.display = "block";
    overlay.style.display = "block";
    createModalContent(brewery, index);
  };

  //takes array and number, create object, and return that object
  const createModalContent = (data, i) => {
    let closeX = document.createElement("p");
    closeX.innerHTML = "X";
    closeX.addEventListener("click", () => closeModal(modal, overlay));
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
    return modal;
  };

  //sets displays to none
  const closeModal = (elem1, elem2) => {
    elem1.style.display = "none";
    elem2.style.display = "none";
  };

  //increases and monitors variable x
  const increaseX = () => {
    x++;
    if (x === tenItemsFromResponse.length) {
      x = 0;
    }
    nextItem(boxes, tenItemsFromResponse);
  };

  //decreases and monitors variable x
  const decreaseX = () => {
    if (x === 0) {
      x = tenItemsFromResponse.length;
    }
    x--;
    nextItem(boxes, tenItemsFromResponse);
  };

  //creating and returning array depends on screen size and variable x and calls createBox function
  const nextItem = (elem, arr) => {
    elem.innerHTML = "";
    let brewery = [];
    if (window.innerWidth < "600") {
      brewery.push(arr[x]);
    } else if (window.innerWidth < "992") {
      if (x === 9) {
        brewery.push(arr[x], arr[0]);
      } else {
        brewery.push(arr[x], arr[x + 1]);
      }
    } else {
      if (x <= 7) {
        brewery = arr.slice(x, x + 3);
      } else if (x === 8) {
        brewery = arr.slice(x, x + 2).concat(arr[0]);
      } else if (x === 9) {
        brewery = arr
          .slice(x, x + 1)
          .concat(arr[0])
          .concat(arr[1]);
      }
    }
    brewery.map((item) => {
      createBox(item, arr.indexOf(item));
    });
    return brewery;
  };

  fetch(apiUrlLarge)
    .then((res) => res.json())
    .then((res) => {
      sortingByDistance(res, theNearest3);
    })
    .catch((err) => console.log(err));

  //takes array and number, sorts array and return new array
  const sortingByDistance = (data, num) => {
    let closestBrewery = data.sort((a, b) =>
      Number(a.longitude) < Number(b.longitude)
        ? 1
        : Number(b.longitude) < Number(a.longitude)
        ? -1
        : 0
    );
    let nearest3 = closestBrewery.slice(0, num);
    nearest3.map((item, i) => {
      let name = document.createElement("p");
      name.innerHTML = `${item.name} <br><br>`;
      let img = document.createElement("img");
      img.src = `./images/brewery${i + 10}.jpg`;
      name.appendChild(img);
      name.onclick = () => {
        openModal(i + 10, nearest3, 10);
      };
      bestBox.appendChild(name);
    });
    return nearest3;
  };

  //increase and decrease variable x on keyboard depends on mouse position
  const keyboardSliding = (e) => {
    if (e.key === "ArrowRight" && mousePointX > 0 && mousePointY > 0) {
      increaseX();
    }
    if (e.key === "ArrowLeft" && mousePointX > 0 && mousePointY > 0) {
      decreaseX();
    }
  };

  //sets variables  mousePointX and  mousePointY depends on mouse position
  const setMousePosition = (e) => {
    mousePointX = e.offsetX;
    mousePointY = e.offsetY;
  };
  //sets variables  mousePointX and  mousePointY to 0
  const resetMousePosition = () => {
    mousePointX = 0;
    mousePointY = 0;
  };

  fetch(apiUrlLarge)
    .then((res) => res.json())
    .then((res) => {
      allBreweryFromResponse = res;
      loadMore();
    })
    .catch((err) => console.log(err));

  //takes array and number, create an object and return it
  const createTopBox = (data, index) => {
    let topRated = document.createElement("div");
    topRated.classList.add("top-rated");
    topRated.onclick = () => openModal(index, allBreweryFromResponse);
    let img = document.createElement("img");
    img.src = `./images/brewery${index}.jpg`;
    let state = document.createElement("p");
    state.innerHTML = data.state;
    let city = document.createElement("p");
    city.innerHTML = data.city;
    let textInfo = document.createElement("div");
    textInfo.classList.add("text-info");
    let name = document.createElement("p");
    name.innerHTML = `${data.name}`;
    textInfo.append(name, city, state);
    topRated.append(img, textInfo);
    wraper.appendChild(topRated);
    return topRated;
  };

  //creates new arr and return it, sets variable y depends on screen and calls function createTopBox
  const loadMore = () => {
    wraper.innerHTML = "";
    let numberBreweryOnScreen = allBreweryFromResponse
      .slice(0, screen * 2 + y)
      .map((item, i) => {
        createTopBox(item, i);
      });
    y += screen;
    if (y >= allBreweryFromResponse.length) {
      loadMoreBtn.classList.add("disabled");
    }
    return numberBreweryOnScreen;
  };

  setInterval(increaseX, 3000);

  let wraper = document.querySelector(".top-rated-wraper");
  let loadMoreBtn = document.querySelector(".btn");
  loadMoreBtn.addEventListener("click", loadMore);

  let leftArrow = document.querySelector(".left-arrow");
  screen === numberOfBoxesForMObile
    ? (leftArrow.ontouchstart = decreaseX)
    : (leftArrow.onclick = decreaseX);

  let rightArrow = document.querySelector(".right-arrow");
  screen === numberOfBoxesForMObile
    ? (rightArrow.ontouchstart = increaseX)
    : (rightArrow.onclick = increaseX);

  let slider = document.querySelector(".slider");
  slider.addEventListener("mouseenter", setMousePosition);
  slider.addEventListener("mouseleave", resetMousePosition);

  document.addEventListener("keyup", keyboardSliding);
  let boxes = document.querySelector(".boxes");
  let bestBox = document.querySelector(".best-box");
  let modal = document.querySelector(".modal");
  let overlay = document.querySelector(".overlay");
})();
