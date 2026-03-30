import React, { createContext, useState } from 'react';
import axios from 'axios';
// Importamos la URL de Render que configuramos antes
import { BASE_URL } from '../config'; 

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Función de Registro
  const register = async (userData) => {
    try {
      // Usamos la constante BASE_URL para apuntar a Render
      await axios.post(`${BASE_URL}/usuarios`, userData);
      return true;
    } catch (error) {
      console.error("❌ Error en registro:", error.response?.data || error.message);
      return false;
    }
  };

  // Función de Login
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/login`, { email, password });
      
      // Guardamos el token y el usuario (sin el password por seguridad)
      localStorage.setItem("token", data.token);
      setUser(data.usuario);
      
      return { success: true };
    } catch (error) {
      console.error("❌ Error en login:", error.response?.data || error.message);
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};