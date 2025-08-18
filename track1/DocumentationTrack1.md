# Track 1: NGROK Challenge :exclamation:

## Getting the Problem Right  

For this first task I am the leader of advancing an alien invasion fleet! Now, I am tasked with implementing an API to store (POST), retrieve (GET), and filter(query) alien **species** data.   

The server should support the following routes:
- */heatlhcheck* --> GET: determine if my server is alive and ready to receive connection 
- */api/aliens* --> POST: *query* this ednpoint to send alien data; the alien model **DetailedAlien** (outlined in [API specs](https://challenge.generatenu.com/#model/detailedalien)), and the aliens in an array.
- */api/aliens* --> GET: *retrieve* alien data with the following parameters:
    - "spd_lte"
    - "spd_gte"
    - "atk_lte"
    - "atk_gte"
    - "hp_gte"
    - "hp_lte"
    - "type"
- */api/aliens* --> DELETE: endpoint queried at *beginning* of every test to clear alien data  

## My Thought Process Before Coding: