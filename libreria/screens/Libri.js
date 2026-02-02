import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Sidebar from "../components/Sidebar";
import { useCallback, useState } from "react";
import { getLibri } from "../services/LibriService";
import { useFocusEffect } from "@react-navigation/native";

const Libri = ({ navigation }) => {
  const [libri, setLibri] = useState([]);

  async function loadLibri() {
    const data = await getLibri()
    setLibri(data || []) // se data vuoto inserisce array vuoto
  }

  useFocusEffect(
    useCallback(() => {
      loadLibri()
    }, [])
  )
  
  return (
    <Sidebar navigation={navigation}>
      <FlatList
        data={libri}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardLibro}>
            <Text style={styles.cardText}>
              Titolo: {item.titolo} {"\n"} 
              Autore: {item.autore}
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.editBtn}>
              <Text style={styles.actionText}>Modifica</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn}> 
              <Text style={styles.actionText}>Elimina</Text>
            </TouchableOpacity>
            </View>
          </View>
          
        )}
      ></FlatList>
      <TouchableOpacity
        style={styles.addLibroBtn}
        onPress={() => navigation.navigate("AddLibro")}
      >
        <Text style={styles.addText}> + </Text>
      </TouchableOpacity>
    </Sidebar>
  );
};

const styles = StyleSheet.create({
  addLibroBtn: {
    backgroundColor: "#0f7cd6ff",
    width: 60,
    height: 60,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 15,

    // shadow
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  addText: {
    fontSize: 25,
    color: "white",
  },

  cardLibro: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    width: "92%",
    alignSelf: "center",
    padding: 18,
    marginVertical: 8,
    borderRadius: 18,

    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  cardText:{
    fontSize: 20,
    paddingTop: 12,
    paddingRight: 10
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
  actions: {
    justifyContent: "center",
    alignItems: "center",
  },
  actionText:{
    color: "white",
    fontSize: 14,
    fontWeight: "600"
  }
});

export default Libri;
