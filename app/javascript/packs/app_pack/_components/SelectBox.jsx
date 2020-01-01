import React from 'react';
import PropTypes from 'prop-types';

class SelectBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      itemSelectedIndex: this.props.itemSelected
    }
    this.onSelectBoxChange = this.onSelectBoxChange.bind(this);
  }

  onSelectBoxChange(e) {
    this.setState({ itemSelectedIndex: e.target.value })
    e.preventDefault();
  }

  render() {
    return (
      <select className={`${this.props.className ? this.props.className : 'form-control'}`} id={this.props.id} name={this.props.name} value={this.state.itemSelectedIndex} onChange={this.onSelectBoxChange}>
        {this.props.items && this.props.items.map((item) =>
          <option key={`department${item.id}`} value={item.id}>{item.title}</option>
        )}
      </select>
    )
  }
}

SelectBox.defaultProps = {
  id: 'SelectBox',
  name: 'SelectBoxName',
  itemSelectedIndex: 0
}

SelectBox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  itemSelectedIndex: PropTypes.number,
  items: PropTypes.array
}

export { SelectBox };