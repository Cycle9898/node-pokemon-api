import { Pokemon } from "../database/sequelize.js";
import { ValidationError, UniqueConstraintError, Op } from "sequelize";

export const getAllPokemons = (req, res) => {
	const limitNb = parseInt(req.query.limit) || null;
	const options = {
		order: ["name"],
		limit: limitNb
	};

	if (req.query.name) {
		const name = req.query.name;

		if (!req.query.limit) {
			options.limit = 5;
		}

		if (name.length < 2) {
			const message =
				"Merci d'indiquer au minimum 2 caractères pour le terme de recherche.";
			return res.status(400).json({ message });
		}

		return Pokemon.findAndCountAll({
			where: {
				name: {
					[Op.like]: `%${name}%`
				}
			},
			...options
		}).then(({ count, rows }) => {
			const message = `Il y a ${count} pokémon(s) qui correspond(ent) au terme de recherche '${name}'. ${
				count > options.limit ? options.limit : count
			} résultat(s) transmis.`;
			res.json({ message, data: rows });
		});
	} else {
		Pokemon.findAll(options)
			.then(pokemons => {
				const message = `La liste des ${pokemons.length} Pokémon(s) a bien été récupérée.`;
				res.json({ message, data: pokemons });
			})
			.catch(error => {
				const message =
					"La liste des Pokémons n'a pas pu être récupérée. Veuillez réessayer dans quelques instants.";
				res.status(500).json({ message, data: error });
			});
	}
};

export const getPokemon = (req, res) => {
	Pokemon.findByPk(req.params.id)
		.then(pokemon => {
			if (pokemon === null) {
				const message =
					"Le Pokémon demandé n'existe pas. Veuillez vérifier l'identifiant.";
				return res.status(404).json({ message });
			}

			const message = `Le Pokémon ${pokemon.name} a bien été récupéré.`;
			res.json({ message, data: pokemon });
		})
		.catch(error => {
			const message =
				"Le Pokémon n'a pas pu être récupéré. Veuillez réessayer dans quelques instants.";
			res.status(500).json({ message, data: error });
		});
};

export const addPokemon = (req, res) => {
	Pokemon.create(req.body)
		.then(pokemon => {
			const message = `Le Pokémon ${pokemon.name} a bien été créé.`;
			res.json({ message, data: pokemon });
		})
		.catch(error => {
			if (
				error instanceof ValidationError ||
				error instanceof UniqueConstraintError
			) {
				return res
					.status(400)
					.json({ message: error.message, data: error });
			}
			const message =
				"Le Pokémon n'a pas pu être ajouté. Veuillez réessayer dans quelques instants.";
			res.status(500).json({ message, data: error });
		});
};

export const updatePokemon = (req, res) => {
	const id = req.params.id;
	Pokemon.update(req.body, {
		where: { id }
	})
		.then(_ => {
			return Pokemon.findByPk(id).then(pokemon => {
				if (pokemon === null) {
					const message =
						"Le Pokémon demandé n'existe pas. Veuillez vérifier l'identifiant.";
					return res.status(404).json({ message });
				}

				const message = `Le Pokémon ${pokemon.name} a bien été modifié.`;
				res.json({ message, data: pokemon });
			});
		})
		.catch(error => {
			if (
				error instanceof ValidationError ||
				error instanceof UniqueConstraintError
			) {
				return res
					.status(400)
					.json({ message: error.message, data: error });
			}
			const message =
				"Le Pokémon n'a pas pu être modifié. Veuillez réessayer dans quelques instants.";
			res.status(500).json({ message, data: error });
		});
};

export const deletePokemon = (req, res) => {
	Pokemon.findByPk(req.params.id)
		.then(pokemon => {
			if (pokemon === null) {
				const message =
					"Le Pokémon demandé n'existe pas. Veuillez vérifier l'identifiant.";
				return res.status(404).json({ message });
			}

			const pokemonDeleted = pokemon;

			return Pokemon.destroy({
				where: { id: pokemon.id }
			}).then(_ => {
				const message = `Le Pokémon avec l'identifiant n°${pokemonDeleted?.id} a bien été supprimé.`;
				res.json({ message, data: pokemonDeleted });
			});
		})
		.catch(error => {
			const message =
				"Le Pokémon n'a pas pu être supprimé. Veuillez réessayer dans quelques instants.";
			res.status(500).json({ message, data: error });
		});
};
