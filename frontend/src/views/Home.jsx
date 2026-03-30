import React, { useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { UserContext } from '../context/UserContext';

const Home = () => {
  const { products } = useContext(UserContext);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-black mb-8 text-gray-800 uppercase tracking-tighter">
        U-Market <span className="text-[#7C5DFA]">Tech</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Agregamos esta validación lógica: solo mapea si products existe y tiene algo */}
        {products && products.length > 0 ? (
          products.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))
        ) : (
          <p className="text-gray-500">Cargando productos desde la base de datos...</p>
        )}
      </div>
    </div>
  );
};

export default Home;