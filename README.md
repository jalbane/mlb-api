# MLB API

## Get requests
### 'https://api-mlb.herokuapp.com/'
    - Takes no queries or parameters.
    - Will return general information as well as performance information about every Major League Baseball team such as:
        - Name, Team ID(Unique number identifier), League and a summary of the teams performance (record, wins/losses, etc.))

### 'https://api-mlb.herokuapp.com/franchise/:team'
    - Required parameter: A route parameter for a specific team is required.
    - Valid paramaters are a teams name(not case-sensitive) seperated by hyphens, or a valid Team ID number(0-29).
    - Examples: 
        - 'https://api-mlb.herokuapp.com/franchise/Arizona-Diamondbacks'
        - 'https://api-mlb.herokuapp.com/franchise/0' (Team ID of 0 corresponds to the Arizona Diamondbacks)
    - Will return general and performance information about the specified MLB franchise

### '/league/:leagueId'
    - Required parameter: A route parameter for a specific league is required(0 or 1).
    - Valid parameters are the numbers 0 or 1, to denote American League and National League respectively.
    - Examples: 
        - 'https://api-mlb.herokuapp.com/league/0'
    - Returns information about every team that plays in the specified league.
        - Results are sorted by division(Central, East, West) and win percentage(Descending order).

### '/league/:leagueId/:division'
    - Required parameters: A specific league ID is required, and a division is required.
    - Valid parameters are a leagueID(0 or 1), and a case sensitive string denoting the division(Central, East, or West)
    - Examples: 
        - 'https://api-mlb.herokuapp.com/league/0/Central'
    - Returns info about the 5 teams that play under the specified leagueID and division name.

### '/league-leaders'
    - Takes no queries or parameters
    - Examples:
        - 'https://api-mlb.herokuapp.com/league-leaders'
    - Returns info about 6 teams that are in first place in their division/league. (3 teans from American League and 3 teams from National League)

### '/league-leaders/:leagueId'
    - Required parameters: A route parameter for a specific league is required(0 or 1).
    - Valid parameters are the numbers 0 or 1, to denote American League and National League respectively.
    - Examples: 
        - 'https://api-mlb.herokuapp.com/league-leaders/0'
    - Returns info about 3 teams that are in first place in the specified league.