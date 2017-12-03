import React from 'react';
import Slider from 'react-rangeslider';
import BackButton from "../../components/BackButton/BackButton";
import Editor from "../../components/Editor/Editor";
import { reduxForm } from "redux-form";

class AdminAddTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 5,
    };
  }

  sliderValueChanged = (newSliderValue) => {
    this.setState({sliderValue: newSliderValue})
  };

  render() {
    return (
      <div className="col-sm row">
        <div>
          <BackButton/>
        </div>
        <div className="container">
          <h1>Введите информацию о новом вопросе</h1>
          <h2>Введите текст вопроса:</h2>
          <div className="bordered"><Editor/></div>
          <h2>Введите ответы и отметьте правильные:</h2>
          <div className="input-group">
            <input type="checkbox" id="check1" tabIndex="0"/><label htmlFor="check1">Ответ №1</label>
            <div className="bordered"><Editor/></div>
            <input type="checkbox" id="check2" tabIndex="0"/><label htmlFor="check2">Ответ №2</label>
            <div className="bordered"><Editor/></div>
            <input type="checkbox" id="check3" tabIndex="0"/><label htmlFor="check3">Ответ №3</label>
            <div className="bordered"><Editor/></div>
            <input type="checkbox" id="check4" tabIndex="0"/><label htmlFor="check4">Ответ №4</label>
            <div className="bordered"><Editor/></div>
          </div>
          <h2>Выберите количестово баллов за вопрос:</h2>
          <Slider
            min={5}
            max={10}
            value={this.state.sliderValue}
            onChange={this.sliderValueChanged}
            tooltip={false}
            labels={{5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10'}}
          />
        </div>
      </div>
    );
  }

}

export default reduxForm({
  form: 'add_question'
})(AdminAddTest);