import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Habit from "./Habit";

const HabitList = ({ navigation }) => {
  const [list, setList] = useState([
    {
      id: "1",
      title: "prova 1",
      completed: false,
    },
  ]);

  function addHabit(title) {
    setList((current) => [
      ...current,
      {
        id: Date.now().toString(),
        title,
        completed: false,
      },
    ]);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate("AddHabit", { onAddHabit: addHabit })
        }
      >
        <Text style={styles.addButtonText}> Aggiungi habit </Text>
      </TouchableOpacity>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Habit name={item.title}></Habit>}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nessun habit inserito </Text>
        }
        contentContainerStyle={styles.list}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  addButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  list: {
    paddingBottom: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginTop: 40,
  },
});

export default HabitList;
