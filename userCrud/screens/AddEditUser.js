import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { db } from "../firebaseconfig";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

export default function AddEditUser({navigation, route}) {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  
  // route ha i parametri passati nel navigation
  const userEdit = route.params ? route.params.user : null; // prendiamo tutto l'oggetto
  

  async function handleSend() {
    // console.log("Invio")
    if (!nome || !cognome || !email || !telefono) { // controllo che i campi non siano vuoti
      Alert.alert("Errore", "Inserire correttamente i campi");
      return;
    }
    console.log("Inizio salvataggio")
    try {
      if (userEdit){
        // aggiorno utente
        const userRef = doc(db, "users", userEdit.id) // dato corrente che sta sul db per la modifica
        await updateDoc(userRef, { // userRef indica ad update quale utente modifica
          // campi da cambiare
          nome, 
          cognome,
          email,
          telefono
        })
      } else {
        // senno crei utente
      
      await addDoc(collection(db, "users"), {
        nome,
        cognome,
        email,
        telefono,
        createdAt: new Date(),
      })};

      console.log("aggiunto")
      Alert.alert("Successo", "Utente salvato con successo");
      navigation.goBack();
    } catch (err) {
      Alert.alert(
        "Errore",
        "Si è verificato un errore durante il salvataggio dell'utente: " + err.message
      );
    }
  }

  useEffect(() => {
    if (userEdit){ // controlla se valorizzato
        // se valorizzato allora imposta i campi a quelli del user selezionato
        // console.log(userEdit.nome)
        setNome(userEdit.nome)
        setCognome(userEdit.cognome)
        setEmail(userEdit.email)
        setTelefono(userEdit.telefono)
        navigation.setOptions({title: "Modifica utente"})
    } else {
      navigation.setOptions({title: "Aggiungi utente"})
    }
  }, [])

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Cognome"
        value={cognome}
        onChangeText={setCognome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefono"
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
      />
      <TouchableOpacity style={styles.invia} onPress={() => handleSend()}>
        <Text>Invia</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.fab} onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  fab: {
    position: "absolute",
    bottom: 25,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",

    // Ombra iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Ombra Android
    elevation: 6,
  },

  input: {
    borderWidth: 1.5,
    borderColor: "#D0D5DD",
    backgroundColor: "#FFFFFF",
    padding: 12,
    marginVertical: 8,
    width: "90%",
    borderRadius: 10,
    fontSize: 16,
  },

  invia: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 15,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },

  inviaText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
