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
    
    try{ 
        //try variable assignment
        var tempStreak = currentStreak.charAt(0);
        var tempNumber = parseInt(currentStreak.substring(1));
    } catch(e){
        if (currentStreak instanceof TypeError){
            if (message === "winner"){
                return "W1"
            }
            if (message === "loser"){
                return "L1"
            }
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

    //currently on a losing streak and lost their last game.
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
    return (console.log(string))
}

function processLeader(result, api){
    let teamName = result[0].team
    //api.updateOne({team: teamName}, {$set: {"summary.gamesBack": 0}})

    let winDiff, lossDiff, i, gamesBack
    i = 1;
    while (i < result.length){
        teamName = result[i].team
        winDiff = result[0].summary.wins - result[i].summary.wins
        lossDiff = Math.abs(result[0].summary.losses - result[i].summary.losses)
        gamesBack = parseFloat(((winDiff+lossDiff)/2).toFixed(1))
        //api.updateOne({team: teamName}, {$set: {"summary.gamesBack": gamesBack}})
        //console.log(teamName, "updated gamesback to", gamesBack)
        i++;
    }
}

var readFile = fs.createReadStream('./Input/input.csv')
.pipe(csv())
.on('data', (data) => {
    readFile.pause()
    var [victor, loser]= data[0].split('vs')
    victor = victor.trimEnd().trimStart()
    loser = loser.trimEnd().trimStart()

    if (data.length !== 9){
        console.log('csv input is incorrect')
        process.exit(1)
    }
    MongoClient.connect(process.env.DB_URL, {useUnifiedTopology: true}, (err, res)=> {
        
        if (err) throw err;
        var api = res.db('MLB').collection('franchises')
        var gameApi = res.db('MLB').collection('regularSeasonGames')
        api.findOne( {team: victor}, (err, result) => {
            if (err) throw err;
            try {
                let data = result.summary
                calcRecord(data.record, "winner")
            } catch (e){
                if(e instanceof TypeError){
                    console.log('error finding winner', victor)
                }
            }

        })
        api.findOne( {team: loser}, (err, result) => {
            if (err) throw err;
            try {
                let data = result.summary
                calcRecord(data.record, "loser")
                console.log(victor, 'defeated', loser)
            } catch (e){
                if(e instanceof TypeError){
                    console.log('error finding loser', loser)
                }
            }
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
            runDiff: data[3] - data[4]
        })
        console.log('what to insert: ',obj)
        readFile.resume()
    })
    
})
.on('end', () => setTimeout( () => {
    readFile.destroy();
    process.exit(1);
}, 10000 ))