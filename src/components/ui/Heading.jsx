import React from 'react';
import PropTypes from 'prop-types';

function Heading({ text}) {
 


  return <h1 className="text-center my-5 font-bold text-4xl">{text}</h1>;
}

Heading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Heading;
