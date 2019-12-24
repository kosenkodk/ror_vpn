import React from 'react';

class AttachmentPreview extends React.Component {
  render() {
    return (
      <React.Fragment>
        {(this.props.items && this.props.items.length > 0) &&
          <div className="form-group row multi-preview no-gutters">
            {(this.props.items || []).map((item, index) => (
              <div className="col-sm-6 col-md-4 p-1" key={`attachment-preview-${index}`} >
                {item.file.type === 'application/pdf' ?
                  <a href={item.url}>{item.file.name}
                    {/* {`${item.file.size > 0 ? item.file.size / 1000 + ' Kb' : ''}`} */}
                  </a>
                  :
                  <img className="img-fluid img-thumbnail" src={item.url} alt={item.file.name} />
                }
              </div>
            ))}
          </div>
        }
      </React.Fragment>
    );
  }
}

export { AttachmentPreview };