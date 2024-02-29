import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";


const Chat = ({route, navigation, db}) => {
 const { name, background, userID } = route.params;
 const [messages, setMessages] = useState([]);
//  const [messages, setMessages ] = useState([]);
 const onSend = (newMessages) => {
  addDoc(collection(db, "messages"),newMessages)
 }
 useEffect(() => {
  const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
  const unsubMessages = onSnapshot(q, (documentSnapshot) => {
      let newMessages = [];
      documentSnapshot.forEach(doc => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      });
      setMessages(newMessages);
  });

  // Clean up code
  return () => {
    if (unsubMessages) unsubMessages();
  }
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
     <FlatList
        data={messages}
        renderItem={({ item }) =>
          <Text>{item.name}: {item.items.join(", ")}</Text>} />
     <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      onSend={messages => onSend(messages)}
      user={{
        _id: userID,
        name
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