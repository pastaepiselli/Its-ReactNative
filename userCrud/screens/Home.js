import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { db } from "../firebaseconfig";

export default function Home() {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  
    


async function deleteUser(id) {
  Alert.alert(
    "Conferma eliminazione", // titolo
    "Vuoi davvero eliminare questo utente?", // descrizione
    [
      {
        text: "Annulla", // testo a sinistra
        style: "cancel", // style
      },
      {
        text: "Elimina", // testo a destra
        style: "destructive", // style rosso
        onPress: async () => { // premuto
          try {
            // elimino 
            await deleteDoc(doc(db, "users", id));
            console.log("Utente eliminato");
          } catch (err) {
            console.log(err);
          }
        },
      },
    ],
    { cancelable: true }
  );
}


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (querySnapshot) => {
      const userList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    });
    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View>
          <Text style={styles.text}>{item.nome}</Text>
          <Text style={styles.text}>{item.cognome}</Text>
          <Text style={styles.text}>{item.email}</Text>
          <Text style={styles.text}>{item.telefono}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.buttonModifica}
            onPress={() => navigation.navigate("AddEditUser", { user: item })}
          >
            <Text style={styles.buttonText}>Modifica</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCancella} onPress={() => deleteUser(item.id)}>
            <Text style={styles.buttonText}>Cancella</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Nessun utente trovato</Text>}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddEditUser")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5fe",
  },
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 30,
    right: 20,
    backgroundColor: "#5067FF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  fabText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
    color: "#333",
  },
  actions: {
    gap: 8,
  },
  buttonModifica: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 5,
  },
  buttonCancella: {
    backgroundColor: "#F44336",
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },

  emptyText: {
    fontSize: 16,
    color: "black",
  },
});
