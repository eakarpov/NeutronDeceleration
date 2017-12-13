import React from 'react';
import * as styles from '../Modeling/Modelling.module.scss';

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
            : <div>Здесь тесты</div>}
        </div>
      </div>
    );
  }
}

export default Testing;