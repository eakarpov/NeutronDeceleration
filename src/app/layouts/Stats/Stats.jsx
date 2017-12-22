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
    };
    this.import = this.import.bind(this);
  }
  componentWillMount() {
    this.props.listUsers();
    this.props.getAllResults();
  }
  import(e) {
    const file  = e.target.files[0];
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
    const { result } = this.props;
    return (<div>
      <div>
        <h2>Результаты тестов:</h2>
        <input type="file" id="importer_input" onChange={this.import} />
        <button id="importer_btn" name="importer" onClick={this.importBtnClick}>
          Импортировать результаты
        </button>
      </div>
      {this.state.import !== void 0
        ? this.state.import
          ? <p>Данные импортированы</p>
          : <p>Ошибка при импорте данных</p>
        : null}
      {result.map((el, i) => {
        const user = this.props.users.find(elem => elem.login === el.user);
        return user 
        ?
        <div key={i}>
          <span>
            <b>{user.name} {user.surname} </b>
            <i>{el.date ? new Date(el.date).toLocaleString() : 'Ошибка даты'}</i>
            : <b>{typeof el.result !== undefined ? `${Math.round(el.result)}/100` : 'Неизвестно'}</b>
          </span>
        </div>
        : null;
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
  saveResult
})(Stats);