const crypto = require("crypto")

const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const algo = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const inVec = crypto.randomBytes(16);

let rawHash = crypto.createHash('sha256');
rawHash.update(key)
let hash = rawHash.digest('hex');
console.log(hash);

function storeTicket(index, ticketInfo){
  const storeLocation = db.collection("tickets").doc(index);
  storeLocation.set({
    Ticket: ticketInfo,
    Timestamp: "10293"
  }) 
}
storeTicket(hash, "test");

async function getTicketById(collection, id) {
  const ticketRef = db.collection(collection).doc(id);
  const ticket = await ticketRef.get();

  if (!ticket.exists) {
    console.log('Ticket does not exist');
  }

  const jsonData = JSON.stringify(ticket.data());
  return jsonData
}

getTicketById('tickets', '123')
.then(result => {
  console.log(result);
  const cipher = crypto.createCipheriv(algo, key, inVec);
  let encryptedData = cipher.update(result, 'utf-8', 'hex');
  encryptedData += cipher.final('hex');

  console.log('Encrypted data:', encryptedData);
})
.catch(error => {
  console.log(error);
});

// TODO - POST data to React Native endpoint