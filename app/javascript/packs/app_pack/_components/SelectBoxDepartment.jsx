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
    this.setState({ departmentSelectValue: event.target.value })
    e.preventDefault();
  }

  render() {
    return (
      <select className={`${this.props.className ? this.props.className : 'form-control'}`} id="departmentSelectBox" name="department" value={this.state.departmentSelectValue} onChange={this.onDepartmentSelectChange}>
        {this.props.departments && this.props.departments.map((item) =>
          <option key={`department${item.id}`} value={item.id}>{item.title}</option>
        )}
        {/* <option value="1">{I18n.t('pages.tickets.form.help.select_the_department1')}</option>
              <option value="2">{I18n.t('pages.tickets.form.help.select_the_department2')}</option>
              <option value="3">{I18n.t('pages.tickets.form.help.select_the_department3')}</option> */}
      </select>
    )
  }
}

export default SelectBoxDepartment;