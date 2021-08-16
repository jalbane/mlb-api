const MongoClient = require('mongodb').MongoClient;
const regSeasonGames = require('../models/regSeasonGames.js');
require('dotenv').config();

MongoClient.connect(process.env.DB_URL, {useUnifiedTopology: true}, async (err, res)=> {
    if (err) throw err;
    var api = res.db('MLB').collection('regularSeasonGames')
    
    api.updateMany({}, [{$unset: 
        "loserRuns"
    }],
    {multi: true})
})