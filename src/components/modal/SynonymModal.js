import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '../button/Button'

import {getSynonyms} from '../../store/synonyms/actions';
import './SynonymModal.css'

class SynonymModal extends Component {
    constructor(props) {
        super(props);

        this._handleSynonymSelection = this._handleSynonymSelection.bind(this);
        this._getContent = this._getContent.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {selectedWord} = this.props

        if(nextProps.selectedWord.innerText !== selectedWord.innerText) {
            const clearWord = nextProps.selectedWord.innerText.replace(/[,.\s]+/g, '');
            this.props.getSynonyms(clearWord.toLowerCase());
        }
    }

    componentDidMount() {
        const clearWord = this.props.selectedWord.innerText.replace(/[,.\s]+/g, '');
        this.props.getSynonyms(clearWord.toLowerCase());
    }

    _handleSynonymSelection(value, event) {
        event.preventDefault();
        event.stopPropagation();

        this.props.onSelect(value);
    }

    _getContent() {
        const {synonyms} = this.props

        return synonyms.length ?
            this.props.synonyms.map(syn => {
                return (
                    <ListItem button onClick={this._handleSynonymSelection.bind(this, syn.word)} key={syn.word}>
                        <ListItemText primary={syn.word} />
                    </ListItem>
                )
            }) :
            'There is no synonyms for such word'
    }

    render() {
        return (
            <div className="ModalContainer">
                <List>
                    {this._getContent()}
                </List>
                <DialogActions>
                    <Button
                        onClick={this.props.onClose}
                        title="Close"
                        name='close'
                        disabled={false}
                    />
                </DialogActions>
            </div>
        );
    }
}

SynonymModal.propTypes = {
    synonyms: PropTypes.array.isRequired
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
