// variaveis
var varX = document.getElementById('varX')
var varY = document.getElementById('varY')
var varScreen = document.getElementById('screenBot')
// operandos
var op1op1 = document.getElementById('op1op1')
var op1op2 = document.getElementById('op1op2')
var op2op1 = document.getElementById('op2op1')
var op2op2 = document.getElementById('op2op2')
var op3op1 = document.getElementById('op3op1')
var op3op2 = document.getElementById('op3op2')
// outros
var screenTop = document.getElementById('screenTop')
var keySize = document.getElementById('keySize')
// botoes
var btClear = document.getElementById('clear')
var btEncScreen = document.getElementById('encScreen')
var btEncVarX = document.getElementById('encVarX')
var btEncVarY = document.getElementById('encVarY')
// globais
var keys
var values = {'x': 10, 'y': 20, 'z': 0}
var valuesState = {'x': 0, 'y': 0, 'z': 0}

function getValues () {
  if (!valuesState.x) {
    values['x'] = parseInt(varX.value, 10)
  }
  if (!valuesState.y) {
    values['y'] = parseInt(varY.value, 10)
  }
  if (!valuesState.z) {
    values['z'] = parseInt(varScreen.innerText, 10)
  }
}

function storeValues () {
  varX.value = values['x'].toString()
  varY.value = values['y'].toString()
  varScreen.innerText = values['z'].toString()
  if (valuesState.z) {
    btEncScreen.innerText = 'Decrypt'
  } else {
    btEncScreen.innerText = 'Encrypt'
  }
  if (valuesState.y) {
    btEncVarY.innerText = 'Decrypt'
  } else {
    btEncVarY.innerText = 'Encrypt'
  }
  if (valuesState.x) {
    btEncVarX.innerText = 'Decrypt'
  } else {
    btEncVarX.innerText = 'Encrypt'
  }
}

btClear.onclick = function () {
  values = {'x': 10, 'y': 20, 'z': 0}
  valuesState = {'x': 0, 'y': 0, 'z': 0}
  storeValues()
}

btEncScreen.onclick = function () {
  encDec(btEncScreen, 'z')
}

btEncVarX.onclick = function () {
  encDec(btEncVarX, 'x')
}

btEncVarY.onclick = function () {
  encDec(btEncVarY, 'y')
}

function encDec (button, value) {
  getValues()
  if (valuesState[value]) {
    valuesState[value] = 0
    values[value] = keys.sec.decrypt(values[value])
    button.innerText = 'Encrypt'
  } else {
    valuesState[value] = 1
    values[value] = keys.pub.encrypt(values[value])
    button.innerText = 'Decrypt'
  }
  storeValues()
}

function soma () {
  getValues()
  if (!valuesState[op1op1.value] || !valuesState[op1op2.value]) {
    alert('Encrypt both values before add')
    return
  }
  values['z'] = keys.pub.add(values[op1op1.value], values[op1op2.value])
  valuesState.z = 1
  storeValues()
}

function mul () {
  getValues()
  if (!valuesState[op2op1.value]) {
    alert('Encrypt the first value before mul')
    return
  }
  values['z'] = keys.pub.mult(values[op2op1.value], op2op2.value)
  valuesState.z = 1
  storeValues()
}

function store () {
  getValues()
  values[op3op1.value] = values[op3op2.value]
  valuesState[op3op1.value] = valuesState[op3op2.value]
  storeValues()
}

function genKeys () {
  var size = keySize.value.slice(0, -5)
  keys = Paillier.generateKeys(parseInt(size, 10))
  screenTop.innerText = size + ' bits keys generated.'
}

function randomize () {
  getValues()
  for (var i in valuesState) {
    if (valuesState[i]) {
      values[i] = keys.pub.randomize(values[i])
    }
  }
  storeValues()
}

genKeys()
storeValues()
