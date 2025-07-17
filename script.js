let data = [];
let currentPair = [];
let score = 0;

// Get theme from URL
const urlParams = new URLSearchParams(window.location.search);
const theme = urlParams.get('theme') || 'hospital-costs';

// Convert theme to readable format for prompt
function formatThemeName(theme) {
    return theme.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// Load data from JSON file
fetch(`data/${theme}.json`)
    .then(response => response.json())
    .then(json => {
        data = json;
        document.getElementById("prompt").textContent = `Which has higher ${formatThemeName(theme)}?`;
        nextRound();
    })
    .catch(error => {
        document.getElementById("prompt").textContent = "Error loading data.";
        console.error("Error loading theme data:", error);
    });

function nextRound() {
    if (data.length < 2) return;

    let indexA = Math.floor(Math.random() * data.length);
    let indexB;
    do {
        indexB = Math.floor(Math.random() * data.length);
    } while (indexB === indexA);

    currentPair = [data[indexA], data[indexB]];

    document.getElementById("item-a-name").textContent = currentPair[0].name;
    document.getElementById("item-b-name").textContent = currentPair[1].name;

    document.getElementById("button-a").textContent = currentPair[0].name;
    document.getElementById("button-b").textContent = currentPair[1].name;

    document.getElementById("result").textContent = "";
    document.getElementById("play-again").style.display = "none";
}

function makeGuess(choice) {
    const a = currentPair[0];
    const b = currentPair[1];

    let correct = false;
    if (choice === 'a' && a.value >= b.value) {
        correct = true;
    } else if (choice === 'b' && b.value >= a.value) {
        correct = true;
    }

    if (correct) {
        score++;
        document.getElementById("result").textContent = "Correct!";
        document.getElementById("score").textContent = score;
        setTimeout(nextRound, 1000);
    } else {
        document.getElementById("result").textContent = `Wrong! ${a.name}: ${a.value}, ${b.name}: ${b.value}`;
        document.getElementById("score").textContent = 0;
        score = 0;
        document.getElementById("play-again").style.display = "inline-block";
    }
}
