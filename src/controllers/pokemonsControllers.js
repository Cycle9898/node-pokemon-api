import { Pokemon } from "../database/sequelize.js";

export const getAllPokemons = (req, res) => {
	Pokemon.findAll().then(pokemons => {
		const message = `The list of ${pokemons.length} Pokemons has been correctly fetched.`;
		res.json({ message, data: pokemons });
	});
};

export const getPokemon = (req, res) => {
	Pokemon.findByPk(req.params.id).then(pokemon => {
		const message = `The Pokemon ${pokemon.name} has been correctly fetched.`;
		res.json({ message, data: pokemon });
	});
};
