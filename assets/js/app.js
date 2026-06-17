if(!localStorage.getItem("players")){
    localStorage.setItem("players", JSON.stringify([]));
}

if(!localStorage.getItem("matches")){
    localStorage.setItem("matches", JSON.stringify([]));
}