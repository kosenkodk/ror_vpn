import React from 'react';
import { connect } from 'react-redux';

class Alert extends React.Component {
  render() {
    const { alert } = this.props;
    return (
      <React.Fragment>
        {alert.message &&
          <div id='alert' className="text-center header__alert">
            {/* <div className={`alert ${alert.type} alert-inline alert-dismissible fade show`} role="alert">
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              {alert.message}
            </div> */}
            <div className={`alert ${alert.type} alert-inline`} >
              {alert.message}
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
