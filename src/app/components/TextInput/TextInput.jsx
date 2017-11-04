import React from 'react';

export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {value: ''};
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    }, () => this.props.onInputChange(this.state.value));
  }

  render() {
    const {value} = this.state;
    return (<div>
      <input value={value}
               onChange={this.handleChange} />
    </div>);
  }
}