const players =
JSON.parse(localStorage.getItem("players")) || [];

const matches =
JSON.parse(localStorage.getItem("matches")) || [];

const params =
new URLSearchParams(window.location.search);

const playerName =
params.get("name");

loadProfile();
function loadProfile(){

    let wins = 0;
    let losses = 0;

    matches.forEach(match => {

        const winnerTeam =
        match.scoreA > match.scoreB
        ? match.teamA
        : match.teamB;

        const loserTeam =
        match.scoreA > match.scoreB
        ? match.teamB
        : match.teamA;

        winnerTeam.forEach(player => {

            if(player.name === playerName){
                wins++;
            }

        });

        loserTeam.forEach(player => {

            if(player.name === playerName){
                losses++;
            }

        });

    });

    const played =
    wins + losses;

    const winRate =
    played > 0
    ? Math.round((wins / played) * 100)
    : 0;

    renderProfile(
        wins,
        losses,
        played,
        winRate
    );
}
function renderProfile(
    wins,
    losses,
    played,
    winRate
){

    let recentMatches = "";

    [...matches]
    .reverse()
    .forEach(match => {

        const participated =

        match.teamA.some(
            p => p.name === playerName
        ) ||

        match.teamB.some(
            p => p.name === playerName
        );

        if(!participated) return;

        const won =

        (match.scoreA > match.scoreB &&
         match.teamA.some(
            p => p.name === playerName
         ))

        ||

        (match.scoreB > match.scoreA &&
         match.teamB.some(
            p => p.name === playerName
         ));

        recentMatches += `
            <li class="list-group-item">
                ${won ? '✅' : '❌'}
                ${match.scoreA} - ${match.scoreB}
                <br>
                <small>${match.date}</small>
            </li>
        `;
    });

    document.getElementById(
        "playerProfile"
    ).innerHTML = `

    <div class="card stat-card">

        <div class="card-body">

            <h2>👤 ${playerName}</h2>

            <hr>

            <h5>🏸 Matches Played: ${played}</h5>

            <h5>🏆 Wins: ${wins}</h5>

            <h5>❌ Losses: ${losses}</h5>

            <h5>📈 Win Rate: ${winRate}%</h5>

        </div>

    </div>

    <div class="card stat-card mt-4">

        <div class="card-body">

            <h4>Recent Matches</h4>

            <ul class="list-group">

                ${recentMatches || `
                <li class="list-group-item">
                    No matches found
                </li>`}

            </ul>

        </div>

    </div>
    `;
}