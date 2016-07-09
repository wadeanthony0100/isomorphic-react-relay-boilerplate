'use strict';

const dataI = './../../data/students.json';
const dataO = './data/students.json';

let graphql = require('graphql');
let studentType = require('../types/student');
let data = require(dataI);
let fs = require('fs');

let mutateStudent = new graphql.GraphQLObjectType({
  name: 'studentMutations',
  fields: () => ({
    createStudent: {
      type: studentType,
      args: {
        id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        lastname: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        firstname: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        address: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        city: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        state: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        zip: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        balance: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        gpa: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        hours: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        financialaid: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) }
      },
      resolve: (source, args) => {
        let newStudent = Object.assign({}, args);
        //Add the new student to the data store
        data.push(newStudent);
        fs.open(dataO, 'w+', (err, fd) => {
          fs.write(fd, JSON.stringify(data, null, 2), (err, num, str) => {
            if (err) console.log(err);
          })
        });
        // fs.writeFileSync(dataO, data); 
        return newStudent;
      }
    }
  })
});

module.exports = mutateStudent;
