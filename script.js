const flashcards = [
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is 5 × 3?", answer: "15" },
    { question: "What is 10 ÷ 2?", answer: "5" },
    { question: "What is 9 - 4?", answer: "5" }
  ];
  
  let currentIndex = 0;
  const front = document.getElementById("card-front");
  const back = document.getElementById("card-back");
  const card = document.getElementById("flashcard");
  
  function updateCard() {
    front.textContent = flashcards[currentIndex].question;
    back.textContent = flashcards[currentIndex].answer;
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
  