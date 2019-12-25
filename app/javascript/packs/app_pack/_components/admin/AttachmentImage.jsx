import React from 'react';
import { ModalPopup } from '../../_components';

class AttachmentImage extends React.Component {
  render() {
    const { item, index } = this.props;
    return (
      <div class="card">
        <div class="embed-responsive embed-responsive-16by9">
          <ModalPopup id={`modalForMessage${index}`} aImgClasses='card-img-top embed-responsive-item cover' aUrl={item.url} aImgSrc={item.url} aTitle={item.name} title={item.name} isShowFooter={false} >
            <img src={item.url} class="card-img-top embed-responsive-item cover" alt={item.name} />
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

export { AttachmentImage };