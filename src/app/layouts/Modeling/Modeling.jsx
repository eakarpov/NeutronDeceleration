import React from 'react';
import electron from 'electron';
import RenderGraph from "./RenderGraph";

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
    };
  }
  model() {
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
        path: model.path,
      });
      console.log(model.avrg);
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
      <div>
        {this.state.path.length}
        <RenderGraph data={this.state.path} />
      </div>
      <p>
        Тут будет таблица с характеристиками средними
      </p>
    </div>);
  }
}

export default Modeling;