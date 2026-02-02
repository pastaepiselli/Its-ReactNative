import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import Home from "./screens/Home";
import AddEditUser from "./screens/AddEditUser";

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        contentStyle: {backgroundColor: "white"},
        headerStyle: {backgroundColor: "grey"}
      }}>
        <Stack.Screen name="Home" component={Home} options={{title: "Gestione utenti"}} />
        <Stack.Screen name="AddEditUser" component={AddEditUser} options={{
          title: "Lista utenti"
        }} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});