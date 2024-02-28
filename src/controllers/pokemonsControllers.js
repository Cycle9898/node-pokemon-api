import { Pokemon } from "../database/sequelize.js";

export const getAllPokemons = (req, res) => {
	Pokemon.findAll().then(pokemons => {
		const message = `La liste des ${pokemons.length} Pokémons a bien été récupérée.`;
		res.json({ message, data: pokemons });
	});
};
