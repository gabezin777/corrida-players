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
let playerAnswers = []; // Para rastrear respostas para feedback visual

// Função para atualizar a barra de progresso (se o elemento existir)
function updateProgress() {
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    const progress = ((currentQuestionIndex / questions.length) * 100);
    progressBar.style.width = progress + '%';
    progressBar.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
  }
}

// Função para adicionar pontuação com animação (se elementos existirem)
function addScore(points) {
  const scoreElement = document.getElementById('current-score');
  if (scoreElement) {
    scoreElement.style.color = '#10b981'; // Verde para pontuação positiva
    scoreElement.textContent = `Pontos: ${score} (+${points})`;
    scoreElement.classList.add('score-animate');
    setTimeout(() => scoreElement.classList.remove('score-animate'), 500);
  }
}

// Função para mostrar feedback da resposta (se elemento existir)
function showFeedback(isCorrect) {
  const feedback = document.getElementById('feedback');
  const answerInput = document.getElementById('answer');
  
  if (feedback && answerInput) {
    feedback.textContent = isCorrect ? 'Correto! 🎉' : 'Errado! Tente novamente.';
    feedback.className = isCorrect ? 'feedback correct' : 'feedback incorrect';
    feedback.style.display = 'block';
    
    // Animação no input
    if (isCorrect) {
      answerInput.style.borderColor = '#10b981';
      answerInput.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
    } else {
      answerInput.style.borderColor = '#ef4444';
      answerInput.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
    }
    
    // Fade out feedback após 2 segundos
    setTimeout(() => {
      feedback.style.opacity = '0';
      setTimeout(() => {
        feedback.style.display = 'none';
        feedback.style.opacity = '1';
        // Reset input styles
        answerInput.style.borderColor = '#3b82f6';
        answerInput.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
      }, 300);
    }, 2000);
  }
}

