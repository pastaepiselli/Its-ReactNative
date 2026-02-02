const URL =
  "https://itsproject-ea8ca-default-rtdb.europe-west1.firebasedatabase.app/libri";

export async function getLibri() {
  try {
    const response = await fetch(URL + ".json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Object.entries(data || {}).map(([id, value]) => ({
      id,
      ...value,
    })); // trasforma json in array di oggetti
  } catch (err) {
    console.log(err);
  }
}

export async function addL(titolo, autore) {
  try {
    const newLibro = {
      // id generato da firebase
      titolo,
      autore,
    };

    const response = await fetch(URL + ".json", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newLibro),
    });

    if (!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return null; // questa cosa evita il crash??
  }
}
