export const pokemonModel = (sequelize, DataTypes) => {
	return sequelize.define(
		"Pokemon",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Le nom ne peut être une chaîne de caractère vide, merci de vérifier votre saisie."
					},
					notNull: {
						msg: "Le nom est une propriété qui est requise."
					}
				}
			},
			hp: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isInt: {
						msg: "Merci de n'utiliser que des nombres entiers pour les points de vie."
					},
					notNull: {
						msg: "Les points de vie sont une propriété qui est requise."
					}
				}
			},
			cp: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isInt: {
						msg: "Merci de n'utiliser que des nombres entiers pour les points de dégâts."
					},
					notNull: {
						msg: "Les points de dégâts sont une propriété qui est requise."
					}
				}
			},
			picture: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isUrl: {
						msg: "Merci de saisir une URL valide pour l'image."
					},
					notNull: {
						msg: "L'URL est une propriété qui est requise."
					}
				}
			},
			types: {
				type: DataTypes.STRING,
				allowNull: false,
				get() {
					return this.getDataValue("types").split(",");
				},
				set(types) {
					this.setDataValue("types", types.join());
				}
			}
		},
		{
			timestamps: true,
			createdAt: "created",
			updatedAt: false
		}
	);
};
