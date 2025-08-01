import { db } from './firebase-config.js';
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const ADMIN_PASSWORD = "admin123";

window.login = async function () {
    const password = document.getElementById("admin-password").value;
    if (password === ADMIN_PASSWORD) {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("admin-section").style.display = "block";
        await renderQuestions();
    } else {
        alert("Incorrect password!");
    }
};

window.addQuestion = async function () {
    const topic = document.getElementById("topic").value;
    const question = document.getElementById("question").value;
    const option1 = document.getElementById("option1").value;
    const option2 = document.getElementById("option2").value;
    const option3 = document.getElementById("option3").value;
    const option4 = document.getElementById("option4").value;
    const answer = parseInt(document.getElementById("answer").value);

    if (!topic || !question || !option1 || !option2 || !option3 || !option4 || isNaN(answer)) {
        return alert("Please fill all fields correctly!");
    }

    await addDoc(collection(db, "quizzes"), {
        topic,
        q: question,
        options: [option1, option2, option3, option4],
        answer
    });

    alert("Question added successfully!");
    renderQuestions();
};

window.deleteQuestion = async function (id) {
    await deleteDoc(doc(db, "quizzes", id));
    alert("Question deleted successfully!");
    renderQuestions();
};

async function renderQuestions() {
    const list = document.getElementById("question-list");
    list.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "quizzes"));
    querySnapshot.forEach((document) => {
        const q = document.data();
        const li = document.createElement("li");
        li.innerHTML = `<strong>[${q.topic}]</strong> ${q.q} <button onclick="deleteQuestion('${document.id}')">Delete</button>`;
        list.appendChild(li);
    });
}
