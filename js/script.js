// Wait for the DOM to load before running the game
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");
    
    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }
    
    // Start with an addition game by default
    runGame("addition");
});

/**
 * Main game function that generates random numbers and displays questions
 */
function runGame(gameType) {
    // Creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
        return;
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
        return;
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
        return;
    } else if (gameType === "division") {
        // For division, ensure the first number is divisible by the second
        let divisor = Math.floor(Math.random() * 12) + 1; // 1-12
        let dividend = divisor * (Math.floor(Math.random() * 12) + 1); // Multiple of divisor
        displayDivisionQuestion(dividend, divisor);
        return;
    }
    
    // This should only execute if no valid game type was found
    alert(`Unknown game type: ${gameType}`);
    throw `Unknown game type: ${gameType}. Aborting!`;
}


/**
 * Checks the answer and provides feedback to the user
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];
    
    if (isCorrect) {
        alert("Hey! You got it right! :D");
        incrementScore();
    } else {
        alert(`Awwww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }
    
    // Generate a new question of the same type
    runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands and operator from the DOM and calculates the correct answer
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;
    
    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "÷") {
        return [operand1 / operand2, "division"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
}

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {
   
   let oldScore = parseInt(document.getElementById("score").innerText);
   document.getElementById("score").innerText = ++oldScore;

}

/**
* Gets the current tally of incorrect answers from the DOM and increments it by 1
*/
function incrementWrongAnswer() {
   let oldScore = parseInt(document.getElementById("incorrect").innerText);
   document.getElementById("incorrect").innerText = ++oldScore;
}

/**
 * Displays an addition question in the question-area div
 */
function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
    document.getElementById("answer-box").value = "";
}

/**
 * Displays a subtraction question in the question-area div
 */
function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "-";
    document.getElementById("answer-box").value = "";
}

/**
 * Displays a multiplication question in the question-area div
 */
function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
    document.getElementById("answer-box").value = "";
}

/**
 * Displays a division question in the question-area div
 */
function displayDivisionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "÷";
    document.getElementById("answer-box").value = "";
}
