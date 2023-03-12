const crypto = require("crypto")
const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccount.json');


function encryptData(data, key, inVec){
    const algo = 'aes-256-cbc';
    const cipher = crypto.createCipheriv(algo, key, inVec);

    let encryptedData = cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');

    return encryptedData;
  }

function decryptData(encryptedData, key, inVec) {
    const algo = 'aes-256-cbc';
    const decipher = crypto.createDecipheriv(algo, key, inVec);

    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');

    return decryptedData;
  }


const key = crypto.randomBytes(32);
const inVec = crypto.randomBytes(16);

const ticket = {
                "ticketSecret": "1245253523",
                "timestamp": "05/05/2020"
                    }

const encData = encryptData(JSON.stringify(ticket), key, inVec);

console.log("Encrypted Data: "+encData);

const decData = decryptData(encData, key, inVec);

console.log(JSON.parse(decData));

