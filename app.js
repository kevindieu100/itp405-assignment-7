var express = require('express');
var mysql = require('mysql');
var app = express();
var review = require('./src/review');
var book = require('./src/book');

app.get('/api/v1/reviews', function (request, response) {
  review.findAll().then(function(reviews) {
    response.json(reviews);
  }, function(error) {
    response.json(error);
  });
});

app.get('/api/v1/books/:id', function(request, response){
  book.findRecord(request.params.id).then(function(books){
    response.json(books);
  }, function(error){
    response.status(404).json(error);
  });
});

app.listen(8000);
