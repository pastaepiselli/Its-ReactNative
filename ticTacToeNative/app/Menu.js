import { Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./theme";

const Menu = ( props ) => {
  return (
    <Modal animationType="slide" visible={props.modal}>
      <View style={styles.menu}>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <Text style={{color: "#ff0800", fontSize: 70}}> Tic</Text>
          <Text style={{color: "white", fontSize: 70}}> Tac</Text>
          <Text style={{color: "#293133", fontSize: 70}}> Toe</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.startGame} onPress={() => props.showModal()}>
            <Text>Start Game!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Menu;
