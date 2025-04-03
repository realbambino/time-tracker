// Get elements
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const changeRateButton = document.getElementById('changeRateButton');
const rateLayer = document.getElementById('rateLayer');
const hourlyRateInput = document.getElementById('hourlyRateInput');
const saveRateButton = document.getElementById('saveRateButton');
const earningsDisplay = document.getElementById('earnings');
const rateDisplay = document.getElementById('rateDisplay'); // Element to display the current hourly rate

// State variables
let isTimerRunning = false;
let timerInterval;
let elapsedTime = 0;
let hourlyRate = parseFloat(localStorage.getItem('hourlyRate')) || 10; // Default hourly rate if not set

// Display the saved hourly rate in the calculation
rateDisplay.textContent = hourlyRate; // Display the current hourly rate when the page loads
calculateEarnings();

// Toggle the rate input layer visibility
changeRateButton.addEventListener('click', function() {
    rateLayer.classList.toggle('hidden');
});

// Save the new hourly rate to localStorage
saveRateButton.addEventListener('click', function() {
    const newHourlyRate = parseFloat(hourlyRateInput.value);
    if (!isNaN(newHourlyRate) && newHourlyRate > 0) {
        hourlyRate = newHourlyRate;
        localStorage.setItem('hourlyRate', hourlyRate); // Save to localStorage
        alert(`Hourly rate updated to $${hourlyRate}`);
        rateLayer.classList.add('hidden'); // Hide the input layer after saving the rate
        rateDisplay.textContent = hourlyRate; // Update the displayed hourly rate
        calculateEarnings();
    } else {
        alert("Please enter a valid hourly rate.");
    }
});

// Start/Stop Timer functionality
startButton.addEventListener('click', function() {
    if (isTimerRunning) {
        clearInterval(timerInterval);
        startButton.textContent = 'Start';
        stopButton.disabled = false;
        stopButton.textContent = 'End';
        isTimerRunning = false;
    } else {
        timerInterval = setInterval(updateTime, 1000);
        startButton.textContent = 'Pause';
        stopButton.disabled = false;
        stopButton.textContent = 'End';
        isTimerRunning = true;
    }
});

stopButton.addEventListener('click', function() {
    // Reset timer when "End" button is clicked
    clearInterval(timerInterval); // Stop the timer
    elapsedTime = 0; // Reset elapsed time to 0
    document.querySelector('.timer').textContent = "00:00:00"; // Reset the timer display to 00:00:00
    startButton.textContent = 'Start'; // Reset the start button text
    stopButton.disabled = true; // Disable the "End" button after stopping
    startButton.disabled = false; // Enable the "Start" button for the next cycle
    calculateEarnings(); // Update earnings to reflect the reset time
});

// Update the timer
function updateTime() {
    elapsedTime++;
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;
    document.querySelector('.timer').textContent = `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
    calculateEarnings();
}

// Helper function to pad time
function padTime(time) {
    return time < 10 ? '0' + time : time;
}

// Calculate earnings based on hourly rate and elapsed time
function calculateEarnings() {
    const earnings = (elapsedTime / 3600) * hourlyRate;
    earningsDisplay.textContent = earnings.toFixed(2);
}
