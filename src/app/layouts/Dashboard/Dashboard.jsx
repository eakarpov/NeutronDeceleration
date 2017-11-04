import React from 'react';
import Theory from '../Theory/Theory';
import Test from '../Testing/Testing';
import Modeling from '../Modeling/Modeling';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

class Dashboard extends React.Component {
  componentWillMount() {
    //TODO: Here should be used call to push props, not a call of a history object itself
    if (!this.props.authorized) this.props.history.push('/login');
  }
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
  authorized: state.user.authorized,
  username: state.user.username
});

const mapDispatchToProps = {
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);