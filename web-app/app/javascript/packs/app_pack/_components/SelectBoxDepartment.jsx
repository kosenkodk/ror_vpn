import React from 'react';

class SelectBoxDepartment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      departmentSelectValue: this.props.department && this.props.department || 0
    }
    this.onDepartmentSelectChange = this.onDepartmentSelectChange.bind(this);
  }

  onDepartmentSelectChange(e) {
    this.setState({ departmentSelectValue: e.target.value })
    e.preventDefault();
  }

  render() {
    return (
      <select className={`${this.props.className ? this.props.className : 'form-control'}`} id="departmentSelectBox" name="department" value={this.state.departmentSelectValue} onChange={this.onDepartmentSelectChange}>
        {this.props.departments && this.props.departments.map((item) =>
          <option key={`department${item.id}`} value={item.id}>{item.title}</option>
        )}
      </select>
    )
  }
}

export default SelectBoxDepartment;