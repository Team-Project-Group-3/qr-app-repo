const functions = require("firebase-functions");
const crypto = require("crypto")

const { encryptData, decryptData } = require('./test_functions/test');

const admin = require('firebase-admin');
admin.initializeApp();

exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin.firestore().collection('messages').add({ original: original });
  // Send back a message that we've successfully written the message
  res.json({ result: `Message with ID: ${writeResult.id} added.` });
});

// Encryption Function
exports.encryptTicket = functions.https.onRequest(async (req, res) => {

  const id = req.query.id;
  const collection = 'tickets';
  const ticketRef = admin.firestore().collection(collection).doc(id);
  const ticket = await ticketRef.get();

  console.log(ticket.data)
  if (!ticket.exists) {
    res.send('Ticket does not exist');
  }

  const algo = 'aes-256-cbc';
  const key = crypto.randomBytes(32);
  const inVec = crypto.randomBytes(16);

  const encData = encryptData(ticket, algo, key, inVec);
  res.json(encData);

});

exports.getTicket = functions.https.onRequest(async (req, res) => {
  const ticket_1 = await db.collection('tickets').doc('1').get()
  functions.logger.info("Hello logs!", { structuredData: true });
  ticket_1.update({ is_used: true })
  res.send(ticket_1);
});

exports.checkTicketValid = functions.https.onRequest(async (req, res) => {
  const ticket_1 = await db.collection('tickets').doc('1').get()
  functions.logger.info("Hello logs!", { structuredData: true });
  if (!ticket_1.json.is_used) {
    ticket_1.update({ is_used: true })
    res.send("Ticket updated successfully");
  }
  else {
    res.send("Invalid ticket, ticket has already been used")
  }
});