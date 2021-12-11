const mongoose = require('mongoose');


const regSeasonGames = new mongoose.Schema({
    winner: {
        name: String,
        runs: Number,
    },
    loser: {
        name: String,
        runs: Number,
    },
    stadium: String,
    date: Date,
    victorRuns: Number,
    loserRuns: Number,
    makeUpGame: Boolean,
    divisionGame: Boolean,
    interleagueGame: Boolean,
    runDiff: Number,
    season: Number
})

module.exports = mongoose.model('regSeasonGames', regSeasonGames);