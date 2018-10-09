import React, {Component} from 'react';
import {connect} from 'react-redux';

import './TopPanel.css';

class TopPanel extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="TopPanel">
                Here will be Top Panel
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(TopPanel);
