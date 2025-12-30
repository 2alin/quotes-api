import express from "express";
import quotes from "../services/quotes.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    const result = quotes.getMultiple(req.query.page);
    res.json(result);
  } catch (err) {
    console.error("[quotes.get] Error while getting quotes", err);
    next(err);
  }
});

router.post("/", (req, res, next) => {
  try {
    const result = quotes.create(req.body);
    res.json(result);
  } catch (err) {
    console.error("[quote.set Error while adding quote", err);
    next(err);
  }
});

export default router;
