import React from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
// import Button from 'react-bootstrap/Button';

class AlertAutoHidden extends React.Component {
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.alert) {
      if (this.props.isAutoHide)
        this.autoHideAlert();
    }
  }

  autoHideAlert() {
    this.setShow(true);
    const timer = setTimeout(() => {
      clearTimeout(timer);
      this.setShow(false);
      // this.props.dispatch(alertActions.clear());
    }, this.props.hideDuration);
  }

  render() {
    const { alert } = this.props;

    if (this.state.show) {
      return (
        <div id='alert' className="text-center header__alert">
          {alert.message && <Alert
            // variant="danger" 
            // dismissible
            onClose={() => this.setShow(false)} className={`alert ${alert.type} alert-inline`}>
            {alert.message}
          </Alert>
          }
        </div>
      );
    }
    return '';
  }
}

AlertAutoHidden.defaultProps = {
  hideDuration: 3000,
  isAutoHide: true
}

function mapStateToProps(state) {
  const { alert } = state;
  return { alert };
}

const connectedPage = connect(mapStateToProps)(AlertAutoHidden);
export { connectedPage as AlertAutoHidden };
