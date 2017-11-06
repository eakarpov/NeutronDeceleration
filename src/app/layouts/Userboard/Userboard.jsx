import React from 'react';
import {listUsers, addUser} from "../../../redux/modules/actions/users";
import {connect} from 'react-redux';
import {ROLE} from "../../../helpers/enums";
import {listGroups} from "../../../redux/modules/actions/groups";
import bcrypt from "bcryptjs";

class Userboard extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
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
  render() {
    const {groups, users} = this.props;
    const groupsToRender = groups.map((el, i) => <option key={i} id={el._id}>{el.groupName}</option>);
    const usersToRender = users
      .map((el, i) =>
        <div key={i} className="row">
          <div className="col-md-2"><b>Логин: </b>{el.login}</div>
          <div className="col-md-2"><b>Пароль: </b>{el.passwordShown}</div>
          <div className="col-md-2"><b>Имя: </b>{el.name}</div>
          <div className="col-md-2"><b>Фамилия: </b>{el.surname}</div>
          <div className="col-md-2"><b>Группа: </b>{groups.find(elem => elem._id === el.group).groupName}</div>
          <div className="col-md-2">Knopočki</div>
        </div>);
    return (<div>
      <form onSubmit={this.submitForm}>
        <label htmlFor="name" >Имя</label>
        <input type="text" id="name" />
        <label htmlFor="surname">Фамилия</label>
        <input type="text" id="surname" />
        <select id="groups_chooser">
          { groupsToRender }
        </select>
        <button role="button" disabled={groups && groups.length === 0}>+</button>
      </form>
      <div>
        {usersToRender}
      </div>
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
  addUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Userboard);