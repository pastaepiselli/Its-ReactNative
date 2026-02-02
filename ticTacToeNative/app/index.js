import { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Menu from "./Menu";
import { styles } from "./theme";

export default function Index() {
  const [grid, setGrid] = useState([
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
  ]);
  const [player, setPlayer] = useState("X");
  const [winningMes, setWinningMes] = useState("")
  const [modalVisible, setModalVisible] = useState(true);

  function startGame(){
    setModalVisible(false)
  }

  function exitGame(){
    setModalVisible(true)
  }

  // da finire ora non mi funziona 
  function checkWinner(){
    if (grid[0] == grid[1] && grid[1] == grid[2] && grid[2] == player){
      setWinningMes("Vince il player " + grid[0])
      
    }
  }

  function addSign(index) {
    
    const newGrid = [...grid];
    if (newGrid[index] === "_") {
      newGrid[index] = player;
      setGrid(newGrid);
      setPlayer(player === "X" ? "0" : "X");
    }
    // da finire
    checkWinner()
  }


  function reset(){
   setGrid(['_','_','_', '_', '_', '_', '_', '_', '_'])
   setPlayer("X");
   setWinningMes("")
  }

  return (
    <View style={{ flex: 1, backgroundColor: "skyblue"}}>
      <Menu modal={modalVisible} showModal={startGame}></Menu>
      <View style={styles.heading}>
        <TouchableOpacity style={styles.exitButton} onPress={() => exitGame()}>
          <Text>Exit</Text>
        </TouchableOpacity>
        <Text style={styles.titolo}>Tic Tac Toe</Text>
        {/* ancora da implementare */}
        {/* <Text>Score 0 - 0</Text> */}
      </View>

      <View style={styles.game}>
        <View style={styles.grid}>
          {grid.map((g, i) => (
            <Pressable key={i} style={styles.cell} onPress={() => addSign(i)}>
              <Text style={{ fontSize: 62, color: "black" }}>{g !== "_" ? g : ""}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.low}>
        <TouchableOpacity style={styles.resetButton} onPress={() => reset()}>
          <Text style={{color: "white"}}> RESET </Text>
        </TouchableOpacity>
        <Text>{winningMes}</Text>
       
      </View>
    </View>
  );
}
