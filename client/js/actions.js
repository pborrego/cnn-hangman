export const addGuess = (guess) => ({data: guess, type: 'ADD_GUESS'});
export const clearMessage = () => ({type: 'CLEAR_MESSAGE'});
export const incrementMiss = () => ({type: 'INCREMENT_MISS'});
export const initialState = (payload) => ({data: payload, type: 'INITIAL_STATE'});
export const notifyInputInvalid = () => ({data: {inputError: true}, type: 'MESSAGE_INPUT_ERROR'});
export const notifyMiss = (attemptsLeft) => ({data: attemptsLeft, type: 'NOTIFY_MISS'});
export const showSubmitted = (data, value) => ({data: {hitIndex: data, value: value}, type: 'SHOW_SUBMITTED'});
export const userLost = () => ({type: 'USER_LOST'});
export const userWon = () => ({type: 'USER_WON'});
