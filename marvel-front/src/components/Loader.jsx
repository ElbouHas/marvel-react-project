import "../styles/Loader.css";

function Loader() {
  return (
    <div className="loader-screen">
      <div className="loader-box">
        <div className="loader-logo">MARVEL</div>
        <div className="loader-bar">
          <span></span>
        </div>
        <p>Chargement de l’univers Marvel...</p>
      </div>
    </div>
  );
}

export default Loader;
