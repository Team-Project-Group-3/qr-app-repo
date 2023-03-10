const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//

 // Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin.firestore().collection('messages').add({original: original});
  // Send back a message that we've successfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});

// Encryption Function
exports.encryptTicket = functions.https.onRequest(async (req, res) => {

  const collection = 'tickets'

  const id = req.query.id;

  // const algo = 'aes-256-cbc';
  // const key = crypto.randomBytes(32);
  // const inVec = crypto.randomBytes(16);

  const ticketRef = admin.firestore().collection(collection).doc(id);
  const ticket = await ticketRef.get();

  if (!ticket.exists) {
    res.send('Ticket does not exist');
  }

  // const jsonData = JSON.stringify(ticket.data());

  const jsonData = {"test":ticket._fieldsProto};
  
  res.json(jsonData);

});