import React from 'react';
import Theory from '../Theory/Theory';
import Test from '../Testing/Testing';
import Modeling from '../Modeling/Modeling';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

class AdminDashboard extends React.Component {
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
            Привет, {this.props.user.username}
          </p>
        </div>
      </div>
      <div className="tabs">
        <input type="radio" name="tab-group" id="admin_user_tab" defaultChecked aria-hidden="true"/>
        <label htmlFor="admin_user_tab" aria-hidden="true">Пользователи</label>
        <div>
          <p>Ваййй дорогой, здесь юзеров добавлять</p>
        </div>
        <input type="radio" name="tab-group" id="admin_test_tab" aria-hidden="true"/>
        <label htmlFor="admin_test_tab" aria-hidden="true">Тесты</label>
        <div>
          <p>Братан, тут тесты набивать</p>
        </div>
        <input type="radio" name="tab-group" id="admin_theory_tab" aria-hidden="true"/>
        <label htmlFor="admin_theory_tab" aria-hidden="true">Теория</label>
        <div>
          <p>Эй Уася, тут теорию редактировать</p>
        </div>
        <input type="radio" name="tab-group" id="statistics_tab" aria-hidden="true"/>
        <label htmlFor="statistics_tab" aria-hidden="true">Статистика</label>
        <div>
          <p>Эййййй красаучик, тут статистику смотреть</p>
        </div>
      </div>
    </div>);
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(AdminDashboard);