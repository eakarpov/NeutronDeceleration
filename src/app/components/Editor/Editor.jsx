import React, { Component } from 'react';
import PropTypes from "prop-types";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

class MyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.uploadImageCallback = this.uploadImageCallback.bind(this);
  }

  componentDidMount() {
    const content = this.props.initial;
    let editorState;
    if (content) {
      const contentBlock = htmlToDraft(content);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      editorState = EditorState.createWithContent(contentState);
    } else {
      editorState = EditorState.createEmpty();
    }
    this.setState({
      editorState,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initial !== this.props.initial) {
      const content = nextProps.initial;
      let editorState;
      if (content) {
        const contentBlock = htmlToDraft(content);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        editorState = EditorState.createWithContent(contentState);
      } else {
        editorState = EditorState.createEmpty();
      }
      this.setState({
        editorState,
      });
    }
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.props.editorContentCallback(html);
  }
  async uploadImageCallback(params) {
    const reader = new FileReader();
    const promise = new Promise((resolve, reject) => {
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(params);
    });
    const result = await promise;
    return {
      data: {
        link: result,
      },
    };
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: this.uploadImageCallback
            }
          }}
        />
      </div>
    )
  }
}

MyEditor.propTypes = {
  initial: PropTypes.string,
  editorContentCallback: PropTypes.func.isRequired
};

export default MyEditor;