const players =
JSON.parse(localStorage.getItem("players")) || [];

let selectedPlayers = [];

renderPlayers();

function renderPlayers(){


const container =
document.getElementById("playersContainer");

let html = "";

players.forEach(player => {

    html += `
    <div class="col-6">

        <div
            class="card stat-card player-card"
            onclick="togglePlayer(${player.id})"
            id="player-${player.id}">

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

function togglePlayer(id){


const matchType =
document.getElementById("matchType").value;

const maxPlayers =
matchType === "singles"
? 2
: 4;

const index =
selectedPlayers.indexOf(id);

if(index > -1){

    selectedPlayers.splice(index,1);

}else{

    if(selectedPlayers.length >= maxPlayers){

        alert(
            `Only ${maxPlayers} players allowed`
        );

        return;
    }

    selectedPlayers.push(id);
}

updateSelectionUI();


}

function updateSelectionUI(){


players.forEach(player => {

    const card =
    document.getElementById(
        `player-${player.id}`
    );

    if(!card) return;

    card.classList.remove("selected");

    if(
        selectedPlayers.includes(player.id)
    ){
        card.classList.add("selected");
    }

});


}

function startMatch(){

const winningScore =
parseInt(
    document.getElementById(
        "winningScore"
    ).value
);
const matchType =
document.getElementById("matchType").value;

const matchPlayers =
players.filter(player =>
    selectedPlayers.includes(player.id)
);

if(
   matchType === "singles" &&
    selectedPlayers.length !== 2
){

    alert(
        "Select exactly 2 players"
    );

    return;
}

if(
   matchType === "doubles" &&
    selectedPlayers.length !== 4
){

    alert(
        "Select exactly 4 players"
    );

    return;
}

let currentMatch;

if(
    matchType === "singles"
){
currentMatch = {

    matchType: "singles",

    winningScore: winningScore,

    teamA: [
        matchPlayers[0]
    ],

    teamB: [
        matchPlayers[1]
    ],

    scoreA: 0,
    scoreB: 0,
        date:
        new Date()
        .toLocaleString()

    };

}else{

    currentMatch = {

    matchType: "doubles",

    winningScore: winningScore,

    teamA: [
        matchPlayers[0],
        matchPlayers[1]
    ],

    teamB: [
        matchPlayers[2],
        matchPlayers[3]
    ],

    scoreA: 0,
    scoreB: 0,

        date:
        new Date()
        .toLocaleString()

    };

}

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

    const matchType =
    document.getElementById(
        "matchType"
    ).value;

    const title =
    document.getElementById(
        "selectionTitle"
    );

    if(matchType === "singles"){

        title.textContent =
        "Select 2 Players";

    }else{

        title.textContent =
        "Select 4 Players";

    }

    selectedPlayers = [];

    updateSelectionUI();

});
