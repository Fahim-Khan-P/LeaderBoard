import axios from 'axios';

require('./style.css');

const id = '8dVjufgq9jkhppBCKQ2F';
const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';

const generalList = document.getElementById('generalList');
const submitBtn = document.getElementById('submit');
const refreshBtn = document.getElementById('refreshBtn');
const nameInput = document.getElementById('nameInput');
const scoreInput = document.getElementById('scoreInput');

const newGame = {
  user: '',
  score: '',
};

const addGame = async (game) => {
  try {
    await axios.post(`${url}/${id}/scores`, game, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    nameInput.value = '';
    scoreInput.value = '';
  } catch (error) {
    return error;
  }
};

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const nameInputValue = nameInput.value;
  const scoreInputValue = scoreInput.value;
  newGame.user = nameInputValue;
  newGame.score = scoreInputValue;
  addGame(newGame);
});

let gameArray = [];

const getAllBooks = (arr) => {
  // console.log('h');
  if (arr.length > 0) {
    generalList.innerHTML = '';
    arr.forEach((item) => {
      const gameCard = document.createElement('li');
      gameCard.classList.add('listItem');
      gameCard.setAttribute('id', 'gameItems');
      gameCard.innerText = `Name: ${item.user} Score: ${item.score}`;
      generalList.append(gameCard);
    });
  }
};

const getBooks = async () => {
  try {
    const { data } = await axios.get(`${url}/${id}/scores`);
    gameArray = data.result;
    getAllBooks(gameArray);
  } catch (error) {
    return error;
  }
};

refreshBtn.addEventListener('click', getBooks);

getBooks();