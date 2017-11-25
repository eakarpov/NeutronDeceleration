import React from 'react';
import dbi from '../../../dbi';

class Theory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: null,
    };
  }
  async componentDidMount() {
    const result = await dbi.getTheory();
    this.setState({
      initial: result,
    });
  }
  render() {
    const { initial } = this.state;
    return (
      <div dangerouslySetInnerHTML={{ __html: initial }} />
    )
  }
}

export default Theory;