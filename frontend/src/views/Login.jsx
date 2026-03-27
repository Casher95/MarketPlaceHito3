import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate('/profile'); // Redirige al perfil tras el éxito
    } else {
      alert("Credenciales incorrectas. Intenta de nuevo.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-black text-center mb-6 text-gray-800 tracking-tighter">INICIAR SESIÓN</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Correo Electrónico</label>
          <input type="email" className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-400"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Contraseña</label>
          <input type="password" className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-400"
            value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="w-full bg-[#7C5DFA] text-white py-4 rounded-xl font-bold mt-4 hover:bg-purple-700 transition">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;