import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {fetchData} from '../../store/article/actions';
import {setSelectedWord} from '../../store/selected/actions'
import {Actions, stylesMapToAction} from '../../config/constants'

import './EditorView.css';

class EditorForm extends Component {
    constructor(props, context) {
        super(props, context);

        this._doubleClickHandler = this._doubleClickHandler.bind(this);
        this._renderArticle = this._renderArticle.bind(this);

        this.selectedWordRef = null;
    }

    componentDidMount() {
        this.props.fetchData();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.actions && nextProps.actions !== this.props.actions) {
            const {style} = this.selectedWordRef
            const absentActions = Actions.filter(item => !nextProps.actions.find(action => action === item))
            for(let action of nextProps.actions) {
                if(!style[stylesMapToAction[action]]){
                    style[stylesMapToAction[action]] = action;
                }
            }

            for(let action of absentActions) {
                style[stylesMapToAction[action]] = '';
            }
        }
    }

    _doubleClickHandler(event) {
        event.preventDefault();
        event.stopPropagation();

        this.selectedWordRef = event.target;
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
    fetchData: PropTypes.func.isRequired,
    article: PropTypes.string.isRequired,
    actions: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        article: state.article,
        actions: state.actions
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: () => dispatch(fetchData()),
        setSelectedWord: (wordNode) => dispatch(setSelectedWord(wordNode)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorForm);


