import { Sequelize, DataTypes } from "sequelize";
import { pokemonModel } from "./models/pokemon.js";
import { userModel } from "./models/user.js";
import { pokemons } from "./mocked_data/mock-pokemon.js";

// Init sequelize
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
	return sequelize.sync({ force: true }).then(_ => {
		pokemons.map(pokemon => {
			Pokemon.create({
				name: pokemon.name,
				hp: pokemon.hp,
				cp: pokemon.cp,
				picture: pokemon.picture,
				types: pokemon.types
			}).then(pokemon => console.log(pokemon.toJSON()));
		});

		User.create({
			username: "test",
			password: "test"
		}).then(user => console.log(user.toJSON()));

		console.log("Pokedex database has been correctly synchronized");
	});
};
