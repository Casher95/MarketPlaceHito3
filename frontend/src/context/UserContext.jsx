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
    
    // Mapeamos los datos para asegurar que coincidan con tus variables en español
    // Esto previene que si la API manda 'name' o 'price', se conviertan a lo que tú usas
    const dataLimpia = response.data.map(p => ({
      id: p.id,
      nombre: p.nombre || p.name || "Producto sin nombre",
      precio: Number(p.precio || p.price || 0),
      descripcion: p.descripcion || p.description || "Sin descripción disponible.",
      img: p.img || p.image || p.imagen
    }));

    setProducts(dataLimpia);
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