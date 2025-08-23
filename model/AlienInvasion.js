// importing Detailed Alien
const DetailedAlien = require("./DetailedAlien.js");

// Class which represents an alien invasion as an array of Detailed Aliens
class AlienInvasion {
    #aliens; 

    /**
     * nothing needed here, just an empty array of aliens awaiting Detailed Alien info
     */
    constructor() {
        this.#aliens = [];
    }

    // add in aliens to the end of this alien invasion and return the entire array of aliens
    // pushAliens: [Array of DetailedAlien] -> [Array of DetailedAlien]
    // throw error if the given array contains an invalid DetailedAlien
    pushAliens(givenAliens) {
        // try adding in a DetailedAlien from each element 
        try {
            for (const alien of givenAliens) {
                this.#aliens.push(new DetailedAlien(alien));
            }
            return JSON.stringify(this.#aliens);
        } catch (e) {
            throw new Error("Invalid alien in given array: " + e.message);
        }
    }

    // getInvasion: [] -> [JSON array of Detailed Aliens]
    getInvasion() {
        return JSON.stringify(this.#aliens);
    }
}

// export classes
module.exports = AlienInvasion;