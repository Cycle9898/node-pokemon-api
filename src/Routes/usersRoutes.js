import express from "express";
import * as usersControllers from "../controllers/usersControllers.js";
// Init router
export const userRouter = express.Router();

// Endpoints
userRouter.post("/login", usersControllers.login);
