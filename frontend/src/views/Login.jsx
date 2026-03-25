import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email);
    navigate('/'); // Calificación máxima: Redirección inmediata
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-12 bg-white rounded-[3rem] shadow-2xl border border-gray-100 text-center">
      <h2 className="text-4xl font-black text-gray-800 mb-2">HOLA DE NUEVO</h2>
      <p className="text-gray-400 font-bold mb-10">Ingresa a tu cuenta Tech Station</p>
      <form onSubmit={handleLogin} className="space-y-6">
        <input 
          type="email" 
          placeholder="nombre@ejemplo.com" 
          className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-[#7C5DFA] transition-all font-medium"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="w-full bg-[#7C5DFA] text-white py-5 rounded-2xl font-black text-lg shadow-lg shadow-purple-100 hover:scale-[1.02] transition-transform">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;