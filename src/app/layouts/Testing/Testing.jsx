import React from 'react';
import * as styles from '../Modeling/Modelling.module.scss';
import {getTestSuite} from "../../../redux/modules/actions/test";
import {connect} from "react-redux";
import Checkbox from "../../components/Checkbox/Checkbox";

class Testing extends React.Component {

  constructor(props) {
    super(props);
    this.startTest = this.startTest.bind(this);
    this.checkAnswers = this.checkAnswers.bind(this);
    this.state = {
      initial: true,
      loading: false,
    };
  }

  checkAnswers() {
    const checkboxes = document.getElementsByTagName('input');
    console.log(checkboxes);
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
        <div className="col-md-2 col-md-offset-5">
          { this.state.initial ? <button onClick={this.startTest}>Начать тестирование</button>
            :
            this.state.loading
              ? <div className="container">
                <div className="col-sm-6 col-sm-offset-3">
                  <p style={{textAlign: 'center'}}><b>Пожалуйста, подождите, идёт подготовка тестов...</b></p>
                </div>
                <div className={styles.skcircle}>
                  <div className={`${styles.skcircle1} ${styles.skchild}`}/>
                  <div className={`${styles.skcircle2} ${styles.skchild}`}/>
                  <div className={`${styles.skcircle3} ${styles.skchild}`}/>
                  <div className={`${styles.skcircle4} ${styles.skchild}`}/>
                  <div className={`${styles.skcircle5} ${styles.skchild}`}/>
                  <div className={`${styles.skcircle6} ${styles.skchild}`}/>
                  <div className={`${styles.skcircle7} ${styles.skchild}`}/>
                  <div className={`${styles.skcircle8} ${styles.skchild}`}/>
                  <div className={`${styles.skcircle9} ${styles.skchild}`}/>
                  <div className={`${styles.skcircle10} ${styles.skchild}`}/>
                  <div className={`${styles.skcircle11} ${styles.skchild}`}/>
                  <div className={`${styles.skcircle12} ${styles.skchild}`}/>
                </div>
              </div>
            : <div>{this.props.tests.map((el, i) =>
                <div key={i}>
                  <b>Вопрос {i+1}: </b><div dangerouslySetInnerHTML={{__html: el.question}}/>
                  {el.answers.map((ans, j) =><div key={`outer-${j}`}>
                      <Checkbox id={`${i}-${j}`} name={`group-${j}`} label={ans} />
                      <br/></div>)}
                </div>)}
                <button onClick={this.checkAnswers}>Сдать тест</button>
              </div>}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  tests: state.test,
}), {
  getTestSuite,
})(Testing);