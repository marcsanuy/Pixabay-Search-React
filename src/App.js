import React, { useState, useEffect } from 'react';
import Buscador from './components/Buscador';
import ListadoImagenes from './components/ListadoImagenes';


function App() {

  const [ busqueda, guardarBusqueda ] = useState('');
  const [ imagenes, guardarImagenes ] = useState([]);
  const [ paginaActual, guardarPaginaActual ] = useState(1);
  const [ totalPaginas, guardarTotalPaginas ] = useState(1);

  useEffect(() => {

      const consultarAPI = async () => {

        if(busqueda === '') return;

        const imagenesPorPagina = 30;
        const key = '14538454-25ba5fb807ff6d9f7403295ce';

        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarImagenes(resultado.hits);

        // Calcular el total de páginas
        const calcularTotalPaginas = Math.ceil( resultado.totalHits / imagenesPorPagina)
        guardarTotalPaginas ( calcularTotalPaginas );

        // Scroll a inicio
        const jumbotron = document.querySelector('.jumbotron');
        jumbotron.scrollIntoView({behavior: 'smooth', block: 'end'});

      }
      consultarAPI();

  }, [busqueda, paginaActual]);

  const paginaAnterior = () => {
    let nuevaPaginaActual = paginaActual - 1;
    // Colocarlo en el State
    guardarPaginaActual(nuevaPaginaActual);
  }

  const paginaSiguiente = () => {
    let nuevaPaginaActual = paginaActual +1;
    // Colocarlo en el State
    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="app container">
      <div className="jumbotron">
          <p className="lead text-center">Buscador de Imágenes</p>

            <Buscador 
              guardarBusqueda={guardarBusqueda}
            />

      </div>

      <div className="row justify-content-center">
          <ListadoImagenes
            imagenes={imagenes}
          />

          { ( paginaActual === 1 ) ? null :( 
               <button onClick={paginaAnterior} type="button" className="btn btn-secondary mr-1">Anterior &laquo;</button>
          )}
         
          { ( paginaActual === totalPaginas ) ? null: (
              <button onClick={paginaSiguiente} type="button" className="btn btn-secondary mr-1">Siguiente &raquo;</button>
          ) }  
          
      </div>
     
    </div>
  );
}

export default App;
