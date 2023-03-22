const axios = require('axios');

describe('Firebase Cloud Functions', () => {
  const BASE_URL = 'https://us-central1-qrapp-fe2f3.cloudfunctions.net';
  const TICKET_ID = 'P48xOjwZm90Eb0gKJf26';
  
  const TICKET_ID_VER = 'Yk1hkvNj0k37g02pIUou'
  const ENCRYPTED_DATA_VER = 'YjQzOWIzYTc5ZTAzZDY5Mzg0NjIyZGMzMWQ5ZTg4ZWM4YzY3Yjk0NDk1ZjE0NjdlMWM2ODI2MDVkNzRjM2U5MjJlMWE0N2M3OWZiMmQ3ZGVhNjRmNWRhOTMwZjkxNjMxZDAzMmY3OWQ1NWIyNzE2NzNiMDg3YTQwNjcyNjI3NzVmNjUyZTg0MGViZWMxNDg3MzVkMGM0YmQ4ODFhODUzOWZjMTg0MTQ5OWIxMzZmZDY0MDBjYTI1MjU1ZDUyZWMxZjUwMTIxYjYwNTFmODk3OGE0M2YwMzFhYmJlMjhlZjY=';
  const HMAC_VER = '2fc3d4612bf84d66f3a750c05bd8634bf7c76a7c5c95c4654d5083d5f000a1ab';

  describe('getTicket', () => {
    test('returns correct response for existing ticket', async () => {
      const response = await axios.get(`${BASE_URL}/getTicket?id=${TICKET_ID}`);
      expect(response.status).toBe(200);
      expect(response.data.ticketExists).toBe('true');
      expect(response.data.ticketMeta.owner).toBeDefined();
      expect(response.data.qrPayload.ticketId).toBe(TICKET_ID);
      expect(response.data.qrPayload.encryptedData.data).toBeDefined();
      expect(response.data.qrPayload.hmac).toBeDefined();
    });

    test('returns correct response for non-existing ticket', async () => {
      const response = await axios.get(`${BASE_URL}/getTicket?id=NON_EXISTING_TICKET_ID`);
      expect(response.status).toBe(200);
      expect(response.data.ticketExists).toBe('false');
    });
  });

  describe('verifyTicket', () => {
    test('returns correct response for valid ticket', async () => {
      const response = await axios.get(`${BASE_URL}/verifyTicket?id=${TICKET_ID_VER}&encData=${ENCRYPTED_DATA_VER}&hmac=${HMAC_VER}`);
      expect(response.status).toBe(200);
      expect(response.data.status).toBe('success');
      expect(response.data.response).toBe('ticket valid');
    });

    test('returns correct response for invalid ticket', async () => {
      const response = await axios.get(`${BASE_URL}/verifyTicket?id=INVALID_TICKET_ID&encData=${ENCRYPTED_DATA_VER}&hmac=${HMAC_VER}`);
      expect(response.status).toBe(200);
      expect(response.data.status).toBe('unsuccessful');
      expect(response.data.response).toBe('ticket does not exist');
    });

    test('returns correct response for an expired ticket', async () => {
      const response = await axios.get(`${BASE_URL}/verifyTicket?id=INVALID_TICKET_ID&encData=${ENCRYPTED_DATA_VER}&hmac=${HMAC_VER}`);
      expect(response.status).toBe(200);
      expect(response.data.status).toBe('unsuccessful');
      expect(response.data.response).toBe('expired');
    });
    test('returns correct response for a used ticket', async () => {
      const response = await axios.get(`${BASE_URL}/verifyTicket?id=INVALID_TICKET_ID&encData=${ENCRYPTED_DATA_VER}&hmac=${HMAC_VER}`);
      expect(response.status).toBe(200);
      expect(response.data.status).toBe('unsuccessful');
      expect(response.data.response).toBe('ticket already used');
    });

  });

  describe('generateTicket', () => {
    test('returns correct response for valid input', async () => {
      const response = await axios.get(`${BASE_URL}/generateTicket?uid=4Vs7BwmZdLQ1xwMm2Uyz05MkbxM2&eventName=Parklife`);
      expect(response.data.ticketInfo.cost).toBeDefined();
      expect(response.data.ticketInfo.eventName).toBeDefined();
      expect(response.data.ticketInfo.used).toBe(false);
      expect(response.data.ticketInfo.uid).toBe('4Vs7BwmZdLQ1xwMm2Uyz05MkbxM2');
    });

    test('returns correct response for an user who already has a ticket for an event', async () => {
      const response = await axios.get(`${BASE_URL}/generateTicket?uid=INVALID_USER_ID&eventName=Parklife`);
      expect(response.data.message).toBe('User already has a ticket for this event');
    });

    test('returns correct response for an event with no tickets left', async () => {
      const response = await axios.get(`${BASE_URL}/generateTicket?uid=INVALID_USER_ID&eventName=Parklife`);
      expect(response.data.message).toBe('No tickets left for event');
    });

    test('returns correct response for a user with no credits left to buy a ticket', async () => {
      const response = await axios.get(`${BASE_URL}/generateTicket?uid=INVALID_USER_ID&eventName=Parklife`);
      expect(response.data.message).toBe('User is out of credits, cannot buy a ticket');
    });

    test('returns correct response for an invalid input', async () => {
      const response = await axios.get(`${BASE_URL}/generateTicket?uid=INVALID_USER_ID&eventName=Parklife`);
      expect(response.data.message).toBe('Error generating ticket');
    });


  });
});
