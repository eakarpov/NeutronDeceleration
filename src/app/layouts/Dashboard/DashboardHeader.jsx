import React from 'react';
import PropTypes from 'prop-types';
import { ROLE } from "../../../helpers/enums";
import styles from './DashboardHeader.module.scss'

const DashboardHeader = ({user}) => {

  const greeting = user.role === ROLE.ADMIN ? "Вы вошли как админ." : user.username;

  return (
    <div className="col-sm row">
      <div className={`col-sm-2 col-lg-1 ${styles.theme}`}>
        Текущая тема
      </div>
      <div>
        <select id="lab_theme_chooser">
          <option>Исследование процесса замедления нейтронов</option>
        </select>
      </div>
      <div className={styles.greeting}>
        {greeting}
      </div>
    </div>
  )

};

DashboardHeader.propTypes = {
  user: PropTypes.object.isRequired
};

export default DashboardHeader;