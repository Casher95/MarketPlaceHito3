import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Tu URL de Render
const BASE_URL = 'https://softjobs-backend.onrender.com'; 

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [products, setProducts] = useState([]); 
  const [user, setUser] = useState(null); 
  const [favorites, setFavorites] = useState([]); 
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/productos`);
      // Guardamos la respuesta que viene de la tabla 'productos'
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("❌ Error en la API:", error);
      setProducts([]); 
    } finally {
      setLoading(false);
    }
  };

  const logout = () => setUser(null);

  const toggleFavorite = (p) => {
    setFavorites(prev => 
      prev.find(f => f.id === p.id) 
        ? prev.filter(f => f.id !== p.id) 
        : [...prev, p]
    );
  };

  useEffect(() => { 
    getProducts(); 
  }, []);

  return (
    <UserContext.Provider value={{ 
      products, 
      getProducts, 
      loading, 
      user, 
      setUser, 
      logout, 
      favorites, 
      toggleFavorite 
    }}>
      {children}
    </UserContext.Provider>
  );
};