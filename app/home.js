import React, { useState } from 'react';
import { 
  View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform 
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = () => {
  const [search, setSearch] = useState('');
  const [characters, setCharacters] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const fetchCharacters = async () => {
    if (!search) return;

    try {
      const response = await axios.get(`https://api.disneyapi.dev/character?name=${search}`);
      if (response.data.data.length === 0) {
        setErrorMessage('Nenhum personagem encontrado.');
      } else {
        setCharacters(response.data.data);
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('Erro ao buscar personagens.');
    }
  };

  const clearSearch = () => {
    setSearch('');
    setCharacters([]);
    setErrorMessage('');
  };

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={28} color="#fff" />
        </TouchableOpacity>

        <Image source={require('../assets/disney.png')} style={styles.logo} />
        <Image source={require('../assets/stitch.png')} style={styles.banner} />

        <Text style={styles.text}>Buscar um personagem</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome do personagem"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity style={styles.button} onPress={fetchCharacters}>
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={clearSearch}>
            <Text style={styles.buttonText}>Limpar Busca</Text>
          </TouchableOpacity>
        </View>

        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

        {characters.map((item) => (
          <View key={item._id} style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            {item.imageUrl && (
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
            )}
            {item.films?.length > 0 ? (
              <View style={styles.filmsContainer}>
                <Text style={styles.filmsTitle}>Filmes:</Text>
                {item.films.map((film, index) => (
                  <Text key={index} style={styles.film}>{film}</Text>
                ))}
              </View>
            ) : (
              <Text style={styles.filmsTitle}>Nenhum filme disponível.</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#043A5C',
    paddingBottom: 30,
  },
  logoutButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'transparent',
  },
  logo: {
    width: 250,
    height: 120,
    resizeMode: 'contain',
  },
  banner: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  },
  text: {
    margin: 20,
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  searchContainer: {
    width: '90%',
    paddingBottom: 20,
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
    marginTop: 10,
  },
  card: {
    marginBottom: 10,
    padding: 20,
    width: 350,
    borderRadius: 10,
    backgroundColor: '#AD84AE',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    color: 'white',
  },
  filmsContainer: {
    marginTop: 5,
  },
  filmsTitle: {
    marginBottom: 3,
    color: 'white',
    fontWeight: '400',
  },
  film: {
    fontSize: 14,
    color: 'white',
    fontWeight: '400',
  },
  button: {
    backgroundColor: '#8FD9FC',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#043A5C',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
