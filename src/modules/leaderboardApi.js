const getScore = async () => {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/VKFmptNDR2Z5hu9WP9yf/scores/')
    .catch((error) => new Error(error));
  const scores = await response.json();
  return scores;
};

const postScore = async (score) => {
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/VKFmptNDR2Z5hu9WP9yf/scores/', {
    method: 'POST',
    body: JSON.stringify(score),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .catch((error) => new Error(error));
  const msg = await response.json();
  return msg;
};

export { getScore, postScore };