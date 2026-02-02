import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { addL } from "../services/LibriService";

const AddLibro = ({ navigation }) => {
  const [titolo, setTitolo] = useState("");
  const [autore, setAutore] = useState("");

  async function submit() {
    await addL(titolo, autore);
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Titolo"
        value={titolo}
        onChangeText={setTitolo}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Autore"
        value={autore}
        onChangeText={setAutore}
      ></TextInput>
      <TouchableOpacity style={styles.addBtn} onPress={() => submit()}>
        <Text style={styles.addText}>Aggiungi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8d8d8",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    backgroundColor: "#fff",
    width: 260,
    height: 50,
    borderRadius: 18,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#0f7cd6",

    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  addBtn: {
    backgroundColor: "#0f7cd6",
    marginTop: 10,
    width: 140,
    height: 45,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",

    elevation: 5,
  },

  addText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default AddLibro;
