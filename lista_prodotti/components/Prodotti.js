import { FlatList, StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { PRODUCTS } from "./lista_prodotti";
import Prodotto from "./Prodotto";
import { useState } from "react";

const Prodotti = () => {
  const [selected, setSelected] = useState([]); // lista con prodotti selezionati

  // seleziona / deseleziona prodotto
  function selectProduct(id) {
    setSelected((cur) => {
      // cur valore attuale
      if (cur.includes(id)) {
        // prodotto gia selezionato
        return cur.filter((itemId) => itemId !== id); // viene rimosso
      } else {
        // non e selezionato
        return [...cur, id]; // viene aggiunto
      }
    });
  }

  // calcolare totale senza variabili di stato
  function getTotal() {
    const tot = PRODUCTS.filter((p) => selected.includes(p.id)) // itero per array e ne creo uno nuovo con solo prodotti selezionati
      // uso reduce per calcoare la somma
      .reduce((sum, p) => (sum += p.price), 0); // 0 come valore iniziale
    return Math.round(tot);
  }

  // rimuove tutti i prodotti selezionati
  function clear() {
  Alert.alert( // avvia un alert 
    "Attenzione",
    "Vuoi davvero svuotare la selezione?",
    [
      // richiesta conferma
      { text: "Annulla", style: "cancel" },  
      { text: "Sì", onPress: () => setSelected([]) }
    ]
  );
}


  return (
    <View>
      <Text style={styles.titolo}>
          Prodotti
      </Text>
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Prodotto
            name={item.name}
            selected={selected.includes(item.id)} // ritrona booleano per il cambio di stile
            onPress={() => selectProduct(item.id)}
          ></Prodotto>
        )}
      ></FlatList>
      <TouchableOpacity style={styles.svuota} onPress={() => clear()}>
        <Text style={styles.svutaText}>Svuota</Text>
      </TouchableOpacity>
      <Text style={styles.totale}>Totale: {getTotal()} euro</Text> 
    </View>
  );
};

const styles = StyleSheet.create({
  titolo: {
    fontSize: 50,
    textAlign: "center",
    paddingBottom: 20,
    fontStyle: "italic"
  },
  totale:{
    fontSize: 30,
    textAlign: "center",
    paddingBottom: 50
  },
  svuota: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "red",
    alignItems: "center",
    marginBottom: 40,
    height: 75,
    width: 200,
    borderRadius: 20
  },
  svutaText:{
    color: "white",
    fontSize: 28
  }
})

export default Prodotti;
