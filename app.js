import express from "express";
import favicon from "serve-favicon";
import { initDb, testDatabaseConnection } from "./src/database/sequelize.js";
import { userRouter } from "./src/Routes/usersRoutes.js";
import { pokemonRouter } from "./src/Routes/pokemonsRoutes.js";
import "dotenv/config";
import cors from "cors";

// Express app
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(favicon("./src/assets/favicon.ico")).use(express.json()).use(cors());

// MariaDB database interaction(s)
testDatabaseConnection();
initDb();

// Router
app.get("/", (req, res) => res.send("Pokemons API is up and running !"));
app.use("/api/auth", userRouter);
app.use("/api/pokemons", pokemonRouter);
//handling bad URL's
app.use(({ res }) => {
	const message =
		"Impossible de trouver la ressource demandée ! Merci de vérifier l'URL.";
	res.status(404).json({ message });
});

// Listening
app.listen(port, () => console.log(`The app is running on PORT : ${port}`));
