const crypto = require("crypto")

function hashGen(text) {
  let rawHash = crypto.createHash('sha256');
  rawHash.update(text);
  let hash = rawHash.digest('hex');
  console.log(hash);
  return hash;
}

function randomStringGen() {
  let c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 16; i++) {
    result += c.charAt(Math.floor(Math.random() * c.length));
  }
  return result;
}

function createEvent(eventName) {
  const createEvent = db.collection("events").doc(eventName).collection("Tickets");
  const numberOfTickets = 100;
  for (i = 1; i < numberOfTickets + 1; i++) {
    let ticketNumber = "Ticket " + i;
    console.log(ticketNumber);
    let createTickets = createEvent.doc(ticketNumber);
    createTickets.set({
      TicketID: ticketNumber
    })
  }
}

function encryptData(data, algo, key, inVec) {
  try {
    const cipher = crypto.createCipheriv(algo, key, inVec);
    let encryptedData = Buffer.from(cipher.update(data, 'utf-8', 'hex') + cipher.final('hex')).toString('base64');
    return {
      status: 'success',
      data: encryptedData,
    };
  } catch (err) {
    console.error('An error occurred while encrypting the data:', err);
    return {
      status: 'error',
      message: 'An error occurred while encrypting the data',
      error: err,
    };
  }
}

function decryptData(data, algo, k, iv) {
  try {
    const decipher = crypto.createDecipheriv(algo, k, iv);
    const buff = Buffer.from(data, 'base64');
    let decryptedData = decipher.update(buff.toString('utf8'), 'hex', 'utf8') + decipher.final('utf8');
    return {
      status: 'success',
      data: decryptedData,
    };
  } catch (err) {
    console.error('An error occurred while decrypting the data:', err);
    return {
      status: 'error',
      message: 'An error occurred while decrypting the data',
      error: err,
    };
  }
}

module.exports = { encryptData, decryptData, hashGen, randomStringGen }