import express from "express";
import quotes from "../services/quotes.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    const result = quotes.getMultiple(req.query.page);
    res.json(result);
  } catch (err) {
    const errorMessage = "[quotes.get] Error while getting quotes.";
    console.error(errorMessage, err.message);
    res.status(400).json({ error: errorMessage });
  }
});

router.post("/", (req, res, next) => {
  try {
    const result = quotes.create(req.body);
    res.json(result);
  } catch (err) {
    const errorMessage = "[quote.set] Error while adding quote. " + err.message;
    console.error(errorMessage);
    res.status(400).json({ error: errorMessage });
  }
});

router.put("/:quoteId", (req, res, next) => {
  try {
    const storedQuote = quotes.getSingle(req.params.quoteId);
    if (!storedQuote) {
      throw new Error("Quote ID to update doesn't exist");
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

export default router;
