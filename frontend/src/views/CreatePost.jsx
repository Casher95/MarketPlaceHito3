import React from 'react';

const CreatePost = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Publicar Nuevo Producto</h2>
      <div className="space-y-4">
        <input type="text" placeholder="Título del producto" className="w-full p-2 border rounded" />
        <input type="number" placeholder="Precio" className="w-full p-2 border rounded" />
        <textarea placeholder="Descripción" className="w-full p-2 border rounded h-32"></textarea>
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Subir Publicación
        </button>
      </div>
    </div>
  );
};

export default CreatePost;