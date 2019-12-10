import React, { useState, useEffect } from 'react';
import Buscador from './components/Buscador';


function App() {

  const [busqueda, guardarBusqueda] = useState('');

  useEffect(() => {

      const consultarAPI = async () => {

        if(busqueda === '') return;

        const imagenesPorPagina = 30;
        const key = '14538454-25ba5fb807ff6d9f7403295ce';

        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        console.log(resultado);

      }
      consultarAPI();

  }, [busqueda]);

  return (
    <div className="app container">
      <div className="jumbotron">
          <p className="lead text-center">Buscador de Imágenes</p>

            <Buscador 
              guardarBusqueda={guardarBusqueda}
            />

      </div>

      <div className="row justify-content-center">
          
      </div>
     
    </div>
  );
}

export default App;
