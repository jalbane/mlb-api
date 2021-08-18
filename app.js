const express = require('express');
const app = express();
const port = 80;
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
//require('dotenv').config();
var dbConnect;

app.use(cors())
app.get('/', (req, res) =>{
     dbConnect.collection('franchises').find().sort({teamId: 1}).toArray( (err, db) => {
          if (err) {return res.sendStatus(400)};
          if (db.length === 0) {return res.sendStatus(400)}
          return res.json(db)
     })  
})

function getTeamSummary(req, res, next){
     var value = req.params.team.split('-').map( (s) => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase()).join(' ');
     // If user searched for a team by entering a team name ('String' type in database) 
     if (isNaN(value)){
          dbConnect.collection('franchises').findOne({team: value}, (err, result) => {
               if (err) {return res.sendStatus(400)}
               if (result == null){return res.sendStatus(400)}
               return res.json(result)
          })
     }
     next();
}

app.get('/franchise/:team', getTeamSummary, (req, res) => {
     var value = parseInt(req.params.team);
     // If user searched for a team by entering a teamId ('Number' type in database) 
     if (!isNaN(value)){  
          dbConnect.collection('franchises').findOne({teamId: value}, (err, result) => {
               if (err) {return res.sendStatus(400)}
               if (result == null){return res.sendStatus(400)}
               return res.json(result)
          })
     }
})

app.get('/league/:leagueId',  (req, res) => {
     dbConnect.collection('franchises').find({league: parseInt(req.params.leagueId)}).sort({division: 1, "summary.pct": -1}).toArray( (err, db) => {
          if (err) {return res.sendStatus(400)};
          if (db.length === 0) {return res.sendStatus(400)}
          res.json(db)
     })
})

app.get('/league/:leagueId/:division', (req, res) => {
     dbConnect.collection('franchises').find({league: parseInt(req.params.leagueId), division: req.params.division}).sort({"summary.pct": -1}).toArray( (err, db) => {
          if (err) {return res.sendStatus(400)};
          if (db.length === 0) {return res.sendStatus(400)}
          res.json(db)
     })
})

function checkLeagueQuery(req, res, next){
     if (req.query.hasOwnProperty('league')){
          let league = parseInt(req.query.league)     
          
          dbConnect.collection('franchises').find({"summary.gamesBack": parseInt(0), league: league}).sort({"summary.pct": -1}).toArray( (err, db) => {
               if (err) {return res.sendStatus(400)}
               if (db.length === 0) {return res.sendStatus(400)}
               return res.json(db)
          })  
     }
     next();
}

app.get('/league-leaders', checkLeagueQuery, (req, res) => {
     if (req.query.league == undefined){
          dbConnect.collection('franchises').find({"summary.gamesBack": parseInt(0)}).sort({"summary.pct": -1}).toArray( (err, db) => {
               if (err) {return res.sendStatus(400)};
               if (db.length === 0) {return res.sendStatus(400)}
               return res.json(db)
          })
     }
})

app.get('/regular-season', (req, res) => {
     let formatTeamString, divisionGameFlag
     try {
          formatTeamString = req.query.team.split('-')
          formatTeamString = formatTeamString.map( item => {
               return item = item.charAt(0).toUpperCase() + item.substring(1)
          })
          .join(' ')
          divisionGameFlag = req.query.division
     }
     catch (e){
          formatTeamString = /[a-z]/
          divisionGameFlag = false
     }     

     dbConnect.collection('regularSeasonGames').find({$or: [{"winner.name": formatTeamString}, {"loser.name": formatTeamString}]}, {divisionGame: divisionGameFlag} ).toArray( (err, db) => {
          if (err) {return res.sendStatus(400)}
          if (db.length === 0) {return res.sendStatus(400)}
          return res.json(db.reverse())
     })
})

app.get('/regular-season/division-matchups', (req, res) => {
     let formatTeamString = req.query.team.split('-')

     formatTeamString = formatTeamString.map( item => {
         return item = item.charAt(0).toUpperCase() + item.substring(1)
     })
     .join(' ')

     dbConnect.collection('regularSeasonGames').find( {$and: [{divisionGame: true, date: {$gte: new Date(req.query.since)},$or: [{"winner.name": formatTeamString}, {"loser.name": formatTeamString}]}]} ).toArray( (err, db)=>{
          if (err) {return res.sendStatus(404)}
          if (db.length === 0){return res.sendStatus(400)}
          return res.json(db)
     })
})

app.get('/regular-season/wins', (req, res) => { 
     if ( !(req.query.hasOwnProperty('margin')) ){
          return res.json({"Error": "You're missing one or more required query fields. Check for spelling mistakes"})
     }
     let formatTeamString     
     try {
          formatTeamString = req.query.team.split('-')
          formatTeamString = formatTeamString.map( item => {
               return item = item.charAt(0).toUpperCase() + item.substring(1)
          })
          .join(' ')
     }
     catch (e){
          formatTeamString = /[a-z]/
     }

     dbConnect.collection('regularSeasonGames').find({"winner.name": formatTeamString, runDiff: {$gte: parseInt(req.query.margin)}}).toArray( (err, db) => {
          if (err) throw err;
          if (db.length === 0) {return res.json({"error": "No records found matching your preferences"})}
          return res.json({db})
     })
})

MongoClient.connect(process.env.DB_URL, {useUnifiedTopology: true}, (err, result) => {
     if (err) throw err; 
     dbConnect= result.db()
     app.listen(process.env.PORT || port);
})