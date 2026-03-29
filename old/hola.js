let puntoDeFelicidad = 2;
let dinero = 12;
const textoJuego = document.getElementById('textoJuego')
const stats = document.getElementById('stats')
const opciones  = document.getElementById('opciones')
function derrotaXd () {
  if (dinero <= 0) {
    textoJuego.textContent = 'te quedaste pobre xdxd, conoces a yaper?';
    opciones.innerHTML = '';
    return true;
  }

  if (puntoDeFelicidad <= 0) {
    textoJuego.textContent = 'te volviste emo...';
    opciones.innerHTML = '';
    return true;
  }

  return false;
  const texto = document.getElementById("textoJuego");

function cambiarTexto(nuevoTexto) {
  texto.textContent = nuevoTexto;

  // reiniciar animación
  texto.classList.remove("animar-texto");
  void texto.offsetWidth; 
  texto.classList.add("animar-texto");
}
}
function reiniciarJuego() {
  dinero = 12;
  puntoDeFelicidad = 2;
  actualizarStats();
  iniciarJuego();
}
  function actualizarStats () {
    stats.textContent = 'monedas: ' +  dinero  + ' | Felicidad: ' +  puntoDeFelicidad; 
    }
  function mostrarMensaje (texto) {
    textoJuego.textContent = texto
   }
  function mostrarOpciones (pregunta, funcionSi, funcionNo) {
    textoJuego.textContent = pregunta;
    opciones.innerHTML = ` 
    <button id="btnSi">Sí</button>
    <button id="btnNo">No</button>
    `;
    document.getElementById("btnSi").onclick = funcionSi;
    document.getElementById("btnNo").onclick = funcionNo;
  }
   function iniciarJuego () {
    mostrarOpciones (
    'Quieres comprar un chicle? (-2 moneda(s))',
       function funcionSi () {
         if (dinero >=2) {
         dinero -=2;
         puntoDeFelicidad++
         mostrarMensaje ('compraste el chicle! ahora estás feliz!') } 
         else {
         mostrarMensaje ('No te alacanza para el chicle! ahora estás triste') 
         puntoDeFelicidad >=0
         puntoDeFelicidad--
            }
        actualizarStats ();
        siguienteParte ();
       },
        function funcionNo () {
        puntoDeFelicidad--
        mostrarMensaje('No compraste el chicle! Ahora estás triste!');
        actualizarStats();
        if (derrotaXd()) return;
        siguienteParte();
          } 
        );
          function siguienteParte () {
           opciones.innerHTML = `<button onclick="Pregunta2()">Siguiente</button>` 
          }
    }
      function Pregunta2 () {
    mostrarOpciones (
    'Quieres comprar un Bombonbun? (-3 moneda(s))',
       function funcionSi () {
         if (dinero >=3) {
         dinero -=3;
         puntoDeFelicidad++
         mostrarMensaje ('compraste el Bombonbun! ahora estás feliz!') } 
         else {
         mostrarMensaje ('No te alacanza para el Bombonbun! ahora estás triste') 
         puntoDeFelicidad >=0
         puntoDeFelicidad--
            }
        actualizarStats ();
        siguienteParte ();
       },
        function funcionNo () {
        puntoDeFelicidad--
        mostrarMensaje('No compraste el Bombonbun! Ahora estás triste!');
        actualizarStats();
        if (derrotaXd()) return;
        siguienteParte();
          } 
        );
          function siguienteParte () {
           opciones.innerHTML = `<button onclick="Pregunta3()">Siguiente</button>` 
          }
    }
          function Pregunta3 () {
    mostrarOpciones (
    'Quieres comprar un Shampoo? (-6 moneda(s))',
       function funcionSi () {
         if (dinero >=6) {
         dinero -=6;
         puntoDeFelicidad++
         mostrarMensaje ('compraste el Shampoo! ahora estás feliz!') } 
         else {
         mostrarMensaje ('No te alacanza para el Shampoo! ahora tienes caspa, debes usar 7 monedas para poder quitarte la caspa') 
         puntoDeFelicidad >=0
         puntoDeFelicidad--
            }
        actualizarStats ();
        siguienteParte ();
       },
        function funcionNo () {
        puntoDeFelicidad--
        if (dinero >=7) {
         dinero -=7;
        mostrarMensaje('No compraste el Shampoo! ahora tienes caspa, debes usar 7 monedas para poder quitarte la caspa');
        actualizarStats();
        siguienteParte(); }
        else {
         mostrarMensaje ('Has perdido') 
         puntoDeFelicidad--
            }
        actualizarStats();
         if (derrotaXd()) return;
        siguienteParte(); } 
        );
          function siguienteParte () {
           opciones.innerHTML = `<button onclick="Pregunta4()">Siguiente</button>` 
          }
    }
      function Pregunta4 () {
    mostrarOpciones (
    'Te has encontrado 4 monedas en el suelo, deseas llevarlas a un cajero para que encuentre al dueño? (+4 moneda(s))',
       function funcionSi () {
         if (dinero >=0) {
         mostrarMensaje ('El dueño apareció y te lo agradeció, ganas 2 monedas!')  
         dinero +=2;
         puntoDeFelicidad++ 
        }
         else {
         mostrarMensaje ('No agarraste la moneda!')
         puntoDeFelicidad >=0 
         puntoDeFelicidad--
            }
        actualizarStats ();
        siguienteParte ();
       },
        function funcionNo () {
        dinero +=4;
         puntoDeFelicidad++
        mostrarMensaje('Has obtenido 4 monedas! Pero el dueño de el dinero apareció y te insultó, diciendo que eran suyas, pierdes las 4 monedas');
        dinero -=4;
        puntoDeFelicidad >=0
        puntoDeFelicidad-- 
        actualizarStats();
        if (derrotaXd()) return;
        siguienteParte();
          } 
        );
    }
          function siguienteParte () {
           opciones.innerHTML = `<button onclick="Pregunta5()">Siguiente</button>` 
          }
          function Pregunta5 () {
    mostrarOpciones (
    'Quieres comprar un helado? (-3 moneda(s))',
       function funcionSi () {
         if (dinero >=3) {
         dinero -=3;
         puntoDeFelicidad++
         mostrarMensaje ('compraste el helado! ahora estás feliz!') } 
         else {
         mostrarMensaje ('No te alcanza para el helado! ahora estás triste') 
         puntoDeFelicidad >=0
         puntoDeFelicidad--;
            }
        actualizarStats ();
        siguienteParte ();
       },
        function funcionNo () {
          puntoDeFelicidad >=0
        puntoDeFelicidad--
        mostrarMensaje('No compraste el helado! Ahora estás triste!');
        actualizarStats();
        if (derrotaXd()) return;
        siguienteParte();
          } 
        );
          function siguienteParte () {
           opciones.innerHTML = `<button onclick="finJuego()">Finalizar</button>` 
          }
    }
        function finJuego() {
  if (puntoDeFelicidad < 3) {
    textoJuego.textContent = 'Ganaste!! Si te alcanzó jwejkw';
  } else {
    textoJuego.textContent = 'Ummm, ganaste pero quedaste pobre :P';
  }
  opciones.innerHTML = '';
  stats.textContent = 'Monedas: ' + dinero + ' | Felicidad: ' + puntoDeFelicidad;
  }
