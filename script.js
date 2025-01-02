let secretNumber;
let attempts = 0;
const maxAttempts = 10; // Change attempts limit to 10
let guesses = []; // Array to store previous guesses and feedback

// Start a new game
function startGame() {
    secretNumber = Math.floor(Math.random() * 1000) + 1;
    attempts = 0;
    guesses = []; // Reset the guesses array
    document.getElementById('guessInput').value = '';
    document.getElementById('feedbackText').innerText = '';
    document.getElementById('guessesList').innerHTML = ''; // Clear the previous guesses list
    document.getElementById('resetButton').style.display = 'none';
    document.getElementById('guessButton').disabled = false;
    document.getElementById('guessInput').disabled = false;
    document.getElementById('guessInput').focus();
}

// Handle guess
function checkGuess() {
    const guess = parseInt(document.getElementById('guessInput').value);
    
    if (isNaN(guess) || guess < 1 || guess > 1000) {
        document.getElementById('feedbackText').innerText = 'Please enter a number between 1 and 1000!';
        return;
    }

    attempts++;

    let feedback = '';
    let hint = '';
    
    if (guess === secretNumber) {
        feedback = `Congratulations! You've guessed the number in ${attempts} attempts.`;
        hint = '';
        endGame(true);
    } else if (attempts === maxAttempts) {
        feedback = `Sorry, you've run out of attempts! The number was ${secretNumber}. Better luck next time!`;
        hint = '';
        endGame(false);
    } else {
        hint = guess < secretNumber ? 'Higher!' : 'Lower!';
        feedback = `${hint} You have ${maxAttempts - attempts} attempts left.`;
    }

    // Store the current guess and feedback
    guesses.push({ guess, feedback: hint });
    displayGuesses();
    document.getElementById('feedbackText').innerText = feedback;
}

// Display previous guesses
function displayGuesses() {
    const guessesList = document.getElementById('guessesList');
    guessesList.innerHTML = ''; // Clear the list before adding new items

    guesses.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `Guess: ${item.guess} - ${item.feedback}`;
        guessesList.appendChild(li);
    });
}

// End game and show reset button
function endGame(won) {
    document.getElementById('guessButton').disabled = true;
    document.getElementById('guessInput').disabled = true;
    document.getElementById('resetButton').style.display = 'inline-block';
    if (won) {
        document.getElementById('feedbackText').style.color = '#4caf50'; // Green for win
    } else {
        document.getElementById('feedbackText').style.color = '#f44336'; // Red for loss
    }
}

// Event listeners
document.getElementById('guessButton').addEventListener('click', checkGuess);
document.getElementById('resetButton').addEventListener('click', startGame);

// Allow pressing Enter to submit guess
document.getElementById('guessInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

// Start the game when the page loads
window.onload = startGame;
