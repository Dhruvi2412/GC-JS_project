let timer;
let isRunning = false;
let isWorkSession = true; // true for work, false for break
let timeLeft; // Time left in seconds

const timerDisplay = document.getElementById("timerDisplay");
const sessionType = document.getElementById("sessionType");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const timerDurationSelect = document.getElementById("timerDuration");
const purposeInput = document.getElementById("purpose");

// Function to update the timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Switch between work and break session
function switchSession() {
    isWorkSession = !isWorkSession;
    timeLeft = isWorkSession ? parseInt(timerDurationSelect.value) : 5 * 60; // Default break time is 5 minutes
    sessionType.textContent = isWorkSession ? "Work" : "Break";
    updateTimerDisplay();
}

// Start the timer
function startTimer() {
    if (isRunning) return;
    isRunning = true;
    startButton.textContent = "Pause";

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            switchSession();
            if (isWorkSession) {
                startTimer(); // Start the break timer after work
            }
        }
    }, 1000);
}

// Pause the timer
function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    startButton.textContent = "Start";
}

// Reset the timer
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = parseInt(timerDurationSelect.value);
    updateTimerDisplay();
    startButton.textContent = "Start";
}

// Event listeners for buttons
startButton.addEventListener("click", () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetButton.addEventListener("click", resetTimer);

// Event listener for time selection change
timerDurationSelect.addEventListener("change", () => {
    if (!isRunning) {
        timeLeft = parseInt(timerDurationSelect.value);
        updateTimerDisplay();
    }
});

// Initialize the display with the selected time
timeLeft = parseInt(timerDurationSelect.value);
updateTimerDisplay();
