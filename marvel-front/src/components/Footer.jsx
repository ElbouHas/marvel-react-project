import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-top">
          <h3>Marvel Explorer</h3>
          <p>Découvre les personnages et comics de l’univers Marvel</p>
        </div>

        <div className="footer-links">
          <a href="#">Personnages</a>
          <a href="#">Comics</a>
          <a href="#">Favoris</a>
        </div>

        <div className="footer-bottom">
          <p>Projet React • API Marvel • © 2026</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
