//Ex 1
function isEven(num){
    if(num % 2 == 0){
        console.log(true)
    }
    else{
        console.log(false)
    }
}
//Ex 2 
function isPositive(num){
    if(num>=0){
        console.log(true)

    }
    else{
        console.log(false)
    }
}
//Ex 3
function findMax(num1,num2){
    if(num1>num2){
        console.log(num1)
    }
    else{
        console.log(num2)
    }
}
//Ex 4
function average ( num1,num2,num3){
    let total = num1+num2+num3
    console.log(total/3)

}
//Ex 5 
function celsiusToFahrenheit (temp){
    let fehrenheit = (temp*(9/5))+32;
    console.log(fehrenheit)
}
//Ex 6 
function rectangleArea (num1,num2){
    console.log(num1*num2)
}
//EX 7 
function factorial (num){
    if(num === 0) {
        return 1;
    }
    else {
        return num * factorial (num - 1)
    }
    
console.log(factorial(num))
}
