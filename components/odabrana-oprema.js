export function OdabranaOprema(oprema) {
  const nazivi = oprema.length
    ? oprema.map((predmet) => predmet.title).join(",")
    : "Još nema odabrane opreme.";
  return `
            <div class="kartica">
                <h3>Odabrana oprema: ${oprema.length}</h3>
                <p>${nazivi}</p>
            </div>
        `;
}
