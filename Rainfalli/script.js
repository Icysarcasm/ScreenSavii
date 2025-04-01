const rainContainer = document.querySelector('.rain');
const speedSlider = document.getElementById('speed-slider');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const sliderContainer = document.querySelector('.slider-container');
const darkModeContainer = document.querySelector('.dark-mode-container');

let interval = 10; // Default interval in milliseconds
let rainInterval;
let inactivityTimeout;

// Function to create a raindrop
function createRaindrop() {
    const raindrop = document.createElement('div');
    raindrop.classList.add('raindrop');

    // Randomize the position and animation duration
    raindrop.style.left = Math.random() * 100 + 'vw';
    raindrop.style.animationDuration = Math.random() * 1 + 1 + 's'; // Between 1s and 2s

    rainContainer.appendChild(raindrop);

    // Remove the raindrop after it falls
    setTimeout(() => {
        raindrop.remove();
    }, 5000); // Matches the maximum animation duration
}

// Function to start generating raindrops
function startRain() {
    clearInterval(rainInterval);
    rainInterval = setInterval(createRaindrop, interval);
}

// Event listener for the slider to adjust speed
speedSlider.addEventListener('input', (event) => {
    interval = parseInt(event.target.value);
    startRain();
});

// Event listener for the dark mode toggle
darkModeToggle.addEventListener('change', (event) => {
    if (event.target.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

// Automatically detect browser dark mode preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    darkModeToggle.checked = true;
    document.body.classList.add('dark-mode');
}

// Function to hide UI and mouse cursor
function hideUI() {
    document.body.style.cursor = 'none';
    sliderContainer.style.opacity = '0';
    darkModeContainer.style.opacity = '0';
}

// Function to show UI and mouse cursor
function showUI() {
    document.body.style.cursor = 'default';
    sliderContainer.style.opacity = '1';
    darkModeContainer.style.opacity = '1';

    // Reset the inactivity timeout
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(hideUI, 3000); // Hide UI after 3 seconds of inactivity
}

// Add event listeners for user activity
document.addEventListener('mousemove', showUI);
document.addEventListener('keydown', showUI);

// Start the rain initially
startRain();

// Set the initial inactivity timeout
inactivityTimeout = setTimeout(hideUI, 3000);