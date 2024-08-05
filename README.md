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



