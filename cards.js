var errors = 0;
var score = 0;
var cardList = [
    "blanc",
    "bleu",
    "maron",
    "orange",
    "rosyy",
    "rosyyyy",
    "rouge",
    "vert",
    "viloet",
    "violete"
];

var cardSet;
var board = [];
var rows = 4;
var columns = 5;

var card1Selected;
var card2Selected;

var elapsedTime = 0;
var timerInterval;

window.onload = function () {
    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('stop-button').addEventListener('click', stopTimer);
};

function shuffleCards() {
    cardSet = cardList.concat(cardList); //two of each card
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); //get random index
        [cardSet[i], cardSet[j]] = [cardSet[j], cardSet[i]]; //swap
    }
}

function startGame() {
    shuffleCards();
    setupBoard();
    startTimer();
}

function setupBoard() {
    board = [];
    document.getElementById("board").innerHTML = ""; // Clear previous cards

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg);

            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = cardImg + ".jpg";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }

    setTimeout(hideCards, 1000);
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "att.__6fHwZ0JGqeHGrjyioZK7f0Nnu4bCPzYWBBW9F0lgo.jpg";
        }
    }
}

function selectCard() {
    if (this.src.includes("att.__6fHwZ0JGqeHGrjyioZK7f0Nnu4bCPzYWBBW9F0lgo")) {
        if (!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = board[r][c] + ".jpg";
        } else if (!card2Selected && this != card1Selected) {
            card2Selected = this;

            let coords = card2Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = board[r][c] + ".jpg";
            setTimeout(update, 1000);
        }
    }
}

function update() {
    //if cards aren't the same, flip both back
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = "att.__6fHwZ0JGqeHGrjyioZK7f0Nnu4bCPzYWBBW9F0lgo.jpg";
        card2Selected.src = "att.__6fHwZ0JGqeHGrjyioZK7f0Nnu4bCPzYWBBW9F0lgo.jpg";
        errors += 1;

        document.getElementById("errors").innerText = errors;
    }
    //if cards are the same
    else {
        score += 10;
        document.getElementById("score").innerText = `${score}`;
        if (score == 100) {
            if (errors <= 6) {
                // console.log("You won!!");
                alert("You Won!!");
            } else if (errors <= 10) {
                alert("You can do better");
            } else {
                alert("Try again");
            }
            stopTimer();
        }
    }
    card1Selected = null;
    card2Selected = null;
}

function startTimer() {
    elapsedTime = 0; // Reset timer at the start of the game
    timerInterval = setInterval(() => {
        elapsedTime++;
        document.getElementById("timedisplay").textContent = elapsedTime;

        if (elapsedTime >= 60) {
            clearInterval(timerInterval);
            resetGame(); // This function should handle the game reset logic
        }
    }, 1000); // Update every second
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetGame() {
    // Implement game reset logic here
    alert("Time's up! Resetting the game.");
    location.reload(); // Simple page reload to reset the game
}
