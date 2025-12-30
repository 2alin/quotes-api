import db from "./db.js";
import config from "../config.js";

function validateCreate(quoteObj) {
  const messages = [];

  if (!quoteObj) {
    messages.push("No quote object is provided");
  }

  if (!quoteObj.quote) {
    messages.push("Quote is empty");
  }

  if (!quoteObj.author) {
    messages.push("Author is empty");
  }

  if (messages.length > 0) {
    const error = new Error(messages.join());
    error.statusCode = 400;

    throw Error;
  }
}

function create(quoteObj) {
  validateCreate(quoteObj);
  const { quote, author } = quoteObj;
  const result = db.run(
    "INSERT INTO quotes (quote, author) VALUES (@quote, @author)",
    { quote, author }
  );

  if (!result.changes) {
    return { message: "Error in creating quote", quoteAdded: null };
  }

  return {
    message: "Quote created successfully",
    quoteAdded: { quote, author },
  };
}

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
  create,
  getMultiple,
};
