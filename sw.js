const CACHE_NAME = "shuttlescore-v5";

const urlsToCache = [
"./",
"./index.html",
"./players.html",
"./match.html",
"./scoreboard.html",
"./history.html",
"./leaderboard.html",
"./settings.html",
"./player.html",
"./assets/css/style.css",
"./assets/js/app.js",
"./assets/js/players.js",
"./assets/js/match.js",
"./assets/js/scoreboard.js",
"./assets/js/history.js",
"./assets/js/leaderboard.js",
"./assets/js/player.js",
"./assets/js/settings.js"
];

self.addEventListener("install", event => {


self.skipWaiting();

event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
);


});

self.addEventListener("activate", event => {


event.waitUntil(

    caches.keys()
    .then(cacheNames => {

        return Promise.all(

            cacheNames.map(cache => {

                if(cache !== CACHE_NAME){

                    return caches.delete(cache);

                }

            })

        );

    })

);

self.clients.claim();


});

self.addEventListener("fetch", event => {


event.respondWith(

    caches.match(event.request)
    .then(response => {

        return response || fetch(event.request);

    })

);


});
