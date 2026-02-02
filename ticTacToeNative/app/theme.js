import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  heading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  game: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
  },
  low: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    
  },
  cell: {
    width: "33.33%",
    height: "33.33%",
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  grid: {
    width: 300,
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  titolo:{
    fontSize: 50
  },

  resetButton:{
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    padding: 8,
    width: 120,
    alignItems: "center",
    borderRadius: 6,
    height: 50
  },
  exitButton:{
    backgroundColor: "red",
    padding: 8,
    marginBottom: 40,
    marginLeft: 310,
    borderRadius: 6
  },
  menu:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "skyblue"
  },
  startGame:{
    backgroundColor: "white",
    padding: 10,
    width: 300, 
    justifyContent: "center",
    alignItems: "center"

  },
  titleMenu:{
    fontSize: 70,
    color: "white"
  }
});
