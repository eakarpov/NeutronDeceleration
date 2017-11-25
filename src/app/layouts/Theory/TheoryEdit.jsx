import React, { Component } from 'react';
import Editor from '../../components/Editor/Editor';
import dbi from '../../../dbi';

class TheoryEdit extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.state = {
      initial: null,
    };
  }

  async componentDidMount() {
    const content = await dbi.getTheory();
    this.setState({
      initial: content,
    });
  }

  async save(html) {
    await dbi.saveTheory(html)
  }

  render() {
    const { initial } = this.state;
    return initial && (
      <Editor
        save={this.save}
        initial={initial}
      />
      );
  }
}

export default TheoryEdit;