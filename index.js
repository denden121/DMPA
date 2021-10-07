const DMPA = require('./DMPA');

const createTable = (elements, state) => elements.reduce((acc, curValue) => ({...acc,[curValue]:state}),{})


const V1 = 'qwrtyuiopasdfghjklzxcvbnm'.split('');
const V2 = '0123456789'.split('');
const V3 = '+*'.split('');
const V4 = ['='];
const V5 = ['('];
const V6 = [')'];
const V7 = ['.'];
const V8 = ['E','e'];
const V = [...V1, ...V2, ...V3, ...V4, ...V5, ...V6, ...V7, ...V8]
const Q = ['q0','q1','q2','q3','q4','q5','q6','q7','q8','q9'];
const start = 'q0'
const finish = ['q9','q4','q7', 'q8']

const transitions = {
    q0: {
        ...createTable(V1,'q1')
    },
    q1: {
        ...createTable(V1,'q1'),
        ...createTable(V2,'q2'),
        ...createTable(V4,'q3'),
    },
    q2: {
        ...createTable([...V1,...V2],'q2'),
        ...createTable(V4,'q3'),
    },
    q3: {
        ...createTable(V2,'q4'),
        ...createTable(V5,'q3'),
        ...createTable(V1,'q9'),
    },
    q4: {
        ...createTable(V8,'q5'),
        ...createTable(V7,'q7'),
        ...createTable(V6,'q8'),
        ...createTable(V3,'q6'),
        ...createTable(V2,'q4'),
    },
    q5: {
        ...createTable(V3,'q7'),
    },
    q6: {
        ...createTable(V5,'q3'),
        ...createTable(V2,'q4'),
        ...createTable(V1,'q9'),
    },
    q7: {
        ...createTable(V2,'q7'),
        ...createTable(V6,'q8'),
        ...createTable(V2,'q6'),
    },
    q8: {
        ...createTable(V3,'q6'),
    },
    q9: {
        ...createTable([...V1,...V2],'q9'),
        ...createTable(V3,'q3'),
    },
}


const automat = new DMPA(V,Q,start,finish,transitions,'+',[]);

module.exports = automat;