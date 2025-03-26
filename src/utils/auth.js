export const login = async (username, password) => {
   
    if (username === 'user' && password === 'password') {
      return { success: true, message: 'Login bem-sucedido!' };
    }
    return { success: false, message: 'Usuário ou senha inválidos!' };
  };
  
  export const register = async (username, password) => {
    return { success: true, message: 'Cadastro realizado com sucesso!' };
  };
  