import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Sidebar from "../components/Sidebar";
import { useEffect, useState, useCallback  } from "react";
import { deleteUser, getUsers } from "../services/UserService";
import { useFocusEffect } from "@react-navigation/native";

const Users = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  async function loadUser() {
    const data = await getUsers();
    setUsers(data || []);
  }

  //   useEffect(() => {
  //     loadUser();
  //   }, []);

  // con useEffect non ricarica per stack navigation si utilizza questo

  useFocusEffect( // ogni volta che questa schermata diventa visibile
    useCallback(() => { // questa funzione non deve essere ricreata ogni render
      loadUser(); // esegue questo codice
    }, []), // nessuna dipendenza
  );

  async function handleDelete(id) {
    await deleteUser(id);
    loadUser(); // ricarico lista dopo delete
  }

  async function modUser(id, nome, cognome) {
    const user = {
      id,
      nome,
      cognome,
    };
    navigation.navigate("AddUser", {
      user,
    });
  }

  return (
    <Sidebar navigation={navigation}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <View style={styles.cardUtente}>
            <Text style={styles.nome}>
              {item.nome} {item.cognome}
            </Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => modUser(item.id, item.nome, item.cognome)}
              >
                <Text style={styles.actionText}>Modifica</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.actionText}>Elimina</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.noContent}>
            <Text style={styles.noContentText}>Ancora nessun utente :(</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.addUtenteButton}
        onPress={() => navigation.navigate("AddUser")}
      >
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </Sidebar>
  );
};

const styles = StyleSheet.create({
  addUtenteButton: {
    backgroundColor: "#1e88e5",
    width: 65,
    height: 65,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 25,
    right: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  addText: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
  },

  cardUtente: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    width: "92%",
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 20,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  nome: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
    maxWidth: "55%",
  },

  actions: {
    justifyContent: "center",
    alignItems: "center",
  },

  editBtn: {
    backgroundColor: "#2ecc71",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    minWidth: 95,
    alignItems: "center",
    elevation: 2,
    marginBottom: 8,
  },

  deleteBtn: {
    backgroundColor: "#e74c3c",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    minWidth: 95,
    alignItems: "center",
    elevation: 2,
  },

  actionText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },

  noContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },

  noContentText: {
    fontSize: 20,
    color: "#777",
    fontWeight: "500",
  },
});

export default Users;
