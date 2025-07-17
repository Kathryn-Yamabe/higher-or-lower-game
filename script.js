let data = [];
let currentPair = [];
let score = 0;

function getThemeFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('theme') || 'hospital-costs';
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)];
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadData(theme) {
    fetch(`data/${theme}.json`)
        .then(response => response.json())
        .then(json => {
            data = json;
            shuffle(data);
            nextRound();
        })
        .catch(error => {
            document.getElementById("prompt").textContent = "Failed to load data.";
            console.error("Error loading data:", error);
        });
}

function nextRound() {
    if (data.length < 2) {
        document.getElementById("prompt").textContent = "Not enough data to continue.";
        return;
    }
    currentPair = data.splice(0, 2);
    document.getElementById("item-a").textContent = currentPair[0].name;
    document.getElementById("item-b").textContent = currentPair[1].name;
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

const theme = getThemeFromURL();
loadData(theme);
