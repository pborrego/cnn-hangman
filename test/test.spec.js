'use strict';

const Code = require('code');
const Lab = require('lab');
const createStore = require('redux').createStore;


const expect = Code.expect;
const lab = exports.lab = Lab.script();
const before = lab.before;
const describe = lab.describe;
const it = lab.it;



const enzyme = require('enzyme');


const counter = (state, action) => {
    if (typeof state === 'undefined') {
        state = {
            guessed: [],
            hits: 0,
            userLost: false,
            miss: 0
        };
    }

    switch (action.type) {
        case 'INCREMENT_HITS':
            return Object.assign({}, state, {
                hits: state.hits + 1
            });
        case 'INCREMENT_MISS':
            return Object.assign({}, state, {
                miss: state.miss + 1,
                userLost: state.miss + 1 >= 7
            });
        case 'ADD_GUESS':
            return Object.assign({}, state, {
                guessed: state.guessed.concat([action.data])
            });
        default:
            return state;
    }
};

let store;


describe('Hangman', () => {

    before((done) => {
        store = createStore(counter);
        done();
    });


    it('increments a hit counter', (done) => {

        store.dispatch({
            type: 'INCREMENT_HITS'
        });
        expect(store.getState()).to.include({
            hits: 1
        });

        done();
    });

    it('increments a miss counter', (done) => {

        store.dispatch({
            type: 'INCREMENT_MISS'
        });
        expect(store.getState()).to.include({
            miss: 1
        });

        done();
    });

    it('keeps track of letters guessed', (done) => {

        store.dispatch({
            data: 'A',
            type: 'ADD_GUESS'
        });
        expect(store.getState().guessed).to.include('A');

        store.dispatch({
            data: 'B',
            type: 'ADD_GUESS'
        });
        expect(store.getState().guessed).to.include(['A', 'B']);

        store.dispatch({
            data: 'C',
            type: 'ADD_GUESS'
        });
        expect(store.getState().guessed).to.include(['A', 'B', 'C']);

        done();
    });

    it('lists blanks for each letter of the word to be guessed', (done) => {
        const word = 'brian';
        const arr = new Array(word.length);

        expect(arr).to.be.an.array();
        expect(word).to.be.a.string();
        expect(arr.length).to.equal(word.length);

        done();
    });

    it('ensures guesses are letters only', (done) => {
        const value1 = 'b';
        const value2 = 2;

        expect(/[a-zA-Z]/.test(value1)).to.be.true();
        expect(/[a-zA-Z]/.test(value2)).to.be.false()

        done();
    });

    it('ensures guesses have not been guessed before', (done) => {
        const value = 'D';

        expect(store.getState().guessed.indexOf(value)).to.equal(-1);
        done();
    });

    it('indicates the user has lost after 7 misses', (done) => {
        store.dispatch({
            type: 'INCREMENT_MISS'
        });
        store.dispatch({
            type: 'INCREMENT_MISS'
        });
        store.dispatch({
            type: 'INCREMENT_MISS'
        });
        store.dispatch({
            type: 'INCREMENT_MISS'
        });
        store.dispatch({
            type: 'INCREMENT_MISS'
        });
        store.dispatch({
            type: 'INCREMENT_MISS'
        });

        expect(store.getState().userLost).to.be.true();
        done();
    });

    it('indicates the user has won after all blanks are filled', (done) => {
        let arr = Array(3);

        arr.splice(0, 1, 'c');
        arr.splice(1, 1, 'n');
        arr.splice(2, 1, 'n');

        expect(arr.indexOf(null)).to.equal(-1);
        expect(arr.indexOf(undefined)).to.equal(-1);
        done();
    });
});
