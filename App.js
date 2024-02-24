import { StatusBar } from 'expo-status-bar';
import { Alert, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Touchable } from 'react-native-web';
import Main from './src/components/Main';
export default function App() {
  console.log("hola mundo");
  return (
   <Main />
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
