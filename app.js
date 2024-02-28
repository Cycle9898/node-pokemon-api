import express from "express";
import morgan from "morgan";
import favicon from "serve-favicon";
import { Sequelize, DataTypes } from "sequelize";
import { getUniqueId, success } from "./utils/helper.js";
import { pokemons } from "./mocked_data/mock-pokemon.js";
import { pokemonModel } from "./src/database/models/pokemon.js";

let pokemonsArray = [...pokemons];

const app = express();
const port = 3000;

const sequelize = new Sequelize(
	"pokedex",
	"root",
	"",

	{
		host: "localhost",
		dialect: "mariadb",
		dialectOptions: {
			timezone: "Etc/GMT-2"
		},
		logging: false
	}
);

sequelize
	.authenticate()
	.then(_ =>
		console.log("Database connection has been successfully established.")
	)
	.catch(error =>
		console.log(`Unable to connect to the database : ${error}`)
	);

const Pokemon = pokemonModel(sequelize, DataTypes);

sequelize.sync({ force: true }).then(_ => {
	console.log("Pokedex database has been correctly synchronized");

	Pokemon.create({
		name: "Bulbizarre",
		hp: 25,
		cp: 5,
		picture:
			"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
		types: ["Plante", "Poison"].join()
	}).then(bulbizarre => console.log(bulbizarre.toJSON()));
});

app.use(favicon("./assets/favicon.ico")).use(morgan("dev")).use(express.json());

app.get("/", (req, res) => res.send("Pokemons API is up and running !"));

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

app.listen(port, () =>
	console.log(`The app is running on : http://localhost:${port}`)
);
