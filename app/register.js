import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'react-native-web';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = () => {
    // Lógica para registro, que pode ser uma simples validação de usuário e senha
    if (username && password) {
      // Salva as informações no localStorage
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      // Após o cadastro, navega para a tela de login
      router.push('/login');
    } else {
      setError('Por favor, preencha todos os campos');
    }
  };

  return (
    <View style={styles.container}>
      <Image 
              source={require('../assets/logo-color.png')}
              style={{ width: 250, height: 150, resizeMode: 'contain' }}
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
      
      {/* Usando TouchableOpacity para o botão de cadastro */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <Text
        style={styles.link}
        onPress={() => router.push('/login')}
      >
        Já tem uma conta? <span style={{color: '#F20505'}}>Faça login</span>
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
    backgroundColor: '#FF0000', // Cor vermelha
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff', // Cor do texto do botão
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Register;
