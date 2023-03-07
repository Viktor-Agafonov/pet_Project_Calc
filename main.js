let radical = document.querySelector("#radical").textContent;
let numbersBtnArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
let symbolsBtnArray = ['C', '⌫', '%', '/', '*', '-', '+', '=', radical];
let firstVariable = "";
let secondVariable = "";
let operator = '';
let totalVariable = "";
let opr;
let resetoutputCache;
let colorMode = localStorage.getItem("colorMode");

let buttoBlock = document.querySelector(".buttoBlock");
let outputInput = document.querySelector(".outputInput");
let outputCache = document.querySelector(".outputCache");
outputInput.textContent = "0";

buttoBlock.addEventListener("click", shiwCalc);

function shiwCalc(e) {

    if (!e.target.classList.contains("button")) return;

    if (!resetoutputCache) outputCache.textContent = "";
    resetoutputCache = 1;

    let clickValue = e.target.textContent;

    if (numbersBtnArray.includes(clickValue)) {
        if (outputInput.textContent == "0") {
            outputInput.textContent = clickValue;
        } else {
            outputInput.textContent += clickValue;
        }
        if (!operator) {
            firstVariable += clickValue;
        } else {
            outputInput.textContent = "";
            secondVariable += clickValue;
            outputInput.textContent += secondVariable;
        }
    }

    if (symbolsBtnArray.includes(clickValue)) {
        if (clickValue == "⌫") deletrOneValue();
        else {

            if (operator && clickValue == '%') {
                totalVariable = givPercentResult(operator);
                outputInput.textContent = totalVariable;
                secondVariable = totalVariable;
            }
            else {

                if (!operator || operator == "=" || operator == radical) {
                    if (operator == radical) outputCache.textContent = "";
                    operator = clickValue;
                    opr = operator;
                    if (operator != radical) {
                        outputCache.textContent += "";
                        operator == "=" ? outputCache.textContent = outputInput.textContent : outputCache.textContent += outputInput.textContent;
                        outputCache.textContent += operator;
                    } else {
                        outputCache.innerHTML = "&#8730;" + firstVariable;
                        firstVariable = Math.sqrt(outputInput.textContent);
                        outputInput.textContent = firstVariable;
                    }


                } else {
                    if (clickValue == radical) {
                        outputCache.innerHTML = "&#8730;" + firstVariable;
                        firstVariable = Math.sqrt(outputInput.textContent);
                        outputInput.textContent = firstVariable;
                    } else {
                        let fst = firstVariable;
                        let sec = secondVariable;
                        totalVariable = givCalculateResult(operator);
                        outputInput.textContent = totalVariable;
                        firstVariable = totalVariable;
                        secondVariable = "";
                        if (operator && symbolsBtnArray.includes(clickValue))
                            operator = clickValue;
                        if (operator == "=") {
                            outputCache.textContent = fst + opr + sec + "=";
                            resetoutputCache = "";
                        } else outputCache.textContent = totalVariable + operator;
                    }
                }
            }
        }
    }

    if (clickValue == "C") {
        resetCalc();
    }
}

function givCalculateResult(operator) {
    switch (operator) {
        case '+':
            return Number(firstVariable) + Number(secondVariable);
        case '-':
            return Number(firstVariable) - Number(secondVariable);
        case '*':
            return Number(firstVariable) * Number(secondVariable);
        case '/':
            return Number(firstVariable) / Number(secondVariable);
        case '=':
            return givCalculateResult(operator);
        default:
            break;
    }
}

function givPercentResult(operator) {
    switch (operator) {
        case '+':
            return (Number(firstVariable) * Number(secondVariable) / 100);
        case '-':
            return (Number(firstVariable) * Number(secondVariable) / 100);
        case '*':
            return (Number(secondVariable) / 100);
        case '/':
            return (Number(secondVariable) / 100);
        case '=':
            return givCalculateResult(operator);
        default:
            break;
    }
}

function resetCalc() {
    clickValue = "";
    outputInput.textContent = "0";
    outputCache.textContent = "";
    firstVariable = "";
    secondVariable = "";
    operator = "";
}

function deletrOneValue() {
    if (!operator) {
        let firstVariableArray = firstVariable.split('');
        let deleteValue = firstVariableArray.pop();
        firstVariable = firstVariableArray.join('');
        outputInput.textContent = firstVariable;
    } else {
        let secondVariableArray = secondVariable.split('');
        let deleteValue = secondVariableArray.pop();
        secondVariable = secondVariableArray.join('');
        outputInput.textContent = secondVariable;
    }

}

