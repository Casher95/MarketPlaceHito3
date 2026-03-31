import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import ProductCard from '../components/ProductCard'; 

const Home = () => {
  const { products, loading } = useContext(UserContext);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5 font-weight-bold">
        U-MARKET <span className="text-primary">TECH STATION</span>
      </h1>

      <div className="row">
        {/* BLINDAJE DBA: Validación triple para evitar el error de .length */}
        {loading ? (
          <div className="col-12 text-center mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3">Conectando con el servidor en la nube...</p>
          </div>
        ) : Array.isArray(products) && products.length > 0 ? (
          products.map((p) => (
            <div className="col-md-4 mb-4" key={p.id}>
              <ProductCard product={p} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center mt-5">
            <div className="alert alert-warning">
              No se encontraron productos. Verifica que la tabla 'productos' tenga datos en Render.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;