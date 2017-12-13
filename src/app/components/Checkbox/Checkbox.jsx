import React from 'react';

export default class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {value: true};
  }

  handleChange(e) {
    console.log('adasd', e);
    this.setState({
      value: !this.state.value
    });
  }

  render() {
    return (<div className="input-group">
      <input defaultChecked={this.state.value}
             type="checkbox"
             tabIndex="0"
             id={this.props.id}
             name={this.props.name}
             onChange={this.handleChange} />
      <label htmlFor={this.props.name} className="switch">|</label>
      <div dangerouslySetInnerHTML={{__html: this.props.label}} style={{float: 'right'}} />
    </div>);
  }
}