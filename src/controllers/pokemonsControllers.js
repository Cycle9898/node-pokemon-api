import { Pokemon } from "../database/sequelize.js";

export const getAllPokemons = (req, res) => {
	Pokemon.findAll().then(pokemons => {
		const message = `La liste des ${pokemons.length} Pokémons a bien été récupérée.`;
		res.json({ message, data: pokemons });
	});
};

export const getPokemon = (req, res) => {
	Pokemon.findByPk(req.params.id).then(pokemon => {
		const message = `Le Pokémon ${pokemon.name} a bien été récupéré.`;
		res.json({ message, data: pokemon });
	});
};

export const addPokemon = (req, res) => {
	Pokemon.create(req.body).then(pokemon => {
		const message = `Le Pokémon ${pokemon.name} a bien été créé.`;
		res.json({ message, data: pokemon });
	});
};

export const updatePokemon = (req, res) => {
	const id = req.params.id;
	Pokemon.update(req.body, {
		where: { id }
	}).then(_ => {
		Pokemon.findByPk(id).then(pokemon => {
			const message = `Le Pokémon ${pokemon.name} a bien été modifié.`;
			res.json({ message, data: pokemon });
		});
	});
};
