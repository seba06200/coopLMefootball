import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

async function generateBallonClassement() {
  const notes = {};

  Object.values(teams).flat().forEach(joueur => {
    notes[joueur] = 0;
  });

  const querySnapshot = await getDocs(collection(db, "matches"));
  querySnapshot.forEach(docSnap => {
    const data = docSnap.data();
    Object.entries(data).forEach(([key, value]) => {
      if (key.startsWith("note_")) {
        const joueur = key.replace("note_", "");
        notes[joueur] += parseFloat(value) || 0;
      }
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
