import { View, Text, StyleSheet } from "react-native"

const Habit = ({name}) => {
  return (
    <View style={styles.habit}>
        
        <Text style={styles.titolo}>
           {name}
        </Text>
    </View>
  )
}

export default Habit

const styles = StyleSheet.create({
    habit: {
        backgroundColor: "black",
        padding: 8

    },
    titolo: {
        color: "white"
    }
})
