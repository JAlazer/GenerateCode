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
    // pushAliens: [Array of DetailedAlien Objects] -> [Array of DetailedAlien String]
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

    // loop through the key-val pairs and call the correct filtering method
    // acceptQuery: [JSON of query parameters] -> [Array of Detailed Aliens]
    acceptQuery(queries) {
        let filterArr = this.#aliens;
        if (Object.keys(queries).length === 0) {
            return this.getInvasion();
        } else {
            for (const q of queries) {
                let numVal = parseInt(queries[q]);

                if (q === "spd_lte") {
                    // spd_lte validation
                    if (Number.isNaN(numVal)) {
                        throw new Error("Value given is not the correct type: " + queries[q]);
                    } else {
                        filterArr = this.xLessThanOrEqualTo("spd", queries[q], filterArr);
                    }
                } else if (q === "spd_gte") {
                    // spd_gte validation
                    if (Number.isNaN(numVal)) {
                        throw new Error("Value given is not the correct type: " + queries[q]);
                    } else {
                        filterArr = this.xGreaterThanOrEqualTo("spd", queries[q], filterArr);
                    }
                } else if (q === "atk_lte") {
                    // atk_lte validation
                    if (Number.isNaN(numVal) || numVal < 1) {
                        throw new Error("Value given is invalid: " + queries[q]);
                    } else {
                        filterArr = this.xLessThanOrEqualTo("atk", queries[q], filterArr);
                    }
                } else if (q === "atk_gte") {
                    // atk_gte validation
                    if (Number.isNaN(numVal) || numVal > 3) {
                        throw new Error("Value given is invalid: " + queries[q]);
                    } else {
                        filterArr = this.xGreaterThanOrEqualTo("atk", queries[q], filterArr);
                    }
                } else if (q === "hp_gte") {
                    // hp_gte validation
                    if (Number.isNaN(numVal) || numVal > 3) {
                        throw new Error("Value given is invalid: " + queries[q]);
                    } else {
                        filterArr = this.xGreaterThanOrEqualTo("hp", queries[q], filterArr);
                    }
                } else if (q === "hp_lte") {
                    // hp_lte validation
                    if (Number.isNaN(numVal) || numVal < 1) {
                        throw new Error("Value given is invalid: " + queries[q]);
                    } else {
                        filterArr = this.xLessThanOrEqualTo("hp", queries[q], filterArr);
                    }
                } else if (q === "type") {
                    // type validation
                    if (queries[q].toLowerCase() === "regular" || 
                        queries[q].toLowerCase() === "elite" ||
                        queries[q].toLowerCase() === "boss") {
                            
                            filterArr = this.aliensOfType(queries[q], filterArr);
                        } else {
                            throw new Error("Value for type is invalid: " + queries[q]);
                        }
                } else {
                    throw new Error("Unexpected query parameter: " + q);
                }
            }
        }
        return JSON.stringify(filterArr);
    }


    // abstraction on filtering for values greater than or equal to given number with appropriate field name
    // xGreaterThanOrEqualTo: [string] [number] [Array of Detailed Aliens] -> [Array of Detailed Aliens]
    xGreaterThanOrEqualTo(fieldName, givenNum, givenArr) {
        return givenArr.filter((alien) => {
            return alien[fieldName] >= givenNum
        })
    }

    // abstraction on filtering for values less than or equal to given number with appropriate field name
    // xLessThanOrEqualTo: [string] [number] [Array of Detailed Aliens] -> [Array of Detailed Aliens]
    xLessThanOrEqualTo(fieldName, givenNum, givenArr) {
        return givenArr.filter((alien) => {
            return alien[fieldName] <= givenNum
        })
    }

    // filter given array for given alien type
    // aliensOfType: [string] [Array of Detailed Aliens] -> [Array of Detailed Aliens]
    aliensOfType(givenType, givenArr) {
        return givenArr.filter((alien) => {
            return alien["type"].toLowerCase() === givenType.toLowerCase();
        })
    }
}

// export classes
module.exports = AlienInvasion;