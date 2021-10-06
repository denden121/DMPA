export class DMPA {
    /**
     * 
     * @param {String[]} alphbet // алфавит
     * @param {String[]} states // состояния
     * @param {String} startState // Начальное состояние
     * @param {String[]} finishState // Финальные состояния 
     * @param {Object} transitions // Таблица переходов
     * @param {String[]} alphbetStore // Алфавит магазана
     * @param {String[]} initStore // Начальная состояние магазина
     */
    constructor(alphbet, states, startState, finishState, transitions, alphbetStore, initStore) {
        this.alphbet = alphbet;
        this.states = states;
        this.currentState = startState;
        this.finishState = finishState;
        this.transitions = transitions;
        this.alphbetStore = alphbetStore;
        this.initStore = initStore;
    }

    /** // Проверка есть ли переход
     * 
     * @param {String} state  
     * @param {String} symbol 
     * @returns Boolean
     */

    _checkExistTransition(state, symbol) {
        symbol = symbol.toLocaleLowerCase()
        return (this.transitions[state] && this.transitions[state][symbol])
    }

    /**
     * 
     * @param {String} symbol 
     * @param {String} symbolStore 
     */
    _changeState(symbol, symbolStore) {
        symbol = symbol.toLocaleLowerCase()
        if(this._checkExistTransition(this.currentState,symbol)) {
            this.currentState = this.transitions[this.currentState][symbol];
        } else {
            throw new Error('Erooooorrrr')  
        }
    }

    /**
     * 
     * @param {String} symbol 
     * @returns Boolean
     */

    _checkBelogAlphabet(symbol) {
        symbol = symbol.toLocaleLowerCase()
        if (this.alphbet.includes(symbol)) {
            return true
        } else {
            throw new Error('Error');
        }
    }
    /**
     * 
     * @param {String} value 
     * @returns Boolean
     */

    test(value) {
        value = value.replaceAll(/[ ]+/ig,'');

        for(const symbol of value) {
            this._checkBelogAlphabet(symbol)
            this._changeState(symbol);
        }

        return this.finishState.includes(this.currentState);
    }

}


const a = {
    q0: {
       0: {value: 'q0' , store: '~'},
       0: {value: 'q0' , store: '('},
    }
}