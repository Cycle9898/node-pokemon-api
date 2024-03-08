import express from "express";
import * as pokemonsControllers from "../controllers/pokemonsControllers.js";
import { validateTokenMid } from "../middlewares/tokenValidation.js";

// Init router
export const pokemonRouter = express.Router();

// Endpoints
pokemonRouter.get("/", pokemonsControllers.getAllPokemons);

pokemonRouter.get("/:id", pokemonsControllers.getPokemon);

pokemonRouter.post("/", validateTokenMid, pokemonsControllers.addPokemon);

pokemonRouter.put("/:id", validateTokenMid, pokemonsControllers.updatePokemon);

pokemonRouter.delete(
	"/:id",
	validateTokenMid,
	pokemonsControllers.deletePokemon
);
