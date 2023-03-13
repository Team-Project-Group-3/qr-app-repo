const crypto = require("crypto")
const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccount.json');
const algo = 'aes-256-cbc';
admin.initializeApp();

// function decryptData(data, algo, k, iv){
//   const decipher = crypto.createDecipheriv(algo, k, iv);
//   const buff = Buffer.from(data, 'base64');
//   let decryptedData = decipher.update(buff.toString('utf8'), 'hex', 'utf8') + decipher.final('utf8');
//   return decryptedData;
// }

// const response = {
//   "qrPayload": {
//       "encryptedData": "NjlkN2IwMzliNGExMzA4OTAyZmNhZDZkNDk3OWYxN2YxOTY3YzE3ZjVmNjg5Mzk3ODQyZTg0ZWMxYTA2ZTZlNjhjMDczZTgzYjkwNmFmNTg4N2MxNjkzOGM5NTkzYjQ4MWY2MWNkMDI3ZjVhMjE1ZjczOTQ2Mjg4MWMzZDQzN2Q1NzNiN2ZjZGMwNDFjMmU5OTcxMzYxNGY2M2JkYmNkYTU2YmY1ZWU1YmYxYzNhNWYwODY1ZDVmNGJmMmMxN2U0NTIwZmYwMDU3MmQ1YjQ4NTIyYWI5MGNjOWE2ODU1MzY=",
//       "ticketId": "test"
//   },
//   "ticketKey": {
//       "type": "Buffer",
//       "data": [
//           99,
//           6,
//           52,
//           152,
//           196,
//           142,
//           97,
//           135,
//           11,
//           48,
//           95,
//           82,
//           157,
//           222,
//           148,
//           165,
//           90,
//           161,
//           142,
//           181,
//           113,
//           223,
//           229,
//           133,
//           169,
//           185,
//           114,
//           134,
//           186,
//           246,
//           229,
//           149
//       ]
//   },
//   "ticketIV": {
//       "type": "Buffer",
//       "data": [
//           67,
//           124,
//           123,
//           33,
//           55,
//           2,
//           218,
//           186,
//           35,
//           192,
//           128,
//           106,
//           64,
//           193,
//           158,
//           255
//       ]
//   }
// }

// const currentKey = Buffer.from(response.ticketKey);
// const currentIV = Buffer.from(response.ticketIV);
// const encData = response.qrPayload.encryptedData;

// const decData = decryptData(encData, algo, currentKey, currentIV);

// console.log(JSON.parse(decData));


function decryptData(data, algo, k, iv){
    const decipher = crypto.createDecipheriv(algo, k, iv);
    const buff = Buffer.from(data, 'base64');
    let decryptedData = decipher.update(buff.toString('utf8'), 'hex', 'utf8') + decipher.final('utf8');
    return decryptedData;
  }

async function test_funct() {
    const id = "test";
    // const encData = "MzYzMGU2MzI5OTNhYTA1YjQ5Yzc2MTJlZTAzYzRhMjFmMTdmMTgwYTM5NGI5Mjg1Y2RkZTkzNTU4MmQ1YWRmY2FhOGFjM2M5ODI2YzZmYWIzMzJlYWE1ZGMzYTg4MTgzNmVlNGVmNTlkNzY5OWZiZWEwZjgyY2ZlM2JkMDA2ZjA2MzBiMmY1YTg2ZTQxNjczZDRjMTUwMDVlYTRmOTE5ODZhNTY5ZTMyMDgzMTNlNjBhNjNiYTNkZjFhZjMzNDQ5Y2IyNzU1ZTkzNDI2ZDYwMzQyYjRkMWZlMjU2NDU0ZDI="
    const collection = 'tickets';
    const ticketRef = admin.firestore().collection(collection).doc(id);
    const ticket = await ticketRef.get();
    if (!ticket.exists) {
      console.log("does not exist");
    } else {
    //   const key = ticket._fieldsProto.key;
    //   const inVec = ticket._fieldsProto.iv;
      // const decData = decryptData(encData,algo,key,inVec);
      // console.log(decData);
      console.log("hello world");
    }
}
  
test_funct();