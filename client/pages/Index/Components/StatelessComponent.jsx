import React from 'react';
import PropTypes from 'prop-types';

const StatelessComponent = (props) => {
    return (
        <h1>{props.message}</h1>
    );
};

StatelessComponent.propTypes = {
    message: PropTypes.string.isRequired
};
StatelessComponent.defaultProps = {
    message: "hello to react world"
};

export default StatelessComponent;