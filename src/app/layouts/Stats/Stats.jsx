import React from 'react';
import { connect } from 'react-redux';
import { getAllResults, saveResult } from '../../../redux/modules/actions/result';
import { listUsers } from '../../../redux/modules/actions/users';
import crypter from  '../../../crypter/textCrypter';

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      import: undefined,
      selectedGroup: "allGroups",
    };
    this.import = this.import.bind(this);
  }
  componentWillMount() {
    this.props.listUsers();
    this.props.getAllResults();
  }
  import(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (theFile) => {
      const res = fileReader.result;
      const decryptedFile = crypter.decrypt(res);
      const results = JSON.parse(decryptedFile);
      results.forEach(el => {
        this.props.saveResult(el.result, el.user, el.date);
      });
      this.setState({
        import: true,
      }, this.props.getAllResults);
    };
    fileReader.readAsText(file);
  }
  importBtnClick = () => {
    document.getElementById("importer_input").click();
  };
  render() {
    const { result, groups } = this.props;
    return (<div>
      <div>
        <input type="file" id="importer_input" onChange={this.import} />
        <button id="importer_btn" name="importer" onClick={this.importBtnClick}>
          Импортировать результаты
        </button>
      </div>
      {this.state.import !== void 0
        ? this.state.import
          ? <mark class="tertiary">Данные импортированы</mark>
          : <mark class="secondary">Ошибка при импорте данных</mark>
        : null}
      {result.length !== 0 
        ?
        <div>
          <label>Выберите для какой группы отобразить результаты: </label>
          <select id="group_choose" onChange={(e) => this.setState({selectedGroup: e.target.value})}>
            <option value="allGroups">Все группы</option>
            {groups.map((group, i) => <option key={i} value={group.groupName}>{group.groupName}</option>)}
          </select>
          <table style={{textAlign: 'center', width: '100%'}}>
            <caption>
              Результаты прохождения теста студентами {this.state.selectedGroup === "allGroups"
              ? null
              : `группы ${this.state.selectedGroup}`}
            </caption>
            <thead>
              <tr>
                <th>Фамилия</th>
                <th>Имя</th>
                <th>Группа</th>
                <th>Время прохождения</th>
                <th>Результат</th>
              </tr>
            </thead>
            <tbody>
              {result.sort((res1, res2) => res1.date < res2.date).map((el, i) => {
                let user;
                if (this.state.selectedGroup == "allGroups") {
                  user = this.props.users.find(elem => elem.login === el.user);
                } else {
                  const group = groups.find(group => group.groupName === this.state.selectedGroup);
                  user = this.props.users.find(elem => elem.group === group._id && elem.login === el.user);
                }
                return user 
                  ?
                  <tr key={i}>
                    <td data-label="Surname">{user.surname}</td>
                    <td data-label="Name">{user.name}</td>
                    <td data-label="Group">{groups.find(group => group._id === user.group).groupName}</td>
                    <td data-label="Time">{el.date ? new Date(el.date).toLocaleString() : 'Ошибка даты'}</td>
                    <td data-label="Summary">{typeof el.result !== undefined ? `${Math.round(el.result)}/100` : 'Неизвестно'}</td>
                  </tr>
                  : null;
            })}
          </tbody>
        </table>
        </div>
        :
        <h1>Нет ни одно результата прохождения студентом теста.</h1>
      } 
  </div>);
  }
}

export default connect(state => ({
  result: state.result,
  users: state.users,
  groups: state.groups,
}), {
  getAllResults,
  listUsers,
  saveResult
})(Stats);