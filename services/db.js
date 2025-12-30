import sqlite from "better-sqlite3";
import config from "../config.js";
const { databasePath } = config;

const db = new sqlite(databasePath, { fileMustExist: true });

function query(sql, params) {
  return db.prepare(sql).all(params);
}

function run(sql, params) {
  return db.prepare(sql).run(params);
}

export default {
  query,
  run,
};
