class DMPA {
    /**
     * 
     * @param {String[]} alphbet // алфавит
     * @param {String[]} states // состояния
     * @param {String} startState // Начальное состояние
     * @param {String[]} finishState // Финальные состояния 
     * @param {Object} transitions // Таблица переходов
     * @param {String} alphbetStore // Алфавит магазана
     * @param {String[]} initStore // Начальная состояние магазина
     */
    constructor(alphbet, states, startState, finishState, transitions, alphbetStore, initStore) {
        this.alphbet = alphbet;
        this.states = states;
        this.currentState = startState;
        this.finishState = finishState;
        this.transitions = transitions;
        this.alphbetStore = alphbetStore;
        this.store = initStore;
        this.startPosition = startState;
        this.initStore = [...initStore];
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
     */
    _changeState(symbol) {
        symbol = symbol.toLowerCase();
        if(this._checkExistTransition(this.currentState,symbol)) {
            if(symbol === '(') {
                this.store.push(this.alphbetStore);
            }

            if(symbol === ')' && !this.store.pop()) {
                this._comeBackStartPosition();
                throw new Error('Ошибка скобок')
            }

            this.currentState = this.transitions[this.currentState][symbol];
        } else {
            this._comeBackStartPosition();
            throw new Error('Ошибка перехода')
        }
    }

    _comeBackStartPosition() {
        this.currentState = this.startPosition;
        this.store = [...this.initStore]
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
            this._comeBackStartPosition();
            throw new Error('Ошибка алфавита');
        }
    }
    /**
     * 
     * @param {String} value 
     * @returns Boolean
     */

    test(value) {
        value = String(value).replaceAll(/[ ]+/ig,'');

        for(const symbol of value) {
            this._checkBelogAlphabet(symbol)
            this._changeState(symbol);
        }

        const result = this.finishState.includes(this.currentState);
        this._comeBackStartPosition();

        return result
    }
}

module.exports = DMPA;