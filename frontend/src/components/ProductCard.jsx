import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { UserContext } from '../context/UserContext';

const ProductCard = ({ product }) => {
  const { favorites, toggleFavorite } = useContext(UserContext);
  const isFavorite = favorites?.find(p => p.id === product.id);

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:scale-105 transition-all duration-300">
      <div className="h-56 bg-slate-50 flex items-center justify-center relative">
        <button 
          onClick={() => toggleFavorite(product)}
          className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
        >
          <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-300"} />
        </button>
        {/* Usamos .img de tu BD */}
        <img src={product.img} alt={product.nombre} className="h-full w-full object-cover" />
      </div>
      <div className="p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.nombre}</h3>
        <p className="text-3xl font-black text-[#7C5DFA]">
          ${product.precio ? product.precio.toLocaleString() : '0'}
        </p>
        <Link 
          to={`/producto/${product.id}`} 
          className="mt-6 block text-center bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-[#7C5DFA] transition-colors"
        >
          Ver detalle
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;