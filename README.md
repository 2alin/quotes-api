# Simple Quotes Server

This projects exposes a series of APIs that will allow users to retrieve and store quotes.

## Building the project

### Dependencies

We need the following:

- Node 22.21+
- SQLite 3

### Project setup

- Run `npm i` to install dependencies
- Run `npm run build` to setup the project (database)
- Run `npm run create-auth` to create credentials for administrator and user. See bellow for updating credentials.

### Authentication Credentials

The script `setup/credentials.js` offers the following options:

- `node setup/credentials.js` will clear current credentials and prompt for new username and password for the Admin user and new User Token.
- `node setup/credentials.js --admin` will prompt for Admin credentials and update the stored ones.
- `node setup/credentials.js --user` will prompt for a new User Token to add to the stored ones.

Note: Administrator password is hashed before being stored locally.

## Server APIs

### `GET /quotes`

Retrieves an amount of quotes that is specified by the value `itemsPerPage` (`10` by default, see [config file](./config.js)) and the `page` search query parameter.

#### Query Parameters

- `page`: The starting point from where to retrieve quotes. Pagination starts with `1`.

#### Responses

- `200`- JSON schema: `{data: Quote[], meta: {page: string}}`
- `400` - JSON schema: `{error: string}`

### `GET /quotes/random`

Gets a random quote from the server.

#### Responses

- `200` - JSON schema: `{data: Quote}`
- `400` - JSON schema: `{error: string}`

### `GET /quotes/:quoteId`

Gets the quote with given ID from the server.

#### Path parameters

- `quoteId`: The ID of the quote

#### Responses

- `200` - JSON schema: `{data: Quote}`
- `400` - JSON schema: `{error: string}`

### `POST /quote`

Adds a new quote to the server.

### Header parameters

- `Content-Type: application/json`

#### Request body schema

- `quote`: The quote content. Required value. Should be unique. String type. Maximum length is 1000 characters.
- `author`: The quote author. Required value. String type. Maximum length is 200 characters.

#### Responses

- `200` - JSON schema: `{message: string, quoteAdded: Quote}`
- `400` - JSON schema: `{error: string}`

### `PUT /quotes/:quoteId`

Updates the content of the quote in the server.

#### Path parameters

- `quoteId`: The ID of the quote to update

### Header parameters

- `Content-Type: application/json`

#### Request body schema

- `quote`: The quote content. Optional value. Should be unique. String type. Maximum length is 1000 characters.
- `author`: The quote author. Optional value. String type. Maximum length is 200 characters.

#### Responses

- `200` - JSON schema: `{message: string, quoteUpdated: Quote}`
- `400` - JSON schema: `{error: string}`

### `DELETE /quotes/:quoteId`

Removes the quote with given ID from the server.

#### Path parameters

- `quoteId`: The ID of the quote to remove

#### Responses

- `200` - JSON schema: `{message: string, quoteId: string}`
- `400` - JSON schema: `{error: string}`

## Server pages

The server exposes the following pages that helps to interact with itself:

- `public/get-quotes.html`: To get a list of quotes per page.
- `public/add-quote.html`: To add a quote to the server.

## Acknowledgements

- The initial work on this project was based on https://github.com/geshan/nodejs-sqlite. Thank you.
