import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config'; 

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // CLAVE 1: Inicializar con un arreglo vacío [] asegura que .length sea 0 y no dé error
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/productos`);
      
      // CLAVE 2: Verificamos que 'data' sea un arreglo antes de guardarlo
      if (data && Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("❌ Error al cargar productos:", error);
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