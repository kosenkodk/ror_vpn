import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { ticketActions } from '../_actions'
import TicketForm from './TicketForm'
import { urls } from 'config'

// Convert file to base64 string
export const fileToBase64 = (bits, filename_or_path_to_the_file) => {
  return new Promise(resolve => {
    var file = new File([bits], filename_or_path_to_the_file);
    var reader = new FileReader();
    // Read file content on file loaded event
    reader.onload = function (event) {
      resolve(event.target.result);
    };

    // Convert data to base64 
    reader.readAsDataURL(file);
  });
};

class TicketsNewPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
  }

  onFormSubmit(e) {
    e.preventDefault()
    let formData = new FormData(e.target)
    fileToBase64(this.state.file, this.state.file.name).then(result => {
      let data = {}
      formData.forEach((value, key) => { data[key] = value });
      // console.log('onFormSubmit', 'jsonData', data, 'formData', formData)
      // return
      this.props.dispatch(ticketActions.add(data))
      // this.props.dispatch(ticketActions.add(formData))
    })

  }

  onFileChange(e) {
    e.preventDefault();
    console.log('onFileChange', e.target.files);
    // if (e.target && e.target.files && e.target.files.length > 0)
    this.setState({ file: e.target.files[0] });
  }

  render() {
    const { items } = this.props
    return (
      <div id="tickets_new" className="container bg-vega shadow-vega mb-4 pb-1">
        <div className="container">
          <div className="row">
            <div className="col-xs-6 mr-auto">
              <h2 className="mt-2">Tickets</h2>
            </div>
            <div className="col-xs-6 ml-auto align-self-center">
              <Link to={urls.tickets.path} className="btn btn-outline-success">Back</Link>
            </div>
          </div>
        </div>
        <TicketForm onFileChange={this.onFileChange} onFormSubmit={this.onFormSubmit} departments={items} />
        {/* <TicketForm onFormSubmit={this.onFormSubmit} departments={items} /> */}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { loading, items } = state.departments;
  return { loading, items }
}

const connectedApp = connect(mapStateToProps)(TicketsNewPage);
export { connectedApp as TicketsNewPage };