import {connect} from 'react-redux';
import {
    addGuess,
    clearMessage,
    incrementHits,
    incrementMiss,
    notifyInputInvalid,
    notifyMiss,
    showSubmitted,
    userLost} from '../actions';
import React from 'react';
import ReactDOM from 'react-dom';



const mapStateToProps = ({blocks, guesses, hits, maxAttempts, message, miss, word}) => ({
    blocks,
    guesses,
    hits,
    message,
    maxAttempts,
    miss,
    word
});

const mapDispatchToProps = dispatch => ({
    addGuess: guess => dispatch(addGuess(guess)),
    clearMessage: () => dispatch(clearMessage()),
    userLost: () => dispatch(userLost()),
    userWon: () => dispatch(userWon()),
    incrementMiss: () => dispatch(incrementMiss()),
    notifyInputInvalid: () => dispatch(notifyInputInvalid()),
    notifyHit: () => dispatch(notifyHit()),
    notifyMiss: (attemptsLeft) => dispatch(notifyMiss(attemptsLeft)),
    showSubmitted: (hitIndex, value) => dispatch(showSubmitted(hitIndex, value))
});



class Match extends React.Component {
    constructor (props) {
        super(props);

        this.play = this.play.bind(this);
    }

    componentDidUpdate() {
        ReactDOM.findDOMNode(this.refs.play).focus();
    }

    /* clear the input */
    clear() {
        this.refs.play.value = '';
        this.props.clearMessage();
    }

    filter(arr) {
        if (!Array.isArray(arr)) {
            return arr;
        }

        console.log(arr.filter((value, i) => value === this.word()[i]));
        console.log(arr);
        return arr.filter((value, i) => value === this.word()[i]);
    }

    hasUserLost() {
        return Number(this.props.maxAttempts) === Number(this.props.miss + 1);
    }

    hasUserWon() {
        return this.filter(this.props.blocks).length === this.props.blocks.length;
    }

    hit(index, value) {
        this.props.showSubmitted(index, value);
    }

    increment(value) {
        let array = [];

        this.word().forEach((v, i) => {
            return (value === v) ? array.push(i) : array;
        });

        array.length > 0 ? this.hit(array, value) : this.miss();
    }

    isGameOver() {
        let check = [this.hasUserLost(), this.hasUserWon()];

        return (check.indexOf(true)) ? this.props.userLost() : this.props.userWon();
    }

    isNewGuess(str) {
        return this.props.guesses.indexOf(str) === -1;
    }

    miss() {
        this.props.incrementMiss();
        this.props.notifyMiss((this.props.maxAttempts - this.props.miss) - 1);
    }

    play(evt) {
        const submitted = ReactDOM.findDOMNode(this.refs.play).value.trim().toLowerCase();
        const valid = this.validate(submitted) && this.isNewGuess(submitted);

        if (!valid) {
            this.props.notifyInputInvalid();
        }

        this.clear();
        this.increment(submitted);
        this.props.addGuess(submitted);
    }

    render() {
        return (
            <div className='game'>
            <input maxLength='1' type='text' placeholder="Enter a Letter" ref='play' />
            <button type='submit' className='button' onClick={this.play}>
                {'Submit'}
            </button>
            </div>
        );
    }

    word() {
        return this.props.word.split('');
    }

    validate(str) {
        return /[a-zA-Z]/.test(str);
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(Match);
