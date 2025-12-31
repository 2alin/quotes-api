import express from "express";
import quotes from "../services/quotes.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const result = quotes.getMultiple(req.query.page);
    res.json(result);
  } catch (err) {
    const errorMessage = `[quotes.get] Error while getting quotes. ${err.message}`;
    console.error(errorMessage);
    res.status(400).json({ error: errorMessage });
  }
});

router.post("/", (req, res) => {
  try {
    const result = quotes.create(req.body);
    res.json(result);
  } catch (err) {
    const errorMessage = "[quote.set] Error while adding quote. " + err.message;
    console.error(errorMessage);
    res.status(400).json({ error: errorMessage });
  }
});

router.get("/random", (req, res) => {
  try {
    const quote = quotes.getRandom();
    if (!quote) {
      throw new Error("Server doesn't have quotes yet.");
    }
    res.json({ data: quote });
  } catch (err) {
    const errorMessage = `[quote.getRandom] Error while getting quote. ${err.message}`;
    console.error(errorMessage);
    res.status(400).json({ error: errorMessage });
  }
});

router.get("/:quoteId", (req, res) => {
  try {
    const quote = quotes.getSingle(req.params.quoteId);
    if (!quote) {
      throw new Error("No quote with the given ID found.");
    }
    res.json({ data: quote });
  } catch (err) {
    const errorMessage = `[quote.get] Error while getting quote. ${err.message}`;
    console.error(errorMessage);
    res.status(400).json({ error: errorMessage });
  }
});

router.put("/:quoteId", (req, res) => {
  try {
    const storedQuote = quotes.getSingle(req.params.quoteId);
    if (!storedQuote) {
      throw new Error("Quote ID to update doesn't exist.");
    }

    const updateQuote = {
      quote: req.body.quote || storedQuote.quote,
      author: req.body.author || storedQuote.author,
    };

    const result = quotes.update(req.params.quoteId, updateQuote);
    res.json(result);
  } catch (err) {
    const errorMessage =
      "[quote.update] Error while updating quote. " + err.message;
    console.error(errorMessage);
    res.status(400).json({ error: errorMessage });
  }
});

router.delete("/:quoteId", (req, res) => {
  try {
    const result = quotes.remove(req.params.quoteId);
    res.json(result);
  } catch (err) {
    const errorMessage =
      "[quote.delete] Error while deleting quote. " + err.message;
    console.error(errorMessage);
    res.status(400).json({ error: errorMessage });
  }
});

export default router;
