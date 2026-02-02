import { useState } from "react"
import { TextInput, TouchableOpacity, View, Text, Alert, StyleSheet } from "react-native"


const AddHabit = ({navigation, route}) => {
    const [titolo, setTitolo] = useState("");
    function submit(){

        if (!titolo.trim()){
            Alert.alert("Errore", 
                "Il titolo non puo essere vuoto"
            )
            return
        }

        route.params.onAddHabit(titolo);
        navigation.goBack();
    }
  return (
    <View style={styles.container} >
        <TextInput style={styles.input} placeholder="Inserire titolo" value={titolo} onChangeText={setTitolo}>

        </TextInput>
        <TouchableOpacity style={styles.button} onPress={submit}>
            <Text style={styles.buttonText}> Aggiungi </Text>
        </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});



export default AddHabit