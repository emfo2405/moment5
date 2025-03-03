"use strict";

//Skapa en tom array för att lagra inläst data i
let data = [];

//När man klickar på sökknappen körs funktionen fetchData för att hämta in data för sökningen
document.getElementById('search-button').onclick = fetchData;

//Funktion för att hämta in data från API
/**
 * Hämtar in data från nominatim API för en plats
 * @function fetchData
 * @param {value} searchInput - Tar in värdet för det som skrivs in i sökrutan
 * @param response - Hämtar API för nominatim
 * @param data - Svar från inhämtat API
 * Sedan körs funktionen takeData med @param data som input
 */
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

//Funktion för att ta ut longitud och latitud för sökt plats
/**
 * @function takeData
 * @param {*} data - Hämtat API från fetchData
 * @param {Array} latitudeSearch - Tar ut latituder för de platser som matchar det som skrivits in i sökrutan
 * @param {Number} latitudeSearchEl - Tar ut latitud för den första platsen i arrayen latitudeSearch
 * @param {Array} longitudeSearch - Tar ut longituder för de platser som matchar det som skrivits in i sökrutan
 * @param {Number} longitudeSearchEl - Tar ut longitud för den första platsen i arrayen i longitudeSearch
 * Värden för att skapa en boundingbox behövs för att zooma in på den plats på kartan man vill visa
 * Detta skapas här genom att ta värden för min latitud, min longitud, max longitud och max latitud
 * @param {Number} minLat - Latitud från latitudeSearchEl - 0,1 för att få min longitud
 * @param {Number} maxLat - Latitud från latitudeSearchEl + 0,1 för att få max latitud
 * @param {Number} minLong - Longitud från longitudeSearchEl - 0.1 för att få min longitud
 * @param {Number} maxLong - Longitud från longitudeSearchEl + 0.1 för att få max longitud
 * Till sist uppdateras länken för kartan med variabler för latitud och longitud för att visa kartan för vald plats
 */
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







