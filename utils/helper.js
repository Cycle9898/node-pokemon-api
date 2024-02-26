export const success = (message, data) => {
	return { message, data };
};

export const getUniqueId = pokemons => {
	const pokemonsIds = pokemons.map(pokemon => pokemon.id);
	const maxId = pokemonsIds.reduce((a, b) => Math.max(a, b));
	const newId = maxId + 1;

	return newId;
};
