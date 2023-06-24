//your JS code here. If required.
// Fetching a random quote from the API
async function getRandomQuote() {
  const response = await fetch("http://api.quotable.io/random");
  const data = await response.json();
  return data.content;
}

const quoteDisplayElement = document.getElementById("quote");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.querySelector(".timer");
let startTime, timerInterval;

function startTimer() {
  timerInterval = setInterval(() => {
    const elapsedTime = new Date(Date.now() - startTime);
    const minutes = elapsedTime.getMinutes().toString().padStart(2, "0");
    const seconds = elapsedTime.getSeconds().toString().padStart(2, "0");
    const milliseconds = elapsedTime.getMilliseconds().toString().padStart(3, "0");
    timerElement.textContent = `${minutes}:${seconds}:${milliseconds}`;
  }, 10);
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = "";
  quote.split("").forEach(character => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;
  startTimer();
}

function stopTimer() {
  clearInterval(timerInterval);
  timerElement.textContent = "00:00:00";
}

renderNewQuote();

quoteInputElement.addEventListener("input", () => {
  const quoteArray = quoteDisplayElement.querySelectorAll("span");
  const inputArray = quoteInputElement.value.split("");
  let correct = true;
  quoteArray.forEach((characterSpan, index) => {
    const character = inputArray[index];
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });
  if (correct) {
    stopTimer();
    setTimeout(renderNewQuote, 3000);
  }
});