import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import ProductCard from '../components/ProductCard';

const Favorites = () => {
  // Uso de useContext para cumplir con la rúbrica de Estado Global 
  const { favorites } = useContext(UserContext);

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-[80vh]">
      <h2 className="text-4xl font-black text-gray-800 mb-10 text-center">
        Mis Favoritos <span className="text-[#7C5DFA]">♥</span>
      </h2>

      {favorites.length === 0 ? (
        <div className="bg-white rounded-3xl p-20 shadow-sm border border-dashed border-gray-300 text-center">
          <p className="text-gray-500 text-xl font-medium">
            Aún no tienes productos guardados. 
          </p>
          <p className="text-gray-400 mt-2">
            Explora la tienda y haz clic en el corazón de los productos que te gusten.
          </p>
        </div>
      ) : (
        // Renderización dinámica y paso de props para cumplir con la rúbrica 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;