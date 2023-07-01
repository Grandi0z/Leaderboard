class Score {
  constructor(user, score) {
    this.score = score;
    this.id = `_score-${Math.floor(Math.random() * 100000)}`;
    this.user = user + this.id;
  }
}

export default Score;