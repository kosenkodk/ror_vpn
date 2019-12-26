import React from 'react';
import { ModalPopup } from '../../_components';

class AttachmentImage extends React.Component {
  render() {
    const { name, url, index } = this.props;
    const item = { 'name': name, 'url': url };
    return (
      <React.Fragment>
        <div class="row row-flex">
          <div class="col">
            <div class="content">
              <ModalPopup id={`modalForAttachmentImage${index}`} aImgClasses='card-img-top embed-responsive-item cover' aUrl={item.url} aImgSrc={item.url} aTitle={item.name} title={item.name} isShowFooter={false} >
                <img src={item.url} className="card-img-top embed-responsive-item cover" alt={item.name} />
              </ModalPopup>
              <p className="word-wrap p-2"><small>{item.name}</small></p>
            </div>
          </div>
        </div>

        {/* <figure class="figure row">
          <img src={item.url} class="col figure-img img-fluid rounded" alt="..." />
          <figcaption class="col figure-caption text-right text-wrap">{item.name}</figcaption>
        </figure> */}

        {/* <div className="card">
          <div className="embed-responsive embed-responsive-16by9">
            <ModalPopup id={`modalForAttachmentImage${index}`} aImgClasses='card-img-top embed-responsive-item cover' aUrl={item.url} aImgSrc={item.url} aTitle={item.name} title={item.name} isShowFooter={false} >
              <img src={item.url} className="card-img-top embed-responsive-item cover" alt={item.name} />
            </ModalPopup>
          </div>
          <div className="card-footer">
            <div className="d-flex align-content-center flex-wrap">
              {item.name}
            </div>
          </div> */}

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

        {/* </div > */}
      </React.Fragment >
    );
  }
}

export { AttachmentImage };