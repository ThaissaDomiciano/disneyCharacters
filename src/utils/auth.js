import AsyncStorage from '@react-native-async-storage/async-storage';

export const register = async (username, password) => {
  try {
    const existingUser = await AsyncStorage.getItem(username);
    if (existingUser) {
      return { success: false, message: 'Usuário já cadastrado!' };
    }

    await AsyncStorage.setItem(username, JSON.stringify({ username, password }));

    return { success: true, message: 'Cadastro realizado com sucesso!' };
  } catch (error) {
    return { success: false, message: 'Erro ao cadastrar usuário!' };
  }
};

export const login = async (username, password) => {
  try {
    const storedUser = await AsyncStorage.getItem(username);
    
    if (!storedUser) {
      return { success: false, message: 'Usuário não encontrado!' };
    }

    const { password: storedPassword } = JSON.parse(storedUser);

    if (storedPassword === password) {
      return { success: true, message: 'Login bem-sucedido!' };
    }

    return { success: false, message: 'Usuário ou senha inválidos!' };
  } catch (error) {
    return { success: false, message: 'Erro ao fazer login!' };
  }
};
