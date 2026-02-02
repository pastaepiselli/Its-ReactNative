import { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Alert,
} from "react-native";
import { addU, modificaUtente } from "../services/UserService";

const AddUser = ({ navigation, route }) => {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");

  // esci senza inserire
  function exit() {
    navigation.goBack();
  }

  // asincrona perche aggiungo su db
  async function submit() {
    // nome e cognome senza spazi
  const n = nome.trim(); 
  const c = cognome.trim();

  // controllo se non sono stringhe vuote
  if (n.length === 0 || c.length === 0) {
    Alert.alert("Errore", "Riempire tutti i campi");
    return;
  }

  // controllo se sto aggiungendo o modificando per sapere quale funzione devo chiamare
  try {
    if (userEdit){ // se questo e valorizzato
        await modificaUtente(userEdit.id, n, c) // modifico
    } else {
        await addU(n, c); // aggiungo
    }
    
    navigation.goBack(); // torno a users
  } catch (e) {
    Alert.alert("Errore", "Salvataggio fallito");
  }
}

// ottengo l'oggetto utente passato dalle props della navigation (route)
const userEdit = route.params ? route.params.user : null;

useEffect(() => {
    if (userEdit){ // se l'utente sta editando !== null
        // allora imposto i campi dell'utente che sta editando
        setNome(userEdit.nome)
        setCognome(userEdit.cognome)
        // in piu cambio il nome dello screen in modifica utente
        navigation.setOptions({title: "Modifica utente"})
    } else { // l'utente non sta modificando
        navigation.setOptions({title: "Aggiungi utente"})
    }
},[userEdit]) // ogni volta che viene premuto modifica :/

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Cognome"
        value={cognome}
        onChangeText={setCognome}
      ></TextInput>
      <TouchableOpacity style={styles.inviaButton} onPress={submit}>
        <Text style={styles.inviaText}> Aggiungi </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.exitButton} onPress={() => exit()}>
        <Text style={styles.exitText}>-</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8d8d8ff",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    padding: 10,
    width: 260,
    margin: 10,
    borderColor: "#0f7cd6ff",
    borderRadius: 20,
    elevation: 5,
    height: 50,

    // shadow
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4
  },
  inviaButton: {
    backgroundColor: "#0f7cd6ff",
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 140,
    height: 45
  },
  inviaText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600"
  },
  exitButton: {
    backgroundColor: "red",
    width: 60,
    height: 60,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 15,
  },
  exitText: {
    fontSize: 25,
    color: "white",
  },
});

export default AddUser;
