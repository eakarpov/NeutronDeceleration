import React from 'react';
import { connect } from 'react-redux';
import { getAllResults } from '../../../redux/modules/actions/result';
import { listUsers } from '../../../redux/modules/actions/users';

class Stats extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.listUsers();
    this.props.getAllResults();
  }
  render() {
    const { result } = this.props;
    return (<div>
      <h2>Результаты тестов:</h2>
      {result.map((el, i) => {
        const user = this.props.users.find(elem => elem.login === el.user);
        return user ? (<div key={i}>
          <span><b>{user.name} {user.surname} </b><i>{el.date 
            ? new Date(el.date).toLocaleString() 
            : new Date(null).toLocaleString() }</i>: {el.result ? `${el.result}/100` : 'Неизвестно'}</span>
        </div>) : null;
        })}
  </div>);
  }
}

export default connect(state => ({
  result: state.result,
  users: state.users,
}), {
  getAllResults,
  listUsers,
})(Stats);