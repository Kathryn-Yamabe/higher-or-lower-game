let currentNumber = Math.floor(Math.random() * 100) + 1;
let score = 0;

document.getElementById("current-number").textContent = currentNumber;

function makeGuess(guess) {
    const nextNumber = Math.floor(Math.random() * 100) + 1;
    let correct = false;

    if (guess === "higher" && nextNumber > currentNumber) {
        correct = true;
    } else if (guess === "lower" && nextNumber < currentNumber) {
        correct = true;
    }

    if (correct) {
        score++;
        document.getElementById("result").textContent = "Correct!";
    } else {
        score = 0;
        document.getElementById("result").textContent = "Wrong! Try again.";
    }

    currentNumber = nextNumber;
    document.getElementById("current-number").textContent = currentNumber;
    document.getElementById("score").textContent = score;
}
