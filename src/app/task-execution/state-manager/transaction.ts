import {
    STATE_TASK,
    STATE_PAUSE,
    STATE_BIG_PAUSE,
    STATE_FINISH,
} from './states';

export const transactions = {

    [STATE_TASK]: [
        {
            to: STATE_FINISH,
            when: (v) => [
                v.processInfo.numberTaskProcess >= v.processInfo.limitTask,
                v.processInfo.isNeedStartNextTask,
            ]
        },
        {
            to: STATE_PAUSE,
            when: (v) => [
                v.processInfo.counter % 4 !== 0 || v.processInfo.counter === 0,
            ]
        },
        {
            to: STATE_BIG_PAUSE,
            when: (v) => [
                v.processInfo.counter % 4 === 0 && v.processInfo.counter !== 0,
            ]
        },
    ],

    [STATE_PAUSE]: [
        {
            to: STATE_TASK,
            when: (v) => []
        },
    ],

    [STATE_BIG_PAUSE]: [
        {
            to: STATE_TASK,
            when: (v) => []
        },
    ]
};
