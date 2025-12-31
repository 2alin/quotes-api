# Simple Quotes Server

This projects exposes a series of APIs that will allow users to retrieve and store quotes.

## Building the project

### Dependencies

We need the following:

- Node 22.21+
- SQLite 3

### Instructions

- Run `npm i` to install dependencies
- Run `npm run build` to setup the project

## Server APIs

### `GET /quotes`

Retrieves an amount of quotes that is specified by the value `itemsPerPage` (`10` by default, see [config file](./config.js)) and the `page` search query parameter.

#### Query Parameters

- `page`: The starting point from where to retrieve quotes. Pagination starts with `1`.

#### Responses

- `200`- JSON schema: `{data: Quote[], meta: {page: string}}`
- `400` - JSON schema: `{error: string}`

### `POST /quote`

Adds a new quote to the server.

### Header parameters

- `Content-Type: application/json`

#### Request body schema

- `quote`: The quote content. Required value. String type.
- `author`: The quote author. Required value. String type.

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

- `quote`: The quote content. Optional value. String type.
- `author`: The quote author. Optional value. String type.

#### Responses

- `200` - JSON schema: `{message: string, quoteUpdated: Quote}`
- `400` - JSON schema: `{error: string}`

## Server pages

The server exposes the following pages that helps to interact with itself:

- `public/get-quotes.html`: To get a list of quotes per page.
- `public/add-quote.html`: To add a quote to the server.

## Acknowledgements

- The initial work on this project was based on https://github.com/geshan/nodejs-sqlite. Thank you.
