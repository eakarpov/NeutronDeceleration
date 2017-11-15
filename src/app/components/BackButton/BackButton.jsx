import React from 'react';
import PropTypes from 'prop-types';

export default class BackButton extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    return (
      <button onClick={ this.context.router.history.goBack }>
        <img src={require('../../../assets/images/last-track-left-arrow.png')} />
      </button>
    );
  }

}