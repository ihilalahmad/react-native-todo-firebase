import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import Details from "../screens/Details";

const Stack = createStackNavigator();

function HomeStackGroup() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <HomeStackGroup />
    </NavigationContainer>
  );
}
