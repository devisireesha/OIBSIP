const increaseTemperature = () => {
    const input = document.querySelector('#temp-input');
    let value = parseFloat(input.value);
    input.value = (value + 0.1).toFixed(1);
};

const decreaseTemperature = () => {
    const input = document.querySelector('#temp-input');
    let value = parseFloat(input.value);
    if (value > 0) {
        input.value = (value - 0.1).toFixed(1);
    }
};

const calcTemp = (e) => {
    e.preventDefault();
    const temperature = parseFloat(document.querySelector('#temp-input').value);
    const fromUnit = document.querySelector('#FromTemperature').value;
    const toUnit = document.querySelector('#toTemperature').value;

    if (isNaN(temperature)) {
        document.getElementById("result").textContent = "Enter a valid temperature";
        return;
    }

    if (fromUnit === '' || toUnit === '') {
        document.getElementById("result").textContent = "Select temperature units";
        return;
    }

    if (fromUnit === toUnit) {
        document.getElementById("result").innerHTML = "No conversion needed for the same unit";
        return;
    }

    let convertedTemp = 0;
    let fromSymbol = '';
    let toSymbol = '';

    if (fromUnit === 'celsius') {
        convertedTemp = temperature;
        fromSymbol = '°C';
    } else if (fromUnit === 'fahrenheit') {
        convertedTemp = (temperature - 32) * 5 / 9;
        fromSymbol = '°F';
    } else if (fromUnit === 'kelvin') {
        convertedTemp = temperature - 273.15;
        fromSymbol = 'K';
    }

    if (toUnit === 'celsius') {
        convertedTemp = convertedTemp;
        toSymbol = '°C';
    } else if (toUnit === 'fahrenheit') {
        convertedTemp = convertedTemp * 9 / 5 + 32;
        toSymbol = '°F';
    } else if (toUnit === 'kelvin') {
        convertedTemp = convertedTemp + 273.15;
        toSymbol = 'K';
    }

    let resultString = `Converted temperature: ${convertedTemp.toFixed(2)} ${toSymbol}`;
    document.getElementById("result").textContent = resultString;
};

const clear = () => {
    document.querySelector('#temp-input').value = '';
    document.querySelector('#FromTemperature').value = '';
    document.querySelector('#toTemperature').value = '';
    document.getElementById('result').textContent = '';
};

document.querySelector('.inc_dec .increment').addEventListener('click', increaseTemperature);
document.querySelector('.inc_dec .decrement').addEventListener('click', decreaseTemperature);

const form = document.querySelector('form');
form.addEventListener('submit', calcTemp);

document.getElementById('All_clear').addEventListener('click', clear);
