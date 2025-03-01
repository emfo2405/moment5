  "use strict";
  
  //En tom array
  let data = [];

window.onload = fetchData;

  //Hämta in data för kurser och program
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
function sortAppl(data) {
  
    data.sort((a, b) => b.applicantsTotal - a.applicantsTotal);


    printCourses(data);
    printPrograms(data);

}


//Funktion för att ta ut de 6 mest sökta kurserna och deras namn samt antal sökande
function printCourses(data) {
  let courseEl = [];
  courseEl = data.filter(val => val.type == "Kurs");



  const top5 = courseEl.slice(0,6);

  const cName = top5.map(kurs => kurs.name);
  const appl = top5.map(kurs => kurs.applicantsTotal);



drawDiagram(cName, appl)

}

//Funktion för att ta ut de 5 mest sökta programmen och deras namn samt antal sökande
function printPrograms(data) {
  let programEl = [];
  programEl = data.filter(val => val.type == "Program");



  const top5 = programEl.slice(0,5);

  const pName = top5.map(program => program.name);
  const pAppl = top5.map(program => program.applicantsTotal);


drawDiagramP(pName, pAppl)

}



//Diagram över sökta kurser

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
        backgroundColor: ['#861f0d','#56423D','#BEA6A0','#541308','#110402']
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

