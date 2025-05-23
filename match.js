function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function loadMatch() {
  const dayIndex = parseInt(getParam("day"));
  const matchIndex = parseInt(getParam("match"));
  const match = calendar[dayIndex].matches[matchIndex];

  const container = document.getElementById("match-container");
  container.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = `${match.home} vs ${match.away}`;
  container.appendChild(title);

  const form = document.createElement("form");

  [match.home, match.away].forEach((team) => {
    const section = document.createElement("section");
    const scoreInput = document.createElement("input");
    scoreInput.type = "number";
    scoreInput.placeholder = "Score équipe";
    scoreInput.name = `score_${team}_${dayIndex}_${matchIndex}`;
    scoreInput.value = localStorage.getItem(scoreInput.name) || "";
    section.innerHTML = `<h3>${team}</h3>`;
    section.appendChild(scoreInput);

    const players = Object.entries(teams).find(([name]) => name === team)[1];
    players.forEach(player => {
      const line = document.createElement("div");
      line.style.margin = "4px 0";

      const butsInput = document.createElement("input");
      butsInput.type = "number";
      butsInput.placeholder = "Buts";
      butsInput.name = `buts_${player}_${dayIndex}_${matchIndex}`;
      butsInput.value = localStorage.getItem(butsInput.name) || "";
      butsInput.style.width = "50px";
      butsInput.style.marginRight = "10px";

      const pLabel = document.createElement("label");
      pLabel.innerText = player;
      pLabel.style.marginRight = "10px";

      const noteInput = document.createElement("input");
      noteInput.type = "number";
      noteInput.placeholder = "Note";
      noteInput.step = "0.1";
      noteInput.name = `note_${player}_${dayIndex}_${matchIndex}`;
      noteInput.value = localStorage.getItem(noteInput.name) || "";
      noteInput.style.width = "60px";

      line.appendChild(butsInput);
      line.appendChild(pLabel);
      line.appendChild(noteInput);
      section.appendChild(line);
    });

    form.appendChild(section);
    form.appendChild(document.createElement("hr"));
  });

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Valider";
  submitBtn.type = "submit";
  form.appendChild(submitBtn);

  form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    for (let [key, value] of formData.entries()) {
      localStorage.setItem(key, value);
    }
    alert("Scores enregistrés !");
  };

  container.appendChild(form);
}

loadMatch();
