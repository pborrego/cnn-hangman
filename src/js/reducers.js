/* redux state property - representing the length of the current game word */
export const blocks = (state, action) => {
    switch (action.type) {
        case 'INITIAL_STATE':
            return action.data.blocks || state;
        case 'SHOW_SUBMITTED':
            return action.data.hitIndex.forEach((v) => {
                return state.splice(Number(v), 1, action.data.value);
            }) || state;
        default:
            return state || 0;
    }
};

export const hits = (state, action) => {
    switch (action.type) {
        case 'INCREMENT_HITS':
            return state + 1 || state;
        default:
            return state || 0;
    }
};

export const maxAttempts = (state, action) => {
    switch (action.type) {
        case 'INITIAL_STATE':
            return action.data.maxAttempts || state;
        default:
            return state || 0;
    }
};

export const message = (state, action) => {
    switch (action.type) {
        case 'MESSAGE_INPUT_ERROR':
            return 'Please submit letters only';
        case 'NOTIFY_MISS':
            return `${action.data} more attempts left.`;
        case 'CLEAR_MESSAGE':
            return '';
        default:
            return state || '';
    }
};

export const miss = (state, action) => {
    switch (action.type) {
        case 'INCREMENT_MISS':
            return state + 1 < 7 ? state + 1 : 7;
        default:
            return state || 0;
    }
};

export const guesses = (state, action) => {
    switch (action.type) {
        case 'ADD_GUESS':
            return action.data ? state.concat([action.data]) : state;
        default:
            return state || [];
    }
};

export const userLost = (state, action) => {
    switch (action.type) {
        case 'USER_LOST':
            return true;
        default:
            return false;
    }
};

/* redux state property - representing the current game word */
export const word = (state, action) => {
    switch (action.type) {
        case 'INITIAL_STATE':
            return action.data.word || state;
        default:
            return state || '';
    }
};
