// const createTable = (elements, state) => elements.reduce((acc, curValue) => ({...acc,[curValue]:state}),{})


// const V1 = 'qwertyuiopasdfghjklzxcvbnm'.split('');
// const V2 = '0123456789'.split('');
// const V3 = '+*'.split('');
// const V4 = ['='];
// const V5 = ['('];
// const V6 = [')'];
// const V7 = ['.'];


// const Q = ['q0','q1','q2','q3','q4','q5','q6','q7','q8','q9','q10','q11'];

// const transitions = {
//     q0: {
//         ...createTable(V1,'q1')
//     },
//     q1: {
//         ...createTable(V1,'q1'),
//         ...createTable(V2,'q2'),
//         ...createTable(V4,'q3'),
//     },
//     q2: {
//         ...createTable([...V1,...V2],'q2'),
//         ...createTable(V4,'q3'),
//     },
//     q3: {
//         ...createTable(V5,'q4'),
//         ...createTable(V2,'q5'),
//     },
//     q4: {
//         ...createTable(V5,'q4'),
//         ...createTable(V2,'q5'),
//     },
//     q5: {
//         ...createTable(V5,'q6'),
//         ...createTable(V2,'q9'),
//         ...createTable(V2,'q11'),
//         ...createTable(V2,'q8'),
//         ...createTable(V2,'q5'),
//     },
//     q6: {

//     },
//     q7: {

//     },
//     q8: {

//     },
//     q9: {

//     },
//     q10: {

//     },
//     q11: {

//     },
//     q12: {

//     },
// }


