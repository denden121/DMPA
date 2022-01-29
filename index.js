var DMPA = require('./DMPA');

const store = [];


const tableOfNames = [] //таблица имен
let value = '' //строка в которую запоминаем полностью переменную

//запоминаем полное название константы
const addValue = (symbol) => {
    if (symbol === ' '){
        return
    }
    value += symbol
}

// чистим значение строки для следуйщей константы
const cleanValue = () => {
    value = ''
}

// добавляем скобку на стек для отпределения валидная строка или нет
const addState = (elem) => {
    store.push(elem);
    addOperation('(');
}

// удаляем скобку на стека для отпределения валидная строка или нет
const removeState = (val) => {
    if(!store.pop()) {
        automate._comeBackStartPosition()
        throw new Error('Ошибка скобок')
    }
    addOperation(val)
}

//стек для операции
const operationStore = [];
let index = 1

// операции
const marks = (mark) => {
    const right = valueStore.pop()
    const left = valueStore.pop()
    switch (mark){
        case '+':
            value = `${right};STORE $${index};LOAD ${left};ADD $${index}`
            break
        case '*':
            value = `${right};STORE $${index};LOAD ${left};MPY $${index}`
            break
        case '=':
            value = `LOAD ${right};STORE ${left}`
            break
    }
    addValueToStore();
    index++;
}

//добавление операции на стек
const addOperation = (operation) => {
    console.log(operation,operationStore)
    if(value) {
        addValueToStore(value);
    }
    if(operation === ')') {
        let mark = operationStore.pop()
        while (mark !== '(') {
            marks(mark)
            mark = operationStore.pop()
        }
        return
    } else if(operation === '+' && operationStore[operationStore.length - 1] === '*'){
        marks(operationStore.pop())
    }
    operationStore.push(operation)
    tableOfNames.push([operation,'operation'])
}

// операции по окончанию кода
const finishCode = () => {
    console.log(operationStore)
    let mark = operationStore.pop()

    while (mark) {
        if(mark === '+' && operationStore[operationStore.length-1] === '*') {
            marks(operationStore.pop());
            operationStore.push(mark)
        }else {
            marks(mark)
        }
        console.log(operationStore  )
        mark = operationStore.pop()
    }
}

//стек для переменных
const valueStore = [];



// добавляем значение константы в стор
const addValueToStore = () => {
    if (!value) {
        return
    }
     if(value.indexOf(';') === -1) {
        tableOfNames.push([value, value.match(/^[0-9.]+/g) ? 'const' : 'var'])
    }
     if(value.match(/^[0-9.]+/g)) {
         value = `=${value}`
     }
    valueStore.push(value);
    cleanValue()
}

const optimization = () => {
    let codeForOptimization = valueStore[0]
    console.log(valueStore[0])
    const firstRule = codeForOptimization.match(/\L\O\A\D [=$0-9.a-zA-Z]+\;\A\D\D [=$0-9.a-zA-Z]+\;/g)
    const resultCodeArray = valueStore[0].split(';')

    //first rule
    if(firstRule) {
        for(let i of firstRule) {
            if(resultCodeArray.filter(item => item === i.split(';')[1]).length < 2 ){
                const alfa = i.split(';')[0].split(' ')[1]
                const beta = i.split(';')[1].split(' ')[1]
                // console.log(i)
                codeForOptimization = codeForOptimization.replace(i, `LOAD ${beta};ADD ${alfa};`)
            }
        }
    }

    // second rule
    const secondRule = codeForOptimization.match(/\L\O\A\D [=$0-9.a-zA-Z]+\;\M\P\Y [=$0-9.a-zA-Z]+\;/g)
    if(secondRule) {
        for (let i of secondRule) {
            if(resultCodeArray.filter(item => item === i.split(';')[1]).length < 2) {
                const alfa = i.split(';')[0].split(' ')[1]
                const beta = i.split(';')[1].split(' ')[1]
                codeForOptimization = codeForOptimization.replace(i, `LOAD ${beta};MRY ${alfa};`)
            }
        }
    }

    const thirdRule = codeForOptimization.match(/\S\T\O\R\E \$[0-9]+\;\L\O\A\D \$[0-9]+/g)
    if(thirdRule) {
        for (let i of thirdRule) {
            if(
                resultCodeArray.filter(item => item.split(' ')[1] === i.split(';')[0].split(' ')[1]).length < 3 &&
                i.match(/\$[0-9]+/g)[0] === i.match(/\$[0-9]+/g)[1]
            ) {
                codeForOptimization = codeForOptimization.replace(i + ';', '')
            }
        }
    }
    let fourthRule = codeForOptimization.match(/\L\O\A\D [=$0-9.a-z]+\;\S\T\O\R\E [=$0-9.a-z]+\;\L\O\A\D/g)
    while (fourthRule) {
        if(fourthRule) {
            for (let i of fourthRule) {
                const temp = i.split(';');
                if (temp[0].split(' ')[1] !== temp[1].split(' ')[1]) {
                    const alfa = temp[0].split(' ')[1]
                    const beta = temp[1].split(' ')[1]
                    // console.log(alfa, beta);

                    codeForOptimization = codeForOptimization.replace(temp[0] + ';', '')
                    codeForOptimization = codeForOptimization.replace(temp[1] + ';', '')
                    codeForOptimization = codeForOptimization.replace(beta, alfa)
                }
            }
        }
        fourthRule = codeForOptimization.match(/\L\O\A\D [=$0-9.a-z]+\;\S\T\O\R\E [=$0-9.a-z]+\;\L\O\A\D/g)
    }
    console.log(codeForOptimization)
}


