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

Here, is where a user would pull the aliens that match the given query parameters which are written explicitly as such:

- spd_lte (speed less than or equal to)
- spd_gte (speed greater than or equal to)

- atk_lte (attack less than or equal to)
- atk_gte (attack greater than or equal to)

- hp_gte (health points greater than or equal to)
- hp_lte (health points less than or equal to)

- type 

This might be a bit complicated because, an alien can either be a **BaseAlien** or a **DetailedAlien**, where a **BaseAlien** *only* has the *atk and hp* information.  

OH wait, I just reread the POST of this endpoint, and realized that the POST request should *only* accept an array of **DetailedAlien**, which means that we will only ever have to filter through **DetailedAliens**, meaning that there will be sufficient information for each type of filtering. Now from here, we could most likely apply a *filter* function to the **AlienInvasion** array in combination with the *map* function, I'll figure out the details when I get to the code!  


### DELETE /api/aliens

This one should be super easy: here we just empty out the **AlienInvasion** array by assigning it to an empty array.

This seems to be it for the first track! The only thing I will have to firgure out eventually is how to use [Ngrok](https://ngrok.com/)! 


## Diving into the Code

### Building the Model: **DetailedAlien**

I have already set up all my routes, so now I want to ensure that I have the *object-oriented model* built out for the **DetailedAlien**! So, I'll start by creating the class with the constructor and the appropriate fields to accept.  

One of the pains of coding in javascript is having to manually type checking each given field to ensure everything is as it should be for the **DetailAlien** class. Two helper methods: *isValidBase* and *isValidURL* were created to check the validity of the **BaseAlien** object and *profileURL*.  

### Back to Server Side logic

Okay, so I will be starting with the POST request, which will be accepting an array of objects, where each object contains: an *array of aliens*, a *challengeID*, and *hp*. This means that the */api/aliens* endpoint has to be updated to accept a unique *id* parameter to distinguish each object within the array. So now, from the API specs, I noticed that there were given endpoints for the */api/aliens* endpooint, where */api/v1/challenge/backend/:id/aliens/submit* is that POST request, meanwhile */api/v1/challenge/backend/:id/aliens* is given for the GET request, and there was no DELETE endpoint specified, so I will be using the same endpoint as the GET to handle a DELETE request.  

> Scratch all of this above, I got ahead of myself, it turns out these endpoints are for track 2! So I will simply be using an endpoint of */api/aliens* for all HTTP requests.

### Getting into POSTing

At every POST request, I will be expecting an array of aliens to be given, so I will be adding each array of aliens to another array called **AlienInvasion**, as each array of aliens represents a *wave* of the **AlienInvasion**.  

Before an array of aliens can be added to the **AlienInvasion**, each alien must be able to successfully construct a **DetailedAlien**, otherwise a *406* Not Acceptable error code should be sent, which should tell the user that not all aliens are detailed. Once all the aliens have been successfully constructed, a *202* status code of *accepted* would be sent, and the array of alien objects would be added to the **AlienInvasion** array.  

> Just now realizing that I will have to fix my **DetailedAlien** model to accept a JSON and assign the fields that way.  

Okay, now the model is fixed to accept json of alien! So now I want the post request to access the input for the POST endpoint with the request field. Before I do this, I must ensure that the body of data passed into the POST request is an array, otherwise, an error code of *400* should be returned here for *malformed data*.  

### Side Quest: Creating **AlienInvasion**

Once this check is passed, we should loop through the array to ensure that each object in the array given is a **DetailedAlien**. Before I get to doing this, I also wanted to create an **AlienInvasion** class, which will do this in the model directory instead of being mixed in with the server code. This way, all I have to do is pass in the *req.body* to the **AlienInvasion** instance, which will run all the checks necessary.  

Upon constructing an **AlienInvasion**, no parameters need to be accepted into the constructor, as the **AlienInvasion** instance is only expected to be created once (at the top of the *server.js* code). This means the constructor assigns a new empty array to the *aliens* field. So, to add alien info, I have created a *pushAliens* method which accepts an array of **DetailedAliens** and pushes each of those **DetailedAliens** into the *aliens* array if each object in the given array is a valid **DetailedAlien**. The *pushAliens* method also returns the current **AlienInvasion** info.  

### Back to the POST

So, now we just have to instantiate the **AlienInvasion** class at the top of the file, then in the POST endpoint, the request body is only pushed into the alien invasion if the body is an array. Then if there is an error upon pushing the aliens into the **AlienInvasion** a *406* status code is sent, otherwise a *202* status code is sent.  

Now, before I move onto to building out the next endpoint request, I shall test my POST endpoint with [Postman](https://www.postman.com/). All my testing arrays are placed within the *testAlienArrays* folder, specifically for POST of /api/aliens! So far, one test has passed for successful creation of this endpoint. I'll have to test more edge cases once I come up with them! For now, I shall move onto building out the GET request!  


### actual GET endpoint

