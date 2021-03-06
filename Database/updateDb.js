const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const fs = require('fs')
const csv = require('csv-parse')
const regSeasonGames = require('../models/regSeasonGames.js');

function calcPercentage(wins, losses){
    return (wins/(wins+losses))
}

function calcStreak(currentStreak, message){
    /************ 
    * If a franchise has not yet recorded a single game (ie. opening day of the regular season/start of postseason),
    * this should help avoid any bugs if the database has not been seeded correctly.
    */    
    let tempStreak
    let tempNumber

    if (currentStreak){ 
        //check for truthy function parameter before variable assignment
        tempStreak = currentStreak.charAt(0);
        tempNumber = parseInt(currentStreak.substring(1));
    }

        //check for empty string
    if (currentStreak === ""){
        if (message === "winner"){
            return "W1"
        }
        if (message === "loser"){
            return "L1"
        }
    }

    //evaluate if currently on a win streak and won their last game.
    if (tempStreak === "W" && message === "winner"){
        if (tempNumber >= 0){
            tempNumber += 1;
        }
    }

    //evaluate if lost a win streak.
    else if (tempStreak === "W" && message === "loser"){
        tempStreak = "L"
        tempNumber = 1
    }

    //evaluate if snapped a losing streak.
    else if (tempStreak === "L" && message === "winner"){
        tempStreak = "W"
        tempNumber = 1
    }

    //evaluate currently on a losing streak and lost their last game.
    else if (tempStreak === "L" && message === "loser"){
        if (tempNumber >= 0){
            tempNumber += 1;
        }
    }

    tempNumber = tempNumber.toString()
    return (tempStreak.concat(tempNumber))
}

function calcRecord(currentRecord, message){
    let string = currentRecord;
    let [string1, string2] = string.split("-")
    if (message === "winner"){
        string1 = parseInt(string1);
        string1 +=1;
        string1 = string1.toString();
    }
    if (message === "loser"){
        string2 = parseInt(string2);
        string2 += 1;
        string2 = string2.toString();
    }
    string = [string1, string2].join("-")
    return string;
}
var readFile = fs.createReadStream('./Input/input.csv')
.pipe(csv())
.on('data', (data) => {
    readFile.pause();
    var [victor, loser]= data[0].split('vs')
    victor = victor.trimEnd().trimStart()
    loser = loser.trimEnd().trimStart()
    
    MongoClient.connect(process.env.DB_URL, {useUnifiedTopology: true}, (err, res)=> {
        if (err) throw err;
        var api = res.db('MLB').collection('franchises')
        var gameApi = res.db('MLB').collection('regularSeasonGames')
        console.log(victor, 'defeated', loser)
        //winning team updates
        api.updateOne( {season: Number(data[2].split('-')[2]), team: victor}, {$inc: {"wins": 1} } );
        api.findOne( {season: Number(data[2].split('-')[2]), team: victor}, (err, result) => {
            if (err) throw err;
            //calculate winning teams record
            let newRecord = calcRecord(result.record, "winner");
            api.updateOne({season: Number(data[2].split('-')[2]), team: victor}, {$set: {"record": newRecord}})

            //calculate the winning teams new win percentage & update it.
            let winPercentage = calcPercentage(result.wins, result.losses)
            winPercentage = parseFloat(winPercentage.toFixed(3))
            api.updateOne({season: Number(data[2].split('-')[2]), team: victor}, {$set: {"pct": winPercentage}})

            //calculate winning teams 10-game streak.
            let streak = calcStreak(result.streak, "winner")
            api.updateOne({season: Number(data[2].split('-')[2]), team: victor}, {$set: {"streak": streak}})
        })

        //losing team updates
        api.updateOne( {season: Number(data[2].split('-')[2]), team: loser}, {$inc: {"losses": 1} } );
        api.findOne( {season: Number(data[2].split('-')[2]), team: loser}, (err, result) => {
            if (err) throw err;
            //calculate losing teams record
            let newRecord = calcRecord(result.record, "loser");
            api.updateOne({season: Number(data[2].split('-')[2]), team: loser}, {$set: {"record": newRecord}})

            //calculate the losing teams new win percentage & update it.
            let winPercentage = calcPercentage(result.wins, result.losses)
            winPercentage = parseFloat(winPercentage.toFixed(3))
            api.updateOne({season: Number(data[2].split('-')[2]), team: loser}, {$set: {"pct": winPercentage}})

            //calculate losing teams 10-game streak.
            let streak = calcStreak(result.streak, "loser")
            api.updateOne({season: Number(data[2].split('-')[2]), team: loser}, {$set: {"streak": streak}})
        })

        let obj = new regSeasonGames({
            winner: {
                name: victor,
                runs: data[3]
            },
            loser: {
                name: loser,
                runs: data[4]
            },
            stadium: data[1].trimEnd().trimStart(),
            date: data[2],
            makeUpGame: parseInt(data[5]),
            divisionGame: parseInt(data[6]),
            interleagueGame: parseInt(data[7]),
            runDiff: data[3] - data[4],
            season: data[2].split('-')[2]
        })
        let array = new Array(obj)
        gameApi.insertMany(array)
        readFile.resume()
    })
})
.on('end', () => setTimeout(()=> {
    readFile.destroy();
    process.exit(1)
},15000))