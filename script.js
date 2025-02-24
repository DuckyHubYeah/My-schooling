document.addEventListener("DOMContentLoaded", () => {
    const questionElement = document.getElementById("question");
    const messageElement = document.getElementById("message");
    const answerButtons = document.querySelectorAll(".answer-button");
    const modeButtons = document.querySelectorAll(".mode-button");
    const operationButtons = document.querySelectorAll(".operation-button");

    let currentAnswer = 0;
    let mode = "easy"; // Default mode
    let operation = "multiplication"; // Default operation

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateQuestion() {
        let num1, num2, questionText;
        
        // Define difficulty levels
        switch (mode) {
            case "easy":
                num1 = getRandomInt(1, 4);
                num2 = getRandomInt(1, 10);
                break;
            case "medium":
                num1 = getRandomInt(5, 10);
                num2 = getRandomInt(3, 15);
                break;
            case "hard":
                num1 = getRandomInt(11, 20);
                num2 = getRandomInt(6, 20);
                break;
            case "all":
            default:
                num1 = getRandomInt(1, 12);
                num2 = getRandomInt(1, 20);
                break;
        }

        // Randomly pick an operation if "mix" is selected
        let selectedOperation = operation;
        if (operation === "mix") {
            const operations = ["addition", "subtraction", "multiplication", "division"];
            selectedOperation = operations[getRandomInt(0, operations.length - 1)];
        }

        // Generate question based on selected operation
        switch (selectedOperation) {
            case "addition":
                currentAnswer = num1 + num2;
                questionText = `${num1} + ${num2} = ?`;
                break;
            case "subtraction":
                if (num1 < num2) [num1, num2] = [num2, num1]; // Ensure no negative answers
                currentAnswer = num1 - num2;
                questionText = `${num1} - ${num2} = ?`;
                break;
            case "multiplication":
                currentAnswer = num1 * num2;
                questionText = `${num1} × ${num2} = ?`;
                break;
            case "division":
                currentAnswer = num1;
                num1 = num1 * num2; // Ensure a clean division problem
                questionText = `${num1} ÷ ${num2} = ?`;
                break;
        }

        questionElement.textContent = questionText;

        // Generate four unique answer choices
        let answers = new Set();
        answers.add(currentAnswer);

        while (answers.size < 4) {
            let fakeAnswer = getRandomInt(currentAnswer - 10, currentAnswer + 10);
            if (fakeAnswer !== currentAnswer && fakeAnswer > 0) {
                answers.add(fakeAnswer);
            }
        }

        // Shuffle and set button values
        let shuffledAnswers = [...answers].sort(() => Math.random() - 0.5);
        answerButtons.forEach((button, index) => {
            button.textContent = shuffledAnswers[index];
            button.onclick = () => checkAnswer(parseInt(button.textContent), button);
            button.classList.remove("disabled"); // Enable buttons again for a new question
        });

        messageElement.textContent = ""; // Clear message when a new question is generated
    }

    function checkAnswer(selectedAnswer, button) {
        if (selectedAnswer === currentAnswer) {
            messageElement.textContent = "Correct!";
            messageElement.className = "correct";
            setTimeout(generateQuestion, 1000); // Generate a new question only if the answer is correct
        } else {
            messageElement.textContent = "Wrong! Try again.";
            messageElement.className = "wrong";
            button.classList.add("disabled"); // Disable the incorrect answer
        }
    }

    function updateSelectedButton(buttons, selectedValue) {
        buttons.forEach(button => {
            if (button.getAttribute("data-mode") === selectedValue || button.getAttribute("data-operation") === selectedValue) {
                button.classList.add("selected");
            } else {
                button.classList.remove("selected");
            }
        });
    }

    // Mode Selection Buttons
    modeButtons.forEach(button => {
        button.addEventListener("click", () => {
            mode = button.getAttribute("data-mode");
            updateSelectedButton(modeButtons, mode);
            generateQuestion();
        });
    });

    // Operation Selection Buttons
    operationButtons.forEach(button => {
        button.addEventListener("click", () => {
            operation = button.getAttribute("data-operation");
            updateSelectedButton(operationButtons, operation);
            generateQuestion();
        });
    });

    // Initialize selected buttons
    updateSelectedButton(modeButtons, mode);
    updateSelectedButton(operationButtons, operation);

    // Start with an initial question
    generateQuestion();
});
