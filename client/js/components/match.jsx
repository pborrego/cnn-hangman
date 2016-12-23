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
import Alphabet from './list/alphabet';
import Blocks from './list/blocks';
import React from 'react';
import ReactDOM from 'react-dom';



const mapStateToProps = ({alphabet, blocks, guesses, hits, maxAttempts, message, miss, word}) => ({
    alphabet,
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
    incrementMiss: () => dispatch(incrementMiss()),
    notifyHit: () => dispatch(notifyHit()),
    notifyInputInvalid: () => dispatch(notifyInputInvalid()),
    notifyMiss: (attemptsLeft) => dispatch(notifyMiss(attemptsLeft)),
    showSubmitted: (hitIndex, value) => dispatch(showSubmitted(hitIndex, value)),
    userLost: () => dispatch(userLost()),
    userWon: () => dispatch(userWon())
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
        console.log(check);
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
        this.isGameOver();
    }

    word() {
        return this.props.word.split('');
    }

    validate(str) {
        return /[a-zA-Z]/.test(str);
    }

    render() {
        return (
            <div className="flex">
                <div className="canvas"></div>
                <Blocks blocks={this.props.blocks} />
                <div className="alphabet">
                    <Alphabet alphabet={this.props.alphabet}/>
                </div>
            </div>
            /*
            <form>
                    <input autoFocus maxLength='1' type='text' placeholder="Enter a Letter" ref='play' />
                </form>
            <div className='game'>

            <button type='submit' className='button' onClick={this.play}>
                {'Submit'}
            </button>
            </div> */
        );
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(Match);
