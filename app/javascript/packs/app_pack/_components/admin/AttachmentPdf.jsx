import React from 'react';
import icPdf from 'images/icons/ic_pdf3';
import { ModalPopup } from '../../_components';

class AttachmentPdf extends React.Component {
  render() {
    const { item, index } = this.props;
    return (
      <div class="card">
        <div class="embed-responsive embed-responsive-16by9">
          {/* pdf viewing in new tab */}
          {/* <a className="" href={item.url}>
            <img src={icPdf} class="card-img-top embed-responsive-item cover" alt={item.name} />
          </a> */}
          {/* pdf viewing in modal popup */}
          <ModalPopup id={`modalForMessage${index}`} aImgClasses='card-img-top embed-responsive-item cover' aUrl={item.url} aImgSrc={icPdf} aTitle={item.name} title={item.name} isShowFooter={false} >
            <div className="vh-75">
              <iframe scrolling="yes" className="w-100 h-100" src={item.url} ></iframe>
            </div>
          </ModalPopup>
        </div>
        {/* <div class="card-body">
          <h5 class="card-title">{item.name}</h5>
          <p class="card-text">
            <a className="" href={item.url}>{item.name}</a>
          </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">
            {item.name}
          </small>
        </div> */}
      </div>
    );
  }
}

export { AttachmentPdf };