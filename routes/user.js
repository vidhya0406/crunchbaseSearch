const express = require('express');
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require ('path');
const collection="crunchbase";
const dbConnection ="mongodb://dbuser:dbpass@ds239117.mlab.com:39117/crunchbase"
var request = require("request");
/* GET user profile. */
router.get('/', ensureLoggedIn, function(req, res, next) {
  /* Fetch user meta data */
  const userId = req.user._json.sub;
  const options = {
            method: 'POST',
            url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
            headers: {
                'content-type': 'application/json'
            },
            body: `{"client_id": "${process.env.AUTH0_CLIENT_ID}",
                    "client_secret": "${process.env.AUTH0_CLIENT_SECRET}",
                    "audience": "https://${process.env.AUTH0_DOMAIN}/api/v2/",
                    "grant_type":"client_credentials"}`
        };

  request(options, function (error, response, body) {
            if (error) throw new Error(error);
            var access_token = JSON.parse(body).access_token;
            const options = {
            method: 'GET',
            url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}?include_fields=true`,
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${access_token}`
            },
          }

          request(options, function (error, response, body) {
            if (error) throw new Error(error);

            const result = JSON.parse(body);
            mongoose.connect(dbConnection, function(err, db){
              if (err) throw err;
              db.collection(collection).find({'category_list' : result.user_metadata.domain}).toArray(function(err, data){
                if (err){
                  console.log(err);
                  console.log("Failed to fetch the collection: ", collection);
                }
                else {
                  for (var i=0; i<data.length; i++){
                    var split_data = data[i].category_list.split("|");
                    data[i].category_list = JSON.stringify(split_data);
                    data[i].technology = JSON.stringify(data[i].technology);
                  }
                  res.render('user', {user: req.user,btc: data});
                }
              });
            });
          });
  });

});

module.exports = router;
