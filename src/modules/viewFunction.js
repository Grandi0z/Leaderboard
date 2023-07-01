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

// this method will be use in a future feature
const deleteScore = async (id) => {
  const scores = await getScore();
  // I want to use a const array but I cant because I'll neeed to change it value
  const newScores = { value: [] };
  newScores.value = scores.result.filter((score) => !score.user.includes(id));
};

const renderScore = (scores) => {
  table.innerHTML = '';
  scores.forEach((score) => {
    const btnDelete = document.createElement('button');
    const tr = table.insertRow();
    const td = tr.insertCell(0);
    const td1 = tr.insertCell(1);
    const [UserName, userId] = score.user.split('_');
    btnDelete.innerHTML = `<i class="bi bi-trash3-fill trash" id=${userId}></i>`;
    const tdContent = { value: '' };
    if (score.score > 10) {
      tdContent.value = `<i class="bi bi-person-circle"></i> ${UserName} : ${score.score}  <i class="bi bi-arrow-up-right-circle-fill"></i>`;
    } else if (score.score < 10) {
      tdContent.value = `<i class="bi bi-person-circle"></i> ${UserName} : ${score.score}  <i class="bi bi-arrow-down-right-circle-fill"></i>`;
    } else {
      tdContent.value = `<i class="bi bi-person-circle"></i> ${UserName} : ${score.score}  <i class="bi bi-arrow-right-circle-fill"></i>`;
    }

    td.innerHTML = tdContent.value;
    td1.appendChild(btnDelete);
    btnDelete.addEventListener('click', (e) => {
      deleteScore(e.target.id);
      if (e.target.id) {
        e.target
          .parentElement
          .parentElement.parentElement.parentElement
          .removeChild(e.target.parentElement.parentElement.parentElement);
      } else {
        e.target
          .parentElement
          .parentElement.parentElement
          .removeChild(e.target.parentElement.parentElement);
      }
    });
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
  const scores = await getScore();
  renderScore(scores.result);
};

export { addScore, refreshScore };