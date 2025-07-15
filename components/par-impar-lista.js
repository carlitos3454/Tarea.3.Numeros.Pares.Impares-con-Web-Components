// Defino un nuevo componente llamado <par-impar-lista>
class ParImparLista extends HTMLElement {
  constructor() {
    super();
// Creo el Shadow DOM para encapsular contenido y estilos
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
// Inserto el contenedor donde se mostrará la lista
    this.shadowRoot.innerHTML = `<div id="lista"></div>`;

//Evento personalizado 'rango-seleccionado'
    window.addEventListener('rango-seleccionado', (e) => {
      this.mostrarLista(e.detail);
    });
  }
  
// Función que genera la lista con los números y si son pares o impares
  mostrarLista({ inicio, fin }) {
    const listaDiv = this.shadowRoot.getElementById('lista');
    let contenido = `
      <style>
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          background: #fff;
          margin: 5px 0;
          padding: 10px;
          border-radius: 5px;
          box-shadow: 0 0 5px #ccc;
        }
      </style>
      <ul>
    `;
// Rango de números se indica si son pares o impares
    for (let i = inicio; i <= fin; i++) {
      const tipo = i % 2 === 0 ? 'Par' : 'Impar';
      contenido += `<li>${i} - ${tipo}</li>`;
    }

    contenido += `</ul>`;
 // Lista en el componente
    listaDiv.innerHTML = contenido; 
  }
}
// Registramos el componente como etiqueta personalizada
customElements.define('par-impar-lista', ParImparLista);