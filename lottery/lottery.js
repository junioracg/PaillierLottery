var encAcumulador = document.getElementById('encAcumulador')
var acumulador = document.getElementById('acumulador')
var vetPos = document.getElementById('posicoes')
var nxa = [document.getElementById('N1A'),
           document.getElementById('N2A'),
           document.getElementById('N3A'),
           document.getElementById('N4A'),
           document.getElementById('N5A')]

var encAcu = true
var acuVal
var posVet = []
var keys = Paillier.generateKeys(1024)
acuVal = keys.pub.encrypt(0)
acumulador.innerText = acuVal
var totalApostas = 0
atualizaPos()

function apostaRnd() {
  if(totalApostas >= 25){
    alert("Esta implementacao é limitada a 25 apostas")
    return
  }
  totalApostas += 1
  var numbers = [genRnd(60) + 1, genRnd(60) + 1, genRnd(60) + 1, genRnd(60) + 1, genRnd(60) + 1]
  pad2(numbers)
  var rnd = genRnd(25)
  while(posVet[rnd] == 1){
    rnd = genRnd(25)
  }
  posVet[rnd] = 1
  atualizaPos()
  var apN = numbers.join('')
  apN = apN + Array(rnd * 10 + 1).join(0)
  apN = keys.pub.encrypt(apN)
  if (!encAcu) {
    acuVal = keys.pub.encrypt(acuVal)
    encAcu = true
  }
  acuVal = keys.pub.add(acuVal, apN)
  acumulador.innerText = acuVal
  encAcu = true
  encAcumulador.innerText = "Decifrar Apostas"
}

function apostar() {
  if(totalApostas >= 25){
    alert("Esta implementacao é limitada a 25 apostas")
    return
  }
  totalApostas += 1
  var numbers = [nxa[0].value, nxa[1].value, nxa[2].value, nxa[3].value, nxa[4].value]
  pad2(numbers)
  var rnd = genRnd(25)
  while(posVet[rnd] == 1){
    rnd = genRnd(25)
  }
  posVet[rnd] = 1
  atualizaPos()
  var apN = numbers.join('')
  apN = apN + Array(rnd * 10 + 1).join(0)
  apN = keys.pub.encrypt(apN)
  if (!encAcu) {
    acuVal = keys.pub.encrypt(acuVal)
    encAcu = true
  }
  acuVal = keys.pub.add(acuVal, apN)
  acumulador.innerText = acuVal
  encAcu = true
  encAcumulador.innerText = "Decifrar Apostas"
}

function reiniciar () {
  encAcu = true
  posVet = []
  keys = Paillier.generateKeys(1024)
  acuVal = keys.pub.encrypt(0)
  acumulador.innerText = acuVal
  encAcumulador.innerText = "Decifrar Apostas"
  totalApostas = 0
  for (var i in nxa) {
    nxa[i].value = ''
  }
  atualizaPos()
}

encAcumulador.onclick = function () {
  if (encAcu) {
    acuVal = keys.sec.decrypt(acuVal)
    acumulador.innerText = acuVal
    encAcu = false
    encAcumulador.innerText = "Cifrar Apostas"
  } else {
    acuVal = keys.pub.encrypt(acuVal)
    acumulador.innerText = acuVal
    encAcu = true
    encAcumulador.innerText = "Decifrar Apostas"
  }
}

function pad2(vet) {
  for (var i in vet) {
    if (vet[i].toString().length === 1) {
      vet[i] = '0' + vet[i].toString()
    } else {
      vet[i] = vet[i].toString()
    }
  }
}

function atualizaPos() {
  var res = ''
  for (var i = 24; i >= 0; i--) {
    if (posVet[i] === 1) {
      res += '1'
    } else {
      res += '0'
    }
  }
  vetPos.innerText = res
}

function genRnd(max) {
  return Math.floor((Math.random() * max))
}
