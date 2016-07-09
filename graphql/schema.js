'use strict';

let graphql = require('graphql');
let rootQueryType = require('./types/query');
let studentMutation = require('./mutations/student');

module.exports = new graphql.GraphQLSchema({
  query: rootQueryType,
  mutation: studentMutation
});
