import express from "express";
import * as pokemonsControllers from "../controllers/pokemonsControllers.js";

// Init router
export const pokemonRouter = express.Router();

// Endpoints
pokemonRouter.get("/", pokemonsControllers.getAllPokemons);

pokemonRouter.get("/:id", pokemonsControllers.getPokemon);

pokemonRouter.post("/", pokemonsControllers.addPokemon);

pokemonRouter.put("/:id", pokemonsControllers.updatePokemon);

pokemonRouter.delete("/:id", pokemonsControllers.deletePokemon);
