import React from 'react';
import CKEditor from "react-ckeditor-component";
import electron from "electron";

export default class TheoryEdit extends React.Component {

  constructor(props) {
    super(props);
    this.updateContent = this.updateContent.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      content: require('../../../../public/theory.html'),
    }
  }

  updateContent(newContent) {
    console.log(newContent);
    this.setState({
      content: newContent
    });
    electron.ipcRenderer.send('update_theory', newContent);
  }

  onChange(evt) {
    const newContent = evt.editor.getData();
    this.updateContent(newContent);
  }

  render() {
    return (
      <CKEditor
        activeClass="p10"
        content={this.state.content}
        events={{
          "change": this.onChange
        }}
      />
    );
  }

}