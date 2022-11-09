export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 4000,
  defaultLimit: process.env.DEFAULT_LIMIT || 5,
  POKEAPI_URL: process.env.POKEAPI_URL || 'https://pokeapi.co/api/v2/pokemon',
  MONGODB: process.env.MONGODB,
});
