import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getSynonyms} from '../../store/synonyms/actions';
import './SynonymModal.css'

class SynonymModal extends Component {
    constructor(props) {
        super(props);

        this._handleSynonymSelection = this._handleSynonymSelection.bind(this);
        this._getContent = this._getContent.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        debugger
        const {selectedWord} = this.props

        if(nextProps.selectedWord.innerText !== selectedWord.innerText) {
            const clearWord = nextProps.selectedWord.innerText.replace(/[,.\s]+/g, '');
            console.log(clearWord.toLowerCase());
            this.props.getSynonyms(clearWord.toLowerCase());
        }
    }


    componentDidMount() {
        const word = this.props.selectedWord.innerText
        const clearWord = word.replace(/[,.\s]+/g, '');
        console.log(clearWord.toLowerCase());
        this.props.getSynonyms(clearWord.toLowerCase());
    }

    _handleSynonymSelection(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    _getContent() {
        const {synonyms} = this.props

        return synonyms.length ?
            this.props.synonyms.map((syn,index) => {
                return (
                    <p
                        className="Synonym"
                        key={`syn-${index}`}
                        onClick={this._handleSynonymSelection}
                    >
                        {syn.word}
                    </p>
                )
            }) :
            'There is no synonyms'
    }

    render() {
        return (
            <div className="ModalContainer">
                {this._getContent()}
            </div>
        );
    }
}

SynonymModal.propTypes = {
};

function mapStateToProps(state) {
    return {
        selectedWord: state.selected,
        synonyms: state.synonyms
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getSynonyms: (word) => dispatch(getSynonyms(word))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SynonymModal);
