export const Config = {
  database: {
    host: process.env.DB_HOST ?? "localhost",
    port: parseInt(process.env.DB_PORT ?? "5432"),
    username: process.env.DB_USERNAME ?? "postgres",
    password: process.env.DB_PASSWORD ?? "",
    name: process.env.DB_NAME ?? "chinook",
    dialect: "postgres" as const,
  },
  app: {
    port: parseInt(process.env.PORT ?? "5001"),
  },
};
