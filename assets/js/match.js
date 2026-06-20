const players =
JSON.parse(
localStorage.getItem("players")
) || [];

let teamA = [];
let teamB = [];

let selectedPlayerId = null;
const maxPlayers =
document.getElementById(
    "matchType"
).value === "singles"
? 1
: 2;

document.getElementById(
    "teamATitle"
).textContent =
`🏸 Team A (${teamA.length}/${maxPlayers})`;

document.getElementById(
    "teamBTitle"
).textContent =
`🏸 Team B (${teamB.length}/${maxPlayers})`;
renderPlayers();
renderTeams();

function renderPlayers(){

const container =
document.getElementById(
    "playersContainer"
);

let html = "";

const assignedIds = [

    ...teamA.map(
        player => player.id
    ),

    ...teamB.map(
        player => player.id
    )

];

players
.filter(
    player =>
    !assignedIds.includes(
        player.id
    )
)
.forEach(player => {

    html += `
    <div class="col-6">

        <div
            class="card stat-card player-card"
            onclick="selectPlayer(${player.id})">

            <div class="card-body text-center">

                <div class="player-name">
                    ${player.name}
                </div>

            </div>

        </div>

    </div>
    `;

});

container.innerHTML = html;


}

function selectPlayer(id){


selectedPlayerId = id;

const modal =
new bootstrap.Modal(
    document.getElementById(
        "teamModal"
    )
);

modal.show();


}

function assignTeam(team){


const player =
players.find(
    p => p.id === selectedPlayerId
);

if(!player) return;

teamA =
teamA.filter(
    p => p.id !== player.id
);

teamB =
teamB.filter(
    p => p.id !== player.id
);

const matchType =
document.getElementById(
    "matchType"
).value;

const maxPlayers =
matchType === "singles"
? 1
: 2;

if(
    team === "A" &&
    teamA.length >= maxPlayers
){

    alert(
        "Team A is full"
    );

    return;

}

if(
    team === "B" &&
    teamB.length >= maxPlayers
){

    alert(
        "Team B is full"
    );

    return;

}

if(team === "A"){

    teamA.push(player);

}else{

    teamB.push(player);

}

renderTeams();

bootstrap.Modal
.getInstance(
    document.getElementById(
        "teamModal"
    )
)
.hide();


}
function removePlayer(id){


teamA =
teamA.filter(
    player =>
    player.id !== id
);

teamB =
teamB.filter(
    player =>
    player.id !== id
);

renderTeams();

}

function renderTeams(){


document.getElementById(
    "teamAPlayers"
).innerHTML =

teamA.length
? teamA.map(
player => ` <span
     class="badge rounded-pill px-3 py-2 me-2 mb-2"
     style="
         background:#2563eb;
         cursor:pointer;
         font-size:14px;
         font-weight:600;
     "
     onclick="removePlayer(${player.id})">


    ${player.name} ✕

</span>
`


).join("")
: "<p>No players selected</p>";




document.getElementById(
    "teamBPlayers"
).innerHTML =

teamB.length
? teamB.map(
player => ` <span
     class="badge rounded-pill px-3 py-2 me-2 mb-2"
     style="
         background:#22c55e;
         cursor:pointer;
         font-size:14px;
         font-weight:600;
     "
     onclick="removePlayer(${player.id})">


    ${player.name} ✕

</span>
`


).join("")
: "<p>No players selected</p>";


const maxPlayers =
document.getElementById(
    "matchType"
).value === "singles"
? 1
: 2;

document.getElementById(
    "teamATitle"
).textContent =
`🏸 Team A (${teamA.length}/${maxPlayers})`;

document.getElementById(
    "teamBTitle"
).textContent =
`🏸 Team B (${teamB.length}/${maxPlayers})`;

renderPlayers();


}

function startMatch(){


const winningScore =
parseInt(
    document.getElementById(
        "winningScore"
    ).value
);

const matchType =
document.getElementById(
    "matchType"
).value;

if(
    matchType === "singles" &&
    (
        teamA.length !== 1 ||
        teamB.length !== 1
    )
){

    alert(
        "Select 1 player for each team"
    );

    return;

}

if(
    matchType === "doubles" &&
    (
        teamA.length !== 2 ||
        teamB.length !== 2
    )
){

    alert(
        "Select 2 players for each team"
    );

    return;

}

const currentMatch = {

    matchType: matchType,

    winningScore: winningScore,

    teamA: teamA,

    teamB: teamB,

    scoreA: 0,
    scoreB: 0,

    date:
    new Date()
    .toLocaleString()

};

localStorage.setItem(
    "currentMatch",
    JSON.stringify(currentMatch)
);

window.location.href =
"scoreboard.html";


}

document
.getElementById("matchType")
.addEventListener("change", () => {


teamA = [];
teamB = [];

renderTeams();


});
