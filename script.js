document.addEventListener("DOMContentLoaded", function () {
    const questionElement = document.getElementById("question");
    const buttons = document.querySelectorAll(".answer-button");
    let correctAnswer;

    function generateQuestion() {
        let num1 = Math.floor(Math.random() * 12) + 1;
        let num2 = Math.floor(Math.random() * 12) + 1;
        correctAnswer = num1 * num2;
        questionElement.textContent = `${num1} × ${num2} = ?`;

        let answers = [
            correctAnswer,
            correctAnswer + Math.floor(Math.random() * 10) + 1,
            correctAnswer - Math.floor(Math.random() * 10) - 1,
            correctAnswer + Math.floor(Math.random() * 20) + 11
        ];
        
        answers = answers.sort(() => Math.random() - 0.5);
        
        buttons.forEach((button, index) => {
            button.textContent = answers[index];
            button.onclick = function () {
                checkAnswer(answers[index]);
            };
        });
    }

    function checkAnswer(selected) {
        if (selected === correctAnswer) {
            alert("Correct! Well done!");
            generateQuestion();
        } else {
            alert("Wrong! Try again.");
        }
    }

    generateQuestion();
});
