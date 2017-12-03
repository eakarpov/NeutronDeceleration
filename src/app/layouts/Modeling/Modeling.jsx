import React from 'react';
import electron from 'electron';

class Modeling extends React.Component {

  constructor(props) {
    super(props);
    this.model = this.model.bind(this);
    this.changeInput = this.changeInput.bind(this);

    this.state = {
      input: '',
    };
  }
  model() {
    const matter = document.getElementById('matter').value;
    const input = document.getElementById('input').value;
    let param = input === '' ? matter : input;
    electron.ipcRenderer.on('model_built', (e, data) => {
      console.log(data);
    });
    electron.ipcRenderer.send('model', param);
  }
  changeInput(e) {
    this.setState({
      input: e.target.value,
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
      <button onClick={this.model}>Смоделировать</button>
      <p>
        Тут будет картинка
      </p>
      <p>
        Тут будет таблица с характеристиками средними
      </p>
    </div>);
  }
}

export default Modeling;