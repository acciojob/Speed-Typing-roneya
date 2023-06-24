const quoteDisplay = document.getElementById("quote");
const quoteInput = document.getElementById("quoteInput");
const timerValue = document.getElementById("timerValue");
let startTime, endTime, timerInterval;

function fetchRandomQuote() {
  fetch("http://api.quotable.io/random")
    .then(response => response.json())
    .then(data => {
      quoteDisplay.textContent = data.content;
      quoteInput.value = "";
      quoteInput.focus();
    });
}

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

  if (typedText.length === quoteText.length && isCorrect) {
    clearInterval(timerInterval);
    setTimeout(fetchRandomQuote, 3000);
  }
}


function updateTimer() {
  const currentTime = Math.floor((Date.now() - startTime) / 1000);
  timerValue.textContent = currentTime;
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

quoteInput.addEventListener("input", checkTypingAccuracy);

fetchRandomQuote();

quoteInput.addEventListener("keydown", startTimer);
