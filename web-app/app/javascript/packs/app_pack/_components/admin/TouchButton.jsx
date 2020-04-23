import React from 'react'
import ClickableElement from './ClickableElement'
import _ from 'lodash'

class TouchButton extends ClickableElement {
  render() {
    const otherProps = _.omit(this.props, ['onClick', 'type']);
    return (
      <button
        onClick={e => this.onElementClicked(e)}
        type="button"
        {...otherProps}
      >{otherProps.value}</button>
    );
  }
}

export { TouchButton }