import 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from './screens/Home';
import CreateNote from './screens/CreateNote';
import DetailNote from './screens/DetailNote';
import {customTransition} from './transitions/EasingTransition'
import {fadeTransition} from './transitions/fadeTransition'
import {slideTransition} from './transitions/slideTransition'

export default function App() {
  const Stack = createStackNavigator();
  function MyStack() {
    return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} options={fadeTransition} />
        <Stack.Screen name="CreateNote" component={CreateNote} options={customTransition} />
        <Stack.Screen name="DetailNote" component={DetailNote} options={slideTransition} />
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

