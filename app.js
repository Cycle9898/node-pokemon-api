import express from "express";
import morgan from "morgan";
import favicon from "serve-favicon";
import { initDb, testDatabaseConnection } from "./src/database/sequelize.js";
import { pokemonRouter } from "./src/Routes/pokemonsRoutes.js";
import { getUniqueId, success } from "./src/utils/helper.js";
import { pokemons } from "./src/database/mocked_data/mock-pokemon.js";

// copy of Pokemon mocked data (will be deleted with real endpoints)
let pokemonsArray = [...pokemons];

// Express app
const app = express();
const port = 3000;

// Middlewares
app.use(favicon("./src/assets/favicon.ico"))
	.use(morgan("dev"))
	.use(express.json());

// MariaDB database interaction(s)
testDatabaseConnection();
initDb();

// Router
app.get("/", (req, res) => res.send("Pokemons API is up and running !"));
app.use("/api/pokemons", pokemonRouter);

// Listening
app.listen(port, () =>
	console.log(`The app is running on : http://localhost:${port}`)
);
