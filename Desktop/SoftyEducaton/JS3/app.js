function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function backspace() {
    var display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculate() {
    var expression = document.getElementById('display').value;
    try {
        var result = eval(expression);
        document.getElementById('display').value = result;
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}
document.getElementById('watermark').addEventListener('click', function() {
    window.open('popup.html', 'Popup', 'width=400,height=200');
});


let myMode = document.querySelector('.dtl')
let total = document.querySelector ('body')
let calcul = document.querySelector (".calculator")
let swtch = document.querySelector (".switch")

myMode.addEventListener('click',darkMode)
function darkMode(){
    myMode.classList.toggle("dtl_dark")
    swtch.classList.toggle ("switch_dark")
    total.classList.toggle("body_clas")
    calcul.classList.toggle("calculator_dark")

}

