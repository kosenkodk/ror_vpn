import React from 'react'
import { ModalPopupForm } from '../../_components'

class AttachmentImage extends React.Component {
  render() {
    const { id, name, url, index } = this.props
    const item = { 'id': id || index, 'name': name, 'url': url }
    return (
      <div className="row">
        <div className="col">
          <div className="h-100">
            <div className="embed-responsive embed-responsive-16by9">
              <ModalPopupForm isAllowPreviewDeletion={this.props.isAllowPreviewDeletion}
                id={`modalForAttachmentImage${item.id || index}`} aImgClasses='card-img-top embed-responsive-item cover' item={item} aUrl={item.url} aImgSrc={item.url} aTitle={item.name} title={item.name} isShowFooter={false} >
                <div className="text-center">
                  <img src={item.url} className="img-fluid mh-75" alt={item.name} />
                </div>
              </ModalPopupForm>
            </div>
            <p className="word-wrap p-2 text-center"><small>{item.name}</small></p>
          </div>
        </div>
      </div>
    );
  }
}

export { AttachmentImage }