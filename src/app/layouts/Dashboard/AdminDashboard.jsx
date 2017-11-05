import React from 'react';
import Theory from '../Theory/Theory';
import Test from '../Testing/Testing';
import Modeling from '../Modeling/Modeling';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

class AdminDashboard extends React.Component {
  render() {
    return  (<div>
      <p>Hello, {this.props.user.username}!</p>
    </div>);
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(AdminDashboard);