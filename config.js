import path from "path";

const credentialsRelPath = "./credentials.json";
const databaseRelPath = "./database/quotes.db";
const publicPagesRelPath = "./public";

const config = {
  credentialsPath: path.join(import.meta.dirname, credentialsRelPath),
  databasePath: path.join(import.meta.dirname, databaseRelPath),
  publicPagesPath: path.join(import.meta.dirname, publicPagesRelPath),
  hashSaltRounds: 10,
  itemsPerPage: process.env.ITEMS_PER_PAGE || 10,
  port: process.env.PORT || 3000,
  userTokenExpirationDays: 180,
  userTokenLength: 64,
};

export default config;
