let points = 0;
let currentQuestion = 0;
let questions = JSON.parse(localStorage.getItem("questions")) || [
    { q: "Who was the first President of India?", options: ["Mahatma Gandhi", "Rajendra Prasad", "Sardar Patel"], answer: 1 },
    { q: "What is the capital of Gujarat?", options: ["Surat", "Ahmedabad", "Gandhinagar"], answer: 2 }
];

const referralLink = document.getElementById("referral-link");
referralLink.value = `${window.location.origin}?ref=${Math.random().toString(36).substring(2, 8)}`;

function loadQuestion() {
    const quizContainer = document.getElementById("quiz-container");
    const question = questions[currentQuestion];
    quizContainer.innerHTML = `<h3>${question.q}</h3>` + 
        question.options.map((opt, index) => 
            `<button onclick="checkAnswer(${index})">${opt}</button>`
        ).join("");
}

function checkAnswer(selected) {
    if (selected === questions[currentQuestion].answer) {
        points += 10;
        document.getElementById("points").innerText = "Points: " + points;
        alert("Correct!");
    } else {
        alert("Wrong Answer!");
    }
}

function nextQuestion() {
    currentQuestion = (currentQuestion + 1) % questions.length;
    loadQuestion();
}

function copyReferral() {
    referralLink.select();
    document.execCommand("copy");
    alert("Referral link copied!");
}

function joinTelegram() {
    window.open("https://t.me/quizzsapp", "_blank");
}

loadQuestion();
