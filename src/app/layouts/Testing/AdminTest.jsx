import React from 'react';
import { connect } from "react-redux";
import { push } from 'react-router-redux';
import {getAllTests, removeTest} from "../../../redux/modules/actions/test";

class AdminTest extends React.Component {
  constructor() {
    super();
    this.editTest = this.editTest.bind(this);
    this.deleteTest = this.deleteTest.bind(this);
  }

  componentWillMount() {
    this.props.getAllTests();
  }

  editTest(ind) {
    console.log(this.props.tests.find((el, i) => el._id === ind));
    // this.props.push('/add_question');
  }

  deleteTest(id) {
    this.props.removeTest(id);
  }

  addQuestionClick = () => {
    this.props.push('/add_question');
  };

  render() {
    return (
      <div>
        <button onClick={this.addQuestionClick}>Добавить вопрос</button>
        <table style={{textAlign: 'center', width: '100%'}}>
          <caption>Список вопросов к тесту</caption>
          <thead>
          <tr>
            <th>Вопросы</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {this.props.tests.map((el, i) =>
            <tr key={i}>
              <td data-label="Questions">
                <div dangerouslySetInnerHTML={{__html: el.question}} style={{float: 'left'}}/>
              </td>
              <td data-label="Buttons" style={{float: 'left'}}>
                <button onClick={() => this.editTest(el._id)} >Редактировать вопрос</button>
                <button onClick={() => this.deleteTest(el._id)} >Удалить вопрос</button>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    );
  }

}

const mapDispatchToProps = {
  push,
  getAllTests,
  removeTest,
};

export default connect(state => ({
  tests: state.test,
}), mapDispatchToProps)(AdminTest);
