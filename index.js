// index.js
// where your node app starts


// init project
var express = require('express');
var app = express();
var morgan = require('morgan')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', function(req, res) {

  //destructure the input string from req.params object
  const userInput = req.params.date;

  //check date validity
  const isValidDate = (input) => {
    const dateToCheck = new Date(input);
    return !isNaN(dateToCheck.getTime());
  } 

  //check if it is a timestamp to eliminate invalid dates
  const isTimestamp = (input) => {
    return !isNaN(input) && Number.isInteger(Number(input))
  }

  try {
   if(!userInput) {
    //this is an empty route
    const now =new Date();
      
    const hours= now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const currentTime = `${hours}:${minutes}:${ seconds}`;
    console.log(currentTime)

    res.json({
      unix: currentTime,
      utc: currentTime
    })
   } else if(userInput && isValidDate(userInput)){
    //this is a valid date
    const timestamp = Date.parse(userInput);
    console.log(`this is the Unix timestamp ${timestamp}`);
   
  
    const stringOfInputDate = new Date(userInput).toString();
    console.log(`this is the string of the date input ${stringOfInputDate}`);
  
    res.json({
      unix: timestamp,
      utc: stringOfInputDate
    })    
   } else if(userInput && isTimestamp(userInput)) {
    //this is for a valid timestamp: return unix as the user input and utc as string date

    const dateFromtimeStamp = new Date(Number(userInput)).toUTCString();
    console.log(typeof userInput);
    res.json({
      unix: userInput,
      utc: dateFromtimeStamp
    })    
   } else {
    res.json({
      error: 'Invalid Date'
    })
   }
   
  } catch (error) {
    res.json({
      error: 'Error encountered'
    })
  }
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
