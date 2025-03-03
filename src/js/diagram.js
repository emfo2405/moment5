"use strict";

//En tom array för att fylla med data för API
let data = [];

//Kör funktionen fetchData vid inladdning av sidan
window.onload = fetchData;

//Hämta in data för kurser och program
/**
 * Funktion för att hämta in data om kurser och program
 * @function fetchData
 * @param response - Hämtar in data om kurser
 * @param data - Den inhämtade datan
 * Sedan körs funktionen sortAppl med data som värde
 */
async function fetchData() {
  try {
    //Hämtar in data
    const response = await fetch('https://studenter.miun.se/~mallar/dt211g/');
    //Felmeddelande om datan inte läses in korrekt
    if (!response.ok) {
      throw new Error("Fel vid anslutning till data...");
    }

    //sparar datan till den tomma arrayen
    data = await response.json();

    //Kör funktioner för att skriva ut data

    sortAppl(data);

    //Felmeddelande om något går fel
  } catch (error) {
    console.error(error);
  }
}

//Sortera datan efter mest sökta (både program och kurser)
/**
 * @function sortAppl - Funktion som sorterar data 
 * @param data - den data som hämtats för kurser och program 
 * data.sort sorterar den inmatade datan efter totalt antal sökande från mest till minst
 * Funktionerna printCourses och printPrograms körs med sorterad data som inmatning
 */
function sortAppl(data) {

  data.sort((a, b) => b.applicantsTotal - a.applicantsTotal);


  printCourses(data);
  printPrograms(data);

}


//Funktion för att ta ut de 6 mest sökta kurserna och deras namn samt antal sökande
/**
 * @function printCourses - funktion som tar ut topp 6 mest sökta kurser och tar ut antal sökande och namn för dem
 * @param data - en sorterad lista av program och kurser baserat på flest antal sökande
 * @param {Array} courseEl - En array som fylls med data för typen kurser
 * @param {Array} top6 - en array som tar kurser med index 0 till 6 med flest antal sökande
 * @param {Array} cName - en array med namn på kurserna i top6
 * @param {Array} appl - en array med totalt antal sökande i top6
 * Sedan körs funktionen drawDiagram
 */
function printCourses(data) {
  let courseEl = [];
  courseEl = data.filter(val => val.type == "Kurs");



  const top6 = courseEl.slice(0, 6);

  const cName = top6.map(kurs => kurs.name);
  const appl = top6.map(kurs => kurs.applicantsTotal);



  drawDiagram(cName, appl)

}

//Funktion för att ta ut de 5 mest sökta programmen och deras namn samt antal sökande
/**
 * @function printPrograms - funktion som tar ut topp 6 mest sökta program och tar ut antal sökande och namn för dem
 * @param data - en sorterad lista av program och kurser baserat på flest antal sökande
 * @param {Array} programEl - En array som fylls med data för typen program
 * @param {Array} top5 - en array som tar program med index 0 till 5 med flest antal sökande
 * @param {Array} pName - en array med namn på program i top5
 * @param {Array} pappl - en array med totalt antal sökande i top5
 * Sedan körs funktionen drawDiagram
 */

function printPrograms(data) {
  let programEl = [];
  programEl = data.filter(val => val.type == "Program");



  const top5 = programEl.slice(0, 5);

  const pName = top5.map(program => program.name);
  const pAppl = top5.map(program => program.applicantsTotal);


  drawDiagramP(pName, pAppl)

}



//Diagram över sökta kurser
/**
 * @function drawDiagram - ritar ett stapeldiagram
 * @param {Array} cName - namn över kurser 
 * @param {Array} appl - totalt antal sökande i kurserna
 * @param ctx - hämtar ett element med ID 'myChart'
 * @param Chart.defaults.backgroundColor - Ändrar defaultfärg för bakgrund
 * @param Chart.defaults.borderColor - Ändrar defaultfärg på border
 * @param chart - skapar ett stapeldiagram över data cName och appl 
 */

function drawDiagram(cName, appl) {
  const ctx = document.getElementById('myChart');

  Chart.defaults.backgroundColor = '#861f0d';
  Chart.defaults.borderColor = '#6f1a0b';

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: cName,
      datasets: [{
        label: 'Totalt antal sökande',
        data: appl,
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }

    }
  });

}

//Rita diagram över program
/**
 * @function drawDiagramP - ritar ett stapeldiagram
 * @param {Array} pName - namn över program 
 * @param {Array} pAppl - totalt antal sökande i programmen
 * @param ctx - hämtar ett element med ID 'myChart2'
 * @param chart - skapar ett cirkeldiagram över data pName och pAppl
 * @param backgroundColor - Ändrar färger på delarna i cirkeldiagram 
 */
function drawDiagramP(pName, pAppl) {
  const ctx = document.getElementById('myChart2');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: pName,
      datasets: [{
        label: 'Totalt antal sökande',
        data: pAppl,
        borderWidth: 2,
        backgroundColor: ['#861f0d', '#56423D', '#BEA6A0', '#541308', '#110402']
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }

    }
  });

}

