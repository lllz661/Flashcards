let questions = [];
let answersLog = []; 
let currentIndex = 0;
let correctCount = 0;

async function getQuestions() {
  const url = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple&encode=url3986';

  try {
    const response = await fetch(url);
    const data = await response.json();

    questions = data.results.map(q => ({
      question: decodeURIComponent(q.question),
      correct_answer: decodeURIComponent(q.correct_answer),
      incorrect_answers: q.incorrect_answers.map(ans => decodeURIComponent(ans))
    }));

    showQuestion();

  } catch (error) {
    console.error('Ошибка при загрузке вопросов:', error);
  }
}

function showQuestion() {
  if (questions.length === 0) return;

  const questionData = questions[currentIndex];
  
  const cardFront = document.getElementById('card-front');
  const cardBack = document.getElementById('card-back');
  const cardCounter = document.getElementById('card-counter');

  cardFront.textContent = questionData.question;
  cardBack.textContent = `Правильный ответ: ${questionData.correct_answer}`;

  cardCounter.textContent = `Карточка ${currentIndex + 1} из ${questions.length}`;
  
  updateStats();
}

function nextCard() {
  if (questions.length === 0) return;

  currentIndex = (currentIndex + 1) % questions.length;
  resetCardFlip();
  showQuestion();
}

function prevCard() {
  if (questions.length === 0) return;

  currentIndex = (currentIndex - 1 + questions.length) % questions.length;
  resetCardFlip();
  showQuestion();
}

function flipCard() {
  const flashcard = document.getElementById('flashcard');
  const wasFlipped = flashcard.classList.contains('flipped');
  
  flashcard.classList.toggle('flipped');

  if (!wasFlipped) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

function resetCardFlip() {
  const flashcard = document.getElementById('flashcard');
  flashcard.classList.remove('flipped');
}

function toggleStats() {
  const statsPanel = document.getElementById('stats-panel');
  const overlay = document.getElementById('overlay');

  statsPanel.classList.toggle('open');
  overlay.classList.toggle('active');
}
function checkAnswer() {
  const userAnswer = document.getElementById('answer-input').value.trim().toLowerCase();
  const correctAnswer = questions[currentIndex].correct_answer.trim().toLowerCase();
  const currentQuestion = questions[currentIndex].question;

  if (userAnswer === correctAnswer) {
    correctCount++;
    answersLog.push({
      question: currentQuestion,
      status: 'correct',
      correctAnswer: questions[currentIndex].correct_answer
    });
    alert(`✅ Верно! Ответ: ${questions[currentIndex].correct_answer}`);
  } else {
    answersLog.push({
      question: currentQuestion,
      status: 'incorrect',
      correctAnswer: questions[currentIndex].correct_answer
    });
    alert(`❌ Неверно! Правильный ответ: ${questions[currentIndex].correct_answer}`);
  }

  document.getElementById('answer-input').value = '';
  updateStats();
}
function updateStats() {
  document.getElementById('total-cards').textContent = `Карточек просмотрено: ${currentIndex + 1}`;
  document.getElementById('correct-answers').textContent = `Правильных ответов: ${correctCount}`;

  const answersLogDiv = document.getElementById('answers-log');
  answersLogDiv.innerHTML = '';

  answersLog.forEach(entry => {
    const p = document.createElement('p');
    if (entry.status === 'correct') {
      p.classList.add('correct');
      p.textContent = `✅ ${entry.question}(Ответ: ${entry.correctAnswer})`;
      answersLogDiv.appendChild(p);
    } else {
      p.classList.add('incorrect');
      p.textContent = `❌ ${entry.question} (Правильный ответ: ${entry.correctAnswer})`;
    }
    answersLogDiv.appendChild(p);
  });
}

document.addEventListener('keydown', function(event) {
  if (event.code === '') {
    event.preventDefault();
    flipCard();
  }
});

getQuestions();
