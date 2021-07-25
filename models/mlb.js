const mongoose = require('mongoose');


const franchiseSchema = new mongoose.Schema({
    team: String,
    teamId: Number,
    league: Number,
    division: String,
    summary: {
        wins: Number,
        losses: Number,
        record: String,
        streak: String,
        gamesBack: Number,
        pct: Number
    }
})

module.exports = mongoose.model('franchise', franchiseSchema);