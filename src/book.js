var express = require('express');
var mysql = require('mysql');

var book = {
  findRecord: function(id){
    return new Promise(function( resolve, reject){
      var connection = mysql.createConnection({
        host     : 'itp460.usc.edu',
        user     : 'student',
        password : 'ttrojan',
        database : 'itp405-midterm'
      });

      var queryStatement = "SELECT books.id, author_id, publisher_id, title, name, first_name, last_name FROM books "+
        "INNER JOIN publishers on books.publisher_id = publishers.id "+
        "INNER JOIN authors on books.author_id = authors.id "+
        "WHERE books.id LIKE ? ";

      connection.connect();
      connection.query(queryStatement, [ id ], function(error, result) {
        if(error){
          reject({
            errorType: "Error from query",
            error: error
          });
        }else{
          if(result.length === 0){
            reject({
              error: {
                message: "Book not found"
              }
            });
          }else{
            resolve({
              book: {
                id: result[0].id,
                title: result[0].title,
                publisher: {
                  id: result[0].publisher_id,
                  name: result[0].name
                },
                author:{
                  id: result[0].author_id,
                  first_name: result[0].first_name,
                  last_name: result[0].last_name
                }
              }
            });
          }
        }
      });
    });
  }
}

module.exports = book;
