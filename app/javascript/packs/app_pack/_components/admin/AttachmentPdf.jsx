import React from 'react';
import icPdf from 'images/icons/ic_pdf3';
import { ModalPopup } from '../../_components';

class AttachmentPdf extends React.Component {
  render() {
    const { name, url, index } = this.props;
    const item = { 'name': name, 'url': url };
    return (
      <div className="card">
        <div className="embed-responsive embed-responsive-16by9">
          {/* pdf viewing in new tab */}
          {/* <a className="" href={item.url}>
            <img src={icPdf} className="card-img-top embed-responsive-item cover" alt={item.name} />
          </a> */}
          {/* pdf viewing in modal popup */}
          <ModalPopup id={`modalForMessage${index}`} aImgClasses='card-img-top embed-responsive-item cover' aUrl={item.url} aImgSrc={icPdf} aTitle={item.name} title={item.name} isShowFooter={false} >
            <div className="vh-75">
              <iframe scrolling="yes" className="w-100 h-100" src={item.url} ></iframe>
            </div>
          </ModalPopup>
        </div>
        <div className="card-footer">
          <div className="embed-responsive embed-responsive-16by9">
            <small className="text-muted embed-responsive-item ">
              {item.name}
            </small>
          </div>
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
        </div>  */}
      </div>
    );
  }
}

export { AttachmentPdf };