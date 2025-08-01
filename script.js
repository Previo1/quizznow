import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

let points = 0;
let currentQuestion = 0;
let questions = [];
let selectedTopic = null;

const referralLink = document.getElementById("referral-link");
referralLink.value = `${window.location.origin}?ref=${Math.random().toString(36).substring(2, 8)}`;

async function loadTopics() {
    const querySnapshot = await getDocs(collection(db, "quizzes"));
    const topics = new Set();

    querySnapshot.forEach((doc) => topics.add(doc.data().topic));

    const container = document.getElementById("quiz-container");
    container.innerHTML = "<h3>Select a Topic</h3>";

    topics.forEach((topic) => {
        const btn = document.createElement("button");
        btn.textContent = topic;
        btn.onclick = () => loadQuestions(topic);
        container.appendChild(btn);
    });
}

async function loadQuestions(topic) {
    selectedTopic = topic;
    const querySnapshot = await getDocs(collection(db, "quizzes"));
    questions = [];

    querySnapshot.forEach((doc) => {
        const q = doc.data();
        if (q.topic === topic) questions.push(q);
    });

    if (questions.length > 0) {
        loadQuestion();
    } else {
        document.getElementById("quiz-container").innerHTML = "<p>No questions in this topic</p>";
    }
}

function loadQuestion() {
    const quizContainer = document.getElementById("quiz-container");
    const question = questions[currentQuestion];
    quizContainer.innerHTML = `<h3>[${selectedTopic}] ${question.q}</h3>` +
        question.options.map((opt, index) =>
            `<button onclick="checkAnswer(${index})">${opt}</button>`
        ).join("") +
        `<br><button onclick="nextQuestion()">Next</button>`;
}

window.checkAnswer = function (selected) {
    if (selected === questions[currentQuestion].answer) {
        points += 10;
        document.getElementById("points").innerText = "Points: " + points;
        alert("Correct!");
    } else {
        alert("Wrong!");
    }
};

window.nextQuestion = function () {
    currentQuestion = (currentQuestion + 1) % questions.length;
    loadQuestion();
};

window.copyReferral = function() {
    referralLink.select();
    document.execCommand("copy");
    alert("Referral link copied!");
}

window.joinTelegram = function() {
    window.open("https://t.me/quizzsapp", "_blank");
}

window.onload = loadTopics;
