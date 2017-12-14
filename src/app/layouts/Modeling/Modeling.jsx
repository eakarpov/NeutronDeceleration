import React from 'react';
import electron from 'electron';
import RenderGraph from "./RenderGraph";
import Spinner from "../../components/Spinner/Spinner";

class Modeling extends React.Component {

  constructor(props) {
    super(props);
    this.model = this.model.bind(this);
    this.changeInitial = this.changeInitial.bind(this);
    this.changeTerminal = this.changeTerminal.bind(this);
    this.changeAmount = this.changeAmount.bind(this);

    this.state = {
      initial: '',
      terminal: '',
      error: false,
      path: [],
      avrg: {},
      loading: false,
      loaded: false
    };
  }

  model() {
    this.setState({
      loading: true,
      loaded: false
    });
    const matter = document.getElementById('matter').value;
    const amount = document.getElementById('amount').value;
    const {initial, terminal} = this.state;
    if (parseFloat(initial) - parseFloat(terminal) <= 0) {
      this.setState({
        error: true,
      });
      return void 0;
    }
    this.setState({
      error: false,
    });
    electron.ipcRenderer.on('model_built', (e, data) => {
      const model = JSON.parse(data);
      this.setState({
        path: model.trace,
        avrg: model.avrg,
        loading: false,
        loaded: true
      });
    });
    electron.ipcRenderer.send('model', matter, initial, terminal, amount);
  }

  changeInitial(e) {
    this.setState({
      initial: e.target.value,
    });
  }

  changeTerminal(e) {
    this.setState({
      terminal: e.target.value,
    });
  }

  changeAmount(e) {
    this.setState({
      amount: e.target.value,
    });
  }

  render() {
    return (<div>
      {this.state.error ? <mark className="secondary">Неверные данные</mark> : null}<br/>
      <select id="matter">
        <option value="0">Вода</option>
        <option value="1">Тяжёлая вода</option>
        <option value="2">Бериллий</option>
        <option value="3">Оксид бериллия</option>
        <option value="4">Графит</option>
      </select><br/>
      <label>Введите начальную энергию, МэВ</label>
      <input id="initial" onChange={this.changeInitial}/><br/>
      <label>Введите конечную энергию, эВ</label>
      <input id="terminal" onChange={this.changeTerminal}/><br/>
      <label>Введите количество моделируемых нейтронов</label>
      <input id="amount" onChange={this.changeAmount}/><br/>
      <button onClick={this.model}>Смоделировать</button>
      <br/>
      {this.state.loading
        ?
        <div className="container">
          <div className="col-sm-6 col-sm-offset-3">
            <p style={{textAlign: 'center'}}><b>Пожалуйста подождите, идёт моделирование...</b></p>
          </div>
          <Spinner/>
        </div>
        : this.state.loaded
          ?
          <div>
            <table>
              <thead>
              <tr>
                <th>Параметры</th>
                <th>Длина пробега</th>
                <th>Возраст нейтрона</th>
                <th>Декремент энергии</th>
                <th>Логарифмический декремент энергии</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Средние значения</td>
                <td>{this.state.avrg.path}</td>
                <td>{this.state.avrg.neutron_age}</td>
                <td>{this.state.avrg.eDec}</td>
                <td>{this.state.avrg.logEDec}</td>
              </tr>
              </tbody>
            </table>
            <RenderGraph data={this.state.path}/>
          </div>
          :
          <div/>
      }
    </div>);
  }
}

export default Modeling;