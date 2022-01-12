const automat = require('./index');


test('a=((fdsfsd + 6)+5)+14', () => {
    expect(automat.test('a=((fdsfsd +  6)+5)+14')).toBe(true);
});


test('a=((fdsfsd + 6)+5)+14)', () => {
    expect((()=>automat.test('a=((fdsfsd + 6)+5)+14)'))).toThrow('Ошибка скобок');
})

test('a=((fdsfsd + 66E+10)+5)+14', () => {
    expect(automat.test('a=((fdsfsd + 66E+10)+5)+14')).toBe(true);
})

