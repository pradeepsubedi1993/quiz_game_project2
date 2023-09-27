// Shuffle function to randomize array elements
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const questions = [
  {
    question: "What is the capital of Nepal?",
    answers: shuffleArray([
      { text: "Nay Pyi Taw", correct: false },
      { text: "New Delhi", correct: false },
      { text: "Kathmandu", correct: true },
      { text: "Islamabad", correct: false },
    ]),
  },
  {
    question: "What is 1028+1028?",
    answers: shuffleArray([
      { text: "2048", correct: false },
      { text: "2036", correct: false },
      { text: "2056", correct: true },
      { text: "2052", correct: false },
    ]),
  },
  {
    question: "What is the most spoken international language in the world?",
    answers: shuffleArray([
      { text: "Chinese", correct: false },
      { text: "English", correct: true },
      { text: "Hindi", correct: false },
      { text: "French", correct: false },
    ]),
  },
  {
    question: "How many colors are there in a rainbow?",
    answers: shuffleArray([
      { text: "3", correct: false },
      { text: "5", correct: false },
      { text: "7", correct: true },
      { text: "9", correct: false },
    ]),
  },
  {
    question: "What is the largest continent in the world?",
    answers: shuffleArray([
      { text: "Asia", correct: true },
      { text: "Australia", correct: false },
      { text: "Africa", correct: false },
      { text: "South America", correct: false },
    ]),
  },
  {
    question: "Guess the flag?",
    imgSrc: "myanmar_flag.png",
    answers: shuffleArray([
      { text: "Myanmar", correct: true },
      { text: "Thailand", correct: false },
      { text: "Laos", correct: false },
      { text: "Cambodia", correct: false },
    ]),
  },
  {
    question: "What is the capital of France?",
    answers: shuffleArray([
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
    ]),
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    answers: shuffleArray([
      { text: "Oxygen", correct: false },
      { text: "Carbon dioxide", correct: true },
      { text: "Nitrogen", correct: false },
      { text: "Hydrogen", correct: false },
    ]),
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    answers: shuffleArray([
      { text: "Charles Dickens", correct: false },
      { text: "Mark Twain", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Jane Austen", correct: false },
    ]),
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: shuffleArray([
      { text: "Earth", correct: false },
      { text: "Mars", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Saturn", correct: false },
    ]),
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const playAgainButton = document.getElementById("play-again-btn"); // Added Play Again button

let currentQuestionIndex = 0;
let score = 0;

// Define a variable to keep track of the number of questions answered
let questionsAnswered = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  questionsAnswered = 0; // Reset the count when starting the quiz
  nextButton.innerText = "Next";
  showQuestion();
  playAgainButton.style.display = "none"; // Hide the Play Again button initially
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  if (currentQuestion.imgSrc) {
    const flagImg = document.getElementById("flag");
    flagImg.src = currentQuestion.imgSrc;
    flagImg.style.display = "block";
  } else {
    const flagImg = document.getElementById("flag");
    flagImg.src = "myanmar_flag.png";
    flagImg.style.display = "none";
  }

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";

  if (correct) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";

  // Increment the number of questions answered
  questionsAnswered++;

  // Update the display with the number of questions answered out of 10
  questionElement.innerText = `Question ${questionsAnswered} out of 10`;

  if (currentQuestionIndex === questions.length - 1) {
    nextButton.innerText = "Finish";
  }
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    finishQuiz();
  }
});

playAgainButton.addEventListener("click", startQuiz); // Add event listener for Play Again button

function finishQuiz() {
  questionElement.innerText = `You scored ${score} out of ${questions.length} questions.`;
  answerButtons.innerHTML = "";
  nextButton.style.display = "none";
  playAgainButton.style.display = "block"; // Show the Play Again button

  // Determine the user's score and display an appropriate response
  let response = "";
  if (score === 10) {
    response = "Well Done, You Scored 10/10!";
  } else if (score >= 5) {
    response = "Not bad, keep trying!";
  } else {
    response = "Do some more research and play again!";
  }

  // Display the response
  const responseElement = document.createElement("p");
  responseElement.innerText = response;
  responseElement.classList.add("result-message");
  questionElement.appendChild(responseElement);
}

startQuiz();
