const quoteDisplay = document.getElementById("quote");
const quoteInput = document.getElementById("quoteInput");
const timerValue = document.querySelector(".timer span");
let startTime, endTime, timerInterval;

// Fetch a random quote from the API
function fetchRandomQuote() {
  fetch("http://api.quotable.io/random")
    .then(response => response.json())
    .then(data => {
      quoteDisplay.textContent = data.content;
      quoteInput.value = "";
      quoteInput.focus();
    });
}

// Check typing accuracy and update text color
function checkTypingAccuracy() {
  const quoteText = quoteDisplay.textContent;
  const typedText = quoteInput.value;
  let isCorrect = true;

  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === quoteText[i]) {
      quoteInput.classList.remove("incorrect");
    } else {
      quoteInput.classList.add("incorrect");
      isCorrect = false;
    }
  }

  if (typedText === quoteText && isCorrect) {
    clearInterval(timerInterval);
    setTimeout(() => {
      fetchRandomQuote();
      timerValue.textContent = "0";
    }, 3000);
  }
}

// Update the timer value
function updateTimer() {
  const currentTime = Math.floor((Date.now() - startTime) / 1000);
  timerValue.textContent = currentTime;
}

// Start the timer
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

quoteInput.addEventListener("input", checkTypingAccuracy);

fetchRandomQuote();

quoteInput.addEventListener("keydown", startTimer);
