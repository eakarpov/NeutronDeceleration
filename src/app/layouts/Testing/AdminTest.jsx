import React from 'react';
import { connect } from "react-redux";
import { push } from 'react-router-redux';

class AdminTest extends React.Component {

  addQuestionClick = () => {
    this.props.push('/add_question');
  };

  render() {
    return (
      <div>
        <p>Наполнение тестов</p>
        <button onClick={this.addQuestionClick}>Добавить вопрос</button>
      </div>
    );
  }

}

const mapDispatchToProps = {
  push
};

export default connect(null, mapDispatchToProps)(AdminTest);
