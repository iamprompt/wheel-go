function configuration() {
  return {
    PORT: parseInt(process.env.PORT, 10) || 3000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    SERVER_URL: process.env.SERVER_URL,
  }
}

export type Config = ReturnType<typeof configuration>

export default configuration
