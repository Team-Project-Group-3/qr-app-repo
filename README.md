## Project Contributors

- 💻 Ben Thompson-Watson
- 💻 Dylan Bell
- 💻 Shaun Carter
- 💻 Travis Higgins
- 💻 Joshua Lowery
- 💻 John Mitchell
- 💻 Matthew Houghton

### User Login Details

email = testuser@email.com
password = password

### Admin Login Details

email = testadmin@email.com
password = password
<br>
<br>

## Verifying Ticket Function

Status Codes:

* status = success
* status = unsuccessful 

Response Codes:

* response = ticket valid
* response = invalid ticket
* response = ticket already used
* response = expired
* response = unable to decrypt


## Testing Suite Output
```
Firebase Cloud Functions
    getTicket
      ✓ returns correct response for existing ticket (495 ms)
      ✓ returns correct response for non-existing ticket (649 ms)
    verifyTicket
      ✓ returns correct response for valid ticket (308 ms)
      ✓ returns correct response for invalid ticket (649 ms)
      ✓ returns correct response for an expired ticket (297 ms)
      ✓ returns correct response for a used ticket (513 ms)
    generateTicket
      ✓ returns correct response for valid input (1167 ms)
      ✓ returns correct response for an user who already has a ticket for an event (596 ms)
      ✓ returns correct response for an event with no tickets left (389 ms)
      ✓ returns correct response for a user with no credits left to buy a ticket (418 ms)
      ✓ returns correct response for an invalid input (473 ms)

Test Suites: 1 passed, 1 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        6.66 s, estimated 21 s
```