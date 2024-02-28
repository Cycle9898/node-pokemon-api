import express from "express";
import * as pokemonsControllers from "../controllers/pokemonsControllers.js";

// Init router
export const pokemonRouter = express.Router();

// Endpoints
pokemonRouter.get("/", pokemonsControllers.getAllPokemons);
