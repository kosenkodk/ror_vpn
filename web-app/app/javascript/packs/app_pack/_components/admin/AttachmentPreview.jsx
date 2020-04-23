import React from 'react';
import { AttachmentImage, AttachmentPdf } from './';

class AttachmentPreview extends React.Component {
  render() {
    return (
      <React.Fragment>
        {(this.props.items && this.props.items.previews) &&
          <div className="row">
            {(this.props.items.previews || []).map((item, index) => (
              <div className="col-sm-4 col-md-3" key={`attachment-preview-${index}`} >
                {(item.file.type === 'application/pdf') ?
                  <AttachmentPdf isAllowPreviewDeletion={this.props.isAllowPreviewDeletion}
                    item={item} name={item.file.name} url={item.url} index={index} />
                  :
                  <AttachmentImage isAllowPreviewDeletion={this.props.isAllowPreviewDeletion}
                    item={item} name={item.file.name} url={item.url} index={index} />
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