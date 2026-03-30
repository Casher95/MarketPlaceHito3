import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config'; 

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Mantenemos el estado como 'products' (en minúsculas)
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      // Llamamos al endpoint que definiste en tu backend
      const { data } = await axios.get(`${BASE_URL}/productos`);
      
      // Si la tabla 'productos' en la BD tiene datos, 'data' será un arreglo
      setProducts(Array.isArray(data) ? data : []); 
    } catch (error) {
      console.error("❌ Error al cargar productos:", error);
      setProducts([]); // Evita el error de 'undefined' que vimos en consola
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <UserContext.Provider value={{ products, getProducts }}>
      {children}
    </UserContext.Provider>
  );
};