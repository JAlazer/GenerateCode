const AlienInvasion = require("../../model/AlienInvasion.js");
const DetailedAlien = require("../../model/DetailedAlien.js");
const aliensTest1 = require("./aliensTest1.json");

let invasion;
 

// test spd_lte filter 
test("filter speed less than equal to 13", () => {
    invasion = new AlienInvasion();
    invasion.pushAliens(aliensTest1);
    expect(invasion.spdLessThanOrEqualTo(13)).toStrictEqual([
        new DetailedAlien({
            "baseAlien": {
            "atk": 3,
            "hp": 3
            },
            "firstName": "Kronos",
            "id": "alien-003",
            "lastName": "Destroyer",
            "profileUrl": "https://github.com/",
            "spd": 10,
            "type": "Boss"
        })
    ])
})
