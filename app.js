import express from "express";
import { pokemons } from "./mocked_data/mock-pokemon.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Pokemons API is up and running !"));

app.get("/api/pokemons", (req, res) => {
	res.send(
		`Il y a ${pokemons.length} Pokémons dans le Pokédex, pour le moment.`
	);
});

app.get("/api/pokemons/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const chosenPokemon = pokemons.find(pokemon => pokemon.id === id);
	res.send(`Vous avez demandé le Pokémon ${chosenPokemon.name}`);
});

app.listen(port, () =>
	console.log(`The app is running on : http://localhost:${port}`)
);
