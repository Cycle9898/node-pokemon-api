import { User } from "../database/sequelize.js";
import bcrypt from "bcrypt";

export const login = (req, res) => {
	User.findOne({ where: { username: req.body.username } }).then(user => {
		if (!user) {
			const message =
				"Le nom d'utilisateur ou le mot de passe sont incorrects. Merci de les vérifier.";
			return res.status(404).json({ message });
		}

		bcrypt
			.compare(req.body.password, user.password)
			.then(isPasswordValid => {
				if (!isPasswordValid) {
					const message =
						"Le nom d'utilisateur ou le mot de passe sont incorrects. Merci de les vérifier.";
					return res.status(401).json({ message });
				}

				const message = "L'utilisateur a été authentifié avec succès.";
				return res.json({ message, data: user });
			})
			.catch(error => {
				const message =
					"L'utilisateur n'a pas pu être authentifié. Veuillez réessayer dans quelques instants.";
				return res.status(500).json({ message, data: error });
			});
	});
};
