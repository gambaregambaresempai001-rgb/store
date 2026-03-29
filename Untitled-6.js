
function preguntarSiONo(pregunta) {
    var decision = prompt(pregunta);
    while(decision !== 'si' && decision !== 'no') {
        decision = prompt('solo puedes elejir si o no!! hejeke')
    }
        alert ('has elejido ' + decision);
        return decision;
}
var decision1 = preguntarSiONo('estas en tu casa, un señor te pide entrar porque su casa se quemó, ¿Lo dejas entrar?(si/no)')
var puntoDeConfianza = 3;
if(decision1 === 'si') {
   alert('el señor entra');
   alert('el señor te agradece y te da comida');
   var decision3 = preguntarSiONo('el señor te pregunta si puede quedarse tres dias(si/no)')
   if(decision3 === 'si') {
     alert('el señor se ve muy agradecido');
     puntoDeConfianza++
     alert('más 1 punto de confianza! ahora tienes ' + puntoDeConfianza)
       alert('al pasar los tres dias, el señor te da dinero!')
       alert('has ganado')
    }
   else {
     alert('el señor agradece, aunque se ve un poco decaido')
     puntoDeConfianza--;
     alert('menos un punto de confianza! ahora tienes ' + puntoDeConfianza)
       alert('el señor se va ese mismo dia')
       alert('has perdido')
   }
}
else if(decision1 === 'no') {
    alert('el señor no entra');

var decision2 = preguntarSiONo('el señor se enoja, ¿le hablas? (si/no)')
    if(decision2 === 'si') {
        alert('le mientes diciendo que no lo puedes dejar entrar porque hay mucha gente en tu casa, el señor te no cree porque no hay nadie ahi')
        alert('el señor quema tu casa')
        alert('has perdido')
    } else {
        alert('el señor se va enojado, pero vuelve en una hora y quema tu casa')
        alert('perdiste xdxd')
    } 
}
if(puntoDeConfianza <= 0) {
    alert('has perdido!!')
}