import bcrypt from "bcrypt";
import crypto from "crypto";
import fs from "fs";
import process from "process";
import * as readlineSync from "readline-sync";

import config from "../config.js";
const { credentialsPath, hashSaltRounds } = config;

import utils from "../utils.js";

function initCredentialsFile() {
  const credentials = {
    admin: {
      username: "",
      password: "",
    },
    user: {
      tokens: [],
    },
  };

  fs.writeFileSync(credentialsPath, JSON.stringify(credentials, null, "  "));
}

function setAdminCredentials() {
  console.log("===== ADMIN CREDENTIALS =====");
  let credentials;

  try {
    const file = fs.readFileSync(credentialsPath);
    credentials = JSON.parse(file);
  } catch (err) {
    console.error(
      "[credentials.admin] Problem while accessing credentials file. " +
        "Try initializing credentials first: `node setup/credentials.js`.",
      err
    );
    return;
  }

  const username = readlineSync.question("Admin new username: ");
  const password = readlineSync.question("Admin new password: ", {
    hideEchoBack: true,
  });

  credentials.admin.username = username;
  credentials.admin.password = bcrypt.hashSync(password, hashSaltRounds);

  fs.writeFileSync(credentialsPath, JSON.stringify(credentials, null, "  "));
}

function createNewUserToken() {
  console.log("===== ADDING NEW USER TOKEN =====");
  let credentials;

  try {
    const file = fs.readFileSync(credentialsPath);
    credentials = JSON.parse(file);
  } catch (err) {
    console.error(
      "[credentials.user] Problem while accessing credentials file. " +
        "Try initializing credentials first: `node setup/credentials.js`.",
      err
    );
    return;
  }

  const token = crypto.randomBytes(config.userTokenLength).toString("hex");
  const expirationInMs =
    Date.now() + config.userTokenExpirationDays * utils.dayInMs;
  const expiration = new Date(expirationInMs);
  const tokenObj = { token, expiration };

  credentials.user.tokens.push(tokenObj);

  console.log("New Token User has been added: ", tokenObj);

  fs.writeFileSync(credentialsPath, JSON.stringify(credentials, null, "  "));
}

function initialize() {
  console.log("===== INITIALIZING CREDENTIALS =====");

  initCredentialsFile();
  setAdminCredentials();

  console.log("Credentials file has been created at: ", credentialsPath);
}

const parameter =
  process.argv.slice(2).find((item) => item.startsWith("--")) || "";
const flag = parameter.slice(2);

switch (flag) {
  case "admin":
    setAdminCredentials();
    break;
  case "user":
    createNewUserToken();
    break;
  default:
    initialize();
}
