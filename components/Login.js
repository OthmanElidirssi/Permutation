import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation ,setToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    try {
      const response = await fetch('https://plain-teal-bull.cyclic.app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        // Store the token in AsyncStorage
        await AsyncStorage.setItem('token', token);
        setToken(token);

        Alert.alert(
          'Login Successful',
          'You have successfully logged in.',
          [
            { text: 'OK'}
          ]
        );
      } else {
        const errorData = await response.json();
        Alert.alert('Login Error', errorData.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>

      <Image
        source={require('../assets/profile.png')}
        style={styles.image}
        resizeMode='contain'
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <View style={styles.button}>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

  },
  input: {
    width: 350,
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 5,
    marginVertical: 25
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20
  },
  button:{
    width:350,
    marginVertical:20
  }
});

