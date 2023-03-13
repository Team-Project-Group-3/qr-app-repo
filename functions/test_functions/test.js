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

function createEvent(eventName){
  const createEvent = db.collection("events").doc(eventName).collection("Tickets");
  const numberOfTickets = 100;
  for(i=1;i<numberOfTickets+1;i++){
    let ticketNumber = "Ticket "+i;
    console.log(ticketNumber);
    let createTickets = createEvent.doc(ticketNumber);
    createTickets.set({
      TicketID: ticketNumber
    })
  }
}


function encryptData(data, algo, key, inVec){
  const cipher = crypto.createCipheriv(algo, key, inVec);
  let encryptedData = Buffer.from(cipher.update(data, 'utf-8', 'hex') + cipher.final('hex')).toString('base64');
  return encryptedData;
}

function decryptData(data, algo, k, iv){
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

//function storeTicket(index, eventName, seatNumber){
//  const storeLocation = db.collection("tickets").doc(index);
//  let rand = randomStringGen();
//  let secret = hashGen(rand);
//  let enc = encryptData('{"ticketSecret": '+secret+', "timestamp": "test timestamp"}')
//  let dec = decryptData(enc, key, inVec);
//  console.log({"Key": key, "IV": inVec});
//  console.log(enc);
//  console.log(dec);
//  storeLocation.set({
//    Cost: "£20",
//    Owner: null,
//    event: eventName,
//    key: {"Key": key, "IV": inVec},
//    seatNumber: seatNumber,
//    ticketSecret: secret,
//    used: false,
//    data: enc
//  })
//}


//function verifyTicket(id){
//  valid = false;
//  const ticketRef = db.collection("tickets").doc(id);
//  return ticketRef
//    .get()
//    .then(ticket=> {
//      if (!ticket.exists) {
//        console.log('Ticket does not exist');
//        throw new error('No ticket with this id exists');
//      }
//      else{
//        rawData = ticket.data();
//        encData = rawData.data;
//        ticketUsed = rawData.used;
//        if(ticketUsed == false){
//          //decrypt data and check timestamp against current time
//          // if data is correct and timestamp is within certain range accept ticket, set used to true, return valid = true
//          // else decline the ticket, note down failed attempt, return valid = false
//        }
//        return valid;
//      }
//    })
//
//}
 

// //   const jsonData = JSON.stringify(ticket.data());
// //   return jsonData
// //   console.log(ticket);

//   return valid; 
// }

module.exports = { encryptData, decryptData }