let timerInterval;
let totalSeconds = 25 * 60;
let isRunning = false;

const minutesDisplay = document.querySelector(".minutes-display");
const secondsDisplay = document.querySelector(".seconds-display");
const progressBar = document.querySelector(".progress");
const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const resetButton = document.querySelector(".reset");
const taskList = document.getElementById('taskList');
const toggleTasksButton = document.getElementById('toggleTasks');
const setCustomTimerButton = document.getElementById("setCustomTimer");
const customMinutesInput = document.getElementById("customMinutes");
const customSecondsInput = document.getElementById("customSeconds");
const toggleCurrentTaskButton = document.getElementById("toggleCurrentTask");
const currentTaskDiv = document.getElementById("currentTask");
const appElement = document.querySelector(".app");

const updateTimerDisplay = () => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  document.title = `Pomodoria - ${formattedTime}`;
  minutesDisplay.textContent = formattedTime;
};

const backgroundImages = [
  'url("Images/1.png")',
  'url("Images/2.png")'
];


const updateProgressBar = () => {
  const progress = (1 - totalSeconds / (parseInt(customMinutesInput.value) * 60)) * 100;
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
        alert("Time's Up!");
      }
      updateTimerDisplay();
      updateProgressBar();
      if (!isRunning) {
        document.querySelector(".timer").classList.remove("enlarged"); // Remove enlarged class when timer stops
      }
    }, 1000);
    document.querySelector(".timer").classList.add("enlarged"); // Add enlarged class when timer starts
    appElement.classList.add("right"); // Move the app to the top left
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    document.body.style.backgroundImage = backgroundImages[randomIndex];
  }
};

const stopTimer = () => {
  clearInterval(timerInterval);
  isRunning = false;
};

const setCustomTimer = () => {
  const customMinutes = parseInt(customMinutesInput.value) || 0;
  const customSeconds = parseInt(customSecondsInput.value) || 0;
  if (customMinutes < 0 || customSeconds < 0 || customSeconds > 59) {
    alert("Please Enter Valid Values");
    return;
  }
  totalSeconds = customMinutes * 60 + customSeconds;
  updateTimerDisplay();
  updateProgressBar();
  document.querySelector(".custom-timer").classList.add("hide");
};

const resetTimer = () => {
  stopTimer();
  totalSeconds = 25 * 60;
  updateTimerDisplay();
  updateProgressBar();
  document.querySelector(".timer").classList.remove("enlarged"); // Remove enlarged class
  document.querySelector(".timer").classList.add("zoom-reset"); // Add zoom-reset class
  setTimeout(() => {
    document.querySelector(".timer").classList.remove("zoom-reset"); // Remove zoom-reset class after a short delay
  }, 500);
  appElement.classList.remove("right"); // Move the app back to the center
  document.body.style.backgroundImage = '';
};

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
setCustomTimerButton.addEventListener("click", setCustomTimer);

updateTimerDisplay();
updateProgressBar();

const musicFrame = document.getElementById("playlistFrame"); // Correctly reference the iframe
const toggleMusicButton = document.getElementById("toggleMusic");
const spotifyLinkInput = document.getElementById("spotifyLink");
const saveLinkButton = document.getElementById("saveLink");
const playlistFrame = document.getElementById("playlistFrame"); // Reference the iframe
const musicBox = document.getElementById("musicBox");

toggleMusicButton.addEventListener("click", () => {
  musicBox.style.display = musicBox.style.display === "none" ? "block" : "none";
});

musicBox.classList.toggle("hide");

function reloadIframe(iframe) {
  iframe.src = iframe.src;
}

function extractPlaylistId(url) {
  // Match the part of the URL that contains the playlist ID
  const match = url.match(/\/playlist\/([a-zA-Z0-9]+)\?/);
  if (match && match[1]) {
    return match[1]; // Return the extracted playlist ID
  }
  return null; // Return null if no match was found
}

saveLinkButton.addEventListener("click", () => {
  const newLink = spotifyLinkInput.value;
  if (newLink) {
    const playlistLink = extractPlaylistId(newLink);
    playlistFrame.src = `https://open.spotify.com/embed/playlist/${playlistLink}`;
    reloadIframe(playlistFrame);
    spotifyLinkInput.value = "";
    saveLinkButton.textContent = "Saved";
    setTimeout(() => {
      saveLinkButton.textContent = "Save";
    }, 1000);
  }
});

const settingsButton = document.getElementById("settingsButton");
const customTimer = document.querySelector(".custom-timer");

settingsButton.addEventListener("click", () => {
  customTimer.classList.toggle("hide");
});

toggleTasksButton.addEventListener('click', () => {
  taskList.classList.toggle('hide');
});

const addTaskButton = document.getElementById("addTaskButton");
const taskInput = document.getElementById("taskInput");
const tasks = document.getElementById("tasks");

addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteButton = document.createElement('button');
    const deleteSymbol = document.createElement('span');
    deleteSymbol.className = 'material-symbols-outlined';
    deleteSymbol.textContent = 'delete';
    deleteButton.appendChild(deleteSymbol);

    deleteButton.addEventListener('click', () => {
      tasks.removeChild(li);
    });

    li.appendChild(deleteButton);
    tasks.appendChild(li);
    taskInput.value = '';
    currentTaskDiv.textContent = taskText; // Set the current task
  }
});

toggleCurrentTaskButton.addEventListener('click', () => {
  currentTaskDiv.classList.toggle('hide');
});
