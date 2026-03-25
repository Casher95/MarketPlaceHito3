import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, LogOut, Package } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-bold text-gray-600">Debes iniciar sesión para ver tu perfil.</h2>
        <button onClick={() => navigate('/login')} className="mt-4 text-purple-600 font-bold underline">Ir al Login</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-[#7C5DFA] h-32 px-8 flex items-end">
          <div className="bg-white p-2 rounded-2xl shadow-lg translate-y-8">
             <User size={64} className="text-purple-600" />
          </div>
        </div>
        <div className="p-10 pt-16">
          <h1 className="text-3xl font-bold text-gray-800">Mi Perfil</h1>
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Mail size={20} />
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Package size={20} />
              <span className="font-medium">Vendedor Activo</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="mt-10 w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-4 rounded-2xl font-bold hover:bg-red-100 transition"
          >
            <LogOut size={20} /> Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;