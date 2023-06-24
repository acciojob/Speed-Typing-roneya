// Fetch a random quote from the API
function fetchQuote() {
  fetch('http://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
      document.getElementById('quote').innerText = data.content;
    });
}

// Check if the typed text matches the quote
function checkTyping() {
  const quote = document.getElementById('quote').innerText;
  const input = document.getElementById('quoteInput').value;
  const quoteWords = quote.split(' ');
  const inputWords = input.split(' ');

  document.getElementById('quote').innerHTML = '';

  quoteWords.forEach((word, index) => {
    const wordSpan = document.createElement('span');

    if (inputWords[index] === word) {
      wordSpan.classList.add('correct');
    } else {
      wordSpan.classList.add('incorrect');
    }

    wordSpan.innerText = word + ' ';
    document.getElementById('quote').appendChild(wordSpan);
  });
}

// Clear the input field
function clearInput() {
  document.getElementById('quoteInput').value = '';
}

// Reset the timer to zero
function resetTimer() {
  clearInterval(timer);
  seconds = 0;
  updateTimer();
}

// Update the timer display
function updateTimer() {
  document.querySelector('.timer').innerText = `Time: ${seconds}s`;
}

// Start the timer
function startTimer() {
  timer = setInterval(() => {
    seconds++;
    updateTimer();
  }, 1000);
}

// Fetch a new quote, clear input, and start the timer
function fetchNewQuote() {
  fetchQuote();
  clearInput();
  resetTimer();
  setTimeout(startTimer, 3000);
}

// Initialize the timer
let seconds = 0;
let timer;

// Fetch initial quote and add event listener
window.addEventListener('DOMContentLoaded', () => {
  fetchQuote();
  document.getElementById('quoteInput').addEventListener('input', checkTyping);
  document.getElementById('quoteInput').addEventListener('input', clearInput);
  document.getElementById('quoteInput').addEventListener('input', resetTimer);
  document.getElementById('quoteInput').addEventListener('input', fetchNewQuote);
  startTimer();
});
