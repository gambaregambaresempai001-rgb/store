
var password = '8011';
var intentos = 3;
while(intentos > 0) {
var intento = prompt('adivinaa hejehe');
  if (intento === "") {
        alert("adivinaa jejhej");
  }
 else if (intento === password) {
    alert('basta, como adivinaste?? :0');
break;
}
else {
    alert('no adivinaste UwU');
    intentos-- 
    alert('te quedan ' + intentos + ' intentoosss hejeeh')
    }
}
 if(intentos === 0) {
        alert('xdd nonono, PERDISTEE');
    }