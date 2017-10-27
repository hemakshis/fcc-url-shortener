const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Bring ShortURL Model
let ShortURL = require('../models/shorturl');

// Host URL
const myURL = 'localhost:3000/';

// GET URL
router.get('/:query', function(req, res){
  var query = req.params.query;

  // Validate Query
  if(parseInt(query, 10)){
    console.log('Parsed');
    var link = myURL + query.toString();
    ShortURL.findOne({
      shortURL: link
    }, function(err, url){
      if(err) throw err;
      if(Boolean(url)){
        res.redirect(url.originalURL);
      } else {
        res.send({"error": "The specified URL does not exists on the database."});
      }
    });
  } else {
    res.send({"error": "Wrong URL format."});
  }
});

// POST URL
router.get('/new/:query*', function(req, res){
  var query = req.params.query + req.params[0];

  let result = new ShortURL({
    originalURL: null,
    shortURL: null
  });

  // Validate Query
  var isValid = ValidURL(query);

  if(isValid){
    // Check if URL is already present in the DB or not
    ShortURL.findOne({
      originalURL: query
    }, function(err,url){
      if(err) throw err;
      if(Boolean(url)){
        res.send({"originalURL":url.originalURL,"shortURL":url.shortURL});  // If present send that url
      } else {  // If not save it into the database
        // Generate the random number for the URL
        var random, newLink;
        do{
          // Generate the Random Key for the Query URL
          random = Math.floor(Math.random()*10000);
          newLink = myURL + random.toString();
          var URLAlreadyExists = false;
          ShortURL.findOne({
            shortURL: newLink
          }, function(err, url){
            if(err) throw err;
            if(Boolean(url)){
              URLAlreadyExists = true;
            } else {
              URLAlreadyExists = false;
            }
          });
          //console.log(URLAlreadyExists);
          if(!URLAlreadyExists){
            break;
          }
        } while(1);

        // Save the result
        result.originalURL = query;
        result.shortURL = newLink;
        result.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            res.send({"originalURL":result.originalURL, "shortURL":result.shortURL});
          }
        });
      }
    });
  } else {
    res.send({"error": "Mentioned URL is not a valid one. Try Again."});
  }
});



// Validate URL
function ValidURL(str) {
  // Checks to see if it is an actual url
  var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  return regex.test(str);
}

// Export Module
module.exports = router;
