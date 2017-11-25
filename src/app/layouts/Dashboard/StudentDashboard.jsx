import React from 'react';
import PropTypes from 'prop-types';
import Theory from '../Theory/Theory';
import Test from '../Testing/Testing';
import Modeling from '../Modeling/Modeling';
import DashboardHeader from "./DashboardHeader";

class StudentDashboard extends React.Component {
  render() {
    return  (
      <div>
        <DashboardHeader user={this.props.user} />
        <div className="tabs">
          <input type="radio" name="tab-group" id="theory_tab" defaultChecked aria-hidden="true"/>
          <label htmlFor="theory_tab" aria-hidden="true">Теория</label>
          <Theory />
          <input type="radio" name="tab-group" id="modeling_tab" aria-hidden="true"/>
          <label htmlFor="modeling_tab" aria-hidden="true">Моделирование</label>
          <Modeling />
          <input type="radio" name="tab-group" id="testing_tab" aria-hidden="true"/>
          <label htmlFor="testing_tab" aria-hidden="true">Тестирование</label>
          <Test />
        </div>
      </div>
    );
  }
}

StudentDashboard.propTypes = {
  user: PropTypes.object.isRequired
};

export default StudentDashboard;