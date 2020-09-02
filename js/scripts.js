
// NEW GAME SETTINGS:
let guesses = 6

// Words Available to be Guessed
let wordSelectArray = [
    'song', 'bomb', 'garbage', 'backbone', 'horse', 'pinwheel', 'battery',
    'hockey', 'lightsaber', 'music', 'dance', 'movie', 'barbeque', 'oven', 'mousetrap',
    'apple', 'orange', 'grapefruit', 'banana', 'thief', 'nature', 'pool', 'shallow',
    'deep', 'electricity', 'electrician', 'cowboy', 'oilers', 'eskimos', 'redskins',
    'draw', 'lottery', 'dachshund', 'google', 'bing', 'chrome', 'explorer',
    'netscape', 'firefox'
]
// Word Random Selection
let secretWord = wordSelectArray[Math.floor(Math.random() * wordSelectArray.length)];
console.log(secretWord); // For Testing. Comment out or delete before Final Push

// Guessed Letter Array - Correct
let answerArray = []
// Guess Letter Array - Incorrect
let wrongArray = []
let underscores;
let answerString = "";

// Allow for Enter to Function as the same as clicking "Make Guess"
const input = document.querySelector('input');
input.addEventListener('keyup', (e) => {
    (e.keyCode === 13 ? MakeGuess() : null);
})

// Display Chances Left at Start of Game
let chancesLeft = document.getElementById('chances-left');
chancesLeft.textContent = guesses;

function ImageProgress() {
    const img = document.querySelector('img');
    img.src = './img/' + guesses + '.png';
}

// Adding underscores for each letter in secretWord
function NewGame() {
    for (let i = 0; i < secretWord.length; i++) {
        answerArray[i] = "_";
    }
    underscores = answerArray.join(" ");
    document.getElementById("correct-guesses").innerHTML = underscores;
}

function WinningPopup() {
    let txt;
    if (confirm('You Won! Play Again?')){
        location.reload();
    } else {
        null;
    }
}


function LosingPopup() {
    let txt;
    if (confirm('You Lost :(! Play Again?')){
        window.location.reload();
    } else {
        null;
    }
}


function MakeGuess() {
    // Retrieve letter input by user
    const letterInsens = document.getElementById("guessed-letter").value;
    const letter = letterInsens.toLowerCase();
    document.getElementById("guessed-letter").value = ""; // Reset Text Box to Blank
    let answerString = "";
    let z = 1;
    if (letter.length > 0) {

        for (let i = 0; i < secretWord.length; i++) {
            if (secretWord[i] === letter) {
                answerArray[i] = letter;
                answerString = answerArray.join("");
                z = 0;
            }
        }
        if (z == 1) {
            guesses--;
            wrongArray.push(letter);
            ImageProgress()
            z = 0;
        }

        // Update remaining guesses each time function is called
        document.getElementById('chances-left').innerHTML = guesses;
        document.getElementById("correct-guesses").innerHTML = answerArray.join(" ")
        document.getElementById('incorrect-choices').innerHTML = wrongArray;

        answerString = answerArray.join("");

        if (guesses < 1) {
            document.getElementById("win-or-lose").innerHTML = "You Lose. Continue Guessing to Try, or Press New Game"
            LosingPopup()
        }
        else if (answerString == secretWord) {
            document.getElementById("win-or-lose").innerHTML = "You Win! Press Play Again to Play Again!"
            WinningPopup()
        }
    }
}