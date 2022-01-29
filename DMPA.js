var index = require('./index');

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
     * @param {Boolean} ignoreCase // Флаг игнорировая символов
     */
    constructor(alphbet, states, startState, finishState, transitions, alphbetStore, initStore, ignoreCase) {
        this.alphbet = alphbet;
        this.states = states;
        this.currentState = startState;
        this.finishState = finishState;
        this.transitions = transitions;
        this.store = initStore;
        this.startPosition = startState;
        this.initStore = [...initStore];
        this.ignoreCase = ignoreCase
    }

    /** // Проверка есть ли переход
     * 
     * @param {String} state  
     * @param {String} symbol 
     * @returns Boolean
     */

    _checkExistTransition(state, symbol) {
        return (this.transitions[state] && this.transitions[state][symbol] && this.transitions[state][symbol][0])
    }

    /**
     * 
     * @param {String} symbol 
     */
    _changeState(symbol) {
        if (this.ignoreCase) {
            symbol = symbol.toLowerCase();
        }
        if(this._checkExistTransition(this.currentState,symbol)) {
            if(this.transitions[this.currentState][symbol] && this.transitions[this.currentState][symbol][1]) {
                this.transitions[this.currentState][symbol][1](symbol)
            }
            this.currentState = this.transitions[this.currentState][symbol][0];
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

        for(const symbol of value) {
            this._checkBelogAlphabet(symbol)
            this._changeState(symbol);
        }

        const result = this.finishState.includes(this.currentState) && !this.store.length;
        index.addValueToStore()
        index.finishCode()
        index.optimization()
        this._comeBackStartPosition();

        return result
    }
}

module.exports.DMPA = DMPA;