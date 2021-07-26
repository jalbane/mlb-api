const express = require('express');
const app = express();
const port = 80;
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
//require('dotenv').config();

app.use(cors())

app.get('/', (req, res) =>{
     MongoClient.connect(process.env.DB_URL, async (err, result) =>{
          if (err) throw new err;     
          result.db('MLB').collection('franchises').find().toArray()
               .then(result => res.json(result))
               .catch(err => console.log (err))
     })
})

function getTeamSummary(req, res, next){
     var value = req.params.team.split('-').map( (s) => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase()).join(' ');
     if (isNaN(value)){
          MongoClient.connect(process.env.DB_URL, async (err, result) =>{
               if (err) throw new err;     
               result.db('MLB').collection('franchises').findOne({team: value}, (err, result) => {
                    if (err) {return res.sendStatus(400)}
                    if (result == null){return res.sendStatus(400)}
                    return res.json(result)
               })
          })
     }
     next();
}

app.get('/franchise/:team', getTeamSummary, (req, res) => {
     var value = parseInt(req.params.team);
     if (!isNaN(value)){
          MongoClient.connect(process.env.DB_URL, async (err, result) =>{
               if (err) throw new err;     
               result.db('MLB').collection('franchises').findOne({teamId: value}, (err, result) => {
                    if (err) {return res.sendStatus(400)}
                    if (result == null){return res.sendStatus(400)}
                    return res.json(result)
               })
          })
     }
})

app.get('/league/:leagueId',  (req, res) => {
     MongoClient.connect(process.env.DB_URL, async (err, result) => {
          if (err) throw err;
          result.db('MLB').collection('franchises').find({league: parseInt(req.params.leagueId)}).sort({division: 1, "summary.pct": -1}).toArray( (err, db) => {
               if (err) {return res.sendStatus(400)};
               if (db.length === 0) {return res.sendStatus(400)}
               res.json(db)
          })
          
     })
})

app.get('/league/:leagueId/:division', (req, res) => {
     MongoClient.connect(process.env.DB_URL, async (err, result) => {
          if (err) throw err;
          result.db('MLB').collection('franchises').find({league: parseInt(req.params.leagueId), division: req.params.division}).sort({"summary.pct": -1}).toArray( (err, db) => {
               if (err) {return res.sendStatus(400)};
               if (db.length === 0) {return res.sendStatus(400)}
               res.json(db)
          })
          
     })
})

app.get('/league-leaders/:leagueId', (req, res) => {
     MongoClient.connect(process.env.DB_URL, async (err, result) => {
          if (err) throw err;
          result.db('MLB').collection('franchises').find({league: parseInt(req.params.leagueId), "summary.gamesBack": parseInt(0)}).sort({"summary.pct": -1}).toArray( (err, db) => {
               if (err) {return res.sendStatus(400)};
               if (db.length === 0) {return res.sendStatus(400)}
               res.json(db)
          })
          
     })
})

app.get('/league-leaders', (req, res) => {
     MongoClient.connect(process.env.DB_URL, async (err, result) => {
          if (err) throw err;
          result.db('MLB').collection('franchises').find({"summary.gamesBack": parseInt(0)}).sort({"summary.pct": -1}).toArray( (err, db) => {
               if (err) {return res.sendStatus(400)};
               if (db.length === 0) {return res.sendStatus(400)}
               res.json(db)
          })
     })
})

app.listen(process.env.PORT || port);