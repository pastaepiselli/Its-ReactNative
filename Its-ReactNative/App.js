import { useState, useEffect } from "react";
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { getTasks, addTask, doneTask } from "./services/services";

export default function App() {
  const [modal, setModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const fetchedTasks = await getTasks();
    setTasks(fetchedTasks);
  };

  const loadTasksDone = async () => {
    const fetchedTasksDone = (await getTasks()).filter((task) => task.done);
    setTasks(fetchedTasksDone);
  };

  const handleAddTask = async () => {
    if (input.trim() === "") return;

    await addTask(input);
    setInput("");
    setModal(false);
    loadTasks();
  };

  const deleteItemById = async (id) => {
    await doneTask(id);
    loadTasks();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setModal(true);
        }}
      >
        <Text style={styles.buttonText}>ADD TASK</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.showDoneTasksButton} onPress={loadTasksDone}>
        <Text style={styles.buttonText}>Show done tasks</Text>
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <FlatList
          alwaysBounceVertical={false}
          data={tasks}
          renderItem={(itemData) => {
            return (
              <View style={styles.contList}>
                <Text style={styles.listElem}>{itemData.item.task}</Text>
                <TouchableOpacity
                  style={styles.eliminaTask}
                  onPress={() => deleteItemById(itemData.item.id)}
                >
                  <Text style={{ fontSize: 20, color: "white" }}> - </Text>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(itemData) => itemData.id}
        />
      </View>

      <Modal visible={modal} animationType="slide">
        <View style={styles.containerx}>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              margin: 0,
            }}
          >
            <Image
              source={require("simiaAppesa.png")}
              resizeMode="stretch"
              style={styles.simiaAppesa}
            />
          </View>

          <TouchableOpacity
            style={styles.escButton}
            onPress={() => {
              setModal(false);
              setInput("");
            }}
          >
            <Text style={styles.x}> X </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.banana}
            resizeMode="contain"
            source={require("banana.png")}
          />
          <TextInput
            placeholder="Inserisci task"
            style={styles.textInput}
            value={input}
            onChangeText={(a) => setInput(a)}
          />
          <TouchableOpacity
            style={styles.saveTaskButton}
            onPress={handleAddTask}
            disabled={input.trim() === ""}
          >
            <Text style={styles.invio}>Save task</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.siamaBassaContainer}>
          <Image
            source={require("simiaBassa.png")}
            resizeMode="contain"
            style={{ width: 200, height: 200 }}
          />
        </View>
      </Modal>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe135",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  button: {
    backgroundColor: "#654321",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    margin: 50,
    width: 200,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  inputContainer: {
    flex: 1,
    backgroundColor: "#f5f5dc",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderWidth: 2,
    padding: 10,
    backgroundColor: "#ffe135",
    borderRadius: 5,
    width: 300,
  },
  containerx: {
    flex: 1,
    alignItems: "flex-end",
    backgroundColor: "#f5f5dc",
    justifyContent: "center",
    flexDirection: "row",
  },
  escButton: {
    backgroundColor: "#654321",
    borderRadius: 5,
    margin: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 150,
    marginRight: 20,
  },
  x: {
    fontStyle: "italic",
    fontWeight: "bold",
    color: "white",
  },
  banana: {
    width: 200,
    height: 100,
    margin: 20,
  },
  saveTaskButton: {
    backgroundColor: "#654321",
    marginTop: 15,
    width: 100,
    borderRadius: 5,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  invio: {
    fontWeight: "bold",
    color: "white",
  },
  simiaAppesa: {
    width: 200,
    height: 200,
    margin: 0,
  },
  listElem: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 5,
    padding: 8,
    color: "#654321",
    margin: 8,
    backgroundColor: "#f5f5dc",
    width: 400,
  },
  siamaBassaContainer: {
    flex: 1,
    backgroundColor: "#f5f5dc",
    justifyContent: "center",
    alignItems: "flex-end",
  },

  eliminaTask: {
    backgroundColor: "#654321",
    borderRadius: 5,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    margin: 8
  },
  contList: {
    flex: 1,
    flexDirection: "row",
    width: 390,
  },
  showDoneTasksButton: {
    backgroundColor: "#654321",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    margin: 20,
    width: 200,
  },
});
