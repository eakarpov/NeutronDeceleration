import React from 'react';
import { connect } from "react-redux";
import { getTest } from "../../../redux/modules/actions/test";
import AdminAddTest from './AdminAddTest';
import textCrypter from "../../../crypter/textCrypter";

class AdminEditTest extends React.Component {
  componentWillMount() {
    const id = this.props.path.split('/')[2];
    this.props.getTest(id);
  }
  render() {
    const {test} = this.props;
    return test ? (<AdminAddTest
      edit={true}
      sliderValue={test.mark}
      question={textCrypter.decrypt(test.question)}
      answer1={textCrypter.decrypt(test.answers[0])}
      answer2={textCrypter.decrypt(test.answers[1])}
      answer3={textCrypter.decrypt(test.answers[2])}
      answer4={textCrypter.decrypt(test.answers[3])}
      check1={test.correctAnswersId[0]}
      check2={test.correctAnswersId[1]}
      check3={test.correctAnswersId[2]}
      check4={test.correctAnswersId[3]}
      id={test._id}
    />) : null;
  }
}

export default connect(state => ({
  path: state.routing.location.pathname,
  test: state.test_single,
}), {
  getTest,
})(AdminEditTest);