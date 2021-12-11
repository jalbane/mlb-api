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
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
        }))
        array.push(new franchiseSchema({
            team: "Atlanta Braves",
            teamId: array.length,
            league: 1,
            division: "East",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
        }))
        array.push(new franchiseSchema({
            team: "Baltimore Orioles",
            teamId: array.length,
            league: 0,
            division: "East",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "Boston Red Sox",
            teamId: array.length,
            league: 0,
            division: "East",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "Chicago White Sox",
            teamId: array.length,
            league: 0,
            division: "Central",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "Chicago Cubs",
            teamId: array.length,
            league: 1,
            division: "Central",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "Cincinnati Reds",
            teamId: array.length,
            league: 1,
            division: "Central",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "Cleveland Indians",
            teamId: array.length,
            league: 0,
            division: "Central",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "Colorado Rockies",
            teamId: array.length,
            league: 1,
            division: "West",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "Detroit Tigers",
            teamId: array.length,
            league: 0,
            division: "Central",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
        
        }))
        array.push(new franchiseSchema({
            team: "Houston Astros",
            teamId: array.length,
            league: 0,
            division: "West",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "Kansas City Royals",
            teamId: array.length,
            league: 0,
            division: "Central",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "Los Angeles Angels",
            teamId: array.length,
            league: 0,
            division: "West",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "Los Angeles Dodgers",
            teamId: array.length,
            league: 1,
            division: "West",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "Miami Marlins",
            teamId: array.length,
            league: 1,
            division: "East",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "Milwaukee Brewers",
            teamId: array.length,
            league: 1,
            division: "Central",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "Minnesota Twins",
            teamId: array.length,
            league: 0,
            division: "Central",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "New York Mets",
            teamId: array.length,
            league: 1,
            division: "East",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "New York Yankees",
            teamId: array.length,
            league: 0,
            division: "East",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
        }))
        array.push(new franchiseSchema({
            team: "Oakland Athletics",
            teamId: array.length,
            league: 0,
            division: "West",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
        }))
        array.push(new franchiseSchema({
            team: "Philadelphia Phillies",
            teamId: array.length,
            league: 1,
            division: "East",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "Pittsburgh Pirates",
            teamId: array.length,
            league: 1,
            division: "Central",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "San Diego Padres",
            teamId: array.length,
            league: 1,
            division: "West",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "San Francisco Giants",
            teamId: array.length,
            league: 1,
            division: "West",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "Seattle Mariners",
            teamId: array.length,
            league: 0,
            division: "West",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "St. Louis Cardinals",
            teamId: array.length,
            league: 1,
            division: "Central",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "Tampa Bay Rays",
            teamId: array.length,
            league: 0,
            division: "East",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "Texas Rangers",
            teamId: array.length,
            league: 0,
            division: "West",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "Toronto Blue Jays",
            teamId: array.length,
            league: 0,
            division: "East",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        array.push(new franchiseSchema({
            team: "Washington Nationals",
            teamId: array.length,
            league: 1,
            division: "East",
            wins: 0,
            losses: 0,
            record: "0-0",
            streak: "W0",
            gamesBack: 0.0,
            pct: .000
            
        }))
        api.insertMany(array)
        console.log('Database was seeded')
    }
})