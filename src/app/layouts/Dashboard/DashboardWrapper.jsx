import React from 'react';
import { connect } from 'react-redux';
import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";
import { ROLE } from '../../../helpers/enums';

class DashboardWrapper extends React.Component {
  render() {
    return this.props.user.role === ROLE.ADMIN
      ? <AdminDashboard user={this.props.user}/>
      : <StudentDashboard user={this.props.user}/>;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(DashboardWrapper);