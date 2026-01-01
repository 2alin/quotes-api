import bcrypt from "bcrypt";
import fs from "fs";
import * as readlineSync from "readline-sync";

import config from "../config.js";
const { credentialsPath, hashSaltRounds } = config;

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
  const file = fs.readFileSync(credentialsPath);
  const credentials = JSON.parse(file);

  console.log("===== ADMIN CREDENTIALS =====");
  const username = readlineSync.question("Admin new username: ");
  const password = readlineSync.question("Admin new password: ", {
    hideEchoBack: true,
  });

  credentials.admin.username = username;
  credentials.admin.password = bcrypt.hashSync(password, hashSaltRounds);

  fs.writeFileSync(credentialsPath, JSON.stringify(credentials, null, "  "));
}

function addUserCredentials() {
  const file = fs.readFileSync(credentialsPath);
  const credentials = JSON.parse(file);

  console.log("===== USER CREDENTIALS =====");
  const userToken = readlineSync.question("User token to add: ");

  credentials.user.tokens.push(bcrypt.hashSync(userToken, hashSaltRounds));

  fs.writeFileSync(credentialsPath, JSON.stringify(credentials, null, "  "));
}

function initialize() {
  initCredentialsFile();
  setAdminCredentials();
  addUserCredentials();
}

initialize();
