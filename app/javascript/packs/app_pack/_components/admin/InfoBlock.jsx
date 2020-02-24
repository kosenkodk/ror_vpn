import React from 'react';

class InfoBlock extends React.Component {
  render() {
    return (
      <div className="border-left-pink mt-0">
        <p className="mt-0 mb-2">
          {this.props.children}
        </p>
      </div>
    );
  }
}

export { InfoBlock };