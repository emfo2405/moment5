"use strict";

  //En tom array
  let data = [];

window.onload = fetchData;

//läser in öppna och stäng knappar för meny
let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");
let searchBar = document.getElementById("search2")
//när man klickar på menyikonerna körs myfunction
openBtn.addEventListener('click', myFunction);
closeBtn.addEventListener('click', myFunction);

function myFunction() {

//om menyn är stängd när man klickar fälls den ut och ändrar menyikon eller tvärtom
    var menuSmall = document.getElementById("menu-small");
    if (menuSmall.style.display === "block") {
      menuSmall.style.display = "none";
      openBtn.style.display = "flex";
      closeBtn.style.display = "none";
    } else {
      menuSmall.style.display = "block";
      openBtn.style.display = "none";
        closeBtn.style.display = "flex";
    }
  }

  let sendBtn=document.getElementById("submit-button");
  sendBtn.addEventListener('click',animation)

  function animation() {
    let contactForm = document.getElementById("contact-Form");

    contactForm.style.position = "relative";

  }



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

function sortAppl(data) {
  
    data.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    console.table(data);

    printCourses(data);

}



function printCourses(data) {
  let courseEl = [];
  courseEl = data.filter(val => val.type == "Kurs");
  console.table(courseEl);

  const top5 = courseEl.slice(0,6);

  takeElements(top5);
}

function takeElements(top5) {

  top5.forEach(element => {
    let name = [];
    let appl = [];
    name = element.name;
    appl = element.applicantsTotal;

  });


}









