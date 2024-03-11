import { Sequelize, DataTypes } from "sequelize";
import { pokemonModel } from "./models/pokemon.js";
import { userModel } from "./models/user.js";
import { pokemons } from "./mocked_data/mock-pokemon.js";
import bcrypt from "bcrypt";

// Init sequelize
const sequelize = new Sequelize(
	process.env.DB_NAME || "pokedex",
	process.env.DB_USERNAME || "root",
	process.env.DB_PASSWORD || "",

	{
		host: process.env.DB_HOST || "localhost",
		dialect: process.env.DB_DIALECT || "mariadb",
		dialectOptions: {
			timezone: "Etc/GMT-2"
		},
		logging: process.env.NODE_ENV === "production"
	}
);

// Models related
export const Pokemon = pokemonModel(sequelize, DataTypes);
export const User = userModel(sequelize, DataTypes);

// Database related
export const testDatabaseConnection = () => {
	sequelize
		.authenticate()
		.then(_ =>
			console.log(
				"Database connection has been successfully established."
			)
		)
		.catch(error =>
			console.log(`Unable to connect to the database : ${error}`)
		);
};

export const initDb = () => {
	return sequelize.sync().then(_ => {
		Pokemon.findAll().then(pokemons => {
			if (pokemons.length == 0) {
				pokemons.map(pokemon => {
					Pokemon.create({
						name: pokemon.name,
						hp: pokemon.hp,
						cp: pokemon.cp,
						picture: pokemon.picture,
						types: pokemon.types
					});
				});
			}
		});

		User.findAll().then(users => {
			if (users.length == 0) {
				bcrypt
					.hash("test", 10)
					.then(hash =>
						User.create({ username: "test", password: hash })
					);
			}
		});

		console.log("Pokedex database has been correctly synchronized");
	});
};
