import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {fetchData} from '../../store/article/actions';
import './EditorView.css';

class EditorForm extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        const wordArray = this.props.article.split(' ');
        return (
            <div className="EditorContainer">
                <div
                    className="TextArea"
                >
                    {
                        wordArray.map((word, index) => {
                            return (
                                <span key={index}>
                                    {`${word} `}
                                </span>
                            )
                        })
                    }
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
        fetchData: () => dispatch(fetchData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorForm);


