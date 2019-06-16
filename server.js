const express     = require('express');
const bodyParser  = require('body-parser');
const apiRoutes   = require('./routes/api.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//----------- Route Info --------------------------------------------------
// static-files (html/css)
app.use('/public', express.static(process.cwd() + '/public'));

//Routing for API 
app.use(apiRoutes);

//Invalid HTTP requests
app.use(function(req, res, next) {
  return next({status: 404, message: 'Incorrect request. Path Not Found'})
});

//------- Error Handling ----------
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }

  console.log(errCode + ' ' + errMessage)
  res.status(errCode).json({error: errMessage});  
})

// ----  Initialize db before starting up the server
const initDb = require("./util/db").initDb;
initDb( (err) => {
    if (err) 
        console.log('Error connecting to DB', err.name + ': ' + err.message);
    else {
        // Start the server
        app.listen(process.env.PORT, () => {
          console.log('Listening on port ' + process.env.PORT);
        });
    }
});  

