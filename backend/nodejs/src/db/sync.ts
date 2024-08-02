import { sequelize } from "./sequelize";

export const syncDb = async () => {
  await sequelize.sync({ force: false });
  console.log("Database & tables synced!");
};
