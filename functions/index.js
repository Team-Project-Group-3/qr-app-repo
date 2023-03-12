const functions = require('firebase-functions');
const crypto = require('crypto');

const { encryptData, decryptData } = require('./test_functions/test');

const admin = require('firebase-admin');
admin.initializeApp();

// Encryption Function
exports.encryptTicket = functions.https.onRequest(async (req, res) => {

  const id = req.query.id;
  const collection = 'tickets';
  const ticketRef = admin.firestore().collection(collection).doc(id);
  const ticket = await ticketRef.get();
  
  if (!ticket.exists) {
    res.send('Ticket does not exist');
  }

  const algo = 'aes-256-cbc';
  const key = crypto.randomBytes(32);
  const inVec = crypto.randomBytes(16);

  const encData = encryptData(JSON.stringify(ticket), algo, key, inVec);
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