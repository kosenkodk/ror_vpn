import React from 'react';
import { AttachmentImageCard, AttachmentPdfCard } from './';

class AttachmentPreviewCard extends React.Component {
  render() {
    return (
      <React.Fragment>
        {(this.props.items && this.props.items.length > 0) &&
          <div className="card-group row">
            {(this.props.items || []).map((item, index) => (
              <div className="col-sm-4 col-md-3" key={`attachment-preview-${index}`} >
                {(item.file.type === 'application/pdf') ?
                  <AttachmentPdfCard name={item.file.name} url={item.url} index={index} />
                  :
                  <AttachmentImageCard name={item.file.name} url={item.url} index={index} />
                }
              </div>
            ))}
          </div>
        }
      </React.Fragment>
    );
  }
}

export { AttachmentPreviewCard };