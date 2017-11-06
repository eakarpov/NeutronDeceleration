import React from 'react';
import Userboard from '../Userboard/Userboard';
import AdminTest from "../Testing/AdminTest";
import Stats from "../Stats/Stats";
import TheoryEdit from "../Theory/TheoryEdit";
import Groupboard from "../Groupboard/Groupboard";

class AdminDashboard extends React.Component {
  render() {
    return  (<div>
      <div className="col-sm row">
        <div className="col-sm-2 col-lg-1">
          <p>Текущая тема</p>
        </div>
        <div>
          <select id="lab_theme_chooser">
            <option>Исследование процесса замедления нейтронов</option>
          </select>
        </div>
        <div>
          <p>Вы вошли как админ.</p>
        </div>
      </div>
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
        <input type="radio" name="tab-group" id="admin_theory_tab" aria-hidden="true"/>
        <label htmlFor="admin_theory_tab" aria-hidden="true">Теория</label>
        <TheoryEdit />
        <input type="radio" name="tab-group" id="statistics_tab" aria-hidden="true"/>
        <label htmlFor="statistics_tab" aria-hidden="true">Статистика</label>
        <Stats />
      </div>
    </div>);
  }
}

export default AdminDashboard;
