import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

import config from "../config.js";
const { databasePath } = config;

/**
 * Initializing database
 */

const databaseDir = path.dirname(databasePath);

if (!fs.existsSync(databaseDir)) {
  fs.mkdirSync(databaseDir, { recursive: true });
  console.log(`[setup] Directory ${databaseDir} has been created`);
}

if (!fs.existsSync(databasePath)) {
  fs.writeFileSync(databasePath, "");
  console.log(`[setup] Database file ${databasePath} has been created`);
}

const db = new Database(databasePath);
try {
  db.exec(`CREATE TABLE quotes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quote text NOT NULL UNIQUE,
    author text NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
  )`);
  console.log("[setup] Database table 'quotes' has been created");
} catch (error) {
  console.error(error);
}
db.close();
