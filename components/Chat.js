import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({route, navigation}) => {
 const { name, background } = route.params;
 const [messages, setMessages ] = useState([])
 const onSend = (newMessages) => {
  setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
 }
 useEffect(() => {
  setMessages([
    {
      _id: 1,
      text: "Hello developer",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "React Native",
        avatar: "https://placeimg.com/140/140/any",
      },
    },
    {
      _id: 2,
      text: 'This is a system message',
      createdAt: new Date(),
      system: true,
    },
  ]);
}, []);

 useEffect(() => {
    navigation.setOptions({ title: name })
}, [])

const renderBubble = (props) => {
  return <Bubble
    {...props}
    wrapperStyle={{
      right: {
        backgroundColor: "#000"
      },
      left: {
        backgroundColor: "#FFF"
      }
    }}
    />
 }

 return (
   <View style={[styles.container, {backgroundColor: background}]}>
     <Text style={styles.welcomeColor}>Welcome to the Chat!</Text>
     <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1
      }}
      />
    { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
 },
 welcomeColor: {
  color: 'white',
 },
});

export default Chat;