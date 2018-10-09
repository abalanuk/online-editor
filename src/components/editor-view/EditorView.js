import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {fetchData} from '../../store/article/actions';
import {setSelectedWord} from '../../store/selected/actions'
import './EditorView.css';

class EditorForm extends Component {
    constructor(props, context) {
        super(props, context);

        this._doubleClickHandler = this._doubleClickHandler.bind(this);
        this._renderArticle = this._renderArticle.bind(this);
    }

    componentDidMount() {
        this.props.fetchData();
    }

    _doubleClickHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.setSelectedWord(event.target.innerText);
    }

    _renderArticle() {
        const {article} = this.props
        const wordArray = article.split(' ');

        return wordArray.map((word, index) => {
            return (
                <span key={index}>
                    {`${word} `}
                </span>
            )
        })

    }
    render() {
        return (
            <div className="EditorContainer">
                <div
                    className="TextArea"
                    onDoubleClick={this._doubleClickHandler}
                >
                    {this._renderArticle()}
                </div>
            </div>
        );
    }
}

EditorForm.propTypes = {
    fetchData: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        article: state.article
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: () => dispatch(fetchData()),
        setSelectedWord: (wordNode) => dispatch(setSelectedWord(wordNode)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorForm);


