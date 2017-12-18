import React from 'react';
import { connect } from 'react-redux';
import { getAllResults } from '../../../redux/modules/actions/result';
import electron from 'electron';

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
    electron.ipcRenderer.on('exported', (e, status) => {
      this.setState({
        export: status,
      });
    });
    electron.ipcRenderer.send('export', this.props.result);
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
          ? <p>Экспорт успешно завершен</p>
          : <p>Экспорт завершен с ошибкой</p>
        : null }
      {result.map((el, i) => <div key={i}>
          <span><b>{el.date 
            ? new Date(el.date).toLocaleString() 
            : new Date(null).toLocaleString() }</b>: {el.result ? `${el.result}/100` : 'Неизвестно'}</span>
        </div>)}
    </div>);
  }
}

export default connect(state => ({
  result: state.result,
}), {
  getAllResults,
})(StudentStats);