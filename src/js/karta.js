"use strict";

let data = [];

window.onload = getCoordinates;




  //Få ut koordinater
  function getCoordinates() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
  
        console.log("Latitud: " + latitude);
        console.log("Longitud: " + longitude);
      }, function (error) {
        console.error("Fel vid hämtning av position:", error.message);
      });
      } else {
        console.error("Geolokalisering stöds inte av din webbläsare");
    }
    }


    document.getElementById('search-button').onclick = fetchData;

    async function fetchData() {
        try {
            //Hämtar in data
            const searchInput = document.getElementById("search").value;

            console.log(searchInput);


            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${searchInput}&format=geojson`);
            //Felmeddelande om datan inte läses in korrekt
            if (!response.ok) {
                throw new Error("Fel vid anslutning till data...");
            }
    
            //sparar datan till den tomma arrayen
            data = await response.json();
    
            //Kör funktioner för att skriva ut data
    
            console.table(data);

            takeData(data);
    
            //Felmeddelande om något går fel
        } catch (error) {
            console.error(error);
        }
    }

    function takeData(data) {

const feature = data.features;
console.log(feature);

const coordinates = feature.geometry;
console.log(coordinates);


    }





    //AIzaSyBr3njhrSX1O4fKHBJl_DOXBhVJDM07PQw

