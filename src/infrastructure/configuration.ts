export default () => ({
  port: process.env.PORT || 3000,
  database_url: process.env.DATABASE_URL,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpiration: process.env.JWT_ACCESS_EXPIRATION || '1h',
    refreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
  }
});