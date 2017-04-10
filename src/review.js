var express = require('express');
var mysql = require('mysql');

var review = {
  findAll: function(){
    return new Promise(function( resolve, reject){
      var connection = mysql.createConnection({
        host     : 'itp460.usc.edu',
        user     : 'student',
        password : 'ttrojan',
        database : 'itp405-midterm'
      });

      connection.connect();
      connection.query('SELECT * FROM reviews', function(error, results) {
        if(error){
          reject({
            errorType: "Error from query",
            error: error
          });
        }else{
          if(results.length === 0){
            reject({
              errorType: "No Reviews",
              error: error
            });
          }else{
            resolve({
              reviews: results
            });
          }
        }
      });
    });
  }
}

module.exports = review;
