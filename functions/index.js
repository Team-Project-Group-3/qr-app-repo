const functions = require('firebase-functions');
const crypto = require('crypto');
const { encryptData, decryptData, hashGen } = require('./test_functions/test');
const admin = require('firebase-admin');

admin.initializeApp();
const algo = 'aes-256-cbc';

exports.getTicket = functions.https.onRequest(async (req, res) => {

  const id = req.query.id;
  const collection = 'tickets';
  const ticketRef = admin.firestore().collection(collection).doc(id);
  const ticket = await ticketRef.get();
  const key = crypto.randomBytes(32);
  const inVec = crypto.randomBytes(16);

  if (!ticket.exists) {
    res.send({ "ticketExists": "false" });
  }

  const payload = {
    "ticketSecret": ticket._fieldsProto.ticketSecret.stringValue,
    "timestamp": Date.now()
  }

  const encData = encryptData(JSON.stringify(payload), algo, key, inVec);

  const qrPayload = {
    "encryptedData": encData,
    "ticketId": id
  }

  const ticketMeta = {
    "cost": ticket._fieldsProto.Cost,
    "owner": ticket._fieldsProto.Owner,
    "event": ticket._fieldsProto.event,
    "seatNumber": ticket._fieldsProto.seatNumber,
    "used": ticket._fieldsProto.used
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
    "qrPayload": qrPayload,
    "ticketMeta": ticketMeta,
    "ticketExists": "true"
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
    res.json({
      "status": "unsuccessful",
      "response": "ticket does not exist"
    });
  }

  try {
    const key = ticket._fieldsProto.key.bytesValue;
    const inVec = ticket._fieldsProto.iv.bytesValue;
    const decData = decryptData(encData, algo, key, inVec);
    const decJSON = JSON.parse(decData.data);
    const trueSecret = ticket._fieldsProto.ticketSecret.stringValue;
    const sentSecret = decJSON.ticketSecret;
    const currentTime = Date.now();
    const qrTime = decJSON.timestamp;
    const difference = currentTime - qrTime;
    const timeWindow = 60000;

    if (decJSON.status == 'error') {
      res.json({
        "status": "unsuccessful",
        "response": "invalid ticket"
      });
    }
    if (trueSecret != sentSecret) {
      res.json({
        "status": "unsuccessful",
        "response": "invalid ticket"
      });
    }
    if (ticket._fieldsProto.used.booleanValue) {
      res.json({
        "status": "unsuccessful",
        "response": "ticket already used",
      });
    }
    if (difference <= timeWindow) {
      
      try {
        ticket.update({
          isUsed: true
        });
      } catch (error) {
        console.error('An error occurred while updating the ticket:', error);
      }
      
      res.json({
        "status": "success",
        "response": "ticket valid"
      });
    } else {
      res.json({
        "status": "unsuccessful",
        "response": "expired"
      });
    }
  } catch (error) {
    res.json({
      "status": "failure",
      "response": "unable to decrypt"
    });
  }
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
      res.json({ ticketInfo })
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});