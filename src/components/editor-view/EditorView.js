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
    }

    render() {
        return (
            <div className="EditorContainer">
                Here will be Editor
            </div>
        );
    }
}

EditorForm.propTypes = {};

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorForm);


