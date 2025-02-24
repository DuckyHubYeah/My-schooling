/* General Styling */
body {
    background: linear-gradient(135deg, #4b6cb7, #182848); /* Blue Gradient */
    font-family: 'Arial', sans-serif;
    color: #fff;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
}

/* Layout: Distribute Panels with Space */
.main-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    max-width: 1200px;
}

/* Panels (Left, Center, Right) */
.left-panel, .right-panel {
    display: flex;
    flex-direction: column;
    gap: 20px; /* More space between buttons */
}

.center-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 4px solid #ff9800; /* Orange border around the center box */
    border-radius: 15px;
    background: rgba(0, 0, 0, 0.7);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    width: 50%; /* Ensuring it's large enough */
}

/* Heading */
h1 {
    font-size: 2.5em;
    color: #61dafb;
}

/* Buttons */
.mode-button, .operation-button {
    background: #2196f3;
    border: none;
    color: white;
    font-size: 1.2em;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s;
    width: 150px;
    text-align: center;
}

.mode-button:hover, .operation-button:hover {
    background: #1976d2;
}

/* Highlight Selected Mode & Operation */
.selected {
    background: #ff9800 !important; /* Orange color for selected buttons */
    color: #000; /* Black text for contrast */
    font-weight: bold;
}

/* Question */
#question {
    font-size: 2em;
    margin: 20px 0;
}

/* Answer Buttons */
.button-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 10px 0;
}

.answer-button {
    background: #ff9800;
    border: none;
    color: white;
    font-size: 1.5em;
    padding: 15px 30px;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s;
    width: 120px;
}

.answer-button:hover {
    background: #e68900;
}

.answer-button.disabled {
    background: #555; /* Grey out incorrect answers */
    cursor: not-allowed;
}

/* Message */
#message {
    font-size: 1.5em;
    font-weight: bold;
    margin: 20px;
}

/* Correct and Wrong Answer Colors */
.correct {
    color: #4CAF50;
}

.wrong {
    color: #FF5252;
}
