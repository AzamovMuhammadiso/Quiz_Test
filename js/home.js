let currentLevel = 1;
let points = 0;
let timer;

const questionElement = document.getElementById("question");
const optionsElement = document.querySelector(".options");
const messageElement = document.getElementById("message");
const pointsElement = document.getElementById("points");
const timerElement = document.getElementById("timer");

let countdown = 3;
let countdownInterval;
let correctCapital;

function back() {
  window.location.href = "start.html";
}

function setupLevel(level) {
  clearTimeout(timer);
  optionsElement.innerHTML = "";
  messageElement.innerHTML = "";
  timerElement.innerHTML = "Time: 15s";
  const currentLevelElement = document.getElementById("current-level");
  currentLevelElement.textContent = level;
  pointsElement.innerHTML = `${points}`;
  fetchCountries().then((countries) => {
    if (countries.length === 0) {
      messageElement.innerHTML = "Error fetching data. Please try again.";
      return;
    }
    let randomCountryIndex, randomCountry;
    do {
      randomCountryIndex = Math.floor(Math.random() * countries.length);
      randomCountry = countries[randomCountryIndex];
      correctCapital = randomCountry.capital ? randomCountry.capital[0] : null;
    } while (!correctCapital);

    questionElement.innerHTML = `Country: ${randomCountry.name.common}`;

    const allCapitals = countries.map((country) =>
      country.capital ? country.capital[0] : null
    );
    const wrongCapitals = allCapitals.filter(
      (capital) => capital !== correctCapital
    );
    const randomWrongCapitals = getRandomElements(wrongCapitals, 3);
    const options = shuffleArray([...randomWrongCapitals, correctCapital]);
    options.map((option) => {
      const optionButton = document.createElement("button");
      optionButton.className = "answer-btn";
      optionButton.textContent = option;
      optionButton.addEventListener("click", () =>
        checkAnswer(option, correctCapital)
      );
      optionsElement.appendChild(optionButton);
    });

    startTimer();
  });
}

function startTimer() {
  let secondsLeft = 15;
  timer = setInterval(() => {
    timerElement.innerHTML = `Time: ${secondsLeft}s`;
    secondsLeft--;
    if (secondsLeft < 0) {
      clearInterval(timer);
      const answerButtons = document.querySelectorAll(".answer-btn");
      answerButtons.forEach((button) => {
        button.disabled = true;
        if (button.textContent === correctCapital) {
          button.style.backgroundColor = "#03C04A";
          button.style.color = "#f3f3f3";
        } else {
          button.style.backgroundColor = "#ff0062";
          button.style.color = "#f3f3f3";
        }
      });

      setTimeout(() => {
        answerButtons.forEach((button) => {
          button.style.backgroundColor = "";
          button.style.color = "";
          button.disabled = false;
        });
        setupNextLevel();
      }, 1000);
    }
  }, 1000);
}

function checkAnswer(selectedOption, correctAnswer) {
  clearInterval(timerInterval);
  const buttons = Array.from(optionsElement.getElementsByClassName("custom-button"));

  buttons.forEach((button) => {
    button.disabled = true; // Disable all buttons after an answer is selected
    if (button.textContent === correctAnswer) {
      button.classList.add("correct");
    } else if (button.textContent === selectedOption) {
      button.classList.add("wrong");
    }
  });

  currentLevel++;
  setTimeout(() => {
    showQuestion();
    messageElement.textContent = "";
  }, 2500);
}

function startQuizAgain() {
  currentLevel = 1;
  points = 0;
  clearInterval(timer);
  setupLevel(currentLevel);
  const currentLevelElement = document.getElementById("current-level");
  currentLevelElement.textContent = currentLevel;
  pointsElement.innerHTML = `${points}`;

  const congratulationsDiv = document.getElementById("congratulations");
  congratulationsDiv.style.display = "none";
  hideCongratulations();
}

function setupNextLevel() {
  pointsElement.innerHTML = `${points}`;
  if (currentLevel < 10) {
    currentLevel++;
    setupLevel(currentLevel);
  } else {
    endGame();
  }
}

function endGame() {
  optionsElement.innerHTML = "";

  const correctAnswers = points;
  const wrongAnswers = 10 - points;

  const congratulationsDiv = document.getElementById("congratulations");
  const reward = document.getElementById("reward");
  const correctAnswersSpan = document.getElementById("correctAnswers");
  const wrongAnswersSpan = document.getElementById("wrongAnswers");
  const imageContainer = document.getElementById("imageContainer");
  const congratulationMessage = document.getElementById(
    "congratulationMessage"
  );
  reward.textContent = points;
  correctAnswersSpan.textContent = correctAnswers;
  wrongAnswersSpan.textContent = wrongAnswers;

  if (correctAnswers < 5) {
    imageContainer.innerHTML = '<img src="image/bad.gif" alt="Image 1">';
    congratulationMessage.textContent = "Bad!";
    congratulationMessage.style.color = "#ff0062";
  } else if (correctAnswers >= 5 && correctAnswers <= 8) {
    imageContainer.innerHTML = '<img src="image/good.gif" alt="Image 2">';
    congratulationMessage.textContent = "Good!";
    congratulationMessage.style.color = "#feb60a";
  } else {
    imageContainer.innerHTML = '<img src="image/win.gif" alt="Image 3">';
    congratulationMessage.textContent = "Excellent!";
    congratulationMessage.style.color = "#03c04a";
  }

  const overlay = document.querySelector(".overlay");
  overlay.style.display = "block";
  congratulationsDiv.style.display = "flex";
}

function hideCongratulations() {
  const overlay = document.querySelector(".overlay");
  const congratulationsDiv = document.getElementById("congratulations");
  overlay.style.display = "none";
  congratulationsDiv.style.display = "none";
}

function fetchCountries() {
  return axios
    .get("https://restcountries.com/v3.1/all")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      return [];
    });
}

function getRandomElements(arr, count) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

setupLevel(currentLevel);