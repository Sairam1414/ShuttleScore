const players =
JSON.parse(localStorage.getItem("players")) || [];

const matches =
JSON.parse(localStorage.getItem("matches")) || [];

calculateLeaderboard();
function calculateLeaderboard(){

    let stats = {};

    players.forEach(player => {

        stats[player.name] = {

            name: player.name,
            wins: 0,
            losses: 0,
            played: 0
        };
    });

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

            stats[player.name].wins++;
            stats[player.name].played++;

        });

        loserTeam.forEach(player => {

            stats[player.name].losses++;
            stats[player.name].played++;

        });

    });

    renderLeaderboard(stats);
}
function renderLeaderboard(stats){

    const container =
    document.getElementById(
        "leaderboardContainer"
    );

    let ranking =
    Object.values(stats);

    ranking.sort((a,b) => b.wins - a.wins);

    let html = "";

    ranking.forEach((player,index) => {

        const winRate =
        player.played > 0
        ? Math.round(
            player.wins /
            player.played * 100
        )
        : 0;

        let medal = "";

        if(index === 0)
            medal = "🥇";

        if(index === 1)
            medal = "🥈";

        if(index === 2)
            medal = "🥉";

        html += `
        <div class="card stat-card mb-3">

            <div class="card-body">

                <div class="d-flex justify-content-between">

                    <h4>
                        ${medal}
                       <a
href="player.html?name=${encodeURIComponent(player.name)}"
class="text-white text-decoration-none">

${player.name}

</a>
                    </h4>

                    <h5>
                        #${index + 1}
                    </h5>

                </div>

                <p>
                    Played: ${player.played}
                    <br>

                    Wins: ${player.wins}
                    <br>

                    Losses: ${player.losses}
                    <br>

                    Win Rate: ${winRate}%
                </p>

            </div>

        </div>
        `;
    });

    container.innerHTML = html;
}
