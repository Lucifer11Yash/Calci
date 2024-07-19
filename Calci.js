let inverseMode = false;
let ans = 0;

function clearDisplay() {
    document.getElementById("display").innerText = "0";
}

function backspace() {
    const display = document.getElementById("display");
    display.innerText = display.innerText.slice(0, -1) || "0";
}

function appendToDisplay(value) {
    const display = document.getElementById("display");
    if (display.innerText === "0") {
        display.innerText = value;
    } else {
        display.innerText += value;
    }
}

function calculate() {
    const display = document.getElementById("display");
    try {
        let result = evaluateExpression(display.innerText);
        ans = result;
        display.innerText = result;
    } catch (e) {
        display.innerText = "Error";
    }
}

function evaluateExpression(expression) {
    // User-friendly replacements
    expression = expression.replace(/π/g, 'Math.PI')
                            .replace(/e/g, 'Math.E')
                            .replace(/sin⁻¹/g, 'Math.asin')
                            .replace(/cos⁻¹/g, 'Math.acos')
                            .replace(/tan⁻¹/g, 'Math.atan')
                            .replace(/sin/g, 'Math.sin')
                            .replace(/cos/g, 'Math.cos')
                            .replace(/tan/g, 'Math.tan')
                            .replace(/log/g, 'Math.log10')
                            .replace(/ln/g, 'Math.log')
                            .replace(/√/g, 'Math.sqrt')
                            .replace(/EXP/g, 'Math.exp')
                            .replace(/xʸ/g, '**')
                            .replace(/Ans/g, ans)
                            .replace(/x!/g, 'Math.factorial');

    return new Function('return ' + expression)();
}

function toggleInverse() {
    inverseMode = !inverseMode;
    if (inverseMode) {
        document.querySelector("button[onclick=\"appendToDisplay('sin(')\"]").innerText = "sin⁻¹";
        document.querySelector("button[onclick=\"appendToDisplay('cos(')\"]").innerText = "cos⁻¹";
        document.querySelector("button[onclick=\"appendToDisplay('tan(')\"]").innerText = "tan⁻¹";
    } else {
        document.querySelector("button[onclick=\"appendToDisplay('sin(')\"]").innerText = "sin";
        document.querySelector("button[onclick=\"appendToDisplay('cos(')\"]").innerText = "cos";
        document.querySelector("button[onclick=\"appendToDisplay('tan(')\"]").innerText = "tan";
    }
}

function setMode(mode) {
    // Set the mode to either radian or degree
    if (mode === 'rad') {
        Math.mode = 'rad';
    } else if (mode === 'deg') {
        Math.mode = 'deg';
    }
}

// Extend Math functions to support degrees if needed
Math.sin = (function() {
    var sin = Math.sin;
    return function(x) {
        if (Math.mode === 'deg') x = x * Math.PI / 180;
        return sin(x);
    };
})();
Math.cos = (function() {
    var cos = Math.cos;
    return function(x) {
        if (Math.mode === 'deg') x = x * Math.PI / 180;
        return cos(x);
    };
})();
Math.tan = (function() {
    var tan = Math.tan;
    return function(x) {
        if (Math.mode === 'deg') x = x * Math.PI / 180;
        return tan(x);
    };
})();

// Implement factorial function
Math.factorial = function(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = n; i > 1; i--) {
        result *= i;
    }
    return result;
};
