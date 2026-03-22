require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  try {
    return res.status(200).json("Bienvenue sur le serveur marvel 🦸🦸🏽‍♀️");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// route en GET pour récupérer les personnages : avec paramètres nom, skip, et limit
app.get("/characters", async (req, res) => {
  try {
    // console.log(req.query); // { name: 'spider', limit: '50', page: '3' }

    // formule pagination :
    // skip = (page - 1) * limit

    let limit = 100;
    let skip = 0;
    // déterminer si on reçoit des paramètre query :
    let queries = "";
    if (req.query.name) {
      queries = queries + "&name=" + req.query.name;
    }
    if (req.query.limit) {
      // changer la limit qui etait à 100 par défaut :
      limit = req.query.limit;
      // puis changer la requete :
      queries = queries + "&limit=" + req.query.limit;
    }
    if (req.query.page) {
      queries = queries + "&skip=" + (req.query.page - 1) * limit;
    }
    // envoyer la requête à l'API
    const response = await axios.get(
      process.env.MARVEL_API_URL +
        "/characters?apiKey=" +
        process.env.MARVEL_API_KEY +
        queries,
    );
    // renvoyer la réponse de la requête au front
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// route en GET pour récupérer les comics liés à un personnage
app.get("/comics", async (req, res) => {
  try {
    // console.log(req.query); // { title: 'spider', page: '3', limit: '20' }
    let limit = 100;
    let skip = 0;
    // déterminer si on reçoit des paramètre query :
    let queries = "";
    if (req.query.title) {
      queries = queries + "&title=" + req.query.title;
    }
    if (req.query.limit) {
      // changer la limit qui etait à 100 par défaut :
      limit = req.query.limit;
      // puis changer la requete :
      queries = queries + "&limit=" + req.query.limit;
    }
    if (req.query.page) {
      queries = queries + "&skip=" + (req.query.page - 1) * limit;
    }
    // envoyer la requête à l'API
    const response = await axios.get(
      process.env.MARVEL_API_URL +
        "/comics?apiKey=" +
        process.env.MARVEL_API_KEY +
        queries,
    );
    // renvoyer la réponse de la requête au front

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// route en GET pour récupérer les comics liés à un personnage : avec paramètres title, skip, et limit
app.get("/comics/:id", async (req, res) => {
  try {
    // console.log(req.params); // { id: '5fcf91fed8a2480017b91467' }
    // envoyer la requête :
    const response = await axios.get(
      process.env.MARVEL_API_URL +
        "/comics/" +
        req.params.id +
        "?apiKey=" +
        process.env.MARVEL_API_KEY,
    );

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.get("/character/:id", async (req, res) => {
  try {
    const response = await axios.get(
      process.env.MARVEL_API_URL +
        "/comics?characterId=" +
        req.params.id +
        "&apiKey=" +
        process.env.MARVEL_API_KEY,
    );

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.get("/comic/:id", async (req, res) => {
  try {
    const response = await axios.get(
      process.env.MARVEL_API_URL +
        `/comics/${req.params.id}?apiKey=` +
        process.env.MARVEL_API_KEY,
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.all(/.*/, (req, res) => {
  return res.status(404).json("Not found");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started 🔥🔥🔥🔥🔥");
});
