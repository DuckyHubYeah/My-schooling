document.addEventListener("DOMContentLoaded", () => {
    const questionElement = document.getElementById("question");
    const messageElement = document.getElementById("message");
    const answerButtons = document.querySelectorAll(".answer-button");
    const modeButtons = document.querySelectorAll(".mode-button");

    let currentAnswer = 0;
    let mode = "easy"; // Default mode

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateQuestion() {
        let multiplicand, multiplier;
        
        switch (mode) {
            case "easy":
                multiplicand = getRandomInt(1, 4);
                break;
            case "medium":
                multiplicand = getRandomInt(5, 8);
                break;
            case "hard":
                multiplicand = getRandomInt(9, 12);
                break;
            case "all":
            default:
                multiplicand = getRandomInt(1, 12);
                break;
        }

        multiplier = getRandomInt(1, 12);
        currentAnswer = multiplicand * multiplier;
        
        questionElement.textContent = `${multiplicand} × ${multiplier} = ?`;

        // Generate four answer choices
        let answers = new Set();
        answers.add(currentAnswer);

        while (answers.size < 4) {
            let fakeAnswer = getRandomInt(1, 144); // Ensure the range covers all possible products
            if (fakeAnswer !== currentAnswer) {
                answers.add(fakeAnswer);
            }
        }

        // Shuffle and set button values
        let shuffledAnswers = [...answers].sort(() => Math.random() - 0.5);
        answerButtons.forEach((button, index) => {
            button.textContent = shuffledAnswers[index];
            button.onclick = () => checkAnswer(parseInt(button.textContent));
        });
    }

    function checkAnswer(selectedAnswer) {
        if (selectedAnswer === currentAnswer) {
            messageElement.textContent = "Correct!";
            messageElement.className = "correct";
        } else {
            messageElement.textContent = "Wrong! Try again.";
            messageElement.className = "wrong";
        }
        setTimeout(generateQuestion, 1000); // Generate a new question after a second
    }

    // Mode Selection
    modeButtons.forEach(button => {
        button.addEventListener("click", () => {
            mode = button.getAttribute("data-mode");
            generateQuestion();
        });
    });

    // Start with a question
    generateQuestion();
});
