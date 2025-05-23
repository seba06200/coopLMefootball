import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

async function generateClassement() {
  const scores = {};
  const bp = {};
  const bc = {};

  Object.keys(teams).forEach(team => {
    scores[team] = 0;
    bp[team] = 0;
    bc[team] = 0;
  });

  const querySnapshot = await getDocs(collection(db, "matches"));
  querySnapshot.forEach(docSnap => {
    const data = docSnap.data();
    const matchTeams = Object.keys(data).filter(key => key.startsWith("score_")).map(k => k.split("_")[1]);

    if (matchTeams.length === 2) {
      const [home, away] = matchTeams;
      const scoreHome = parseInt(data[`score_${home}`]) || 0;
      const scoreAway = parseInt(data[`score_${away}`]) || 0;

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
    }
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
