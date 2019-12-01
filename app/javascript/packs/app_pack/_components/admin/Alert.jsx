import React from 'react';
import { connect } from 'react-redux';

class Alert extends React.Component {
  render() {
    const { alert } = this.props;
    return (
      <React.Fragment>
        {alert.type &&
          <div id='alert' className="text-center header__alert">
            <div className={`alert ${alert.type} alert-inline`}>
              {alert.message && alert.message}
            </div>
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
