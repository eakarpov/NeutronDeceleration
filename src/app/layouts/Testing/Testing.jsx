import React from 'react';
import * as styles from '../Modeling/Modelling.module.scss';
import {getTestSuite} from "../../../redux/modules/actions/test";
import {connect} from "react-redux";

class Testing extends React.Component {

  constructor(props) {
    super(props);
    this.startTest = this.startTest.bind(this);
    this.state = {
      initial: true,
      loading: false,
    };
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
              :
              <div>{this.props.tests.map((el, i) =>
                <div key={i}>
                  <b>Вопрос {i + 1}: </b>
                  <div dangerouslySetInnerHTML={{__html: el.question}}/>
                  <div className="input-group">
                    {el.answers.map((ans, j) =>
                      <div key={`outer-${j}`}>
                        <input type="checkbox" id={`${i}-${j}`} name={`group-${j}`} tabIndex="0"/>
                        <label htmlFor={`${i}-${j}`}>
                          <div dangerouslySetInnerHTML={{__html: ans}}/>
                        </label>
                        <br/>
                      </div>)}
                  </div>
                  <button>Сдать тест</button>
                </div>)}
              </div>
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
})(Testing);