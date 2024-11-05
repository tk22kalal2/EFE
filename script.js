let currentQuestionIndex = 0;
let questions = [];

async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        questions = await response.json();
        displayQuestion();
    } catch (error) {
        console.error("Could not load questions:", error);
    }
}

function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        document.getElementById('question-text').textContent = question.question;
        
        const answerButtons = document.getElementById('answer-buttons');
        answerButtons.innerHTML = ''; // Clear previous answers

        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectAnswer(answer.correct));
            answerButtons.appendChild(button);
        });
    } else {
        document.getElementById('question-text').textContent = "Quiz Completed!";
    }
}

function selectAnswer(correct) {
    if (correct) {
        alert("Correct!");
    } else {
        alert("Try again!");
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

// Initialize quiz on page load
window.onload = loadQuestions;
