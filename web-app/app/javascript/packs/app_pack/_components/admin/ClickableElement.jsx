import React from 'react'
import _ from 'lodash'

class ClickableElement extends React.Component {
  static INTERVAL = 1000;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    const { onClick, disabled } = nextProps;
    this.setState({
      onClick,
      disabled,
    });
  }

  onClickDebounced(e) {
    const { onClick, disabled } = this.state;
    if (!disabled && _.isFunction(onClick)) {
      onClick(e);
    }
  }

  componentWillMount() {
    this.componentWillReceiveProps(this.props);
    const { clickWait } = this.props;
    const wait = clickWait || Button.INTERVAL;
    this.onElementClicked = _.debounce(this.onClickDebounced,
      wait,
      {
        maxWait: wait,
        leading: true,
        trailing: false,
      });
  }
}


export default ClickableElement