"use strict";

let data = [];

window.onload = getCoordinates;
window.onload = fetchData;



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

    async function fetchData() {
        try {
            //Hämtar in data
            const response = await fetch('https://nominatim.openstreetmap.org/search?q=17+Strada+Pictor+Alexandru+Romano%2C+Bukarest&format=geojson');
            //Felmeddelande om datan inte läses in korrekt
            if (!response.ok) {
                throw new Error("Fel vid anslutning till data...");
            }
    
            //sparar datan till den tomma arrayen
            data = await response.json();
    
            //Kör funktioner för att skriva ut data
    
            console.table(data);
    
            //Felmeddelande om något går fel
        } catch (error) {
            console.error(error);
        }
    }





    //AIzaSyBr3njhrSX1O4fKHBJl_DOXBhVJDM07PQw

