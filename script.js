const questions = [
  { question: "Which is the core structure of the web?", answers: [
    { text: "JavaScript", correct: false }, { text: "HTML", correct: true },
    { text: "PHP", correct: false }, { text: "CSS", correct: false }]},
  { question: "How do you represent an ID in CSS?", answers: [
    { text: "#", correct: true }, { text: ".", correct: false },
    { text: ":", correct: false }, { text: "::", correct: false }]},
  { question: "JavaScript is mainly used to?", answers: [
    { text: "Add background", correct: false }, { text: "Add HTML structure", correct: false },
    { text: "Add logic to website", correct: true }, { text: "Add styling", correct: false }]},
  { question: "a += b is the same as?", answers: [
    { text: "a + a = b", correct: false }, { text: "a = b + b", correct: false },
    { text: "a = b", correct: false }, { text: "a = a + b", correct: true }]},
  { question: "== is called?", answers: [
    { text: "Assignment operator", correct: false }, { text: "Strict check", correct: false },
    { text: "Strictly equal to", correct: false }, { text: "Equal to", correct: true }]}
];

const $ = id => document.getElementById(id);
const question = $("question"), answers = $("answers"), next = $("next");
const count = $("count"), score = $("score"), fill = $("fill"), helper = $("helper");

let idx = 0, pts = 0;

function start() {
  idx = pts = 0;
  next.textContent = "Next";
  next.dataset.action = "next";
  show();
  progress(0);
}

function show() {
  next.style.display = "none";
  answers.innerHTML = "";
  const q = questions[idx], num = idx + 1;
  question.textContent = `${num}. ${q.question}`;
  count.textContent = `Question ${num} of ${questions.length}`;
  score.textContent = `Score ${pts}/${questions.length}`;
  helper.textContent = "Choose the best answer.";
  
  q.answers.forEach(a => {
    const btn = document.createElement("button");
    btn.textContent = a.text;
    btn.className = "btn";
    if (a.correct) btn.dataset.correct = "true";
    btn.onclick = () => select(btn, a.correct);
    answers.appendChild(btn);
  });
}

function select(btn, correct) {
  btn.classList.add(correct ? "correct" : "incorrect");
  helper.textContent = correct ? "Nice! That's correct." : "Not quite. The correct answer is highlighted.";
  if (correct) pts++;
  
  [...answers.children].forEach(b => {
    if (b.dataset.correct) b.classList.add("correct");
    b.disabled = true;
  });
  
  score.textContent = `Score ${pts}/${questions.length}`;
  progress(idx + 1);
  next.style.display = "block";
}

function progress(answered) {
  fill.style.width = `${Math.min(100, (answered / questions.length) * 100)}%`;
}

function handleNext() {
  if (next.dataset.action === "restart") return start();
  if (idx + 1 < questions.length) {
    idx++;
    show();
    progress(idx);
  } else showScore();
}

function showScore() {
  answers.innerHTML = "";
  question.textContent = `🎉 You scored ${pts} out of ${questions.length}!`;
  helper.textContent = pts === questions.length ? "Flawless victory! Play again to keep your streak." : "Tap play again to retry and boost your score.";
  count.textContent = "All questions completed";
  score.textContent = `Final ${pts}/${questions.length}`;
  progress(questions.length);
  next.textContent = "Play Again";
  next.dataset.action = "restart";
  next.style.display = "block";
}

next.onclick = handleNext;
start();
