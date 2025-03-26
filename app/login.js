import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'react-native-web';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {

      router.push('/home');
    } else {
      setError('Usuário ou senha incorretos');
    }
  };

  return (

    <View style={styles.container}>
      <Image
        source={require('../assets/logo-color.png')}
        style={{ width: 300, height: 150, resizeMode: 'contain' }}
      />
      <TextInput
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      {error && <Text style={styles.error}>{error}</Text>}

      {/* Usando TouchableOpacity para criar um botão customizado */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text
        style={styles.link}
        onPress={() => router.push('/register')}
      >
        Não tem uma conta? <span style={{ color: '#F20505' }}>Cadastre-se</span>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F9D70B',
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    color: "#5F5E68",
    marginBottom: 10,
    paddingLeft: 8,
    width: '100%',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  link: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#F20505',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