// подключение и условия срабатывания / Светлый / Темный 

document.querySelector("#darkMode").addEventListener("click", function () {
    let checkbox = document.querySelector("#darkMode");
    if (checkbox.checked != true) {
        localStorage.setItem("colorMode", "white");
        showWhiteMode();
    }
    if (checkbox.checked == true) {
        localStorage.setItem("colorMode", "black");
        showDarkMode();
    }
});

if (colorMode) {
    if (colorMode == "white") {
        showWhiteMode();
    }
    if (colorMode == "black") {
        document.querySelector("#darkMode").click();
        showDarkMode();
    }
}
if (checkbox.checked != true || colorMode == "white") {
    showMouseHoverStylesWhite();
}

if (checkbox.checked == true || colorMode == "black") {
    showMouseHoverStylesDark();
}

// стили интерфейса / Светлый / Темный 

function showWhiteMode() {
    document.querySelectorAll(".bloksColor").forEach(x => {
        x.style.backgroundColor = '#FAFAFA';
        x.style.color = 'black';
    });
    document.querySelectorAll(".btnColors").forEach(x => x.style.backgroundColor = '#e2f3ff');
    document.querySelectorAll(".btnText").forEach(x => x.style.color = 'black');
    document.querySelector(".topColors").style.backgroundColor = '#e2f3ff';

    buttoBlock.addEventListener('mouseover', function (e) {
        if (!e.target.classList.contains("button")) return;
        e.target.style.background = '#aaf0ff';
    });
    buttoBlock.addEventListener('mouseout', function (e) {
        e.target.style.background = '';
    });

    buttoBlock.addEventListener('mousedown', function (e) {
        if (!e.target.classList.contains("button")) return;
        e.target.style.background = '#00c8ff';
    });
    buttoBlock.addEventListener('mouseup', function (e) {
        e.target.style.background = '#aaf0ff';
    });
}

function showDarkMode() {
    document.querySelectorAll(".bloksColor").forEach(x => {
        x.style.backgroundColor = '#00223A';
        x.style.color = '#FFFFFF';
    });
    document.querySelectorAll(".btnColors").forEach(x => x.style.backgroundColor = '#001B2F');
    document.querySelectorAll(".btnText").forEach(x => x.style.color = 'white');
    document.querySelector(".topColors").style.backgroundColor = '#001B2F';

    buttoBlock.addEventListener('mouseover', function (e) {
        if (!e.target.classList.contains("button")) return;
        e.target.style.background = 'rgb(36 87 123)';
    });
    buttoBlock.addEventListener('mouseout', function (e) {
        if (!e.target.classList.contains("button")) return;
        e.target.style.background = 'rgb(0, 27, 47)';
    });

    buttoBlock.addEventListener('mousedown', function (e) {
        if (!e.target.classList.contains("button")) return;
        e.target.style.background = 'rgb(2 22 37)';
    });
    buttoBlock.addEventListener('mouseup', function (e) {
        if (!e.target.classList.contains("button")) return;
        e.target.style.background = 'rgb(36 87 123)';
    });
}

// стили наведения мыши / Светлый / Темный 

function showMouseHoverStylesWhite() {
    buttoBlock.addEventListener('mouseover', function (e) {
        if (!e.target.classList.contains("button")) return;
        e.target.style.background = '#aaf0ff';
    });
    buttoBlock.addEventListener('mouseout', function (e) {
        e.target.style.background = '';
    });

    buttoBlock.addEventListener('mousedown', function (e) {
        if (!e.target.classList.contains("button")) return;
        e.target.style.background = '#00c8ff';
    });
    buttoBlock.addEventListener('mouseup', function (e) {
        e.target.style.background = '#aaf0ff';
    });
}

function showMouseHoverStylesDark() {
    buttoBlock.addEventListener('mouseover', function (e) {
        if (!e.target.classList.contains("button")) return;
        e.target.style.background = 'rgb(36 87 123)';
    });
    buttoBlock.addEventListener('mouseout', function (e) {
        if (!e.target.classList.contains("button")) return;
        e.target.style.background = 'rgb(0, 27, 47)';
    });

    buttoBlock.addEventListener('mousedown', function (e) {
        if (!e.target.classList.contains("button")) return;
        e.target.style.background = 'rgb(2 22 37)';
    });
    buttoBlock.addEventListener('mouseup', function (e) {
        if (!e.target.classList.contains("button")) return;
        e.target.style.background = 'rgb(36 87 123)';
    });
}