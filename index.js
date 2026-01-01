import cors from "cors";
import express from "express";
import fs from "fs";

import config from "./config.js";
import middleware from "./middleware.js";
import quotesRouter from "./routes/quotes.js";

const { credentialsPath, publicPagesPath } = config;

function isAdminSetup() {
  let credentials;

  try {
    const file = fs.readFileSync(credentialsPath);
    credentials = JSON.parse(file);
  } catch (err) {
    return false;
  }

  const { admin } = credentials;
  if (admin && admin.username && admin.password) {
    return true;
  }

  return false;
}

if (!isAdminSetup()) {
  console.error(
    "[isAdminSetup] Couldn't find admin credentials. " +
      "Try initializing credentials first: `node setup/credentials.js`."
  );
}

const app = express();

const { port } = config;
const { logger } = middleware;

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({ message: "Quotes server is running" });
});

app.use("/quotes", quotesRouter);
app.use("/public", express.static(publicPagesPath));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
