import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Characters.css";
import Loader from "../components/Loader";

function Characters() {
  //  States principaux (data, loading, erreur, recherche, pagination, favoris)
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  // Chargement des favoris depuis le localStorage au démarrage
  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteCharacters")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Appel API avec filtres (search + page)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/characters?name=${search}&page=${page}&limit=100`,
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search, page]);

  // Calcul du nombre total de pages
  const totalPages = data ? Math.ceil(data.count / 100) : 1;

  //  états d'affichage
  if (isLoading) return <Loader />;
  if (errorMessage) return <p>Erreur : {errorMessage}</p>;

  return (
    <main>
      {/*  Hero + stats = partie visuelle */}
      <section className="hero-banner">
        <div className="hero-overlay">
          <p className="hero-kicker">MARVEL UNIVERSE</p>
          <h1 className="hero-title">Explore les personnages iconiques</h1>
          <p className="hero-description">
            Découvre les héros, vilains et légendes de l’univers Marvel.
          </p>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-card">
          <h3>100+</h3>
          <p>Personnages par page</p>
        </div>
        <div className="stat-card">
          <h3>Live</h3>
          <p>Recherche en temps réel</p>
        </div>
        <div className="stat-card">
          <h3>Saved</h3>
          <p>Favoris sauvegardés</p>
        </div>
      </section>

      {/*  Titre + recherche */}
      <h1 className="page-title">Marvel Characters</h1>
      <p className="page-subtitle">
        Découvre les personnages de l’univers Marvel
      </p>

      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher un personnage..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1); // reset pagination
          }}
        />
      </div>

      {/*  Pagination (haut) */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Précédent
        </button>

        <span>Page {page}</span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Suivant
        </button>
      </div>

      {/*  Liste des personnages */}
      <section className="characters-container">
        {data.results.map((character) => {
          // Vérifie si favori
          const isFavorite = favorites.some(
            (item) => item._id === character._id,
          );

          return (
            <article className="character-card" key={character._id}>
              <Link to={`/character/${character._id}`}>
                <img
                  src={`${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`}
                  alt={character.name}
                />

                <div className="character-card-text">
                  <h2>{character.name}</h2>

                  {/*  description */}
                  {character.description ? (
                    <p>{character.description}</p>
                  ) : (
                    <p className="empty-description">
                      Aucune description disponible
                    </p>
                  )}

                  {/* favoris add/remove + localStorage */}
                  <button
                    className={`favorite-btn ${isFavorite ? "active" : ""}`}
                    onClick={(event) => {
                      event.preventDefault();

                      const newFavorites = isFavorite
                        ? favorites.filter((fav) => fav._id !== character._id)
                        : [...favorites, character];

                      setFavorites(newFavorites);
                      localStorage.setItem(
                        "favoriteCharacters",
                        JSON.stringify(newFavorites),
                      );
                    }}
                  >
                    {isFavorite ? "❤️ Retirer" : "🤍 Favori"}
                  </button>
                </div>
              </Link>
            </article>
          );
        })}
      </section>

      {/*  Pagination (bas) */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Précédent
        </button>

        <span>Page {page}</span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Suivant
        </button>
      </div>
    </main>
  );
}

export default Characters;
