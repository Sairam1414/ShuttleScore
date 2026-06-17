loadSettings();

function loadSettings(){


const settings =
JSON.parse(
    localStorage.getItem("settings")
) || {

    matchType: "doubles",
    winningScore: 21,
    winBy: 2

};

document.getElementById(
    "matchType"
).value =
settings.matchType;

document.getElementById(
    "winningScore"
).value =
settings.winningScore;

document.getElementById(
    "winBy"
).value =
settings.winBy;


}

function saveSettings(){


const customScore =
document.getElementById(
    "customScore"
).value;

const settings = {

    matchType:
    document.getElementById(
        "matchType"
    ).value,

    winningScore:
    customScore
    ? parseInt(customScore)
    : parseInt(
        document.getElementById(
            "winningScore"
        ).value
    ),

    winBy:
    parseInt(
        document.getElementById(
            "winBy"
        ).value
    )

};

localStorage.setItem(
    "settings",
    JSON.stringify(settings)
);

alert(
    "Settings Saved Successfully"
);


}
function exportData(){

    const backup = {

        players:
        JSON.parse(
            localStorage.getItem("players")
        ) || [],

        matches:
        JSON.parse(
            localStorage.getItem("matches")
        ) || [],

        settings:
        JSON.parse(
            localStorage.getItem("settings")
        ) || {}

    };

    const blob =
    new Blob(
        [JSON.stringify(backup, null, 2)],
        {
            type:"application/json"
        }
    );

    const url =
    URL.createObjectURL(blob);

    const a =
    document.createElement("a");

    a.href = url;

    a.download =
    "shuttlescore-backup.json";

    a.click();

    URL.revokeObjectURL(url);
}
function importData(event){

    const file =
    event.target.files[0];

    if(!file) return;

    const reader =
    new FileReader();

    reader.onload = function(e){

        const backup =
        JSON.parse(
            e.target.result
        );

        localStorage.setItem(
            "players",
            JSON.stringify(
                backup.players || []
            )
        );

        localStorage.setItem(
            "matches",
            JSON.stringify(
                backup.matches || []
            )
        );

        localStorage.setItem(
            "settings",
            JSON.stringify(
                backup.settings || {}
            )
        );

        alert(
            "Backup Imported Successfully"
        );

        location.reload();
    };

    reader.readAsText(file);
}