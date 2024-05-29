let startTime;
let remainingTime;
let isRunning = false;

const minutesInput = document.querySelector('.minutes');
const secondsInput = document.querySelector('.seconds');
const minutesDisplay = document.querySelector('.minutes-display');
const secondsDisplay = document.querySelector('.seconds-display');
const appCounterBox = document.querySelector('.app-counter-box');
const progressBar = document.querySelector('.progress');
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const resetButton = document.querySelector('.reset');
const timer = document.querySelector('.timer');

let totalSeconds;
const bellSound = new Audio('bells.mp3'); // Replace with the actual path to your sound file

const disableInputs = () => {
  minutesInput.disabled = true;
  secondsInput.disabled = true;
  minutesInput.style.display = 'none';
  secondsInput.style.display = 'none';
};

const enableInputs = () => {
  minutesInput.disabled = false;
  secondsInput.disabled = false;
  minutesInput.style.display = 'inline-block';
  secondsInput.style.display = 'inline-block';
};

const updateTimerDisplay = (minutes, seconds) => {
  minutesDisplay.textContent = String(minutes).padStart(2, '0');
  secondsDisplay.textContent = String(seconds).padStart(2, '0');
};

const clearTimerDisplay = () => {
  minutesInput.value = '';
  secondsInput.value = '00';
  updateTimerDisplay(0, 0);
};

const updateProgressBar = () => {
  const progress = (1 - remainingTime / (totalSeconds * 1000)) * 100;
  progressBar.style.width = `${progress}%`;
};

const countdownTimer = (timestamp) => {
  if (!startTime) {
    startTime = timestamp;
  }

  const elapsedTime = timestamp - startTime;
  remainingTime = totalSeconds * 1000 - elapsedTime;

  if (remainingTime < 0) {
    bellSound.play();
    enableInputs();
    appCounterBox.classList.remove('enlarged');
    isRunning = false;
    clearTimerDisplay();
  } else {
    const minutes = Math.floor(remainingTime / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    updateTimerDisplay(minutes, seconds);
    updateProgressBar();
    requestAnimationFrame(countdownTimer);
  }
};

const startTimer = () => {
  if (!isRunning) {
    const sessionMinutes = Number.parseInt(minutesInput.value) || 0;
    const sessionSeconds = Number.parseInt(secondsInput.value) || 0;
    totalSeconds = sessionMinutes * 60 + sessionSeconds;

    if (totalSeconds > 0) {
      isRunning = true;
      disableInputs();
      timer.classList.remove('hidden');
      timer.classList.add('enlarged');
      appCounterBox.classList.add('enlarged');
      startTime = null;
      requestAnimationFrame(countdownTimer);
    }
  }
};

const stopTimer = () => {
  isRunning = false;
  enableInputs();
  clearTimerDisplay();
  progressBar.style.width = '0%';
};

const resetTimer = () => {
  stopTimer();
  timer.classList.add('hidden');
  appCounterBox.classList.remove('enlarged');
};

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  }
});