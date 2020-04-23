import React from 'react';

// const NewLineToBr = ({ children = '' }) => children.split("\n")
//   .map(line => (
//     <React.Fragment key={uuidv4()}>
//       {line}
//       <br />
//     </React.Fragment>
//   ));

// .reduce((arr, line, index) => arr.concat(
//   <Fragment key={index}>
//     {line}
//     <br />
//   </Fragment>,
// ), [])

// export default NewLineToBr;

class NewLineToBr extends React.Component {
  render() {
    return (
      this.props.children && this.props.children.split("\n").map((line, index) => (
        <React.Fragment key={`newLineToBr${index}`}>
          {line}
          <br />
        </React.Fragment>
      ))
    )
  }
}

export { NewLineToBr }


