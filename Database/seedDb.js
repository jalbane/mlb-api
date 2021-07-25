const MongoClient = require('mongodb').MongoClient;
const franchiseSchema = require('../models/mlb.js');
require('dotenv').config();

MongoClient.connect(process.env.DB_URL, {useUnifiedTopology: true}, async (err, res)=> {
    if (err) throw err;
    var api = res.db('MLB').collection('franchises')
    var documentCount;
    await api.countDocuments()
        .then( (res) => documentCount = res)
        .catch(err => console.log(err));
    if (documentCount > 0){
        console.log('Database was not seeded, documents already exist')
        return process.exit();
    }else{
        let array = [];
        array.push(new franchiseSchema({
            team: "Arizona Diamondbacks",
            teamId: array.length,
            league: 1,
            division: "West",
            summary:{
                wins: 28,
                losses: 68,
                record: "28-68",
                streak: "W2",
                gamesBack: 32.5,
                pct: .292
            }
        }))
        array.push(new franchiseSchema({
            team: "Atlanta Braves",
            teamId: array.length,
            league: 1,
            division: "East",
            summary:{
                wins: 45,
                losses: 47,
                record: "45-47",
                streak: "L1",
                gamesBack: 4.5,
                pct: .489
            }
        }))
        array.push(new franchiseSchema({
            team: "Baltimore Orioles",
            teamId: array.length,
            league: 0,
            division: "East",
            summary:{
                wins: 31,
                losses: 62,
                record: "31-62",
                streak: "W3",
                gamesBack: 25.0,
                pct: .333
            }
        }))
        array.push(new franchiseSchema({
            team: "Boston Red Sox",
            teamId: array.length,
            league: 0,
            division: "East",
            summary:{
                wins: 57,
                losses: 38,
                record: "57-38",
                streak: "W1",
                gamesBack: 0,
                pct: .600
            }
        }))
        array.push(new franchiseSchema({
            team: "Chicago White Sox",
            teamId: array.length,
            league: 0,
            division: "Central",
            summary:{
                wins: 57,
                losses: 36,
                record: "57-36",
                streak: "W1",
                gamesBack: 0,
                pct: .606
            }
        }))
        array.push(new franchiseSchema({
            team: "Chicago Cubs",
            teamId: array.length,
            league: 1,
            division: "Central",
            summary:{
                wins: 46,
                losses: 48,
                record: "46-48",
                streak: "L2",
                gamesBack: 9.0,
                pct: .489
            }
        }))
        array.push(new franchiseSchema({
            team: "Cincinnati Reds",
            teamId: array.length,
            league: 1,
            division: "Central",
            summary:{
                wins: 48,
                losses: 46,
                record: "48-46",
                streak: "L4",
                gamesBack: 7.0,
                pct: .511
            }
        }))
        array.push(new franchiseSchema({
            team: "Cleveland Indians",
            teamId: array.length,
            league: 0,
            division: "Central",
            summary:{
                wins: 47,
                losses: 44,
                record: "47-44",
                streak: "W1",
                gamesBack: 8.5,
                pct: .516
            }
        }))
        array.push(new franchiseSchema({
            team: "Colorado Rockies",
            teamId: array.length,
            league: 1,
            division: "West",
            summary:{
                wins: 41,
                losses: 53,
                record: "41-53",
                streak: "W1",
                gamesBack: 18.5,
                pct: .436
            }
        }))
        array.push(new franchiseSchema({
            team: "Detroit Tigers",
            teamId: array.length,
            league: 0,
            division: "Central",
            summary:{
                wins: 44,
                losses: 51,
                record: "44-51",
                streak: "W4",
                gamesBack: 13.5,
                pct: .463
            }
        }))
        array.push(new franchiseSchema({
            team: "Houston Astros",
            teamId: array.length,
            league: 0,
            division: "West",
            summary:{
                wins: 57,
                losses: 38,
                record: "57-38",
                streak: "W1",
                gamesBack: 0,
                pct: .600
            }
        }))
        array.push(new franchiseSchema({
            team: "Kansas City Royals",
            teamId: array.length,
            league: 0,
            division: "Central",
            summary:{
                wins: 38,
                losses: 55,
                record: "38-55",
                streak: "W1",
                gamesBack: 18.5,
                pct: .409
            }
        }))
        array.push(new franchiseSchema({
            team: "Los Angeles Angels",
            teamId: array.length,
            league: 0,
            division: "West",
            summary:{
                wins: 46,
                losses: 48,
                record: "46-48",
                streak: "L3",
                gamesBack: 10.5,
                pct: .489
            }
        }))
        array.push(new franchiseSchema({
            team: "Los Angeles Dodgers",
            teamId: array.length,
            league: 1,
            division: "West",
            summary:{
                wins: 58,
                losses: 37,
                record: "58-37",
                streak: "L2",
                gamesBack: 2.0,
                pct: .611
            }
        }))
        array.push(new franchiseSchema({
            team: "Miami Marlins",
            teamId: array.length,
            league: 1,
            division: "East",
            summary:{
                wins: 40,
                losses: 54,
                record: "40-54",
                streak: "L3",
                gamesBack: 10.5,
                pct: .426
            }
        }))
        array.push(new franchiseSchema({
            team: "Milwaukee Brewers",
            teamId: array.length,
            league: 1,
            division: "Central",
            summary:{
                wins: 56,
                losses: 40,
                record: "56-40",
                streak: "L1",
                gamesBack: 0,
                pct: .583
            }
        }))
        array.push(new franchiseSchema({
            team: "Minnesota Twins",
            teamId: array.length,
            league: 0,
            division: "Central",
            summary:{
                wins: 40,
                losses: 54,
                record: "39-53",
                streak: "L1",
                gamesBack: 17.0,
                pct: .426
            }
        }))
        array.push(new franchiseSchema({
            team: "New York Mets",
            teamId: array.length,
            league: 1,
            division: "East",
            summary:{
                wins: 49,
                losses: 42,
                record: "49-42",
                streak: "W2",
                gamesBack: 0,
                pct: .538
            }
        }))
        array.push(new franchiseSchema({
            team: "New York Yankees",
            teamId: array.length,
            league: 0,
            division: "East",
            summary:{
                wins: 48,
                losses: 44,
                record: "48-44",
                streak: "W2",
                gamesBack: 7.5,
                pct: .522
            }
        }))
        array.push(new franchiseSchema({
            team: "Oakland Athletics",
            teamId: array.length,
            league: 0,
            division: "West",
            summary:{
                wins: 55,
                losses: 42,
                record: "55-42",
                streak: "W2",
                gamesBack: 3.0,
                pct: .567
            }
        }))
        array.push(new franchiseSchema({
            team: "Philadelphia Phillies",
            teamId: array.length,
            league: 1,
            division: "East",
            summary:{
                wins: 47,
                losses: 45,
                record: "47-45",
                streak: "W2",
                gamesBack: 2.5,
                pct: .511
            }
        }))
        array.push(new franchiseSchema({
            team: "Pittsburgh Pirates",
            teamId: array.length,
            league: 1,
            division: "Central",
            summary:{
                wins: 36,
                losses: 58,
                record: "36-58",
                streak: "L2",
                gamesBack: 19.0,
                pct: .383
            }
        }))
        array.push(new franchiseSchema({
            team: "San Diego Padres",
            teamId: array.length,
            league: 1,
            division: "West",
            summary:{
                wins: 55,
                losses: 41,
                record: "54-41",
                streak: "L1",
                gamesBack: 5.5,
                pct: .573
            }
        }))
        array.push(new franchiseSchema({
            team: "San Francisco Giants",
            teamId: array.length,
            league: 1,
            division: "West",
            summary:{
                wins: 59,
                losses: 34,
                record: "59-34",
                streak: "W1",
                gamesBack: 0,
                pct: .634
            }
        }))
        array.push(new franchiseSchema({
            team: "Seattle Mariners",
            teamId: array.length,
            league: 0,
            division: "West",
            summary:{
                wins: 50,
                losses: 44,
                record: "50-44",
                streak: "W1",
                gamesBack: 6.5,
                pct: .532
            }
        }))
        array.push(new franchiseSchema({
            team: "St. Louis Cardinals",
            teamId: array.length,
            league: 1,
            division: "Central",
            summary:{
                wins: 47,
                losses: 47,
                record: "47-47",
                streak: "W3",
                gamesBack: 8.0,
                pct: .500
            }
        }))
        array.push(new franchiseSchema({
            team: "Tampa Bay Rays",
            teamId: array.length,
            league: 0,
            division: "East",
            summary:{
                wins: 55,
                losses: 39,
                record: "55-39",
                streak: "L1",
                gamesBack: 1.5,
                pct: .585
            }
        }))
        array.push(new franchiseSchema({
            team: "Texas Rangers",
            teamId: array.length,
            league: 0,
            division: "West",
            summary:{
                wins: 35,
                losses: 59,
                record: "35-59",
                streak: "L6",
                gamesBack: 21.5,
                pct: .372
            }
        }))
        array.push(new franchiseSchema({
            team: "Toronto Blue Jays",
            teamId: array.length,
            league: 0,
            division: "East",
            summary:{
                wins: 48,
                losses: 43,
                record: "48-43",
                streak: "L1",
                gamesBack: 7.0,
                pct: .527
            }
        }))
        array.push(new franchiseSchema({
            team: "Washington Nationals",
            teamId: array.length,
            league: 1,
            division: "East",
            summary:{
                wins: 44,
                losses: 49,
                record: "44-49",
                streak: "W2",
                gamesBack: 6.0,
                pct: .473
            }
        }))
        api.insertMany(array)
        console.log('Database was seeded')
    }
})