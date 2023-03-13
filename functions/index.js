const functions = require('firebase-functions');
const crypto = require('crypto');

const { encryptData, decryptData, hashGen } = require('./test_functions/test');

const admin = require('firebase-admin');
admin.initializeApp();
const algo = 'aes-256-cbc';

// Encryption Function
exports.encryptTicket = functions.https.onRequest(async (req, res) => {

  const id = req.query.id;
  const collection = 'tickets';
  const ticketRef = admin.firestore().collection(collection).doc(id);
  const ticket = await ticketRef.get();
  
  if (!ticket.exists) {
    res.send({"ticketExists":"false"});
  }
  const key = crypto.randomBytes(32);
  const inVec = crypto.randomBytes(16);

  const payload = {
    "ticketSecret":ticket._fieldsProto.ticketSecret.stringValue,
    "timestamp": Date.now()
  }
  const encData = encryptData(JSON.stringify(payload), algo, key, inVec);

  const qrPayload =  {
    "encryptedData": encData,
    "ticketId": id
  }

  const ticketMeta = {
    "Cost": ticket._fieldsProto.Cost,
    "Owner": ticket._fieldsProto.Owner,
    "Event": ticket._fieldsProto.event,
    "SeatNumber": ticket._fieldsProto.seatNumber,
    "Used": ticket._fieldsProto.used
  }

  ticketRef.update({
    key: key,
    iv: inVec
  })
  .then(() => {
    console.log('Document updated successfully');
  })
  .catch((error) => {
    console.error('Error updating document:', error);
  });

  const messagePayload = {
    "qrPayload" : qrPayload,
    "ticketMeta": ticketMeta,
    "ticketExists":"true"
  }

  res.json(messagePayload);
});

exports.verifyTicket = functions.https.onRequest(async (req, res) => {

  const id = req.query.id;
  const encData = req.query.encData;
  const collection = 'tickets';
  const ticketRef = admin.firestore().collection(collection).doc(id);
  const ticket = await ticketRef.get();
  
  if (!ticket.exists) {
    res.send('Ticket does not exist');
  }
  const key = ticket._fieldsProto.key;
  const inVec = ticket._fieldsProto.iv;

  const decData = decryptData(encData,algo,key,inVec);

  res.json({"decData":decData});
});

exports.generateTicket = functions.https.onRequest(async (req, res) => {
  // request contains uid, eventName
  let ticketInfo = req.query;

  // add cost (lookup eventName), ticketSecret (hashgen), used=false, owner = uid, add ticketid to uid ticketsOwned array
  ticketInfo.used = false;
  ticketInfo.cost = (await admin.firestore().collection('events').doc(ticketInfo.eventName).get()).data().cost;
  ticketInfo.ticketSecret = hashGen(ticketInfo.uid);
  
  admin.firestore().collection('tickets').add(ticketInfo)
    .then(() => {
      res.json({ticketInfo})
    })
    .catch((error) => {
      res.status(500).send(error);
    });
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