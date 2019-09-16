import {
    STATE_PAUSE,
    STATE_BIG_PAUSE,
    STATE_TASK,
    STATE_FINISH
} from './states';

const TASK_SECONDS = 25 * 60;
const PAUSE_SECONDS = 5 * 60;
const BIG_PAUSE_SECONDS = 30 * 60;


export const actions = {
    [STATE_TASK]: (v) => {
        v.seconds$.next(TASK_SECONDS);
        if (v.processInfo.isNeedStartNextTask) {
            v.processInfo.isNeedStartNextTask = false;
            let nextNumber = v.processInfo.numberTaskProcess + 1;
            if (nextNumber > v.processInfo.limitTask) {
                nextNumber = v.processInfo.limitTask;
            }

            v.processInfo.numberTaskProcess = nextNumber; // +1
        }
        v.processInfo.counter++;
    },

    [STATE_PAUSE]: (v) => {
        v.seconds$.next(PAUSE_SECONDS);
    },

    [STATE_BIG_PAUSE]: (v) => {
        v.seconds$.next(BIG_PAUSE_SECONDS);
    },

    [STATE_FINISH]: (v) => {
        v.seconds$.next(0);
        clearInterval(v.timerLoop);
    },

    DEFAULT: (v) => {
        v.seconds$.next(0);
        clearInterval(v.timerLoop);
    }
};
