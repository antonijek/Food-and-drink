const footer = document.createElement("template");
footer.id = "footer";
footer.innerHTML = `
    <footer class="footer">
        <div class="footer-wrapper">
            <div class="footer-content">
                <h2>Brewery</h2>
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