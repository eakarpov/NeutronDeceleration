import React from 'react';
import Parser from 'html-react-parser';

class Theory extends React.Component {
  render() {
    return (
      <div>{Parser(require('../../../../public/theory.html'))}</div>
    )
  }
}

export default Theory;