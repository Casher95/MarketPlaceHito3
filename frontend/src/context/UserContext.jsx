import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

// URL de tu Backend en Render (la que ya te da "Cannot GET /")
const API_URL = "https://softjobs-backend.onrender.com";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);

  // Carga los productos reales desde la base de datos de Ohio
  const getProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/productos`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Función de Registro conectada al Backend
  const register = async (usuario) => {
    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });
      return response.ok;
    } catch (error) {
      console.error("Error en registro:", error);
      return false;
    }
  };

  // Función de Login con validación JWT
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser({ email: data.email });
        localStorage.setItem("token", data.token); // Almacena el token de seguridad
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error("Error en login:", error);
      return { success: false };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ 
      user, login, register, logout, products, favorites, setFavorites 
    }}>
      {children}
    </UserContext.Provider>
  );
};