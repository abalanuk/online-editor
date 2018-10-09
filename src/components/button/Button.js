import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = ({title, name, onClick}) => {
    return (
        <button
            className="Button"
            name={name}
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
