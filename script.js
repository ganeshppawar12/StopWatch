let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

// Elements
const display = document.getElementById("display");
const lapList = document.getElementById("lapList");

function timeToString(time) {
    let diffInHrs = Math.floor(time / 3600000);
    let diffInMin = Math.floor((time % 3600000) / 60000);
    let diffInSec = Math.floor((time % 60000) / 1000);

    return (
        `${diffInHrs.toString().padStart(2, "0")}:${diffInMin.toString().padStart(2, "0")}:${diffInSec.toString().padStart(2, "0")}`
    );
}

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        display.textContent = timeToString(elapsedTime);
    }, 1000);
    isRunning = true;
}

function stopStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    display.textContent = "00:00:00";
    lapList.innerHTML = "";
    isRunning = false;
}

function lapStopwatch() {
    const lapTime = timeToString(elapsedTime);
    const li = document.createElement("li");
    li.textContent = `Lap ${lapList.children.length + 1}: ${lapTime}`;
    lapList.appendChild(li);
}

// Button Event Listeners
document.getElementById("start").addEventListener("click", () => {
    if (!isRunning) startStopwatch();
});

document.getElementById("stop").addEventListener("click", stopStopwatch);
document.getElementById("reset").addEventListener("click", resetStopwatch);
document.getElementById("lap").addEventListener("click", () => {
    if (isRunning) lapStopwatch();
});
