'use strict';

let graphql = require('graphql');

let studentType = require('../types/student');
let studentGeoJsonType = require('../types/studentGeoJson');
let fs = require('fs');

let data = require('../../data/students.json');
const KEY = require('../../apiKey').key;
let nodeGeocoder = require('node-geocoder');
const geocoderOptions = {
  provider: 'mapquest',
  apiKey: KEY,
  formatter: null
}
let geocoder = nodeGeocoder(geocoderOptions);

// The graphQL definition of the query type
// This is where the querying language is determined
module.exports = new graphql.GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    student: {
      type: studentType,
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: function (_, args){
        return data.find(
          (el, index, arr) => {
            return el.id == args.id;
          }
        );
      }
    },
    studentJson: {
      type: studentGeoJsonType,
      args: {
        id: { type: graphql.GraphQLString }
      },
      resolve: function(_, args){
        let student = data.find(
          (el, index, arr) => {
            return el.id == args.id;
          }
        );
        return getStudentJson(student);
      }
    }
  }
});

function getStudentJson(student){
  let location = 
    student.address
    + ' ' +
    student.city
    + ' ' +
    student.state
    + ' ' +
    student.zip;
  return new Promise((resolve, reject) => {
    geocoder.geocode(location).then((res) => {
      console.log(res);
      let studentGeoJsonObj = {
        type: "Feature",
        bbox: [res[0].latitude, res[0].longitude],
      };
      resolve(studentGeoJsonObj);
    });
    
  });
}
