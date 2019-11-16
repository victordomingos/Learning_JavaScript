

window.onload = function() {
    kb = document.getElementById("keyboard")
    var chars = ['1', '2', '3', '/', 
                 '4', '5', '6', 'x',
                 '7', '8', '9', '-',
                 '0', '.', '^', '+',
                 '(', ")", '←', 'AC',
                ]
    
    let postfix = ""
    let class2 = ""
    for(let i=0; i<chars.length; i++) {
        
        if(i>0 && (i+1)%4==0) {
            postfix = '<br>'
            class2 = "op"
        }
        else {
            postfix = ""
            class2 = "digit"
        }
        
        if(chars[i] == 'AC'                                                                                                                                                                                                                                                                                                                                                                                                                                     || chars[i] == '&larr;') {
            class2 = "btnclear"
        }
        

        kb.innerHTML += `<input class="btn ${class2}" type="submit" id="button_${i}" onClick="addDigit('${chars[i]}')" value="${chars[i]}">${postfix}`;
    }

}


function addDigit(digit){
    let txt = document.getElementById("xbox")
    let out = document.getElementById("outbox");
              
    if (txt.value =='0' && digit != 'AC'){
        txt.value = digit
    }
    else {
        switch(digit){
            case '←':
                if (txt.value.length > 0) {
                    txt.value = txt.value.slice(0, txt.value.length-1)
                }
                calc()
                break 
            case 'AC':
                txt.value = ''
                out.value = '0'
                break                 
            case '/': 
            case 'x': 
            case '*':
            case '-':
                txt.value += digit
                calc()
                break
            default:
                txt.value += digit
                calc()
        }
    }
}



function calc() {
    let expr = document.getElementById("xbox").value;
    let out = document.getElementById("outbox");
        
    expr = removeTrailingOperators(expr)
    if (expr.includes("Invalid")) {
        out.value = expr
    }
    else if(expr.length == 0) {
        out.value = '0'
    }
    else {
        let clean_expression = expr.replace(/x/g, "*")
        clean_expression = clean_expression.replace(/\^/g, "**")
        let n = Number(eval(clean_expression)).toPrecision(15).toString();

        out.value = parseFloat(n)
    }
}


function removeTrailingOperators(expr)  {
    let ops = /[/x+-.^]$/
    let double_ops = /[/x+-.^][/x+-.^]$/
    if(expr.length == 0){
        return '0'
    }

    if(expr.match(/[.][0-9][.][0-9]/)){
        return "Invalid Number!"
    }
    else if(expr.match(double_ops)){
        return "Invalid Expression!"
    }
    //else if ((expr.match(/\./g) || []).length > 1){
    //    return "Invalid Number!"
    // }
    else if (expr[expr.length-1].match(ops)) {
        console.log( removeTrailingOperators(expr.slice(0, expr.length-1)))
        return removeTrailingOperators(expr.slice(0, expr.length-1))
    }
    else {
        return expr
    }
}
