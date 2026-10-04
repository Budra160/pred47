import { Sekcija } from "./components/sekcija.js";
import { OdabranaOprema } from "./components/odabrana-oprema.js";
import { Oprema } from "./components/oprema.js";
import { dohvatiOpremu, patchOpremu } from "./services/api.js";
import { stvoriModal } from "./components/modal.js";

const main = document.getElementById("glavni-sadrzaj");

main.innerHTML = `
<h1>Sportska oprema</h1>
${Sekcija("Katalog", "<div class='kartice' id='katalog'></div>")}
${Sekcija("Odabrano", "<div class='kartice' id='odabrano'></div>")}
`;

//Inicijalizaija API-a

let oprema = [];
const katalogWrapper = document.getElementById("katalog");
const odabranoWrapper = document.getElementById("odabrano");
let selectOprema = [];

async function stvoriOpremu() {
  oprema = await dohvatiOpremu();
  oprema.forEach((element) => {
    katalogWrapper.innerHTML += Oprema(element, false);
  });
}
stvoriOpremu();

//Event listener za gumbove kartica

katalogWrapper.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();

  const gumb = e.target.closest(".gumb");
  const kartica = e.target.closest(".kartica");
  let forma;
  if (!gumb) return;

  let predmet = oprema.find(
    (element) => element.id === Number(gumb.dataset.id),
  );
  if (gumb.dataset.action === "dodaj") {
    selectOprema.push(predmet);
    console.log(selectOprema, gumb);

    gumb.dataset.action = "ukloni";
    gumb.innerHTML = "Ukloni";
  } else if (gumb.dataset.action === "ukloni") {
    if (!selectOprema) return;

    selectOprema = selectOprema.filter(
      (element) => element.id != gumb.dataset.id,
    );
    gumb.dataset.action = "dodaj";
    gumb.innerHTML = "Dodaj";
  } else if (gumb.dataset.action === "patch") {
    katalogWrapper.innerHTML += stvoriModal();
    forma = document.getElementById("modal");
    if(!forma) return
    forma.addEventListener("click", (e) => {
      e.preventDefault();

      let title;
      let subGumb = e.target.closest(".gumb")
      if(!subGumb) return;
      if(subGumb.type === "submit")
      {
        title = document.getElementById("title").value.trim();
        if(title == "")
            alert("upišite vrijednost")
        else
        {
            predmet.title = title;
            oprema = oprema.filter((element) => element.id !== predmet.id);
            oprema.unshift(predmet);
            console.log(oprema);
            katalogWrapper.innerHTML = ""
            oprema.forEach((element) => {
                katalogWrapper.innerHTML += Oprema(element);
                });
        }
      }
      else if(subGumb.id === "exit")
        document.querySelector(".modal-wrapper").remove();
      else{
        return
      }
    });

    
  }

  dodajOdabranuOpremu();
});

//Funkcija za dodavanje odabrane opreme

function dodajOdabranuOpremu() {
  if (!selectOprema) return;

  odabranoWrapper.innerHTML = OdabranaOprema(selectOprema);
}
