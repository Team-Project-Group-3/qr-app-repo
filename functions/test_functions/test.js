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

function hashGen(text){
  let rawHash = crypto.createHash('sha256');
  rawHash.update(text);
  let hash = rawHash.digest('hex');
  console.log(hash);
  return hash;
}

function randomStringGen(){
  let c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  result = "";
  for(i = 0; i < 16; i++){
    result += c.charAt(Math.floor(Math.random()*c.length));
  }
  return result;
}

function encryptData(data){
  const cipher = crypto.createCipheriv(algo, key, inVec);
  let encryptedData = Buffer.from(cipher.update(data, 'utf-8', 'hex') + cipher.final('hex')).toString('base64');
  return encryptedData;
}

function decryptData(data, k, iv){
  const decipher = crypto.createDecipheriv(algo, k, iv);
  const buff = Buffer.from(data, 'base64');
  let decryptedData = decipher.update(buff.toString('utf8'), 'hex', 'utf8') + decipher.final('utf8');
  return decryptedData;
}

function storeTicket(index){
  const storeLocation = db.collection("tickets").doc(index);
  let rand = randomStringGen();
  let secret = hashGen(rand);
  let enc = encryptData('{"ticketSecret": '+secret+', "timestamp": "test timestamp"}')
  let dec = decryptData(enc, key, inVec);
  console.log({"Key": key, "IV": inVec});
  console.log(enc);
  console.log(dec);
  storeLocation.set({
    Cost: "£20",
    Owner: null,
    eventName: "Bloodstock 2023",
    key: {"Key": key, "IV": inVec},
    ticketSecret: secret,
    used: false,
    data: enc
  }) 
}

storeTicket("test");

async function getTicketById(collection, id) {
  const ticketRef = db.collection(collection).doc(id);
  const ticket = await ticketRef.get();

  if (!ticket.exists) {
    console.log('Ticket does not exist');
  }

  const jsonData = JSON.stringify(ticket.data());
  return jsonData
}

// getTicketById('tickets', '123')
// .then(result => {
//   console.log(result);
//   const cipher = crypto.createCipheriv(algo, key, inVec);
//   let encryptedData = cipher.update(result, 'utf-8', 'hex');
//   encryptedData += cipher.final('hex');

//   console.log('Encrypted data:', encryptedData);
// })
// .catch(error => {
//   console.log(error);
// });

// TODO - POST data to React Native endpoint