import express from "express";
import quotes from "../services/quotes.js";

const router = express.Router();

router.get("/", function (req, res, next) {
  try {
    const body = quotes.getMultiple(req.query.page);
    res.json(body);
  } catch (err) {
    console.error("[quotes.get] Error while getting quotes", err);
    next(err);
  }
});

export default router;
