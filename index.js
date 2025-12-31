import express from "express";
import cors from "cors";

import config from "./config.js";
import quotesRouter from "./routes/quotes.js";

const app = express();
const { port } = config;

function logger(req, res, next) {
  console.log(`[${new Date()}] Request received`, {
    method: req.method,
    path: req.path,
    body: req.body,
  });
  next();
}

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({ message: "Quotes server is running" });
});

app.use("/quotes", quotesRouter);
app.use("/public", express.static("public"));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
