const URL =
  "https://itsproject-ea8ca-default-rtdb.europe-west1.firebasedatabase.app/users";

// ottienti tutti utenti
export async function getUsers() {
  // sempre nel try catch
  try {
    // fetch con get
    const response = await fetch(URL + ".json");

    // gestione errore
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // ottengo json dalla risposta
    const data = await response.json();
    return Object.entries(data || {}).map(([id, value]) => ({
      id,
      ...value, // trasforma json in array di oggetti
    }));
  } catch (err) {
    console.error("Failed to fetch users:", err);
    return null;
  }
}

// aggiungi utente
export async function addU(nome, cognome) {
  try {
    const newUser = {
      // creo nuovo user
      //   id: Date.now().toString(), errore id viene creato automaticamente da  firebase
      nome,
      cognome,
    };

    const response = await fetch(URL + ".json", {
      // chiamata post a url
      method: "POST",
      headers: {
        "Content-Type": "application/json", // segnalo che sto inviando json
      },
      body: JSON.stringify(newUser), // con user appena creato convertito in JSON
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// elimina user
export async function deleteUser(id) {
  try {
    const response = await fetch(
      // ho gia il link ma non ricordo se si puo cambiare la stringa #zerosbatti!!
      // alla fine ho risolto cambiando il base url
      URL + `/${id}.json`,
      {
        method: "DELETE", // imposto i metodi
        headers: {
          "Content-type": "application/json",
        },
      },
    );

    if (!response.ok) {
      // se la risposta non e ok!!
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true; // evviva e stato eliminato
  } catch (err) {
    console.log(err);
  }
}

// modifica utente
export async function modificaUtente(id, nome, cognome) {
  try {
    const response = await fetch(URL + `/${id}.json`, { // chiamata ad url
      method: "PATCH", // metodo
      headers: {
        "Content-type": "application/json", // u know
      },
      body: JSON.stringify({ // body con parametri da cambiare 
        nome,
        cognome,
      }),
    });

    if (!response.ok){ // u know
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // ottengo la risposta
    return data; // la ritorno 
  } catch (err) {
    console.log(err)
  }
}
