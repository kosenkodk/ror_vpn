import React from 'react';
import { connect } from 'react-redux';

class Alert extends React.Component {
  render() {
    const { alert } = this.props;
    return (
      <React.Fragment>
        {alert.message && <div id='alert' className={`alert ${alert.type} text-center`}>{alert.message}</div>}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return { alert };
}

const connectedPage = connect(mapStateToProps)(Alert);
export { connectedPage as Alert };
