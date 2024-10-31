import React from 'react';
import PropTypes from 'prop-types';

function Heading({ text}) {
 


  return <h1 className=" my-4 ml-4 font-semibold text-2xl">{text}</h1>;
}

Heading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Heading;
