import React from 'react';
import Parser from 'html-react-parser';

class Theory extends React.Component {
  render() {
    return (
      <div>{Parser(require('../../../../resources/theory.html'))}</div>
    )
  }
}

export default Theory;