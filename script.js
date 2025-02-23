document.addEventListener("DOMContentLoaded", () => {
    const questionElement = document.getElementById("question");
    const messageElement = document.getElementById("message");
    const answerButtons = document.querySelectorAll(".answer-button");
    const modeButtons = document.querySelectorAll(".mode-button");
    const operationButtons = document.querySelectorAll(".operation-button");

    let currentAnswer = 0;
    let mode = "easy";
    let operation = "multiplication";

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateQuestion() {
        let num1, num2;
        
        switch (mode) {
            case "easy":
                num1 = getRandomInt(1, 4);
                num2 = getRandomInt(1, 4);
                break;
            case "medium":
                num1 = getRandomInt(5, 8);
                num2 = getRandomInt(5, 8);
                break;
            case "hard":
                num1 = getRandomInt(9, 12);
                num2 = getRandomInt(9, 12);
                break;
            case "all":
            default:
                num1 = getRandomInt(1, 12);
                num2 = getRandomInt(1, 12);
                break;
        }

        switch (operation) {
            case "addition":
                currentAnswer = num1 + num2;
                questionElement.textContent = `${num1} + ${num2} = ?`;
                break;
            case "subtraction":
                currentAnswer = num1 - num2;
                questionElement.textContent = `${num1} - ${num2} = ?`;
                break;
            case "division":
                num1 = num1 * num2;
                currentAnswer = num1 / num2;
                questionElement.textContent = `${num1} ÷ ${num2} = ?`;
                break;
            case "multiplication":
            default:
                currentAnswer = num1 * num2;
                questionElement.textContent = `${num1} × ${num2} = ?`;
                break;
        }

        messageElement.textContent = "";
        let answers = new Set();
        answers.add(currentAnswer);
        while (answers.size < 4) {
            let fakeAnswer = getRandomInt(1, 144);
            if (fakeAnswer !== currentAnswer) {
                answers.add(fakeAnswer);
            }
        }

        let shuffledAnswers = [...answers].sort(() => Math.random() - 0.5);
        answerButtons.forEach((button, index) => {
            button.textContent = shuffledAnswers[index];
            button.style.background = "#ff9800";
            button.onclick = () => checkAnswer(parseInt(button.textContent), button);
        });
    }

    function checkAnswer(selectedAnswer, button) {
        if (selectedAnswer === currentAnswer) {
            messageElement.textContent = "Correct!";
            messageElement.className = "correct";
            setTimeout(generateQuestion, 1000);
        } else {
            messageElement.textContent = "Wrong! Try again.";
            messageElement.className = "wrong";
            button.style.background = "#FF5252";
            setTimeout(() => button.style.background = "#ff9800", 500);
        }
    }

    modeButtons.forEach(button => {
        button.addEventListener("click", () => {
            mode = button.getAttribute("data-mode");
            generateQuestion();
        });
    });

    operationButtons.forEach(button => {
        button.addEventListener("click", () => {
            operation = button.getAttribute("data-operation");
            generateQuestion();
        });
    });

    generateQuestion();
});
