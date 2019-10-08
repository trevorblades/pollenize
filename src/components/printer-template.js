/* global preval */
import PropTypes from 'prop-types';
import React from 'react';

const logo = preval`
  const fs = require('fs');
  const path = require('path');
  const logoPath = path.resolve('./src/assets/logo.svg');
  module.exports = fs.readFileSync(logoPath, 'base64');
`;

export default function PrinterTemplate(props) {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: 1200,
        height: 628,
        padding: 100,
        backgroundColor: 'black',
        color: 'white',
        fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
        fontWeight: 'bold'
      }}
    >
      <div style={{fontSize: 125}}>{props.title}</div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <img
          src={`data:image/svg+xml;base64,${logo}`}
          height={100}
          style={{filter: 'invert()'}}
        />
        <div
          style={{
            marginLeft: 25,
            fontSize: 75
          }}
        >
          Pollenize
        </div>
      </div>
    </div>
  );
}

PrinterTemplate.propTypes = {
  title: PropTypes.string.isRequired
};
