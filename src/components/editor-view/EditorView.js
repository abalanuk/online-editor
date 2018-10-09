import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from 'react-bootstrap-dialog'

import {fetchData, saveArticle} from '../../store/article/actions';
import {setSelectedWord} from '../../store/selected/actions'
import {setActions} from '../../store/actions/actions'
import Button from '../button/Button';
import SynonymModalContent from '../modal/SynonymModal';

import {Actions, stylesMapToAction, stylesMapToValue} from '../../config/constants'
import './EditorView.css';

class EditorForm extends Component {
    constructor(props, context) {
        super(props, context);

        this._doubleClickHandler = this._doubleClickHandler.bind(this);
        this._renderArticle = this._renderArticle.bind(this);
        this._handleSaveArticle = this._handleSaveArticle.bind(this);

        this._getNodeStyles = this._getNodeStyles.bind(this);
        this._getArticleRef = ref => this.articleRef = ref;

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

    _getWordsWithStyles() {
        let wordsWithStyles = []
        this.articleRef.childNodes.forEach(node => {
            if(node.innerText === ' '){
                wordsWithStyles.push(node.innerText);
                return
            }

            const styleKeys = Object.values(stylesMapToAction);
            const nodeStyles = styleKeys.reduce((acc, value) => {
                if(node.style[value]){
                    return [...acc, value];
                }

                return acc
            }, []);

            wordsWithStyles.push({[node.innerText]: nodeStyles});
        });

        return wordsWithStyles
    }

    _handleSaveArticle(event) {
        event.preventDefault();
        event.stopPropagation();

        const wordsWithStyles = this._getWordsWithStyles();

        this.props.saveArticle(wordsWithStyles)
    }

    _getNodeStyles(stylesProps) {
        return stylesProps.reduce((acc, prop) => {
            acc[prop] = stylesMapToValue[prop];

            return acc
        }, {});
    }

    _doubleClickHandler(event) {
        event.preventDefault();
        event.stopPropagation();

        this.selectedWordRef = event.target;

        //show synonyms dialog
        const dialogContent = <SynonymModalContent/>;
        // this.dialog.show({
        //     title: 'Synonyms',
        //     body: dialogContent,
        //     bsSize: 'small',
        //     actions: [
        //         Dialog.OKAction(),
        //         Dialog.CancelAction()
        //     ],
        //     onHide: dialog => dialog.hide()
        // })

        this.props.setActions(event.target);
        this.props.setSelectedWord(event.target);
    }

    _renderArticle() {
        const {article} = this.props
        const wordArray = !Array.isArray(article) ? article.split(' ') : article;
        return wordArray.map((word, index) => {
            if(typeof word === 'object') {
                //['fontWeight', 'textDecoration', ...]
                const stylesProps = Object.values(word)[0];
                //{'fontWeight': 'bold', ...}
                const styles = stylesProps.length ? this._getNodeStyles(stylesProps) : {};
                return (
                    <span
                        key={index}
                        style={styles}
                        onDoubleClick={this._doubleClickHandler}
                    >
                        {`${Object.keys(word)[0]} `}
                    </span>
                )
            }

            return (
                <span key={index} onDoubleClick={this._doubleClickHandler}>
                    {`${word} `}
                </span>
            )
        })
    }

    render() {
        //Todo: add feedback on saving article success
        return (
            <div className="EditorContainer">
                <section
                    className="TextArea"
                    onDoubleClick={this._doubleClickHandler}
                    ref={this._getArticleRef}
                >
                    {this._renderArticle()}
                </section>
                <Button
                    title="Save"
                    onClick={this._handleSaveArticle}
                    name='save'
                    disabled={false}
                />
                <section className="Synonyms">
                    {false && <Dialog ref={ (el) => { this.dialog = el }}/>}
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
        setActions: (selectedNode) => dispatch(setActions(selectedNode)),
        saveArticle: (articleNode) => dispatch(saveArticle(articleNode))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorForm);