const createTable = (elements, state, action = null) => elements.reduce((acc, curValue) => {
    return {...acc,[curValue]: [state,action]}
},{})

const ignoreCase = true;
const V1 = '_abcdefghijklmnopqrstuvwxyz'.split('');
const V2 = '0123456789'.split('');
const V3 = '+*'.split('');
const V4 = ['='];
const V5 = ['('];
const V6 = [')'];
const V7 = ['.'];
const V8 = ['e'];
const V9 = [' ']
const V = [...V1, ...V2, ...V3, ...V4, ...V5, ...V6, ...V7, ...V8, ...V9]
const Q = ['q0','q1','q2','q3','q4','q5','q6','q7','q8','q9'];
const start = 'q0'
const finish = ['q9','q4','q7', 'q8', 'q6']

const transitions = {
    q0: {
        ...createTable(V1,'q1', addValue),
        ...createTable(V9,'q0'),
    },
    q1: {
        ...createTable([...V1, ...V2],'q1', addValue),
        ...createTable(V9,'q2', addValueToStore),
        ...createTable(V4,'q3', addOperation),
    },
    q2: {
        ...createTable(V9,'q2'),
        ...createTable(V4,'q3', addOperation),
    },
    q3: {
        ...createTable(V2,'q4', addValue),
        ...createTable(V9,'q3', ),
        ...createTable(V5,'q3', addState),
        ...createTable(V1,'q8', addValue),
    },
    q4: {
        ...createTable(V3,'q3', addOperation),
        ...createTable(V2,'q4', addValue),
        ...createTable(V8,'q5', addValue),
        ...createTable(V7,'q6', addValue),
        ...createTable(V6,'q7', removeState),
        ...createTable(V9,'q7'),
    },
    q5: {
        ...createTable(V3,'q6', addValue),
        ...createTable(V2,'q9', addOperation),
    },
    q6: {
        ...createTable(V3,'q3', addOperation),
        ...createTable(V9,'q7', addValueToStore),
        ...createTable(V2,'q6', addValue),
    },
    q7: {
        ...createTable(V9,'q7'),
        ...createTable(V6,'q7', removeState),
        ...createTable(V3,'q3', addOperation),
    },
    q8: {
        ...createTable([...V1,...V2],'q8', addValue),
        ...createTable(V6,'q7', removeState),
        ...createTable(V9,'q7', addValueToStore),
        ...createTable(V3,'q3', addOperation),
    },
    q9: {
        ...createTable(V2,'q6', addValue),
    },
}

module.exports.addValueToStore = addValueToStore;
module.exports.finishCode = finishCode;
module.exports.optimization = optimization;

var automate = new DMPA.DMPA(V,Q,start,finish,transitions,'+',[], ignoreCase);

automate.test('cost=(1+2*3+4)*(a+x*y+b)')


