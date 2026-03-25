import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Favorites from './views/Favorites';
import ProductDetail from './views/ProductDetail';
import Profile from './views/Profile';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-slate-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />
              <Route path="/favoritos" element={<Favorites />} />
              <Route path="/perfil" element={<Profile />} />
              <Route path="/producto/:id" element={<ProductDetail />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;