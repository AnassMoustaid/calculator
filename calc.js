const calcDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');


let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number){
    // Replace current display value if first value enrtered
    if (awaitingNextValue) {
        calcDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        const displayValue = calcDisplay.textContent;
        // if the current display value is 0, replace it, if not add a number
        calcDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}


// calc first and second value depending on opeartor 
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

    '=': (firstNumber, secondNumber) => secondNumber,
}

function addDecimal() {
    //if opeartor pressed, dont add decimal
    if (awaitingNextValue) {return};
    // If no decimal, add one
    if(!calcDisplay.textContent.includes('.')){
        calcDisplay.textContent = `${calcDisplay.textContent}.`
    }
}

function useOperator(operator) {
    const currentValue = Number(calcDisplay.textContent);
    // prevent multiple oprators 
    if (operatorValue && awaitingNextValue){ 
        operatorValue = operator;
        return;}
    // assign first value if no value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        console.log(firstValue, operatorValue, currentValue);
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calcDisplay.textContent = calculation;
        firstValue = calculation;
    }



    awaitingNextValue = true;
    operatorValue = operator; 
}


// Add Event listener for numbers, operators and decimal numbers

inputBtns.forEach((inputBtn) =>  { 
    if (inputBtn.classList.length === 0) {  // buttons that doesnt have classes
        inputBtn.addEventListener('click', () => { sendNumberValue(inputBtn.value) });
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => { useOperator(inputBtn.value) }) ; 
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal() ) ;
     } 
// Reset display 
function resetAll() {
    calcDisplay.textContent= ('0') ;
    operatorValue = '';
    awaitingNextValue = false;
    calcDisplay.textContent = '0';
}

clearBtn.addEventListener('click', resetAll); } )