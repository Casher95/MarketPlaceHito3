import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useContext(UserContext);
  
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <div className="text-center mt-20 font-bold">Producto no encontrado</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-500 hover:text-[#7C5DFA] font-bold mb-8 transition"
      >
        <ArrowLeft size={20} /> Volver a la tienda
      </button>

      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        <div className="flex-1 bg-slate-50 flex items-center justify-center p-20">
          <Monitor size={150} className="text-purple-200" />
        </div>
        <div className="flex-1 p-12">
          <span className="text-[#7C5DFA] font-black uppercase text-sm tracking-widest">{product.category}</span>
          <h2 className="text-5xl font-black text-gray-800 mt-2">{product.name}</h2>
          <p className="text-4xl font-black text-[#7C5DFA] mt-6">${product.price.toLocaleString()}</p>
          <p className="mt-8 text-gray-500 leading-relaxed text-lg">
            Experimenta el máximo rendimiento con tecnología de vanguardia. Este equipo está diseñado 
            para superar las expectativas de los profesionales IT más exigentes.
          </p>
          <button className="w-full mt-12 bg-gray-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-[#7C5DFA] transition-all flex items-center justify-center gap-3 shadow-xl shadow-purple-100">
            <ShoppingCart size={24} /> Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;