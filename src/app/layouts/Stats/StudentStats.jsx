import React from 'react';
import { connect } from 'react-redux';
import electron from 'electron';
import FileSaver from 'file-saver';
import { getAllResults } from '../../../redux/modules/actions/result';
import crypter from '../../../crypter/textCrypter';

class StudentStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      export: undefined
    };
    this.export = this.export.bind(this);
  }
  componentWillMount() {
    this.props.getAllResults(this.props.user.username);
  }
  export() {
    const resultJSONString = JSON.stringify(this.props.result);
    const cryptedResult = crypter.encrypt(resultJSONString);
    const blob = new Blob([cryptedResult], {type: "text/plain;charset=utf-8"})
    FileSaver.saveAs(blob, `${this.props.user.surname}_${this.props.user.name}_результаты`)
  }
  render() {
    const { result } = this.props;
    return (<div>
      <div>
        <h2>Результаты тестов:</h2>
        <button onClick={this.export}>Экспортировать результаты</button>
      </div>
      {this.state.export !== void 0 
        ? this.state.export 
          ? <mark class="tertiary">Экспорт успешно завершен</mark>
          : <mark class="secondary">Экспорт завершен с ошибкой</mark>
        : null}
      {result.map((el, i) => 
        <div key={i}>
          <span>
            <i>{el.date ? new Date(el.date).toLocaleString() : 'Ошибка даты'}</i>
            : <b>{typeof el.result !== undefined ? `${Math.round(el.result)}/100` : 'Ошибка результата'}</b>
          </span>
        </div>
      )}
    </div>);
  }
}

export default connect(state => ({
  result: state.result,
  user: state.user
}), {
  getAllResults,
})(StudentStats);