import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useContext(UserContext);
  
  // Buscamos el producto por el ID que viene en la URL
  const product = products.find((p) => p.id == id);

  // Si el producto no existe o está cargando, mostramos un spinner
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7C5DFA] mb-4"></div>
        <h2 className="text-xl font-bold text-gray-600">Buscando producto en la base de datos...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-500 hover:text-[#7C5DFA] font-bold mb-8 transition-colors"
      >
        <ArrowLeft size={20} /> Volver a la tienda
      </button>

      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100 min-h-[500px]">
        {/* Lado de la Imagen */}
        <div className="flex-1 bg-slate-50 flex items-center justify-center p-12">
          <img 
            src={product.img} 
            alt={product.nombre} 
            className="max-h-96 w-full object-contain hover:scale-105 transition-transform duration-500" 
          />
        </div>
        
        {/* Lado de la Información */}
        <div className="flex-1 p-12 flex flex-col justify-center">
          <span className="text-[#7C5DFA] font-bold tracking-widest uppercase text-xs bg-purple-50 px-3 py-1 rounded-full w-fit">
            Tech Station
          </span>
          
          <h2 className="text-5xl font-black text-gray-800 mt-4 leading-tight">
            {product.nombre}
          </h2>
          
          <p className="text-4xl font-black text-[#7C5DFA] mt-6">
            ${product.precio ? product.precio.toLocaleString() : '0'}
          </p>
          
          <div className="mt-10">
            <h4 className="font-bold text-gray-700 mb-3 border-b border-gray-100 pb-2">Descripción:</h4>
            <p className="text-gray-500 leading-relaxed text-lg">
              {product.descripcion || "Sin descripción disponible."}
            </p>
          </div>

          <button className="w-full mt-12 bg-gray-900 text-white py-6 rounded-3xl font-black text-xl hover:bg-[#7C5DFA] shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3">
            <ShoppingCart size={24} /> Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;