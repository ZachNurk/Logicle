// Basic idea:
// We made an array of rule objects, each with an id and a function that takes in the selected lines and returns a new line if valid. 
// The UI will call the appropriate function when the user clicks "Apply" and pass in the selected lines. 
// If the function returns a new line, we add it to the proof; if it returns null, we show an error message. 
// This way, we can easily add more rules in the future by just adding more objects to the array.

