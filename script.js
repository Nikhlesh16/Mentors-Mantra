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
  measurementId: "G-SN2WK27JLZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Simulated Test Score Calculation
function calculateScore() {
  return Math.floor(Math.random() * 100) + 1; // Random score between 1 and 100
}

// Save Marks and Update Ranks
async function saveMarksAndRank(email, marks) {
  const dbRef = ref(database, "students/");
  const studentsData = (await get(dbRef)).val() || {};

  // Save the student's marks
  studentsData[email] = { marks };

  // Sort students by marks and assign ranks
  const sortedStudents = Object.entries(studentsData)
    .sort(([, a], [, b]) => b.marks - a.marks)
    .map(([email, data], index) => {
      data.rank = index + 1; // Assign rank
      return [email, data];
    });

  // Update database with sorted ranks
  const updatedData = Object.fromEntries(sortedStudents);
  await update(dbRef, updatedData);

  return updatedData[email]; // Return current student's data
}

// Submit Test
document.getElementById("submitTest").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  if (!email) {
    alert("Please enter your email.");
    return;
  }

  const marks = calculateScore(); // Calculate test score
  const result = await saveMarksAndRank(email, marks); // Save marks and update rank

  // Display results
  document.getElementById("test-section").style.display = "none";
  document.getElementById("result-section").style.display = "block";
  document.getElementById("marks").textContent = `Marks: ${result.marks}`;
  document.getElementById("rank").textContent = `Rank: ${result.rank}`;
});
