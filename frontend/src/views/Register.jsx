import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-black text-center mb-6 text-gray-800 tracking-tighter">CREAR CUENTA</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Nombre de Usuario</label>
          <input 
            type="text" 
            className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Correo Institucional</label>
          <input 
            type="email" 
            className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Contraseña</label>
          <input 
            type="password" 
            className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="w-full bg-[#7C5DFA] text-white py-4 rounded-xl font-bold mt-4 hover:bg-purple-700 transition shadow-lg shadow-purple-100">
          Registrarme
        </button>
      </form>
    </div>
  );
};

export default Register;