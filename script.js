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

// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM carregado! Inicializando quiz...'); // Debug

  // Verificar se elementos essenciais existem
  const startBtn = document.getElementById('start-btn');
  const playerNameInput = document.getElementById('player-name');
  const quiz = document.getElementById('quiz');
  const questionEl = document.getElementById('question');
  const answerInput = document.getElementById('answer');
  const submitBtn = document.getElementById('submit-btn');
  const nextBtn = document.getElementById('next-btn');
  const resetBtn = document.getElementById('reset-btn');
  const results = document.getElementById('results');
  const finalScoreEl = document.getElementById('final-score');

  if (!startBtn || !playerNameInput || !quiz || !questionEl || !answerInput || !submitBtn || !nextBtn || !resetBtn || !results || !finalScoreEl) {
    console.error('ERRO: Alguns elementos HTML essenciais não foram encontrados! Verifique os IDs.');
    alert('Erro no HTML: Verifique se todos os IDs estão corretos (ex: start-btn, player-name, etc.).');
    return;
  }

  console.log('Elementos encontrados! Adicionando listeners...'); // Debug

  // Listener para botão Iniciar Quiz
  startBtn.addEventListener('click', startQuiz);

  // Listeners para outros botões
  submitBtn.addEventListener('click', submitAnswer);
  nextBtn.addEventListener('click', nextQuestion);
  resetBtn.addEventListener('click', resetQuiz);

  // Suporte a Enter no input de nome
  playerNameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') startQuiz();
  });

  // Suporte a Enter no input de resposta
  answerInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') submitAnswer();
  });

  // Auto-focus no input de nome
  playerNameInput.focus();

  console.log('Listeners adicionados com sucesso!'); // Debug
});

// Função para atualizar progresso (se existir)
function updateProgress() {
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    const progress = ((currentQuestionIndex / questions.length) * 100);
    progressBar.style.width = progress + '%';
    progressBar.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
  }
}

// Função para adicionar score com animação (se existir)
function addScore(points) {
  const scoreElement = document.getElementById('current-score');
  if (scoreElement) {
    scoreElement.style.color = '#10b981';
    scoreElement.textContent = `Pontos: ${score} (+${points})`;
    scoreElement.classList.add('score-animate');
    setTimeout(() => scoreElement.classList.remove('score-animate'), 500);
  }
}

// Função para mostrar feedback (se existir)
function showFeedback(isCorrect) {
  const feedback = document.getElementById('feedback');
  const answerInput = document.getElementById('answer');
  if (feedback && answerInput) {
    feedback.innerHTML = isCorrect ? 'Correto! 🎉' : 'Errado! Tente novamente.';
    if (!isCorrect) {
      feedback.innerHTML += `<br><small>Resposta correta: ${questions[currentQuestionIndex - 1].answer}</small>`;
    }
    feedback.className = isCorrect ? 'feedback correct' : 'feedback incorrect';
    feedback.style.display = 'block';

    // Animação no input
    const originalBorder = '#3b82f6';
    const originalBg = 'rgba(255, 255, 255, 0.85)';
    if (isCorrect) {
      answerInput.style.borderColor = '#10b981';
      answerInput.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
    } else {
      answerInput.style.borderColor = '#ef4444';
      answerInput.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
    }

    setTimeout(() => {
      feedback.style.opacity = '0';
      setTimeout(() => {
        feedback.style.display = 'none';
        feedback.style.opacity = '1';
        answerInput.style.borderColor = originalBorder;
        answerInput.style.backgroundColor = originalBg;
      }, 300);
    }, 2000);
  }
}

// Função para carregar leaderboard
function loadLeaderboard() {
  const leaderboardList = document.getElementById('leaderboard-list');
  if (!leaderboardList) return;

  const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
  const sortedScores = scores.sort((a, b) => b.score - a.score).slice(0, 10);
  leaderboardList.innerHTML = '';

  if (sortedScores.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Nenhum score ainda. Seja o primeiro!';
    leaderboardList.appendChild(li);
    return;
  }

  sortedScores.forEach((entry, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="rank">${index + 1}.</span> ${entry.name}: ${entry.score} pontos (${entry.date})`;
    leaderboardList.appendChild(li);
  });
}

// Função para salvar score
function saveScore() {
  const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
  scores.push({ name: playerName, score: score, date: new Date().toLocaleDateString('pt-BR') });
  localStorage.setItem('quizScores', JSON.stringify(scores));
  loadLeaderboard();
}

// Função para iniciar o quiz
function startQuiz() {
  console.log('Botão start-btn clicado!'); // Debug

  const playerNameInput = document.getElementById('player-name');
  playerName = playerNameInput.value.trim();
  if (!playerName) {
    playerNameInput.style.borderColor = '#ef4444';
    playerNameInput.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
    setTimeout(() => {
      playerNameInput.style.borderColor = '';
      playerNameInput.style.boxShadow = '';
    }, 1000);
    alert('Por favor, digite seu nome!');
    return;
  }

  console.log(`Iniciando quiz para: ${playerName}`); // Debug

  const nameEntry = document.getElementById('name-entry');
  const quiz = document.getElementById('quiz');

  // Transição suave
  if (nameEntry && quiz) {
    nameEntry.style.opacity = '0';
    nameEntry.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      nameEntry.style.display = 'none';
      quiz.style.display = 'block';
      quiz.style.opacity = '0';
      quiz.style.transform = 'translateY(20px)';
      setTimeout(() => {
        quiz.style.transition = 'all 0.5s ease';
        quiz.style.opacity = '1';
        quiz.style.transform = 'translateY(0)';
      }, 100);
    }, 300);
  }

  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
  updateProgress();
}

// Função para carregar pergunta
function loadQuestion() {
  const questionEl = document.getElementById('question');
  const answerInput = document.getElementById('answer');
  const submitBtn = document.getElementById('submit-btn');
  const nextBtn = document.getElementById('next-btn');
  const feedback = document.getElementById('feedback');

  if (currentQuestionIndex < questions.length) {
    questionEl.innerText = questions[currentQuestionIndex].prompt;

    // Animação
    questionEl.style.opacity = '0';
    questionEl.style.transform = 'translateX(-20px)';
    setTimeout(() => {
      questionEl.style.transition = 'all 0.4s ease';
      questionEl.style.opacity = '1';
      questionEl.style.transform = 'translateX(0)';
    }, 100);

    if (answerInput) {
      answerInput.value = '';
      answerInput.focus();
    }
    if (submitBtn) submitBtn.style.display = 'inline-block';
    if (nextBtn) nextBtn.style.display = 'none';
    if (feedback) feedback.style