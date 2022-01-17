let firstValue = 0;
let numberStorage = [];
let operatorStorage = [];
let equalsBoolean = false;
let equalsValue = 0;

function operate() {
    if(operatorStorage[0] == ' +') {
        let runningTotal = numberStorage.reduce(function (total, currentValue) {return total + currentValue})
        numberStorage.length = 0
        numberStorage.unshift(runningTotal);
    } else if(operatorStorage[0] == ' -') {
        let runningTotal = numberStorage.reduce(function (total, currentValue) {return total - currentValue})
        numberStorage.length = 0
        numberStorage.unshift(runningTotal);
    } else if(operatorStorage[0] == ' *') {
        let runningTotal = numberStorage.reduce(function (total, currentValue) {return total * currentValue})
        numberStorage.length = 0
        numberStorage.unshift(runningTotal);
    } else if(operatorStorage[0] == ' /') {
        let runningTotal = numberStorage.reduce(function (total, currentValue) {return total / currentValue})
        numberStorage.length = 0
        numberStorage.unshift(runningTotal);
    }
}

function storeValue(event) {
    firstValue += event.target.getAttribute('data-key');
}

function pushNumberToArray() {
    if(firstValue != '') {
        firstValue = parseFloat(firstValue);
        numberStorage.push(firstValue);
        firstValue = '';
    }
}

function collectOperator(event) {
    operatorStorage.push(event.target.id);

}

function evaluateEquation() {
    if(operatorStorage.length > 1) {
        operate();
        display.innerText = `${numberStorage[0]}`
        operatorStorage.shift();
    }
}

// Display updating

function displayUpdateNumber(event) {
    if(equalsBoolean == false) {
        display.innerText += event.target.id;
    } else if(equalsBoolean == true && display.innerText != '' && operatorStorage.length != 1) { 
        display.innerText = '';      
        display.innerText += event.target.id;
        numberStorage.length = 0;
        return equalsBoolean = false;
    } else {     
        display.innerText += event.target.id;
        numberStorage[0] = equalsValue;
        return equalsBoolean = false;
    }
}
function displayUpdateOperator(event) {
    display.innerText += `${event.target.id}\u00A0`
}

function displayUpdateEquals() {
    display.innerText = numberStorage[0];
    equalsValue = numberStorage[0];
    return equalsBoolean = true;
}

function displayAndStorageClear() {
    display.innerText = '';
    firstValue = 0;
    numberStorage.length = 0;
    operatorStorage.length = 0;
    equalsValue = 0;
    equalsBoolean = false;
}

function equalsResetStorage() {
    operatorStorage.length = 0;
}

const display = document.getElementById('result');
let displayText = display.innerText;

let numbers = document.querySelectorAll('.numberButton');
numbers.forEach(element => element.addEventListener('click', storeValue));
numbers.forEach(element => element.addEventListener('click', displayUpdateNumber));

let operators = document.querySelectorAll('.operators');
operators.forEach(element => element.addEventListener('click', pushNumberToArray));
operators.forEach(element => element.addEventListener('click', collectOperator));
operators.forEach(element => element.addEventListener('click', evaluateEquation));
operators.forEach(element => element.addEventListener('click', displayUpdateOperator));

let equals = document.getElementById('equals');
equals.addEventListener('click', pushNumberToArray);
equals.addEventListener('click', operate);
equals.addEventListener('click', displayUpdateEquals);
equals.addEventListener('click', equalsResetStorage);

let clear = document.getElementById('clear');
clear .addEventListener('click', displayAndStorageClear);