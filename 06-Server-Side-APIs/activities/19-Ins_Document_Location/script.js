// Selects element by class
//We store the interval in a variable. This is an important step, so that we can get the interval to stop. 
var timeEl = document.querySelector(".time");

// Selects element by id
var mainEl = document.getElementById("main");

var secondsLeft = 11;

function setTime() {
  // Sets interval in variable
  //The setInterval() method takes a function as its first argument
  var timerInterval = setInterval(function() {
    //The function is the action that we want to be evaluated at each interval. This function prints a message at each interval
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left till something 'Adorable'.";

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      //When the countdown reaches zero, we want the action to stop. The clearInterval() method stops the execution of the interval. It takes one parameter: the variable name assigned to the interval
      clearInterval(timerInterval);
      // Calls function to send us to a new location
      redirectUs();
    }
    //The second argument that the setInterval() method takes is the interval. Because intervals use milliseconds, we use 1000 to create an interval of one second
  }, 1000);
}

console.log(document.location);

function redirectUs() {
  document.location = 'https://www.reddit.com/r/Awwww'

}

setTime();
