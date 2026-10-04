import { Sekcija } from "./components/sekcija.js";
import { OdabranaOprema } from "./components/odabrana-oprema.js";
import { Oprema } from "./components/oprema.js";
import { dohvatiOpremu } from "./services/api.js";

const main = document.getElementById("glavni-sadrzaj");

main.innerHTML =`
<h1>Sportska oprema</h1>
${Sekcija("Katalog", "<div class='kartice' id='katalog'></div>")}
${Sekcija("Odabrano", "<div class='kartice' id='odabrano'></div>")}
`;

//Inicijalizaija API-a

let oprema = []
const katalogWrapper = document.getElementById("katalog");
const odabranoWrapper = document.getElementById("odabrano");
let selectOprema = [];

async function stvoriOpremu(){

    oprema = await dohvatiOpremu();
    oprema.forEach(element => {

        katalogWrapper.innerHTML += Oprema(element, false)
    });

}
stvoriOpremu();

//Event listener za gumbove kartica

katalogWrapper.addEventListener("click", e => {
    const gumb = e.target.closest(".gumb");
    const kartica = e.target.closest(".kartica")

    if(!gumb) return;

    let predmet;
    if(gumb.dataset.action === "dodaj")
    {   
        predmet = oprema.find(element => element.id === Number(gumb.dataset.id));
        selectOprema.push(predmet);
        console.log(selectOprema, gumb);

        gumb.dataset.action = "ukloni";
        gumb.innerHTML = "Ukloni";
    }
    else if(gumb.dataset.action === "ukloni"){

        if(!selectOprema) return

        selectOprema = selectOprema.filter(element => element.id != gumb.dataset.id)
    }

    dodajOdabranuOpremu();
});

//Funkcija za dodavanje odabrane opreme

function dodajOdabranuOpremu(){
    if(!selectOprema) return

    odabranoWrapper.innerHTML = OdabranaOprema(selectOprema)
}