// Função para carregar leaderboard do localStorage (se elemento existir)
function loadLeaderboard() {
  const leaderboardList = document.getElementById('leaderboard-list');
  if (!leaderboardList) return;
  
  const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
  const sortedScores = scores.sort((a, b) => b.score - a.score).slice(0, 10);
  leaderboardList.innerHTML = ''; // Limpar lista anterior
  
  sortedScores.forEach((entry, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="rank">${index + 1}.</span> ${entry.name}: ${entry.score} pontos`;
    leaderboardList.appendChild(li);
  });
  
  // Mostrar leaderboard se houver scores
  const leaderboardSection = document.getElementById('leaderboard');
  if (leaderboardSection && sortedScores.length > 0) {
    leaderboardSection.style.display = 'block';
  }
}

// Função para salvar score no leaderboard
function saveScore() {
  const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
  scores.push({ name: playerName, score: score, date: new Date().toLocaleDateString() });
  localStorage.setItem('quizScores', JSON.stringify(scores));
  loadLeaderboard(); // Recarregar leaderboard
}

// Função para iniciar o quiz com animações
function startQuiz() {
  playerName = document.getElementById('player-name').value.trim();
  if (!playerName) {
    // Animação de erro no input de nome (se elemento existir)
    const nameInput = document.getElementById('player-name');
    if (nameInput) {
      nameInput.style.borderColor = '#ef4444';
      nameInput.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
      setTimeout(() => {
        nameInput.style.borderColor = '#3b82f6';
        nameInput.style.boxShadow = 'none';
      }, 1000);
    }
    alert('Por favor, digite seu nome!');
    return;
  }

  // Animação de transição suave (se elementos existirem)
  const nameEntry = document.getElementById('name-entry');
  const quiz = document.getElementById('quiz');
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
  } else {
    // Fallback sem animação
    if (nameEntry) nameEntry.style.display = 'none';
    if (quiz) quiz.style.display = 'block';
  }

  currentQuestionIndex = 0;
  score = 0;
  playerAnswers = [];
  loadQuestion();
  updateProgress();
}

// Função para carregar a próxima pergunta com animação
function loadQuestion() {
  const questionEl = document.getElementById('question');
  const answerInput = document.getElementById('answer');
  
  if (!questionEl) {
    console.error('Elemento #question não encontrado!');
    return;
  }
  
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.innerText = currentQuestion.prompt;
    
    // Animação de fade in para a pergunta (se suportado)
    if (questionEl.style) {
      questionEl.style.opacity = '0';
      questionEl.style.transform = 'translateX(-20px)';
      setTimeout(() => {
        questionEl.style.transition = 'all 0.4s ease';
        questionEl.style.opacity = '1';
        questionEl.style.transform = 'translateX(0)';
      }, 100);
    }
    
    if (answerInput) {
      answerInput.value = '';
      answerInput.focus(); // Auto-focus no input
    }
    
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const feedback = document.getElementById('feedback');
    
    if (nextBtn) nextBtn.style.display = 'none';
    if (submitBtn) submitBtn.style.display = 'inline-block';
    if (feedback) feedback.style.display = 'none';
    
    updateProgress();
    console.log(`Carregada pergunta ${currentQuestionIndex + 1}: ${currentQuestion.prompt}`); // Debug opcional
  } else {
    endGame();
  }
}

// Função para verificar a resposta com feedback interativo
function submitAnswer() {
  const answerInput = document.getElementById('answer');
  if (!answerInput) {
    console.error('Elemento #answer não encontrado!');
    return;
  }
  
  const playerAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();
  const isCorrect = playerAnswer === correctAnswer;

  playerAnswers.push({ correct: isCorrect, answer: playerAnswer });

  if (isCorrect) {
    score += 30;
    addScore(30);
  } else {
    addScore(0);
    // Mostrar resposta correta brevemente (se feedback existir)
    const feedback = document.getElementById('feedback');
    if (feedback && !isCorrect) {
      setTimeout(() => {
        feedback.innerHTML += `<br><small>Resposta correta: ${questions[currentQuestionIndex].answer}</small>`;
      }, 500);
    }
  }

  showFeedback(isCorrect);

  currentQuestionIndex++;

  const nextBtn = document.getElementById('next-btn');
  const submitBtn = document.getElementById('submit-btn');
  
  if (currentQuestionIndex < questions.length) {
    // Delay antes de mostrar next button para ver feedback
    setTimeout(() => {
      if (nextBtn) nextBtn.style.display = 'inline-block';
      if (submitBtn) submitBtn.style.display = 'none';
    }, 2200);
  } else {
    setTimeout(endGame, 2200);
  }
  
  console.log(`Resposta submetida. Índice atual: ${currentQuestionIndex}`); // Debug opcional
}

// Função para passar para a próxima pergunta com transição
function nextQuestion() {
  const quiz = document.getElementById('quiz');
  if (quiz && quiz.style) {
    quiz.style.opacity = '0';
    quiz.style.transform = 'translateY(10px)';
    setTimeout(() => {
      loadQuestion();
      quiz.style.opacity = '1';
      quiz.style.transform = 'translateY(0)';
    }, 300);
  } else {
    loadQuestion(); // Fallback sem animação
  }
}

// Função para finalizar o jogo com efeitos visuais
function endGame() {
  saveScore(); // Salvar no leaderboard
  
  const quiz = document.getElementById('quiz');
  const results = document.getElementById('results');
  const finalScoreEl = document.getElementById('final-score');
  
  if (finalScoreEl) {
    finalScoreEl.innerText = score;
  }
  
  if (quiz && results) {
    quiz.style.opacity = '0';
    quiz.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
      quiz.style.display = 'none';
      results.style.display = 'block';
      
      // Animação de entrada para results
      results.style.opacity = '0';
      results.style.transform = 'translateX(30px)';
      setTimeout(() => {
        results.style.transition = 'all 0.6s ease';
        results.style.opacity = '1';
        results.style.transform = 'translateX(0)';
      }, 100);
    }, 300);
  } else {
    // Fallback sem animação
    if (quiz) quiz.style.display = 'none';
    if (results) results.style.display = 'block';
  }
  
  // Efeito confetti simples se score alto (acima de 240/270)
  if (score >= 240) {
    triggerConfetti();
  }
  
  // Carregar leaderboard
  loadLeaderboard();
  
  // Mostrar mensagem personalizada (se elemento existir)
  const messageEl = document.getElementById('score-message');
  if (messageEl) {
    let message = '';
    if (score === 270) {
      message = 'Perfeito! Você é um gênio! 🌟';
    } else if (score >= 180) {
      message = 'Ótimo trabalho! Continue assim! 👍';
    } else if (score >= 90) {
      message = 'Bom esforço! Pratique mais! 📚';
    } else {
      message = 'Não desanime! Tente novamente! 💪';
    }
    messageEl.innerText = message;
  }
}

// Função simples de confetti (usando CSS particles)
function triggerConfetti() {
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: fixed;
      left: ${Math.random() * 100}vw;
      top: -10px;
      width: 10px;
      height: 10px;
      background-color: hsl(${Math.random() * 360}, 100%, 50%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 1000;
      animation: confetti-fall 3s linear forwards;
    `;
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 3000);
  }
}

// Adicionar keyframes para confetti no CSS (uma vez só)
if (!document.getElementById('confetti-style')) {
  const style = document.createElement('style');
  style.id = 'confetti-style';
  style.textContent = `
    @keyframes confetti-fall {
      to {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Função para resetar o quiz com animação
function resetQuiz() {
  const results = document.getElementById('results');
  const nameEntry = document.getElementById('name-entry');
  const progressBar = document.getElementById('progress-bar');
  
  if (results && nameEntry) {
    results.style.opacity = '0';
    results.style.transform = 'translateX(30px)';
    setTimeout(() => {
      results.style.display = 'none';
      nameEntry.style.display = 'block';
      nameEntry.style.opacity = '0';
      nameEntry.style.transform = 'translateY(20px)';
      setTimeout(() => {
        nameEntry.style.opacity = '1';
        nameEntry.style.transform = 'translateY(0)';
      }, 100);
    }, 300);
  } else {
    // Fallback
    if (results) results.style.display = 'none';
    if (nameEntry) nameEntry.style.display = 'block';
  }
  
  if (document