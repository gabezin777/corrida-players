// Variáveis globais
let playerName = "";
let isNameAsked = false;
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
  { prompt: "Como se diz 'family' em português?", answer: "família" },
  { prompt: "Qual é a tradução de 'music' em português?", answer: "música" },
  { prompt: "Como se diz 'teacher' em português?", answer: "professor" }
];

const translationsMap = {
  jump: "Saltar",
  learn: "Aprender",
  run: "Correr",
  speak: "Falar",
  sleep: "Dormir",
  eat: "Comer",
  write: "Escrever",
  hear: "Ouvir",
  see: "Ver",
  do: "Fazer",
  maçã: "Apple",
  cachorro: "Dog",
  livro: "Book",
  casa: "House",
  estrela: "Star",
  carro: "Car",
  flor: "Flower",
  escola: "School",
  cidade: "City",
  água: "Water",
  comida: "Food",
  dinheiro: "Money",
  família: "Family",
  música: "Music",
  professor: "Teacher"
};

let currentQuestionIndex = 0;
let score = 0;
const userAnswers = [];

const questionDiv = document.getElementById('question');
const answerInput = document.getElementById('answer');
const submitBtn = document.get
