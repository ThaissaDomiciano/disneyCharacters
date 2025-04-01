import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!username || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    try {
      const existingUser = await AsyncStorage.getItem(username);
      if (existingUser) {
        setError('Usuário já cadastrado!');
        return;
      }

      // Salva as credenciais no AsyncStorage
      await AsyncStorage.setItem(username, JSON.stringify({ username, password }));

      router.push('/login');
    } catch (error) {
      setError('Erro ao cadastrar usuário');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={{ width: 400, height: 230, resizeMode: 'contain' }}
      />
      <Text style={styles.loginText}>CADASTRO</Text>
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

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <Text
        style={styles.link}
        onPress={() => router.push('/login')}
      >
        Já tem uma conta? <Text style={{ color: '#8FD9FC', fontWeight: '500' }}>Faça login</Text>
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
    backgroundColor: '#043A5C',
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
    color: '#fff'
  },
  button: {
    backgroundColor: '#8FD9FC',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#043A5C',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#fff',
    fontSize: 20,
    margin: 10,
    fontWeight: '500',
  }
});

export default Register;
