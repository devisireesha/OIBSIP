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

    if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        convertedTemp = (temperature * 9 / 5) + 32;
    } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
        convertedTemp = temperature + 273.15;
    } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        convertedTemp = (temperature - 32) * 5 / 9;
    } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
        convertedTemp = (temperature - 32) * 5 / 9 + 273.15;
    } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
        convertedTemp = temperature - 273.15;
    } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
        convertedTemp = (temperature - 273.15) * 9 / 5 + 32;
    } else {
        document.getElementById("result").textContent = "Unsupported conversion";
        return;
    }

    let resultString = `Converted temperature: ${convertedTemp.toFixed(2)}`;

    if (fromUnit === 'celsius') {
        resultString += ' °C';
    } else if (fromUnit === 'fahrenheit') {
        resultString += ' °F';
    } else if (fromUnit === 'kelvin') {
        resultString += ' K';
    }

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
