import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState('')
  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  return (
   <View style={styles.container}>
     <ImageBackground resizeMode='cover' style={styles.image} source={require('../assets/Background-Image.png')}>
      <Text style={styles.text}>Chat App</Text>
      <View style={styles.containerWhite}>
        <TextInput
         style={styles.textInput}
         value={name}
          onChangeText={setName}
         placeholder='Type your username here'
         />
         <Button
        title="Go to Chat"
        onPress={() => navigation.navigate('Chat', {name: name}, {selectedColor: selectedColor} )}
      />
     </View>
     <Text style={styles.text}>Choose Background Color:</Text>
          <View style={styles.colorButtonsContainer}>
          <TouchableOpacity
              style={[
                styles.colorButton,
                { backgroundColor: '#090C08', opacity: selectedColor === '#090C08' ? 1 : 0.7 },
              ]}
              onPress={() => handleColorSelection('#090C08')}
            />
            <TouchableOpacity
              style={[
                styles.colorButton,
                { backgroundColor: '#474056', opacity: selectedColor === '#474056' ? 1 : 0.7 },
              ]}
              onPress={() => handleColorSelection('#474056')}
            />
            <TouchableOpacity
              style={[
                styles.colorButton,
                { backgroundColor: '#8A95A5', opacity: selectedColor === '#8A95A5' ? 1 : 0.7 },
              ]}
              onPress={() => handleColorSelection('#8A95A5')}
            />
            <TouchableOpacity
              style={[
                styles.colorButton,
                { backgroundColor: '#B9C6AE', opacity: selectedColor === '#B9C6AE' ? 1 : 0.7 },
              ]}
              onPress={() => handleColorSelection('#B9C6AE')}
            />
          </View>
     </ImageBackground>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 },
 textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
  },
 image: {
  flex: 1,
  width: '100%',
  height: '100%',
  justinfyContent: 'center',
  alignItems: 'center'
 },
 text: {
  flex: 1,
  fontSize: 45,
  fontWeight: '600',
  color: '#FFFFFF',
 },
 containerWhite: {
  width: '88%',
  height: '44%',
  justifyContent: 'center',
  backgroundColor: 'white',
  bottom: 0,
  alignItems: 'center',
  marginBottom: '6%',
},
 colorButtonsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  margin: 20,
},
 colorButtonsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  margin: 20,
},
 colorButton: {
  width: 40,
  height: 40,
  borderRadius: 20,
  margin: 10,
},
});

export default Start;