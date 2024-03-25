import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from "react-native-maps";


const Chat = ({route, navigation, db, isConnected}) => {
 const { name, background, id } = route.params;
 const [messages, setMessages] = useState([]);

 const loadCachedMessages = async () => {
  const cachedMessages = await AsyncStorage.getItem("chat_messages") || [];
  setMessages(JSON.parse(cachedMessages));
}

 const cacheMessagesHistory = async (listsToCache) => {
  try {
    await AsyncStorage.setItem('chat_messages', JSON.stringify(listsToCache));
  } catch (error) {
    console.log(error.message);
  }
}

 const onSend = (newMessages) => {
  addDoc(collection(db, "messages"), newMessages[0])
 }

let unsubMessages;
useEffect(() => {
  if (isConnected === true) {
    // unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed.
    if (unsubMessages) unsubMessages();
    unsubMessages = null;

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    unsubMessages = onSnapshot(q, (documentSnapshot) => {
      let newMessages = [];
      documentSnapshot.forEach(doc => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      });
      cacheMessagesHistory(newMessages);
      setMessages(newMessages);
    });
  } else loadCachedMessages();

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

 const renderInputToolbar = (props) => {
  if (isConnected) return <InputToolbar {...props} />;
  else return null;
}
 const renderCustomActions = (props) => {
  return <CustomActions {...props} />;
 };

 const renderCustomView = (props) => {
  const { currentMessage } = props;
  if (currentMessage.location) {
      return (
          <MapView
              style={{
                  width: 150,
                  height: 100,
                  borderRadius: 13,
                  margin: 3
              }}
              region={{
                  latitude: currentMessage.location.latitude,
                  longitude: currentMessage.location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
              }}
          />
      );
  }
  return null;
}

 return (
   <View style={[styles.container, {backgroundColor: background}]}>
     <Text style={styles.welcomeColor}>Welcome to the Chat!</Text>
     <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar}
      onSend={messages => onSend(messages)}
      renderActions={renderCustomActions}
      renderCustomView={renderCustomView}
      user={{
        _id: id,
        name: name,
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