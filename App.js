let timerInterval;
let totalSeconds = 25 * 60;
let isRunning = false;

const minutesDisplay = document.querySelector('.minutes-display');
const secondsDisplay = document.querySelector('.seconds-display');
const progressBar = document.querySelector('.progress');
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const resetButton = document.querySelector('.reset');
const setCustomTimerButton = document.getElementById('setCustomTimer');
const customMinutesInput = document.getElementById('customMinutes');
const customSecondsInput = document.getElementById('customSeconds');

const updateTimerDisplay = () => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  minutesDisplay.textContent = String(minutes).padStart(2, '0');
  secondsDisplay.textContent = String(seconds).padStart(2, '0');
};

const updateProgressBar = () => {
  const progress = (1 - totalSeconds / (25 * 60)) * 100;
  progressBar.style.width = `${progress}%`;
};

const startTimer = () => {
  if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(() => {
      totalSeconds--;
      if (totalSeconds < 0) {
        clearInterval(timerInterval);
        isRunning = false;
      }
      updateTimerDisplay();
      updateProgressBar();
    }, 1000);
  }
};

const stopTimer = () => {
  clearInterval(timerInterval);
  isRunning = false;
};

const setCustomTimer = () => {
  const customMinutes = parseInt(customMinutesInput.value) || 0;
  const customSeconds = parseInt(customSecondsInput.value) || 0;
  totalSeconds = customMinutes * 60 + customSeconds;
  updateTimerDisplay();
  updateProgressBar();
  document.querySelector('.custom-timer').style.display = 'none';
};

const resetTimer = () => {
  stopTimer();
  totalSeconds = 25 * 60;
  updateTimerDisplay();
  updateProgressBar();
  document.querySelector('.custom-timer').style.display = 'block';
};

startButton.addEventListener('click', () => {
  startTimer();
  document.querySelector('.custom-timer').style.display = 'none';
});

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
setCustomTimerButton.addEventListener('click', setCustomTimer);

updateTimerDisplay();
updateProgressBar();

