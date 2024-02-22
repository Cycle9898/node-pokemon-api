import express from "express";
import { success } from "./utils/helper.js";
import { pokemons } from "./mocked_data/mock-pokemon.js";

const app = express();
const port = 3000;

app.use((req, res, next) => {
	console.log(`URL : ${req.url}`);
	next();
});

app.get("/", (req, res) => res.send("Pokemons API is up and running !"));

app.get("/api/pokemons", (req, res) => {
	const message = `La liste des ${pokemons.length} Pokémons a bien été récupérée.`;

	res.json(success(message, pokemons));
});

app.get("/api/pokemons/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const chosenPokemon = pokemons.find(pokemon => pokemon.id === id);
	const message = "Un Pokémon a bien été trouvé";

	res.json(success(message, chosenPokemon));
});

app.listen(port, () =>
	console.log(`The app is running on : http://localhost:${port}`)
);
