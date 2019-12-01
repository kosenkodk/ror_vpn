import React from 'react';
import { connect } from 'react-redux';

class Alert extends React.Component {
  render() {
    const { alert } = this.props;
    return (
      <React.Fragment>
        {alert.message &&
          <div id='alert' className="mt-n3 mb-n3 text-center">
            <div className={`m-0 alert ${alert.type} alert-inline`}>{alert.message}</div>
          </div>
        }
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
