// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, set, get, child, update } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDXF9nNtORTSTLapak8ihSETsiuhXX2fE",
  authDomain: "first-8ab84.firebaseapp.com",
  databaseURL: "https://first-8ab84-default-rtdb.firebaseio.com",
  projectId: "first-8ab84",
  storageBucket: "first-8ab84.firebasestorage.app",
  messagingSenderId: "485126412456",
  appId: "1:485126412456:web:25b1479c27886c1a5c0a9d",
  measurementId: "G-SN2WK27JLZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Save Data and Update Ranks
document.getElementById("saveButton").addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const marks = parseInt(document.getElementById("marks").value.trim(), 10);

  if (email && !isNaN(marks)) {
    const userRef = ref(database, 'users/' + email.replace(/\./g, ','));
    set(userRef, { marks })
      .then(() => updateRanks())
      .catch((error) => console.error("Error saving data:", error));
  } else {
    alert("Please enter a valid email and marks.");
  }
});

// Update Ranks
function updateRanks() {
  const usersRef = ref(database, 'users');
  get(usersRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();
        const userList = Object.entries(users)
          .map(([key, value]) => ({
            email: key.replace(/,/g, '.'),
            marks: value.marks,
          }))
          .sort((a, b) => b.marks - a.marks);

        // Update Ranks in Database
        const updates = {};
        userList.forEach((user, index) => {
          updates[`users/${user.email.replace(/\./g, ',')}/rank`] = index + 1;
        });
        return update(ref(database), updates);
      }
    })
    .then(() => displayLeaderboard())
    .catch((error) => console.error("Error updating ranks:", error));
}

// Display Leaderboard
function displayLeaderboard() {
  const usersRef = ref(database, 'users');
  get(usersRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();
        const userList = Object.entries(users)
          .map(([key, value]) => ({
            email: key.replace(/,/g, '.'),
            marks: value.marks,
            rank: value.rank,
          }))
          .sort((a, b) => a.rank - b.rank);

        const leaderboard = document.getElementById("leaderboard");
        leaderboard.innerHTML = userList
          .map((user) => `<p>Rank ${user.rank}: ${user.email} - ${user.marks} marks</p>`)
          .join('');
      }
    })
    .catch((error) => console.error("Error retrieving leaderboard:", error));
}

// Initial Display
displayLeaderboard();
