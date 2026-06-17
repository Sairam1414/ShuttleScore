let editingMatchIndex = null;
const matches =
JSON.parse(
localStorage.getItem("matches")
) || [];

matches.forEach(match => {


if(!match.sessionDate){

    match.sessionDate =
    match.date
    ? new Date(match.date)
        .toLocaleDateString()
    : "Unknown";

}


});
function getSessionSummary(sessionDate){


const sessionMatches =
matches.filter(match =>
    match.sessionDate === sessionDate
);

let wins = {};

sessionMatches.forEach(match => {

    const winnerTeam =
    match.scoreA > match.scoreB
    ? match.teamA
    : match.teamB;

    winnerTeam.forEach(player => {

        if(!wins[player.name]){

            wins[player.name] = 0;

        }

        wins[player.name]++;

    });

});

let champion = "-";
let maxWins = 0;

Object.keys(wins).forEach(name => {

    if(wins[name] > maxWins){

        maxWins = wins[name];
        champion = name;

    }

});

return {
    matches: sessionMatches.length,
    champion: champion
};


}

renderHistory();

function renderHistory() {


const container =
document.getElementById(
    "historyContainer"
);

if (matches.length === 0) {

    container.innerHTML = `
        <div class="alert alert-info">
            No matches found
        </div>
    `;

    return;
}

let html = "";

const reversedMatches =
[...matches].reverse();

let lastSession = "";


reversedMatches.forEach((match, index) => {

    const originalIndex =
    matches.length - 1 - index;

    const winnerTeam =
    match.scoreA > match.scoreB
    ? (match.teamA || [])
    : (match.teamB || []);

    const winnerNames =
    winnerTeam
    .map(player => player?.name || "Unknown")
    .join(" & ");
if(match.sessionDate !== lastSession){


lastSession =
match.sessionDate;

const summary =
getSessionSummary(
match.sessionDate
);

html += `

<div class="card stat-card mb-3">


<div class="card-body">

    <h4>
        📅 ${match.sessionDate}
    </h4>

    <p class="mb-1">
        🏸 Matches:
        ${summary.matches}
    </p>

    <p class="mb-0">
        🏆 Session Champion:
        ${summary.champion}
    </p>

</div>


</div>
`;


}

    html += `
    <div class="card stat-card mb-3">

        <div class="card-body">

            <h5>
                ${(match.teamA || [])
                .map(player => player?.name || "Unknown")
                .join(" & ")}
            </h5>

            <div class="fs-3 fw-bold my-2">
                ${match.scoreA} - ${match.scoreB}
            </div>

            <h5>
                ${(match.teamB || [])
                .map(player => player?.name || "Unknown")
                .join(" & ")}
            </h5>

            <div class="mt-2 mb-2">
                <span class="badge bg-success fs-6">
                    🏆 Winner: ${winnerNames}
                </span>
            </div>

            <p class="text-secondary mt-2">
                ${match.date || "No Date"}
            </p>

           <div class="d-flex gap-2 mt-3">

    <button
        class="btn btn-success btn-sm"
        onclick="rematch(${originalIndex})">

        🔄 Rematch

    </button>

    <button
        class="btn btn-primary btn-sm"
        onclick="shareMatch(${originalIndex})">

        📤 Share

    </button>
    <button
    class="btn btn-warning btn-sm"
    onclick="editMatch(${originalIndex})">

    ✏️ Edit

</button>

    <button
        class="btn btn-danger btn-sm"
        onclick="deleteMatch(${originalIndex})">

        🗑 Delete

    </button>

</div>

        </div>

    </div>
    `;
});

container.innerHTML = html;


}

function deleteMatch(index) {


if (!confirm("Delete this match?")) {
    return;
}

matches.splice(index, 1);

localStorage.setItem(
    "matches",
    JSON.stringify(matches)
);

renderHistory();


}
function rematch(index){

    const oldMatch =
    matches[index];

    const newMatch = {

        matchType:
        oldMatch.matchType || "doubles",

        teamA:
        oldMatch.teamA,

        teamB:
        oldMatch.teamB,

        scoreA: 0,
        scoreB: 0,

        date:
        new Date()
        .toLocaleString()

    };
     if(!confirm(
        "Start a rematch with the same players?"
    )){
        return;
    }

    localStorage.setItem(
        "currentMatch",
        JSON.stringify(newMatch)
    );

    window.location.href =
    "scoreboard.html";
}
function shareMatch(index){

    const match =
    matches[index];

    const teamA =
    match.teamA
    .map(player => player.name)
    .join(" & ");

    const teamB =
    match.teamB
    .map(player => player.name)
    .join(" & ");

    const winner =
    match.scoreA > match.scoreB
    ? teamA
    : teamB;

    const message =

`🏸 ShuttleScore

${teamA}
${match.scoreA}

VS

${teamB}
${match.scoreB}

🏆 Winner:
${winner}

📅 ${match.date}`;

    if(
        navigator.share
    ){

        navigator.share({
            title: "ShuttleScore",
            text: message
        });

    }else{

        navigator.clipboard
        .writeText(message);

        alert(
            "Result copied to clipboard"
        );

    }
}
function editMatch(index){


editingMatchIndex = index;

const match =
matches[index];

document.getElementById(
    "editScoreA"
).value =
match.scoreA;

document.getElementById(
    "editScoreB"
).value =
match.scoreB;

const modal =
new bootstrap.Modal(
    document.getElementById(
        "editMatchModal"
    )
);

modal.show();


}
function saveEditedMatch(){


const match =
matches[editingMatchIndex];

match.scoreA =
parseInt(
    document.getElementById(
        "editScoreA"
    ).value
);

match.scoreB =
parseInt(
    document.getElementById(
        "editScoreB"
    ).value
);

if(
    isNaN(match.scoreA) ||
    isNaN(match.scoreB)
){

    alert("Invalid score");

    return;
}

localStorage.setItem(
    "matches",
    JSON.stringify(matches)
);

bootstrap.Modal
.getInstance(
    document.getElementById(
        "editMatchModal"
    )
)
.hide();

renderHistory();


}

