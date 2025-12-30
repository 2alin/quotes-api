import db from "./db.js";
import config from "../config.js";

function getMultiple(page = 1) {
  const offset = (page - 1) * config.itemsPerPage;
  const data = db.query("SELECT * FROM quotes LIMIT ?,?", [
    offset,
    config.itemsPerPage,
  ]);
  const meta = { page };

  return {
    data,
    meta,
  };
}

export default {
  getMultiple,
};
