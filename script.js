// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

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

// Save Data to Firebase
document.getElementById("saveButton").addEventListener("click", () => {
  const userId = document.getElementById("userId").value.trim();
  const name = document.getElementById("name").value.trim();

  if (userId && name) {
    set(ref(database, 'users/' + userId), {
      name: name,
    })
      .then(() => {
        alert("Data saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  } else {
    alert("Please enter both User ID and Name.");
  }
});

// Retrieve Data from Firebase
document.getElementById("retrieveButton").addEventListener("click", () => {
  const userId = document.getElementById("retrieveId").value.trim();

  if (userId) {
    const dbRef = ref(database);
    get(child(dbRef, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          document.getElementById("output").textContent = `Name: ${data.name}`;
        } else {
          document.getElementById("output").textContent = "No data found.";
        }
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
  } else {
    alert("Please enter a User ID.");
  }
});
