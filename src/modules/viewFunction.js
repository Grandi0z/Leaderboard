import { getScore, postScore } from './leaderboardApi.js';
import Score from './score.js';

const table = document.querySelector('.table_recent_score');
const inputName = document.getElementById('input_name');
const inputScore = document.getElementById('input_score');
const message = document.getElementById('message');

const displayMessage = (msg) => {
  message.classList.remove('hidden');
  message.innerText = msg.result;
  setTimeout(() => {
    message.classList.add('hidden');
  }, 2000);
};
const renderScore = (scores) => {
  table.innerHTML = '';
  scores.forEach((score) => {
    const tr = table.insertRow();
    const td = tr.insertCell(0);
    const tdContent = `${score.user} : ${score.score}`;
    td.innerHTML = tdContent;
  });
};
const addScore = async () => {
  const score = new Score(inputName.value, inputScore.value);
  inputName.value = '';
  inputScore.value = '';
  const response = await postScore(score);
  displayMessage(response);
};

const refreshScore = async () => {
  const score = await getScore();
  renderScore(score.result);
};

export { addScore, refreshScore };