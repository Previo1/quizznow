const ADMIN_PASSWORD = "admin123"; // Local password
let questions = JSON.parse(localStorage.getItem("questions")) || [];

function login() {
    const password = document.getElementById("admin-password").value;
    if (password === ADMIN_PASSWORD) {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("admin-section").style.display = "block";
        renderQuestions();
    } else {
        alert("Incorrect password!");
    }
}

function addQuestion() {
    const question = document.getElementById("question").value;
    const option1 = document.getElementById("option1").value;
    const option2 = document.getElementById("option2").value;
    const option3 = document.getElementById("option3").value;
    const answer = parseInt(document.getElementById("answer").value);

    if (!question || !option1 || !option2 || !option3 || isNaN(answer)) {
        return alert("Please fill all fields correctly!");
    }

    questions.push({ q: question, options: [option1, option2, option3], answer });
    localStorage.setItem("questions", JSON.stringify(questions));
    renderQuestions();
    alert("Question added!");
}

function renderQuestions() {
    const list = document.getElementById("question-list");
    list.innerHTML = "";
    questions.forEach((q, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${q.q}`;
        list.appendChild(li);
    });
}
