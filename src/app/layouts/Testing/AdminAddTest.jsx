import React from 'react';
import Slider from 'react-rangeslider';
import BackButton from "../../components/BackButton/BackButton";
import Editor from "../../components/Editor/Editor";

class AdminAddTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 5,
      question: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      check1: false,
      check2: false,
      check3: false,
      check4: false
    };

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

  addQuestion = () => {
    console.log(this.state)
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
          <button onClick={this.addQuestion}>Добавить вопрос</button>
        </div>
      </div>
    );
  }

}

export default AdminAddTest;