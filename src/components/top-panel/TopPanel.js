import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Actions} from '../../config/constants'
import Button from '../button/Button'

import './TopPanel.css';

class TopPanel extends Component {
    constructor(props, context) {
        super(props, context);

        this._handleAction = this._handleAction.bind(this);
    }

    _handleAction(event) {
        event.preventDefault();
        event.stopPropagation();
        console.log(event.target);
    }

    render() {
        return (
            <div className="TopPanel">
                {Actions.map(action => {
                    return (
                        <Button
                            key={action}
                            title={action}
                            name={action}
                            onClick={this._handleAction}
                        />
                    )
                })}
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
