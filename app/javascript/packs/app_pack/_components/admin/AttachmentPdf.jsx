import React from 'react';
import icPdf from 'images/icons/ic_pdf3';
import { ModalPopup } from '../../_components';

class AttachmentPdf extends React.Component {
  render() {
    const { name, url, index } = this.props;
    const item = { 'name': name, 'url': url };
    return (
      <div class="row row-flex">
        <div class="col">
          <div class="content">
            <div className="embed-responsive embed-responsive-16by9">
              <ModalPopup id={`modalForAttachmentPdf${index}`} aImgClasses='card-img-top embed-responsive-item cover' aUrl={item.url} aImgSrc={icPdf} aTitle={item.name} title={item.name} isShowFooter={false} >
                <div className="vh-75">
                  <iframe scrolling="yes" className="w-100 h-100" src={item.url} ></iframe>
                </div>
              </ModalPopup>
            </div>
            <p className="word-wrap p-2 text-center"><small>{item.name}</small></p>
          </div>
        </div>
      </div>
    );
  }
}

export { AttachmentPdf };