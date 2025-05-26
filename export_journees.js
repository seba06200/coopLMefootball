
function exportJourneesCSV() {
  const rows = [["Journée", "Match", "Équipe", "Score", "Joueurs", "Buts", "Note"]];
  calendar.forEach((day, dayIndex) => {
    day.matches.forEach((match, matchIndex) => {
      [match.home, match.away].forEach(team => {
        const score = localStorage.getItem(`score_${team}_${dayIndex}_${matchIndex}`) || "";
        const joueurs = teams[team] || [];
        joueurs.forEach(player => {
          const buts = localStorage.getItem(`buts_${player}_${dayIndex}_${matchIndex}`) || "";
          const note = localStorage.getItem(`note_${player}_${dayIndex}_${matchIndex}`) || "";
          rows.push([
            `Journée ${day.day}`,
            `${match.home} vs ${match.away}`,
            team,
            score,
            player,
            buts,
            note
          ]);
        });
      });
    });
  });

  const csvContent = rows.map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "saisies_journees.csv";
  link.click();
}

// Bouton visible dans la page d'accueil (journées)
document.addEventListener("DOMContentLoaded", () => {
  const button = document.createElement("button");
  button.textContent = "📥 Exporter toutes les journées (CSV)";
  button.onclick = exportJourneesCSV;
  const container = document.getElementById("content") || document.body;
  container.insertBefore(button, container.firstChild);
});
