import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const selectedStyle = {boxShadow: '0px 1px 18px 2px rgba(240,232,240,0.82)', color: 'white'};

const Button = ({title, name, onClick, disabled = true, selected = false, ...otherProps}) => {
    return (
        <button
            {...otherProps}
            className="Button"
            name={name}
            disabled={disabled}
            style={selected ? selectedStyle : {}}
            onClick={onClick}
        >
            {title}
        </button>
    );
};

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

export default Button;
