import React from 'react';
import electron from 'electron';
import RenderGraph from "./RenderGraph";
import Spinner from "../../components/Spinner/Spinner";
import { Field, reduxForm } from "redux-form";

class Modeling extends React.Component {

  constructor(props) {
    super(props);
    this.model = this.model.bind(this);
    this.state = {
      path: [],
      avrg: {},
      loading: false,
      loaded: false
    };
  }

  model(values) {
    this.setState({
      loading: true,
      loaded: false
    });
    const {matter, initial, terminal, amount} = values;
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

  render() {
    const {handleSubmit} = this.props;
    return (
      <div>
        {this.state.error ? <mark className="secondary">Неверные данные</mark> : null}<br/>
        <form onSubmit={handleSubmit(this.model)}>
          <label>Введите начальную энергию, МэВ</label>
          <Field name="matter" component="select">
            <option value="0">Вода</option>
            <option value="1">Тяжёлая вода</option>
            <option value="2">Бериллий</option>
            <option value="3">Оксид бериллия</option>
            <option value="4">Графит</option>
          </Field>
          <br/>
          <Field name="initial" component={renderField} label="Введите начальную энергию, МэВ"/>
          <Field name="terminal" component={renderField} label="Введите конечную энергию, эВ"/>
          <Field name="amount" component={renderField} label="Введите количество моделируемых нейтронов"/>
          <button type="submit">Смоделировать</button>
        </form>
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
              <br/>
              <h2>Cмоделированный путь нейтрона</h2>
              <div className="bordered">
                <RenderGraph data={this.state.path}/>
              </div>
            </div>
            :
            <div/>
        }
      </div>
    );
  }
}

const renderField = ({
  input,
  label,
  meta: { touched, error }
}) => (
  <div>
    <label>{label}</label>
    <input {...input} />
    <div>
      {touched && error && <mark className="secondary">{error}</mark>}
    </div>
  </div>
);

const validate = values => {
  const errors = {};
  if (values.initial && values.terminal
    && Number.isFinite(parseFloat(values.initial)) && Number.isFinite(parseFloat(values.terminal))
    && parseFloat(values.terminal) >= (parseFloat(values.initial)) * 1e6) {
    errors.initial = 'Начальная энергия должна быть больше чем конечная.';
    errors.terminal = 'Конечная энергия должна быть меньше чем начальная.';
  }
  if (!values.initial) {
    errors.initial = 'Необходимо ввести начальную энергию.';
  } else if (!Number.isFinite(parseFloat(values.initial))) {
    errors.initial = 'Начальная энергия задаётся в виде числа.';
  } else if (parseFloat(values.initial) <= 0) {
    errors.initial = 'Начальная энергия задаётся положительным числом.';
  }
  if (!values.terminal) {
    errors.terminal = 'Необходимо ввести конечную энергию.';
  } else if (!Number.isFinite(parseFloat(values.terminal))) {
    errors.terminal = 'Конечная энергия задаётся в виде числа.';
  } else if (parseFloat(values.terminal) <= 0) {
    errors.terminal = 'Конечная энергия задаётся положительным числом.';
  }
  if (!values.amount) {
    errors.amount = 'Необходимо ввести количество моделируемых нейтронов.';
  } else if (!Number.isFinite(parseFloat(values.amount))) {
    errors.amount = 'Количество нейтронов задаётся в виде числа.';
  } else if (!Number.isInteger(parseFloat(values.amount))) {
    errors.amount = 'Количество нейтронов задаётся натуральным числом.';
  } else if (parseFloat(values.amount) <= 0) {
    errors.amount = 'Количество нейтронов задаётся положительным числом.';
  }
  return errors;
};

export default reduxForm({
  form: 'modeling',
  validate
})(Modeling);
