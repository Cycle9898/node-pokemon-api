import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Pokemons API is up and running !"));

app.get("/api/pokemons/:id", (req, res) => {
	const id = req.params.id;
	res.send(`Vous avez demandé le Pokémon numéro ${id}`);
});

app.listen(port, () =>
	console.log(`The app is running on : http://localhost:${port}`)
);
