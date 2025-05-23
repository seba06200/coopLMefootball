window.onload = function () {
  const list = document.getElementById("matchdays-list");

  calendar.forEach((day, i) => {
    const dayEl = document.createElement("li");
    let matchList = "<strong>Journée " + day.day + "</strong><ul>";

    day.matches.forEach((m, idx) => {
      const keyHome = `score_${m.home}_${i}_${idx}`;
      const keyAway = `score_${m.away}_${i}_${idx}`;
      const hasScore = localStorage.getItem(keyHome) || localStorage.getItem(keyAway);
      const check = hasScore ? " ✔️" : "";
      matchList += `<li><a href="match.html?day=${i}&match=${idx}">${m.home} vs ${m.away}</a>${check}</li>`;
    });

    matchList += "</ul>";
    dayEl.innerHTML = matchList;
    list.appendChild(dayEl);
  });
};
