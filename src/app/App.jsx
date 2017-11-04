import React from 'react';
import dbi from '../dbi';

export class App extends React.Component {
  async componentWillMount() {
    await dbi.init();
  }
  render() {
    return <div>
      {this.props.children}
    </div>;
  }
}