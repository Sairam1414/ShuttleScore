const match =
JSON.parse(
localStorage.getItem(
"lastFinishedMatch"
)
);

if(match){


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

document.getElementById(
    "resultContent"
).innerHTML = `

   <h3 class="mb-4">

    ${teamA}

    <span class="text-secondary">
        vs
    </span>

    ${teamB}

</h3>

<h1 class="display-3 fw-bold mb-4">

    ${match.scoreA}
    -
    ${match.scoreB}

</h1>

   <h4 class="text-warning">

    🏆 Winner

</h4>

<h2 class="fw-bold">

    ${winner}

</h2>
`;


}

function rematch(){


localStorage.setItem(
    "currentMatch",
    JSON.stringify({

        ...match,

        scoreA: 0,
        scoreB: 0

    })
);

window.location.href =
"scoreboard.html";


}
