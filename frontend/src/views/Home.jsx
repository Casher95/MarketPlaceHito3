import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
// Importa tu componente de Card, ajusta la ruta si es necesario
import ProductCard from '../components/ProductCard'; 

const Home = () => {
  const { products, loading } = useContext(UserContext);

  return (
    <div className="container mt-5">
      {/* Título de control para confirmar que el despliegue funcionó */}
      <h1 className="text-center mb-5 font-weight-bold">
        U-MARKET <span className="text-primary">VERSION FINAL PRESENTACIÓN</span>
      </h1>

      <div className="row">
        {/* BLINDAJE: Verificamos que products exista y sea un array antes del .length */}
        {Array.isArray(products) && products.length > 0 ? (
          products.map((p) => (
            <div className="col-md-4 mb-4" key={p.id}>
              <ProductCard product={p} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center mt-5">
            {loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            ) : (
              <div className="alert alert-info">
                No hay productos disponibles. Revisa la conexión con el Backend.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;