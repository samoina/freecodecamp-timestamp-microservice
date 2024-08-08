// index.js
// where your node app starts


// init project
var express = require('express');
var app = express();
var morgan = require('morgan')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

//empty date parameter, instruction says to give current time with unix & utc key but this wouldnt work in my approach
app.get('/api', (req, res) => {
  try {
    res.json(
      {
        "unix": new Date().getTime(),
        "utc": new Date().toUTCString()
      }
    );
  } catch (error) {
    res.json({
      "error": 'Error encountered'
    })
  }
})

//date parameter
app.get('/api/:date_string?', (req, res) => {
  const date_string = req.params.date_string;
  //to successfully parse dates & check if it is a valid date object
  let date = new Date(date_string);


  try {
    //this check is for the timestamp, in which case re-assign date and create a date corresponding to the specific timestamp
   if(date.toString() === "Invalid Date"){
    date = new Date(parseInt(date_string))
   }
   //if it doesnt pass the check for the timestamp, then return an invalid date as the response, else return for the timestamp
   if(date.toString() === "Invalid Date"){
    res.json({
      "error": "Invalid Date"
    })
   } else {
    res.json({
      "unix": date.getTime(),
      "utc":date.toUTCString()
    })
   }

  } catch (error) {
    res.json({
      "error": 'Error encountered'
    })
  }
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
