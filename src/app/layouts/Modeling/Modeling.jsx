import React from 'react';
import electron from 'electron';
import RenderGraph from "./RenderGraph";

class Modeling extends React.Component {

  constructor(props) {
    super(props);
    this.model = this.model.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.changeInitial = this.changeInitial.bind(this);
    this.changeTerminal = this.changeTerminal.bind(this);

    this.state = {
      input: '',
      initial: '',
      terminal: '',
      path: [],
    };
  }
  model() {
    const matter = document.getElementById('matter').value;
    const { input, initial, terminal } = this.state;
    let param = input === '' ? matter : input;
    electron.ipcRenderer.on('model_built', (e, data) => {
      this.setState({
        path: JSON.parse(data),
      });
    });
    electron.ipcRenderer.send('model', param, initial, terminal);
  }
  changeInput(e) {
    this.setState({
      input: e.target.value,
    });
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
  render() {
    return (<div>
      <select id="matter">
        <option value="1">Водород</option>
        <option value="2">Дейтерий</option>
        <option value="12">Углерод</option>
        <option value="16">Кислород</option>
        <option value="238">Уран</option>
      </select><br/>
      <label htmlFor="input">Введите другое значение атомной массы вещества</label>
      <input id="input" onChange={this.changeInput}/><br/>
      <label>Введите начальную энергию</label>
      <input id="initial" onChange={this.changeInitial} /><br/>
      <label>Введите конечную энергию</label>
      <input id="terminal" onChange={this.changeTerminal}/><br/>
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