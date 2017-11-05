import React from 'react';
import Theory from '../Theory/Theory';
import Test from '../Testing/Testing';
import Modeling from '../Modeling/Modeling';
import {connect} from 'react-redux';

class StudentDashboard extends React.Component {
  render() {
    return  (<div>
        <div className="row">
          <div className="col-md-2 col-lg-1">
            <p>Текущая тема</p>
          </div>
          <div>
            <select id="lab_theme_chooser">
              <option>Исследование процесса замедления нейтронов</option>
            </select>
          </div>
          <div style={{ textAlign: 'right'}}>
            <p>
              Привет, {this.props.username}
            </p>
          </div>
        </div>
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
      </div>);
  }
}

const mapStateToProps = state => ({
  username: state.user.username
});

export default connect(mapStateToProps)(StudentDashboard);