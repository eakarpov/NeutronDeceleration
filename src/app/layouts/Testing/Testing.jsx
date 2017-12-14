import React from 'react';
import {getTestSuite} from "../../../redux/modules/actions/test";
import {connect} from "react-redux";
import Spinner from "../../components/Spinner/Spinner";

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
              ?
              <div className="container">
                <div className="col-sm-6 col-sm-offset-3">
                  <p style={{textAlign: 'center'}}><b>Пожалуйста, подождите, идёт подготовка тестов...</b></p>
                </div>
                <Spinner/>
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
                  <br/>
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