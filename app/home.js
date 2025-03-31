import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const Home = () => {
  const [search, setSearch] = useState('');
  const [characters, setCharacters] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchCharacters = async () => {
    if (!search) return;

    try {
      // API call para buscar os personagens
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

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/disney.png')}
        style={{ width: 300, height: 200, resizeMode: 'contain' }}
      />
      <Text style={styles.text}>Buscar um personagem</Text>

      {/* Container da pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do personagem"
          value={search}
          onChangeText={setSearch}
        />

        {/* Botões de Ação */}
        <TouchableOpacity style={styles.button} onPress={fetchCharacters}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={clearSearch}>
          <Text style={styles.buttonText}>Limpar Busca</Text>
        </TouchableOpacity>
      </View>

      {/* Mensagem de erro */}
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

      {/* Resultados da pesquisa */}
      <FlatList
        data={characters}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.imageUrl && (
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
            )}
            <Text style={styles.name}>{item.name}</Text>

            {/* Exibindo filmes */}
            {item.films && item.films.length > 0 ? (
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
        )}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#043A5C',
    alignItems: 'center',
  },
  searchContainer: {
    width: '100%',
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
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#FEE567',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  filmsContainer: {
    marginTop: 10,
  },
  filmsTitle: {
    marginBottom: 5,
    color: '#5F5E68',
    fontWeight: '500',
  },
  film: {
    fontFamily: 'sans-serif',
    fontSize: 14,
    color: '#5F5E68',
  },
  button: {
    backgroundColor: '#8FD9FC',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    fontFamily: 'sans-serif',
    color: '#043A5C',
    fontSize: 16,
    fontWeight: 'bold',
  },
  flatList: {
    flex: 1,
  },
  text: {
    fontFamily: 'sans-serif',
    alignItems: 'center',
    margin: 20,
    fontSize: 25,
    fontWeight: 700,
    color: '#fff'
  },
});

export default Home;
