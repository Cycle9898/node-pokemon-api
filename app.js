import express from "express";
import morgan from "morgan";
import favicon from "serve-favicon";
import { getUniqueId, success } from "./src/utils/helper.js";
import { initDb, testDatabaseConnection } from "./src/database/sequelize.js";
import { pokemons } from "./src/database/mocked_data/mock-pokemon.js";
import router from "./src/Routes/pokemonsRoutes.js";

// copy of Pokemon mocked data (will be deleted with real endpoints)
let pokemonsArray = [...pokemons];

// Express app
const app = express();
const port = 3000;

// Middlewares
app.use(favicon("./src/assets/favicon.ico"))
	.use(morgan("dev"))
	.use(express.json());

// MariaDB database interaction(s)
testDatabaseConnection();
initDb();

// Router
app.get("/", (req, res) => res.send("Pokemons API is up and running !"));

// test endpoints (will be deleted)
app.get("/api/pokemons", (req, res) => {
	const message = `La liste des ${pokemonsArray.length} Pokémons a bien été récupérée.`;

	res.json(success(message, pokemonsArray));
});

app.post("/api/pokemons", (req, res) => {
	const id = getUniqueId(pokemonsArray);
	const pokemonCreated = { ...req.body, ...{ id, created: new Date() } };
	pokemonsArray.push(pokemonCreated);
	const message = `Le Pokémon ${pokemonCreated?.name} a bien été créé.`;
	res.json(success(message, pokemonCreated));
});

app.get("/api/pokemons/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const chosenPokemon = pokemonsArray.find(pokemon => pokemon.id === id);
	const message = "Un Pokémon a bien été trouvé";

	res.json(success(message, chosenPokemon));
});

app.put("/api/pokemons/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const pokemonUpdated = { ...req.body, id };
	pokemonsArray = pokemonsArray.map(pokemon =>
		pokemon.id === id ? pokemonUpdated : pokemon
	);
	const message = `Le Pokémon ${pokemonUpdated?.name} a bien été modifié.`;
	res.json(success(message, pokemonUpdated));
});

app.delete("/api/pokemons/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const pokemonDeleted = pokemonsArray.find(pokemon => pokemon.id === id);
	pokemonsArray = pokemonsArray.filter(pokemon => pokemon.id !== id);
	const message = `Le Pokémon ${pokemonDeleted?.name} a bien été supprimé.`;
	res.json(success(message, pokemonDeleted));
});

// Listening
app.listen(port, () =>
	console.log(`The app is running on : http://localhost:${port}`)
);
