import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Start from './components/Start'
import Chat from './components/Chat'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"])

const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyD61v9hnX8WT279Zb0wcJBcnrw3LqXdmKY",
    authDomain: "chatapp-e9406.firebaseapp.com",
    projectId: "chatapp-e9406",
    storageBucket: "chatapp-e9406.appspot.com",
    messagingSenderId: "196986032724",
    appId: "1:196986032724:web:dfe74bd33ec7826528d3c1"
  };
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat">
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
