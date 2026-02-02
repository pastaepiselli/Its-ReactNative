import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";

export default function Form() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // use effect per il controllo dei campi
    const valid = // controllo
      nome.trim() !== "" && // nome non deve essere vuoto
      email.includes("@") && // email include @
      messaggio.trim() !== ""; // .trim() rimuove gli spazi

    setIsValid(valid);
  }, [nome, email, messaggio]); // ogni volta che queste cambiano

  // funzione per il submit (senza il disable sul button per gestione !isValid)
  //   function submit() {
  //     if (isValid) {
  //       // se valido
  //       Alert.alert(
  //         "Messaggio inviato",
  //         `Nome: ${nome}, email: ${email}, messsaggio: ${messaggio}`
  //       );
  //       return;
  //     }
  //     // in realta e un po inutile visto il disable sul button
  //     Alert.alert(
  //       "Errore",
  //       "Inserire tutti i campi correttamente (no campi vuoti / @ in email)"
  //     );
  //   }

  // funzione submit con disbled sul button implementato
  function submit() {
    Alert.alert(
      "Messaggio inviato",
      `Nome: ${nome}, email: ${email}, messsaggio: ${messaggio}`
    );
    return;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nome</Text>
      <TextInput
        style={styles.nomeInput}
        placeholder="Inserire nome"
        onChangeText={(nome) => setNome(nome)}
        value={nome}
      ></TextInput>
      <Text>Email</Text>
      <TextInput
        style={styles.nomeInput}
        placeholder="Inserire email"
        onChangeText={(email) => setEmail(email)}
        value={email}
      ></TextInput>
      <Text>Messaggio</Text>
      <TextInput
        style={styles.messageInput}
        placeholder="Inserire messaggio"
        onChangeText={(messaggio) => setMessaggio(messaggio)}
        value={messaggio}
      ></TextInput>
      <Button title="Invia" onPress={submit} disabled={!isValid}></Button>
      {/* controllo sul disabled */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 150,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },

  nomeInput: {
    borderWidth: 1,
    padding: 8,
    margin: 8,
    width: 200
  },

  emailInput: {
    borderWidth: 1,
    padding: 8,
    margin: 8,
    width: 200
  },
  messageInput: {
    borderWidth: 1,
    padding: 8,
    margin: 8,
    width: 200

  },
  title: {
    margin: 8
  }
});
