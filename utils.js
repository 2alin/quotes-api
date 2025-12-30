import path from "path";

const databaseRelPath = "./database/quotes.db";
export const databasePath = path.join(import.meta.dirname, databaseRelPath);
