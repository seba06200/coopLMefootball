function getMatchScore(key) {
  return parseInt(localStorage.getItem(key)) || 0;
}

function generateClassement() {
  const scores = {};
  const bp = {};
  const bc = {};

  Object.keys(teams).forEach(team => {
    scores[team] = 0;
    bp[team] = 0;
    bc[team] = 0;
  });

  calendar.forEach((day, dayIndex) => {
    day.matches.forEach((match, matchIndex) => {
      const home = match.home;
      const away = match.away;
      const homeKey = `score_${home}_${dayIndex}_${matchIndex}`;
      const awayKey = `score_${away}_${dayIndex}_${matchIndex}`;
      const scoreHome = getMatchScore(homeKey);
      const scoreAway = getMatchScore(awayKey);

      bp[home] += scoreHome;
      bp[away] += scoreAway;
      bc[home] += scoreAway;
      bc[away] += scoreHome;

      if (scoreHome > scoreAway) {
        scores[home] += 3;
      } else if (scoreHome < scoreAway) {
        scores[away] += 3;
      } else if (scoreHome === scoreAway && (scoreHome !== 0 || scoreAway !== 0)) {
        scores[home] += 1;
        scores[away] += 1;
      }
    });
  });

  const classement = Object.keys(teams).map(team => ({
    team,
    points: scores[team],
    bp: bp[team],
    bc: bc[team]
  }));

  classement.sort((a, b) => b.points - a.points);

  const tbody = document.querySelector("#classement-table tbody");
  tbody.innerHTML = "";

  classement.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.team}</td>
      <td>${row.points}</td>
      <td>${row.bp}</td>
      <td>${row.bc}</td>
    `;
    tbody.appendChild(tr);
  });
}

generateClassement();
