const URL = "https://itsproject-ea8ca-default-rtdb.europe-west1.firebasedatabase.app/";

export async function getTasks() {
  try {
    const response = await fetch(URL + ".json");
    const dati = await response.json();

    if (!dati) return [];
    
    return Object.keys(dati).map(key => ({
      id: key,
      task: dati[key].task,
      done: dati[key].done
    }));
  } catch (err) {
    console.log("Errore:", err);
    return [];
  }
}

export async function addTask(taskText) {
  try {
    const newTask = { task: taskText, done: false };
    const response = await fetch(URL + ".json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    return await response.json();
  } catch (err) {
    console.log("Errore:", err);
    return null;
  }
}

export async function doneTask(id) {
  try {
    const response = await fetch(URL + `${id}.json`, {
      method: "PATCH", body: JSON.stringify({done: true })
    });
    const task = await response.json();
    return task;
    
  } catch (err) {
    console.log("Errore:", err);
    return null;
  }
}