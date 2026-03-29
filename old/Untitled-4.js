
var frase = prompt('escribe algo we :3');
var tieneNumero = false;
for(var i = 0; i < frase.length; i++) {
    if('0123456789'.includes(frase[i])) {
        tieneNumero = true;
        break;
    }
}
if(tieneNumero) {
    alert('bro receta, como le vas a poner numeros? eres o te haces?')
}   
if(frase === '') {
    prompt('escribe algo w, no te va a tumbar la mano')
}
else {
    var words = frase.split(' ');
var cantidad = words.length;
    alert('we, esto tiene ' + cantidad + ' palabras hejeehwkek')
} 