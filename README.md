# Timestamp Microservice

This is the boilerplate code for the Timestamp Microservice project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/timestamp-microservice

## Tech Stack
- NodeJS
- Express JS


## My Approach

I found it imperative to do the tasks sequentially.

### Task 1: 

A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number)

How i did it: the endpoint shows that request is meant to get some data, and from my learning he use of `:date` means that it is a placeholder for the actual date. this should therefore be a `GET` request since it also returns a JSON object as opposed to a POST request. 

I then extracted the date from the req.params object. and used Date.parse() to return the date's timestamp. 

### Task 2. A request to /api/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT

this would then use the timestamp to get the string using the .toString() method. 

### Test 3 If the input date string is invalid, the API returns an object having the structure { error : "Invalid Date" }

To handle the errors, i will use a try-catch block and send the error as a response

### Test 4 Your project can handle dates that can be successfully parsed by new Date(date_string)

To check date validity, i create a function that checks if the date string can be successfully parsed by the Date Constructor

`isNaN()` is a function that checks if a value is NaN and returns true if it is not a number. so !isNaN means that it is valid (double negation)

```js
new Date() ===> string representation of current date and time. same as new Date().toString()
Date.now() ===? the milliseconds since epoch , January 1 1970 UTC

```



```js
try {
   if(dateString !=="" && isValidDate){
    const timestamp = Date.parse(dateString);
    console.log(`this is the Unix timestamp ${timestamp}`);
  
    const stringOfInputDate = new Date(dateString).toString();
    console.log(`this is the string of the date input ${stringOfInputDate}`);
  
    res.json({
      unix: timestamp,
      utc: stringOfInputDate
    })
   } else if(!dateString){
      const now =new Date();
      
      const hours= now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const currentTime = `${hours} : ${minutes} : ${ seconds}`;
      console.log(currentTime)

      res.json({
        unix: currentTime,
        utc: currentTime
      })
   } else {
    res.json({
      error: "Invalid Date"
    })
   }
  
   
  } catch (error) {
    res.json({
      error: 'Error encountered'
    })
  }
```

I wound up discarding this approach because it wouldnt pass the tests and then i discovered that the endpoints for the empty date parameter and the dates are separate.

For the endpoint with a date parameter, there are three options: a valid date, an invalid date and the timestamp. the latter really confused me, but i researched and found a way to do it as below:

1. First parse the date using `new Date(date_string)` to check if it is a valid date. it parses the input into a Date object. From the Date Object, convert it to a .toString(), if it is a valid date, it returns a date string, else it returns 'Invalid Date'.

The latter will also happen for the timestamp, hence the need to check. so, if `.toString()` returns an Invalid Date, reassign date to a new Date and pass in the timestamp


```js
  const date_string = req.params.date_string;
  //to successfully parse dates & check if it is a valid date object
  let date = new Date(date_string);

     if(date.toString() === "Invalid Date"){
    date = new Date(parseInt(date_string))
   }
```

if, after the second parsing (assuming it is a timestamp), and it still fails, i sends an error message. else, it gets the timestamp and the odate in string format

```js
      if (date.toString() === 'Invalid Date') {
        return res.json({
            "error": "Invalid Date"
        });
    } else {
        return res.json({
            "unix": date.getTime(),
            "utc": date.toUTCString()
        });
    }

```