import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from 'react-bootstrap-dialog'

import {fetchData} from '../../store/article/actions';
import {setSelectedWord} from '../../store/selected/actions'
import {setActions} from '../../store/actions/actions'
import Button from '../button/Button';
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

        //show synonyms dialog
        this.dialog.show({
            title: 'Synonyms',
            body: "Body",
            actions: [
                Dialog.CancelAction(),
                Dialog.OKAction()
            ],
            bsSize: 'small',
            onHide: dialog => dialog.hide()
        })

        this.selectedWordRef = event.target;

        this.props.setActions(event.target);
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
                <section
                    className="TextArea"
                    onDoubleClick={this._doubleClickHandler}
                >
                    {this._renderArticle()}
                </section>
                <Button
                    title="Save"
                    onClick={() => {}}
                    name='save'
                    disabled={false}
                />
                <section className="Synonyms">
                    <Dialog ref={(el) => { this.dialog = el }}/>
                </section>
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
    const {article, actions} = state;

    return {article, actions}
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: () => dispatch(fetchData()),
        setSelectedWord: (wordNode) => dispatch(setSelectedWord(wordNode)),
        setActions: (selectedNode) => dispatch(setActions(selectedNode))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorForm);


