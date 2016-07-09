'use strict';

let graphql = require('graphql');

// The graphQL version of the data model
let studentType = new graphql.GraphQLObjectType({
  name: 'Student',
  fields: {
    id: { type: graphql.GraphQLString },
    lastname: { type: graphql.GraphQLString },
    firstname: { type: graphql.GraphQLString },
    address: { type: graphql.GraphQLString },
    city: { type: graphql.GraphQLString },
    state: { type: graphql.GraphQLString },
    zip: { type: graphql.GraphQLString },
    balance: { type: graphql.GraphQLString },
    gpa: { type: graphql.GraphQLString },
    hours: { type: graphql.GraphQLString },
    financialaid: { type: graphql.GraphQLString }
  }
});

module.exports = studentType;

