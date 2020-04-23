import React from 'react';

class TextCut extends React.Component {

  render() {
    const { children, max_length } = this.props;
    const text = children.length > max_length ? `${children.substring(0, max_length)}...` : children
    return (
      <React.Fragment>
        {text}
      </React.Fragment >
    );
  }
}

TextCut.defaultProps = {
  max_length: 10
}

export { TextCut };