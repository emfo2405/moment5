"use strict";

let data = [];




let map = document.getElementById("karta");




document.getElementById('search-button').onclick = fetchData;

async function fetchData() {
    try {
        //Hämtar in data
        const searchInput = document.getElementById("search").value;



        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${searchInput}&format=json`);
        //Felmeddelande om datan inte läses in korrekt
        if (!response.ok) {
            throw new Error("Fel vid anslutning till data...");
        }

        //sparar datan till den tomma arrayen
        data = await response.json();

        //Kör funktioner för att skriva ut data


        takeData(data);

        //Felmeddelande om något går fel
    } catch (error) {
        console.error(error);
    }
}

function takeData(data) {

    const latitudeSearch = data.map(plats => plats.lat);
    const latitudeSearchEl = latitudeSearch[0];

    const longitudeSearch = data.map(plats => plats.lon);
    const longitudeSearchEl = longitudeSearch[0];

    const minLat = Number(latitudeSearchEl) - 0.1;
    const maxLat = Number(latitudeSearchEl) + 0.1;
    const minLong = Number(longitudeSearchEl) - 0.1;
    const maxLong = Number(longitudeSearchEl) + 0.1;



    document.getElementById("karta").src = `https://www.openstreetmap.org/export/embed.html?bbox=${minLong},${minLat},${maxLong},${maxLat}&layer=mapnik&marker=${latitudeSearchEl},${longitudeSearchEl}`;


}







