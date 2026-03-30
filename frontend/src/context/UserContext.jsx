import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
// Importamos la URL de Render
import { BASE_URL } from '../config'; 

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Esta es la función que hace que la interfaz cambie
  const getProducts = async () => {
    try {
      // Apuntamos a https://softjobs-backend.onrender.com/productos
      const { data } = await axios.get(`${BASE_URL}/productos`);
      setProducts(data); 
    } catch (error) {
      console.error("❌ Error al cargar productos:", error);
    }
  };

  // Ejecutar al cargar la aplicación
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <UserContext.Provider value={{ products, getProducts }}>
      {children}
    </UserContext.Provider>
  );
};