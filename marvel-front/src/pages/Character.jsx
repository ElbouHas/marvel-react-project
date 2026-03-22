// 🔹 Import des hooks React + outils necessaores
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

//  Styles et composants
import "../styles/Character.css";
import Loader from "../components/Loader";

function Character() {
  //  Récupère l'id depuis l'URL
  const { id } = useParams();

  //  States pour stocker les données et gérer le chargement
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //  Appel API au chargement du composant ou quand l'id change
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3000/character/${id}`);

      // On stok les données reçues
      setData(response.data);

      // On désactive le loader
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  // Affichage du loader pendant le chargement
  if (isLoading) {
    return <Loader />;
  }

  //  si aucune donnée, on affiche un message
  if (!data || !data.results) {
    return <p>Aucun comic trouvé</p>;
  }

  return (
    <main className="character-page">
      {/*  Titre de la page */}
      <h1 className="character-title">Comics</h1>

      {/*  Liste des comics liés au personnage */}
      <section className="comics-container">
        {data.results.map((comic) => {
          return (
            <article className="comic-card" key={comic._id}>
              {/*  Image du comic */}
              <img
                src={`${comic.thumbnail.path}/standard_fantastic.${comic.thumbnail.extension}`}
                alt={comic.title}
              />

              <div className="comic-card-text">
                {/*  Titre du comic */}
                <h2>{comic.title}</h2>

                {/*  Description si vide */}
                {comic.description ? (
                  <p>{comic.description}</p>
                ) : (
                  <p>Aucune description</p>
                )}
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}

export default Character;
