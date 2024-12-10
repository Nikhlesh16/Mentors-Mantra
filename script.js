// Firebase Configuration
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    databaseURL: "your-database-url",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Save Data to Firebase
document.getElementById("saveButton").addEventListener("click", () => {
    const userId = document.getElementById("userId").value;
    const name = document.getElementById("name").value;

    firebase.database().ref('users/' + userId).set({
        name: name
    }).then(() => {
        alert("Data saved successfully!");
    }).catch(error => {
        console.error("Error saving data:", error);
    });
});

// Retrieve Data from Firebase
document.getElementById("retrieveButton").addEventListener("click", () => {
    const userId = document.getElementById("retrieveId").value;

    firebase.database().ref('users/' + userId).once('value').then(snapshot => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            document.getElementById("output").textContent = `Name: ${data.name}`;
        } else {
            document.getElementById("output").textContent = "No data found.";
        }
    }).catch(error => {
        console.error("Error retrieving data:", error);
    });
});
