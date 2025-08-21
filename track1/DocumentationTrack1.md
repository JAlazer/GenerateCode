# Track 1: NGROK Challenge :exclamation:

## Getting the Problem Right  

For this first task I am the leader of advancing an alien invasion fleet! Now, I am tasked with implementing an API to store (POST), retrieve (GET), and filter(query) alien **species** data.   

The server should support the following routes:
- */heatlhcheck* &rarr; GET: determine if my server is alive and ready to receive connection 

- */api/aliens* &rarr; POST: *query* this ednpoint to send alien data; the alien model **DetailedAlien** (outlined in [the API specs](https://challenge.generatenu.com/#model/detailedalien)), and the aliens in an array.
- */api/aliens* &rarr; GET: *retrieve* alien data with the following parameters:
    - "spd_lte"
    - "spd_gte"
    - "atk_lte"
    - "atk_gte"
    - "hp_gte"
    - "hp_lte"
    - "type"
- */api/aliens* &rarr; DELETE: endpoint queried at *beginning* of every test to clear alien data  

## My Thought Process Before Coding:
Okay, so when it comes to building out endpoints, I want to take it one at a time. Building out each endpoint will be done with *Express* from *Node.js*! Now, starting with *healthCheck*...

### Healthcheck
Here, I have to decide how exactly one can tell if my server is alive, which at the time of the server being started should be all the time. So all I would have to do is set up the route to be a GET method, which sends an HTTP status code of 200 (meaning things are okay).  

### POST /api/aliens
Here, this endpoint will be used to send multiple **DetailedAliens**, which will require me to actually build out the *object oriented* model according to the API specs. Since, I anticipate the other tracks might also want to make use of these models, I will place the *classes* within a *model* directory at the root of this folder.  

Anyways, once the model of a **DetailedAlien** has been made, we need to think about what POST endpoint means... The endpoint will be accepting data, so we have to spend time validating that the data POSTed is correct i.e, the data POSTEd is an *array of **DetailedAlien** objects*. This may involve first checking that the given response is an array. Thennnn looping through each element of the array to ensure that they are valid **DetailedAliens**. Or, I could make an **AlienInvasion** object which takes in an array, and validates whether that array contains valid **DetailedAlien** objects *upon construction*.  

Creating these objects offer an additional benefit of ensuring that the logic dealing with these objects is not messy with server-side routing logic.  

Finally, once the data POSTed has been validated, it must be stored some way, for now, I aim to storing each set of invasions *in-memory* in a *queue*.

> *Actually* I just realized through the API specs, that the **AlienInvasion** is an array which will contain the data of all the aliens, as each index is identified by a unique challenge id. So no fancy data structure needed just yet. However, if one were to worry about time, I would use a hashmap to store the **AlienInvasion** where the key would be the *challengeID* and the value would be the rest of the important information!  

### GET /api/aliens  





