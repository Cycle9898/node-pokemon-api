# NodeJS Pokemon API

This API REST is created with NodeJS, Express and use a MariaDB database.

With it, you can fetch data about Pokemons, authenticate users and then create, modify or delete a Pokemon stored in the database.

## Getting Started

### Prerequisites

This API uses the following tech stack:

-   [Node.js](https://nodejs.org/en)
-   [XAMPP](https://www.apachefriends.org/index.html) to host a mariaDB database locally, for dev purpose
-   [PNPM](https://pnpm.io/)

Please make sure you have the latest versions.

### Instructions

1. Launch XAMPP
2. Create a database named "pokedex" with PHPMyAdmin web interface given with XAMPP, if it doesn't exist
3. Fork this repo
4. Clone the repo onto your computer
5. Open a terminal window in the cloned project
6. Run the following commands:

```bash
# Install dependencies
pnpm install

# Start local dev server with automatic restart on changes
pnpm dev

# OR start static local server
pnpm start
```

Your server should now be running at http://locahost:3000 (default URL and port) and you will now have a test user and 12 Pokemons in your database!

### Test user

Here are the test user credentials :

-   username: test
-   password: test

## API endpoints

-   POST "/api/auth/login"

Used to authenticate a user and get a JWT token.

The request body needs to contain username and password properties.

-   GET "/api/pokemons" or "/api/pokemons/:id"

Fetch data from all Pokemons or only one if an id is specified.

Name or limit query parameters are also usable.

Name query parameter is useful for searching among Pokemons' names and limit query parameter to display only a part of results.

-   POST "/api/pokemons"

Add a new Pokemon in the database.

The request body needs to contain name, hp (health points), cp (combat point), picture (URL of the Pokemon picture) and types (Arrray of Pokemon type(s)) properties.

-   PUT "/api/pokemons/:id"

Modify a Pokemon already in the database.

The request body needs to contain name, hp (health points), cp (combat point), picture (URL of the Pokemon picture) and types (Arrray of Pokemon type(s)) properties.

-   DELETE "/api/pokemons/:id"

Delete a Pokemon already in the database.

## Environment variables

It is possible to modify some back-end app settings with environment variables.

Create or modify the .env file in the project root folder and add in it environment variables.

Here is the used ones :

### NODE_ENV

Specify the node.js environnement.

If NODE_ENV is set to "production", Express will be optimized for production.

### PORT

Modify the server listening port.

Otherwise, the default port is "3000".

### SECRET_KEY

This back-end app use JWT tokens to authenticate HR users requests.

It is possible to store your own secret key, in the SECRET_KEY environment variable, that will be used to generate these tokens.

Otherwise, the default secret key is "DEFAULT_SECRET_KEY".

### DB_NAME

Name of the database.

Used with Sequelize to connect to the database.

Otherwise, the default name is "pokedex".

### DB_USERNAME and DB_PASSWORD

These variables are the credentials to connect to the database with Sequelize.

Otherwise, the default credentials are "root" and "".

### DB_HOST

Host name where the database is hosted.

Default value is "localhost".

### DB_DIALECT

The underlying connector library used by Sequelize to act on the database.

XAMPP use a mariaDB database so the default value is "mariadb".

More infos on the [Sequelize docs](https://sequelize.org/docs/v6/other-topics/dialect-specific-things/).
