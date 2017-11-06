import React from 'react';
import "mathjax/MathJax";
import "mathjax/extensions/MathMenu";
import "mathjax/extensions/MathZoom";
import "mathjax/extensions/tex2jax";

class Theory extends React.Component {

  componentDidMount() {
    MathJax.Hub.Config({
      tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]},
      MathMenu: {
        delay: 600
      },
      MathZoom: {
        styles: {
          "#MathJax_Zoom": {
            "background-color": "#0000F0"
          }
        }
      }
    });
  }
  render() {
    const __html = require('../../../../resources/theory.html');
    const template = { __html: __html };
   return (<div dangerouslySetInnerHTML={template} />);
  }
}

export default Theory;