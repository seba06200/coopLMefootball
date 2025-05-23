import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

async function generateButeurClassement() {
  const buts = {};

  Object.values(teams).flat().forEach(joueur => {
    buts[joueur] = 0;
  });

  const querySnapshot = await getDocs(collection(db, "matches"));
  querySnapshot.forEach(docSnap => {
    const data = docSnap.data();
    Object.entries(data).forEach(([key, value]) => {
      if (key.startsWith("buts_")) {
        const joueur = key.replace("buts_", "");
        buts[joueur] += parseInt(value) || 0;
      }
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
