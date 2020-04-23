import React from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

class AlertDismissible extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    }
    this.setShow = this.setShow.bind(this);
  }

  setShow(isShow) {
    this.setState({ show: isShow });
  }

  render() {
    const { alert } = this.props;

    if (this.state.show) {
      return (
        <div id='alert' className="text-center header__alert">
          {alert.message && <Alert
            // variant="danger" 
            onClose={() => this.setShow(false)} dismissible className={`alert ${alert.type} alert-inline`}>
            {/* <Alert.Heading>{alert.type}</Alert.Heading> */}
            {alert.message}
          </Alert>
          }
        </div>
      );
    }
    // return '';
    return (
      <div id='alert' className="text-center header__alert">
        {alert.message &&
          <Button onClick={() => this.setShow(true)} className="btn-outline-primary">Show Alert</Button>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return { alert };
}

const connectedPage = connect(mapStateToProps)(AlertDismissible);
export { connectedPage as AlertDismissible };
