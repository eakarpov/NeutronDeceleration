import React from 'react';
import { connect } from "react-redux";
import { push } from 'react-router-redux';
import {getAllTests, removeTest} from "../../../redux/modules/actions/test";
import textCrypter from "../../../crypter/textCrypter";

class AdminTest extends React.Component {
  constructor() {
    super();
    this.editTest = this.editTest.bind(this);
    this.deleteTest = this.deleteTest.bind(this);
  }

  componentWillMount() {
    this.props.getAllTests();
  }

  editTest(id) {
    this.props.push('/edit_question/' + id);
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
        {this.props.tests.length != 0
        ?
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
                <div dangerouslySetInnerHTML={{__html: textCrypter.decrypt(el.question)}} style={{float: 'left'}}/>
              </td>
              <td data-label="Buttons" style={{float: 'left'}}>
                <button onClick={() => this.editTest(el._id)} >Редактировать вопрос</button>
                <button onClick={() => this.deleteTest(el._id)} >Удалить вопрос</button>
              </td>
            </tr>
          )}
          </tbody>
        </table>
        :
        <div><h1>Пока что вы не добавили ни одного вопроса для теста.</h1></div>
        }
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
