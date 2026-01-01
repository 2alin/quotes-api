import path from "path";

const credentialsRelPath = "./credentials.json";
const databaseRelPath = "./database/quotes.db";

const config = {
  credentialsPath: path.join(import.meta.dirname, credentialsRelPath),
  databasePath: path.join(import.meta.dirname, databaseRelPath),
  hashSaltRounds: 10,
  itemsPerPage: process.env.ITEMS_PER_PAGE || 10,
  port: 3000 || process.env.PORT,
  userTokenExpirationDays: 180,
  userTokenLength: 64,
};

export default config;
