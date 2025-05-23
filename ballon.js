function getNote(key) {
  return parseFloat(localStorage.getItem(key)) || 0;
}

function generateBallonClassement() {
  const notes = {};

  Object.values(teams).flat().forEach(joueur => {
    notes[joueur] = 0;
  });

  calendar.forEach((day, dayIndex) => {
    day.matches.forEach((match, matchIndex) => {
      const joueurs = [...teams[match.home], ...teams[match.away]];
      joueurs.forEach(joueur => {
        const note = getNote(`note_${joueur}_${dayIndex}_${matchIndex}`);
        notes[joueur] += note;
      });
    });
  });

  const classement = Object.entries(notes)
    .map(([joueur, total]) => ({ joueur, total }))
    .sort((a, b) => b.total - a.total);

  const tbody = document.querySelector("#ballon-table tbody");
  tbody.innerHTML = "";

  classement.forEach(({ joueur, total }) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${joueur}</td><td>${total.toFixed(2)}</td>`;
    tbody.appendChild(tr);
  });
}

generateBallonClassement();
