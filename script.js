// Perguntas do quiz (9 perguntas)
const questions = [
  { prompt: "Qual é a tradução de 'apple' em português?", answer: "maçã" },
  { prompt: "Como se diz 'dog' em português?", answer: "cachorro" },
  { prompt: "Qual é a tradução de 'book' em português?", answer: "livro" },
  { prompt: "Como se diz 'house' em português?", answer: "casa" },
  { prompt: "Qual é a tradução de 'star' em português?", answer: "estrela" },
  { prompt: "Qual é a tradução de 'car' em português?", answer: "carro" },
  { prompt: "Como se diz 'flower' em português?", answer: "flor" },
  { prompt: "Qual é a tradução de 'school' em português?", answer: "escola" },
  { prompt: "Como se diz 'city' em português?", answer: "cidade" }
];

// Variáveis globais
let playerName = "";
let currentQuestionIndex = 0;
let score = 0;

// Função para iniciar o quiz
function startQuiz() {
  playerName = document.getElementById('player-name').value;
  if (!playerName) {
    alert('Por favor, digite seu nome!');
    return;
  }

  // Esconde a tela de entrada do nome
  document.getElementById('name-entry').style.display = 'none';

  // Exibe o quiz
  document.getElementById('quiz').style.display = 'block';
  loadQuestion();
}

// Função para carregar a próxima pergunta
function loadQuestion() {
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').innerText = currentQuestion.prompt;
    document.getElementById('answer').value = '';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'inline-block';
  } else {
    endGame();
  }
}

// Função para verificar a resposta
function submitAnswer() {
  const playerAnswer = document.getElementById('answer').value.trim().toLowerCase();
  const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();

  if (playerAnswer === correctAnswer) {
    score += 30;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    document.getElementById('next-btn').style.display = 'inline-block';
    document.getElementById('submit-btn').style.display = 'none';
  } else {
    endGame();
  }
}

// Função para passar para a próxima pergunta
function nextQuestion() {
  loadQuestion();
}

// Função para finalizar o jogo
function endGame() {
  document.getElementById('quiz').style.display = 'none';
  document.getElementById('results').style.display = 'block';
  document.getElementById('final-score').innerText = score;
}

// Função para resetar o quiz
function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById('results').style.display = 'none';
  document.getElementById('name-entry').style.display = 'block';
  document.getElementById('player-name').value = '';
}

// Lidar com o evento de clique no botão "Iniciar Quiz" (wrap para garantir DOM pronto)
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('start-btn').addEventListener('click', startQuiz);
});