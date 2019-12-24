import React from 'react';

class AttachmentPreview extends React.Component {
  render() {
    return (
      <React.Fragment>
        {(this.props.items && this.props.items.length > 0) &&
          <div className="form-group row multi-preview no-gutters">
            {(this.props.items || []).map((url, index) => (
              <div className="col-sm-6 col-md-4 p-1" key={`attachment-preview-${index}`} >
                <img className="img-fluid img-thumbnail" src={url} alt="..." />
              </div>
            ))}
          </div>
        }
      </React.Fragment>
    );
  }
}

export { AttachmentPreview };