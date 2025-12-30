import express from "express";
import quotesRouter from "./routes/quotes.js";

const app = express();
const port = 3000 || process.env.PORT;

app.get("/", (req, res) => {
  res.json({ message: "Quotes server is running" });
});

app.use("/quotes", quotesRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
