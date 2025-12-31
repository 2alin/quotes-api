import db from "./db.js";
import config from "../config.js";

function validateCreate(quoteObj) {
  const messages = [];

  if (!quoteObj) {
    messages.push("No quote object is provided.");
  }

  if (!quoteObj.quote) {
    messages.push("Quote is empty.");
  }

  if (!quoteObj.author) {
    messages.push("Author is empty.");
  }

  if (quoteObj.quote && quoteObj.quote.length > 1000) {
    messages.push("Quote is too long, maximum length is 1000.");
  }

  if (quoteObj.author && quoteObj.author.length > 200) {
    messages.push("Author is too long, maximum length is 200.");
  }

  if (messages.length > 0) {
    throw Error(messages.join(" "));
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
    throw Error("Error in creating quote");
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

function getSingle(quoteId) {
  const data = db.query("SELECT * FROM quotes WHERE id=?", [quoteId]);
  return data[0] || null;
}

function update(quoteId, quoteObj) {
  if (!quoteId) {
    throw Error("No quote ID is provided.");
  }

  validateCreate(quoteObj);

  const { quote, author } = quoteObj;

  const result = db.run(
    "UPDATE quotes SET quote=@quote , author=@author, created_at=CURRENT_TIMESTAMP WHERE id=@quoteId",
    { quote, author, quoteId }
  );

  if (!result.changes) {
    throw Error("Error in updating quote");
  }

  return {
    message: "Quote updated successfully",
    quoteUpdated: { quote, author },
  };
}

export default {
  create,
  getMultiple,
  getSingle,
  update,
};
