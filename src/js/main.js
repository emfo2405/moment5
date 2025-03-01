"use strict";

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












