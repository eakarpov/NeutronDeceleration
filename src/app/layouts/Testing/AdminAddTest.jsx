import React from 'react';
import Slider from 'react-rangeslider';
import { connect } from "react-redux";
import { push } from "react-router-redux";
import BackButton from "../../components/BackButton/BackButton";
import Editor from "../../components/Editor/Editor";
import { addTest } from "../../../redux/modules/actions/test";

class AdminAddTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sliderValue: props.sliderValue || 5,
      question: props.question || '',
      answer1: props.answer1 || '',
      answer2: props.answer2 || '',
      answer3: props.answer3 || '',
      answer4: props.answer4 || '',
      check1: props.check1 || false,
      check2: props.check2 || false,
      check3: props.check3 || false,
      check4: props.check4 || false,
      haveAllValues: true,
      rightAnswerChosen: true
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      sliderValue: nextProps.sliderValue,
      question: nextProps.question,
      answer1: nextProps.answer1,
      answer2: nextProps.answer2,
      answer3: nextProps.answer3,
      answer4: nextProps.answer4,
      check1: nextProps.check1,
      check2: nextProps.check2,
      check3: nextProps.check3,
      check4: nextProps.check4,
    });
  }

  sliderValueChanged = (newSliderValue) => {
    this.setState({sliderValue: newSliderValue})
  };

  getQuestionEditorContent = (contentFromEditor) => {
    this.setState({question: contentFromEditor})
  };
  getAnswer1EditorContent = (contentFromEditor) => {
    this.setState({answer1: contentFromEditor})
  };
  getAnswer2EditorContent = (contentFromEditor) => {
    this.setState({answer2: contentFromEditor})
  };
  getAnswer3EditorContent = (contentFromEditor) => {
    this.setState({answer3: contentFromEditor})
  };
  getAnswer4EditorContent = (contentFromEditor) => {
    this.setState({answer4: contentFromEditor})
  };

  handleChangeCheck = (e) => {
    this.setState({
      [e.target.id]: e.target.checked
    })
  };

  haveValue = (prop) => {
    return prop !== '' && prop !== "<p></p>"
  };

  allFalse = (elem, index, array) => {
    return elem === false
  };

  addQuestion = () => {
    if (this.haveValue(this.state.question) && this.haveValue(this.state.answer1) &&
      this.haveValue(this.state.answer2) && this.haveValue(this.state.answer3) && this.haveValue(this.state.answer4)) {
      if (![this.state.check1, this.state.check2, this.state.check3, this.state.check4].every(this.allFalse)) {
        this.setState({
          haveAllValues: true,
          rightAnswerChosen: true
        });
        this.props.addTest(
          this.state.question,
          [this.state.answer1, this.state.answer2, this.state.answer3, this.state.answer4],
          [this.state.check1, this.state.check2, this.state.check3, this.state.check4],
          this.state.sliderValue
        );
        this.props.push("/")
      } else {
        this.setState({
          haveAllValues: true,
          rightAnswerChosen: false
        })
      }
    } else {
      this.setState({
        haveAllValues: false,
        rightAnswerChosen: true
      })
    }
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
          <div className="bordered">
            <Editor id="question" editorContentCallback={this.getQuestionEditorContent}/>
          </div>
          <h2>Введите ответы и отметьте правильные:</h2>
          <div className="input-group">
            <input type="checkbox" id="check1" tabIndex="0"
                   defaultChecked={this.state.check1} onChange={this.handleChangeCheck}/>
            <label htmlFor="check1">Ответ №1</label>
            <div className="bordered">
              <Editor id="answer1" editorContentCallback={this.getAnswer1EditorContent}/>
            </div>
            <input type="checkbox" id="check2" tabIndex="0"
                   defaultChecked={this.state.check2} onChange={this.handleChangeCheck}/>
            <label htmlFor="check2">Ответ №2</label>
            <div className="bordered">
              <Editor id="answer2" editorContentCallback={this.getAnswer2EditorContent}/>
            </div>
            <input type="checkbox" id="check3" tabIndex="0"
                   defaultChecked={this.state.check3} onChange={this.handleChangeCheck}/>
            <label htmlFor="check3">Ответ №3</label>
            <div className="bordered">
              <Editor id="answer3" editorContentCallback={this.getAnswer3EditorContent}/>
            </div>
            <input type="checkbox" id="check4" tabIndex="0"
                   defaultChecked={this.state.check4} onChange={this.handleChangeCheck}/>
            <label htmlFor="check4">Ответ №4</label>
            <div className="bordered">
              <Editor id="answer4" editorContentCallback={this.getAnswer4EditorContent}/>
            </div>
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
          <br/>
          {!this.state.haveAllValues ?
            <mark className="secondary">
                Вы не ввели текст вопроса или ответа(ов)!
            </mark> : null}
          {!this.state.rightAnswerChosen ?
            <mark className="secondary">
              Вы не выбрали ни одного правильного ответа!
            </mark> : null}
          <br/>
          <button onClick={this.addQuestion}>Добавить вопрос</button>
        </div>
      </div>
    );
  }

}

const mapDispatchToProps = {
  addTest,
  push
};

export default connect(null, mapDispatchToProps)(AdminAddTest);