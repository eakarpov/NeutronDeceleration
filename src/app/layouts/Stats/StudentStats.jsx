import React from 'react';
import { connect } from 'react-redux';
import { getAllResults } from '../../../redux/modules/actions/result';

class StudentStats extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getAllResults(this.props.user.username);
  }
  render() {
    const { result } = this.props;
    return (<div>
      <h2>Результаты тестов:</h2>
      {result.map((el, i) => <div key={i}>
          <span><b>{el.date 
            ? new Date(el.date).toLocaleString() 
            : new Date(null).toLocaleString() }</b>: {el.result ? el.result/100 : 'Неизвестно'}</span>
        </div>)}
    </div>);
  }
}

export default connect(state => ({
  result: state.result,
}), {
  getAllResults,
})(StudentStats);