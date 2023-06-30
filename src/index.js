import './index.css';
import { addScore, refreshScore } from './modules/viewFunction.js';

const btnRefresh = document.getElementById('btn_refresh');
const btnSubmit = document.getElementById('btn_submit');

btnRefresh.addEventListener('click', () => {
  refreshScore();
});

btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  addScore();
});

window.onload = () => {
  refreshScore();
};
