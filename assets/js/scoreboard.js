let match =
JSON.parse(
    localStorage.getItem("currentMatch")
);

let lastAction = null;

loadMatch();

function loadMatch(){


document.getElementById("teamA")
.innerHTML =
match.teamA
.map(player => player.name)
.join("<br>");

document.getElementById("teamB")
.innerHTML =
match.teamB
.map(player => player.name)
.join("<br>");

updateScore();


}

function updateScore(){

    document.getElementById("scoreA")
    .textContent = match.scoreA;

    document.getElementById("scoreB")
    .textContent = match.scoreB;

    localStorage.setItem(
        "currentMatch",
        JSON.stringify(match)
    );

    checkWinner();
}
function addPointA(){

    match.scoreA++;

    lastAction = "A";

    updateScore();
}

function addPointB(){

    match.scoreB++;

    lastAction = "B";

    updateScore();
}
function undoPoint(){

    if(lastAction === "A" && match.scoreA > 0){

        match.scoreA--;

    }

    if(lastAction === "B" && match.scoreB > 0){

        match.scoreB--;

    }

    updateScore();
}
function checkWinner(){

    const settings =
    JSON.parse(
        localStorage.getItem("settings")
    ) || {

        winningScore:21,
        winBy:2

    };

    if(
        match.scoreA >= match.winningScore &&
        match.scoreA - match.scoreB >= settings.winBy
    ){

        finishMatch();

    }

    if(
       match.scoreB >= match.winningScore &&
        match.scoreB - match.scoreA >= settings.winBy
    ){

        finishMatch();

    }

}
function finishMatch() {

    if(match.scoreA === match.scoreB){

        alert(
            "Match cannot end in a draw"
        );

        return;
    }

    if(match.scoreA === 0 &&
       match.scoreB === 0){

        alert(
            "Cannot save empty match"
        );

        return;
    }

    let matches =
    JSON.parse(
        localStorage.getItem("matches")
    ) || [];

    match.winner =
    match.scoreA > match.scoreB
    ? "A"
    : "B";
match.sessionDate =
new Date()
.toLocaleDateString();

    matches.push(match);

    localStorage.setItem(
        "matches",
        JSON.stringify(matches)
    );

    window.location.href =
    "history.html";
}
