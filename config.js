import path from "path";

const databaseRelPath = "./database/quotes.db";

const config = {
  databasePath: path.join(import.meta.dirname, databaseRelPath),
  itemsPerPage: process.env.ITEMS_PER_PAGE || 10,
};

export default config;
