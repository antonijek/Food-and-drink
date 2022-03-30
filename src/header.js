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
 <a href ='#'> <img src="../images/beer_123784216.png" alt="logo" /></a>
</header>
<div class="hamburger-smallscreen">
          <a href="#">Home</a>
          <a href="#">List</a>
          <a href="#">About us</a>
          <a href="#">Custom page</a>
          <a href="#">Another</a>
        </div>
`;
