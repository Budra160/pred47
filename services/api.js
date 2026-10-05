const apiEndPoint = "https://dummyjson.com/products/";

export async function dohvatiOpremu() {
  try {
    const response = await fetch(apiEndPoint + "/category/sports-accessories");

    if (!response.ok) throw new Error();

    return (await response.json()).products;
  } catch (error) {
    console.log(error);
  }
}

export async function patchOpremu(oprema) {
  try {
    if (!oprema) alert("Nema opreme");

    const response = await fetch(apiEndPoint + oprema.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(oprema),
    });

    if (!response.ok) throw new Error();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteOpremu(oprema) {
  try {
    if (!oprema) alert("Nema opreme");

    const response = await fetch(apiEndPoint + oprema.id, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error();
  } catch (error) {
    console.log(error);
  }
}
