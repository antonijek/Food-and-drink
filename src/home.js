//just for testing
const url =
  "https://api.openbrewerydb.org/breweries/madtree-brewing-cincinnati";
fetch(url)
  .then((res) => res.json())
  .then((res) => {
    console.log(JSON.stringify(res));
    let test = document.querySelector(".test");
    test.innerHTML = JSON.stringify(res);
    let img = document.createElement("img");
    img.src = res.image;
    document.body.appendChild(img);
  });
