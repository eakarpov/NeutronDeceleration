import React from 'react';
import { connect } from "react-redux";
import { push } from 'react-router-redux';
import {getAllTests} from "../../../redux/modules/actions/test";

class AdminTest extends React.Component {
  constructor() {
    super();
    this.editTest = this.editTest.bind(this);
  }

  componentWillMount() {
    this.props.getAllTests();
  }

  editTest(ind) {
    console.log(this.props.tests.find((el, i) => i === ind));
    // this.props.push('/add_question');
  }

  addQuestionClick = () => {
    this.props.push('/add_question');
  };

  render() {
    return (
      <div>
        <button onClick={this.addQuestionClick}>Добавить вопрос</button>
        <div>{this.props.tests.map((el, i) =>
          <div key={i}>
            <div dangerouslySetInnerHTML={{__html: el.question}} style={{float: 'left'}}/>
            <button onClick={() => this.editTest(i)} >Редактировать вопрос</button>
          </div>)}
        </div>
      </div>
    );
  }

}

const mapDispatchToProps = {
  push,
  getAllTests,
};

export default connect(state => ({
  tests: state.test,
}), mapDispatchToProps)(AdminTest);
