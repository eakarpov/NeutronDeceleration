import React from 'react';
import dbi from '../dbi';

export class App extends React.Component {
  componentWillMount() {
    dbi.init();
  }
  componentWillUnmount() {
    dbi.getDb().close();
  }
  //TODO: Here we should render the login component
  render() {
    return <div>
      {children}
    </div>;
  }
}