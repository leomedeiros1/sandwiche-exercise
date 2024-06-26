module.exports = {
  pgUser: process.env.POSTGRES_USER,
  pgHost: process.env.POSTGRES_HOST,
  pgDatabase: process.env.POSTGRES_DBNAME,
  pgPassword: process.env.POSTGRES_PASSWORD,
  pgPort: process.env.POSTGRES_PORT,
  backendPort: process.env.BACKEND_PORT,
  environment: process.env.NODE_ENV,
};
