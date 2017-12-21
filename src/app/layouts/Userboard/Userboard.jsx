import React from 'react';
import bcrypt from "bcryptjs";
import FileSaver from 'file-saver';
import {connect} from 'react-redux';
import {listUsers, addUser} from "../../../redux/modules/actions/users";
import {ROLE} from "../../../helpers/enums";
import {listGroups} from "../../../redux/modules/actions/groups";
import {deleteUser} from "../../../redux/modules/actions/users";

class Userboard extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }
  submitForm(e) {
    e.preventDefault();
    const createAdmin = false; // If create admin, should be connected to radio button
    const name = e.target.name.value;
    const surname = e.target.surname.value;
    const groupId = e.target.groups_chooser.options[e.target.groups_chooser.options.selectedIndex].id;
    const password = Math.random().toString(36).slice(2);
    this.props.addUser({
      login: Math.random().toString(36).slice(2),
      passwordShown: password,
      password: bcrypt.hashSync(password, 10),
      name,
      surname,
      role: createAdmin ? ROLE.ADMIN : ROLE.STUDENT,
      group: groupId
    }, true);
    e.target.name.value = "";
    e.target.surname.value = "";
  }
  componentWillMount() {
    this.props.listUsers();
    this.props.listGroups();
  }
  deleteUser(login) {
    this.props.deleteUser({ user: login })
  }
  exportAuth = () => {
    const choosenGroupId = document.getElementById("group_chooser").value;
    const group = this.props.groups.find((group) => group._id === choosenGroupId);
    let userAuthAsString = `Группа: ${group.groupName};\n\nФамилия;Имя;Логин;Пароль\n`;
    this.props.users.filter(user => user.group === group._id).sort((userA, userB) => {
      if (userA.surname > userB.surname) return 1;
      else if (userA.surname < userB.surname) return -1;
      else if (userA.name > userB.name) return 1;
      else if (userA.name < userB.name) return -1;
      else return 0;
    }).forEach(user => {
      userAuthAsString = userAuthAsString.concat(`${user.surname};${user.name};${user.login};${user.passwordShown}\n`);
    });
    const blob = new Blob([userAuthAsString], {type: "text/csv;charset=utf-8"});
    FileSaver.saveAs(blob, `Данные_авторизации_студентов_группы_${group.groupName}.csv`);
  }
  render() {
    const {groups, users} = this.props;
    const groupsToRender = groups.map((el, i) => <option key={i} id={el._id}>{el.groupName}</option>);
    const usersToRender = users
      .map((el, i) =>
        <tr key={i}>
          <td data-label="Login">{el.login}</td>
          <td data-label="Password">{el.passwordShown}</td>
          <td data-label="Name">{el.name}</td>
          <td data-label="Surname">{el.surname}</td>
          <td data-label="Group">{groups.find(elem => elem._id === el.group).groupName}</td>
          <td data-label="Buttons">
            <button style={{height: '40px'}} onClick={() => this.deleteUser(el.login)}>
              <img src={require('../../../assets/images/clear-button.png')} />
            </button>
          </td>
        </tr>);
    return (<div>
      <h2>Добавить нового студента</h2>
      <form style={{marginLeft: '0px', marginRight: '0px'}} onSubmit={this.submitForm}>
        <label htmlFor="name" >Имя</label>
        <input type="text" id="name" />
        <label htmlFor="surname">Фамилия</label>
        <input type="text" id="surname" />
        <select id="groups_chooser">
          { groupsToRender }
        </select>
        <button role="button" disabled={groups && groups.length === 0}>+</button>
      </form>
      <label htmlFor="group_chooser">Выберите группу:</label>
      <select id="group_chooser">
        {this.props.groups.map((group, i) => <option value={group._id} key={i}>{group.groupName}</option>)}
      </select>
      <button onClick={this.exportAuth}>Экспортировать данные авторизации студентов группы</button>
      <table style={{textAlign: 'center', width: '100%'}}>
        <caption>Список студентов</caption>
        <thead>
          <tr>
            <th>Логин</th>
            <th>Пароль</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Группа</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {usersToRender}
        </tbody>
      </table>
    </div>);
  }
}

const mapStateToProps = state => ({
  groups: state.groups,
  users: state.users
});

const mapDispatchToProps = {
  listGroups,
  listUsers,
  addUser,
  deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Userboard);