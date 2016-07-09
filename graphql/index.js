'use strict';

let express = require('express');
let graphqlHTTP = require('express-graphql');
let schema = require('./schema');

let app = express()
  .use('/graphql', graphqlHTTP({ schema: schema, pretty: true }));

export default app;

