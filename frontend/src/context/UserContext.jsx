import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Asegúrate de que esta URL sea la de tu backend en Render
const BASE_URL = 'https://softjobs-backend.onrender.com'; 

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/productos`);
      // Si la data es un array, lo guardamos; si no, usamos array vacío
      const data = Array.isArray(response.data) ? response.data : [];
      setProducts(data);
    } catch (error) {
      console.error("❌ Error en la API:", error);
      setProducts([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <UserContext.Provider value={{ products, getProducts, loading }}>
      {children}
    </UserContext.Provider>
  );
};