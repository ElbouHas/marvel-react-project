import { useEffect, useState } from "react";
import "../styles/Favorites.css";

function Favorites() {
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [favoriteComics, setFavoriteComics] = useState([]);

  useEffect(() => {
    const storedCharacters =
      JSON.parse(localStorage.getItem("favoriteCharacters")) || [];
    const storedComics =
      JSON.parse(localStorage.getItem("favoriteComics")) || [];

    setFavoriteCharacters(storedCharacters);
    setFavoriteComics(storedComics);
  }, []);

  const handleRemoveCharacter = (id) => {
    const updatedCharacters = favoriteCharacters.filter((character) => {
      return character._id !== id;
    });

    setFavoriteCharacters(updatedCharacters);
    localStorage.setItem(
      "favoriteCharacters",
      JSON.stringify(updatedCharacters),
    );
  };

  const handleRemoveComic = (id) => {
    const updatedComics = favoriteComics.filter((comic) => {
      return comic._id !== id;
    });

    setFavoriteComics(updatedComics);
    localStorage.setItem("favoriteComics", JSON.stringify(updatedComics));
  };

  return (
    <main className="favorites-page">
      <h1 className="favorites-title">Mes favoris</h1>

      <section className="favorites-section">
        <h2 className="favorites-section-title">Personnages favoris</h2>

        {favoriteCharacters.length === 0 ? (
          <p className="favorites-empty">Aucun personnage favori</p>
        ) : (
          <div className="favorites-container">
            {favoriteCharacters.map((character) => {
              return (
                <article className="favorite-card" key={character._id}>
                  <img
                    src={`${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`}
                    alt={character.name}
                  />

                  <div className="favorite-card-text">
                    <h3>{character.name}</h3>

                    {character.description ? (
                      <p>{character.description}</p>
                    ) : (
                      <p className="empty-description">
                        Aucune description disponible
                      </p>
                    )}

                    <button
                      className="favorite-btn active"
                      onClick={() => {
                        handleRemoveCharacter(character._id);
                      }}
                    >
                      ❤️ Retirer
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="favorites-section">
        <h2 className="favorites-section-title">Comics favoris</h2>

        {favoriteComics.length === 0 ? (
          <p className="favorites-empty">Aucun comic favori</p>
        ) : (
          <div className="favorites-container">
            {favoriteComics.map((comic) => {
              return (
                <article className="favorite-card" key={comic._id}>
                  <img
                    src={`${comic.thumbnail.path}/standard_fantastic.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />

                  <div className="favorite-card-text">
                    <h3>{comic.title}</h3>

                    {comic.description ? (
                      <p>{comic.description}</p>
                    ) : (
                      <p className="empty-description">
                        Aucune description disponible
                      </p>
                    )}

                    <button
                      className="favorite-btn active"
                      onClick={() => {
                        handleRemoveComic(comic._id);
                      }}
                    >
                      ❤️ Retirer
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default Favorites;
