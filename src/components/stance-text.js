import PropTypes from 'prop-types';
import React, {Fragment} from 'react';
import {Link} from '@material-ui/core';
import {useLanguage} from '../utils/language';

export default function StanceText(props) {
  const {localize} = useLanguage();
  return (
    <Fragment>
      {localize(props.stance.textEn, props.stance.textFr)}
      {props.stance.sources.map(source => {
        const number = props.sources.indexOf(source.url) + 1;
        return (
          <sup key={source.id}>
            [
            <Link
              color="inherit"
              href={`#source-${number}`}
              onClick={props.onSourceClick}
            >
              {number}
            </Link>
            ]
          </sup>
        );
      })}
    </Fragment>
  );
}

StanceText.propTypes = {
  stance: PropTypes.object.isRequired,
  sources: PropTypes.array.isRequired,
  onSourceClick: PropTypes.func.isRequired
};
