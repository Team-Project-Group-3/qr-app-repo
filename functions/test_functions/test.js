const crypto = require("crypto")

function hashGen(text){
  let rawHash = crypto.createHash('sha256');
  rawHash.update(text);
  let hash = rawHash.digest('hex');
  console.log(hash);
  return hash;
}

function randomStringGen(){
  let c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let  result = "";
  for(let i = 0; i < 16; i++){
    result += c.charAt(Math.floor(Math.random()*c.length));
  }
  return result;
}

function encryptData(data, algo, key, inVec){
  const cipher = crypto.createCipheriv(algo, key, inVec);
  let encryptedData = Buffer.from(cipher.update(data, 'utf-8', 'hex') + cipher.final('hex')).toString('base64');
  return encryptedData;
}

function decryptData(data, algo, k, iv){
  const decipher = crypto.createDecipheriv(algo, k, iv);
  const buff = Buffer.from(data, 'base64');
  let decryptedData = decipher.update(buff.toString('utf8'), 'hex', 'utf8') + decipher.final('utf8');
  return decryptedData;
}

// function storeTicket(index){
//   const storeLocation = db.collection("tickets").doc(index);
//   let rand = randomStringGen();
//   let secret = hashGen(rand);
//   let enc = encryptData('{"ticketSecret": '+secret+', "timestamp": "test timestamp"}')
//   let dec = decryptData(enc, key, inVec);
//   console.log({"Key": key, "IV": inVec});
//   console.log(enc);
//   console.log(dec);
//   storeLocation.set({
//     Cost: "Â£20",
//     Owner: null,
//     eventName: "Bloodstock 2023",
//     key: {"Key": key, "IV": inVec},
//     ticketSecret: secret,
//     used: false,
//     data: enc
//   }) 
// }


// function verifyTicket(id){
//   valid = false;
//   const ticketRef = db.collection("tickets").doc(id);
//   return ticketRef
//     .get()
//     .then(ticket=> {
//       if (!ticket.exists) {
//         console.log('Ticket does not exist');
//         throw new error('No ticket with this id exists');
//       }
//       else{
//         console.log(ticket.data());
//         console.log(ticket.data().data)
//       }
//     })
 

// //   const jsonData = JSON.stringify(ticket.data());
// //   return jsonData
// //   console.log(ticket);

//   return valid; 
// }

module.exports = { encryptData, decryptData }