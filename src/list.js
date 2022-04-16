
// import dropdown lists
import { returnRegional } from '../src/header.js';
const navRegional = returnRegional();
import { returnLarge } from '../src/header.js';
const navLarge = returnLarge();
import { returnBar } from '../src/header.js';
const navBar = returnBar();

// (function () {

// array of elements
let listItems = [];

// for default display
window.apiUrl = "https://api.openbrewerydb.org/breweries?per_page=30";
fetch(apiUrl)
.then((res) => res.json())
.then((data) => {
        data.forEach(elem => {
            listItems.push(elem);
        });
})
.catch((error) => {
    console.error('Error:', error);
  });

/** 
** @param listElem - all elements on the current page
** @param paginElem - pagination element on the current page
 */
function clearWrapper(listElem, paginElem) {
    listElem.innerHTML = "";
    paginElem.innerHTML = "";
}

/** 
** function for printing type on list page
** @param str - string to be returned
 */
function printType(str) {
    const printType = document.getElementById('selected-type');
    return printType.innerText = str
}

// for regional 
navRegional.forEach(e => {
    e.addEventListener('click', function() {
        listItems = [];
        printType('Regional');
        clearWrapper(listElement, paginationElement);
        window.apiUrl = "https://api.openbrewerydb.org/breweries?by_type=regional&per_page=25";
        fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
            data.forEach(elem => {
                listItems.push(elem);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
          });
    });
});

// for large
navLarge.forEach(e => {
    e.addEventListener('click', function() {
        listItems = [];
        printType('Large');
        clearWrapper(listElement, paginationElement);
        window.apiUrl = "https://api.openbrewerydb.org/breweries?by_type=large&per_page=25";
        fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
            data.forEach(elem => {
                listItems.push(elem);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
          });
    });
})

// for bar
navBar.forEach(e => {
    e.addEventListener('click', function() {
        listItems = [];
        printType('Bar');
        clearWrapper(listElement, paginationElement);
        window.apiUrl = "https://api.openbrewerydb.org/breweries?by_type=bar";
        fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
            data.forEach(elem => {
                listItems.push(elem);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
          });
    });
})

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

// changing the index to display the images
function getRandomInt(maxNum) {
    return Math.floor(Math.random() * maxNum);
}

/** 
** @param items - individual elements displayed on the page
** @param wrapper - a div containing elements
** @rowsPerPage {int} - number of rows per page
** @page - actual page
 */
function DisplayElements (items, wrapper, rowsPerPage, page) {
    wrapper.innerHTML = "";
    page--;

    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    let paginatedItems = items.slice(start, end);

    var imgIndex = getRandomInt(10);

    // a loop that prints the elements
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

/** 
** @param items - individual elements displayed on the page
** @param wrapper - a div containing elements
** @rowsPerPage {int} - number of rows per page
 */
function paginationSetup (items, wrapper, rowsPerPage) {
    wrapper.innerHTML = "";
    let pageCount = Math.ceil(items.length / rowsPerPage);
    for (let i = 1; i < pageCount + 1; i++) {
        let btn = paginationBtn(i, items);
        wrapper.appendChild(btn);
    }
}

/** 
** @param items - individual elements displayed on the page
** @page - actual page
** returned value is current active button
 */
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

// })();






