import {transactions} from './transaction';
import {actions} from './action';

export class StateManager {
    public state$ = null;

    public transit = (...args) => {
        const transaction = this.getTransactionBy(...args);
        if (transaction) {
            this.state$.next(transaction.to);
            actions[transaction.to](...args);
        } else {
            actions.DEFAULT({...args});
        }
    }

    public getTransactionBy = (...args) => {
        return transactions[this.state$.value]
            .find(({ when }) => {
                return when(...args).every((condition) => condition);
            });
    }

    constructor(startState, initParams, state$) {
            this.state$ = state$;
            this.state$.next(startState);
            actions[startState](initParams);
    }
}
