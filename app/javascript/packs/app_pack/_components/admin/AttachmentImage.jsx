import React from 'react';
import { ModalPopup } from '../../_components';

class AttachmentImage extends React.Component {
  render() {
    const { name, url, index } = this.props;
    const item = { 'name': name, 'url': url };
    return (
      <div class="row">
        <div class="col">
          <div class="h-100">
            <div className="embed-responsive embed-responsive-16by9">
              <ModalPopup id={`modalForAttachmentImage${index}`} aImgClasses='card-img-top embed-responsive-item cover' aUrl={item.url} aImgSrc={item.url} aTitle={item.name} title={item.name} isShowFooter={false} >
                <img src={item.url} className="card-img-top embed-responsive-item cover" alt={item.name} />
              </ModalPopup>
            </div>
            <p className="word-wrap p-2 text-center"><small>{item.name}</small></p>
          </div>
        </div>
      </div>
    );
  }
}

export { AttachmentImage };