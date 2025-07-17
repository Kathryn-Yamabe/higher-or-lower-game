
let data = [];
let currentPair = [];
let score = 0;

// Get theme from URL
const urlParams = new URLSearchParams(window.location.search);
const theme = urlParams.get('theme') || 'hospital-costs';

// Load data from JSON file
fetch(`data/${theme}.json`)
    .then(response => response.json())
    .then(json => {
        data = json;
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
    document.getElementById("comparison-line").textContent = `${currentPair[0].name} vs ${currentPair[1].name}`;
    document.getElementById("result").textContent = "";
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
    } else {
        score = 0;
        document.getElementById("result").textContent = `Wrong! ${a.name}: ${a.value}, ${b.name}: ${b.value}`;
    }

    document.getElementById("score").textContent = score;
    nextRound();
}
