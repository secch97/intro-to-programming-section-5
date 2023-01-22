//Storing inputs in variables.
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const guessNumberForm = document.getElementById('guessNumberForm');
const resetButton = document.getElementById('reset');
//Storing messages paragraphs in variables.
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');
//Creating the target number, number of attempts done and maximum attempts.
let targetNumber;
let attempts = 0;
let maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess(e) {
  e.preventDefault();
  // Get value from guess input element.
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;

  hideAllMessages();
  //If guess is correct.
  if (guess === targetNumber) {
    //Show number of guesses.
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;
    //Show correct guess message.
    correctMessage.style.display = '';
    //Disable submit button and number guess input.
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  //If guess is not correct.
  if (guess !== targetNumber) {
    //If guessed number is less than target number.
    if (guess < targetNumber) {
      //Show too low message.
      tooLowMessage.style.display = '';
    } else {
      //Show too high message.
      tooHighMessage.style.display = '';
    }
    //Calculate new remaining attempts.
    const remainingAttempts = maxNumberOfAttempts - attempts;
    //Show number of guesses made at the moment.
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = (remainingAttempts <=1) ?  
    `You guessed ${guess}. <br> ${remainingAttempts} guess remaining` :
    `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
  }

  //If number of attempts is equal to maximum number of attemps.
  if (attempts === maxNumberOfAttempts) {
    //Disable submit button and guess number input.
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = '';
  resetButton.style.display = '';
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

guessNumberForm.addEventListener('submit', checkGuess);
resetButton.addEventListener('click', setup);

setup();
