import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Actions} from '../../config/constants'
import {updateActions} from '../../store/actions/actions';
import {showModal} from '../../store/modal/actions';
import Button from '../button/Button'

import './TopPanel.css';

class TopPanel extends Component {
    constructor(props, context) {
        super(props, context);

        this._handleAction = this._handleAction.bind(this);
        this._getSelectedState = this._getSelectedState.bind(this);
    }

    _handleAction(event) {
        event.preventDefault();
        event.stopPropagation();

        if(event.target.name === 'synonyms') {
            this.props.showModal()
        }

        this.props.updateActions(event.target.name);
    }

    _getSelectedState(action) {
        return this.props.actions.includes(action)
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
                            disabled={!this.props.selectedWord}
                            selected={this._getSelectedState(action)}
                            onClick={this._handleAction}
                        />
                    )
                })}
                <Button
                    title="Get synonyms"
                    name="synonyms"
                    disabled={!this.props.selectedWord}
                    onClick={this._handleAction}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedWord: state.selected,
        actions: state.actions
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateActions: action => dispatch(updateActions(action)),
        showModal: action => dispatch(showModal(action))
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(TopPanel);
