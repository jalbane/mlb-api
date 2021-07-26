const mongoose = require('mongoose');


const franchiseSchema = new mongoose.Schema({
    team: String,
    teamId: Number,
    league: Number,
    division: String,
    summary: {
        wins: Number,
        losses: Number,
        record: String, //default should be "0-0"
        streak: String, //default can be empty string or W0 or L0
        gamesBack: Number,
        pct: Number
    }
})

module.exports = mongoose.model('franchise', franchiseSchema);