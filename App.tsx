import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from './src/screens/Home';
import { registerRootComponent } from 'expo';

registerRootComponent(App);

export default function App() {
  return (
    <>
      <Home/>
      <StatusBar style='light'/>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center'
  },
  header: {

  },
  headerLeft: {

  },
});
