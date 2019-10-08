/* global preval */
import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';

const {font, logo} = preval`
  const fs = require('fs');
  const path = require('path');
  const logoPath = path.resolve(__dirname, '../assets/logo.svg');
  const fontPath = path.resolve(
    __dirname,
    '../assets/fonts/HelveticaNeue-Bold.woff2'
  );

  module.exports = {
    logo: fs.readFileSync(logoPath, 'base64'),
    font: fs.readFileSync(fontPath, 'base64')
  };
`;

export default function PrinterTemplate(props) {
  return (
    <Fragment>
      <Helmet>
        <style type="text/css">
          {`
            @font-face {
              font-family: 'Helvetica Neue';
              font-weight: 700;
              src: url("data:application/x-font-woff;charset=utf-8;base64,${font}") format("woff2");
            }
          `}
        </style>
      </Helmet>
      <div
        className="box"
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
          fontFamily: "'Helvetica Neue', sans-serif",
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
    </Fragment>
  );
}

PrinterTemplate.propTypes = {
  title: PropTypes.string.isRequired
};
