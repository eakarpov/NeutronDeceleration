import React from 'react';
import Theory from '../Theory/Theory';
import Test from '../Testing/Testing';
import Modeling from '../Modeling/Modeling';
import DashboardHeader from "./DashboardHeader";
import PropTypes from "prop-types";
import StudentStats from '../Stats/StudentStats';

class StudentDashboard extends React.Component {
  render() {
    return (
      <div>
        <DashboardHeader user={this.props.user}/>
        <div className="tabs">
          <input type="radio" name="tab-group" id="theory_tab" defaultChecked aria-hidden="true"/>
          <label htmlFor="theory_tab" aria-hidden="true">Теория</label>
          <Theory/>
          <input type="radio" name="tab-group" id="modeling_tab" aria-hidden="true"/>
          <label htmlFor="modeling_tab" aria-hidden="true">Моделирование</label>
          <Modeling/>
          <input type="radio" name="tab-group" id="testing_tab" aria-hidden="true"/>
          <label htmlFor="testing_tab" aria-hidden="true">Тестирование</label>
          <Test user={this.props.user}/>
          <input type="radio" name="tab-group" id="stats_tab" aria-hidden="true"/>
          <label htmlFor="stats_tab" aria-hidden="true">Результаты</label>
          <StudentStats user={this.props.user}/>
        </div>
      </div>
    );
  }
}

StudentDashboard.propTypes = {
  user: PropTypes.object.isRequired
};

export default StudentDashboard;
