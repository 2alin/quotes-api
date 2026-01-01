import bcrypt from "bcrypt";
import fs from "fs";

import config from "./config.js";
const { credentialsPath } = config;

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] Request received`, {
    method: req.method,
    originalUrl: req.originalUrl,
    body: req.body,
  });
  next();
}

const roles = {
  ADMIN: "admin",
  USER: "user",
};

function getRole(req) {
  let credentials;

  try {
    const file = fs.readFileSync(credentialsPath);
    credentials = JSON.parse(file);
  } catch (err) {
    console.error(
      "[getRole] Problem while accessing credentials file. " +
        "Try initializing credentials first: `node setup/credentials.js`.",
      err
    );
    return;
  }

  const authHeader = req.headers.authorization;
  const apiToken = req.headers["api-token"];

  if (authHeader) {
    const auth = new Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");

    const username = auth[0];
    const password = auth[1];

    if (
      username === credentials.admin.username &&
      bcrypt.compareSync(password, credentials.admin.password)
    ) {
      return roles.ADMIN;
    }
  } else if (apiToken) {
    const isValidToken = credentials.user.tokens.some(
      ({ token, expiration }) =>
        token === apiToken && Date.now() < new Date(expiration)
    );

    if (isValidToken) {
      return roles.USER;
    }
  }
  return null;
}

function isAdmin(req, res, next) {
  const role = getRole(req);

  if (role === roles.ADMIN) {
    console.log("[isAdmin] Admin detected");
    next();
  } else {
    console.error("[isAdmin] Invalid request");
    res.status(400).json({ error: "Invalid request" });
  }
}

function isUser(req, res, next) {
  const role = getRole(req);

  if (role === roles.USER || role === roles.ADMIN) {
    console.log("[isUser] User detected");
    next();
  } else {
    console.error("[isUser] Invalid request");
    res.status(400).json({ error: "Invalid request" });
  }
}

export default {
  isAdmin,
  isUser,
  logger,
  roles,
};
