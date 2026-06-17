let players =
JSON.parse(localStorage.getItem("players")) || [];

renderPlayers();

function addPlayer(){


let name =
document.getElementById("playerName")
.value
.trim();

if(name === "") return;

players.push({
    id: Date.now(),
    name: name,
    wins: 0,
    losses: 0
});

localStorage.setItem(
    "players",
    JSON.stringify(players)
);

document.getElementById(
    "playerName"
).value = "";

renderPlayers();


}

function deletePlayer(id){


if(!confirm("Delete this player?")){
    return;
}

players = players.filter(
    player => player.id !== id
);

localStorage.setItem(
    "players",
    JSON.stringify(players)
);

renderPlayers();


}

function renderPlayers(){


let html = "";

players.forEach(player => {

    html += `
    <div class="card stat-card mb-3">

        <div class="card-body d-flex justify-content-between align-items-center">

            <div>

                <a
                    href="player.html?name=${encodeURIComponent(player.name)}"
                    class="text-white text-decoration-none">

                    <h5 class="mb-0">
                        👤 ${player.name}
                    </h5>

                </a>

            </div>

            <button
                class="btn btn-danger btn-sm"
                onclick="deletePlayer(${player.id})">

                Delete

            </button>

        </div>

    </div>
    `;
});

document.getElementById(
    "playerList"
).innerHTML = html;


}
