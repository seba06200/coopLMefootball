import { collection, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

async function loadMatch() {
  const dayIndex = parseInt(getParam("day"));
  const matchIndex = parseInt(getParam("match"));
  const match = calendar[dayIndex].matches[matchIndex];
  const matchId = `day${dayIndex}_match${matchIndex}`;

  const container = document.getElementById("match-container");
  container.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = `${match.home} vs ${match.away}`;
  container.appendChild(title);

  const form = document.createElement("form");

  const docRef = doc(collection(db, "matches"), matchId);
  const docSnap = await getDoc(docRef);
  const matchData = docSnap.exists() ? docSnap.data() : {};

  [match.home, match.away].forEach((team) => {
    const section = document.createElement("section");
    const scoreInput = document.createElement("input");
    scoreInput.type = "number";
    scoreInput.placeholder = "Score équipe";
    scoreInput.name = `score_${team}`;
    scoreInput.value = matchData[`score_${team}`] || "";
    section.innerHTML = `<h3>${team}</h3>`;
    section.appendChild(scoreInput);

    const players = Object.entries(teams).find(([name]) => name === team)[1];
    players.forEach(player => {
      const line = document.createElement("div");
      line.style.margin = "4px 0";

      const butsInput = document.createElement("input");
      butsInput.type = "number";
      butsInput.placeholder = "Buts";
      butsInput.name = `buts_${player}`;
      butsInput.value = matchData[`buts_${player}`] || "";
      butsInput.style.width = "50px";
      butsInput.style.marginRight = "10px";

      const pLabel = document.createElement("label");
      pLabel.innerText = player;
      pLabel.style.marginRight = "10px";

      const noteInput = document.createElement("input");
      noteInput.type = "number";
      noteInput.placeholder = "Note";
      noteInput.step = "0.1";
      noteInput.name = `note_${player}`;
      noteInput.value = matchData[`note_${player}`] || "";
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

  form.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    await setDoc(docRef, data);
    alert("Scores enregistrés dans Firestore !");
  };

  container.appendChild(form);
}

loadMatch();
