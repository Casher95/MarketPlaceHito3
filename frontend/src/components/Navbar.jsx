import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { LogIn, LogOut, Monitor, Heart } from 'lucide-react';

const Navbar = () => {
  const { user, logout, favorites } = useContext(UserContext);

  return (
    <nav className="bg-[#7C5DFA] text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-2">
          <Monitor size={28} />
          <span>U-MARKET</span>
        </Link>
        
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-purple-200 transition font-bold">Tienda</Link>
          
          <Link to="/favoritos" className="relative flex items-center gap-1 hover:text-purple-200 transition font-bold">
            <Heart size={20} className={favorites.length > 0 ? "fill-white" : ""} />
            <span>Favoritos</span>
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-[#7C5DFA]">
                {favorites.length}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-4 border-l border-purple-400 pl-4">
              <Link to="/perfil" className="bg-white text-purple-700 px-4 py-1.5 rounded-full text-sm font-black shadow-sm">
                Mi Perfil
              </Link>
              <button onClick={logout} className="hover:text-red-300 transition">
                <LogOut size={20}/>
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1 bg-purple-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-white hover:text-purple-700 transition">
              <LogIn size={18}/> Entrar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;