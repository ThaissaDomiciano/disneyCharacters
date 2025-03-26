// src/utils/auth.js

// Função para simular o login
export const login = async (username, password) => {
    // Simulação de login com sucesso
    if (username === 'user' && password === 'password') {
      return { success: true, message: 'Login bem-sucedido!' };
    }
    return { success: false, message: 'Usuário ou senha inválidos!' };
  };
  
  // Função para simular o registro
  export const register = async (username, password) => {
    // Simulação de registro com sucesso
    return { success: true, message: 'Cadastro realizado com sucesso!' };
  };
  