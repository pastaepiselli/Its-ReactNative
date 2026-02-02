import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Libri from "../screens/Libri"
import Users from "../screens/Users";
import AddUser from "../screens/AddUser";
import AddLibro from "../screens/AddLibro";



const Stack = createNativeStackNavigator();
const AppNavigator = () => {
    
  return (
    <Stack.Navigator screenOptions={{animation: "fade"}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Libri" component={Libri}></Stack.Screen>
        <Stack.Screen name="Users" component={Users}></Stack.Screen>
        <Stack.Screen name="AddUser" component={AddUser}></Stack.Screen>
        <Stack.Screen name="AddLibro" component={AddLibro}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default AppNavigator