import React, { useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { UserContext } from '../context/UserContext';

const Home = () => {
  // Extraemos products del context
  const { products, loading } = useContext(UserContext);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-black mb-8 text-gray-800 uppercase tracking-tighter">
        U-Market <span className="text-[#7C5DFA]">TEST</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* ESTA ES LA PARTE CRÍTICA:
           1. Verificamos si 'products' existe (no es undefined ni null).
           2. Verificamos si tiene elementos (.length > 0).
        */}
        {products && products.length > 0 ? (
          products.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))
        ) : (
          /* Mientras products sea undefined o vacío, mostramos esto en lugar de romper la app */
          <div className="col-span-full text-center py-10">
            <p className="text-xl text-gray-500 italic">
              {loading ? "Conectando con la base de datos de Render..." : "No se encontraron productos disponibles."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;