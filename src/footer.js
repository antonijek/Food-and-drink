const footer = document.createElement("template");
footer.id = "footer";
footer.innerHTML = `
    <footer class="footer">
        <div class="footer-wrapper">

            <div class="footer-social">
                <a href="#"><i class="fa-brands fa-facebook"></i></a>
                <a href="#"><i class="fa-brands fa-twitter"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></i></a>
            </div>
            <div class="site-map">
                <ul>
                    <li><a href="/index.html" target="_blank">Home</a></li>
                    <li><a href="../html/list.html" target="_blank">List</a></li>
                    <li><a href="../html/about-us.html" target="_blank">About us</a></li>
                    <li><a href="../html/contact-us.html" target="_blank">Contact us</a></li>
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