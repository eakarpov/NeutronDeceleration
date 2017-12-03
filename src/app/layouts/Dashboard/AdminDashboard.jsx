import React from 'react';
import PropTypes from 'prop-types';
import Userboard from '../Userboard/Userboard';
import AdminTest from "../Testing/AdminTest";
import Stats from "../Stats/Stats";
import Groupboard from "../Groupboard/Groupboard";
import DashboardHeader from "./DashboardHeader";
import { connect } from "react-redux";

class AdminDashboard extends React.Component {
  render() {
    return (
      <div>
        <DashboardHeader user={this.props.user} />
        <div className="tabs">
          <input type="radio" name="tab-group" id="admin_groups_tab" defaultChecked aria-hidden="true"/>
          <label htmlFor="admin_groups_tab" aria-hidden="true">Группы</label>
          <Groupboard />
          <input type="radio" name="tab-group" id="admin_user_tab" aria-hidden="true"/>
          <label htmlFor="admin_user_tab" aria-hidden="true">Пользователи</label>
          <Userboard />
          <input type="radio" name="tab-group" id="admin_test_tab" aria-hidden="true"/>
          <label htmlFor="admin_test_tab" aria-hidden="true">Тесты</label>
          <AdminTest />
          <input type="radio" name="tab-group" id="statistics_tab" aria-hidden="true"/>
          <label htmlFor="statistics_tab" aria-hidden="true">Статистика</label>
          <Stats />
        </div>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(AdminDashboard);
