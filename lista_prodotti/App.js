import { StyleSheet, View } from 'react-native';
import Prodotti from './components/Prodotti';

export default function App() {
  return (
    <View style={styles.container}>

      <Prodotti/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6d118ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60
  },
});
