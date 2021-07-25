const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

function processLeader(result, api){
    let teamName = result[0].team
    api.updateOne({team: teamName}, {$set: {"summary.gamesBack": 0}})

    let winDiff, lossDiff, i, gamesBack
    i = 1;
    while (i < result.length){
        teamName = result[i].team
        winDiff = result[0].summary.wins - result[i].summary.wins
        lossDiff = Math.abs(result[0].summary.losses - result[i].summary.losses)
        gamesBack = parseFloat(((winDiff+lossDiff)/2).toFixed(1))
        api.updateOne({team: teamName}, {$set: {"summary.gamesBack": gamesBack}})
        i++;
    }
}

MongoClient.connect(process.env.DB_URL, {useUnifiedTopology: true},  async (err, res)=> {
    var api = res.db('MLB').collection('franchises')
    let arr = []
    let value
    value = api.find( {league: 1,division: "East"} ).sort({"summary.pct": -1})
    while(await value.hasNext()){
        arr.push(await value.next())
    }
    processLeader(arr, api)
    arr = []

    value = api.find( {league: 1,division: "Central"} ).sort({"summary.pct": -1})
    while(await value.hasNext()){
        arr.push(await value.next())
    }
    processLeader(arr, api)
    arr = []

    value = api.find( {league: 1,division: "West"} ).sort({"summary.pct": -1})
    while(await value.hasNext()){
        arr.push(await value.next())
    }
    processLeader(arr, api)
    arr = []
    
    value = api.find( {league: 0,division: "East"} ).sort({"summary.pct": -1})
    while(await value.hasNext()){
        arr.push(await value.next())
    }
    processLeader(arr, api)
    arr = []

    value = api.find( {league: 0,division: "Central"} ).sort({"summary.pct": -1})
    while(await value.hasNext()){
        arr.push(await value.next())
    }
    processLeader(arr, api)
    arr = []

    value = api.find( {league: 0,division: "West"} ).sort({"summary.pct": -1})
    while(await value.hasNext()){
        arr.push(await value.next())
    }
    processLeader(arr, api)
})