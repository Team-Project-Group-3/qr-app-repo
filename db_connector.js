var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Get a reference to the "tickets" collection
const ticketsRef = admin.firestore().collection('tickets');

// Query the "tickets" collection
ticketsRef.get()
  .then((querySnapshot) => {
    // Iterate through each document and log the data
    querySnapshot.forEach((doc) => {
      console.log(doc.id);
    });
  })
  .catch((error) => {
    console.log('Error getting documents: ', error);
  });



