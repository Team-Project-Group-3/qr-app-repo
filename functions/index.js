const functions = require('firebase-functions');
const crypto = require('crypto');
const { encryptData, decryptData, hashGen, randomStringGen } = require('./src/services/services');
const admin = require('firebase-admin');

admin.initializeApp();
const algo = 'aes-256-cbc';
const hmacKey = 'X43ARQR-Secret-Key_9128310';


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

  let hmac = '';
  try {
    hmac = crypto.createHmac('sha256', hmacKey)
                     .update(encData.data)
                     .digest('hex');
  } catch (error) {
    console.error("Error occurred while generating HMAC:", error);
  }

  const qrPayload = {
    "encryptedData": encData,
    "hmac": hmac,
    "ticketId": id
  }

  const ticketMeta = {
    "cost": ticket._fieldsProto.cost,
    "owner": ticket._fieldsProto.uid,
    "event": ticket._fieldsProto.eventName,
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
  const hmac = req.query.hmac;

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
    const hmacToCheck = crypto.createHmac('sha256', hmacKey)
      .update(encData)
      .digest('hex');
    if (hmac !== hmacToCheck) {
      res.json({
        "status": "unsuccessful",
        "response": "ticket hash invalid"
      })
    }
    if (difference <= timeWindow) {
      used = true;
      try {
        ticketRef.update({
          used: used,
        })
          .then(() => {
            console.log('Document updated successfully');
          })
          .catch((error) => {
            console.error('Error updating document:', error);
          })
        res.json({
          "status": "success",
          "response": "ticket valid"
        });
      } catch (error) {
        res.json({
          "status": "unsuccessful",
          "response": "an error occured while changing the isUsed property"
        });
      }

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
  try {
    let ticketInfo = req.query;
    let user = ticketInfo.uid;
    ticketInfo.used = false;
    const event = admin.firestore().collection('events').doc(ticketInfo.eventName);
    const eventDoc = await event.get();
    const u = admin.firestore().collection("users").doc(user);
    const userData = await u.get();
    const available = eventDoc.data().availableTickets;
    const credits = userData.data().credit;
    let cost = eventDoc.data().cost;

    if (available < 1) {
      res.status(200).json({ message: "No tickets left for event" });
    }
    else if (credits - cost < 0) {
      res.status(200).json({ message: "User is out of credits, cannot buy a ticket" });
    }
    else {
      const ticketDB = admin.firestore().collection('tickets');
      let t = userData.data().ticketsOwned;
      let currentTicket;
      let doc;
      let check = false;
      for (let i = 0; i < t.length; i++) {
        doc = ticketDB.doc(t[i]);
        currentTicket = await doc.get();
        if (currentTicket.data().eventName == ticketInfo.eventName) {
          check = true;
        }
      }
      if (check) {
        res.status(200).json({ message: "User already has a ticket for this event" });
      }
      else {
        ticketInfo.cost = cost;
        ticketInfo.ticketSecret = hashGen(randomStringGen());

        const docRef = await ticketDB.add(ticketInfo);
        delete ticketInfo.ticketSecret;
        t.push(docRef.id);
        await u.update({
          credit: credits - cost,
          ticketsOwned: t
        })
        event.update({
          availableTickets: available - 1
        })

        res.status(200).json({ ticketInfo });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(200).json({ message: "Error generating ticket" });
  }
});


exports.resetTicket = functions.https.onRequest(async (req, res) => {

  const id = req.query.id;
  const collection = 'tickets';
  const ticketRef = admin.firestore().collection(collection).doc(id);

  used = false;
  await ticketRef.update({
    used: used,
    })
    .then(() => {
        res.send("success");
    })
    .catch((error) => {
      console.error('Error updating document:', error);
      res.send(error);
    })
});