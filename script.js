// Perguntas do quiz
const questions = [
  { prompt: "Qual é a tradução de 'apple' em português?", answer: "maçã" },
  { prompt: "Como se diz 'dog' em português?", answer: "cachorro" },
  { prompt: "Qual é a tradução de 'book' em português?", answer: "livro" },
  { prompt: "Como se diz 'house' em português?", answer: "casa" },
  { prompt: "Qual é a tradução de 'star' em português?", answer: "estrela" },
  { prompt: "Qual é a tradução de 'car' em português?", answer: "carro" },
  { prompt: "Como se diz 'flower' em português?", answer: "flor" },
  { prompt: "Qual é a tradução de 'school' em português?", answer: "escola" },
  { prompt: "Como se diz 'city' em português?", answer: "cidade" },
  { prompt: "Qual é a tradução de 'water' em português?", answer: "água" },
  { prompt: "Como se diz 'food' em português?", answer: "comida" },
  { prompt: "Qual é a tradução de 'money' em português?", answer: "dinheiro" },
  { prompt: "Como se diz 'music' em português?", answer: "música" },
  { prompt: "Como se diz 'teacher' em português?", answer: "professor" }
];

// Variáveis globais
let playerName = "";
let currentQuestionIndex = 0;
let score = 0;
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

// Função para iniciar o quiz
function startQuiz() {
  playerName = document.getElementById('player-name').value;
  if (!playerName) {
    alert('Por favor, digite seu nome!');
    return;
  }
  document.getElementById('name-entry').style.display = 'none';
  document.getElementById('quiz').style.display = 'block';
  loadQuestion();
}

// Função para carregar a próxima pergunta
function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  document.getElementById('question').innerText = currentQuestion.prompt;
  document.getElementById('answer').value = '';
  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('submit-btn').style.display = 'inline-block';
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

// Função para ir para a próxima pergunta
function nextQuestion() {
  loadQuestion();
}

// Função para finalizar o jogo
function endGame() {
  document.getElementById('quiz').style.display = 'none';
  document.getElementById('results').style.display = 'block';
  document.getElementById('final-score').innerText = score;

  // Atualiza a tabela de classificação
  leaderboard.push({ name: playerName, score: score });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

  const
