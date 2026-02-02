
import {Text, StyleSheet, TouchableOpacity } from "react-native"


const Prodotto = ({name, selected, onPress}) => {
  return (
    
    <TouchableOpacity style={selected ? styles.productSelected : styles.product} onPress={onPress} >
        <Text style={styles.productName}> {name} </Text>
    </TouchableOpacity>
  )
}

export default Prodotto;

const styles = StyleSheet.create({
    product: {
        padding: 8,
        margin: 8,
        backgroundColor: "blue",
        borderRadius: 10,
        width: 350
    },
    productSelected:{
      padding: 8,
        margin: 8,
        backgroundColor: "green",
        borderRadius: 10,
        width: 350
    },
    productName:{
      color: "white"
    }
})
