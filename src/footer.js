const footer = document.createElement("template");
footer.id = "footer";
footer.innerHTML = `
    <footer class="footer">
        <div class="footer-wrapper">
            <div class="footer-content">
                <h2>Brewery</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id repellat vitae cum maxime natus exercitationem, labore voluptates ullam nulla quos magni voluptatum maiores odit unde praesentium sed. Accusamus, ex placeat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ducimus vero, maxime inventore totam dicta? Temporibus dicta excepturi laudantium odit magnam ratione, similique beatae dolore, fuga eveniet rem vitae pariatur? dolore, fuga eveniet rem vitae pariatur? veniet rem vitae pariatur? dolore, fuga eveniet rem vitae pariatur?
                </p>
            </div>
            <div class="footer-social">
                <a href="#"><i class="fa-brands fa-facebook"></i></a>
                <a href="#"><i class="fa-brands fa-twitter"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></i></a>
            </div>
            <div class="site-map">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">List</a></li>
                    <li><a href="#">About us</a></li>
                    <li><a href="#">Custom</a></li>
                </ul>
            </div>
            <div class="copyright">
                <p>Copyright &copy;2022. Developed by DevelopersLab</p>
            </div>
        </div>
    </footer>
`;

let importedFooter = document.querySelector(".footer");
importedFooter.appendChild(footer.content);