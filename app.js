let timerInterval;
let totalSeconds = 25 * 60;
let isRunning = false;
let autoRestart = false;

const minutesDisplay = document.querySelector(".minutes-display");
const progressBar = document.querySelector(".progress");
const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const resetButton = document.querySelector(".reset");
const taskList = document.getElementById("taskList");
const toggleTasksButton = document.getElementById("toggleTasks");
const setCustomTimerButton = document.getElementById("setCustomTimer");
const customMinutesInput = document.getElementById("customMinutes");
const customSecondsInput = document.getElementById("customSeconds");
const currentTaskDiv = document.getElementById("currentTask");
const currentTaskText = document.getElementById("currentTaskText");
const currentTaskCheckbox = document.getElementById("currentTaskCheckbox");
const appElement = document.querySelector(".app");
const addTaskButton = document.getElementById("addTaskButton");
const taskInput = document.getElementById("taskInput");
const tasks = document.getElementById("tasks");
const toggleMusicButton = document.getElementById("toggleMusic");
const spotifyLinkInput = document.getElementById("spotifyLink");
const saveLinkButton = document.getElementById("saveLink");
const playlistFrame = document.getElementById("playlistFrame");
const musicBox = document.getElementById("musicBox");
const settingsButton = document.getElementById("settingsButton");
const customTimer = document.querySelector(".custom-timer");
const autoRestartCheckbox = document.getElementById("autoRestart");
const settingsBox = document.querySelector(".settings-box");
const customTimerButton = document.getElementById("customTimerButton");

let currentTaskLi = null;

const backgroundVideos = [
  "Videos/1.mp4",
  "Videos/2.mp4",
  "Videos/3.mp4",
  "Videos/4.mp4",
  "Videos/5.mp4",
  "Videos/6.mp4",
];

const updateBackgroundVideo = () => {
  const randomIndex = Math.floor(Math.random() * backgroundVideos.length);
  document.getElementById("backgroundVideo").src =
    backgroundVideos[randomIndex];
};

const updateTimerDisplay = () => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
  document.title = `Pomodoria - ${formattedTime}`;
  minutesDisplay.textContent = formattedTime;
};

const updateProgressBar = () => {
  const progress =
    (1 - totalSeconds / (parseInt(customMinutesInput.value || 25) * 60)) * 100;
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
        new Audio("notification.mp3").play();
        if (autoRestart) {
          totalSeconds =
            parseInt(customMinutesInput.value || 25) * 60 +
            parseInt(customSecondsInput.value || 0);
          startTimer();
        }
      }
      updateTimerDisplay();
      updateProgressBar();
      if (!isRunning) {
        document.querySelector(".timer").classList.remove("enlarged");
      }
    }, 1000);
    document.querySelector(".timer").classList.add("enlarged");
    appElement.classList.add("right");
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
  customTimer.classList.add("hide");
};

const resetTimer = () => {
  stopTimer();
  totalSeconds = 25 * 60;
  updateTimerDisplay();
  progressBar.style.width = "0%"; // Reset progress bar
  document.querySelector(".timer").classList.remove("enlarged");
  document.querySelector(".timer").classList.add("zoom-reset");
  setTimeout(() => {
    document.querySelector(".timer").classList.remove("zoom-reset");
  }, 500);
  appElement.classList.remove("right");
};

const addTask = () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const taskLi = document.createElement("li");
  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.addEventListener("change", () => {
    if (taskCheckbox.checked) {
      taskLi.classList.add("completed");
      updateCurrentTask(null);
    } else {
      taskLi.classList.remove("completed");
      updateCurrentTask(taskLi);
    }
  });

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  const setButton = document.createElement("button");
  setButton.className = "set-task-button";
  setButton.textContent = "Set";
  setButton.addEventListener("click", () => {
    updateCurrentTask(taskLi);
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML =
    '<span class="material-symbols-outlined">delete</span>';
  deleteButton.addEventListener("click", () => {
    tasks.removeChild(taskLi);
    updateCurrentTask(null);
  });

  taskLi.appendChild(taskCheckbox);
  taskLi.appendChild(taskSpan);
  taskLi.appendChild(setButton);
  taskLi.appendChild(deleteButton);
  tasks.appendChild(taskLi);
  taskInput.value = "";

  if (!currentTaskLi) {
    updateCurrentTask(taskLi);
  }
};

const updateCurrentTask = (taskLi) => {
  if (currentTaskLi) {
    currentTaskLi.querySelector(".set-task-button").textContent = "Set";
  }
  currentTaskLi = taskLi;
  if (taskLi) {
    currentTaskText.textContent = taskLi.querySelector("span").textContent;
    currentTaskDiv.classList.remove("hide");
    taskLi.querySelector(".set-task-button").textContent = "Unset";
    document.querySelector(".timer").appendChild(currentTaskDiv);
  } else {
    currentTaskText.textContent = "";
    currentTaskDiv.classList.add("hide");
    document.body.appendChild(currentTaskDiv); // Move current task div back to body
  }
};

currentTaskCheckbox.addEventListener("change", () => {
  if (currentTaskCheckbox.checked) {
    if (currentTaskLi) {
      currentTaskLi.classList.add("completed");
      currentTaskLi.querySelector("input[type='checkbox']").checked = true;
    }
    updateCurrentTask(null);
  }
});

settingsButton.addEventListener("click", () => {
  settingsBox.classList.toggle("hide");
});
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
setCustomTimerButton.addEventListener("click", setCustomTimer);

customTimerButton.addEventListener("click", () => {
  customTimer.classList.toggle("hide");
});

updateTimerDisplay();
updateProgressBar();

toggleMusicButton.addEventListener("click", () => {
  musicBox.style.display = musicBox.style.display === "none" ? "block" : "none";
});

function extractPlaylistId(url) {
  const match = url.match(/\/playlist\/([a-zA-Z0-9]+)\?/);
  return match && match[1] ? match[1] : null;
}

saveLinkButton.addEventListener("click", () => {
  const newLink = spotifyLinkInput.value;
  if (newLink) {
    const playlistLink = extractPlaylistId(newLink);
    if (playlistLink) {
      playlistFrame.src = `https://open.spotify.com/embed/playlist/${playlistLink}`;
      spotifyLinkInput.value = "";
      saveLinkButton.textContent = "Saved";
      setTimeout(() => {
        saveLinkButton.textContent = "Save";
      }, 1000);
    } else {
      alert("Invalid Spotify playlist link");
    }
  }
});

toggleTasksButton.addEventListener("click", () => {
  taskList.classList.toggle("hide");
});

addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

autoRestartCheckbox.addEventListener("change", () => {
  autoRestart = autoRestartCheckbox.checked;
});

window.addEventListener("DOMContentLoaded", () => {
  const changeBackgroundButton = document.getElementById("changeBackground");
  if (changeBackgroundButton) {
    changeBackgroundButton.addEventListener("click", updateBackgroundVideo);
  } else {
    console.error("changeBackground Button Not Found");
  }
  updateBackgroundVideo(); // Call updateBackgroundVideo on page load
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey) {
    switch (e.key) {
      case "s":
        startTimer();
        break;
      case "x":
        stopTimer();
        break;
      case "r":
        resetTimer();
        break;
      case "t":
        taskList.classList.toggle("hide");
        break;
      case "m":
        musicBox.style.display =
          musicBox.style.display === "none" ? "block" : "none";
        break;
    }
  }
});
