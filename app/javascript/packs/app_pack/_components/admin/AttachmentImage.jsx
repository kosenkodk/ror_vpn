import React from 'react';
import { ModalPopup } from '../../_components';

class AttachmentImage extends React.Component {
  render() {
    const { name, url, index } = this.props;
    const item = { 'name': name, 'url': url };
    return (
      <div className="card">
        <div className="embed-responsive embed-responsive-16by9">
          <ModalPopup id={`modalForMessage${index}`} aImgClasses='card-img-top embed-responsive-item cover' aUrl={item.url} aImgSrc={item.url} aTitle={item.name} title={item.name} isShowFooter={false} >
            <img src={item.url} className="card-img-top embed-responsive-item cover" alt={item.name} />
          </ModalPopup>
        </div>
        {/* <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">
            <a className="" href={item.url}>{item.name}</a>
          </p>
        </div>
        <div className="card-footer">
          <small className="text-muted">
            {item.name}
          </small>
        </div> */}
      </div>

    );
  }
}

export { AttachmentImage };