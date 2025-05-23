window.onload = function () {
  const list = document.getElementById("matchdays-list");

  calendar.forEach((day, i) => {
    const dayEl = document.createElement("li");
    dayEl.innerHTML = `<strong>Journée ${day.day}</strong><ul>` + day.matches.map((m, idx) =>
      `<li><a href="match.html?day=${i}&match=${idx}">${m.home} vs ${m.away}</a></li>`).join("") + "</ul>";
    list.appendChild(dayEl);
  });
};
