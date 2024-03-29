const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
    
let date = new Date().getFullYear()

function processLeader(result, api){
    let teamName = result[0].team
    api.updateOne({season: date, team: teamName}, {$set: {"gamesBack": 0}})
    console.log(result[0].team)
    let winDiff, lossDiff, i, gamesBack
    i = 1;
    while (i < result.length){
        teamName = result[i].team
        winDiff = Math.abs(result[0].wins - result[i].wins)
        lossDiff = Math.abs(result[0].losses - result[i].losses)
        gamesBack = parseFloat(((winDiff+lossDiff)/2).toFixed(1))
        api.updateOne({season: date, team: teamName}, {$set: {"gamesBack": gamesBack}})
        i++;
    }
}

MongoClient.connect(process.env.DB_URL, {useUnifiedTopology: true},  async (err, res)=> {
    var api = res.db('MLB').collection('franchises')
    let arr = []
    let value
    value = api.find( {season: date, league: 1,division: "East"} ).sort({"pct": -1, wins: -1})
    while(await value.hasNext()){
        arr.push(await value.next())
    }
    processLeader(arr, api)
    arr = []

    value = api.find( {season: date, league: 1,division: "Central"} ).sort({"pct": -1, wins: -1})
    while(await value.hasNext()){
        arr.push(await value.next())
    }
    processLeader(arr, api)
    arr = []

    value = api.find( {season: date, league: 1,division: "West"} ).sort({"pct": -1, wins: -1})
    while(await value.hasNext()){
        arr.push(await value.next())
    }
    processLeader(arr, api)
    arr = []
    
    value = api.find( {season: date, league: 0,division: "East"} ).sort({"pct": -1, wins: -1})
    while(await value.hasNext()){
        arr.push(await value.next())
    }
    processLeader(arr, api)
    arr = []

    value = api.find( {season: date, league: 0,division: "Central"} ).sort({"pct": -1, wins: -1})
    while(await value.hasNext()){
        arr.push(await value.next())
    }
    processLeader(arr, api)
    arr = []

    value = api.find( {season: date, league: 0,division: "West"} ).sort({"pct": -1, wins: -1})
    while(await value.hasNext()){
        arr.push(await value.next())
    }
    processLeader(arr, api)
})