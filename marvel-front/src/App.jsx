// Routing React + composants principaux
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollTopButton from "./components/ScrollTopButton.jsx";

// Pages de l'application
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
import Character from "./pages/Character";

//  Styles globaux
import "./styles/Global.css";

function App() {
  return (
    <>
      {/*  Header affiché sur toutes les pages */}
      <Header />

      {/*routing : chaque URL affiche une page différente */}
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/character/:id" element={<Character />} />
      </Routes>

      {/* Bouton retour en haut (affiché partout) */}
      <ScrollTopButton />

      {/* Footer global */}
      <Footer />
    </>
  );
}

// 🔹 Export du composant principal de l'app
export default App;
