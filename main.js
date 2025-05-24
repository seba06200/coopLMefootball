import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Générer le menu dynamiquement sur toutes les pages
function buildNav() {
  const nav = document.querySelector("nav");
  if (nav) {
    nav.innerHTML = \`
      <a href="index.html">Journées</a>
      <a href="classement.html">Classement</a>
      <a href="ballon.html">Ballon d'or</a>
      <a href="buteurs.html">Buteurs</a>
    \`;
  }
}

async function buildMatchdays() {
  const list = document.getElementById("matchdays-list");
  if (!list || typeof calendar === "undefined") return;

  list.style.listStyle = "none";
  list.style.textAlign = "center";
  list.style.padding = "0";

  const scoreMap = {};
  const querySnapshot = await getDocs(collection(db, "matches"));
  querySnapshot.forEach(docSnap => {
    const data = docSnap.data();
    const hasScore = Object.entries(data).some(([k, v]) =>
      k.startsWith("score_") && v !== "" && v !== null && v !== undefined
    );
    if (hasScore) scoreMap[docSnap.id] = true;
  });

  calendar.forEach((day, i) => {
    const dayEl = document.createElement("li");
    dayEl.style.marginBottom = "20px";
    dayEl.style.border = "1px solid #ccc";
    dayEl.style.borderRadius = "10px";
    dayEl.style.padding = "10px";
    dayEl.style.background = "#f9f9f9";
    dayEl.style.maxWidth = "600px";
    dayEl.style.margin = "10px auto";

    let matchList = "<strong style='font-size: 18px;'>Journée " + day.day + "</strong><ul style='padding:0'>";
    day.matches.forEach((m, idx) => {
      const matchId = `day${i}_match${idx}`;
      const check = scoreMap[matchId] ? " ✔️" : "";
      matchList += \`<li style='margin: 6px 0;'><a href="match.html?day=\${i}&match=\${idx}">\${m.home} vs \${m.away}</a>\${check}</li>\`;
    });
    matchList += "</ul>";
    dayEl.innerHTML = matchList;
    list.appendChild(dayEl);
  });
}

buildNav();
buildMatchdays();
