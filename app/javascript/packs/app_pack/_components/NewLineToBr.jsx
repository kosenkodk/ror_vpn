import React from 'react';

class NewLineToBr extends React.Component {
  render() {
    return (
      <React.Fragment>{this.props.children.split("\n").map((line, index) => (
        <React.Fragment key={`newLineToBr${index}`}>
          {line}
          <br />
        </React.Fragment>
      ))
      }
      </React.Fragment>
    )
  }
}

export { NewLineToBr }


