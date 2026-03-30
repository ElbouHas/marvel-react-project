import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Comics.css";
import Loader from "../components/Loader";

function Comics() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favoriteComics");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/comics?title=${search}&page=${page}&limit=100`,
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

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <p>Erreur : {errorMessage}</p>;
  }

  const totalPages = data ? Math.ceil(data.count / 100) : 1;

  const sortedComics = [...data.results].sort((a, b) => {
    return (a.title || "").localeCompare(b.title || "", "en", {
      numeric: true,
      sensitivity: "base",
    });
  });

  return (
    <main>
      <section className="hero-banner">
        <div className="hero-overlay">
          <p className="hero-kicker">MARVEL COMICS</p>
          <h1 className="hero-title">Découvre les comics cultes</h1>
          <p className="hero-description">
            Parcours les couvertures et les histoires emblématiques de Marvel.
          </p>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-card">
          <h3>100+</h3>
          <p>Comics par page</p>
        </div>

        <div className="stat-card">
          <h3>A-Z</h3>
          <p>Navigation plus claire</p>
        </div>

        <div className="stat-card">
          <h3>Saved</h3>
          <p>Comics favoris gardés</p>
        </div>
      </section>

      <div className="top-section">
        <h1 className="page-title">Marvel Comics</h1>
        <p className="page-subtitle">Découvre les comics de l’univers Marvel</p>

        <div className="search-container">
          <input
            type="text"
            placeholder="Rechercher un comic..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          >
            Précédent
          </button>

          <span>Page {page}</span>

          <button
            disabled={page === totalPages}
            onClick={() => {
              if (page < totalPages) {
                setPage(page + 1);
              }
            }}
          >
            Suivant
          </button>
        </div>
      </div>

      <section className="comics-container">
        {sortedComics.map((comic) => {
          const isFavorite = favorites.some((fav) => fav._id === comic._id);

          return (
            <article
              className={`comic-card reveal ${
                isFavorite ? "favorite-card-active" : ""
              }`}
              key={comic._id}
            >
              <img
                src={`${comic.thumbnail.path}/standard_fantastic.${comic.thumbnail.extension}`}
                alt={comic.title}
              />

              <div className="comic-card-text">
                <h2>{comic.title}</h2>

                {comic.description ? (
                  <p>{comic.description}</p>
                ) : (
                  <p className="empty-description">
                    Aucune description disponible
                  </p>
                )}

                <button
                  className={`favorite-btn ${isFavorite ? "active" : ""}`}
                  onClick={() => {
                    let newFavorites;

                    if (isFavorite) {
                      newFavorites = favorites.filter(
                        (fav) => fav._id !== comic._id,
                      );
                    } else {
                      newFavorites = [...favorites, comic];
                    }

                    setFavorites(newFavorites);
                    localStorage.setItem(
                      "favoriteComics",
                      JSON.stringify(newFavorites),
                    );
                  }}
                >
                  {isFavorite ? "❤️ Retirer" : "🤍 Favori"}
                </button>
              </div>
            </article>
          );
        })}
      </section>

      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        >
          Précédent
        </button>

        <span>Page {page}</span>

        <button
          disabled={page === totalPages}
          onClick={() => {
            if (page < totalPages) {
              setPage(page + 1);
            }
          }}
        >
          Suivant
        </button>
      </div>
    </main>
  );
}

export default Comics;
