

let listItems = [];

window.apiUrl = "";

import { returnRegional } from '../src/header.js';
let navRegional = returnRegional();

import { returnLarge } from '../src/header.js';
let navLarge = returnLarge();

import { returnBar } from '../src/header.js';
let navBar = returnBar();


window.apiUrl = "https://api.openbrewerydb.org/breweries?per_page=30";
fetch(apiUrl)
.then((res) => res.json())
.then((data) => {
        data.forEach(elem => {
            listItems.push(elem);
        });
});

navRegional.addEventListener('click', function() {
    listItems = [];

    window.apiUrl = "https://api.openbrewerydb.org/breweries?by_type=regional";
    fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
        data.forEach(elem => {
            listItems.push(elem);
        });
    });
});

navLarge.addEventListener('click', function() {
    listItems = [];

    window.apiUrl = "https://api.openbrewerydb.org/breweries?by_type=large";
    fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
        data.forEach(elem => {
            listItems.push(elem);
        });
    });
});

navBar.addEventListener('click', function() {
    listItems = [];

    window.apiUrl = "https://api.openbrewerydb.org/breweries?by_type=bar";
    fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
        data.forEach(elem => {
            listItems.push(elem);
        });
    });
});

// Searching
const searchInput = document.getElementById('search-inp');
searchInput.addEventListener('keyup', e => {   

    const searchString = e.target.value.toLowerCase();
    const filteredItems = listItems.filter( char => {
        if (document.getElementById('rb-name').checked) {
            return char.name.toLowerCase().startsWith(searchString);
        } else if(document.getElementById('rb-type').checked) {
            return char.brewery_type.toLowerCase().startsWith(searchString);
        } else if(document.getElementById('rb-city').checked) {
            return char.city.toLowerCase().startsWith(searchString);
        }
    });

    DisplayElements(filteredItems, listElement, rows, currentPage);

    paginationSetup(filteredItems, paginationElement, rows);

});

const listElement = document.getElementById('elements');
const paginationElement = document.getElementById('pagination');

let currentPage = 1;
let rows = 4;

function getRandomInt(maxNum) {
    return Math.floor(Math.random() * maxNum);
}

function DisplayElements (items, wrapper, rowsPerPage, page) {
    wrapper.innerHTML = "";
    page--;

    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    let paginatedItems = items.slice(start, end);

    var imgIndex = getRandomInt(10);

    for (let i=0; i < paginatedItems.length; i++) {
        let item = paginatedItems[i];

        let divElement = document.createElement('div');
        divElement.classList.add('element')
        wrapper.appendChild(divElement);

        let divImg = document.createElement('div');
        divImg.classList.add('element-img');
        let img = document.createElement('img');
        img.src = `../images/brewery${imgIndex++}.jpg`;

        divElement.appendChild(divImg);
        divImg.appendChild(img);

        let divInfo = document.createElement('div');
        divInfo.classList.add('info');
        divElement.appendChild(divInfo);

        let pName = document.createElement('p')
        let pType = document.createElement('p')
        let pCity = document.createElement('p')
        let pState = document.createElement('p') 

        pName.innerHTML = "<b>" + item.name + "</b>";
        pType.innerText = "type: " + item.brewery_type;
        pCity.innerText = "city: " + item.city;
        pState.innerText = "state: " + item.state;

        divInfo.append(pName, pType, pCity, pState);
    }
}

function paginationSetup (items, wrapper, rowsPerPage) {
    wrapper.innerHTML = "";
    let pageCount = Math.ceil(items.length / rowsPerPage);
    for (let i = 1; i < pageCount + 1; i++) {
        let btn = paginationBtn(i, items);
        wrapper.appendChild(btn);
    }
}

function paginationBtn(page, items) {
    let btn = document.createElement('button');
    btn.innerText = page;

    if (currentPage == page) 
        btn.classList.add('active')
    
    btn.addEventListener('click', function() {
        currentPage = page;
        DisplayElements(items, listElement, rows, currentPage);

        let activeBtn = document.querySelector('.pagenumbers button.active');
        activeBtn.classList.remove('active');

        btn.classList.add('active');
    });

    return btn;
}









