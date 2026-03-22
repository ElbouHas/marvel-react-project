import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  return (
    <header className="site-header">
      <div className="header-content">
        <Link to="/characters" className="logo">
          MARVEL
        </Link>

        <nav className="main-nav">
          <Link to="/characters">Personnages</Link>
          <Link to="/comics">Comics</Link>
          <Link to="/favorites">Favoris</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
