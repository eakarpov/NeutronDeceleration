import React from 'react';
import electron from 'electron';
import RenderGraph from "./RenderGraph";

import * as styles from './Modelling.css';

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
    };
  }
  model() {
    this.setState({
      loading: true,
    });
    const matter = document.getElementById('matter').value;
    const amount = document.getElementById('amount').value;
    const { initial, terminal } = this.state;
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
      {this.state.error?<mark className="secondary">Неверные данные</mark>: null}<br/>
      <select id="matter">
        <option value="0">Вода</option>
        <option value="1">Тяжёлая вода</option>
        <option value="2">Бериллий</option>
        <option value="3">Оксид бериллия</option>
        <option value="4">Графит</option>
      </select><br/>
      <label>Введите начальную энергию, МэВ</label>
      <input id="initial" onChange={this.changeInitial} /><br/>
      <label>Введите конечную энергию, эВ</label>
      <input id="terminal" onChange={this.changeTerminal}/><br/>
      <label>Введите количество моделируемых нейтронов</label>
      <input id="amount" onChange={this.changeAmount} /><br/>
      <button onClick={this.model}>Смоделировать</button><br/>
      {this.state.loading
        ?
        <div>
          <p>Моделирование...</p>
        <div className={styles.spinner}>
          <div className={styles.bounce1} />
          <div className={styles.bounce2} />
          <div className={styles.bounce3} />
        </div>
        </div>
        :
        <div>
          <table>
            <thead>
            <tr>
              <th>Параметры</th>
              <th>E dec</th>
              <th>log E dec</th>
              <th>avrg length</th>
              <th>avrg time</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Средние значения</td>
              <td>{this.state.avrg.eDec}</td>
              <td>{this.state.avrg.logEDec}</td>
              <td>{this.state.avrg.path}</td>
              <td>{this.state.avrg.neutron_age}</td>
            </tr>
            </tbody>
          </table>
          <div>
            {this.state.path.length}
            <RenderGraph data={this.state.path} />
          </div>
        </div>}
    </div>);
  }
}

export default Modeling;