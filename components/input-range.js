// Defino un nuevo componente llamado <input-range>
class InputRange extends HTMLElement {
  constructor() {
    super();
    
 // Creo un Shadow DOM para encapsular estilos y estructura
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
  // Aquí se define el HTML interno del componente, incluyendo estilo y formulario
    this.shadowRoot.innerHTML = `
      <style>
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 0 10px #ccc;
          margin-bottom: 20px;
        }
        input {
          padding: 5px;
          width: 150px;
        }
        button {
          padding: 5px 10px;
          cursor: pointer;
        }
      </style>
      <form>
        <input type="number" id="inicio" placeholder="Número inicial" />
        <input type="number" id="fin" placeholder="Número final" />
        <button type="submit">Mostrar</button>
        <p id="error" style="color:red;"></p>
      </form>
    `;

// Obtenemos los elementos del formulario
    const form = this.shadowRoot.querySelector('form');
    const inicioInput = this.shadowRoot.getElementById('inicio');
    const finInput = this.shadowRoot.getElementById('fin');
    const errorMsg = this.shadowRoot.getElementById('error');

//Se valida la entrada y se emite un evento personalizado
    form.addEventListener('submit', e => {
      e.preventDefault();

      const inicio = parseInt(inicioInput.value);
      const fin = parseInt(finInput.value);
 // Validación de campos
      if (isNaN(inicio) || isNaN(fin)) {
        errorMsg.textContent = 'Por favor, ingresa valores numéricos válidos.';
        return;
      }

      if (inicio > fin) {
        errorMsg.textContent = 'El número inicial debe ser menor o igual al número final.';
        return;
      }
  //Se limpia el mensaje de error
      errorMsg.textContent = '';

  // Enviamos el evento personalizado 'rango-seleccionado' con los datos
      this.dispatchEvent(new CustomEvent('rango-seleccionado', {
        detail: { inicio, fin },
        bubbles: true,
        composed: true
      }));
    });
  }
}
// Registramos el componente como una etiqueta HTML personalizada
customElements.define('input-range', InputRange);