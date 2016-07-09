'use strict';

let graphql = require('graphql');

module.exports = new graphql.GraphQLObjectType({
  name: 'studentGeoJson',
  fields: {
    type: { type: graphql.GraphQLString },
    bbox: { type: new graphql.GraphQLList(graphql.GraphQLFloat) }
  }
});
