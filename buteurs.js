function getButs(key) {
  return parseInt(localStorage.getItem(key)) || 0;
}

function generateButeurClassement() {
  const buts = {};

  Object.values(teams).flat().forEach(joueur => {
    buts[joueur] = 0;
  });

  calendar.forEach((day, dayIndex) => {
    day.matches.forEach((match, matchIndex) => {
      const joueurs = [...teams[match.home], ...teams[match.away]];
      joueurs.forEach(joueur => {
        const b = getButs(`buts_${joueur}_${dayIndex}_${matchIndex}`);
        buts[joueur] += b;
      });
    });
  });

  const classement = Object.entries(buts)
    .map(([joueur, total]) => ({ joueur, total }))
    .sort((a, b) => b.total - a.total);

  const tbody = document.querySelector("#buteurs-table tbody");
  tbody.innerHTML = "";

  classement.forEach(({ joueur, total }) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${joueur}</td><td>${total}</td>`;
    tbody.appendChild(tr);
  });
}

generateButeurClassement();
