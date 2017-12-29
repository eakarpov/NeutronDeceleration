import React from 'react';
import { connect } from "react-redux";
import { getTestSuite } from "../../../redux/modules/actions/test";
import { saveResult } from '../../../redux/modules/actions/result';
import Spinner from "../../components/Spinner/Spinner";
import textCrypter from "../../../crypter/textCrypter";

class Testing extends React.Component {

  constructor(props) {
    super(props);
    this.passTest = this.passTest.bind(this);
    this.startTest = this.startTest.bind(this);
    this.state = {
      initial: true,
      loading: false,
      calculating: false,
      calculated: false,
      mark: 0,
      wrongAnsweredQuestions: [],
    };
  }

  passTest() {
    const inputs = document.querySelectorAll('input');
    this.setState({
      loading: true,
      calculating: true,
    }, () => {
      const answers = [];
      [...inputs].forEach(input => {
        if (input.type === 'checkbox') {
          const a = /(\d)-(\d)/.exec(input.id);
          const qst = a[1];
          const ans = a[2];
          answers.push({
            question: qst,
            answer: ans,
            value: input.checked,
          });
        }
      });
      let mark = 0;
      let maxMark = this.props.tests.reduce((p, c) => p + c.mark, 0);
      let wrongAnsweredQuestions = [];
      this.props.tests.forEach((q, i) => {
        const rightAns = q.correctAnswersId;
        const amountRightAnswers = rightAns.reduce((p, c) => p + (c ? 1 : 0), 0);
        const realAns = answers.filter(el => parseInt(el.question) === i);
        [...realAns].forEach((el, i) => {
          if (rightAns[i] === el.value && rightAns[i]) mark += q.mark / amountRightAnswers;
          if (rightAns[i] !== el.value && !rightAns[i]) {
            mark -= q.mark / (2 * amountRightAnswers);
            wrongAnsweredQuestions.push(q);
          }
        });
      });
      wrongAnsweredQuestions = [...new Set(wrongAnsweredQuestions)];
      mark = mark / maxMark * 100;
      if (mark < 0) mark = 0;
      this.props.saveResult(mark, this.props.user.username);
      this.setState({
        mark,
        wrongAnsweredQuestions,
        loading: false,
        calculated: true,
        calculating: false,
      });
    });
  }

  startTest() {
    this.setState({
      initial: false,
      loading: true,
    }, () => {
      this.props.getTestSuite();
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 1000);
    });
  }

  render() {
    return (
      <div>
        <div>
          {this.state.initial ? <button onClick={this.startTest}>Начать тестирование</button>
            :
            this.state.loading && !this.state.calculating
              ?
              <div className="container">
                <div className="col-sm-6 col-sm-offset-3">
                  <p style={{textAlign: 'center'}}><b>Пожалуйста, подождите, идёт подготовка тестов...</b></p>
                </div>
                <Spinner/>
              </div>
              : this.state.loading && this.state.calculating
              ?
              <div className="container">
                <div className="col-sm-6 col-sm-offset-3">
                  <p style={{textAlign: 'center'}}><b>Пожалуйста, подождите, идёт подсчёт результата...</b></p>
                </div>
                <Spinner/>
              </div>
              : this.state.calculated
                ?
                <div>
                  <h2>Ваша оценка - {Math.round(this.state.mark)}</h2>
                  {this.state.wrongAnsweredQuestions.length !== 0 
                  ? 
                  <div>
                    <h2>Вопросы на которые вы дали неверные ответы:</h2>
                    <ul>
                    {this.state.wrongAnsweredQuestions.map((waq, i) =>
                      <li key={i}><div dangerouslySetInnerHTML={{__html: textCrypter.decrypt(waq.question)}}/></li>
                    )}
                    </ul>
                  </div>
                  : null
                }
                </div>
                :
                this.props.tests.length !== 0
                ?
                <div>{this.props.tests.map((el, i) =>
                  <div key={i}>
                    <b>Вопрос {i + 1}: </b>
                    <div dangerouslySetInnerHTML={{__html: textCrypter.decrypt(el.question)}}/>
                    <div className="input-group">
                      {el.answers.map((ans, j) =>
                        <div key={`outer-${j}`}>
                          <input type="checkbox" id={`${i}-${j}`} name={`group-${j}`} tabIndex="0"/>
                          <label htmlFor={`${i}-${j}`}>
                            <div dangerouslySetInnerHTML={{__html: textCrypter.decrypt(ans)}}/>
                          </label>
                          <br/>
                        </div>)}
                    </div>
                    <br/>
                  </div>)}
                  <button onClick={this.passTest}>Сдать тест</button>
                </div>
                :
                <div><h1>Пока не было добалено ни одного вопроса для теста.</h1></div>
          }
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  tests: state.test,
}), {
  getTestSuite,
  saveResult
})(Testing);