export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 4000,
  defaultLimit: process.env.DEFAULT_LIMIT || 5,
  pokeapiUrl: process.env.pokeapiUrl || 'https://pokeapi.co/api/v2/pokemon',
  mongodbConnection: process.env.MONGODB_CONNECTION,
});
