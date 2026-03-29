function iniciarJuego () {
var puntoDeFelicidad = 2;
var dinero = 12;
function preguntarSiONo(pregunta) {
var decision = prompt(pregunta);
    while(decision !== 'si' && decision !== 'no') {
        decision = prompt('solo puedes elejir si o no!! hejeke')
    }
        alert ('has elejido ' + decision);
        return decision;
}
    alert('tienes ' + dinero + ' monedas!')
    alert('tienes ' + puntoDeFelicidad + ' Puntos de felicidad!')
var decision1 = preguntarSiONo('Quieres comprar un chicle? (-2 moneda(s))') 
    if(decision1 === 'si') {
        if (dinero >=2) {
        dinero -=2
        alert('usaste dos monedas!! Ahora tienes ' + dinero + ' moneda(s)'); 
         alert('estás feliz')
         puntoDeFelicidad++
         alert('has ganado 1 punto de felicidad! Ahora tienes ' + puntoDeFelicidad + ' punto(s) de felicidad'); 
        }    
        else {feliz
            alert('no te alcanza para el chicle!! te quedan ' + dinero + 'moneda(s)');
        } 
    }
    else {
        alert('no has comprado el chicle!!')
        alert('estás triste')
         alert('has ahorrado 2 monedas')
         puntoDeFelicidad--
          alert('has perdido 1 punto de felicidad! Ahora tienes ' + puntoDeFelicidad + ' punto(s) de felicidad'); 
    } 
var decision2 = preguntarSiONo('Quieres comprar un bombombun? (-3 moneda(s))') 
        if(decision2 === 'si') {
        if (dinero >=3) {
        dinero -=3
        alert('usaste tres monedas! Ahora tienes ' + dinero + ' moneda(s)')
         alert('estás feliz')
         puntoDeFelicidad++
          alert('has ganado 1 punto de felicidad! Ahora tienes ' + puntoDeFelicidad + ' punto(s) de felicidad'); 
        }
        else {
            alert('no te alcanza para el bombombun!! te quedan ' + dinero + 'moneda(s)')
        }
    } else {
        alert('no has comprado el bombonbum!!')
        alert('estás triste')
         alert('has ahorrado 3 monedas')
         puntoDeFelicidad--
          alert('has perdido 1 punto de felicidad! Ahora tienes ' + puntoDeFelicidad + ' punto(s) de felicidad'); 
    } 
var decision3 = preguntarSiONo('Quieres comprar un shampoo? (-6 moneda(s))') 
        if(decision3 === 'si') {
        if (dinero >=6) {
        dinero -=6
        alert('usaste seis monedas! Ahora tienes ' + dinero + ' moneda(s)')
         alert('estás feliz')
         puntoDeFelicidad++ 
          alert('has ganado 1 punto de felicidad! Ahora tienes ' + puntoDeFelicidad + ' punto(s) de felicidad'); 
        }
        else {
            alert('no te alcanza para el shampoo!! te quedan ' + dinero + ' moneda(s)')
        }
    } else {
        alert('no has comprado el Shampoo!! Ahora tienes caspa')
         alert('ahora tienes que usar 7 monedas para que se arregle tu pelo!')
         if (dinero >=7) {
        dinero -=7
        alert('Usaste siete monedas!! ahora tienes' + dinero + ' moneda(s)')
        } 
         else { 
               alert('no tienes suficiente para el tratamiento!! te quedan ' + dinero + ' moneda(s)')
         }
    }
var decision4 = preguntarSiONo('has encontrado una moneda en el suelo!! La quieres agarrar?') 
        if(decision4 === 'si') {
           if(dinero +=4) {
           alert('conseguiste 4 monedas! Ahora tienes ' + dinero + ' moneda(s)')
           alert('el dueño de la moneda aparece y te trata mal')
              if (dinero >=4) {
            dinero -=4}
            puntoDeFelicidad--
           alert('perdiste un punto de felicidad y 4 monedas!! ahora tienes ' + dinero + ' moneda(s) y ' + puntoDeFelicidad + ' punto(s) de felicidad!') 
         }
           else { 
            alert('no has obtenido las 4 monedas!! te quedan ' + dinero + ' moneda(s)'); }
        }
         else {
        alert(' Ahora no tienes suficiente dinero para pagar, pero te comiste un helado')
         alert('debes 5 monedas en la tienda') }
         if (dinero >=5) {
        dinero -=5
        alert('Usaste cinco monedas!! ahora tienes ' + dinero + ' moneda(s)') 
        alert('has ganado') }
         else { 
               alert('no tienes suficiente para el pago!! te quedan ' + dinero + ' moneda(s)')
               alert('Has perdido')
         }
if(dinero <= 0) {
    alert('has perdido, no hay plata!!')
}
if(puntoDeFelicidad <= 0) {
    alert('has perdido, tas triste!!')
   }
}