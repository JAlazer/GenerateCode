class DetailedAlien {

    #baseAlien; // [object] => {atk => [int] (1, 3), hp => [int] (1, 3)}
    #firstName; // [string]
    #id; // [string]
    #lastName; // [string]
    #profileURL; // [string Uniform Resource Identifier (uri)]
    #spd; // [int] 
    #type; // one of 'Regular', 'Elite', or 'Boss'

    constructor(baseAlien, firstName, id, lastName, profileURL, spd, type) {
        if (this.#isValidBase(baseAlien)) {
            this.#baseAlien = baseAlien;
        } else {
            throw new Error("Invalid base alien: " + baseAlien);
        }
        
        // check if first name given is a string
        if (typeof(firstName) == "string") {
            this.#firstName = firstName;
        } else {
            throw new Error("First name given not a string: " + firstName);
        }

        // check if id given is a string
        if (typeof(id) == "string") {
            this.#id = id;
        } else {
            throw new Error("id given not a string: " + id);
        }
        
        // check if last name given is string
        if (typeof(lastName) == "string") {
            this.#lastName = lastName;
        } else {
            throw new Error("Last name given not a string: " + lastName);
        }
        
        // check if given profile url is a url, and a string
        if (typeof(profileURL) == "string") {
            if (this.#isValidURL(profileURL)) {
                this.#profileURL = profileURL;
            } else {
                throw new Error("Profile url given is not a valid uri: " + profileURL);
            }
        } else {
            throw new Error("Profile url given is not a string: " + profileURL);
        }

        // check if given speed is an int
        if (typeof(spd) == "number") {
            this.#spd = spd;
        } else {
            throw new Error("Speed given is not an integer: " + spd);
        }
        
        // check if the type is valid
        try {
            if (type.toLowerCase() === "regular" || type.toLowerCase() === "elite" || type.toLowerCase() === "boss") {
                this.#type = type;
            } else {
                throw new Error("Given alien type is invalid: " + type);
            }
        } catch (e) {
            throw new Error(e.message());
        }
        
    }

    // check if the given variable is an object as baseAlien
    #isValidBase(givenBase) {
        try {
            for (const key in givenBase) {
                if (key === "hp" || key === "atk") {
                    if (typeof(givenBase[key]) === "number") {
                        return (givenBase[key] >= 1 && givenBase[key] <= 3)
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        } catch (e) {
            return false;
        }
    }

    // check if a valid URI is given
    #isValidURL(givenProfile) {
        try {
            new URL(givenProfile);
            // creating the url object succeded!
            return true;
        } catch (e) {
            return false;
        }
    }

    
}