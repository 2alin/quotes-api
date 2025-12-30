import express from "express";
import quotesRouter from "./routes/quotes.js";

const app = express();
const port = 3000 || process.env.PORT;

function logger(req, res, next) {
  console.log(`[${new Date()}] Request received`, {
    method: req.method,
    path: req.path,
    body: req.body,
  });
  next();
}

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({ message: "Quotes server is running" });
});

app.use("/quotes", quotesRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
