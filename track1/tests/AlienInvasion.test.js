const AlienInvasion = require("../model/AlienInvasion.js");
const DetailedAlien = require("../model/DetailedAlien.js");
const aliensTest1 = require("./aliensTest1.json");

let invasion;

function aliensToDetailed(aliens) {
    return aliens.map(
        (alienObj) => { return new DetailedAlien(alienObj); }
    )
}

// test abstraction - spd
test("abstraction: spd less than equal to 13", () => {
    invasion = new AlienInvasion();
    invasion.pushAliens(aliensTest1);
    expect(invasion.xLessThanOrEqualTo("spd", 13, aliensToDetailed(aliensTest1))).toStrictEqual(
        [
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
        ]
    )
})

// test abstraciton - atk
test("abstraction: atk less than equal to 2", () => {
    invasion = new AlienInvasion();
    invasion.pushAliens(aliensTest1);
    expect(invasion.xLessThanOrEqualTo("atk", 2, aliensToDetailed(aliensTest1))).toStrictEqual(
        [
            new DetailedAlien({
                "baseAlien": {
                "atk": 2,
                "hp": 3
                },
                "firstName": "Zorg",
                "id": "alien-001",
                "lastName": "Blaster",
                "profileUrl": "https://github.com/",
                "spd": 15,
                "type": "Regular"
            })
        ]
    )
})

// test abstraction - hp 
test("abstraction: hp less than equal to 2", () => {
    invasion = new AlienInvasion();
    invasion.pushAliens(aliensTest1);
    expect(invasion.xLessThanOrEqualTo("hp", 2, aliensToDetailed(aliensTest1))).toStrictEqual(
        [
            new DetailedAlien({
                "baseAlien": {
                "atk": 3,
                "hp": 2
                },
                "firstName": "Xara",
                "id": "alien-002",
                "lastName": "Voidwalker",
                "profileUrl": "https://github.com/",
                "spd": 25,
                "type": "Elite"
            }),
            new DetailedAlien({
                "baseAlien": {
                "atk": 3,
                "hp": 1
                },
                "firstName": "Kronos",
                "id": "alien-003",
                "lastName": "Destroyer",
                "profileUrl": "https://github.com/",
                "spd": 10,
                "type": "Boss"
            })
        ]
    )
})

// testing the greater than or equal to
test("find spd greater than 20", () => {
    invasion = new AlienInvasion();
    invasion.pushAliens(aliensTest1);
    expect(invasion.xGreaterThanOrEqualTo("spd", 20, aliensToDetailed(aliensTest1))).toStrictEqual(
        [
          new DetailedAlien({
                "baseAlien": {
                "atk": 3,
                "hp": 2
                },
                "firstName": "Xara",
                "id": "alien-002",
                "lastName": "Voidwalker",
                "profileUrl": "https://github.com/",
                "spd": 25,
                "type": "Elite"
            })
        ]
    )
})

test("find hp greater than 2", () => {
    invasion = new AlienInvasion();
    invasion.pushAliens(aliensTest1);
    expect(invasion.xGreaterThanOrEqualTo("hp", 2, aliensToDetailed(aliensTest1))).toStrictEqual(
        [
          new DetailedAlien({
                "baseAlien": {
                "atk": 2,
                "hp": 3
                },
                "firstName": "Zorg",
                "id": "alien-001",
                "lastName": "Blaster",
                "profileUrl": "https://github.com/",
                "spd": 15,
                "type": "Regular"
            }),
            new DetailedAlien({
                "baseAlien": {
                "atk": 3,
                "hp": 2
                },
                "firstName": "Xara",
                "id": "alien-002",
                "lastName": "Voidwalker",
                "profileUrl": "https://github.com/",
                "spd": 25,
                "type": "Elite"
            })
        ]
    )
})


test("find atk greater than 2", () => {
    invasion = new AlienInvasion();
    invasion.pushAliens(aliensTest1);
    expect(invasion.xGreaterThanOrEqualTo("atk", 2, aliensToDetailed(aliensTest1))).toStrictEqual(
        [
          new DetailedAlien({
                "baseAlien": {
                "atk": 2,
                "hp": 3
                },
                "firstName": "Zorg",
                "id": "alien-001",
                "lastName": "Blaster",
                "profileUrl": "https://github.com/",
                "spd": 15,
                "type": "Regular"
            }),
            new DetailedAlien({
                "baseAlien": {
                "atk": 3,
                "hp": 2
                },
                "firstName": "Xara",
                "id": "alien-002",
                "lastName": "Voidwalker",
                "profileUrl": "https://github.com/",
                "spd": 25,
                "type": "Elite"
            }),
            new DetailedAlien({
                "baseAlien": {
                "atk": 3,
                "hp": 1
                },
                "firstName": "Kronos",
                "id": "alien-003",
                "lastName": "Destroyer",
                "profileUrl": "https://github.com/",
                "spd": 10,
                "type": "Boss"
            })
        ]
    )
})


// testing for type
test("looking for aliens of type: Boss", () => {
    invasion = new AlienInvasion();
    invasion.pushAliens(aliensTest1);

    expect(invasion.aliensOfType("Boss", aliensToDetailed(aliensTest1))).toStrictEqual(
        [
            new DetailedAlien(
                {
                    "baseAlien": {
                    "atk": 3,
                    "hp": 1
                    },
                    "firstName": "Kronos",
                    "id": "alien-003",
                    "lastName": "Destroyer",
                    "profileUrl": "https://github.com/",
                    "spd": 10,
                    "type": "Boss"
                }
            )
        ]
    )
})


