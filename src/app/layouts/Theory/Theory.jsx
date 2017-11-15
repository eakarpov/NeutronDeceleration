import React from 'react';

class Theory extends React.Component {
  render() {
    return (
      <div dangerouslySetInnerHTML={{ __html: require('../../../../resources/theory.html') }} />
    )
  }
}

export default Theory;