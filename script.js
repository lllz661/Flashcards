let questions = [];
let currentIndex = 0;

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
  cardBack.textContent = `Correct answer: ${questionData.correct_answer}`;

  cardCounter.textContent = `Карточка ${currentIndex + 1} из ${questions.length}`;
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
  flashcard.classList.toggle('flipped');
}

function resetCardFlip() {
  const flashcard = document.getElementById('flashcard');
  flashcard.classList.remove('flipped');
}

getQuestions();
