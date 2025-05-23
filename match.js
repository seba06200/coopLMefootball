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
    scoreInput.placeholder = "Score";
    scoreInput.name = `score_${team}`;
    scoreInput.value = localStorage.getItem(`score_${dayIndex}_${matchIndex}_${team}`) || "";
    section.innerHTML = `<h3>${team}</h3>`;
    section.appendChild(scoreInput);

    const players = Object.entries(teams).find(([name]) => name === team)[1];
    players.forEach(player => {
      const pLabel = document.createElement("label");
      pLabel.innerText = player;
      const noteInput = document.createElement("input");
      noteInput.type = "number";
      noteInput.min = 0;
      noteInput.max = 10;
      noteInput.step = 0.1;
      noteInput.name = `note_${player}`;
      noteInput.value = localStorage.getItem(`note_${dayIndex}_${matchIndex}_${player}`) || "";
      section.appendChild(document.createElement("br"));
      section.appendChild(pLabel);
      section.appendChild(noteInput);
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
      localStorage.setItem(`${key}_${dayIndex}_${matchIndex}`, value);
    }
    alert("Scores enregistrés !");
  };

  container.appendChild(form);
}

loadMatch();
