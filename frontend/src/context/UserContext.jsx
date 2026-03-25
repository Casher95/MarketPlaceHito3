import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [products] = useState([
    { id: 1, name: 'MacBook Pro M2', price: 24500, category: 'Laptops' },
    { id: 2, name: 'iPhone 15 Pro', price: 19900, category: 'Telefonía' },
    { id: 3, name: 'Monitor Gamer 27"', price: 5800, category: 'Computadoras' },
  ]);

  const login = (email) => setUser({ email });
  const logout = () => { setUser(null); setFavorites([]); };

  const toggleFavorite = (product) => {
    setFavorites((prev) => 
      prev.find(p => p.id === product.id) 
        ? prev.filter(p => p.id !== product.id) 
        : [...prev, product]
    );
  };

  return (
    <UserContext.Provider value={{ user, login, logout, favorites, toggleFavorite, products }}>
      {children}
    </UserContext.Provider>
  );
};