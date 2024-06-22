let totalSeconds = 25 * 60;
let isRunning = false;

self.onmessage = function (e) {
  if (e.data.action === "start") {
    isRunning = true;
    runTimer();
  } else if (e.data.action === "stop") {
    isRunning = false;
  } else if (e.data.action === "reset") {
    totalSeconds = e.data.time || 25 * 60;
    isRunning = false;
  } else if (e.data.action === "setTime") {
    totalSeconds = e.data.time;
  }
};

function runTimer() {
  if (isRunning) {
    if (totalSeconds > 0) {
      totalSeconds--;
      self.postMessage({ time: totalSeconds });
      setTimeout(runTimer, 1000);
    } else {
      isRunning = false;
      self.postMessage({ time: 0, finished: true });
    }
  }
}
