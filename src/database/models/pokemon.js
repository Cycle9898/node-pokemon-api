const validPokemonTypes = [
	"Plante",
	"Poison",
	"Feu",
	"Eau",
	"Insecte",
	"Vol",
	"Normal",
	"Électrique",
	"Fée"
];

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
				unique: {
					msg: "Ce Pokémon a déjà été créé."
				},
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
					min: {
						args: [0],
						msg: "Les points de vie doivent être supérieurs ou égaux à 0."
					},
					max: {
						args: [999],
						msg: "Les points de vie doivent être inférieurs ou égaux à 999."
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
					min: {
						args: [0],
						msg: "Les points de dégâts doivent être supérieurs ou égaux à 0."
					},
					max: {
						args: [999],
						msg: "Les points de dégâts doivent être inférieurs ou égaux à 999."
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
					if (!Array.isArray(types)) {
						throw new Error(
							"Merci de fournir les types dans un tableau."
						);
					} else {
						this.setDataValue("types", types.join());
					}
				},
				validate: {
					isTypesValid(value) {
						if (!value) {
							throw new Error(
								"Merci d'indiquer au moins un type"
							);
						}
						if (value.split(",").length > 3) {
							throw new Error(
								"Merci de ne pas indiquer plus de trois types par Pokémon."
							);
						}
						value.split(",").forEach(type => {
							if (!validPokemonTypes.includes(type)) {
								throw new Error(
									`Le type d'un Pokémon doit appartenir à la liste suivante : ${validPokemonTypes}`
								);
							}
						});
					}
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
