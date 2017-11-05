import React from 'react';
import {connect} from 'react-redux';
import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";
import {ROLE} from '../../../helpers/enums';
import {push} from 'react-router-redux';

class DashboardWrapper extends React.Component {
  constructor(props) {
    super(props);
    if (!props.user.authorized) props.push('/login');
  }
  render() {
    return this.props.user.role === ROLE.ADMIN
      ? <AdminDashboard />
      : <StudentDashboard />;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardWrapper);