import jwt from "jsonwebtoken";

export const validateTokenMid = (req, res, next) => {
	const privateKey = process.env.SECRET_KEY || "DEFAULT_SECRET_KEY";
	const authorizationHeader = req.headers.authorization;

	if (!authorizationHeader) {
		const message =
			"Le jeton d'authentification est absent de la requête, merci de corriger.";
		return res.status(401).json({ message });
	}

	const token = authorizationHeader.split("_")[1];
	jwt.verify(token, privateKey, (error, decodedToken) => {
		if (error) {
			const message =
				"Le jeton d'authentification est invalide, merci de le vérifier.";
			return res.status(401).json({ message, data: error });
		}

		const userId = decodedToken.userId;
		if (req.body.userId && req.body.userId !== userId) {
			const message = "L'identifiant de l'utilisateur est invalide.";
			return res.status(401).json({ message });
		} else {
			next();
		}
	});
};
