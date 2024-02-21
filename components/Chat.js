import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({route, navigation}) => {
 const { name, background } = route.params;

 useEffect(() => {
    navigation.setOptions({ title: name})
 })

 return (
   <View style={[styles.container, {backgroundColor: background}]}>
     <Text style={styles.welcomeColor}>Welcome to the Chat!</Text>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 },
 welcomeColor: {
  color: 'white',
 },
});

export default Chat;