import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getSynonyms} from '../../store/synonyms/actions';

class SynonymModal extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getSynonyms();
    }

    render() {
        return (
            <div className="ModalContainer">
                Synonyms
            </div>
        );
    }
}

SynonymModal.propTypes = {
    selectedWord: PropTypes.object,
};

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getSynonyms: (word) => dispatch(getSynonyms(word))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SynonymModal);
