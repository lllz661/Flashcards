const flashcards = [
  { question: "Что означает аббревиатура CPU?", answer: "Центральный процессор (Central Processing Unit)" },
  { question: "Что такое алгоритм?", answer: "Последовательность шагов для решения задачи или выполнения действия." },
  { question: "Что такое двоичная система счисления?", answer: "Система счисления с основанием 2, использующая 0 и 1." },
  { question: "Что означает HTML?", answer: "Язык разметки гипертекста (HyperText Markup Language)" },
  { question: "Какова функция оперативной памяти (RAM)?", answer: "Временное хранение данных для быстрого доступа процессора." },
  { question: "Что такое переменная в программировании?", answer: "Именованная область памяти для хранения значений данных." },
  { question: "В чём разница между аппаратным и программным обеспечением?", answer: "Аппаратное — это физические компоненты, программное — это программы и операционные системы." }
];

let currentIndex = 0;
const front = document.getElementById("card-front");
const back = document.getElementById("card-back");
const card = document.getElementById("flashcard");
const cardCounter = document.getElementById("card-counter");

function updateCard() {
  front.textContent = flashcards[currentIndex].question;
  back.textContent = flashcards[currentIndex].answer;
  cardCounter.textContent = `Карточка ${currentIndex + 1} из ${flashcards.length}`;
  card.classList.remove("flipped");
}

function flipCard() {
  card.classList.toggle("flipped");
}

function nextCard() {
  currentIndex = (currentIndex + 1) % flashcards.length;
  updateCard();
}

function prevCard() {
  currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
  updateCard();
}

updateCard();
